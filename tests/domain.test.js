import test from 'node:test';
import assert from 'node:assert/strict';
import { categoryTotals, filterTransactions, goalProjection, loadState, parseMessage, parseMoney, savingsTip, seedState, totals, validDate, validState } from '../src/domain.js';

test('valores pt-BR são convertidos exatamente para centavos', () => {
  for (const [input, expected] of [['28', 2800], ['32,50', 3250], ['1.200,00', 120000], ['R$ 1.200,50', 120050], ['0,01', 1], ['1,2', 120]]) assert.equal(parseMoney(input), expected);
  for (const input of ['0', '-28', '32.50', '12,345', 'abc', '1.00,00', '1,200.00', 'Infinity', '9007199254740992']) assert.equal(parseMoney(input), null);
});
test('conversa produz prévia e não altera a coleção', () => {
  const state = seedState(), before = JSON.stringify(state);
  assert.deepEqual(parseMessage('Gastei R$ 45,90 no almoço').draft, { description: 'Almoço', category: 'Alimentação', amount: 4590, date: '2026-09-24', type: 'expense' });
  assert.equal(parseMessage('Paguei R$ 1.200,50 de aluguel').draft.amount, 120050);
  assert.equal(parseMessage('Recebi R$ 800 de freelance').draft.type, 'income');
  assert.equal(parseMessage('Gastei 32,50 no transporte').draft.category, 'Transporte');
  assert.equal(JSON.stringify(state), before);
});
test('mensagens ambíguas e valores inválidos não criam prévias', () => {
  for (const input of ['Gastei', 'Gastei 0 no café', 'Gastei -28 no almoço', 'Gastei −45 no café', 'Gastei –45 no café', 'Gastei R$ -28 no almoço', 'Gastei ,50 no café', 'Gastei .50 no café', 'Gastei 28 e 32 no mercado', 'Recebi 100 e gastei 20', 'Gastei 12.34 no almoço', 'Gastei 28 no dia 42', 'Gastei 28 em 31/02/2026', 'Gastei 28 em 10/09/26', 'Gastei 28 em 10/09 e 11/09', 'Gastei 28 em 2026-13-32', 'Gastei 28 hoje ontem', 'Gastei 28 ontem em 23/09/2025', 'Transferi 28']) { assert.ok(parseMessage(input).error, input); assert.equal(parseMessage(input).draft, undefined, input); }
});
test('datas são explícitas e verificadas', () => {
  assert.equal(parseMessage('Gastei 28 no almoço em 12/09/2026').draft.date, '2026-09-12');
  assert.equal(parseMessage('Gastei 28 no almoço em 2026-09-24').draft.date, '2026-09-24');
  assert.equal(parseMessage('Gastei 28 no almoço em 24-09-2026').draft.date, '2026-09-24');
  assert.equal(parseMessage('Gastei 45,90.').draft.amount, 4590);
  assert.equal(parseMessage('Gastei 28 ontem').draft.date, '2026-09-23');
  assert.equal(parseMessage('Gastei 28 no café', '2026-08-24').draft.date, '2026-08-24');
  assert.equal(validDate('2026-02-29'), false); assert.equal(validDate('2024-02-29'), true);
});
test('dados iniciais conciliam painel e relatório sem contagem dupla', () => {
  const state = seedState(); const rows = filterTransactions(state.transactions, '2026-09');
  assert.deepEqual(totals(rows), { income: 580000, expense: 346000, balance: 234000 });
  assert.equal(categoryTotals(rows).reduce((sum, [, amount]) => sum + amount, 0), 346000);
  assert.equal(filterTransactions(state.transactions, '2026-08').length, 0);
  assert.equal(filterTransactions(state.transactions, '2026-09', 'cafe')[0].id, 'cafe');
  assert.equal(filterTransactions(state.transactions, '2026-09', '', 'Alimentação').length, 3);
  const confirmed = { id: 'new', ...parseMessage('Gastei 28 no almoço').draft };
  assert.equal(totals([...rows, confirmed]).expense, 348800);
  assert.equal(totals([...rows, confirmed].filter(row => row.id !== 'new')).expense, 346000);
});
test('reserva calcula teto, não altera dados e lida com meta atingida', () => {
  assert.deepEqual(goalProjection({ target: 600000, saved: 180000, monthly: 30000 }), { remaining: 420000, percent: 30, months: 14 });
  assert.equal(goalProjection({ target: 100000, saved: 25000, monthly: 20000 }).months, 4);
  assert.equal(goalProjection({ target: 100000, saved: 120000, monthly: 20000 }).months, 0);
  assert.equal(goalProjection({ target: 100000, saved: 0, monthly: 0 }).months, null);
  const state = seedState(), before = JSON.stringify(state); goalProjection(state.goal); assert.equal(JSON.stringify(state), before);
});
test('schema inválido e storage bloqueado voltam ao cenário fictício com aviso', () => {
  assert.equal(validState(seedState()), true);
  for (const invalid of [{}, { ...seedState(), version: 99 }, { ...seedState(), transactions: [{ id: 'bad' }] }, { ...seedState(), goal: { target: -1 } }]) assert.equal(validState(invalid), false);
  const duplicate = seedState(); duplicate.transactions.push(duplicate.transactions[0]); assert.equal(validState(duplicate), false);
  assert.ok(loadState({ getItem: () => '{broken' }).warning);
  assert.ok(loadState({ getItem: () => { throw Error('blocked'); } }).warning);
  const empty = seedState(); empty.transactions = []; assert.equal(loadState({ getItem: () => JSON.stringify(empty) }).data.transactions.length, 0);
});
test('dica deixa hipótese, fonte e fórmula explícitas, e não inventa despesas', () => {
  assert.match(savingsTip(seedState().transactions), /10%/); assert.match(savingsTip(seedState().transactions), /simulação educativa/);
  assert.match(savingsTip([]), /Ainda não há/); assert.equal(parseMessage('Como posso economizar?').intent, 'tip');
});

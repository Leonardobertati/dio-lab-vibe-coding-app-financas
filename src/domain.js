export const SCHEMA_VERSION = 1;
export const STORAGE_KEY = 'folga-demo-v1';
export const TODAY = '2026-09-24';
export const CATEGORIES = ['Alimentação', 'Transporte', 'Moradia', 'Saúde', 'Lazer', 'Educação', 'Outros', 'Receita'];
export const MONTHS = { '2026-09': 'Setembro de 2026', '2026-08': 'Agosto de 2026' };
const moneyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
export const money = cents => moneyFormatter.format(cents / 100);
export const normalize = text => String(text).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export function parseMoney(value) {
  const input = String(value).trim().replace(/^R\$\s*/i, '');
  if (!/^(?:\d{1,3}(?:\.\d{3})+|\d+)(?:,\d{1,2})?$/.test(input)) return null;
  const [whole, decimals = ''] = input.replaceAll('.', '').split(',');
  const cents = Number(whole) * 100 + Number(decimals.padEnd(2, '0'));
  return Number.isSafeInteger(cents) && cents > 0 && cents <= 100000000000 ? cents : null;
}

export function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function seedState() {
  const rows = [
    ['mercado', 'Mercado da semana', 'Alimentação', 28500, '2026-09-24', 'expense'],
    ['cafe', 'Café e pão', 'Alimentação', 1800, '2026-09-23', 'expense'],
    ['transporte', 'Transporte', 'Transporte', 3200, '2026-09-22', 'expense'],
    ['salario', 'Salário', 'Receita', 580000, '2026-09-20', 'income'],
    ['aluguel', 'Aluguel', 'Moradia', 180000, '2026-09-10', 'expense'],
    ['compras', 'Compras do mês', 'Alimentação', 65000, '2026-09-08', 'expense'],
    ['contas', 'Contas da casa', 'Moradia', 42000, '2026-09-05', 'expense'],
    ['farmacia', 'Farmácia', 'Saúde', 14500, '2026-09-03', 'expense'],
    ['cinema', 'Cinema', 'Lazer', 11000, '2026-09-02', 'expense'],
  ];
  return { version: SCHEMA_VERSION, transactions: rows.map(([id, description, category, amount, date, type]) => ({ id, description, category, amount, date, type })), goal: { name: 'Reserva de emergência', target: 300000, saved: 120000, monthly: 30000 } };
}

export function validTransaction(row) {
  return !!row && typeof row.id === 'string' && row.id.length > 0 && row.id.length <= 100 && typeof row.description === 'string' && row.description.trim().length > 0 && row.description.length <= 100 && CATEGORIES.includes(row.category) && Number.isSafeInteger(row.amount) && row.amount > 0 && row.amount <= 100000000000 && validDate(row.date) && ['income', 'expense'].includes(row.type) && (row.type === 'income' ? row.category === 'Receita' : row.category !== 'Receita');
}
export function validGoal(goal) {
  return !!goal && typeof goal.name === 'string' && goal.name.trim().length > 0 && goal.name.length <= 70 && Number.isSafeInteger(goal.target) && goal.target > 0 && goal.target <= 100000000000 && Number.isSafeInteger(goal.saved) && goal.saved >= 0 && goal.saved <= 100000000000 && Number.isSafeInteger(goal.monthly) && goal.monthly >= 0 && goal.monthly <= 100000000000;
}
export function validState(data) {
  return !!data && data.version === SCHEMA_VERSION && Array.isArray(data.transactions) && data.transactions.length <= 10000 && data.transactions.every(validTransaction) && new Set(data.transactions.map(row => row.id)).size === data.transactions.length && validGoal(data.goal);
}
export function loadState(storage) {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return { data: seedState(), warning: '' };
    const parsed = JSON.parse(raw);
    if (validState(parsed)) return { data: parsed, warning: '' };
    return { data: seedState(), warning: 'Os dados salvos eram incompatíveis. A demonstração foi restaurada.' };
  } catch {
    return { data: seedState(), warning: 'O armazenamento local está indisponível ou inválido. Você pode usar esta sessão.' };
  }
}
export function filterTransactions(rows, month, search = '', category = '') {
  return rows.filter(row => row.date.startsWith(month) && (!category || row.category === category) && normalize(row.description).includes(normalize(search))).sort((a, b) => b.date.localeCompare(a.date));
}
export function totals(rows) {
  const result = rows.reduce((sum, row) => { sum[row.type] += row.amount; return sum; }, { income: 0, expense: 0 });
  return { ...result, balance: result.income - result.expense };
}
export function categoryTotals(rows) {
  return Object.entries(rows.filter(row => row.type === 'expense').reduce((sum, row) => ({ ...sum, [row.category]: (sum[row.category] || 0) + row.amount }), {})).sort((a, b) => b[1] - a[1]);
}
export function goalProjection(goal) {
  const remaining = Math.max(0, goal.target - goal.saved);
  return { remaining, percent: Math.min(100, Math.round(goal.saved / goal.target * 100)), months: remaining === 0 ? 0 : goal.monthly > 0 ? Math.ceil(remaining / goal.monthly) : null };
}
export function savingsTip(rows) {
  const food = rows.filter(row => row.type === 'expense' && row.category === 'Alimentação').reduce((sum, row) => sum + row.amount, 0);
  if (!food) return 'Ainda não há despesas de alimentação neste mês. Registre alguns gastos para explorar uma simulação de economia.';
  return `Uma hipótese: reduzir 10% dos ${money(food)} de alimentação deste mês liberaria ${money(Math.round(food * 0.1))}. Cálculo: ${money(food)} × 10%. É uma simulação educativa, não uma previsão ou recomendação personalizada. Você decide se faz sentido para sua rotina.`;
}

/** A small deterministic parser, intentionally not an AI model. Nothing is saved here. */
export function parseMessage(message, defaultDate = TODAY) {
  const text = String(message).trim();
  const normalized = normalize(text);
  if (!text || text.length > 500) return { error: 'Escreva uma mensagem de até 500 caracteres.' };
  if (/economiz|poupar|dica/.test(normalized)) return { intent: 'tip' };
  const income = /\b(recebi|receita|entrada|ganhei|salario)\b/.test(normalized);
  const expense = /\b(gastei|paguei|comprei|gasto|despesa)\b/.test(normalized);
  if (income === expense) return { error: 'Informe uma entrada ou um gasto por vez. Ex.: “Gastei 28 no almoço”.' };
  let date = defaultDate;
  let withoutDate = text;
  const dates = [...text.matchAll(/\b\d{1,4}[/-]\d{1,2}(?:[/-]\d{2,4})?\b/g)];
  const relativeDates = [...normalized.matchAll(/\b(?:hoje|ontem)\b/g)];
  if (dates.length + relativeDates.length > 1) return { error: 'Encontrei mais de uma referência de data. Envie um registro por vez com apenas uma data.' };
  if (dates.length) {
    const value = dates[0][0];
    let parts = value.split(/[/-]/);
    if (parts[0].length === 4 && parts.length === 3) date = `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
    else if (parts.length === 2 || (parts.length === 3 && parts[2].length === 4)) date = `${parts[2] || defaultDate.slice(0, 4)}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    else return { error: 'Não consegui ler a data. Use dia/mês/ano, por exemplo 24/09/2026.' };
    if (!validDate(date) || Number(date.slice(0, 4)) < 1900 || Number(date.slice(0, 4)) > 2100) return { error: 'Use uma data válida entre 1900 e 2100. Confira o dia, mês e ano.' };
    withoutDate = text.replace(value, '');
  } else if (/\bontem\b/.test(normalized)) {
    const previous = new Date(`${defaultDate}T12:00:00Z`); previous.setUTCDate(previous.getUTCDate() - 1); date = previous.toISOString().slice(0, 10);
  } else if (/\b(amanha|segunda|terca|quarta|quinta|sexta|sabado|domingo|janeiro|fevereiro|marco|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)\b/.test(normalized) || /\bdia\s+\d/.test(normalized)) {
    return { error: 'Para essa data, use dia/mês/ano. Ex.: “Gastei 28 no almoço em 24/09/2026”.' };
  }
  if (/[-−–—]\s*(?:R\$\s*)?\d/.test(withoutDate) || /\b(menos|negativo)\b/.test(normalized)) return { error: 'Use um valor positivo. O tipo entrada ou saída define o movimento.' };
  const amounts = [...withoutDate.matchAll(/(?:[.,]\d|\d)[\d.,]*/g)];
  if (amounts.length !== 1) return { error: 'Informe um único valor por mensagem. Ex.: “Gastei 32,50 no transporte”.' };
  const amount = parseMoney(amounts[0][0].replace(/\.$/, ''));
  if (!amount) return { error: 'Use um valor positivo no formato brasileiro, como 28, 32,50 ou 1.200,00.' };
  let category = 'Outros';
  if (/mercado|supermercado|almoco|jantar|cafe|pao|comida|restaurante|alimentacao|lanche/.test(normalized)) category = 'Alimentação';
  else if (/transporte|uber|onibus|metro|gasolina|combustivel|taxi/.test(normalized)) category = 'Transporte';
  else if (/aluguel|luz|energia|agua|internet|condominio|moradia/.test(normalized)) category = 'Moradia';
  else if (/farmacia|remedio|saude|medico|consulta/.test(normalized)) category = 'Saúde';
  else if (/cinema|lazer|passeio|jogo|show/.test(normalized)) category = 'Lazer';
  else if (/curso|livro|escola|educacao|faculdade/.test(normalized)) category = 'Educação';
  let description = withoutDate.replace(amounts[0][0], '').replace(/R\$/gi, '').replace(/\b(gastei|paguei|comprei|recebi|ganhei|hoje|ontem)\b/gi, '').replace(/^\s*(?:no|na|em|de|com|por)\s+/i, '').replace(/\s+em\s*$/i, '').replace(/\s+/g, ' ').trim();
  description = description.replace(/^[,.:;\s]+|[,.:;\s]+$/g, '') || (income ? 'Entrada' : 'Despesa');
  description = description.charAt(0).toUpperCase() + description.slice(1);
  return { intent: 'transaction', draft: { description: description.slice(0, 100), category: income ? 'Receita' : category, amount, date, type: income ? 'income' : 'expense' } };
}

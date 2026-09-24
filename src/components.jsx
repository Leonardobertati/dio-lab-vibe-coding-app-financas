import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUp, BriefcaseBusiness, BusFront, CalendarDays, ChartNoAxesColumnIncreasing, Check, CircleDollarSign, Coffee, House, Leaf, List, Plus, Search, Send, ShieldCheck, ShoppingCart, Sparkles, Target, Trash2, Utensils, Wallet, X } from 'lucide-react';
import { CATEGORIES, MONTHS, categoryTotals, goalProjection, money, normalize, parseMessage, parseMoney, savingsTip, validDate } from './domain.js';

export const NAV = [{ id: 'overview', label: 'Visão geral', icon: House }, { id: 'transactions', label: 'Transações', icon: List }, { id: 'goals', label: 'Metas', icon: Target }, { id: 'reports', label: 'Relatórios', icon: ChartNoAxesColumnIncreasing }];

export function Sidebar({ view, onNavigate, onReset }) {
  return <aside className="sidebar"><a className="brand" href="#overview" onClick={event => { event.preventDefault(); onNavigate('overview'); }} aria-label="Folga — visão geral"><Leaf aria-hidden="true" /><span>folga</span></a><nav aria-label="Navegação principal">{NAV.map(({ id, label, icon: Icon }) => <button key={id} className={`nav-item ${view === id ? 'active' : ''}`} aria-current={view === id ? 'page' : undefined} onClick={() => onNavigate(id)}><Icon aria-hidden="true" /><span>{label}</span></button>)}</nav><div className="sidebar-footer"><p>Dados de demonstração<br />Projeto DIO · Codex</p><button className="text-button reset-button" onClick={onReset}>Restaurar demonstração</button></div></aside>;
}

export function MonthSelector({ month, setMonth, transactions }) {
  const options = [...new Set([...Object.keys(MONTHS), ...transactions.map(row => row.date.slice(0, 7))])].sort().reverse();
  function label(value) { return MONTHS[value] || new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}-15T12:00:00Z`)); }
  return <div className="month-control"><CalendarDays size={21} aria-hidden="true" /><label className="sr-only" htmlFor="month">Período em análise</label><select id="month" value={month} onChange={event => setMonth(event.target.value)}>{options.map(value => <option key={value} value={value}>{label(value)}</option>)}</select></div>;
}

export function Summary({ total }) {
  return <section className="summary-grid" aria-label="Resumo do período"><article className="summary-card balance"><div className="summary-icon"><Wallet /></div><div><p>Saldo do mês</p><strong>{money(total.balance)}</strong></div></article><article className="summary-card"><div className="summary-icon income-icon"><ArrowUp /></div><div><p>Entradas</p><strong>{money(total.income)}</strong></div></article><article className="summary-card"><div className="summary-icon expense-icon"><ArrowDown /></div><div><p>Saídas</p><strong className="expense-text">{money(total.expense)}</strong></div></article></section>;
}

function TransactionIcon({ row }) {
  const text = normalize(row.description);
  const Icon = row.type === 'income' ? BriefcaseBusiness : /cafe|pao/.test(text) ? Coffee : row.category === 'Alimentação' ? ShoppingCart : row.category === 'Transporte' ? BusFront : row.category === 'Moradia' ? House : Wallet;
  return <Icon className="transaction-icon" aria-hidden="true" />;
}

export function TransactionTable({ rows, full = false, onDelete, onClear, onAdd }) {
  if (!rows.length) return <div className="empty-state"><List size={32} aria-hidden="true" /><h3>Nenhum registro por aqui</h3><p>{onClear ? 'Não há lançamentos que correspondam aos filtros.' : 'Comece com uma entrada ou um gasto neste período.'}</p><button className="button secondary" onClick={onClear || onAdd}>{onClear ? 'Limpar filtros' : 'Registrar por conversa'}</button></div>;
  return <div className="table-wrap"><table className={full ? 'full-table' : ''}><thead><tr><th>Descrição</th><th className="category-cell">Categoria</th>{full && <th className="date-cell">Data</th>}<th className="amount-cell">Valor</th>{full && <th><span className="sr-only">Ações</span></th>}</tr></thead><tbody>{rows.map(row => <tr key={row.id}><td><div className="description-cell"><TransactionIcon row={row} /><div><span>{row.description}</span><small className={full ? 'row-detail' : 'mobile-category'}>{full ? `${row.type === 'income' ? 'Entrada' : 'Saída'} · ${row.category}` : row.category}</small>{full && <small className="mobile-date">{row.date.split('-').reverse().join('/')}</small>}</div></div></td><td className="category-cell"><span className="category-label">{row.category === 'Alimentação' ? <Utensils /> : row.category === 'Receita' ? <CircleDollarSign /> : row.category === 'Transporte' ? <BusFront /> : <span className="category-dot" />} {row.category}</span></td>{full && <td className="date-cell">{row.date.split('-').reverse().join('/')}</td>}<td className={`amount-cell ${row.type === 'income' ? 'income-text' : 'expense-text'}`}><span className="sr-only">{row.type === 'income' ? 'Entrada ' : 'Saída '}</span>{row.type === 'income' ? '+' : '−'}{money(row.amount)}</td>{full && <td><button className="icon-button delete-button" aria-label={`Excluir ${row.description}`} onClick={() => onDelete(row)}><Trash2 size={18} /></button></td>}</tr>)}</tbody></table></div>;
}

export function Transactions({ rows, onDelete, onAdd }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const filtered = rows.filter(row => normalize(row.description).includes(normalize(search)) && (!category || row.category === category) && (!type || row.type === type));
  const clear = () => { setSearch(''); setCategory(''); setType(''); };
  return <section className="panel transactions-panel"><div className="panel-heading"><div><h2>Suas transações</h2><p>{filtered.length} {filtered.length === 1 ? 'registro confirmado' : 'registros confirmados'} neste período</p></div><button className="button secondary" onClick={onAdd}><Plus size={18} />Novo registro</button></div><div className="filters"><label className="search-field"><span className="sr-only">Buscar descrição</span><Search size={18} /><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Buscar descrição" /></label><label><span className="sr-only">Filtrar tipo</span><select aria-label="Filtrar tipo" value={type} onChange={event => setType(event.target.value)}><option value="">Entradas e saídas</option><option value="income">Entradas</option><option value="expense">Saídas</option></select></label><label><span className="sr-only">Filtrar categoria</span><select aria-label="Filtrar categoria" value={category} onChange={event => setCategory(event.target.value)}><option value="">Todas as categorias</option>{CATEGORIES.map(item => <option key={item}>{item}</option>)}</select></label>{(search || category || type) && <button className="text-button" onClick={clear}>Limpar</button>}</div><TransactionTable rows={filtered} full onDelete={onDelete} onClear={search || category || type ? clear : undefined} onAdd={onAdd} /></section>;
}

export function GoalCard({ goal, onEdit, detailed = false }) {
  const projection = goalProjection(goal);
  return <section className={`panel goal-card ${detailed ? 'goal-detailed' : ''}`}><h2>Um plano para sua tranquilidade</h2><div className="goal-main"><div className="goal-icon"><Target size={34} /></div><div className="goal-copy"><h3>{goal.name}</h3><p>{money(goal.saved)} <span>de {money(goal.target)}</span></p></div><button className="button secondary" onClick={onEdit}>Ajustar meta</button></div><div className="progress-row"><div className="progress-track" role="progressbar" aria-label="Progresso da reserva" aria-valuenow={projection.percent} aria-valuemin={0} aria-valuemax={100}><div style={{ width: `${projection.percent}%` }} /></div><span>{projection.percent}%</span></div>{detailed && <><div className="goal-facts"><div><span>Falta reservar</span><strong>{money(projection.remaining)}</strong></div><div><span>Aporte mensal simulado</span><strong>{money(goal.monthly)}</strong></div><div><span>Estimativa simples</span><strong>{projection.months === 0 ? 'Meta alcançada' : projection.months === null ? 'Defina um aporte' : `${projection.months} meses`}</strong></div></div><div className="education-note"><ShieldCheck /><p>Simulação sem juros, inflação ou rendimentos. O prazo considera o valor que falta dividido pelo aporte mensal, arredondado para cima. Ajustar esta meta não movimenta dinheiro e não altera seu saldo.</p></div></>}</section>;
}

export function Modal({ title, onClose, children }) {
  const ref = useRef(null);
  useEffect(() => { const node = ref.current; node.showModal(); return () => { if (node.open) node.close(); }; }, []);
  return <dialog ref={ref} className="modal" onCancel={onClose} aria-labelledby="modal-title"><div className="modal-heading"><h2 id="modal-title">{title}</h2><button className="icon-button" aria-label="Fechar janela" onClick={onClose}><X /></button></div>{children}</dialog>;
}

const editMoney = cents => (cents / 100).toFixed(2).replace('.', ',');
export function GoalEditor({ goal, onSave, onClose }) {
  const [form, setForm] = useState({ name: goal.name, target: editMoney(goal.target), saved: editMoney(goal.saved), monthly: editMoney(goal.monthly) });
  const [error, setError] = useState('');
  function submit(event) {
    event.preventDefault();
    const target = parseMoney(form.target), saved = /^0(?:,0{1,2})?$/.test(form.saved.trim()) ? 0 : parseMoney(form.saved), monthly = parseMoney(form.monthly);
    if (!form.name.trim() || !target || saved === null || !monthly) { setError('Informe um nome, alvo e aporte positivos. O valor reservado pode ser zero. Use o formato 1.200,00.'); return; }
    onSave({ name: form.name.trim(), target, saved, monthly }); onClose();
  }
  return <Modal title="Ajustar sua meta" onClose={onClose}><form className="edit-form" onSubmit={submit}><p className="muted">Uma simulação para planejar com calma. Nenhum dinheiro será movimentado.</p><label>Nome da meta<input autoFocus maxLength={70} required value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} /></label><div className="form-grid"><label>Valor-alvo (R$)<input inputMode="decimal" required value={form.target} onChange={event => setForm({ ...form, target: event.target.value })} /></label><label>Já reservado (R$)<input inputMode="decimal" required value={form.saved} onChange={event => setForm({ ...form, saved: event.target.value })} /></label></div><label>Aporte mensal simulado (R$)<input inputMode="decimal" required value={form.monthly} onChange={event => setForm({ ...form, monthly: event.target.value })} /></label>{error && <p className="field-error" role="alert">{error}</p>}<div className="form-actions"><button type="button" className="button secondary" onClick={onClose}>Cancelar</button><button className="button primary" type="submit">Salvar meta</button></div></form></Modal>;
}

function DraftForm({ draft, onConfirm, onCancel }) {
  const [form, setForm] = useState({ ...draft, amount: editMoney(draft.amount) });
  const [error, setError] = useState('');
  const submitting = useRef(false);
  function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    const amount = parseMoney(form.amount);
    if (!amount || !form.description.trim() || !validDate(form.date) || Number(form.date.slice(0, 4)) < 1900 || Number(form.date.slice(0, 4)) > 2100) { setError('Confira descrição, valor positivo e uma data válida entre 1900 e 2100.'); return; }
    submitting.current = true;
    onConfirm({ ...form, description: form.description.trim(), amount });
  }
  return <form className="draft-form" onSubmit={submit}><div className="draft-heading"><Check size={18} /><h3>Confira antes de registrar</h3></div><label>Descrição<input autoFocus required maxLength={100} value={form.description} onChange={event => setForm({ ...form, description: event.target.value })} /></label><div className="form-grid"><label>Tipo<select value={form.type} onChange={event => setForm({ ...form, type: event.target.value, category: event.target.value === 'income' ? 'Receita' : 'Outros' })}><option value="expense">Saída</option><option value="income">Entrada</option></select></label><label>Valor (R$)<input required inputMode="decimal" value={form.amount} onChange={event => setForm({ ...form, amount: event.target.value })} /></label></div><div className="form-grid"><label>Categoria<select value={form.category} onChange={event => setForm({ ...form, category: event.target.value })}>{CATEGORIES.filter(category => form.type === 'income' ? category === 'Receita' : category !== 'Receita').map(category => <option key={category}>{category}</option>)}</select></label><label>Data<input required type="date" min="1900-01-01" max="2100-12-31" value={form.date} onChange={event => setForm({ ...form, date: event.target.value })} /></label></div><p className="draft-note">Ainda não foi salvo. A data segue o cenário de demonstração.</p>{error && <p className="field-error" role="alert">{error}</p>}<div className="form-actions"><button type="button" className="button secondary" onClick={onCancel}>Cancelar</button><button className="button primary" type="submit">Confirmar registro</button></div></form>;
}

export function Chat({ rows, month, onSave, inputRef }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState(null);
  const logRef = useRef(null);
  const refocus = useRef(false);
  useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, [messages, draft]);
  useEffect(() => { if (!draft && refocus.current) { refocus.current = false; inputRef.current?.focus(); } }, [draft, inputRef]);
  function send(text) {
    if (!text.trim() || draft) return;
    const result = parseMessage(text, `${month}-24`);
    const reply = result.error || (result.intent === 'tip' ? savingsTip(rows) : `Encontrei ${money(result.draft.amount)} em ${result.draft.category.toLowerCase()}. Você pode corrigir os campos abaixo.`);
    setMessages(previous => [...previous.slice(-18), { role: 'user', text }, { role: 'assistant', text: reply }]);
    setInput('');
    if (result.draft) setDraft(result.draft);
  }
  function finish(record) {
    onSave(record);
    setMessages(previous => [...previous, { role: 'assistant', text: `Registro confirmado: ${record.description}, ${money(record.amount)}. Seu resumo já foi atualizado.` }]);
    refocus.current = true; setDraft(null);
  }
  function cancel() { refocus.current = true; setDraft(null); setMessages(previous => [...previous, { role: 'assistant', text: 'Tudo bem. A sugestão foi cancelada; nenhum registro foi salvo.' }]); }
  return <section className="panel chat-panel" id="conversation" aria-labelledby="chat-heading"><div className="chat-heading"><div className="assistant-icon"><Sparkles /></div><div><h2 id="chat-heading">Converse com o Folga</h2><p>Assistente demonstrativo</p></div></div><div className={`chat-log ${draft ? 'has-draft' : ''}`} ref={logRef} role="log" aria-label="Conversa com o Folga" aria-live="polite"><div className="message assistant">Oi! Vamos organizar seu dia?<br />Me conte uma entrada ou um gasto.</div>{messages.map((message, index) => <div className={`message ${message.role}`} key={index}>{message.text}</div>)}{draft && <DraftForm key={`${draft.description}-${draft.amount}-${draft.date}`} draft={draft} onConfirm={finish} onCancel={cancel} />}</div>{!messages.length && <div className="suggestions"><button onClick={() => send('Gastei 32 no transporte')}>Gastei 32 no transporte</button><button onClick={() => send('Como posso economizar?')}>Como posso economizar?</button></div>}<div className="chat-bottom"><div className="control-note"><ShieldCheck /><div><strong>Você no controle</strong><p>Revise os dados antes de confirmar cada registro.</p></div></div><form className="chat-input" onSubmit={event => { event.preventDefault(); send(input); }}><label className="sr-only" htmlFor="chat-message">Conte uma entrada ou um gasto</label><input id="chat-message" ref={inputRef} maxLength={500} disabled={!!draft} value={input} onChange={event => setInput(event.target.value)} placeholder={draft ? 'Confirme ou cancele a prévia acima' : 'Ex.: gastei 28 no almoço'} autoComplete="off" /><button className="send-button" type="submit" disabled={!!draft || !input.trim()} aria-label="Enviar mensagem"><Send /></button></form><p className="chat-footnote">Simulação educativa com dados fictícios. <span>Interpretação por regras, sem IA conectada.</span></p></div></section>;
}

export function Reports({ rows, onAdd }) {
  const categories = categoryTotals(rows);
  const total = categories.reduce((sum, [, value]) => sum + value, 0);
  if (!total) return <section className="panel"><div className="empty-state"><ChartNoAxesColumnIncreasing size={38} /><h2>Seu relatório começa com um registro</h2><p>Este período ainda não tem despesas para comparar.</p><button className="button primary" onClick={onAdd}>Registrar por conversa</button></div></section>;
  const top = categories[0];
  return <section className="panel report-panel"><div className="panel-heading"><div><h2>Para onde foi seu dinheiro</h2><p>Somente saídas confirmadas do período selecionado.</p></div><strong className="report-total">{money(total)}</strong></div><div className="category-chart" aria-label="Distribuição das despesas por categoria">{categories.map(([category, amount], index) => <div className="chart-row" key={category}><div className="chart-label"><span>{category}</span><span><strong>{money(amount)}</strong><small>{(amount / total * 100).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%</small></span></div><div className="chart-track"><div style={{ width: `${amount / total * 100}%`, background: index === 0 ? 'var(--green)' : index % 2 ? '#91ba69' : '#c6dd8d' }} /></div></div>)}</div><div className="report-insight"><Sparkles /><div><h3>Um olhar sobre o mês</h3><p>{top[0]} representa {(top[1] / total * 100).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}% das saídas: {money(top[1])} ÷ {money(total)} × 100.</p><p>{savingsTip(rows)}</p></div></div></section>;
}

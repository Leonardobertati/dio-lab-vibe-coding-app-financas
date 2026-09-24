import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Plus, X } from 'lucide-react';
import { Chat, GoalCard, GoalEditor, Modal, MonthSelector, Reports, Sidebar, Summary, Transactions, TransactionTable } from './components.jsx';
import { STORAGE_KEY, filterTransactions, loadState, seedState, totals } from './domain.js';

function loadInitial() { try { return loadState(window.localStorage); } catch { return { data: seedState(), warning: 'Armazenamento indisponível. As alterações durarão somente esta sessão.' }; } }

export default function App() {
  const [initial] = useState(loadInitial);
  const [data, setData] = useState(initial.data);
  const [storageWarning, setStorageWarning] = useState(initial.warning);
  const [view, setView] = useState('overview');
  const [month, setMonth] = useState('2026-09');
  const [modal, setModal] = useState(null);
  const [resetEpoch, setResetEpoch] = useState(0);
  const [toast, setToast] = useState(null);
  const inputRef = useRef(null);
  const focusChat = useRef(false);
  const toastCounter = useRef(0);
  const rows = filterTransactions(data.transactions, month);
  const total = totals(rows);
  useEffect(() => { try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { setStorageWarning('Armazenamento indisponível. As alterações durarão somente esta sessão.'); } }, [data]);
  useEffect(() => { if (!toast) return; const timeout = setTimeout(() => setToast(null), 12000); return () => clearTimeout(timeout); }, [toast]);
  useEffect(() => { if (focusChat.current && view === 'overview') { focusChat.current = false; inputRef.current?.focus(); inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }, [view]);
  function notify(text, undo) { setToast({ id: ++toastCounter.current, text, undo }); }
  function newRecord() { if (view !== 'overview') { focusChat.current = true; setView('overview'); } else { inputRef.current?.focus(); inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }
  function save(record) { const transaction = { ...record, id: crypto.randomUUID() }; setData(previous => ({ ...previous, transactions: [transaction, ...previous.transactions] })); setMonth(record.date.slice(0, 7)); notify('Registro salvo. Resumo e relatório atualizados.'); }
  function remove(record) { setData(previous => ({ ...previous, transactions: previous.transactions.filter(row => row.id !== record.id) })); notify(`“${record.description}” excluído.`, () => { setData(previous => ({ ...previous, transactions: previous.transactions.some(row => row.id === record.id) ? previous.transactions : [...previous.transactions, record] })); notify('Registro restaurado.'); }); }
  function reset() { setData(seedState()); setResetEpoch(previous => previous + 1); setMonth('2026-09'); setView('overview'); setModal(null); notify('Demonstração restaurada com os dados fictícios iniciais.'); }
  const titles = { transactions: ['Tudo o que entrou. Tudo o que saiu.', 'Encontre seus registros e acompanhe cada movimento.'], goals: ['Mais tranquilidade, um passo por vez.', 'Uma reserva começa com um plano possível.'], reports: ['Entenda os caminhos do seu dinheiro.', 'Uma visão simples para fazer escolhas com mais clareza.'] };
  return <>
    <a href="#main-content" className="skip-link">Pular para o conteúdo</a>
    <Sidebar view={view} onNavigate={setView} onReset={() => setModal('reset')} />
    <main className="workspace" id="main-content">
      <header className="topbar"><span>Meu espaço</span><MonthSelector month={month} setMonth={setMonth} transactions={data.transactions} /></header>
      <div className="main-content">
        <div className="page-heading"><div><h1>{view === 'overview' ? 'Seu dinheiro, com mais respiro.' : titles[view][0]}</h1><p>{view === 'overview' ? 'Um passo de cada vez. Comece por uma conversa.' : titles[view][1]}</p></div><button className="button primary new-record" onClick={newRecord}><Plus size={24} />Novo registro</button></div>
        {storageWarning && <p className="storage-warning" role="status">{storageWarning}</p>}
        <Summary total={total} />
        {view === 'overview' ? <div className="dashboard-grid">
          <div className="dashboard-left">
            <section className="panel recent-panel"><div className="panel-heading"><h2>Últimas transações</h2><button className="text-button" onClick={() => setView('transactions')}>Ver todas <ArrowRight size={18} /></button></div><TransactionTable rows={rows.slice(0, 4)} onAdd={newRecord} /></section>
            <GoalCard goal={data.goal} onEdit={() => setModal('goal')} />
          </div>
          <Chat key={`chat-${resetEpoch}`} rows={rows} month={month} onSave={save} inputRef={inputRef} />
        </div> : view === 'transactions' ? <Transactions rows={rows} onDelete={remove} onAdd={newRecord} /> : view === 'goals' ? <GoalCard goal={data.goal} onEdit={() => setModal('goal')} detailed /> : <Reports rows={rows} onAdd={newRecord} />}
        <footer className="workspace-footer"><p>Saldo do mês = entradas − saídas registradas. Não representa o saldo de uma conta bancária.</p><p>Dados fictícios neste navegador, sem sincronização ou backup em nuvem.</p></footer>
      </div>
    </main>
    {toast && <div className="toast" key={toast.id} role="status"><Check size={19} /><span>{toast.text}</span>{toast.undo && <button onClick={toast.undo}>Desfazer</button>}<button className="toast-close" aria-label="Fechar aviso" onClick={() => setToast(null)}><X size={18} /></button></div>}
    {modal === 'goal' && <GoalEditor goal={data.goal} onClose={() => setModal(null)} onSave={goal => { setData(previous => ({ ...previous, goal })); notify('Meta atualizada. Nenhum dinheiro foi movimentado.'); }} />}
    {modal === 'reset' && <Modal title="Restaurar demonstração?" onClose={() => setModal(null)}><p className="modal-description">Os registros e a meta salvos neste navegador serão substituídos pelos dados fictícios iniciais. Esta ação não pode ser desfeita.</p><div className="form-actions"><button className="button secondary" onClick={() => setModal(null)}>Cancelar</button><button className="button primary" onClick={reset}>Restaurar dados fictícios</button></div></Modal>}
  </>;
}

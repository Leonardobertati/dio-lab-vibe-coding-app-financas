# Sistema visual — Folga

Referência: [conceito visual gerado com IA](evidencias/00-conceito-visual.png), inspecionado antes da implementação. A imagem é referência de design, não uma captura de aplicativo pronto.

## Composição

Tela principal de 1536 × 1024: navegação lateral branca de aproximadamente 246 px; conteúdo sobre fundo cinza esverdeado muito claro; cabeçalho com “Meu espaço” e seletor de mês; título e ação; três resumos; tabela à esquerda, assistente à direita e meta abaixo da tabela. Conteúdo nativo em HTML/React, nunca imagem clicável.

## Tokens

| Token | Valor | Uso |
|---|---|---|
| Fundo | `#f5f6f2` | Área de trabalho |
| Superfície | `#ffffff` | Sidebar e painéis |
| Verde principal | `#163e35` | Marca, saldo, ação principal |
| Texto | `#14222d` | Conteúdo e títulos |
| Texto secundário | `#697780` | Descrições e legendas |
| Lima | `#d6f282` | Progresso e destaques |
| Lima claro | `#f0f9d8` | Navegação selecionada e aviso |
| Saída | `#bc3519` | Despesas |
| Entrada | `#147846` | Receitas |
| Borda | `#dfe5df` | Controles e painéis |
| Raios | 12 / 16 / 24 px | Controles, painéis, conversa |

Tipografia: Inter quando disponível, com fallback para system-ui e Segoe UI. Títulos de 32–40 px, valores de 30–34 px, subtítulos 20–23 px, conteúdo 15–16 px e legendas de 12–14 px. Pesos 400, 500, 600 e 700; entrelinha 1,45. Botões e selects têm tipografia explícita. Espaçamento base: 4, 8, 12, 16, 20, 24, 32 px. Sombras quase ausentes.

## Inventário de componentes

- Marca: `Leaf` Lucide, com traço verde de 2 px; texto “folga”. Ícones de navegação: `House`, `List`, `Target`, `ChartNoAxesColumnIncreasing`.
- Resumos: `Wallet`, `ArrowUp`, `ArrowDown` em círculos; saldo em painel verde, demais em branco.
- Transações: tabela de quatro linhas na visão geral. Ícones de carrinho, café, ônibus e maleta; categoria e valor alinhados em colunas.
- Assistente: `Sparkles`, bolhas de conversa, duas sugestões, aviso `ShieldCheck`, entrada e botão circular `Send`.
- Meta: `Target`, texto, botão “Ajustar meta” e progresso com percentual.
- Estados necessários além do conceito: navegação das demais seções, filtros, formulário de revisão e meta, relatório e vazio. Reutilizam os mesmos tokens, painéis, campos e botões; esses estados são exigidos pelo fluxo funcional.

## Texto da primeira tela

“Meu espaço”; “Setembro de 2026”; “Seu dinheiro, com mais respiro.”; “Um passo de cada vez. Comece por uma conversa.”; “Novo registro”; “Saldo do mês”; “Entradas”; “Saídas”; “Últimas transações”; “Ver todas”; “Converse com o Folga”; “Assistente demonstrativo”; “Oi! Vamos organizar seu dia? Me conte uma entrada ou um gasto.”; “Gastei 32 no transporte”; “Como posso economizar?”; “Você no controle”; “Revise os dados antes de confirmar cada registro.”; “Ex.: gastei 28 no almoço”; “Simulação educativa com dados fictícios.”; “Um plano para sua tranquilidade”; “Reserva de emergência”; “Ajustar meta”; “Dados de demonstração”; “Projeto DIO · Codex”.

## Responsividade e interação

Sidebar se torna navegação superior compacta em telas menores. Resumos empilham em celulares; tabela mantém descrição e valor visíveis; categoria vai para a segunda linha da descrição. Conversa segue a tabela na ordem de leitura e pode ser acessada diretamente pela ação principal. Foco visível, campos rotulados, navegação por teclado, mensagens de status em região viva e redução de movimento respeitada.

Desvios intencionais necessários: sombras/gradientes da imagem foram traduzidos em superfícies sólidas; folha implementada como ícone SVG vetorial Lucide; conteúdo adicional aparece apenas nos estados funcionais. Avisos de persistência surgem somente quando necessários.

## Comparação visual da implementação

Referência e captura [04-app-visao-geral.jpg](evidencias/04-app-visao-geral.jpg) foram abertas diretamente com `view_image`, na mesma rodada de inspeção. A imagem conceitual tem 1536 × 1024 px; a captura inicial do navegador tem 1521 × 1014 px. A diferença no tamanho da captura foi considerada na comparação, sem alegar equivalência pixel a pixel.

| Ponto | Evidência e resultado |
|---|---|
| Composição | Sidebar, cabeçalho, três resumos, tabela à esquerda, conversa à direita e meta abaixo preservam a ordem e as proporções da referência. |
| Paleta | Fundo cinza esverdeado, painéis brancos, saldo verde, despesas vermelhas e destaques lima conferem com a referência. |
| Hierarquia e texto | Título, subtítulo, navegação, resumos, nomes dos painéis e chamada principal mantidos. Controles e tabela usam tamanhos levemente menores para acomodar os estados reais. |
| Dados visíveis | Quatro transações na primeira tela e totais R$ 5.800,00 / R$ 3.460,00 / R$ 2.340,00 preservados; a meta usa centavos também nos valores de contexto para consistência monetária. |
| Componentes e espaços | Bordas finas, cantos arredondados, círculos dos ícones, tabela em linhas e progresso horizontal preservados. Superfícies sólidas substituem os gradientes sutis da imagem. |
| Ícones | Lucide conserva o traço leve e a função dos símbolos. A folha, o alvo e o símbolo de transporte são variantes vetoriais intencionais. |
| Conteúdo obrigatório adicional | Avisos “Interpretação por regras, sem IA conectada”, saldo não bancário, persistência local e restauração foram adicionados para cumprir os requisitos de transparência e controle. |

Não foi identificado desvio material de composição na captura inicial. As capturas dos demais estados e a verificação funcional e responsiva são registradas separadamente no relatório de validação do projeto. A imagem conceitual não é apresentada como evidência de funcionamento.

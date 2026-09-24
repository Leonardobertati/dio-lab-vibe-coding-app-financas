# Prompts e evolução das instruções

## 1. Intenção inicial no Codex

Síntese editorial do pedido do participante, **não uma transcrição integral**: analisar o desafio DIO, planejar e executar a entrega; usar Codex e, se útil, ChatGPT; criar um PRD e uma tela demonstrável; registrar capturas e análises; escrever uma reflexão; fazer o fork e publicar o material na conta do participante.

## 2. Da intenção para requisitos

A especificação foi estruturada pelo Codex e consolidada no [PRD / prompt final](PRD.md). Esse documento foi encaminhado à implementação como requisito de leitura e aplicação. Os exemplos, critérios e limites serviram para revisar o comportamento, e não apenas para produzir uma imagem.

Os refinamentos centrais foram: confirmação antes de salvar; valores em centavos; tratamento de ambiguidade; demonstração claramente rotulada; distinção entre saldo registrado e saldo bancário; simulação sem movimentação de dinheiro; estados vazios; versão móvel e armazenamento local.

## 3. Brief visual usado na geração de imagem

Foi utilizada a ferramenta integrada de geração de imagens do Codex, sem API externa configurada no aplicativo. O resultado está em [00-conceito-visual.png](evidencias/00-conceito-visual.png). O prompt exato da chamada foi:

```text
Use case: ui-mockup. Create one refined high-fidelity desktop web app UI design screenshot, 1536x1024 landscape, full primary screen of a Brazilian personal finance conversational app named 'folga'. This is a reference design for a real React implementation. All text and UI must be readable Portuguese, code-native implementable flat surfaces, not a photo of laptop, no perspective, no surrounding device. Visual direction: editorial calm financial workspace, off-white light gray background #f5f6f2, white surfaces, deep forest green #163e35, lime #d6f282 accent, charcoal typography, warm orange expense details. Elegant generous whitespace, subtle thin borders, 16px radii, no gradients, no illustration required, outlined 20px icons. Left narrow white sidebar 215px, brand folga with simple outlined leaf icon, navigation 'Visão geral' selected, 'Transações', 'Metas', 'Relatórios', bottom subtle 'Dados de demonstração' and 'Projeto DIO • Codex'. Main top: small top bar 'Meu espaço' and right month selector 'Setembro de 2026'. Heading 'Seu dinheiro, com mais respiro.' subline 'Um passo de cada vez. Comece por uma conversa.' Top right primary forest button '+ Novo registro'. Three horizontal balanced summary cards: Saldo do mês R$ 2.340,00 forest background white text; Entradas R$ 5.800,00 white; Saídas R$ 3.460,00 white with orange arrow. Below left 2/3 width wide panel 'Últimas transações' with subtle 'Ver todas' and table columns Descrição, Categoria, Valor, four rows Mercado da semana Alimentação −R$ 285,00; Café e pão Alimentação −R$ 18,00; Transporte Transporte −R$ 32,00; Salário Receita +R$ 5.800,00. Below smaller panel 'Um plano para sua tranquilidade' with 'Reserva de emergência', R$ 1.200 de R$ 3.000, 40% horizontal lime progress, button 'Ajustar meta'. Right 1/3 height tall conversation panel white: dark green circular sparkle icon, header 'Converse com o Folga', subtitle 'Assistente demonstrativo'. Welcome bubble 'Oi! Vamos organizar seu dia? Me conte uma entrada ou um gasto.' Two plain quick action chips 'Gastei 32 no transporte' and 'Como posso economizar?'. Lower a quiet pale lime tip 'Você no controle' and sentence 'Revise os dados antes de confirmar cada registro.' Anchored bottom chat input placeholder 'Ex.: gastei 28 no almoço' with forest send button. Small footnote 'Simulação educativa com dados fictícios.' Strong whitespace and type scale; balanced full app visible. No extra nav items, badges over headings, invented financial claims, charts unrelated to listed features, screenshots of chat platforms, decorative doodles, external logos. Footer baseline fully visible. Render precisely as polished app UI.
```

## 4. Revisão complementar no ChatGPT

- [Prompt exato enviado](evidencias/01-chatgpt-prompt.txt)
- [Texto da resposta obtida](evidencias/02-chatgpt-resposta.md)
- [Print do pedido](evidencias/01-chatgpt-revisao-prompt.jpg)
- [Print dos riscos](evidencias/02-chatgpt-revisao-riscos.jpg)
- [Print dos critérios](evidencias/03-chatgpt-revisao-criterios.jpg)

A revisão foi feita sobre um resumo do briefing enquanto o protótipo estava sendo produzido. Ela reforçou riscos e critérios do PRD; não foi uma auditoria do código nem um teste do aplicativo. As capturas mostram trechos reais da conversa. A resposta textual está completa, extraída do conteúdo renderizado no navegador.

## 5. Fechamento do ciclo

O [registro de validação](VALIDACAO.md) associa critérios a verificações realmente executadas. A [reflexão](PROCESSO-E-REFLEXAO.md) discute decisões e limitações observadas. A apresentação de uma resposta de IA não é tratada como prova de que a implementação funciona.

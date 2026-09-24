# Processo, decisões e reflexão — Folga

Projeto do desafio de Vibe Coding da DIO. Produção em 24 de setembro de 2026, com direção de Leonardo Bertati e apoio de Codex. O ChatGPT participou de uma revisão complementar do briefing.

## Como a ideia foi transformada em entrega

O ponto de partida foi o problema do enunciado: organizar as finanças costuma exigir registros repetitivos e pouco acolhedores para iniciantes. A primeira decisão foi definir uma tarefa pequena e observável: escrever uma despesa, revisar os dados reconhecidos e confirmar o registro.

O conceito recebeu o nome **Folga**. A proposta não é prometer riqueza nem dizer à pessoa como deve viver. É dar mais clareza sobre o mês e permitir pequenos planos acompanháveis.

A análise foi convertida em um [PRD](PRD.md), utilizado como especificação durante a construção no Codex. O documento delimitou cinco capacidades, quatro destinos de navegação, estados de erro e critérios de aceitação. A conversa integra a visão geral; ela não precisa de uma quinta entrada no menu.

Antes da implementação visual, a ferramenta de geração de imagens do Codex produziu um [conceito de interface](evidencias/00-conceito-visual.png). Esse arquivo é uma referência de design, **não um print de um aplicativo funcionando**. A implementação usa componentes reais, controles e cálculos locais. As capturas do protótipo são identificadas separadamente no README.

O trabalho no Codex foi dividido entre especificação, implementação e revisão de consistência, com integração e conferência da entrega. Esse processo ajudou a manter decisões de produto, código e documentação alinhados.

## Por que Codex e ChatGPT

A escolha do participante foi usar **Codex no lugar de Copilot e Lovable**. O objetivo didático foi preservado: transformar intenção em instruções, revisar resultados e documentar o processo. Não foram utilizadas nem simuladas telas de Copilot ou Lovable. Esta é uma adaptação declarada das ferramentas do enunciado, sem afirmar aprovação prévia da DIO.

O ChatGPT foi utilizado como revisor complementar. O [pedido real](evidencias/01-chatgpt-prompt.txt) descreve o escopo do Folga e pede três riscos e três critérios de aceitação, sem código ou resultados inventados. A [resposta extraída da conversa](evidencias/02-chatgpt-resposta.md) está preservada com as capturas correspondentes.

## O que a revisão acrescentou

| Ponto levantado | Tratamento no projeto |
| --- | --- |
| Não confundir IA criadora com IA integrada | README e interface identificam o assistente demonstrativo; o código não chama modelo externo |
| Frases ambíguas e múltiplos valores | Interpretador restrito; orientações para reformular; prévia antes de confirmar |
| Confirmação duplicada | A prévia confirmada deixa de estar disponível para novo salvamento |
| Totais inconsistentes após exclusão | Resumos e relatório derivados da mesma coleção de transações |
| Divisão por zero na simulação | Validação do aporte e tratamento de meta atingida |
| Simulação confundida com movimentação | Aporte simulado não cria despesa nem aumenta a reserva automaticamente |

Os itens da revisão são critérios e riscos, não comprovação de teste. A comprovação executada fica no documento [VALIDACAO.md](VALIDACAO.md).

## Comentários sobre a criação do aplicativo

**A confirmação é parte do produto.** Reduzir digitação não significa retirar controle. A IA pode sugerir categoria e preencher uma prévia; a pessoa deve ver o que será salvo e poder corrigir antes.

**O cálculo precisa ser mais previsível que a conversa.** Valores monetários são tratados em centavos, e receitas, despesas e saldo usam a mesma fonte de dados. Uma resposta agradável perde valor quando não corresponde ao histórico.

**Um MVP precisa ter limites visíveis.** A demonstração usa regras locais e dados fictícios. Isso permite verificar o fluxo sem custo de API, autenticação ou integração bancária. Também revela uma limitação real: escrever frases livres não garante que elas sejam compreendidas.

**A tela deve ajudar a entender, não apenas impressionar.** Verde escuro, áreas claras e poucos elementos dão destaque ao saldo e à conversa. O relatório complementa números com texto; sinais e rótulos acompanham as cores. A versão móvel deve manter os controles acessíveis.

## Reflexão sobre o processo

### O que funcionou bem?

Descrever exemplos concretos foi mais útil do que pedir apenas “um app financeiro com IA”. A frase de entrada, a prévia esperada e o efeito sobre o saldo transformaram uma ideia ampla em uma experiência verificável. Delimitar o MVP também evitou ampliar o trabalho para bancos, investimentos ou contas de usuário.

A revisão complementar trouxe um contraponto: além do caminho feliz, o projeto precisava considerar ambiguidades, cliques repetidos e simulações inválidas. Registrar os riscos antes de concluir ajudou a orientar a verificação.

### O que não funcionou como uma solução completa?

O interpretador por regras não entende linguagem natural de forma geral. Ele demonstra a jornada, mas não substitui uma integração de IA validada. Também não há sincronização entre dispositivos: os registros ficam no navegador. A simulação de reserva é uma conta sem rendimentos, não uma previsão financeira.

Uma imagem gerada também não é automaticamente uma especificação pronta. Elementos interativos, estados vazios, confirmação, limites e adaptação ao celular precisam ser explicitados e verificados na implementação.

### O que foi aprendido sobre conversar com IAs?

O principal aprendizado deste projeto é que um bom prompt funciona como um acordo verificável: informa contexto, público, objetivo, exemplos, limites e critérios. Pedidos como “pergunte quando faltar informação”, “não grave antes da confirmação” e “explique a fórmula” dão à IA uma direção mais útil do que adjetivos genéricos.

Vibe Coding não elimina a revisão. A IA acelera a criação, mas é necessário comparar intenção, interface, comportamento e evidências. Documentar uma limitação com honestidade é mais útil para o portfólio do que apresentar uma simulação como um produto final.

Esta reflexão descreve o trabalho documentado e as lições extraídas dele. Não atribui ao participante testes de usuário, entrevistas ou experiências pessoais que não ocorreram.

## Próximo experimento proposto

Realizar o piloto descrito no PRD com cinco pessoas iniciantes e dados fictícios. Observar se entendem a prévia, conseguem corrigir a categoria, interpretam o saldo do período e distinguem uma simulação de dinheiro realmente reservado. Só depois desses resultados faz sentido avaliar uma integração real com IA e persistência em nuvem. O piloto é uma proposta futura, não uma pesquisa concluída.

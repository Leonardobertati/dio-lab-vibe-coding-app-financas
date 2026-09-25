# Prompts e evolução das instruções

O projeto foi refinado em etapas. Esta página distingue **trechos reais dos pedidos** de **instruções consolidadas para reproduzir a versão final**. Uma síntese editorial não é apresentada como transcrição histórica.

## 1. Intenção inicial

**Síntese editorial:** analisar o desafio de organização financeira, definir o conceito de um aplicativo, elaborar seu PRD, produzir telas demonstráveis e documentar o processo com capturas, comentários e reflexão.

A primeira versão priorizou um painel financeiro e usou regras para reconhecer exemplos de gastos. Ela ajudou a explorar o fluxo, mas deixou a conversa pequena demais para a proposta do produto.

## 2. Pedidos reais que orientaram a revisão

> “aquele campo de chat, ele tem que ficar bem em evidência, ser o principal do app.”

Esse pedido alterou a hierarquia da interface: a conversa passou a ser a tela inicial, e os números passaram a oferecer contexto ao lado dela ou abaixo dela no celular.

> “Ok, então use um modelo mais econômico pra gente testar.”

O teste passou a usar Gemini 3.1 Flash Lite, com contexto da conversa e dos dados fictícios. A integração permite esclarecimentos e correções em linguagem natural, mantendo a confirmação das alterações na interface.

> “Era só os prints mesmo, os prompts, o TRD, a reflexão, só isso.”

A entrega pública foi reduzida aos materiais do desafio. O documento de requisitos do produto foi organizado como **PRD**, conforme o enunciado.

## 3. Prompt final para reproduzir o projeto

O [PRD completo](PRD.md) é o **briefing final consolidado**. Ele incorpora as decisões tomadas ao longo das revisões, e pode ser usado como uma única instrução de produto. Não foi enviado integralmente, nesta redação final, no início do trabalho.

Seu núcleo é:

> Crie o Folga, um aplicativo educativo de finanças pessoais em português do Brasil, com a conversa como tela principal. Use dados fictícios de setembro de 2026. Permita registrar receitas e despesas, corrigir sugestões por linguagem natural, consultar o mês e planejar uma meta. Integre um modelo econômico de IA no teste local. Antes de qualquer alteração, mostre uma prévia com confirmação e cancelamento. Calcule totais e projeções pelo aplicativo. Não invente dados, não anuncie gravações antes da confirmação e trate falhas de serviço de forma clara. Mantenha transações, metas e relatórios como apoio à conversa. Prepare uma entrega organizada com PRD, prompts, capturas reais e reflexão.

## 4. Instruções de refinamento consolidadas

Os textos a seguir resumem decisões aplicadas durante o desenvolvimento. Servem para repetir o processo, **não como cópias literais de mensagens enviadas**.

### Tornar o chat o ponto de partida

> Reorganize a tela para que a conversa seja a ação principal. Mostre exemplos de início, mantenha o campo de mensagem evidente e coloque saldo, despesas, receitas e meta como informações complementares. Preserve essa prioridade no celular.

### Conversar sem perder o controle dos registros

> Ao receber “10 reais na padaria”, sugira uma despesa de Alimentação. Se a pessoa disser “na verdade foram 12 reais”, atualize a mesma prévia. Não salve ao interpretar uma frase. Somente o botão de confirmação pode criar o lançamento; cancelar não altera os totais.

### Separar resposta da IA e estado do aplicativo

> A IA propõe; o aplicativo valida e confirma. Quando houver uma prévia, apresente uma mensagem controlada informando que ela ainda não foi salva. Não repita frases do modelo que afirmem uma gravação inexistente. Em metas, use a projeção calculada pelo aplicativo e explique que não houve movimentação de dinheiro.

### Planejar com números compreensíveis

> Peça objetivo, valor-alvo, valor já reservado e aporte mensal quando faltarem. Mostre quanto falta e o prazo aproximado, arredondado para cima, sem juros. Não transforme um aporte planejado em uma transação nem afirme que o dinheiro já foi guardado.

### Revisar comportamento e limites

> Verifique registro, correção, confirmação, cancelamento e consultas com dados fictícios. Observe também erros de serviço, respostas inválidas, duplicação de ações e adaptação ao celular. Registre o que foi realmente testado e mantenha hipóteses de usabilidade separadas dos resultados técnicos.

## 5. Interações registradas no aplicativo

Estas mensagens foram efetivamente enviadas ao assistente durante os testes com dados fictícios. As capturas registram momentos diferentes da demonstração.

| Mensagem enviada | O que foi observado | Evidência |
| --- | --- | --- |
| “Como estão minhas finanças neste mês? Resuma em duas frases.” | Resposta com R$ 5.800,00 em receitas, R$ 3.460,00 em despesas e R$ 2.340,00 de saldo | [Consulta do mês](evidencias/06-interacao-mobile.png) |
| “Quero uma meta chamada Viagem de 3000 reais. Tenho 600 reais guardados e quero concluir em 8 meses.” | Prévia de meta com aporte de R$ 300,00 por mês e confirmação explícita | [Prévia da meta](evidencias/02-meta-mobile.png) |
| “Gastei 5 reais de café hoje.” | Prévia de despesa de Alimentação por R$ 5,00, sem gravação automática | [Prévia do gasto](evidencias/03-gasto-mobile.png) |

A interpretação é feita pela IA; os cartões, a mensagem de prévia, a projeção exibida e a confirmação são controlados pelo aplicativo.

## 6. Como avaliar a resposta da IA

Uma resposta convincente não basta. A revisão deve comparar a intenção do pedido com a prévia exibida, o estado efetivamente salvo e os números apresentados. As [capturas do projeto](../README.md) mostram a experiência; a [reflexão](PROCESSO-E-REFLEXAO.md) explica os ajustes e as limitações observadas.

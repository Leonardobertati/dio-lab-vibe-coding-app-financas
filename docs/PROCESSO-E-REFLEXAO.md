# Processo, decisões e reflexão — Folga

O Folga explora uma pergunta: **como tornar o controle financeiro mais simples para quem está começando?** A resposta proposta é permitir que a pessoa converse sobre o dinheiro, revise sugestões e mantenha o controle sobre cada alteração.

## Da ideia à experiência final

O primeiro passo foi reduzir o problema a uma tarefa observável: descrever uma despesa, conferir os dados e confirmar um registro. O [PRD](PRD.md) organizou contexto, público, funcionalidades, limites e critérios de aceitação.

A primeira interface deu muito destaque ao painel e deixou a conversa como elemento secundário. Isso não correspondia à intenção de organizar as finanças por conversa. A revisão preservou os cálculos, as transações, as metas e os relatórios, mas mudou a hierarquia: **o chat passou a ocupar a tela principal**.

Também houve uma mudança de capacidade. A interpretação inicial por regras demonstrava frases simples, mas era limitada para esclarecimentos e correções. A versão local passou a utilizar **Gemini 3.1 Flash Lite**, com histórico e contexto dos dados fictícios. Assim, tornou-se possível conversar sobre uma prévia, corrigir valores e pedir ajuda para planejar uma meta.

## Decisões que definem o produto

| Decisão | Motivo |
| --- | --- |
| Conversa como tela inicial | Aproximar a interface da tarefa prometida pelo conceito |
| Prévia antes de salvar | Permitir que a pessoa confira a interpretação e corrija equívocos |
| Confirmação por botão | Separar uma resposta da IA de uma alteração efetiva |
| Totais e projeções calculados pelo aplicativo | Manter números verificáveis, independentemente da redação do modelo |
| Dados fictícios e persistência local | Testar a experiência sem depender de dados bancários ou contas reais |
| Documentação e capturas no GitHub | Concentrar a entrega no conceito, nos prompts e no aprendizado solicitado pelo desafio |

## O que funcionou bem

**Exemplos concretos deixaram as instruções mais úteis.** “10 reais na padaria” e “na verdade foram 12 reais” definem um comportamento observável: criar uma prévia e corrigir a mesma sugestão. Isso oferece um critério melhor do que pedir apenas um aplicativo “intuitivo”.

**Reaproveitar o que estava coerente acelerou a revisão.** Os cálculos e as telas de apoio continuaram úteis. A mudança principal foi colocar a conversa no centro e conectá-la a um modelo capaz de interpretar pedidos com contexto.

**A confirmação explícita manteve o usuário no controle.** A conversa reduz a necessidade de preencher campos, mas não dispensa a revisão. Uma sugestão de categoria ou de meta continua sendo uma proposta até a pessoa confirmá-la.

## O que exigiu ajustes

**Um chat visível não é necessariamente o centro da experiência.** Na primeira composição, os indicadores e as transações dominavam a tela. Foi necessário reorganizar espaço e navegação para que a conversa fosse o ponto de partida.

**Pedir à IA para não anunciar gravações não foi suficiente.** Durante os testes, houve resposta redigida como se um registro já tivesse sido salvo, embora ele ainda estivesse em prévia. O ajuste foi tornar a mensagem dessa etapa controlada pelo aplicativo. Quando há uma sugestão de transação ou meta, o texto informa que ela aguarda confirmação; a projeção de meta também é recalculada pelo aplicativo.

**O serviço de IA pode falhar.** Houve falhas pontuais nas chamadas. O fluxo precisou preservar a mensagem, informar o erro e permitir reenvio, sem alterar indevidamente os dados. As novas tentativas exercitadas funcionaram, mas isso não torna o serviço infalível.

**Persistência local tem limites.** Os registros permanecem naquele navegador. Não há sincronização entre dispositivos nem backup em nuvem. A conversa com a IA depende de conexão e envia mensagens e contexto necessário ao provedor, mesmo com os registros armazenados localmente.

## O que foi verificado

A versão final foi conferida com dados fictícios em ambiente local, incluindo chamadas reais à IA, registro e correção de uma despesa, consultas ao contexto financeiro e planejamento de meta. A interface foi verificada em desktop e celular.

Foram aprovados **22 testes automatizados** e a geração da versão de distribuição. Os testes cobrem regras financeiras e aspectos da integração, como validação de entradas e respostas, confirmação separada da conversa e tratamento de falhas. As capturas mostram estados reais do aplicativo; não são imagens geradas apresentadas como funcionamento.

Esse conjunto de verificações não equivale a uma auditoria completa de acessibilidade, teste de segurança exaustivo, validação em todos os navegadores ou pesquisa com usuários. O aplicativo foi testado localmente; o repositório público apresenta os materiais da entrega, sem afirmar que há uma versão hospedada para uso público.

## O que o processo ensinou sobre conversar com IAs

Um bom prompt deve descrever **contexto, intenção, exemplos, limites e critérios de aceitação**. Frases como “pergunte quando faltar informação”, “corrija a mesma prévia” e “não salve antes da confirmação” tornam a expectativa mais clara e ajudam a encontrar desvios.

Também ficou evidente que instruções precisam ser acompanhadas de verificação. Uma resposta educada pode conter uma afirmação incorreta sobre o estado do aplicativo. Por isso, é necessário comparar o que foi pedido, o que aparece na tela e o que realmente mudou nos dados.

O aprendizado central é usar a IA como parceira de criação e revisão, mantendo decisões importantes verificáveis. Vibe Coding inclui observar o resultado, reformular o pedido e corrigir o produto quando a experiência não corresponde à intenção inicial.

## Próximo experimento

A hipótese de que conversar facilita a organização financeira ainda precisa ser testada com pessoas. O próximo passo proposto é um piloto com cinco iniciantes e dados fictícios: registrar, corrigir e cancelar uma despesa; consultar o mês; e explicar uma meta.

Seria observado se a pessoa distingue prévia de registro salvo, entende o saldo do período e percebe que o aporte planejado não representa dinheiro transferido. Esse piloto é uma proposta futura, não uma pesquisa já realizada.

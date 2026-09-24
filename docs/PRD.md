# PRD / prompt final — Folga

> Este documento é o briefing final para orientar a IA na criação do conceito e do protótipo. O texto a partir de “Papel e objetivo” pode ser copiado como um único prompt. Os critérios abaixo são requisitos e metas de validação, não uma declaração de que todos os testes já foram executados.

## Papel e objetivo

Atue como parceiro de produto, design e desenvolvimento. Crie o **Folga**, um aplicativo educativo de organização de finanças pessoais por conversa para quem está começando a cuidar do dinheiro.

Use português do Brasil e linguagem simples. Entregue um conceito claro, um plano de MVP, um protótipo responsivo navegável e documentação que explique as decisões. O projeto será apresentado no desafio de Vibe Coding da DIO, usando **Codex em substituição a Copilot e Lovable**. Registre somente ferramentas e interações realmente utilizadas.

O objetivo da experiência é permitir que a pessoa descreva uma receita ou despesa com uma frase, revise uma sugestão de registro e entenda seu mês. A frase que resume a proposta é: **“Converse sobre o seu dinheiro. Entenda o seu mês.”**

## Contexto e problema

Muitas pessoas abandonam o controle financeiro porque os aplicativos exigem vários campos, planilhas parecem complexas e os números não se transformam facilmente em decisões compreensíveis.

Queremos diminuir o esforço do primeiro registro e oferecer uma visão simples do mês, com uma meta de reserva e observações educativas baseadas nos dados que a própria pessoa registrou.

## Público e hipótese de valor

O público inicial são pessoas brasileiras adultas, iniciantes em organização financeira, que usam principalmente o celular e desejam acompanhar receitas, despesas e uma reserva sem linguagem técnica.

A hipótese é que um registro por conversa com confirmação seja mais acessível do que começar por um formulário completo. Essa hipótese ainda precisa ser validada com pessoas reais. Não trate essa suposição como pesquisa concluída.

## Escopo e fidelidade da demonstração

O conceito prevê assistência com IA, mas este protótipo deve funcionar inteiramente no navegador, **sem backend e sem modelo generativo conectado**.

Implemente um interpretador local por regras para demonstrar exemplos simples de conversa. Deixe visível na interface e no README que a interpretação e a classificação são uma **demonstração por regras**, com limitações. Não apresente respostas como se fossem produzidas por uma IA real em execução.

Use apenas dados fictícios. O cenário inicial deve representar setembro de 2026. Exiba o mês e ano para evitar que os dados de demonstração pareçam atuais automaticamente.

### Incluído no MVP

1. Registrar receitas e despesas por conversa, com prévia e confirmação.
2. Sugerir e permitir corrigir a categoria do lançamento.
3. Consultar painel, transações e relatório simples do período.
4. Acompanhar uma meta de reserva e simular aporte mensal.
5. Receber observações educativas calculadas de forma transparente.

### Fora do MVP

Não integrar bancos, cartões, Open Finance, pagamentos, modelos de IA ou serviços externos. Não criar autenticação, contas reais, backend, sincronização em nuvem, aconselhamento de investimento, previsão financeira sofisticada, importação de arquivos, OCR ou interpretação ilimitada de linguagem natural.

## Comportamento do agente financeiro

O agente do conceito deve ser acolhedor, breve, educativo e sem julgamento. Evite culpa, pressão ou frases como “você gastou errado”. Prefira perguntas e explicações concretas: “Encontrei R$ 45,90 em alimentação. Confira antes de registrar.”

- Não invente receitas, despesas, datas, rendimentos ou metas que a pessoa não informou.
- Não confirme um registro enquanto ele estiver apenas na etapa de prévia.
- Se faltarem informações ou houver ambiguidade, explique o que precisa ser informado.
- Trate uma mensagem de cada vez e mantenha claro qual lançamento está sendo revisado.
- Não prometa economia, quitação de dívida ou prazo garantido.
- Não prescreva produtos financeiros. O objetivo é organizar e explicar os dados.
- Mostre o fundamento de qualquer observação: período, categoria, soma ou fórmula usada.
- Se o pedido estiver fora das regras demonstradas, explique a limitação e apresente um exemplo aceito.

## Jornada principal

1. Abrir o Folga e identificar o aviso de demonstração.
2. Entender o painel inicial com valores fictícios de setembro de 2026.
3. Acessar a conversa e escrever “Gastei R$ 45,90 no almoço”.
4. Ver uma sugestão de despesa, com valor e categoria.
5. Revisar ou corrigir a sugestão e confirmar.
6. Encontrar o lançamento nas transações e perceber sua influência no resumo e no relatório.
7. Consultar a reserva e simular um aporte mensal.

## Telas e requisitos da interface

Organize a navegação em quatro destinos: **Visão geral**, **Transações**, **Metas** e **Relatórios**. A conversa é uma área da Visão geral, acessível também pela ação “Novo registro”; não exige um quinto destino de navegação. As seções abaixo detalham essas quatro telas e a área de conversa.

### 1. Visão geral

Apresente uma introdução curta, o período em análise e três valores principais: **receitas, despesas e saldo do período**.

- Receitas = soma das entradas confirmadas do período.
- Despesas = soma das saídas confirmadas do período.
- Saldo do período = receitas − despesas.
- Explique que esse saldo considera os registros da demonstração; ele não representa automaticamente o saldo de uma conta bancária.
- Mostre lançamentos recentes, um resumo da meta de reserva e uma chamada clara para registrar por conversa.
- Use valores, legendas e rótulos que permitam compreender os dados sem depender apenas de cores.

### Área de conversa — integrada à Visão geral

Crie uma área de conversa com mensagens legíveis, exemplos clicáveis e um campo identificado para escrever uma receita ou despesa.

- Aceite exemplos como “Gastei 45,90 no almoço”, “Paguei R$ 1.200,50 de aluguel” e “Recebi R$ 800 de freelance”.
- Reconheça valores em formato brasileiro, sem confundir separador de milhar com separador decimal.
- Sugira tipo, descrição e categoria usando regras demonstrativas.
- Use a data do contexto de demonstração como padrão e deixe a data explícita na prévia.
- Permita revisar e corrigir os campos relevantes antes de salvar.
- Ofereça ações claras para confirmar e cancelar a sugestão.
- Rejeite valor zero, negativo, ausente ou inválido com uma mensagem útil.
- Para frases que não possam ser interpretadas com segurança pelas regras disponíveis, peça reformulação em vez de fabricar um registro.
- Não grave a sugestão automaticamente. Um envio de mensagem pode gerar a prévia; somente a confirmação cria a transação.
- Depois da confirmação, impeça que o mesmo cartão seja confirmado duas vezes.
- Não inclua nomes técnicos de implementação na conversa cotidiana; apresente o aviso de simulação de modo discreto e acessível.

### 2. Transações

Exiba os lançamentos confirmados com descrição, data, tipo, categoria e valor formatado.

- Permita filtrar ou buscar os registros, pelo menos distinguindo entradas e saídas.
- Diferencie visualmente receitas e despesas, mantendo os rótulos textuais.
- Permita excluir um lançamento e desfazer a última exclusão enquanto a ação estiver disponível.
- Atualize as visualizações dependentes quando os dados mudarem.
- Se nenhum item corresponder ao filtro, informe isso e ofereça uma forma de limpar o filtro.

### 3. Metas — reserva

Apresente uma meta demonstrativa com nome, valor-alvo, valor já reservado e progresso.

- Mostre a diferença entre valor-alvo e valor reservado.
- Permita simular um aporte mensal positivo e informar o número estimado de meses para chegar à meta.
- Calcule meses = teto de `máximo(0, alvo − reservado) ÷ aporte mensal`.
- Se a meta já estiver atingida, informe isso sem criar prazo negativo.
- Para aporte nulo, negativo ou inválido, solicite um valor válido e não apresente uma estimativa infinita ou incorreta.
- Identifique a simulação como uma conta simples, sem juros, inflação ou rendimentos.
- Alterar o aporte simulado não deve criar uma despesa, transferir dinheiro ou aumentar automaticamente o valor reservado.

### 4. Relatórios

Mostre como as despesas confirmadas do período se distribuem entre as categorias, por meio de gráfico acompanhado de valores e percentuais legíveis.

- Use como base apenas despesas do período, sem misturar receitas na distribuição.
- Exiba uma observação educativa derivada dos dados, por exemplo, a categoria de maior despesa e sua participação no total.
- Mostre a conta ou os números que sustentam a observação.
- Caso apresente uma simulação de redução de gasto, declare a porcentagem usada como hipótese e mostre o cálculo. Não diga que a economia já aconteceu.
- Sem despesas, exiba um estado vazio educativo; não produza percentuais inválidos ou dicas que pressuponham gastos inexistentes.

## Direção visual e adaptação às telas

A identidade deve ser acolhedora e sóbria, com boa hierarquia, áreas de respiro e uma cor de destaque coerente com a marca Folga. Evite excesso de elementos decorativos que concorram com os números e as ações principais.

**Desktop:** navegação persistente, área principal ampla, resumos visíveis e boa separação entre contexto, conteúdo e ação. Em telas maiores, painéis complementares podem ficar lado a lado.

**Celular:** empilhe o conteúdo em uma coluna, mantenha a navegação acessível, use controles confortáveis para toque e preserve o acesso ao campo de conversa. A tela não deve depender de rolagem horizontal para operar suas funções principais.

O protótipo deve ser utilizável em larguras aproximadas de 390 px e 1440 px. Considere textos longos, valores maiores e ausência de dados.

## Estados, acessibilidade e feedback

- Identifique campos com rótulos; não use somente placeholder como instrução.
- Garanta navegação por teclado, foco visível e nomes acessíveis para botões de ícone.
- Use contraste suficiente e não dependa exclusivamente de verde ou vermelho para transmitir significado.
- Mantenha a ordem de títulos e a leitura dos componentes coerentes.
- Mostre confirmação após salvar, retorno após excluir e uma opção clara de desfazer.
- Mostre erros próximos à ação que os causou e explique como corrigir.
- Não deixe a tela em branco se o armazenamento local estiver indisponível ou contiver dados inválidos; use uma recuperação compreensível e preserve a possibilidade de continuar a demonstração.
- Ao restaurar os dados fictícios, deixe claro o efeito sobre os registros locais da demonstração e peça confirmação.

## Dados e implementação

Use React com Vite. Mantenha a solução pequena e compreensível, sem dependências que não tragam benefício direto ao protótipo.

- Modele transações com identificador, descrição, valor em centavos, tipo, categoria e data.
- Calcule valores monetários em centavos e formate a apresentação com o padrão brasileiro.
- Derive painel, transações e relatório da mesma coleção de dados e do mesmo período selecionado.
- Persista os dados de demonstração em `localStorage`, com uma chave própria do projeto.
- Ofereça uma ação para restaurar os dados iniciais fictícios.
- Não inclua dados pessoais reais, credenciais, chaves de API ou integração bancária.
- Informe que os dados ficam neste navegador e que não há sincronização ou backup em nuvem.

## Critérios de aceitação

| ID | Situação | Resultado esperado |
| --- | --- | --- |
| CA01 | Abrir a demonstração | Marca Folga, aviso de demonstração, período e navegação identificáveis |
| CA02 | Enviar “Gastei R$ 45,90 no almoço” | Prévia de despesa por R$ 45,90; categoria sugerida; nenhuma alteração nos totais antes da confirmação |
| CA03 | Corrigir e confirmar uma prévia | Um único lançamento salvo com os dados revisados e atualização das visualizações |
| CA04 | Cancelar uma prévia | Nenhuma transação criada |
| CA05 | Enviar “Recebi R$ 800 de freelance” | Prévia de receita por R$ 800,00, sujeita a confirmação |
| CA06 | Enviar “Paguei R$ 1.200,50 de aluguel” | Valor interpretado como 120.050 centavos |
| CA07 | Enviar texto sem valor ou valor inválido | Mensagem de orientação, sem registro incorreto |
| CA08 | Consultar painel e relatório após um registro | Mesma fonte de dados e período; receitas, despesas e saldo coerentes |
| CA09 | Aplicar um filtro sem correspondências | Estado vazio e forma de remover o filtro |
| CA10 | Excluir e desfazer uma transação | Remoção seguida de restauração do registro e dos totais correspondentes |
| CA11 | Recarregar após uma alteração | Dados locais válidos preservados no mesmo navegador |
| CA12 | Simular alvo de R$ 6.000, reserva de R$ 1.800 e aporte de R$ 300 | Estimativa de 14 meses, sem movimentação de dinheiro e sem rendimento implícito |
| CA13 | Simular aporte zero, negativo ou inválido | Orientação de correção, sem estimativa incorreta |
| CA14 | Consultar relatório sem despesas | Estado vazio, sem divisão por zero |
| CA15 | Usar em 390 px e 1440 px de largura | Conteúdo legível, controles utilizáveis e navegação funcional |
| CA16 | Usar teclado para as ações centrais | Foco perceptível, campos identificados e ações acionáveis |
| CA17 | Restaurar a demonstração | Efeito informado, confirmação solicitada e dados fictícios iniciais recuperados |

Registre separadamente quais critérios foram efetivamente verificados, como foram verificados e quais limitações permaneceram. Não transforme este checklist em um relatório de testes aprovados sem execução.

## Recursos necessários para o MVP

- Um ambiente de desenvolvimento com Node.js, React e Vite.
- Um navegador para execução, teste responsivo e capturas.
- Dados fictícios suficientes para demonstrar entradas, saídas, categorias e reserva.
- Codex para apoiar a especificação, implementação, revisão e documentação.
- Um repositório no GitHub para publicar o material do desafio.

Não é necessária uma chave de API, assinatura de serviço de IA ou banco de dados para a demonstração proposta.

## Plano de validação inicial

Proponha um piloto com cinco pessoas iniciantes usando somente dados fictícios. Peça que registrem uma despesa, cancelem uma prévia incorreta, expliquem o saldo do mês, excluam e restaurem um registro e interpretem uma simulação de reserva.

Metas iniciais propostas: quatro de cinco participantes concluírem as tarefas principais sem orientação direta; cinco de cinco entenderem que uma prévia ainda não confirmada não foi salva; quatro de cinco entenderem que o prazo da reserva é uma estimativa sem rendimento.

Observe dificuldades, tempo aproximado por tarefa e comentários voluntários. Use essas informações para priorizar ajustes de clareza e usabilidade. Essas metas são hipóteses de validação, e não resultados de pesquisa já obtidos.

## Entregáveis e documentação

1. Apresentação do conceito e do problema resolvido.
2. PRD / prompt final completo, com escopo, telas, comportamento e critérios de aceitação.
3. Protótipo responsivo acompanhado de instruções de execução.
4. Capturas reais das telas e evidências reais de interação com a IA, identificando o que cada imagem demonstra.
5. Registro do processo: intenção inicial, refinamento das instruções, decisões, limitações e verificações realizadas.
6. Reflexão breve sobre o que funcionou, o que exigiu ajustes e o que o processo ensina sobre conversar com IA, sem inventar depoimentos pessoais.
7. README organizado com todos os itens exigidos pelo desafio e links para os documentos complementares.

Mantenha explícita a separação entre **conceito de produto**, **funcionalidades implementadas na demonstração** e **evoluções futuras**. O resultado deve ser compreensível para alguém que acesse apenas o repositório público, sem ter acompanhado a conversa de criação.

# Análise do desafio e planejamento — Folga

## 1. Leitura do enunciado

O desafio da DIO propõe transformar uma intenção em um conceito de aplicativo por meio de conversas claras com uma IA. O problema apresentado é a dificuldade de manter o controle financeiro quando registrar informações dá trabalho e planejar o orçamento parece complicado.

A entrega obrigatória é um repositório público com o conceito do aplicativo, o prompt final em formato de PRD, evidências das interações com a IA e uma reflexão sobre o processo. **O enunciado não exige código.** Neste projeto, um protótipo navegável será um complemento para tornar o conceito mais concreto e verificável.

O projeto adota **Codex como ferramenta de criação**, por escolha do participante, em adaptação ao fluxo sugerido com Copilot e Lovable. A documentação deve registrar essa substituição com transparência. ChatGPT só deverá ser citado como ferramenta utilizada se houver uma interação real documentada. Não serão produzidas imagens que simulem o uso de ferramentas que não participaram do trabalho.

Fonte do desafio: [repositório-base da DIO](https://github.com/digitalinnovationone/dio-lab-vibe-coding-app-financas).

## 2. Decisão de produto

**Nome:** Folga.

**Proposta:** ajudar quem está começando a organizar as finanças a transformar uma frase em um registro revisável, entender o mês e experimentar um plano simples para uma reserva.

**Ideia central:** “Converse sobre o seu dinheiro. Entenda o seu mês.”

O público inicial é formado por pessoas brasileiras que querem iniciar o controle financeiro sem depender de planilhas. O protótipo usa português do Brasil, reais e datas familiares a esse público. Isso é uma hipótese de produto, não uma conclusão de pesquisa com usuários.

### Jornada principal

1. A pessoa conhece o painel e percebe que está em uma demonstração com dados fictícios.
2. Escreve uma frase, como “Gastei R$ 45,90 no almoço”.
3. O aplicativo apresenta uma sugestão de lançamento e categoria.
4. A pessoa revisa, corrige se necessário e confirma o registro.
5. O painel, a lista de transações e o relatório refletem o novo lançamento.
6. A pessoa consulta a reserva e simula o efeito de um aporte mensal.

O ponto mais importante da experiência é a **confirmação antes de salvar**. A conversa reduz o esforço de entrada, mas mantém a pessoa no controle do que será registrado.

## 3. Obrigatório para o desafio e complemento escolhido

| Item | Natureza | Entrega planejada |
| --- | --- | --- |
| Fork do repositório-base e link público | Entrega do desafio | Repositório do participante no GitHub, preservando a origem |
| Resumo do conceito | Obrigatório | Apresentação do Folga no `README.md` |
| Prompt final / PRD | Obrigatório | Prompt final no `README.md` e documento completo em `docs/PRD.md` |
| Evidências de interação com IA | Obrigatório | Capturas reais e contextualizadas, com referência no `README.md` |
| Reflexão sobre o processo | Obrigatório | Síntese no `README.md` e registro em `docs/PROCESSO-E-REFLEXAO.md` |
| Análise e plano de execução | Pedido do participante | Este documento |
| Protótipo responsivo navegável | Complemento escolhido | Aplicativo local em React e Vite |
| Capturas das telas do aplicativo | Pedido do participante | Imagens reais do protótipo em `docs/evidencias/` |
| Verificação funcional e visual | Complemento de qualidade | Registro do que foi efetivamente verificado e das limitações |

As capturas das telas do aplicativo demonstram o resultado visual. Elas não substituem, sozinhas, as evidências de interação com a IA. Cada imagem deve ser identificada pelo que realmente comprova.

## 4. Recorte do MVP

O conceito completo prevê assistência com IA. A implementação deste desafio será uma **simulação local e determinística**: um interpretador por regras demonstra o fluxo de conversa e sugere categorias. Não haverá modelo generativo conectado nem envio das mensagens a um serviço de IA.

| Funcionalidade | Recorte do protótipo | Motivo |
| --- | --- | --- |
| Registro por conversa | Reconhecer exemplos simples de despesa ou receita, valor em reais e categoria provável; exigir revisão e confirmação | Demonstrar a redução de esforço sem esconder a possibilidade de interpretação incorreta |
| Classificação | Sugestões por palavras-chave, corrigíveis pela pessoa | Tornar a automação explicável e testável |
| Visão do mês | Receitas, despesas e saldo calculados a partir dos lançamentos exibidos | Ajudar a compreender a relação entre o registro e o resumo |
| Transações | Lista, filtros e exclusão com possibilidade de desfazer | Permitir consulta e correção de erros |
| Meta de reserva | Progresso e simulação de aporte mensal | Transformar uma intenção em uma conta simples |
| Relatório | Despesas por categoria e observação educativa derivada dos próprios dados | Dar contexto sem produzir uma recomendação genérica disfarçada de personalização |

Ficam fora deste MVP: conexão com bancos, Open Finance, pagamentos, investimentos, autenticação, armazenamento em nuvem, integração com modelos de IA, interpretação irrestrita de linguagem natural, importação de extratos, OCR e aconselhamento financeiro individual.

## 5. Plano de execução

### Etapa 1 — Especificar

- Converter o problema do desafio em objetivo, público, jornada e limites.
- Redigir um PRD que possa ser usado como prompt completo.
- Definir critérios de aceitação observáveis e separar hipóteses de resultados.

**Saída:** este planejamento e o PRD.

### Etapa 2 — Construir o protótipo

- Criar uma interface em português com quatro destinos de navegação: Visão geral, Transações, Metas e Relatórios. A conversa fica integrada à Visão geral.
- Usar apenas dados fictícios, com o cenário inicial em setembro de 2026.
- Implementar regras de interpretação, revisão e confirmação de lançamentos.
- Centralizar os dados usados pelos resumos, listas e gráficos.
- Persistir os dados de demonstração no navegador e permitir restaurar a demonstração.
- Garantir uso em desktop e celular, com estados vazios e mensagens de erro úteis.

**Saída:** protótipo local, acompanhado de instruções para execução.

### Etapa 3 — Verificar e registrar

- Conferir os cálculos com uma sequência conhecida de receita e despesa.
- Validar que uma sugestão ainda não confirmada não altera o saldo.
- Testar filtros, exclusão, desfazer e recarga da página.
- Conferir casos sem dados, entradas incompletas, valores inválidos e simulação de meta.
- Conferir a interface em largura de desktop e celular.
- Capturar telas reais do aplicativo e interações reais disponíveis no processo de criação.

**Saída:** evidências e registro objetivo das verificações. A lista acima é um plano; a conclusão de um teste só deve ser declarada após sua execução.

### Etapa 4 — Documentar a experiência

- Explicar o conceito, o uso do Codex e a diferença entre o conceito com IA e a simulação implementada.
- Registrar os pedidos usados para orientar a construção, os ajustes realizados e suas razões.
- Descrever o que funcionou, o que apresentou limitações e o que o processo permite aprender sobre formular instruções para IA.
- Evitar atribuir ao participante opiniões, sentimentos ou aprendizados pessoais que ele não tenha relatado.

**Saída:** `README.md`, documentos complementares e capturas contextualizadas.

### Etapa 5 — Publicar e conferir

- Confirmar a conta de destino e criar o fork solicitado.
- Revisar os arquivos antes da publicação: apenas código, documentação e dados fictícios; sem credenciais ou dados financeiros pessoais.
- Publicar a entrega no repositório do participante.
- Conferir o link público, os documentos e a renderização das imagens no GitHub.
- Entregar o link para o participante enviar na plataforma da DIO.

**Saída:** repositório público pronto para avaliação. O envio dentro da plataforma DIO é uma etapa do participante, fora da publicação no GitHub.

## 6. Recursos e decisões técnicas

| Recurso | Decisão |
| --- | --- |
| Interface | React com Vite; navegação simples entre as áreas do produto |
| Dados monetários | Cálculos em centavos; apresentação em BRL |
| Dados iniciais | Exemplos fictícios de setembro de 2026 |
| Persistência | `localStorage`, restrito ao navegador e à origem usados |
| Assistente demonstrativo | Regras locais explícitas; sem chave de API |
| Documentação | Markdown e imagens de tela no repositório |
| Evidências | Capturas reais, sem montagem que simule interações inexistentes |

O protótipo não necessita de backend. A persistência local serve apenas à demonstração: não equivale a uma conta, backup ou sincronização entre dispositivos.

## 7. Riscos e tratamento

| Risco | Tratamento planejado |
| --- | --- |
| Atribuir capacidade de IA real a um parser simples | Identificar a conversa como demonstração por regras na interface e na documentação |
| Interpretar incorretamente “1.200,50” | Normalizar formatos brasileiros, calcular em centavos e exigir confirmação |
| Salvar um valor ou categoria sem intenção do usuário | Apresentar prévia editável e só persistir após confirmação explícita |
| Total do painel divergir do relatório | Derivar as visualizações da mesma coleção de transações e do mesmo período |
| Chamar saldo mensal de dinheiro disponível | Explicar que o saldo é receitas menos despesas registradas no período, sem representar saldo bancário |
| Simulação sugerir resultado garantido | Exibir fórmula, hipóteses e ausência de juros, inflação ou rendimentos |
| Capturas exporem dados pessoais | Usar dados fictícios e enquadrar apenas o conteúdo necessário |
| Reflexão inventar experiências | Basear os comentários nos artefatos e verificações realmente produzidos |
| Evidência não corresponder à versão publicada | Capturar a versão final e conferir os arquivos publicados no GitHub |
| A adaptação de ferramentas gerar dúvida na avaliação | Declarar que Codex substituiu Copilot/Lovable; manter os objetivos e entregáveis do desafio, sem prometer aceitação pela DIO |

## 8. Validação inicial proposta

Depois da entrega técnica, um experimento de produto possível é convidar cinco pessoas iniciantes para tarefas curtas com dados fictícios. Esse experimento **não é uma pesquisa já realizada**.

| Hipótese | Tarefa de validação | Meta inicial proposta |
| --- | --- | --- |
| O fluxo de conversa é compreensível | Registrar um almoço, revisar a categoria e confirmar | Pelo menos 4 de 5 participantes concluem sem orientação direta |
| A confirmação evita registros acidentais | Preparar um lançamento incorreto e cancelar antes de salvar | 5 de 5 percebem que a prévia ainda não foi registrada |
| O painel comunica o mês | Explicar receitas, despesas e saldo de um cenário fictício | Pelo menos 4 de 5 explicam corretamente o cálculo |
| A pessoa consegue reparar um erro | Excluir um lançamento e usar desfazer | Pelo menos 4 de 5 concluem a tarefa |
| A reserva tem significado claro | Alterar o aporte mensal e explicar o novo prazo estimado | Pelo menos 4 de 5 entendem que se trata de simulação sem rendimento |

Registrar conclusão por tarefa, tempo aproximado, dificuldades observadas e comentários voluntários. As metas são referências exploratórias de um piloto pequeno; não constituem evidência estatística de adesão ao produto.

## 9. Critério de conclusão da entrega

A entrega estará pronta quando o repositório público apresentar o conceito, o PRD final, as evidências reais, a reflexão e instruções para conhecer o protótipo; os fluxos implementados tiverem verificações registradas; e eventuais limitações estiverem explícitas. O objetivo é demonstrar raciocínio de produto e colaboração com IA com clareza e honestidade.

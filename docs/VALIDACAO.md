# Validação executada — Folga

Data: 24 de setembro de 2026. Verificação técnica realizada durante a criação com Codex, usando apenas dados fictícios. Não houve pesquisa com usuários reais.

## Ambiente e método

- Windows, Node.js 24.16.0, npm 11.13.0, Vite 6.4.3 e Chrome.
- Aplicativo local: `http://127.0.0.1:5173/`.
- Navegador controlado pelas ferramentas de Computer Use / Browser do Codex, com ações reais em campos, botões e seletores.
- A tentativa inicial de abrir o navegador integrado excedeu o tempo de resposta; a verificação foi realizada no Chrome. Não foi utilizado um script externo de Playwright como substituto.
- Viewports CSS verificados: **1536 × 1024**, **1440 × 900** e **390 × 844**. O navegador reserva espaço para barras de rolagem, e o mecanismo de captura pode retornar dimensões diferentes das dimensões CSS. As imagens são capturas reais, sem edição dos dados exibidos.
- O sandbox inicialmente bloqueou subprocessos do Vite e do executor de testes (`spawn EPERM`). A execução autorizada fora dessa restrição concluiu os comandos; o bloqueio foi do ambiente, não uma falha do aplicativo.

## Resultado dos comandos

| Comando / verificação | Resultado observado |
| --- | --- |
| `npm install --cache .npm-cache` | Instalação concluída; 67 pacotes auditados, zero vulnerabilidades reportadas naquele momento |
| `npm test` | **8 testes aprovados, zero falhas**, sem testes ignorados |
| `node tests/domain.test.js` | Também aprovado na revisão independente |
| `npm run build` | Build de produção concluído; JS de 264,06 kB, 81,74 kB gzip |
| Assertivas independentes do domínio | 37 verificações aprovadas após as correções; rodada adicional de revisão, não 37 testes persistidos no repositório |
| `git diff --check` | Sem erro de whitespace; apenas aviso do Git sobre conversão LF/CRLF no Windows |

A auditoria de dependências é um retrato da data de execução, não uma garantia permanente de segurança.

## Fluxos realmente exercitados no navegador

| Requisito | Ação e evidência observada | Resultado |
| --- | --- | --- |
| Identidade e carregamento | Título Folga, interface com conteúdo, navegação e dados fictícios; sem overlay do framework | Aprovado |
| CA01 | Cenário inicial: entradas R$ 5.800,00; saídas R$ 3.460,00; saldo R$ 2.340,00 | Aprovado |
| CA02 | Enviado “Gastei R$ 45,90 no almoço”; prévia de saída/Alimentação; totais continuaram inalterados antes de confirmar | Aprovado |
| CA03 | Descrição alterada para “Almoço revisado” e categoria para Lazer; confirmação pelo teclado; saldo R$ 2.294,10 e saídas R$ 3.505,90 | Aprovado |
| Confirmação única | Duplo clique em confirmar uma receita de R$ 800; apenas uma linha Freelance; entradas R$ 6.600,00 e saldo R$ 3.140,00 | Aprovado |
| CA04 / CA05 | Receita de R$ 800 gerou prévia de Entrada/Receita; cancelamento manteve os totais e devolveu foco ao campo do chat | Aprovado |
| CA07 | “Gastei −45 no café” retornou orientação para valor positivo; nenhuma prévia de transação | Aprovado |
| CA08 | Painel e relatório acompanharam a despesa confirmada; somas das categorias conferidas também no teste de domínio | Aprovado |
| CA09 | Busca sem correspondência mostrou estado vazio; “Limpar filtros” recuperou registros; filtro de Entradas mostrou apenas Salário | Aprovado |
| CA10 | Excluir Almoço revisado restaurou saldo R$ 2.340,00; Desfazer recuperou saldo R$ 2.294,10 e o lançamento | Aprovado |
| CA11 | Página recarregada; busca encontrou Almoço revisado com categoria Lazer, valor R$ 45,90 e data 24/09/2026 | Aprovado |
| CA12 | Alvo R$ 6.000,00, reservado R$ 1.800,00 e aporte R$ 300,00 produziram 14 meses; totais financeiros permaneceram iguais | Aprovado |
| CA13 | Aporte zero foi rejeitado no formulário com mensagem de correção | Aprovado |
| CA14 | Agosto/2026 retornou os três totais zerados e relatório vazio, sem percentuais inválidos | Aprovado |
| CA15 | No celular, registro de R$ 32,50 e filtro Transporte funcionaram; largura do conteúdo não excedeu a área disponível | Aprovado nas larguras informadas |
| CA16 | Enter confirmou registro e abriu diálogo; Escape fechou diálogo; cancelamento devolveu foco ao chat; campos possuem nomes acessíveis | Aprovado nos caminhos exercitados |
| CA17 | Restauração exigiu confirmação, recuperou os valores iniciais e removeu a prévia e as mensagens de chat pendentes | Aprovado |
| Console | Consulta aos logs de erro e aviso da aba retornou lista vazia durante a rodada final | Aprovado |

**CA06 e recuperação de armazenamento** foram verificados nos testes de domínio: `1.200,50` corresponde a 120.050 centavos; JSON inválido, esquema incompatível e armazenamento bloqueado voltam à demonstração com aviso. A falha real de gravação do navegador não foi provocada na rodada visual.

## Problemas encontrados e corrigidos

| Problema reproduzido | Correção / regressão |
| --- | --- |
| `,50` ou `.50` podia virar R$ 50 | Valores incompletos passaram a ser rejeitados; exemplos mantidos nos testes |
| Sinal negativo Unicode podia ser ignorado | Sinais Unicode cobertos pela validação e por regressão |
| Datas com hífen eram confundidas com valor negativo | Extração de data ajustada; ISO e dia-mês-ano verificados |
| “hoje ontem” e referência relativa junto de data eram aceitos | Ambiguidade de data rejeitada |
| Ponto final após um valor válido bloqueava a leitura | Pontuação de frase tratada sem alterar o valor |
| Restaurar dados preservava a prévia do chat | Componente reiniciado na restauração; estado limpo conferido na interface |
| Foco após cancelar precisava aguardar reativação do campo | Foco aplicado após atualização do estado; retorno ao chat conferido |

## Verificação visual

O conceito [00-conceito-visual.png](evidencias/00-conceito-visual.png) e a captura real [04-app-visao-geral.jpg](evidencias/04-app-visao-geral.jpg) foram abertos com `view_image`. A implementação foi comparada diretamente com a referência, incluindo composição, textos, tipografia, paleta, espaçamento, tabela, ícones e meta. O [registro de design](DESIGN.md) detalha esses pontos.

A hierarquia e a composição foram preservadas. As diferenças intencionais são os ícones vetoriais da mesma família, a fonte disponível no sistema, a formatação monetária consistente e os avisos necessários de simulação, armazenamento e saldo não bancário. A revisão dos textos da primeira tela não encontrou adições decorativas; as adições funcionais estão documentadas. A adaptação móvel foi conferida sem overflow horizontal.

As capturas foram inspecionadas para distinguir a referência gerada, as interações reais com ChatGPT e as telas reais do aplicativo. Algumas imagens mostram estados de teste diferentes: por exemplo, a meta de 14 meses foi capturada após a despesa de R$ 45,90. Essa diferença de saldo é esperada e consta no fluxo acima.

## Evidências

- [Visão geral](evidencias/04-app-visao-geral.jpg)
- [Prévia antes de confirmar](evidencias/05-app-confirmacao.jpg)
- [Relatório com hipótese explícita](evidencias/06-app-relatorios.jpg)
- [Primeira tela móvel](evidencias/07-app-mobile.jpg)
- [Simulação de 14 meses](evidencias/08-app-meta.jpg)
- [Conversa móvel](evidencias/09-app-mobile-conversa.jpg)
- [Histórico móvel filtrado](evidencias/10-app-mobile-transacoes.jpg)

## Limites da validação

Não foram testados Safari, Firefox, leitores de tela reais, integração bancária, sincronização ou IA generativa. Não foi realizado teste de penetração nem validação com participantes. A interpretação cobre exemplos limitados por regras, e a persistência é local. Os testes de teclado não equivalem a uma auditoria completa de acessibilidade. O servidor local é uma prévia; a entrega pública solicitada é o repositório com código, documentação e evidências.

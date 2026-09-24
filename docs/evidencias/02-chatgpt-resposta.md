3 riscos concretos

Aderência e transparência: o enunciado cita Copilot/Lovable. Justifique a escolha do Codex no README, sem pressupor aceitação da substituição. Identifique claramente os dados fictícios e a interpretação por regras, sem apresentar o protótipo como IA generativa integrada.

Registros incorretos: frases ambíguas, valores com vírgula ou múltiplos valores podem gerar interpretações erradas. Cliques repetidos na confirmação podem duplicar lançamentos.

Inconsistência dos cálculos: excluir/desfazer pode deixar totais desatualizados; aporte zero pode causar divisão inválida. A simulação pode ser indevidamente contabilizada como movimentação.

3 critérios de aceitação

Registro controlado: “Gastei R$ 35,90 no almoço” deve gerar uma prévia editável de despesa de 3.590 centavos, com categoria sugerida. Nada deve ser salvo antes da confirmação; confirmações repetidas não devem duplicar registros. Ambiguidades devem solicitar esclarecimento.

Conciliação: receita de R$ 3.000 e despesa de R$ 200 devem produzir resultado de R$ 2.800. Excluir/desfazer deve atualizar/restaurar histórico, painel e relatório. Os filtros devem ser respeitados, e as despesas por categoria devem somar as despesas do mesmo período.

Simulação: alvo de R$ 1.000, reservado de R$ 250 e aporte de R$ 200 devem resultar em quatro meses. Meta atingida deve retornar zero; aporte não positivo deve ser rejeitado quando faltar valor. Nenhum lançamento ou total financeiro deve mudar.

Critérios propostos, não resultados de testes executados.
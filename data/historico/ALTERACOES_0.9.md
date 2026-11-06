# Ficha Arcana — alterações 0.9 beta

Data: 5 de novembro de 2026. Versão construída sobre o ZIP original **Ficha_Arcana_0.8.zip** e orientada pela auditoria da beta 0.8. O código e as páginas públicas estão nas pastas `dist/` e `docs/`.

## O que foi alterado

| Tema | Implementação nesta versão |
| --- | --- |
| Dano e sobrevivência | Novo módulo `rules09.js`, controle de estados ao chegar a 0 PV, PV temporários, falhas/sucessos em salvaguardas contra morte, dano crítico e estabilização; cura não ressuscita mortos. |
| Ações e condições | Bloqueio integrado de ataques desarmados sob incapacidade, sincronização de Fúria/concentração e correção de iniciativa em situações conhecidas. |
| Combate | Regras de Ladino 2024 na escolha de equipamento; Artes Marciais do Monge não aumentam dados de armas à distância; ataque desarmado considera a melhor fórmula; Fúria com arremesso baseado em Força; Duelismo com arma arremessada; modificador negativo no ataque extra de arma Leve; limiar crítico do Campeão para ataque desarmado. |
| Descanso | Cura mínima de 1 PV por Dado de Vida gasto; condições de 0 PV tratadas na recuperação; personagem morto não volta a viver por descanso longo. |
| Magias | Revisão de preparação, fontes de conjuração e acesso em multiclasse; rituais de Mago; Segredos Mágicos de Bardo; magias automaticamente preparadas de Paladino/Guardião não consomem o limite comum; conferência das magias enviadas à impressão. |
| Estilos e talentos | Treinamento de armaduras realmente atualizado por talentos; a avaliação dos talentos deixa de procurar exigências na descrição dos benefícios; remover estilo desativa seus efeitos residuais. |
| Dados | Escola de Esfera Flamejante atualizada para Evocação; propriedade versátil 1d10 da Picareta de Guerra; Dardo com arremesso estruturado; nomes/resumos de características do Clérigo e nomes de truques usados no cálculo. |
| Interface | Painel **Verificação da Ficha 0.9** em Habilidades com **efeitos aplicados**, **escolhas pendentes** e **efeitos manuais**; melhorias de quebra no cabeçalho; acessibilidade de botões; devolução de foco em modais. |
| Segurança e persistência | Backup dos dados originais quando uma ficha não pode ser normalizada, aviso de recuperação e exportação do backup; não sobrescrever silenciosamente a coleção. Escapamento de nome de armadura personalizada na impressão; inventários grandes e histórico de evolução preservados. |
| Animações | Mantidas as animações 3D dos dados e a preferência de movimento/ativação já existentes, sem alterar o mecanismo de sorteio. |

## Limites assumidos — ainda não é uma ficha 100% automatizada

As melhorias acima **não** equivalem a implementar automaticamente todos os talentos, itens, infusões, subclasses, espécies ou escolhas das fontes. O catálogo de suplementos permanece composto de dados de várias origens (incluindo adaptações e UA), e o painel de Habilidades identifica características situacionais ou não automatizadas.

Continuam exigindo acompanhamento manual ou uma etapa futura: Arcano Místico do Bruxo com um fluxo próprio para cada círculo, seletores completos de invocações, manobras e Metamagia, efeitos de itens mágicos/infusões, sintonização, formas animais/familiares/companheiros, aquisição por pacotes oficiais de equipamentos, efeitos contínuos com duração, automação de todas as espécies e subclasses, revisão integral de textos extraídos dos PDFs, tratamento completo de reações e turnos.

O antigo relatório de auditoria identificou 49 pontos de atenção; nesta entrega muitos pontos receberam correções de regra, mas **não foi certificada a resolução dos 49**. Nem todas as combinações possíveis de personagem foram executadas.

## Instalação e publicação

1. Extraia a pasta `0.9/` completa, sem mover seus arquivos internos.
2. No Windows, execute `INICIAR_WINDOWS.bat` com Python 3 instalado; a página abre em `http://localhost:8000`.
3. Em Linux/macOS, rode `python3 -m http.server 8000 --bind 127.0.0.1 --directory dist` dentro de `0.9/`.
4. Para GitHub Pages, publique o conteúdo de `docs/`, que inclui `.nojekyll`. `docs/` e `dist/` possuem o mesmo aplicativo.
5. Antes da troca, salve exportações JSON de personagens importantes. Mantenha o mesmo host/porta para reutilizar `localStorage`; em outro computador ou domínio, use a importação JSON.

## Verificação executada

- `node --test tests/*.test.js` / `npm test`: **88 testes passaram**; regressões acrescentadas para combate, talentos, sobrevivência, importação, níveis e descanso.
- Análise de sintaxe JavaScript (`node --check`) e JSON no pacote.
- A tentativa de teste visual automatizado falhou por bloqueio de navegação do ambiente de execução. O bloqueio foi externo ao site; isso **não confirma** o funcionamento visual no navegador do usuário. Verifique manualmente rolagens 3D, criação, importação, descanso, conjuração, impressão e layout celular.

Arquivos novos principais: `dist/rules09.js`, `dist/benefits09.js`, `tests/rules09.test.js`, `tests/benefits09.test.js`, `tests/regression09.test.js` (espelhados em `docs/` onde aplicável).

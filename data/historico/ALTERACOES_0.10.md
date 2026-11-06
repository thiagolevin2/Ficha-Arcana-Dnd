# Ficha Arcana 0.10 Beta — alterações e verificação

**Data:** 6 de novembro de 2026.  
**Base exclusiva:** Ficha Arcana 0.9.6 Beta enviada pelo usuário.  
**SHA-256 do ZIP original:** `7ea17c5bac3772bc6ec6f028e64b4c81f30d7a2d60a8eb86163ea60fb2a42453`.

Esta é uma atualização do mesmo projeto. Foram preservados a navegação, a identidade visual, os catálogos existentes, as fichas, os dados 3D, as macros, o inventário, as infusões, os companheiros e as transformações. O protótipo antigo da 0.9 não foi incorporado.

O escopo segue a decisão mais recente do usuário: corrigir a magia personalizada, estruturar o Mestre da Batalha conforme 2024, destacar pré-requisitos, organizar o custo de atributos e manter a organização anterior para GitHub. Problemas que o jogador pode administrar foram registrados. Descanso curto, curas e infusões não receberam a revisão sugerida na auditoria.

## 1. Magia personalizada

**Antes:** o formulário salvava `7d6+9`, mas Rolar dano consultava novamente o mapa original de Raio de Fogo e rolava `1d10`. Magias sem fórmula mapeada podiam receber `1d6` genérico. As macros não consumiam a configuração de rolagem como uma fonte comum.

**Agora:** o plano confirmado acompanha a jogada até o dano. A fórmula salva é reaproveitada na listagem de combate e na avaliação das macros. Há seleção opcional de tipo de dano, preservada no JSON e na importação. O tipo padrão da magia continua disponível; cura usa Cura.

- Ataque e dano compartilham a fórmula confirmada, sem reconstruí-la pelo nome da magia.
- Repetir o dano mantém o plano confirmado. Crítico dobra dados, mantendo bônus fixos uma vez.
- Uma magia sem fórmula pronta pode usar a configuração explícita. Não há fallback silencioso para `1d6` nessa rota.
- Somente registrar uso e teste d20 continuam modos distintos; fórmulas inválidas são recusadas antes de pagar a conjuração.
- Configuração importada sem fórmula válida não derruba a renderização da área de combate; o jogador deve corrigir a configuração ao conjurar.
- Configuração sem o campo novo de tipo continua aceita, preservando os padrões anteriores.

**Limites:** fórmula personalizada é literal e não escala automaticamente com círculo/nível. Fontes, preparação e custos continuam seguindo o modelo já existente. Múltiplos raios, ataques, efeitos posteriores e salvaguardas de outras criaturas são resolvidos pela mesa. Não foi criado editor de novas descrições no catálogo.

### Seletor que bloqueava a conjuração

O erro `Failed to execute 'querySelector' ... '#095-spell-mode' is not a valid selector` estava relacionado a IDs iniciados por números. Esses IDs permanecem no HTML por compatibilidade, mas sua leitura usa `getElementById`. Isso vale também para os novos controles `010-*`. Os testes adicionais simulam um navegador que rejeita seletores CSS numéricos, além da verificação no Chrome.

## 2. Mestre da Batalha — regras de 2024

O nome visível e o nome reconhecido pelo motor agora são **Mestre da Batalha**. A grafia antiga **Mestre de Batalha** é aceita na migração, inclusive em entradas de multiclasse e nas chaves de configurações antigas de características. Não são apagadas manobras, usos ou anotações válidas do personagem.

O painel específico em Habilidades usa as 20 manobras canônicas de 2024 já presentes no catálogo. Não foram criadas cópias das manobras de Tasha com outros nomes para conceder o mesmo efeito outra vez. Os registros legados permanecem na biblioteca como referências, conforme a precedência existente.

| Nível de Guerreiro | Dados de Superioridade | Manobras conhecidas | Característica adicional |
| --- | --- | --- | --- |
| 3 | 4d8 | 3 | Estudioso da Guerra; Superioridade em Combate |
| 7 | 5d8 | 5 | Conheça Seu Inimigo |
| 10 | 5d10 | 7 | Superioridade em Combate Aprimorada |
| 15 | 6d10 | 9 | Implacável |
| 18 | 6d12 | 9 | Superioridade em Combate Suprema |

Os recursos usam o **nível de Guerreiro**, e o bônus de proficiência da CD usa o **nível total**, inclusive em multiclasse. A CD é `8 + proficiência + modificador de FOR ou DES`, com escolha explícita do jogador e os mesmos limites de atributo da ficha.

### Benefícios e botões

- **Estudioso da Guerra:** escolha de uma perícia da lista de Guerreiro e uma das 17 Ferramentas de Artesão do capítulo de equipamentos. A perícia é aplicada à ficha; a ferramenta fica salva e tem botão de teste com proficiência. Os nomes seguem o livro enviado, incluindo Ferramentas de Funileiro, Ferramentas de Vidreiro e Suprimentos de Alquimista/Calígrafo/Cervejeiro/Pintor.
- **Manobras:** descrição, seleção, CD, rolagem do dado correto e débito de um Dado de Superioridade. A falha na execução da rolagem não debita o recurso. Não é necessário primeiro apertar Usar no contador e depois gastar outra vez.
- **Aparar:** resultado do dado + modificador escolhido de FOR/DES. O jogador aplica a redução ao dano recebido.
- **Recuperar Energia:** resultado do dado + metade do nível de Guerreiro, arredondada para baixo, para PV temporários do aliado. Não usa Carisma nem aplica cura ao personagem.
- **Conheça Seu Inimigo:** disponível a partir de Guerreiro 7, com um uso por descanso longo e botão para recuperar o uso gastando um Dado de Superioridade. Imunidades, resistências e vulnerabilidades são informadas pelo Mestre.
- **Implacável:** a partir de Guerreiro 15, opção de rolar `1d8` sem gastar Dado de Superioridade, com confirmação manual de disponibilidade naquele turno. Mesmo no nível 18, esse dado alternativo continua d8.
- A seleção/remoção de manobra atualiza o painel imediatamente. Essa falha de atualização foi encontrada na inspeção visual e corrigida antes da entrega.

As manobras canônicas são: Aparar; Ataque Ameaçador; Ataque de Varredura; Ataque Estendido; Ataque para Distrair; Ataque Preciso; Ataque Provocante; Avaliação Tática; Contra-ataque; Desarme; Emboscada; Encontrão; Finta; Gato Por Lebre; Golpe do Comandante; Manobrar; Movimentação Evasiva; Presença de Autoridade; Prostrar; Recuperar Energia.

**Controle manual preservado:** uma manobra por ataque, ações/reação, gatilhos, alvo, alcance, tamanho, duração e uma vez por turno. Rolagens de arma ou testes aos quais o resultado se soma são resolvidos separadamente. Se uma macro já confirmou o custo do mesmo uso, não gaste outra vez no painel.

Marcos genéricos não configurados dessa subclasse são ocultados no painel de poderes, pois o painel específico os substitui. Marcos com configurações/anotações antigas continuam acessíveis para evitar perda de dados; o jogador deve conferir possíveis representações repetidas.

## 3. Pré-requisitos de talentos

- Cartões com requisito declarado recebem borda dourada luminosa e uma caixa de requisitos.
- A janela de descrição completa recebe borda luminosa e o texto do requisito em destaque.
- Quebras simples de palavra do OCR são reunidas no resumo do requisito, por exemplo `Treina-` + `mento`.
- Preferência de movimento reduzido desativa a pulsação; o destaque estático permanece.
- A indicação de elegibilidade passou a mencionar as **validações automáticas**, sem garantir que todos os requisitos foram verificados.

**O validador de treinamentos de todos os talentos não foi refeito.** O caso F05 da auditoria continua manual, conforme a decisão do usuário. A borda não significa que o personagem atende ao requisito. Benefícios e escolhas internas do talento continuam com a cobertura existente.

## 4. Custo inicial e interface

Corrigido o caso F17: atributos ainda não distribuídos não geram custo fictício de 594/27 nem mostram um total 10 inexistente.

- Campos iniciais vazios, modificador em traço e texto Não distribuído.
- Método e quantidade de atributos preenchidos apresentados juntos.
- Compra de pontos iniciada em seis valores 8: custo 0/27, saldo 27.
- Custo, saldo e aviso de excesso atualizados durante a digitação.
- Faixa de 8–15 na compra; conjunto padrão e resultados de dados sem orçamento de compra.
- Bônus do antecedente continuam separados, com sua validação anterior.
- Rótulos Verificação da ficha e Regras avançadas atualizados para 0.10.
- Painel do Mestre da Batalha, formulário e caixas novas adaptados para telas estreitas, preservando o tema existente.

O custo tratado aqui é o da **compra de atributos** apontado na auditoria. Pacotes A/B de equipamento, preços oficiais de partida e moedas não receberam um novo motor nesta atualização.

## 5. Compatibilidade e escopo preservado

O armazenamento local permanece em `arcana2024`, envelope `version: 3`. O metadado de versão da exportação de coleção indica 0.10, sem mudar o formato já existente do backup. Importação de personagem continua usando a normalização anterior, com a migração específica do Mestre da Batalha e o tipo opcional de magia.

Campos de macros, ações configuráveis, equipamentos próprios, companheiros, transformações, retrato, escolhas de espécies, infusões e contadores continuam nos formatos existentes. Fichas antigas com dados malformados ou incompletos ainda podem apresentar os limites listados em `PENDENCIAS_0.10.md`.

As implementações de infusões de `rules092.js` e `rules093.js`, o código de descanso de `finishRest()` e os handlers de cura existentes foram preservados. O acréscimo de Conheça Seu Inimigo usa a recuperação de recursos já existente; não corrige os casos de descanso com 0 PV nem os de incapacidade nas curas.

Não houve alteração dos catálogos de classes, espécies, talentos, magias ou infusões. A correção do Mestre da Batalha reconhece e conecta as regras de 2024 já cadastradas, com um módulo específico para suas ações.

## 6. Testes e verificações

| Verificação | Resultado / alcance |
| --- | --- |
| Suíte original na base 0.9.6 intacta | 175 testes passaram novamente antes da atualização |
| Suíte completa 0.10 | **204 passaram; 0 falharam; 0 ignorados** |
| Novos testes | 10 de magia/criação/requisitos, 12 de Mestre da Batalha e 7 de interface; total de 29 novos |
| Fluxos com DOM reduzido | Confirmar magia → ataque → dano → repetir; magia sem fórmula pronta; macro; seletores numéricos; escolhas/manobras/recursos; assistente; requisitos e configuração importada incompleta |
| Chrome real | Personagem anterior reaberto; Estudioso da Guerra; seleção de manobras; Aparar com débito único; criação de Mago; compra de pontos; conjuração personalizada; repetição; macro usando a mesma fórmula; d20 3D sem CD; borda luminosa |
| Tela estreita | Quadro de 390 px, área útil de 375 px; painel do Mestre da Batalha sem rolagem horizontal no estado examinado |
| Sintaxe e arquivos | Módulos JavaScript, JSONs, referências locais e identidade do site em `docs/` conferidos; a distribuição completa de `dist/` pode ser regenerada |
| Empacotamento | As cinco pastas originais foram mantidas; site em `docs/`, redirecionamento em `dist/`, dados e testes incluídos; 99 arquivos |

Os três arquivos novos de testes são `tests/rules010.test.js`, `tests/battle-master010.test.js` e `tests/app-ui010.test.js`. O log integral está em `RESULTADOS_TESTES_0.10.txt`, no pacote de código e testes. Para reproduzir, use Node.js 20 ou superior e execute `npm test`.

**Limitações:** testes de DOM reduzido não são um navegador. A inspeção visual foi feita no Chrome disponível e num quadro estreito; não homologa Safari, Firefox, aparelhos físicos, todos os dados nem cada combinação de classe, espécie, talento, equipamento e magia. Não foi testada publicação no repositório do usuário, quota de armazenamento cheia ou importação de todas as exportações históricas. A suíte não afirma que os problemas deixados manuais foram corrigidos.

## 7. Organização da entrega

### Ficha_Arcana_0.10_GitHub.zip

**Organização corrigida conforme a imagem solicitada:** `data/`, `dist/`, `docs/`, `scripts/` e `tests/`, com os arquivos principais na raiz. O pacote contém 99 arquivos. O site completo fica em `docs/`; `dist/index.html` redireciona para ele e `scripts/gerar_dist.py` permite recriar uma distribuição completa quando necessário.

Os testes apontam para `docs/` e passaram novamente (204/204) nesta organização. Os geradores de catálogos também gravam em `docs/`. O histórico e as pendências ficam em `data/historico/`. Foram retirados a captura sem uso, duplicações de distribuição, logs e scripts antigos que exigem os PDFs de origem. O aplicativo em `docs/` é byte a byte idêntico ao da 0.10 entregue anteriormente.

A publicação no GitHub Pages usa a branch principal e `/docs`. O arquivo `README.md` contém as instruções atuais deste pacote.

### Ficha_Arcana_0.10_Codigo_e_Testes.zip

Inclui o código completo, `dist/` e `docs/` sincronizados, dados de geração, testes, scripts históricos, changelogs, relatório e log da suíte. Esse pacote é para desenvolvimento e auditoria; não é necessário enviá-lo inteiro ao GitHub Pages. Nenhum PDF de origem ou personagem fictício de QA foi incluído.

### Arquivos centrais alterados

| Arquivo | Mudança |
| --- | --- |
| `spell-roll010.js` | Plano compartilhado de rolagem personalizada e dano confirmado |
| `creation010.js` | Estado dos atributos iniciais e custo de compra de pontos |
| `battle-master010.js` | Regras e ações específicas do Mestre da Batalha 2024 |
| `app.js` | Integração dos planos, seletores seguros, painéis, formulários, modais e atualização de escolhas |
| `core.js` | Perícia de Estudioso, recurso Conheça Seu Inimigo e normalização da subclasse |
| `progression.js`, `rules091.js` | Nome canônico e alias, reconhecimento da subclasse e limites existentes |
| `rules095.js` | Preservação do tipo opcional da rolagem de magia |
| `feats.js`, `styles.css` | Extração do requisito para exibição, brilho e responsividade das áreas novas |
| `index.html`, documentos e iniciador | Versão, instruções atuais e publicação em `docs/` |

## 8. Pendências e fontes

`PENDENCIAS_0.10.md` contém a situação dos 18 achados da auditoria, contornos manuais, novos registros da inspeção visual e funcionalidades ainda incompletas. Esse documento faz parte dos dois pacotes.

As regras específicas do Mestre da Batalha foram conferidas no **Livro do Jogador 2024 fornecido, páginas impressas 133–135**; os nomes das ferramentas, nas páginas 220–221. Referência oficial complementar: [D&D Beyond — 2024 Fighter vs. 2014 Fighter](https://www.dndbeyond.com/posts/1746-2024-fighter-vs-2014-fighter-whats-new). Os documentos de decisões anteriores `ADAPTACOES_2024.md`, `MULTICLASSE_2024.md` e `PRIORIDADES_E_CONTROLES_MANUAIS.md` continuam incluídos.

Esta entrega não declara uma revisão exaustiva de todas as regras, descrições ou erratas dos livros. Ela resolve o escopo selecionado e deixa as demais limitações explícitas.

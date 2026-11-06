# Ficha Arcana 0.12 Beta — base 0.11 corrigida e talentos revisados

Data: **6 de novembro de 2026**.

## Base correta desta entrega

Esta edição da 0.12 foi construída diretamente sobre **Ficha_Arcana_0.11_Melhorias (2).zip**, enviado após a correção do anexo. Ela substitui o pacote 0.12 anterior, que havia sido preparado com a base disponível na ocasião. A limitação anterior de ausência do código da 0.11 foi resolvida: agora esse código foi comparado e integrado.

Não houve recriação do projeto. Todos os caminhos de arquivos de funcionamento e todas as imagens da 0.11 foram conservados. A planilha utilizada continua sendo **Ficha_Arcana_Talentos_e_Dicas_Completa(2).xlsx**, linhas 7–89: **83 decisões, com 66 talentos ajustados e 17 mantidos** conforme a revisão. Os aumentos e efeitos que o jogador decidiu administrar manualmente continuam assim.

| Entrada | SHA-256 |
| --- | --- |
| ZIP da 0.11 | `eef811bf82e141319adb842dac5d23aa0e0749faa26b46fec084c36633b4736c` |
| Planilha revisada | `c8f9d349d8396affa3e0f4b2930006d91074a054135e213d849c35cd50647226` |

## Melhorias da 0.11 preservadas

- Painéis próprios de **Poderes de espécie**, **Poderes de linhagem**, **Talentos** e **Habilidades de subclasses**. Os cartões novos de talentos substituem a apresentação genérica dos talentos sem criar um segundo painel da mesma categoria.
- Remoção das entradas extras `species096:*` do catálogo genérico; os poderes continuam apresentados em sua categoria própria.
- Atalhos de Mãos Curativas e Sopro Dracônico usando os recursos existentes. A integração dos talentos não cria um segundo contador para essas habilidades.
- Ancestralidade do Golias com ação e contador próprios, incluindo migração do contador legado.
- Transformações na aba própria de Minha ficha; Mudar Aparência e as formas elegíveis continuam disponíveis. Voo permanece descritivo conforme a decisão da 0.11.
- Bônus de Forma Grande e Passos Rápidos apresentados na janela Deslocamento. Os benefícios novos dos talentos são somados sem duplicar esses bônus.
- Filtro de espécies por arquétipo, recomendações de atributos por classe e organização da preparação de equipamentos.
- Ordenação do grimório com fontes preparadas/especiais em prioridade e cartões individuais de magia no combate. Magias concedidas por talentos também entram nesses cartões.
- Inventário inicial e importação sem a entrada padrão Mochila, como implementado na 0.11. Essa política anterior foi preservada.
- Aparência, navegação, dados 3D, macros, retratos, companheiros, transformações, importação/exportação e salvamento local.

## Ajustes aplicados pela planilha

A aquisição de talentos com escolhas implementadas abre uma janela antes de confirmar o benefício. Atributo, perícia, ferramenta, estilo, elemento, arma de maestria e magia ficam vinculados à aquisição. Cancelar não consome a escolha nem aplica metade do benefício. Editar substitui a escolha anterior sem somar outro aumento.

Os benefícios fixos revisados passam aos cálculos de atributos, PV, CA, deslocamento, treinamento, salvaguardas e ataques. Os aumentos também são considerados nos pré-requisitos de multiclasse e nas CDs de manobras e poderes de espécie.

As magias de talentos têm fonte, atributo e usos gratuitos próprios, separados dos espaços e das concessões de espécie ou item. Talentos repetíveis mantêm registros separados. Os cartões exibem recursos de dádivas, metamagia, venenos e presentes dracônicos com os limites apropriados, sem fabricar veneno ao descansar.

As rolagens incluem os fluxos de repetição autorizada de Perfurador/Atacante Selvagem, crítico perfurante com dado adicional e dano fixo do Ataque Irresistível fora da duplicação dos dados. Ataques de Ambidestro, Armas de Haste e Armas Grandes têm seus próprios gatilhos; a mesa continua confirmando turno, alvo, ação e reação.

## Problemas corrigidos nesta integração

1. Escolhas internas que antes eram apenas nomes na ficha, sem aplicar o benefício revisado.
2. Duplicação de Alerta, Sortudo ou Vigoroso entre antecedente, Humano e concessões adicionais.
3. Reservas de conjuração de talentos misturadas com espaços comuns ou com outras fontes da mesma magia.
4. Requisitos de treinamento de armadura/escudo dos talentos tratados na planilha e propagação dos aumentos aos cálculos relacionados.
5. Repetição geral de dano oferecida sem uma permissão correspondente; agora há fluxos próprios ou autorização explícita de item.
6. Falta de dano adicional de Perfurador no crítico e risco de duplicar parcelas fixas indevidamente.
7. Confusão entre Besta Leve e a propriedade Leve, e soma duplicada do atributo com o estilo de duas armas.
8. Mistura do ataque bônus de Ambidestro com Leve/Nick, e dos gatilhos de ataque bônus e reação de Armas de Haste.
9. Reações defensivas modificando a CA geral: os benefícios situacionais são apresentados separadamente.
10. Salvaguardas contra morte com Resistente sem acesso à vantagem; trocar o modo desfaz a marcação anterior antes de registrar a nova rolagem.
11. Custos de macro parcialmente consumidos quando outro custo falhava; a validação ocorre antes do gasto.
12. Possível perda da configuração anterior de poder ao editar um item; os campos existentes são preservados.
13. Resumo incompleto de Protetivo, atualizado ao efeito de 2024.
14. Conflito entre os cartões de talentos novos e os painéis separados da 0.11: a integração conserva as categorias e evita duplicação.

## Tratamento das 83 decisões

“Alterado” significa ajuste no fluxo, cálculo, validação ou acompanhamento solicitado; efeitos situacionais explicitamente manuais permanecem manuais. “Mantido” não significa que o talento passou a ter automação integral.

| Linha | Talento | Situação | Resultado e parte manual |
| --- | --- | --- | --- |
| 7 | Adepto Elemental | Alterado | Escolha de atributo e elemento por aquisição; 1 nos dados de magia do elemento vira 2. Repetições exigem elementos diferentes. Resistência do alvo continua manual. |
| 8 | Adepto Metamágico | Alterado | Escolha de duas metamagias; cartão com reserva própria de dois pontos e registro de custo. Não modifica automaticamente todos os efeitos de cada metamagia. |
| 9 | Adepto Místico | Alterado | Escolha entre invocações elegíveis, com acompanhamento em Companheiros e configuração manual de uso; não cria uma criatura nem automatiza cada invocação. |
| 10 | Agressor | Mantido | Mantido; gatilho, distância e benefício permanecem sob controle do jogador. |
| 11 | Alerta | Alterado | Aquisição única considera antecedente, Humano e talentos adicionais; benefício anterior preservado. |
| 12 | Analítico | Alterado | Escolha de atributo e perícia. Amarelo para proficiência, azul para especialização; bônus recalculados e atalho Procurar. |
| 13 | Arquearia | Mantido | Estilo mantido conforme a decisão; sem revisão geral da seleção repetida. |
| 14 | Artifista | Alterado | Descrição, escolhas/anotações editáveis das ferramentas e registro nas proficiências. Fabricação e desconto são resolvidos pelo jogador. |
| 15 | Atacante Selvagem | Alterado | Repetição própria dos dados de arma, conservando a melhor jogada; uso por turno registrado. Repetição geral exige permissão explícita de item. |
| 16 | Atirador Arcano | Mantido | Mantido; cobertura, alcance e proximidade são conferidos na mesa. |
| 17 | Atleta | Mantido | Mantido; ajustes situacionais e eventuais aumentos manuais continuam com o jogador. |
| 18 | Ator | Mantido | Mantido, incluindo a configuração manual anterior. |
| 19 | Aumento no Valor de Atributo | Alterado | Janela para distribuir dois pontos, em um atributo ou dois, respeitando o limite; confirmação vinculada à aquisição. |
| 20 | Chef | Mantido | Mantido; descrição e configuração manual disponíveis. |
| 21 | Combate com Armas de Arremesso | Mantido | Estilo mantido conforme a decisão. |
| 22 | Combate com Armas Grandes | Mantido | Estilo mantido; não foi usado seu tratamento de dados como regra literal de Adepto Elemental. |
| 23 | Combate com Duas Armas | Mantido | Estilo mantido; integração dos novos ataques evita somar o atributo duas vezes. |
| 24 | Combate Desarmado | Mantido | Estilo mantido; alternativas de dano desarmado são preservadas. |
| 25 | Combatente Montado | Mantido | Mantido; montaria, posição e gatilhos continuam manuais. |
| 26 | Conjurador Bélico | Alterado | Atributo escolhido e botão de concentração com vantagem; controle das demais situações permanece com o jogador. |
| 27 | Conjurador Ritualista | Alterado | Lista própria de rituais de 1º círculo, quantidade pela proficiência, atributo e Ritual Rápido com uso compartilhado por descanso longo. |
| 28 | Curandeiro | Mantido | Mantido; sem revisão geral do sistema anterior de curas. |
| 29 | Dádiva da Fortitude | Alterado | Escolha de atributo até 30 e +40 aos PV máximos derivados, sem acumular a cada renderização. |
| 30 | Dádiva da Proeza em Combate | Mantido | Mantida conforme solicitado; não recebeu automação nova. |
| 31 | Dádiva da Proficiência em Perícia | Alterado | Proficiência nas perícias restantes e escolha de uma especialização entre as elegíveis. |
| 32 | Dádiva da Recordação de Magia | Alterado | Registra o último espaço elegível realmente gasto, comum ou de Pacto, e d4 devolve esse espaço quando corresponde ao círculo 1–4; uma tentativa por registro. |
| 33 | Dádiva da Recuperação | Alterado | Seleção de quantidade e reserva visual de dez d10; Até a Morte usa contador próprio. O resultado da recuperação é mostrado para aplicação pelo jogador. |
| 34 | Dádiva da Resistência à Energia | Alterado | Duas resistências escolhidas; troca após descanso longo; reação com registro manual e sem limite diário inventado. |
| 35 | Dádiva da Velocidade | Alterado | Atributo até 30, +9 m e botão Desengajar que encerra Agarrado na própria ficha. |
| 36 | Dádiva da Viagem Dimensional | Alterado | Atributo até 30 e lembrete de teleporte após Atacar ou Magia, sem contador indevido; destino manual. |
| 37 | Dádiva da Visão Verdadeira | Alterado | Atributo até 30, sentido de 18 m com explicação, sem ativação ou gasto. |
| 38 | Dádiva do Ataque Irresistível | Alterado | Atributo até 30; em 20 natural, botão acrescenta o valor completo do atributo escolhido. Resistência física é lembrada, não resolvida no alvo. |
| 39 | Dádiva do Destino | Alterado | Atributo até 30, rolagem 2d4, escolha de somar/subtrair e uso recuperado na iniciativa ou no descanso elegível. |
| 40 | Dádiva do Espírito da Noite | Alterado | Atributo até 30; controle manual de penumbra/escuridão, resistências descritas e botão separado de invisibilidade. |
| 41 | Defensivo | Mantido | Estilo mantido conforme a decisão. |
| 42 | Duelismo | Mantido | Estilo mantido conforme a decisão. |
| 43 | Duelista Defensivo | Alterado | +1 DES e Aparar com arma de Acuidade; mostra CA contra corpo a corpo sem alterar a CA geral. |
| 44 | Envenenador | Alterado | Atributo, kit, CD dinâmica, fabricação por 50 PO, doses por proficiência, estoque e gasto; descanso não fabrica veneno. |
| 45 | Esmagador | Alterado | Atributo, registro por turno e lembretes em dano/crítico contundente; posição e vantagem contra o alvo ficam na mesa. |
| 46 | Especialista Ambidestro | Alterado | Atributo e ataque bônus separado de Leve/Nick; arma inicial Leve, outra arma corpo a corpo sem Duas Mãos; atributo positivo só quando autorizado. |
| 47 | Especialista em Armaduras Leves | Alterado | Atributo escolhido e treinamento de armadura leve/escudo preservado na derivação da ficha. |
| 48 | Especialista em Armaduras Médias | Alterado | Valida treinamento leve, registra atributo e concede treinamento médio. |
| 49 | Especialista em Armaduras Pesadas | Alterado | Valida treinamento médio, registra atributo e concede treinamento pesado. |
| 50 | Especialista em Besta | Alterado | DES +1; bônus de atributo no ataque Leve de besta uma única vez. Besta Leve não é confundida com arma de propriedade Leve. |
| 51 | Especialista em Perícia | Alterado | Escolha de atributo, nova proficiência e especialização; permite especializar a perícia recém-adquirida. |
| 52 | Exterminador de Conjuradores | Alterado | Atributo e Resguardo Mental com uso próprio, recuperado em descanso curto/longo; concentração do alvo continua manual. |
| 53 | Habilidoso | Alterado | Três perícias/ferramentas novas por aquisição. Aquisições separadas, sem transformar proficiência repetida em especialização. |
| 54 | Imobilizador | Alterado | Atributo, registro por turno e lembrete de causar dano/tentar agarrar; o jogador confirma o acerto e resolve a salvaguarda. |
| 55 | Iniciado Artífice | Alterado | Fonte Tasha identificada; truque, magia e ferramenta escolhidos, INT e conjuração gratuita própria, separada de espaços. |
| 56 | Iniciado em Combate | Alterado | Fonte Tasha identificada; estilo elegível escolhido e incorporado ao cálculo, com escolha salva. |
| 57 | Iniciado em Magia | Alterado | Lista, dois truques, magia de 1º e atributo escolhidos. Gratuito separado; repetição exige outra lista e aquisição independente. |
| 58 | Interceptação | Mantido | Estilo mantido conforme a decisão. |
| 59 | Líder Inspirador | Alterado | Atributo escolhido; PV temporários calculados sem aumentar PV máximos; registro de até seis beneficiários após descanso. |
| 60 | Luta às Cegas | Mantido | Estilo mantido conforme a decisão. |
| 61 | Mente Aguçada | Alterado | INT +1, perícia com proficiência/especialização e bordas distintas, além de atalho Estudar. |
| 62 | Mestre das Armas | Alterado | Atributo e uma maestria de arma já proficiente; troca após descanso longo, sem duplicar vagas de maestria da classe. |
| 63 | Mestre em Armaduras Médias | Alterado | Valida treinamento, registra atributo e permite DES até +3 na CA de armadura média, respeitando o atributo real. |
| 64 | Mestre em Armaduras Pesadas | Alterado | Valida treinamento e atributo; opção de reduzir dano físico de ataque pela proficiência com armadura pesada, antes da resistência. |
| 65 | Mestre em Armas de Haste | Alterado | Atributo, ataque bônus d4 contundente e reação separados; reação não é marcada automaticamente como oportunidade. |
| 66 | Mestre em Armas Grandes | Alterado | FOR +1, bônus de proficiência condicional para arma Pesada e ataque bônus com confirmação do gatilho. |
| 67 | Mestre em Escudos | Alterado | Valida treinamento, FOR +1, Golpe de Escudo com CD/registro por turno e reação defensiva separada. |
| 68 | Mestre-Atirador | Alterado | DES +1 e lembretes de cobertura, alcance e proximidade; resolução manual conforme a decisão. |
| 69 | Músico | Alterado | Escolha de três instrumentos, registro nas proficiências e de beneficiários até o limite da proficiência. |
| 70 | Perfurador | Alterado | Atributo, repetição de um dado perfurante mantendo o novo resultado, marcador por turno e dado adicional de crítico sem duplicá-lo outra vez. |
| 71 | Pistoleiro | Alterado | Fonte Tasha identificada; DES +1 e proficiência com armas de fogo, inclusive personalizadas que sejam marcadas assim. |
| 72 | Presente do Dragão Cromático | Alterado | Fonte Fizban identificada; arma/elemento, dano extra da infusão ativa e encerramento manual; usos de infusão e resistência reativa independentes. |
| 73 | Presente do Dragão de Gemas | Alterado | Fonte Fizban identificada; atributo, CD dinâmica, 2d8 e contador da represália. |
| 74 | Presente do Dragão Metálico | Alterado | Fonte Fizban identificada; Curar Ferimentos com gratuito próprio e asas protetoras com contador separado e bônus de CA mostrado. |
| 75 | Protetivo | Alterado | Resumo e reação atualizados para o efeito completo de 2024, com escudo, alvo a até 1,5 m e desvantagem durante o intervalo descrito; seleção repetida segue a política mantida. |
| 76 | Resiliente | Alterado | Somente salvaguardas ainda sem proficiência, atributo +1 e proficiência correspondente efetivamente aplicados. |
| 77 | Resistente | Alterado | CON +1, vantagem na salvaguarda contra morte e ação para gastar um dado de vida sem acrescentar CON ao resultado. |
| 78 | Sentinela | Alterado | Atributo e ataque de oportunidade próprio; em acerto, lembrete de deslocamento 0. Gatilho e aplicação no alvo são manuais. |
| 79 | Sorrateiro | Alterado | DES +1, Visão às Cegas 3 m, confirmação de alcance para condições e vantagem ao Esconder-se em combate; posição continua manual. |
| 80 | Sortudo | Alterado | Aquisição única por identidade, considerando todas as origens; contador anterior preservado. |
| 81 | Talhador | Alterado | Atributo, controle por turno da redução de 3 m e lembrete de desvantagem no crítico cortante. |
| 82 | Telecinético | Alterado | Atributo, Mãos Mágicas por fonte própria e empurrão com CD ligada ao atributo escolhido; alvo/posição manuais. |
| 83 | Telepático | Alterado | Atributo, Detectar Pensamentos preparado por fonte própria e uso gratuito independente de espaços. |
| 84 | Tocado Pelas Sombras | Alterado | Atributo, Invisibilidade e escolha de magia de 1º de Ilusão/Necromancia; dois gratuitos independentes e uso opcional de espaços. |
| 85 | Tocado Por Fadas | Alterado | Atributo, Passo Nebuloso e escolha de magia de 1º de Adivinhação/Encantamento; dois gratuitos independentes e uso opcional de espaços. |
| 86 | Treinamento com Armas Marciais | Alterado | Atributo, proficiência marcial e ataques atualizados; não concede maestria por si só. |
| 87 | Valentão de Taverna | Alterado | Dano desarmado d4 + FOR como alternativa, proficiência improvisada e repetição de cada 1 uma vez; novo resultado é aceito, mesmo sendo 1. |
| 88 | Velocista | Alterado | Atributo, +3 m derivados e lembretes de terreno difícil/ataques de oportunidade. |
| 89 | Vigoroso | Alterado | Aquisição única considerando todas as origens; PV por nível anteriores preservados. |

## Compatibilidade de fichas

A exportação geral continua no formato 3 e passa a identificar a aplicação como 0.12. Novos campos guardam escolhas e recursos de talentos sem substituir retratos, macros, companheiros e as configurações anteriores testadas.

Fichas antigas que só guardam o nome do talento não informam qual atributo foi aumentado. O sistema não adivinha: abra **Habilidades → Talentos → Configurar escolhas**. Se o aumento já estiver lançado manualmente, marque **Já somei esse aumento manualmente na ficha**. Confira também ajustes manuais de PV, CA e deslocamento que compensavam benefícios agora derivados automaticamente.

Exporte um backup JSON antes de atualizar. O armazenamento continua local ao endereço, porta e perfil de navegador. Importar um backup completo é a forma de levar personagens a outro dispositivo ou endereço. A política de remoção da entrada Mochila na importação foi herdada da 0.11 e não ampliada nesta revisão.

## Quantidade de arquivos e organização

O pacote de publicação contém **50 arquivos**. O anexo da 0.11 tinha 47: foram acrescentados apenas dois módulos de talentos e este relatório. A organização continua com `docs/` e os documentos principais na raiz, sem a pasta envoltória `0.11/` do ZIP de entrada.

| Conteúdo do ZIP de publicação | Quantidade |
| --- | ---: |
| Arquivos do site em `docs/`, incluindo imagens e `.nojekyll` | 47 |
| `README.md`, `VERSAO.txt` e `ALTERACOES_0.12.md` | 3 |
| **Total** | **50** |

Nenhum arquivo necessário ao funcionamento foi retirado. Imagens e catálogos não foram reduzidos nem substituídos por cópias incompletas. Não há dependência de `data/`, `scripts/`, `tests/` ou `dist/` para executar o site publicado.

Os testes e seus dados de referência estão num **ZIP separado de 34 arquivos**, que pode ser extraído sobre a mesma pasta quando você quiser executar `npm test`. Assim o repositório de publicação pode continuar enxuto e o código dos testes permanece disponível. O código-fonte executável completo já está no ZIP principal, sem minificação artificial ou fusão arriscada de módulos apenas para baixar a contagem.

Não foram incluídos PDFs, logs, fichas fictícias de teste, arquivos de prévia, dependências instaladas ou cópias duplicadas de distribuição. Não houve publicação remota nem alteração automática do repositório GitHub.

## Testes executados nesta base

| Verificação | Resultado |
| --- | --- |
| Testes herdados, novos talentos e integração | **263 aprovados, 0 falhas, 0 ignorados** |
| Casos novos de talentos da 0.12 | 48, incluídos na contagem acima |
| Casos novos para preservar a 0.11 | 11, incluídos na contagem acima |
| Arquivos de testes | 30 |
| Sintaxe JavaScript dos módulos e testes | 56 arquivos sem erro |
| Caminhos de funcionamento da 0.11 | Todos preservados |
| JSON, referências locais e integridade dos ZIPs | Verificados no empacotamento |

O anexo 0.11 era um pacote de publicação sem testes nem dados de referência. A primeira execução da suíte antiga sobre ele mostrou 196 aprovações e oito divergências: duas por falta dos dados de referência e seis por expectativas antigas de interface, inventário, movimento ou tipo de ação. Os dados de referência foram restaurados somente no conjunto de testes; as expectativas foram adaptadas às decisões reais da 0.11. Não se reverteu a interface nova para satisfazer testes antigos.

Foram acrescentadas verificações de painéis separados sem duplicar Talentos, contador compartilhado de Mãos Curativas, botão/CD do Sopro, migração da ancestralidade do Golias, Forma Grande e Passos Rápidos somados uma vez aos talentos, voo descritivo/Mudar Aparência, filtro de arquétipos, cartões de combate com fonte de talento, organização do grimório e inventário/importação da 0.11.

### Conferência real no navegador

- Importação pela interface de três personagens fictícios, sem editar o armazenamento por script.
- Painéis separados de espécie, linhagem, talentos e subclasses; voo do Draconato apenas descritivo.
- Sopro Dracônico com escolha de área, animação 3D e resultado; o contador caiu de 3/3 para 2/3.
- Golias com Velocista: deslocamento base exibido em 13,5 m e, após ativar Forma Grande na aba Transformação, janela Deslocamento mostrando 16,5 m, sem duplicar o bônus.
- Analítico: escolha real com bordas amarelas/azuis, INT 14 → 15 e Percepção passiva 24 após especializar Percepção no personagem de teste.
- Cartões de magia em Combate preservados, incluindo Mísseis Mágicos concedidos por Iniciado em Magia. A janela apresentou a fonte do talento, Sabedoria e o uso gratuito próprio; depois do registro, o painel mostrou gratuito 0/1.
- Criador com filtro Ser dos mares, exibindo nove opções correspondentes.
- Na leitura final dos registros capturados, não apareceram erros atribuídos à página local do site. Isso não equivale a uma captura exaustiva de toda a rede ou de todo fluxo possível.

## O que continua manual ou incompleto

- Alvos, alcance, posição, áreas, duração, início de turno, ações e reações continuam com a mesa. Os marcadores por turno são liberados manualmente.
- As 17 decisões mantidas podem conservar limitações já aceitas, incluindo ajustes manuais de atributo e seleção redundante de estilos.
- Adepto Místico registra elegibilidade, escolha, descrição e configuração de uso; cada invocação não possui implementação individual completa. Metamagias possuem escolhas/reserva, mas os efeitos de alcance, alvos e duração não são todos automatizados.
- Recordação de Magia acompanha a última conjuração elegível, sem fila de pendências. Role o d4 antes da próxima conjuração; em macros compostas, confira o último espaço debitado.
- A conjuração direta tem seletor de fonte. Macros podem propor a primeira fonte de talento compatível quando há sobreposição: confira o custo antes de confirmar.
- Reduzir níveis ou retreinar não desfaz automaticamente toda a progressão. Revise as concessões e aumentos. Mudanças de maestria/resistências têm o controle de descanso implementado; outras permissões de retreinamento continuam com o Mestre.
- Infusão Cromática, penumbra/escuridão, Visão às Cegas e invisibilidade precisam ser encerradas/desmarcadas quando deixarem de valer. Não há relógio de combate.
- Os dados de Recuperar Vitalidade são rolados e debitados; o resultado é apresentado para aplicar a cura. Beneficiários de Músico/Líder são anotações, sem editar fichas de terceiros.
- O sistema anterior de descanso curto, curas e infusões não recebeu revisão geral, conforme a instrução do usuário.
- Persistem pendências anteriores em Arcano Místico ao reselecionar, avanço com 0 PV, redução de nível, Aura de Proteção/efeitos antigos, Clava Grande em Artes Marciais, pacotes iniciais completos e textos extraídos de algumas magias. A mesa pode administrar os casos já aceitos manualmente.
- A divisão de painéis elimina as entradas genéricas adicionais da espécie, mas as referências textuais do livro ainda podem repetir nomes de traços. Isso não é uma segunda concessão automática.
- A contagem de 263 testes não comprova todas as combinações de 83 talentos, classes, espécies, itens e suplementos. Não houve auditoria completa de erratas, acessibilidade, dispositivos móveis, Safari/Firefox nem teste do site já publicado no GitHub.

Esta entrega deve substituir o pacote 0.12 anterior para manter a base 0.11 correta.

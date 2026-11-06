# Arcana — fichas e dados para D&D 2024

## Organização para GitHub (0.9.6)

Esta edição conserva **data/**, **dist/**, **docs/**, **scripts/** e **tests/**, como no projeto original. Para caber em uma única seleção de arquivos no GitHub, o site completo fica apenas em **docs/**, sem a cópia duplicada de arquivos em **dist/**. O diretório **dist/** contém um redirecionamento; quem precisar da cópia completa pode executar `python scripts/gerar_dist.py` no computador após baixar o projeto.

- **Publicar no GitHub Pages:** `Settings > Pages > Deploy from a branch > main > /docs`.
- **Executar localmente no Windows:** execute `INICIAR_WINDOWS.bat` (agora serve `docs/`).
- **Executar os testes:** `npm test` (requer Node.js, sem instalações de dependências).
- **Histórico de alterações:** `data/historico/` (mantido integralmente).
- **Edição:** altere os arquivos em `docs/`; `data/` guarda os dados-fonte e `scripts/` os geradores.

Não envie um ZIP fechado para a interface de upload de arquivos do GitHub. Extraia-o e envie seu conteúdo, preservando as pastas.


Site completo em português, com criação de personagens, ficha interativa, dados 3D e referências dos PDFs fornecidos. Funciona sem dependências de compilação.

## Arcana 0.9.6 — revisão de espécies e linhagens (beta)

A versão **0.9.6** reorganiza a apresentação de benefícios de espécies e corrige escolhas/concessões. Elfo e Humano agora têm escolhas obrigatórias de perícias e truques/talentos na criação; Aasimar usa Revelação Celestial ativável e dano opcional nos ataques; caixas de Gnomo, Tiferino, Draconato, Anão e Pequenino mostram poderes, resistências e rolagens aplicáveis. Suplementos como Dhampiro, Forjado Bélico, Híbrido Simic, Transmorfo, Genasi, Tortle, Tabaxi, Centauro, Aarakocra, Tritão e Draconato de Gemas receberam controles e correções compatíveis com a regra da fonte adotada.

**Tempo, turnos, alvos, áreas e efeitos situacionais continuam a cargo da mesa.** As habilidades configuráveis da 0.9.5 foram mantidas e os dados de personagens anteriores continuam importáveis. Confira **`data/historico/ALTERACOES_0.9.6.md`** para a lista completa e os limites; faça backup JSON antes de atualizar.

## Arcana 0.9.5 — uso simplificado e controle assistido (beta)

A versão 0.9.5 reorganiza as ações de jogo: **magias** apenas para registrar uso e fazer rolagens, **Companheiros** como página independente, **Transformações** somente quando há habilidade correspondente, **itens mágicos** e **infusões** diretamente no Inventário, e **Habilidades** com traços de espécies/linhagens/talentos/subclasses, rolagens e custos configuráveis.

**Sem automação de turnos, rodadas, áreas e alvos.** O jogador/Mestre administra a duração e consequências. Efeitos de antigas fichas continuam visíveis para encerramento manual. A prioridade mecânica é D&D 2024; características suplementares não estruturadas são editáveis, não inventadas.

Veja `data/historico/ALTERACOES_0.9.5.md` para todos os detalhes, status de testes e limitações. Faça backup JSON antes de atualizar.

## Arcana 0.9.4 — macros de combate (beta)

Nova subaba **Ficha > Combate > Macros**: combine armas, ataque desarmado, habilidades, magias, poderes de itens com cargas e dano personalizado em uma única rolagem composta, recalculada a partir da ficha atual. Os gastos de recursos só são aplicados após confirmar. Duração de efeitos, turnos e rodadas ficam a cargo do jogador/Mestre. **145 testes automatizados aprovados.**

Leia `data/historico/ALTERACOES_0.9.4.md` e `data/historico/PRIORIDADES_E_CONTROLES_MANUAIS.md` para entender as regras, limites, prioridades e o que foi delegado à mesa. A execução visual no navegador do ambiente estava bloqueada.

## Arcana 0.9.3 — cena, subclasses e criaturas (beta)

A versão 0.9.3 adiciona um acompanhamento de características para as **88 subclasses**, gerenciamento de duração, concentração, condições e alvos de magias, fichas vinculadas de companheiros e Forma Selvagem, poderes ativáveis de itens, algumas reações de infusões e controles de escolhas de espécies e talentos. **131 testes automatizados aprovados.**

**A automação de todas as características não está concluída**: os recursos de subclasses que não possuem regras estruturadas são configuráveis, mas não recebem efeitos inventados. Leia `data/historico/ALTERACOES_0.9.3.md` para a matriz de cobertura e as limitações.

## Arcana 0.9.2 — integração de regras e efeitos (beta)

A 0.9.2 acrescenta **infusões do Artífice vinculadas ao inventário**, bônus editáveis de itens equipados/sintonizados, concessões de magias por fontes especiais (incluindo linhagens de Elfo/Tiferino 2024), seleção de maestrias de armas, Sopro do Draconato, habilidades de Orc e Golias e novos requisitos de invocações. **109 testes automatizados foram aprovados.**

**Leia `data/historico/ALTERACOES_0.9.2.md` antes de utilizar.** O documento indica as regras com efeito real e os poderes que continuam manuais. Esta não é uma implementação exaustiva de todas as 88 subclasses ou das 424 magias.

## Arcana 0.9.1 — revisão ampliada (beta)

A versão 0.9.1 acrescenta Arcanos Místicos, seleção limitada de Invocações/Metamagias/Manobras, dados de Superioridade, regras de espécies, sintonização e backup completo. **Veja `data/historico/ALTERACOES_0.9.1.md` para capacidades e limites atuais.**

## Arcana 0.9 — revisão de mecânicas e segurança (beta)

Atualização incremental da versão 0.8, preservando o catálogo existente, os dados 3D, a estrutura de armazenamento local e a publicação estática. **Não é uma revisão exaustiva de todas as subclasses, espécies, suplementos e poderes de itens.** As opções sem efeito automático continuam marcadas para conferência manual.

- Novas regras isoladas para dano, morte, estabilização, PV temporários e cura (`rules09.js`), integradas à ficha.
- Benefícios e pendências visíveis no novo **Painel de Verificação da Ficha** na seção **Habilidades** (`benefits09.js`).
- Regras corrigidas: equipamento/proficiência de Ladino, Artes Marciais de Monge, Fúria e armas de arremesso com Força, estilos de luta, ataque secundário com modificadores negativos, proteção de Descanso Curto, repetição de concentração com Inspiração e condições incapacitantes.
- Conjuração revista para preparação por classe, Marca do Predador/Destruição Divina como magias sempre disponíveis, rituais de Mago, Segredos Mágicos de Bardo e validação de círculo nas fontes multiclasse.
- Treinamento de armaduras por talentos e elegibilidade que não confunde benefícios com pré-requisitos.
- Erratas de texto/catálogo: escola de **Esfera Flamejante = Evocação**, **Picareta de Guerra** versátil 1d10, Dardo com propriedade de arremesso e correções em referências de Clérigo.
- Edição de Estilos de Luta sem bônus residuais, impressão com nomes escapados, histórico de aumentos preservado, importação de inventários grandes e painel de recuperação de dados de importação local inválidos.
- Ajustes de responsividade, acessibilidade dos controles de exportação e foco de janelas.

**Backup:** antes de atualizar, exporte seus personagens JSON na versão antiga. As fichas locais usam o mesmo endereço/origem do navegador (`localhost:8000` ou o domínio publicado). Se houver ficha antiga inválida, aparece um aviso para **baixar os dados originais**, sem apagá-los silenciosamente; prosseguir com fichas recuperáveis exige confirmação.

**Testes:** execute `npm test` com Node.js (suíte automatizada atualizada). Nesta entrega a execução dos testes de código passou, mas o navegador automatizado do ambiente de desenvolvimento bloqueou a abertura de páginas, por isso a inspeção visual e todos os percursos interativos devem ser revalidados em um navegador comum.

Veja `data/historico/ALTERACOES_0.9.md` para os detalhes e os limites conhecidos.

## Abrir no computador

1. Extraia todo o ZIP.
2. Com Python 3 instalado, abra `INICIAR_WINDOWS.bat` no Windows. Em outros sistemas, execute na pasta do projeto:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory docs
```

3. Abra `http://localhost:8000` no navegador. Mantenha o terminal aberto enquanto usa o site.

Use um servidor HTTP: abrir `docs/index.html` diretamente por duplo clique impede o carregamento dos módulos e catálogos em alguns navegadores. Qualquer hospedagem estática pode publicar o conteúdo de `docs/`. Para GitHub Pages, a pasta `docs/` já contém uma cópia pronta do site; em **Settings → Pages**, selecione **Deploy from a branch**, a branch principal e a pasta **/docs**. Ao alterar o aplicativo, atualize também a cópia em `docs/` a partir de `docs/` antes de publicar.

## Atualização de equipamentos e ficha

- Inventário separado em mochila e equipamento de combate, com armas, armaduras e escudos visíveis.
- Criação e edição de armaduras personalizadas com CA base, limite de Destreza, categoria, Força mínima, peso, furtividade, bônus mágico de CA e descrição de efeitos.
- Criação e edição de escudos personalizados com bônus de CA, peso e efeitos.
- Armas personalizadas podem usar qualquer arma do catálogo como base e configurar dano como dado, dado + valor fixo, dado + dado, dado + atributo ou dado + valor fixo + dado.
- Alinhamento opcional na criação e guia própria em Minha ficha, com os nove alinhamentos.
- A barra “O destino está nos dados” pode ser escondida e restaurada pelo botão flutuante; a preferência fica salva no navegador.
- Cópia de `docs/` sincronizada com `docs/` para GitHub Pages.

## Arcana 0.8 — combate, equipamentos e progressão por XP

- A janela **Verificação dos Estilos de Luta** mostra quais estilos estão ativos, quais requisitos foram atendidos e quais condições ainda faltam. Os efeitos compatíveis são aplicados nas rolagens: Arquearia (+2 no ataque à distância), Duelismo (+2 no dano com arma corpo a corpo de uma mão, podendo usar escudo), Defesa (+1 CA com armadura), Combate com Armas de Arremesso (+2 no dano ao arremessar) e Combate com Armas Grandes (resultados 1 e 2 nos dados de dano passam a 3, conforme a regra de 2024). Combate com Duas Armas aplica o modificador de atributo no dano da arma secundária quando os requisitos são atendidos.
- O editor de Estilos de Luta usa identificadores de elementos estáveis, sem montar seletores a partir dos nomes traduzidos; isso corrige a falha de leitura de checkbox ao editar personagens já evoluídos.
- O catálogo de armas exibe cartões com dano, propriedades, alcance e proficiências. **Espada Grande** aparece com esse nome; a identificação antiga **Montante** continua aceita para preservar fichas já salvas.
- A seleção de equipamento inicial filtra as opções conforme as proficiências e permissões da classe escolhida.
- A progressão usa a tabela oficial de XP para os níveis 1–20, com barra de progresso, janela para adicionar/remover XP e botão de subida habilitado somente ao alcançar o requisito. O editor de personagem e o organizador de classes não concedem níveis diretamente; a progressão e a entrada em multiclasse devem passar pela janela de XP.
- A navegação lateral tem rolagem interna e dimensões responsivas; a página de **Talentos** está dentro de **Biblioteca**.
- A guia **Combate** fica na barra horizontal de Minha ficha e reúne modos de ataque com armas e magias. A mochila exibe armas, escudos e armaduras e o botão de adicionar item oferece as três categorias.

## Funcionalidades

- 12 classes e 48 subclasses do livro de 2024, mais Artífice e 40 subclasses adicionais: 13 classes e 88 subclasses no total.
- 10 espécies do livro de 2024, mais 100 espécies, variantes ou linhagens adicionais, com busca na criação. São opções de fontes diferentes, incluindo compilações e materiais experimentais identificados.
- 16 antecedentes de 2024; atributos pela origem, conjunto padrão, compra de pontos ou 4d6 descartando o menor.
- Uma ou várias classes, até o nível total 20; níveis e subclasses separados, pré-requisitos de multiclasse, proficiências da classe inicial, PV e dados de vida por classe.
- Botão **Subir de nível**, com prévia de PV e proficiência, escolha de classe/subclasse, PV fixos ou rolados, aumentos de atributo e registro de talentos ou escolhas pendentes.
- Preparação e atributo de conjuração por classe; espaços combinados de Conjuração e reserva separada de Pacto. Descanso curto restaura apenas a reserva de Pacto entre os espaços.
- Itens próprios com descrição, raridade, valor, sintonização, cargas e recuperação configurável. Armas próprias com dados/tipo de dano, propriedades, peso, atributo, proficiência e bônus.
- Retrato do personagem por PNG/JPG/WebP, até 12 MB; reduzido para até 900 pixels no maior lado e salvo na ficha e no JSON. Enquadramento vertical ajustável.
- Proficiência, perícias, CA, iniciativa, deslocamento, ataques, dano, CD e recursos calculados.
- Rolagens livres **sem CD** por padrão, comparação opcional com CD/CA, fórmulas, modificadores e vantagem/desvantagem no d20.
- Dados d4, d6, d8, d10, d12, d20 e d100 em animação 3D de queda, quiques e giro. A face de resultado termina voltada para cima; a câmera aproxima a visão superior e o número recebe contraste. A animação usa o resultado já sorteado, sem sortear novamente.
- Crítico de ataque em 20 natural e erro em 1 natural; testes comuns com CD usam o total. Sem CD, um teste comum não declara sucesso ou falha automaticamente.
- Animação pode ser pulada ou desativada; a preferência de movimento reduzido é respeitada.
- 424 descrições de magias: 391 da base e 33 adicionais não repetidas, com filtros, preparação, espaços, pacto e fórmulas para magias comuns.
- Em **Magias**, o botão **Adicionar magia** abre o acervo por classe: magias fora da classe/nível/limite ficam somente para consulta; uma fonte externa (item, talento ou habilidade) pode ser registrada manualmente quando a ficha realmente a conceder. Contadores separam truques conhecidos, magias conhecidas e magias preparadas conforme o modelo da classe.
- A criação de personagem inicia os seis campos de atributo em **0**, destaca escolhas selecionadas e oferece o conjunto padrão **15, 14, 13, 12, 10, 8**, além da compra de pontos e rolagem 4d6.
- Em **Combate**, a ficha apresenta magias de dano já incluídas no grimório. Em **Minha ficha**, a janela **Curas e recuperação** reúne magias de cura e habilidades com controle de usos, incluindo recursos como Cura pelas Mãos, Recuperar Fôlego, Mãos Curativas, Vigor Arcano e frutos de Bom Fruto quando disponíveis.
- O tema noturno reforça o contraste de campos editáveis, textos, cartões, janelas e opções selecionadas com uma paleta verde e oliva; **Habilidades** aparece logo abaixo de **Minha ficha** na navegação.
- Catálogo de talentos, invocações, manobras, itens, infusões, opções de classe e dons dos suplementos. Descrições, fonte, página, notas de adaptação e textos históricos separados.
- Itens podem ser adicionados à mochila; referências e talentos podem ser guardados na ficha. Recursos de subclasses legadas são mostrados conforme o nível.
- 509 páginas de 10 documentos únicos pesquisáveis; 490 têm texto extraível. Uma cópia idêntica de Subclasses Revisadas foi ignorada. Wildemount e Ravenloft incluem somente os trechos enviados.
- Guia separada **Economias**, com registro de ganhos e gastos, descrição, valor, moeda, data, saldo atual, totais acumulados e opção de desfazer movimentações; os lançamentos atualizam o Tesouro automaticamente.
- Hub inicial **Minhas fichas** para escolher, criar, importar e exportar personagens antes de abrir uma ficha; tema claro/noturno com preferência salva neste navegador.
- Múltiplos personagens, anotações, mochila, moedas, peso, PV, concentração, exaustão, descansos, exportação/importação JSON e impressão em ficha própria.

## Prioridade de regras

O livro de 2024 fornecido prevalece sobre reimpressões e conflitos. Versões antigas correspondentes ficam desativadas para concessão duplicada. Aumentos raciais antigos não são aplicados: os aumentos vêm do antecedente. Recursos de subclasses antigas de nível 1 ou 2 são recebidos no nível 3. Unearthed Arcana permanece experimental.

As correspondências consideram o efeito, além do nome: por exemplo, a tradução de Tasha chama a magia de 5º círculo de `Invocar Celestial`; a base de 2024 enviada a chama de `Convocar Celestial`. A magia de 7º círculo chamada `Invocar Celestial` nessa base continua distinta.

Consulte `ADAPTACOES_2024.md` e `docs/supplement-compatibility.json` para a auditoria de precedência. Estas são adaptações editoriais de compatibilidade, não uma atualização oficial integral dos suplementos.

## Novas opções da ficha

- **Subir de nível** avança em uma classe existente ou adiciona uma nova, com validação de atributos. O avanço conserva os usos e espaços gastos e mantém o dano sofrido em relação aos PV máximos.
- **Classes** permite redistribuir níveis e definir subclasses/ordens, preservando a classe inicial. Perícias e ferramentas concedidas por correções nessa tela devem ser conferidas em Habilidades.
- Em **Magias**, selecione um dos cartões de classe para preparar por essa classe. Ao conjurar, escolha a fonte e uma reserva de espaços. Espaços combinados superiores não liberam preparação de círculos superiores.
- Em **Magias → Adicionar magia**, escolha a lista da classe a consultar. Para incluir uma magia, a classe do personagem precisa concedê-la no nível e limite corretos; para fontes especiais, registre o nome do item, talento ou habilidade que efetivamente concede o acesso. O registro especial documenta a concessão, mas cargas e condições próprias do item ainda devem seguir sua descrição e ser acompanhadas pelo jogador.
- Os contadores mostram truques e magias conhecidos e, nas classes que preparam, o total preparado e o limite; nas classes de magias conhecidas, mostram o limite de conhecidas sem criar um limite de preparação inexistente.
- Em **Equipamentos**, use **Adicionar arma → Arma personalizada** e **Criar item**. Clique no nome de um item para editar descrição, sintonização ou cargas. A seção **Tesouro** também contém o conversor entre PC, PP, PE, PO e PL.
- Na guia **Economias**, escolha ganho ou gasto, descreva a movimentação, informe a quantidade e a moeda e clique em **Registrar movimentação**. Ganhos entram no Tesouro; gastos são descontados. O histórico fica salvo com o personagem e acompanha a exportação JSON. Para desfazer, use o ícone de lixeira na linha; o sistema reverte o saldo quando possível. A janela **Valor equivalente das moedas** apresenta a equivalência de PC, PP, PE, PO e PL em peças de cobre e ouro.
- Use **Retrato → Importar imagem** para escolher uma imagem. A imagem fica no navegador e acompanha o arquivo de personagem; não é enviada a um servidor de imagens.

A base da multiclasse está em `MULTICLASSE_2024.md`. O formato antigo de fichas continua aceito; personagens locais mantêm sua identidade ao migrar.

## Talentos e Estilos de Luta (PHB 2024)

- A aba **Talentos** exibe o catálogo de talentos do Livro do Jogador 2024 em cartões, com categoria, resumo, requisitos e janela de descrição completa. A busca e os filtros por categoria funcionam também dentro da janela de escolha recebida ao subir de nível.
- Ao receber um aumento de atributo ou talento, o jogador pode abrir **Escolher talento** e selecionar somente opções para as quais cumpra nível, atributos, conjuração e treinamentos exigidos. Opções bloqueadas continuam disponíveis para leitura.
- Os dez talentos de **Estilo de Luta** do PHB 2024 estão disponíveis como categoria própria: Arquearia, Combate com Armas de Arremesso, Combate com Armas Grandes, Combate com Duas Armas, Combate Desarmado, Defensivo, Duelismo, Interceptação, Luta às Cegas e Protetivo. A escolha é concedida pelo Guerreiro no nível 1 e pelo Paladino e Guardião no nível 2. Também pode ser selecionada em um aumento de atributo/talento quando o personagem já possui a característica Estilo de Luta.
- A alternativa de conjuração do Paladino (Guerreiro Abençoado) e do Guardião (Guerreiro Druídico) permanece disponível no nível em que recebem Estilo de Luta. Os truques concedidos devem ser registrados na guia Magias.
- Arquearia, Duelismo e Defensivo possuem os modificadores diretos implementados na ficha (ataques à distância, dano com arma corpo a corpo em uma mão e CA usando armadura). Efeitos de reação e demais situações dos outros estilos permanecem descritos no cartão e exigem acompanhamento manual em combate.

## O que exige controle manual

O site automatiza os cálculos e recursos básicos implementados. Efeitos contextuais de subclasses, itens, infusões, talentos, invocações, transformações, companheiros, escolhas de alvos e reações precisam de acompanhamento pelo jogador e pelo Mestre. Os campos de ajustes permitem registrar seus modificadores. Talentos registrados no avanço não aplicam automaticamente todos os benefícios: aumentos específicos do talento devem ser anotados na linha Aumentos posteriores, conforme a descrição. Guardar uma referência ou um item não aplica automaticamente todos os seus poderes.

O índice de livros mantém capítulos históricos, bestiário, tabelas e encontros para consulta; não apresenta todos esses blocos como novas versões oficiais de 2024. Os problemas identificados de tradução, OCR ou trechos ausentes são registrados nas opções. A lista de Artífice cita algumas magias cuja descrição não consta dos documentos anexados; essas descrições não foram inventadas.

## Arquivos e desenvolvimento

- `docs/app.js`: interface e fluxos. A seção **Tesouro** inclui conversão de moedas (PC, PP, PE, PO e PL); a guia **Economias** registra ganhos e gastos e atualiza o saldo do Tesouro.
- `docs/`: cópia estática pronta para publicação pelo GitHub Pages; o `index.html` fica diretamente nesta pasta. A abertura do site leva ao hub **Minhas fichas**; o tema noturno pode ser alternado pelo botão de lua/sol no cabeçalho.
- `docs/core.js`: cálculos, avanço, descansos, equipamentos e sanitização de importação.
- `docs/progression.js` e `docs/class-progression-data.js`: níveis, pré-requisitos, proficiências e progressão de conjuração por classe.
- `docs/portrait.js`: validação dos arquivos e dimensões do retrato.
- `docs/dice3d.js` e `docs/dice-geometry.js`: animação e geometria dos dados.
- `docs/roll-outcome.js`: resultado com ou sem dificuldade.
- `docs/data.js`, `docs/compatibility.js` e `docs/expansion-data.js`: base e opções adicionais.
- `docs/spells.json`, `docs/supplement-catalog.json` e `docs/supplement-pages.json`: descrições e referências.
- `data/`: dados editáveis e base canônica usada para resolver repetições.
- `scripts/build_expansions.py`: reconstrói os catálogos a partir de `data/` com Python 3, sem dependências externas.
- `scripts/index_supplements.py`: reindexação dos PDFs originais; requer PyMuPDF e os arquivos de origem. Os PDFs não acompanham o ZIP.
- `tests/`: testes com Node.js. Execute `npm test`.

No ambiente de edição Sites, a prévia usa `sites-preview start /workspace/sites/arcana-dnd`. A raiz publicada é `docs/`.

## Persistência e fontes

Personagens ficam no armazenamento local do navegador; não há sincronização entre dispositivos. Exporte JSON para cópias de segurança e transferência. A versão hospedada mantém o acesso privado do proprietário.

Conteúdo de referência e ilustrações foram extraídos ou resumidos dos arquivos fornecidos pelo usuário para uso pessoal. Dungeons & Dragons, livros e arte pertencem aos respectivos titulares. Ferramenta independente. Os PDFs originais e credenciais de hospedagem não acompanham o código.

## Hub e tema

Ao abrir o site, o jogador chega ao hub **Minhas fichas**, onde pode abrir um personagem salvo, criar um novo ou importar um JSON. Dentro da ficha, use **Minhas fichas** no menu lateral para voltar ao hub. O botão com lua/sol alterna entre tema claro e noturno; a escolha fica salva neste navegador.

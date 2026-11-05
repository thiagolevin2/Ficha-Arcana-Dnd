# Arcana — fichas e dados para D&D 2024

Site completo em português, com criação de personagens, ficha interativa, dados 3D e referências dos PDFs fornecidos. Funciona sem dependências de compilação.

## Abrir no computador

1. Extraia todo o ZIP.
2. Com Python 3 instalado, abra `INICIAR_WINDOWS.bat` no Windows. Em outros sistemas, execute na pasta do projeto:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory dist
```

3. Abra `http://localhost:8000` no navegador. Mantenha o terminal aberto enquanto usa o site.

Use um servidor HTTP: abrir `dist/index.html` diretamente por duplo clique impede o carregamento dos módulos e catálogos em alguns navegadores. Qualquer hospedagem estática pode publicar o conteúdo de `dist/`. Para GitHub Pages, a pasta `docs/` já contém uma cópia pronta do site; em **Settings → Pages**, selecione **Deploy from a branch**, a branch principal e a pasta **/docs**. Ao alterar o aplicativo, atualize também a cópia em `docs/` a partir de `dist/` antes de publicar.

## Atualização de equipamentos e ficha

- Inventário separado em mochila e equipamento de combate, com armas, armaduras e escudos visíveis.
- Criação e edição de armaduras personalizadas com CA base, limite de Destreza, categoria, Força mínima, peso, furtividade, bônus mágico de CA e descrição de efeitos.
- Criação e edição de escudos personalizados com bônus de CA, peso e efeitos.
- Armas personalizadas podem usar qualquer arma do catálogo como base e configurar dano como dado, dado + valor fixo, dado + dado, dado + atributo ou dado + valor fixo + dado.
- Alinhamento opcional na criação e guia própria em Minha ficha, com os nove alinhamentos.
- A barra “O destino está nos dados” pode ser escondida e restaurada pelo botão flutuante; a preferência fica salva no navegador.
- Cópia de `dist/` sincronizada com `docs/` para GitHub Pages.

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

Consulte `ADAPTACOES_2024.md` e `dist/supplement-compatibility.json` para a auditoria de precedência. Estas são adaptações editoriais de compatibilidade, não uma atualização oficial integral dos suplementos.

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

- `dist/app.js`: interface e fluxos. A seção **Tesouro** inclui conversão de moedas (PC, PP, PE, PO e PL); a guia **Economias** registra ganhos e gastos e atualiza o saldo do Tesouro.
- `docs/`: cópia estática pronta para publicação pelo GitHub Pages; o `index.html` fica diretamente nesta pasta. A abertura do site leva ao hub **Minhas fichas**; o tema noturno pode ser alternado pelo botão de lua/sol no cabeçalho.
- `dist/core.js`: cálculos, avanço, descansos, equipamentos e sanitização de importação.
- `dist/progression.js` e `dist/class-progression-data.js`: níveis, pré-requisitos, proficiências e progressão de conjuração por classe.
- `dist/portrait.js`: validação dos arquivos e dimensões do retrato.
- `dist/dice3d.js` e `dist/dice-geometry.js`: animação e geometria dos dados.
- `dist/roll-outcome.js`: resultado com ou sem dificuldade.
- `dist/data.js`, `dist/compatibility.js` e `dist/expansion-data.js`: base e opções adicionais.
- `dist/spells.json`, `dist/supplement-catalog.json` e `dist/supplement-pages.json`: descrições e referências.
- `data/`: dados editáveis e base canônica usada para resolver repetições.
- `scripts/build_expansions.py`: reconstrói os catálogos a partir de `data/` com Python 3, sem dependências externas.
- `scripts/index_supplements.py`: reindexação dos PDFs originais; requer PyMuPDF e os arquivos de origem. Os PDFs não acompanham o ZIP.
- `tests/`: testes com Node.js. Execute `npm test`.

No ambiente de edição Sites, a prévia usa `sites-preview start /workspace/sites/arcana-dnd`. A raiz publicada é `dist/`.

## Persistência e fontes

Personagens ficam no armazenamento local do navegador; não há sincronização entre dispositivos. Exporte JSON para cópias de segurança e transferência. A versão hospedada mantém o acesso privado do proprietário.

Conteúdo de referência e ilustrações foram extraídos ou resumidos dos arquivos fornecidos pelo usuário para uso pessoal. Dungeons & Dragons, livros e arte pertencem aos respectivos titulares. Ferramenta independente. Os PDFs originais e credenciais de hospedagem não acompanham o código.

## Hub e tema

Ao abrir o site, o jogador chega ao hub **Minhas fichas**, onde pode abrir um personagem salvo, criar um novo ou importar um JSON. Dentro da ficha, use **Minhas fichas** no menu lateral para voltar ao hub. O botão com lua/sol alterna entre tema claro e noturno; a escolha fica salva neste navegador.

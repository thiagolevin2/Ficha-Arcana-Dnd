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

## Funcionalidades

- 12 classes e 48 subclasses do livro de 2024, mais Artífice e 40 subclasses adicionais: 13 classes e 88 subclasses no total.
- 10 espécies do livro de 2024, mais 100 espécies, variantes ou linhagens adicionais, com busca na criação. São opções de fontes diferentes, incluindo compilações e materiais experimentais identificados.
- 16 antecedentes de 2024; atributos pela origem, conjunto padrão, compra de pontos ou 4d6 descartando o menor.
- Uma ou várias classes, até o nível total 20; níveis e subclasses separados, pré-requisitos de multiclasse, proficiências da classe inicial, PV e dados de vida por classe.
- Botão **Subir de nível**, com prévia de PV e proficiência, escolha de classe/subclasse, PV fixos ou rolados, aumentos de atributo e registro de talentos ou escolhas pendentes.
- Preparação e atributo de conjuração por classe; espaços combinados de Conjuração e reserva separada de Pacto. Descanso curto restaura apenas a reserva de Pacto entre os espaços.
- Itens próprios com descrição, raridade, valor, sintonização, cargas e recuperação configurável; itens que concedem magias podem ter suas magias autorizadas configuradas manualmente. Armas próprias com dados/tipo de dano, propriedades, peso, atributo, proficiência e bônus.
- Retrato do personagem por PNG/JPG/WebP, até 12 MB; reduzido para até 900 pixels no maior lado e salvo na ficha e no JSON. Enquadramento vertical ajustável.
- Proficiência, perícias, CA, iniciativa, deslocamento, ataques, dano, CD e recursos calculados.
- Rolagens livres **sem CD** por padrão, comparação opcional com CD/CA, fórmulas, modificadores e vantagem/desvantagem no d20.
- Dados d4, d6, d8, d10, d12, d20 e d100 em animação 3D de queda, quiques e giro. A face de resultado termina voltada para cima; a câmera aproxima a visão superior e o número recebe contraste. A animação usa o resultado já sorteado, sem sortear novamente.
- Crítico de ataque em 20 natural e erro em 1 natural; testes comuns com CD usam o total. Sem CD, um teste comum não declara sucesso ou falha automaticamente.
- Animação pode ser pulada ou desativada; a preferência de movimento reduzido é respeitada.
- 424 descrições de magias: 391 da base e 33 adicionais não repetidas. A guia Magias abre primeiro o grimório do personagem; a janela de adição pesquisa apenas magias compatíveis com classe, nível e limites de progressão, ou concedidas por itens configurados. A criação de conjuradores pré-seleciona sugestões iniciais de truques e magias, editáveis durante a criação.
- Catálogo de talentos, invocações, manobras, itens, infusões, opções de classe e dons dos suplementos. Descrições, fonte, página, notas de adaptação e textos históricos separados.
- Itens podem ser adicionados à mochila; referências e talentos podem ser guardados na ficha. Recursos de subclasses legadas são mostrados conforme o nível.
- 509 páginas de 10 documentos únicos pesquisáveis; 490 têm texto extraível. Uma cópia idêntica de Subclasses Revisadas foi ignorada. Wildemount e Ravenloft incluem somente os trechos enviados.
- Guia separada **Economias**, com registro de ganhos e gastos, descrição, valor, moeda, data, saldo atual, totais acumulados e opção de desfazer movimentações; os lançamentos atualizam o Tesouro automaticamente.
- Hub inicial **Minhas fichas** para escolher, criar, importar e exportar personagens antes de abrir uma ficha; tema claro/noturno com preferência salva neste navegador e cores de texto ajustadas para contraste no tema escuro. A barra inferior de dados pode ser escondida e reexibida.
- Múltiplos personagens, anotações, mochila, moedas, peso, PV, concentração, exaustão, descansos, exportação/importação JSON e impressão em ficha própria.

## Prioridade de regras

O livro de 2024 fornecido prevalece sobre reimpressões e conflitos. Versões antigas correspondentes ficam desativadas para concessão duplicada. Aumentos raciais antigos não são aplicados: os aumentos vêm do antecedente. Recursos de subclasses antigas de nível 1 ou 2 são recebidos no nível 3. Unearthed Arcana permanece experimental.

As correspondências consideram o efeito, além do nome: por exemplo, a tradução de Tasha chama a magia de 5º círculo de `Invocar Celestial`; a base de 2024 enviada a chama de `Convocar Celestial`. A magia de 7º círculo chamada `Invocar Celestial` nessa base continua distinta.

Consulte `ADAPTACOES_2024.md` e `dist/supplement-compatibility.json` para a auditoria de precedência. Estas são adaptações editoriais de compatibilidade, não uma atualização oficial integral dos suplementos.

## Novas opções da ficha

- **Subir de nível** avança em uma classe existente ou adiciona uma nova, com validação de atributos. O avanço conserva os usos e espaços gastos e mantém o dano sofrido em relação aos PV máximos.
- **Classes** permite redistribuir níveis e definir subclasses/ordens, preservando a classe inicial. Perícias e ferramentas concedidas por correções nessa tela devem ser conferidas em Habilidades.
- Em **Magias**, o painel principal mostra somente as magias que já pertencem à ficha. Use **Adicionar nova magia** para pesquisar opções permitidas por classe, nível e limite de progressão. Magias concedidas por um item precisam ser explicitamente marcadas no item em **Equipamentos → Configurar magias**; o item deve ter quantidade maior que zero. Ao conjurar, escolha a fonte e a reserva de espaços. Espaços combinados superiores não liberam preparação de círculos superiores.
- Em **Equipamentos**, use **Adicionar arma → Arma personalizada** e **Criar item**. Clique no nome de um item para editar descrição, sintonização ou cargas. A seção **Tesouro** também contém o conversor entre PC, PP, PE, PO e PL.
- Na guia **Economias**, escolha ganho ou gasto, descreva a movimentação, informe a quantidade e a moeda e clique em **Registrar movimentação**. Ganhos entram no Tesouro; gastos são descontados. O histórico fica salvo com o personagem e acompanha a exportação JSON. Para desfazer, use o ícone de lixeira na linha; o sistema reverte o saldo quando possível. A janela **Câmbio entre moedas** recalcula em tempo real a equivalência do valor digitado nas cinco moedas (PC, PP, PE, PO e PL).
- Durante a criação de conjuradores, a etapa **Preparação** preenche sugestões iniciais de truques e magias conforme classe, nível e progressão; o jogador pode substituir as escolhas. Para magias concedidas por item, em **Equipamentos** use **Configurar magias** no item e marque somente as magias concedidas pela descrição ou aprovadas pelo Mestre.
- Use **Retrato → Importar imagem** para escolher uma imagem. A imagem fica no navegador e acompanha o arquivo de personagem; não é enviada a um servidor de imagens.

A base da multiclasse está em `MULTICLASSE_2024.md`. O formato antigo de fichas continua aceito; personagens locais mantêm sua identidade ao migrar.

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

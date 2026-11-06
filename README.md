# Ficha Arcana 0.10 Beta — organização original para GitHub

Pacote da versão **0.10 Beta**, com a mesma organização de pastas solicitada na imagem e no chat “Criar site DND moderno”. O código de funcionamento é idêntico ao da 0.10 já entregue; esta revisão altera somente organização, instruções e caminhos dos testes/geradores.

## Pastas e arquivos

| Na raiz | Conteúdo |
| --- | --- |
| `data/` | Dados-fonte; alterações e pendências em `data/historico/` |
| `dist/` | `index.html` que redireciona para o site em `docs/` |
| `docs/` | Site completo: HTML, CSS, JavaScript, JSON e `assets/` |
| `scripts/` | Geradores dos catálogos e da cópia completa de `dist/` |
| `tests/` | 27 arquivos de testes, apontando diretamente para `docs/` |
| `ADAPTACOES_2024.md` | Decisões de prioridade e adaptação das regras |
| `INICIAR_WINDOWS.bat` | Iniciador local, usando `docs/` |
| `MULTICLASSE_2024.md` | Regras e decisões de multiclasse |
| `package.json` | Configuração para executar os testes com Node.js |
| `README.md` | Estas instruções |
| `VERSAO.txt` | Identificação da versão |

São **99 arquivos**, sem uma pasta adicional envolvendo o projeto. Não foram incluídos a captura de tela sem uso no site, PDFs originais, cópias duplicadas da distribuição, logs temporários ou os scripts antigos de extração dependentes dos PDFs. Os catálogos, fontes, imagens do site, dados de geração, testes e histórico de alterações foram preservados.

## Enviar para o GitHub

1. Extraia o ZIP inteiro.
2. Envie **o conteúdo extraído** para a raiz do repositório, mantendo as cinco pastas. Não envie apenas o ZIP nem coloque o projeto inteiro dentro de outra pasta.
3. Confirme o commit.
4. Em **Settings → Pages**, escolha **Deploy from a branch**, sua branch principal (normalmente `main`) e **/docs**.
5. Acompanhe a publicação em **Actions** ou na própria página **Pages**. Use **Visit site** quando a publicação terminar.

Ao atualizar, substitua os arquivos anteriores da versão publicada. Se o navegador ainda mostrar a versão antiga depois da publicação, use **Ctrl+F5**.

## Abrir no computador e no VS Code

No Windows com Python 3 instalado, execute `INICIAR_WINDOWS.bat` e mantenha a janela aberta. Ou, no terminal da pasta extraída:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory docs
```

Abra **http://localhost:8000**. No VS Code, use **Arquivo → Abrir Pasta** e selecione a pasta extraída. Edite o site em `docs/`; não abra o HTML por duplo clique, pois os módulos e catálogos precisam de HTTP.

## Testes e geradores

Com Node.js 20 ou superior, sem instalar dependências:

```sh
npm test
```

**204 testes aprovados** neste pacote reorganizado, incluindo os cenários antigos e os novos da 0.10. Os testes usam os arquivos de `docs/`, sem exigir uma cópia completa em `dist/`.

Para reconstruir uma distribuição local completa, caso precise:

```sh
python3 scripts/gerar_dist.py
```

No Windows, pode usar `py -3 scripts/gerar_dist.py`. Esse comando substitui `dist/` por uma cópia de `docs/` e aumenta o número de arquivos; não é necessário executá-lo para publicar ou usar o site. O ZIP mantém somente o redirecionamento para evitar duplicação.

O comando `python3 scripts/build_expansions.py` reconstrói os catálogos a partir de `data/`, gravando em `docs/`. Não é necessário para usar a versão pronta.

## O que a 0.10 contém

- Correção da fórmula de magia personalizada no ataque, dano, crítico, repetição e macros; tipo de dano configurável e correção do seletor `#095-spell-mode`.
- Mestre da Batalha com nomes e progressão de 2024, Estudioso da Guerra, manobras, Conheça Seu Inimigo e Implacável.
- Bordas luminosas e texto destacado nos pré-requisitos dos talentos, para conferência do jogador.
- Compra de atributos sem o custo fictício inicial e com atualização imediata do orçamento.
- Funcionalidades anteriores preservadas, incluindo dados 3D, macros, companheiros, transformações, inventário, importação/exportação e retrato.

Descanso curto, curas e infusões foram mantidos a pedido do usuário. Turnos, rodadas, alvos, áreas, duração e efeitos situacionais continuam com jogador/Mestre. O brilho de um requisito não significa que ele foi integralmente validado pelo sistema.

Relatório: [ALTERACOES_0.10.md](data/historico/ALTERACOES_0.10.md). Pendências e contornos: [PENDENCIAS_0.10.md](data/historico/PENDENCIAS_0.10.md). As decisões anteriores também permanecem em `data/historico/`.

## Personagens e fontes

Exporte um backup JSON antes de atualizar. Os personagens ficam no navegador; manter o mesmo domínio e porta preserva a origem do salvamento. Para outro endereço ou dispositivo, importe o backup. Esta reorganização não altera o formato das fichas.

Ferramenta independente, baseada nos arquivos fornecidos pelo usuário. Dungeons & Dragons, livros e ilustrações pertencem aos respectivos titulares. Os PDFs e as fichas fictícias de teste não fazem parte deste pacote.

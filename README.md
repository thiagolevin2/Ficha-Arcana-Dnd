# Ficha Arcana 0.12 Beta — base 0.11

Revisão dos talentos aplicada diretamente ao arquivo **Ficha_Arcana_0.11_Melhorias (2).zip**. Este pacote substitui a primeira entrega da 0.12.

São **50 arquivos**: os 47 da base de publicação, com dois módulos novos de talentos e um relatório. Todos os arquivos de funcionamento da 0.11 foram preservados. O código-fonte executável completo está em `docs/`.

## O que foi preservado

Painéis separados de poderes, linhagens, talentos e subclasses; controles de poderes de espécie; filtro de espécies por arquétipo; recomendações de atributos; transformações em aba própria; movimento detalhado na janela Deslocamento; voo descritivo; cartões de magias no combate. Dados 3D, macros, equipamentos, companheiros, retratos, salvamento e importação/exportação continuam no projeto.

## Talentos

A planilha revisada contém 83 decisões: 66 talentos receberam ajustes e 17 foram mantidos como solicitado. Há escolhas por aquisição, benefícios fixos na ficha, fontes próprias de magia, recursos e rolagens. Duração, áreas, turnos, alvos e efeitos situacionais continuam com jogador/Mestre.

Leia [ALTERACOES_0.12.md](ALTERACOES_0.12.md) para a tabela por talento, correções, testes e limitações. Descanso curto, curas e infusões anteriores não receberam uma revisão geral.

## Atualizar o GitHub

Extraia o ZIP e envie seu conteúdo para a raiz do repositório: `docs/`, `README.md`, `VERSAO.txt` e `ALTERACOES_0.12.md`. Não envie apenas o ZIP nem crie uma pasta adicional envolvendo o site. Mantenha a publicação que já usa `/docs`. Pastas antigas de desenvolvimento não são necessárias ao funcionamento da publicação atual.

Antes de substituir os arquivos, **exporte um backup JSON das fichas**. Depois da atualização, use Ctrl+F5 se o navegador ainda carregar arquivos antigos.

## Personagens anteriores

O salvamento continua local ao navegador e ao endereço do site. As escolhas ausentes de um talento antigo aparecem como pendência em Habilidades. Ao configurá-las, marque **Já somei esse aumento manualmente na ficha** se o aumento realmente já estiver lançado. Confira compensações manuais de PV, CA e deslocamento para evitar somá-las aos benefícios agora calculados.

## Abrir no computador

No terminal da pasta extraída, com Python 3:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory docs
```

No Windows pode usar `py -3` no lugar de `python3`. Abra `http://localhost:8000`. No VS Code, abra a pasta extraída e edite `docs/`. Módulos e catálogos precisam de HTTP; abrir o HTML por duplo clique não é o modo de execução.

## Testes

**263 testes aprovados, zero falhas.** Os testes são entregues no ZIP separado `Ficha_Arcana_0.12_Testes.zip`, para manter a publicação enxuta. Extraia esse complemento na mesma pasta e execute `npm test` com Node.js 20 ou superior, sem instalar dependências. Consulte `LEIAME_TESTES.md` incluído nele.

Ferramenta independente baseada nos arquivos fornecidos. Regras de 2024 têm prioridade; fontes anteriores continuam identificadas. Livros e ilustrações pertencem aos respectivos titulares.

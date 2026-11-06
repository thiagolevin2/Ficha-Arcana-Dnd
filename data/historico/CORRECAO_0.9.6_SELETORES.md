# Correção pontual: seleção de campos de magia (0.9.6)

## Sintoma
Ao conjurar, o navegador apresentava `Failed to execute 'querySelector' on 'Document': '#095-spell-mode' is not a valid selector`.

## Causa
IDs de formulários criados em versões numeradas (095, 096, 093) começam por dígitos. Na função auxiliar `$`, o site usava `document.querySelector('#095-...')`, que não é um seletor CSS válido sem escape. O simulador de DOM utilizado nos testes antigos aceitava erroneamente esses seletores.

## Correção
A função `$` de `docs/app.js` agora usa `document.getElementById` para seletores simples de ID, inclusive quando o ID começa por dígitos. Outros seletores continuam utilizando `querySelector`. Não foram alterados os identificadores dos campos ou os dados das fichas.

Foi incluído `tests/app-ui-selector-browser.test.js`, com um DOM simulado que reproduz a rejeição desses seletores como no navegador real. Cobre o fluxo de conjuração, uso de habilidade e criação de companheiro.

## Publicação
Substitua o arquivo `docs/app.js` no GitHub pela versão corrigida. Caso prefira, envie todo o pacote preservando a estrutura original do repositório, com GitHub Pages configurado para `main` e `/docs`. Faça backup das fichas em JSON antes de qualquer alteração grande.

## Escopo
Correção de seletores e teste de regressão. Não altera regras de D&D, cálculos ou estrutura de dados.

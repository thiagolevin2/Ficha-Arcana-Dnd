# Ficha Arcana 0.13 Beta

Revisão de subclasses aplicada diretamente à **versão corrigida 0.12**, com as melhorias dos talentos preservadas.

O Livro do Jogador de 2024 prevalece em conflitos. Deslocamento, voo, alcance, posições, alvos e duração ficam descritos; bônus numéricos pertinentes usam os campos existentes.

O catálogo tem 88 subclasses com características individuais. A revisão acrescenta escolhas, recursos, magias concedidas, rolagens, armas e fichas vinculadas onde indicado em [ALTERACOES_0.13.md](ALTERACOES_0.13.md). As demais características continuam disponíveis na descrição e nos ajustes manuais. Não há automação completa de todas as características.

## Publicar no GitHub

Extraia o ZIP e envie seu conteúdo à raiz do mesmo repositório: `docs/`, `README.md`, `VERSAO.txt` e `ALTERACOES_0.13.md`. Mantenha a publicação atual em `/docs`. Não envie somente o ZIP e não crie outra pasta envolvendo o site.

São **52 arquivos**, apenas dois a mais que a 0.12. Todo o código e os recursos necessários à publicação estão em `docs/`. O site não precisa de compilação nem dependências instaladas.

## Usar as melhorias

- **Minha ficha → Classes:** escolha a subclasse.
- **Habilidades → Escolhas da subclasse:** complete as seleções disponíveis e use os recursos.
- **Magias:** as magias concedidas mostram a própria origem e permitem escolher o custo ao conjurar.
- **Companheiros:** vincule os modelos disponíveis; o dano sofrido é preservado na progressão.

As fichas continuam no navegador e mantêm o formato anterior de exportação/importação. Configurações manuais anteriores são preservadas; confira ajustes gerais se já tiver somado manualmente um benefício agora calculado.

## Testes

**315 testes aprovados, zero falhas.** O complemento opcional `Ficha_Arcana_0.13_Testes.zip` contém testes, dados e instruções. Extraia-o junto ao pacote de publicação e execute `npm test` com Node.js 20 ou superior. Não é necessário instalar pacotes.

# Ficha Arcana 0.9.1 Beta — implementação ampliada

Esta versão é construída sobre a **0.9 Beta** (que por sua vez usa o código da 0.8) e aplica correções executáveis; não é apenas um relatório de propostas. Os arquivos em `dist/` e `docs/` contêm o mesmo aplicativo, permitindo uso local ou publicação estática.

## Novas implementações da 0.9.1

1. **Arcano Místico do Bruxo:** seleção de uma magia de Bruxo de círculo 6, 7, 8 ou 9 nos níveis 11, 13, 15 e 17 respectivamente; não são espaços de Pacto. Conjuração com atributo Carisma, consumo de uma utilização separada por círculo e recuperação no descanso longo. A seleção e o consumo persistem na ficha exportada.
2. **Opções especiais por classe:** escolha e remoção de invocações místicas, Metamagias e manobras dentro dos limites da progressão. O sistema usa o catálogo PHB 2024 e evita ultrapassar o número de opções concedidas. **Pré-requisitos individuais e efeitos contextuais** das invocações e manobras ainda precisam ser conferidos manualmente.
3. **Metamagia:** quando o Feiticeiro registra opções com custo fixo explícito no catálogo, a conjuração oferece seletor de Metamagia e desconta Pontos de Feitiçaria após validar saldo. Efeitos sobre alvos/duração devem ser conferidos manualmente; opções de custo variável não são cobradas automaticamente.
4. **Mestre de Batalha:** adicionados contador de Dados de Superioridade, dado aplicável conforme nível e recuperação no descanso curto. Manobras selecionáveis em Habilidades; resultados situacionais não são aplicados em alvos automaticamente.
5. **Estilos mágicos de Paladino e Guardião:** Guerreiro Abençoado e Guerreiro Druídico liberam dois truques e acesso às listas de Clérigo/Druida para os truques respectivos, com limite de nível. O explorador de magias agora também lista as opções de Segredos Mágicos de Bardo ao nível adequado.
6. **Astúcia Mágica do Bruxo:** o uso agora recupera até metade dos espaços de Pacto, arredondando para cima, em vez de apenas gastar um contador.
7. **Espécies:** CA natural 17 do Tortle sem armadura e controle manual de entrada/saída da carapaça (+4 CA e deslocamento zero; demais restrições exigem conferência); proficiências automáticas de Tabaxi e Tortle; capacidade de carga ampliada para Centauro; deslocamentos especiais estruturados (p.ex. escalada) apresentados na ficha.
8. **Inventário:** armaduras e escudos personalizados guardados são incluídos na carga total. Limites de sintonização: três itens normalmente, quatro/cinco/seis para Artífices nos níveis 10/14/18. Salvar um item com sintonização acima do limite é bloqueado, e a contagem é exibida no inventário.
9. **Backup completo:** na tela inicial, exportação de todas as fichas em um arquivo JSON; importação aceita tanto uma ficha isolada quanto um backup com várias fichas, sem importação parcial de backups inválidos.
10. **Painel de pendências:** agora aponta Arcanos Místicos ainda não escolhidos, limites de invocações, Metamagia e manobras, além das vantagens específicas automatizadas.

**As correções da 0.9 permanecem:** combate, Fúria, Monge, Ladino, morte/estabilização, preparo e limites de magias, talentos de treinamento, escola de Esfera Flamejante, propriedades das armas, impressão, recuperação de fichas e segurança em nomes personalizados. Ver `ALTERACOES_0.9.md`.

## Testes

- `npm test`: **97 testes**, incluindo simulação sem navegador de abertura do site, navegação para Habilidades/Magias/Inventário e abertura do seletor de Arcano Místico. A simulação detectou e permitiu corrigir um erro de variável no painel antes da entrega.
- Validação de sintaxe dos módulos JavaScript e formato dos JSONs na construção.
- **Limite:** não houve homologação visual, teste em celulares físicos ou validação completa de todas as combinações de opções de subclasses, itens e suplementos. Animações 3D foram preservadas, mas não retestadas visualmente nesta edição.

## Uso

No Windows, execute `INICIAR_WINDOWS.bat` dentro da pasta `0.9.1/`. O servidor usará `http://localhost:8000` e requer Python 3. Em macOS/Linux use `python3 -m http.server 8000 --bind 127.0.0.1 --directory dist`. Não abra `index.html` diretamente via `file://`, pois algumas referências precisam do servidor local.

Faça backup da versão anterior antes de atualizar. Para publicação no GitHub Pages, publique `docs/`.

## O que ainda não está integralmente automático

- Aplicação individual das **88 subclasses** e de todas as espécies/linhagens, especialmente poderes ativos e escolhas próprias de materiais legados/UA.
- Concessões automáticas de magia por espécie, antecedentes, domínios, juramentos, itens e invocações; usos gratuitos e componentes por fonte.
- Efeitos, itens vinculados e limites das infusões de Artífice; formas animais, familiares, companheiros, criaturas invocadas e economia de ações/turnos.
- Pacotes iniciais completos de equipamento, gastos com serviços e todos os efeitos de magias com alvos/durações.
- Revisão editorial linha a linha dos textos extraídos dos PDFs e regras experimentais.

A ausência dessas automações não impede a consulta dos registros. O painel de Habilidades diferencia efeitos implementados, pendências e controles manuais; a ferramenta **não deve ser interpretada como um árbitro completo** das regras de D&D.

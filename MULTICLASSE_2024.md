# Multiclasse e evolução no Arcana

Base: Livro do Jogador 2024 fornecido, páginas impressas 41–45 e os trechos “Como um Personagem Multiclasse” de cada classe. A pesquisa estruturada com páginas, tabelas e exemplos está em `data/multiclass-rules.json`.

## Aplicação

| Regra | Comportamento |
| --- | --- |
| Nível | Soma dos níveis de classe; máximo 20. |
| Pré-requisito | Atributos primários 13 nas classes atuais e na nova classe; Guerreiro exige FOR ou DES, Monge/Guardião DES e SAB, Paladino FOR e CAR. |
| Proficiência | Bônus pelo nível total. Salvaguardas iniciais somente da primeira classe; recursos que concedem outras proficiências continuam válidos. |
| Equipamento inicial | Entrar em outra classe não concede outro equipamento inicial. |
| PV | Somente o primeiro nível total maximiza o dado de vida. Outros níveis usam valor fixo ou o resultado rolado registrado; Constituição é recalculada retroativamente. |
| Dados de vida | Agrupados por tamanho do dado, com usos separados no descanso curto. |
| Habilidades | Usam o nível na classe que as concede. |
| Ataque Extra | Considera o maior benefício implementado, sem somar benefícios de várias classes. |
| CA | Usa uma única fórmula base; a ficha escolhe a maior disponível ou usa a seleção feita em Editar. |
| Canalizar Divindade | Clérigo e Paladino mantêm usos separados, conforme suas descrições de 2024. |
| Preparação | Limite, círculos disponíveis e atributo separados por classe. |
| Conjuração | Níveis integrais dos conjuradores plenos, metade para cima de Paladino/Guardião e Artífice legado, e terços para baixo de Cavaleiro Místico/Trapaceiro Arcano quando combinados com outra classe com Conjuração. Com somente uma classe com Conjuração, usa-se sua tabela. |
| Pacto | Reserva separada, baseada somente no nível de Bruxo, recuperada em descanso curto ou longo. As reservas podem pagar magias preparadas de outras classes. |
| Truques | Potência pelo nível total, salvo exceção expressa na descrição. |
| Talentos e aumentos | Oportunidades pelo nível da classe; pré-requisitos de talento conforme a descrição. A escolha pode ficar pendente, com lembrete. |

Para Paladino e Guardião ambos ímpares, a implementação calcula `ceil(Paladino / 2) + ceil(Guardião / 2)`. A direção do arredondamento está explícita no texto de 2024; a ordem da operação com ambas as classes ímpares é uma interpretação registrada na pesquisa e coberta pelos testes.

## Artífice e suplementos

Artífice usa a classe de Tasha fornecida, com Inteligência 13 para multiclasse, dados d8, preparação por Inteligência + metade do nível para baixo e contribuição de espaços por metade para cima. O Artífice não recebe automaticamente uma característica Dádiva Épica ausente da fonte. As subclasses legadas mantêm notas de adaptação e seus recursos são exibidos pelos níveis da classe correspondente.

## Escolhas acompanhadas pelo jogador

Grimório, trocas de magias permitidas a cada descanso/avanço, magias extras de subclasses, talentos com vários pré-requisitos, invocações, ataques de arma de pacto e efeitos situacionais devem ser conferidos na descrição. Registrar um talento ou uma referência não aplica todos os seus efeitos. A ficha fornece campos de ajustes, proficiências de arma e atributo de ataque para esses casos.

Armas e itens personalizados são definições do jogador/Mestre. Não são validados como novos itens oficiais. Cargas seguem a recuperação configurada; poderes descritos no texto permanecem sob controle da mesa.

## Persistência

Fichas antigas são migradas para os campos atuais preservando os IDs locais. O JSON inclui classes, magias vinculadas a classes, dados de vida usados, PV rolados, equipamentos próprios e retrato. A importação externa cria uma nova ficha; os demais personagens são preservados.

# Ficha Arcana 0.9.3 Beta — estado de cena, progressão e criaturas

**Data:** 5 de novembro de 2026  
**Base:** Ficha Arcana 0.9.2 Beta  
**Testes:** 131 testes automatizados aprovados (`npm test`); inspeção visual completa não homologada.

Esta atualização preserva os dados 3D, o catálogo original, a criação de fichas, a arquitetura estática e todas as implementações anteriores. As novas funcionalidades foram integradas à interface, aos cálculos e ao JSON exportado/importado.

## 1. Subclasses — todas as 88 identificadas, automação parcial

- Catálogo unificado com **88 subclasses** selecionáveis e vinculadas à classe e ao nível da classe (inclusive multiclasse).
- **40 subclasses adicionais** reutilizam as descrições e os níveis estruturados presentes no acervo de suplementos do site. As descrições são vinculadas ao personagem conforme a progressão; materiais UA continuam identificados como experimentais.
- **48 subclasses do livro-base** recebem indicadores de marcos de progressão; a base ainda não possui um cadastro completo das características individuais dessas subclasses e os marcos são marcados como **consulta à referência**, não como poderes aplicados.
- Em Habilidades, o personagem pode registrar uma escolha por característica; configurar um **recurso de usos limitados**, recarga curta/longa/manual e bônus passivos de **CA, iniciativa e deslocamento**. Esses bônus somente entram nos cálculos quando explicitamente ativados pelo jogador. Recursos não desbloqueados pelo nível não podem ser utilizados.
- Contadores são preservados em backups, respeitam descansos configurados e não aplicam efeitos após uma troca de subclasse ou perda do nível requerido.
- Efeitos já existentes do motor (ex.: crítico de Campeão e PV de Feitiçaria Dracônica) permanecem operacionais. Curandeiros de Domínio da Vida recebem também um complemento de cura baseado no círculo nas fórmulas de cura conhecidas pelo motor, com limitações documentadas abaixo.

**Importante:** NÃO é correto dizer que 88 subclasses estão 100% automatizadas. A 0.9.3 oferece acompanhamento e configuração individual para todas, mas a aplicação automática universal das centenas de poderes exige regras estruturadas adicionais e testes por habilidade.

## 2. Magias, concentração, condições e alvos

- Conjurações com duração registrável entram em um **painel de cena**; minutos e horas são convertidos para rodadas (10 rodadas/minuto; 600 rodadas/hora).
- Conjurar outra magia de concentração encerra a concentração anterior e os efeitos dependentes dela. Encerrar a concentração, entrar em Fúria e certas condições também limpam os efeitos vinculados.
- Botão **Avançar rodada** diminui as durações e encerra efeitos expirados; descanso curto/longo também consome o tempo correspondente. Não há relógio de combate automático nem turnos individuais de inimigos.
- Criar alvos com nome, CA e PV; associar efeitos às criaturas e registrar condições. O painel permite indicar quando um alvo passou na salvaguarda e não recebeu o efeito.
- Efeitos de **Escudo**, **Escudo da Fé**, **Passos Largos** e parte de **Velocidade** ajustam os números quando aplicados ao próprio personagem. **Invisibilidade**, **Paralisar Pessoa**, **Teia**, **Enredar** e algumas outras magias possuem condições pré-configuradas, mas o jogador deve verificar alvos, CD, área, momento da salvaguarda e gatilhos de encerramento.
- Condições temporárias no próprio personagem participam da verificação de ações e deslocamento. Concentração e condições ficam persistidas no JSON.

**Limites:** a ficha não é um tabuleiro, não rola salvaguardas de adversários, não gerencia automaticamente todas as 424 magias, conjurações em área, geometria, componentes consumidos, monstros ou turnos de outras criaturas. Algumas durações, efeitos com múltiplos alvos e exceções devem ser verificados na fonte.

## 3. Forma Selvagem e criaturas vinculadas

- Criação de fichas de **familiares, feras, dracos, construtos e criaturas invocadas**, com CA, PV, ataque, deslocamento, fonte e condições; dano/cura e exclusão controláveis pela interface.
- O Druida a partir do nível 2 pode ativar uma forma cadastrada, consumindo um uso da Forma Selvagem. A concessão de PV temporários depende do nível de Druida; a Forma Selvagem do **Círculo da Lua** concede 3 vezes o nível de Druida, conforme a regra de 2024.
- O personagem mantém separadamente suas estatísticas e a ficha da forma alternativa. O jogador deve conferir CR/ND permitido, sentidos, ataques específicos, duração, traços e outras restrições no livro.

## 4. Itens mágicos e infusões

- Cada item pode receber um **poder ativável configurado**: nome, custo de cargas, duração em rodadas, condição provocada, bônus de CA e deslocamento, alvo e observações.
- O motor valida quantidade, equipamento, sintonização e cargas. Ao ativar, desconta as cargas e, quando apropriado, cria o efeito de cena correspondente. O descanso recupera as cargas conforme a política já configurada no item na versão 0.9.2.
- Reações de **Arma Radiante** e **Escudo de Repulsão** foram adicionadas às infusões vinculadas, com um uso por descanso curto/longo e efeitos assistidos sobre alvos. A Arma Radiante marca uma salvaguarda de Constituição pendente e eventual cegueira; o Escudo registra a repulsão de até 4,5 m sem movimentar automaticamente miniaturas.
- Os efeitos de outras infusões (como Servo Homúnculo, Afiador Mental, Armadura de Propulsão Arcana e replicação de itens) permanecem parciais: criaturas podem ser cadastradas como companheiros, e poderes específicos dependem de configuração manual.

## 5. Espécies, linhagens e talentos

- **Revelação Celestial** do Aasimar: escolha ao usar, um uso por descanso longo e duração de 1 minuto.
- **Ancestralidade Gigante** do Golias: usos pela proficiência, variante correspondente e recuperação em descanso longo. O efeito particular da ancestralidade continua contextual.
- **Voo Dracônico** do Draconato: um uso por descanso longo, 10 minutos de duração registrada. O painel não substitui todos os movimentos ou valida condições de voo.
- Registro explícito das escolhas/observações de cada traço da espécie e cada talento adicional, preservando a procedência; **não** são convertidas em bônus numéricos sem uma regra reconhecida ou configuração de recurso.
- Benefícios anteriores de Elfos, Tiferinos, Orcs, Golias, Draconatos e outros continuam funcionando.

## 6. Persistência, compatibilidade e limites

- Campos adicionais: `sceneTargets`, `sceneEffects`, `companions`, `activeForm`, `featureChoices`, `featureSettings`, `traitNotes`, `speciesPowerUsed`, `speciesPowerChoice`, `infusionPowerUsed` e `items[].power`.
- Importação antiga continua compatível: os campos ausentes são criados com valores seguros, e arrays, numéricos e textos novos são limitados ao importar.
- `dist/` e `docs/` são equivalentes. Arquivos de teste ficam em `tests/`. Não se utiliza backend nem banco remoto.
- **Ainda incompleto:** cobertura individual de todos os poderes de 88 subclasses, aplicação integral das regras de 110 espécies/linhagens e todos os talentos de suplementos, todos os itens/infusões complexos, magias com múltiplas fontes independentes e todos os detalhes de ação/reação/combate.
- A UI foi exercitada por simulação de cliques e persistência sem navegador gráfico. A tentativa de captura headless não concluiu neste ambiente. Testes não equivalem a homologação visual e acessibilidade.

## Execução

1. **Exporte um backup JSON das fichas na versão anterior** antes de mudar o site.
2. No Windows, extraia a pasta `0.9.3`, execute `INICIAR_WINDOWS.bat` (Python 3 instalado) e acesse `http://localhost:8000`.
3. Para servir/publicar estaticamente, utilize o conteúdo de `dist/`; para GitHub Pages, use `docs/`.
4. Para repetir os testes, instale Node.js 20+ e execute `npm test` na pasta `0.9.3`.
5. Caso use um domínio/porta diferente, exporte e importe o JSON: `localStorage` é isolado por origem. Não apague versões antigas sem confirmar seus backups.

**Observação sobre direitos e suplementos:** os textos e escolhas de regras provenientes de livros e material experimental fornecidos para este projeto foram mantidos em seus arquivos. Confira sempre a fonte do suplemento e a compatibilidade com o PHB 2024 antes de jogar.

# Ficha Arcana — alterações da versão 0.9.5 Beta

Data: 5 de novembro de 2026  
Base: Ficha Arcana 0.9.4 Beta  
Foco: **menos automação de cena, mais agilidade na ficha.**

## O que mudou

### Magias: usar e rolar

- A janela de conjuração permite selecionar a fonte e a forma de gasto (espaço, pacto, ritual, Arcano Místico ou concessão especial, quando aplicável).
- O jogador escolhe entre: cálculo disponível no acervo, apenas registrar o uso, acerto mágico com dados de dano configuráveis, dano com CD, cura ou teste de atributo.
- Para poderes e infusões, há uma seleção explícita de **valor fixo** ou **fórmula com dados**.
- A rolagem é feita no próprio site, com os modificadores da fonte de conjuração, e continua no histórico.
- Magias não criam mais efeitos de cena, contadores de rodadas ou alvos automaticamente ao serem usadas. Alcance, área, duração, alvo, salvaguardas externas e consequências ficam com o jogador/Mestre.
- O texto de referência da magia ainda informa duração e demais componentes; **não há cronômetro ativo**.
- Para magias que o motor não conhece, escolha a rolagem manual apropriada. O acervo não é um mecanismo semântico confiável para todas as 424 magias.

### Companheiros — página própria

- Nova entrada **Companheiros** na navegação principal.
- Criar, editar, remover e controlar PV de familiares, feras, dracos, construtos, invocações e aliados de jornada.
- Campos para origem, tipo, CA, PV, deslocamento, ataque, bônus de acerto, fórmula de dano e notas.
- Botões de rolagem de acerto e dano do companheiro.
- Sugestões de origem baseadas em subclasses que concedem companheiros (Senhor das Feras, Guardião do Draco, Ferreiro de Batalha) e na magia Invocar Familiar, quando conhecida.
- Os modelos **não inventam estatísticas**, escalonamento ou vínculo com alvos; o jogador informa os números conforme fonte ou Mestre.
- Companheiros de versões anteriores continuam sendo carregados.

### Habilidades e Transformações

- **Habilidades** concentra traços de espécies, linhagens/heranças, talentos de origem e selecionados, e características desbloqueadas de subclasses.
- Um poder pode ser configurado como ativação sem rolagem, dano, cura ou teste; dados e valor fixo são aceitos. É possível cadastrar limite de usos, tipo de recuperação, consumo de recurso existente e anotação.
- O sistema valida a disponibilidade do poder, checa os recursos e desconta o custo na confirmação da ativação.
- Nova subaba **Transformações** na área Habilidades, visível **somente quando há habilidade reconhecida**, como Forma Selvagem ou uma transformação de espécie/subclasse reconhecida no acervo.
- Para Forma Selvagem são mantidos consumo de recurso, ficha da forma e efeitos que o motor já conhece. Outros bônus situacionais ficam documentados ou configuráveis.
- Para compatibilidade com D&D 2024, prevalecem os benefícios já estruturados para 2024 no site; as descrições experimentais/suplementares não substituem silenciosamente os cálculos de 2024.
- A base contém 88 subclasses indexadas; **isso não significa que cada característica tenha um algoritmo automático**. Habilidades não estruturadas usam controle assistido.

### Inventário, itens mágicos e infusões

- Itens mágicos ficam na **Mochila e itens**. Cada item pode ter o botão **Ver efeitos**.
- O poder configurado do item permite ativação sem rolagem, dano ou cura com fórmula de dados ou valor fixo. Checa se o item está equipado e sintonizado quando necessário; consome cargas configuradas.
- A subaba **Criar infusões** aparece somente para personagem que possui níveis suficientes de Artífice. Mantém o catálogo de infusões e os vínculos com equipamento.
- Infusões ativas também podem receber dano, cura ou teste personalizado, com quantidade de usos, descanso e recursos especificados, rolados no próprio inventário.
- Reações de Arma Radiante e Escudo de Repulsão contabilizam uso, mas deixaram de criar automaticamente condições e efeitos de duração.

### Compatibilidade, dados e teste

- Campos novos são salvos em JSON na ficha. Arquivos anteriores conservam companheiros, itens, recursos e dados próprios.
- Efeitos criados por versões antigas continuam acessíveis em **Habilidades → Efeitos salvos anteriormente**, para encerramento manual, evitando bônus invisíveis.
- Combate → Macros permanece disponível, inclusive com a confirmação separada de gasto de recursos.
- `dist/` e `docs/` são sincronizadas para execução e publicação estática.

## O que *não* foi automatizado de propósito

**Sem controle de iniciativa/turnos/rodadas, duração de magias, áreas de efeito, alvos atingidos, condições impostas, resistências dos inimigos ou salvaguardas automáticas dos NPCs.** A ficha registra gastos e realiza as rolagens configuradas; o jogador e o Mestre resolvem os efeitos na mesa.

Os dados de algumas subclasses, espécies, transformações e infusões de suplementos são incompletos ou apresentam regras incompatíveis entre edições. Não foi criada uma regra numérica fictícia para preencher essa ausência. O jogador deve conferir a descrição de 2024 ou a adaptação escolhida e registrar o efeito no campo correspondente.

## Status de testes

Suite Node com regressões de versões anteriores e testes novos de conjuração, navegação por classe, gerenciamento de companheiros, itens, infusões, rolagens e persistência. **158 testes automatizados aprovados, zero falhas**. Testes simulados não substituem uma auditoria visual/cross-browser.

## Como executar

1. Extraia a pasta `0.9.5`.
2. No Windows, execute `INICIAR_WINDOWS.bat` com Python 3 instalado.
3. Abra `http://localhost:8000`.
4. Faça **backup JSON** das suas fichas antes de atualizar o aplicativo.

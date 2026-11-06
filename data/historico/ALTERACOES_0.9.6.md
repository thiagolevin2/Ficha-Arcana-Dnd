# Ficha Arcana — alterações da versão 0.9.6 Beta

**Base:** Ficha Arcana 0.9.5 Beta. Atualização das características de espécies, escolhas de criação, concessões raciais de magias e correções do catálogo. As regras de 2024 prevalecem nas espécies do Livro do Jogador; nos suplementos, as adaptações são identificadas.

## O que passou a funcionar

### Espécies do Livro do Jogador 2024

- **Aasimar:** Revelação Celestial apenas como poder ativável em Habilidades (um uso/descanso longo), com seleção do aspecto e controle de ativação/encerramento pelo jogador. O dano adicional de valor igual ao bônus de proficiência pode ser autorizado no próximo ataque, inclusive em macros. Mãos Curativas conserva o contador de cura existente, sem segunda cobrança.
- **Gnomo das Rochas:** caixas para Astúcia Gnômica, Reparar, Prestidigitação Arcana e Engenhosidade; truques aparecem em Magias e as salvaguardas de Astúcia têm botão para rolar com vantagem. Construção e duração dos dispositivos continuam manuais.
- **Elfo:** seleção de perícia de Sentidos Aguçados e, para Alto Elfo, truque de Mago na criação ou edição. A perícia entra na proficiência e o truque escolhido é concedido pela linhagem. Magias de outras linhagens permanecem por nível.
- **Tiferino:** caixas mostram herança, resistência a dano e magias. Taumaturgia foi incluída nas concessões, além das magias escalonadas das três heranças. Rolagens e gastos ficam em Magias; a resistência a ataques de inimigos é anotada, não calculada pelo site.
- **Draconato:** Voo Dracônico é apenas uma caixa descritiva, sem controlador de duração. O botão do Sopro que já existia em Combate foi preservado.
- **Humano:** perícia adicional e talento de Origem adicional precisam ser escolhidos na criação. As três opções de Iniciado em Magia são apresentadas com sua lista (Clérigo, Druida, Mago); ambos os benefícios entram no cálculo. A escolha de perícias/truques adicionais pelo próprio talento ainda segue o fluxo de Talentos.
- **Anão:** caixas de resistência a veneno e Conhecimento de Pedras, com contador de usos por proficiência. A vantagem nas salvaguardas situacionais tem botão de d20; bônus de PV existentes foram preservados.
- **Pequenino:** caixas de Bravura, Furtividade Natural, Agilidade e Sortudo, com rolagem de salvaguarda com vantagem quando a habilidade permitir. Situações especiais são decididas pela mesa.

### Opções de suplementos e variantes

- **Dhampiro:** escolha entre preservar traços elegíveis da espécie anterior ou receber duas perícias. As duas perícias são calculadas e persistem no JSON. Mordida com ataque baseado em Constituição, dano rolável e contador separado para Fortalecimento. A escolha do benefício depois do acerto fica com o jogador.
- **Forjado Bélico:** adaptação de Proteção Integrada com **+1 de CA** calculado, sem usar uma fórmula racial antiga de armadura incompatível. Demais resistências e condições especiais em caixas.
- **Híbrido Simic:** seleção de aprimoramento inicial e do nível 5; Carapaça adiciona +1 de CA exceto com armadura pesada; escalada/natação respeitam as adaptações escolhidas; Cuspe Ácido e Apêndices de Agarrar recebem rolagens. A ficha não resolve salvaguardas ou agarrar inimigos.
- **Transmorfo:** transformação ativável, um uso por descanso curto ou longo, PV temporários ao ativar, +1 CA condicional para Couro de Besta, +1,5 m condicional para Passos Rápidos e mordida rolável para Dentes Longos. A transformação é encerrada manualmente. Outras variantes têm seus efeitos descritos.
- **Genasi:** caixas de resistências e magias elementais. Concessões verificadas no catálogo: Levitação (Ar), Passo Sem Rastro (Terra), Criar Chamas e Mãos Flamejantes (Fogo), Criar ou Destruir Água (Água). Usos gratuitos e Constituição para a conjuração racial legada. **Moldar Água não existe no catálogo** e, portanto, permanece manual.
- **Tortle:** CA natural, Defesa de Carapaça e dados das garras em caixas; restrições situacionais são manuais.
- **Tabaxi:** corrigido o texto do deslocamento de escalada de 6 m, com Agilidade Felina explicada e garras roláveis.
- **Centauro:** ataque de cascos e Investida em caixas; capacidade de carga já calculada.
- **Aarakocra:** voo da variante legada não aparece enquanto armadura média/pesada estiver equipada. Garras roláveis.
- **Tritão:** Névoa Obscurecente e Lufada de Vento concedidas com **um único uso compartilhado por descanso longo**, respeitando a fonte antiga. Barreira de Água não está no catálogo; mantenha controle manual.
- **Draconato de Gemas:** escolha entre Ametista, Cristal, Esmeralda, Safira e Topázio, com descrição de resistência correspondente; Sopro rolável, Voo de Gemas descrito.
- **Tiferinos antigos Fogo Infernal/Língua do Diabo:** removido o voo cadastrado indevidamente nas duas variantes, sem interferir no Tiferino 2024.

### Integração e preservação

- Escolhas da espécie aparecem na criação e na edição; habilidades de uso, rolagens e benefícios passivos aparecem em caixas na área Habilidades.
- Os novos campos são preservados na importação/exportação de fichas. O site continua armazenando tudo localmente no navegador.
- Não há avanço automático de rodadas, controle universal de duração, seleção de alvos, aplicação de efeitos de área ou salvaguardas de inimigos; **isso permanece responsabilidade de jogador/Mestre**.
- Os menus Companheiros, Transformações (quando cabível), Inventário/Infusões e Macros da 0.9.5 continuam presentes.

## Cobertura, testes e limites

O catálogo mantém opções de suplementos de datas, traduções e estágios diferentes, incluindo material de teste. Não se presume que toda opção tenha um equivalente oficial de 2024. O site mostra esses traços para consulta e oferece botões somente quando o custo/rolagem pode ser identificado com segurança. Características situacionais podem ser configuradas manualmente por Habilidades.

O motor de 2024 não pretende automatizar resultados de inimigos, ações, duração ou escolhas narrativas. A incompatibilidade de alguns textos com a regra da campanha deve ser resolvida com o Mestre.

**Testes:** suíte antiga mantida e ampliada com testes de escolhas raciais, progressão, recursos, descanso, catálogo, dados persistidos, concede de magias e interface simulada. Consulte `tests/species096.test.js` e `tests/app-ui096.test.js`. Testes de código não substituem a inspeção visual em navegador real.

**Para atualizar:** exporte previamente o backup JSON da versão 0.9.5, extraia o ZIP 0.9.6 e execute `INICIAR_WINDOWS.bat` com Python 3 instalado. Em hospedagem estática, publique os arquivos da pasta `dist/` ou `docs/`.

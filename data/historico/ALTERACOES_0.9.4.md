# Ficha Arcana 0.9.4 Beta — macros de combate e controle manual de duração

**Base:** Ficha Arcana 0.9.3 Beta (não é uma reconstrução do zero).  
**Verificação:** 145 testes automatizados aprovados, incluindo simulação de criação/edição/rolagem de macro na interface sem navegador gráfico.  
**Limitação:** o Chromium do ambiente de desenvolvimento bloqueou a abertura de páginas locais (`ERR_BLOCKED_BY_ADMINISTRATOR`); a aparência, cliques reais e acessibilidade visual ainda precisam ser conferidos pelo usuário.

## 1. Aba Macros em Ficha > Combate

- Nova subaba **Macros** ao lado de Armas e ataques, Magias de dano e Estilos de Luta.
- Criar, editar, duplicar, excluir e salvar **até 30 macros por personagem**, com **até 12 componentes de dano** em cada uma.
- Ataque principal: **arma do inventário**, **ataque desarmado** ou **magia de dano conhecida/preparada** que tenha fórmula reconhecida pelo motor.
- Componentes: **Ataque Furtivo**, **Marca do Predador**, **Golpes Radiantes**, **magia com dano**, **recurso/habilidade configurável com usos**, **poder de item mágico com fórmula de dano**, **dano adicional personalizado**.
- Calcula novamente ao usar: atributo, proficiência, bônus de arma, efeitos de infusões, estilos de luta, modificadores, dados de dano, nível e limites dos recursos. Não salva os números antigos na macro.
- Rolagem de d20 quando a origem exige ataque, ou apenas dano quando a magia exige salvaguarda/acerto automático. Mantém modos normal/vantagem/desvantagem, análise de crítico, dados 3D e defesas por tipo de dano do fluxo original.
- O total do dano é apresentado em **uma rolagem composta por componentes**, mas não simula que magias com ataques ou salvaguardas diferentes passam a ser um único acerto nas regras. Tais somas só são permitidas mediante autorização explícita no editor e recebem aviso.
- Ataque Furtivo só entra quando a arma é elegível e o jogador sinaliza o requisito situacional; o limite por turno é manual. Marca do Predador só entra quando a marca está sinalizada como ativa. Golpes Radiantes exige Paladino de nível apropriado. **Destruição Divina** só entra como dano de acerto corpo a corpo, nunca como ataque independente.
- O motor reconhece que faltam espaços, pontos ou cargas; componentes indisponíveis são destacados e não somados. **Nenhum recurso é gasto na prévia ou apenas por rolar ataque/dano.** No resultado há botão **Confirmar gasto**, que valida novamente a disponibilidade e debita tudo de forma transacional, sem gastos parciais. A confirmação é por ataque e não equivale a verificar a economia de ações da mesa.
- Macros são mantidas no JSON exportado/importado com o campo `combatMacros`; arquivos antigos são compatíveis. IDs referenciam armas e itens atuais — apagar a arma deixa a macro sinalizada para revisão, sem trocar silenciosamente por outra.

## 2. Poderes de itens mágicos

- Em Equipamentos > Poderes de itens, um item pode receber **fórmula de dano** e **tipo do dano** além de cargas, ativação, condições e bônus já existentes.
- Esse dano pode ser escolhido como componente de macro; exige quantidade positiva, item equipado, sintonização quando exigida e cargas suficientes.
- Confirmar o gasto de uma macro debita as cargas configuradas. Efeitos adicionais do mesmo poder (CA, deslocamento, condições) precisam ser ativados pelo controle do item ou acompanhados pelo jogador; macros não presumem que foram aplicados.

## 3. Duração, turnos e rodadas: agora sob responsabilidade da mesa

- Botão **Avançar rodada** removido da interface.
- Descanso curto ou longo **não** reduz automaticamente a duração de efeitos registrados.
- Um efeito pode continuar na ficha mesmo que, pelo livro, sua duração tenha terminado. **O jogador deve encerrá-lo manualmente** em Habilidades > Cena e efeitos. Concentração ainda tem controle próprio e pode ser encerrada ou substituída.
- Durações cadastradas na versão 0.9.3 continuam preservadas como informação histórica; não há cronômetro, fila de iniciativa ou contagem automática nesta versão.
- O sistema continua a administrar recuperações de recursos por descanso, pois essas não são o mesmo que um relógio de combate.

## 4. Correções e testes adicionais

- Validação mais estrita de fórmulas personalizadas (dados e limites) para impedir dados absurdos e entradas inválidas.
- Importações de macros e poderes de item normalizadas e limitadas, sem executar dados salvos como código.
- Custos combinados de espaços, recursos de classe, usos especiais e cargas de itens revalidados **antes** de débito. Gastos impossíveis bloqueiam a transação inteira.
- Habilidades com usos de subclasse só podem ser incluídas quando a característica permanece desbloqueada na classe e nível atuais.
- Golpe extra com magia independente não é autorizado silenciosamente; magias de múltiplos projéteis/raios e com salvaguardas próprias continuam sinalizadas para decisão manual.
- O crítico do ataque desarmado reconhece os limiares do Guerreiro Campeão; as condições impeditivas de efeitos de cena também bloqueiam a execução de macros.
- 145 testes passaram; a suíte inclui cálculo dinâmico, importação, casos inválidos, gastos atômicos, item mágico, macro de magia, habilidade, crítico e simulação de interface. Não é certificação de cada combinação possível.

## 5. Limitações conhecidas / próximos passos

1. As **88 subclasses** constam do catálogo, mas a maioria das centenas de características não possui descrição estruturada + cálculo automático completo; recursos podem ser configurados manualmente.
2. O motor de dano cobre **magias explicitamente mapeadas**. Magias complexas de área, invocação, transformações, efeitos em turnos posteriores, ataques múltiplos e circunstâncias específicas ainda não produzem resultados completos por um botão único.
3. Ações, ações bônus, reações, concentração por interrupções externas, alcance, linha de visão, resistência de inimigos e salvaguardas de alvos exigem decisão da mesa.
4. Companheiros e Forma Selvagem recebem fichas vinculadas editáveis, mas não geram estatísticas completas automaticamente a partir de todos os bestiários/suplementos.
5. Infusões e itens com poderes narrativos complexos exigem cadastro de efeito e confirmação manual.
6. Espécies, linhagens e talentos de suplementos possuem conteúdo heterogêneo; muitas escolhas estão registradas, sem benefício numérico automático. Regra do Livro do Jogador 2024 vs. suplemento/UA pode exigir escolha da mesa.
7. A interface não passou por homologação visual no navegador real. Pode haver problemas de responsividade/foco que a simulação de DOM não detecta.

## 6. O que vale a pena deixar manual

**Controle pelo jogador/Mestre (evita custo alto e uma falsa precisão):** duração em minutos/rodadas/turnos; ordem de iniciativa e economia de ações; linha de visão/posicionamento e áreas; quantos alvos foram atingidos; salvaguardas, resistências e condições de inimigos; gatilhos narrativos; efeitos de longo prazo; movimentação de companheiros; elegibilidade situacional do Ataque Furtivo e bônus condicionais; decisões sobre regras de suplementos experimentais.

**Deixar automático na ficha:** cálculo de ataques, dano e críticos, atributos/proficiência, maestrias e equipamentos, acesso a magias e espaços disponíveis, pontos/cargas/usos, recuperação em descanso, sintonização, PV e validação/backup de escolhas.

## 7. Execução e atualização

1. Na versão antiga, **exporte um JSON de backup**.
2. Extraia o ZIP; no Windows execute `INICIAR_WINDOWS.bat` da pasta `0.9.4` (requer Python 3).
3. Acesse `http://localhost:8000` para manter a mesma origem/localStorage das versões anteriores. Caso use outra porta/domínio, importe o JSON na nova origem.
4. Para testar, use Node.js 20+ e `npm test` na pasta `0.9.4`.
5. `dist/` é o site que o servidor entrega; `docs/` é a cópia para publicação no GitHub Pages.

**Nota:** Não há banco de dados remoto nem sincronização entre computadores. Sempre exporte uma cópia das fichas importantes.

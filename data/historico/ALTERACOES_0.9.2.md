# Ficha Arcana 0.9.2 Beta — regras, equipamentos e linhagens

Data: 5 de novembro de 2026  
Base: Ficha Arcana 0.9.1 Beta  
Escopo: continuação incremental, sem refazer a interface nem remover o catálogo existente.

## Implementações novas nesta versão

### Artífice e infusões

- Seleção de infusões conhecidas do catálogo de Tasha, com requisitos mínimos de nível, limites de infusões conhecidas e de itens infundidos conforme o nível de Artífice.
- Vinculação de infusões ao identificador estável da arma, armadura, escudo ou item; remoção e substituição pelo painel **Habilidades**. Duas infusões não podem ocupar o mesmo item.
- Rejeição de alvos mágicos e incompatíveis nas opções cujo tipo é reconhecido.
- Bônus calculados para **Arma Aprimorada**, **Arma Radiante**, **Arma Bumerangue**, **Disparo Recorrente**, **Defesa Aprimorada**, **Escudo de Repulsão** e **Foco Arcano Aprimorado** nos casos previstos pelo motor. Aumentos por nível aplicados onde cabíveis.
- Demais infusões podem ser vinculadas e consultadas, mas continuam exigindo que os efeitos situacionais, criação de objeto, carga e comandos sejam aplicados pelo jogador.
- Identificadores das armas são preservados ao editar, evitando que a infusão se desvincule.

### Equipamentos e itens mágicos

- Itens agora podem receber bônus numéricos configuráveis de **CA, iniciativa, salvaguardas, deslocamento, ataque mágico e CD de magia**.
- Os bônus entram nos cálculos apenas quando o item está marcado como equipado; se exigir sintonização, precisa estar sintonizado. A versão não deduz automaticamente os poderes a partir do nome/descrição do item.
- Estado, bônus e identificador do item preservados em exportação/importação JSON; entradas normalizadas e valores numéricos limitados para evitar corrupção.
- Consumível **Poção de Cura** com ação de beber, rolagem de 2d4+2, atualização de PV e desconto de quantidade.

### Magias por fonte especial e linhagens

- Registro de concessões por item, talento, espécie ou habilidade, com atributo de conjuração, acesso por espaços normais, usos gratuitos independentes ou lançamento à vontade.
- Gastos gratuitos registram seu próprio contador; descanso curto/longo recupera somente os usos cuja fonte permite. Essas informações são exportadas/importadas.
- Para **Elfos** e **Tiferinos do livro de 2024**, magias fixas são concedidas automaticamente segundo a linhagem e o nível, com truques à vontade e magias pertinentes com uso próprio por descanso longo. Alterar linhagem atualiza essas concessões sem apagar usos da mesma linhagem.
- As escolhas de magia variáveis e fontes de suplementos sem regra estruturada seguem em modo manual/configurável.

### Combate e espécies

- Seleção de **maestrias de armas conhecidas** conforme classe e nível, sujeita à proficiência e ao limite da classe. A propriedade da arma deixa de representar por si só uma maestria conhecida.
- **Draconato:** uso de Sopro com dano progressivo por nível, tipo de dano por ancestralidade, CD e contador, sem aplicar automaticamente a salvaguarda em alvos externos.
- **Orc:** Adrenalina (PV temporários e indicação de Disparada como ação bônus) e opção de Resistência Implacável ao cair a 0 PV.
- **Golias:** ativação de Forma Grande com ajuste de deslocamento, estado salvo e encerrado no descanso. O tempo decorrido de dez minutos continua sob responsabilidade da mesa.
- Revisão de bloqueios de invocações de Bruxo por nível mínimo e alguns pré-requisitos de Pacto.

### Interface, persistência e compatibilidade

- Painel de Habilidades mostra infusões conhecidas/ativas, seletores de equipamento e maestrias.
- Seção Magias exibe concessões especiais com fonte, usos e opções de alteração quando não se trata de concessão automática.
- Novos dados são normalizados ao abrir fichas antigas e preservados nos backups JSON.
- `dist/` e `docs/` são cópias idênticas para uso local e GitHub Pages.

## Testes executados

- **109 testes automatizados aprovados** (97 antigos + 12 novos testes de regras e uma simulação de ações de interface).
- Cobertura adicional: infusões, limite por nível, ataque/CA, persistência, sintonização, fontes de magia, descansos, maestrias, magias fixas por linhagem, Sopro, habilidades de espécies, pré-requisitos de invocações e navegação simulada sem navegador gráfico.
- Os testes não certificam todas as combinações de personagens nem a aparência no navegador. A inspeção visual de responsividade e acessibilidade não foi concluída nesta entrega.

## Pendências conhecidas — não declarar automáticas

1. **Todas as 88 subclasses:** várias características de subclasse e poderes de nível alto aparecem como texto e/ou contador, sem resolver todos os efeitos de alvo, reação e duração.
2. **Infusões e itens especiais:** efeitos invocados, objetos criados, invocação de criaturas, custos e ativação de poderes dependentes de situações ainda não têm simulador completo. Os bônus editáveis não substituem a conferência da descrição.
3. **Magias complexas:** invocação de criaturas, áreas e alvos múltiplos, concentração por duração/turnos, materiais consumidos, condições no alvo, recargas especiais e interações com reações não são resolvidos universalmente.
4. **Linhagens/espécies de suplementos:** escolhas variáveis e benefícios históricos não foram todos convertidos para efeitos estruturados.
5. **Economia de ações, turno e mãos ocupadas:** a ficha não opera um tabuleiro/combate por turnos completo; o Mestre deve monitorar ações e a restrição de espaços por turno.
6. **Fontes duplicadas da mesma magia:** o modelo atual mantém uma única concessão especial ativa por ID de magia. Caso duas fontes diferentes concedam a mesma magia, escolha qual controlar no registro ou monitore a segunda manualmente.
7. **Regras de suplementos:** verifique a fonte, a versão e a compatibilidade com o Livro do Jogador 2024. Material Unearthed Arcana é experimental.

## Instruções

1. **Antes de atualizar, exporte o JSON de todas as fichas** da versão anterior.
2. Extraia o ZIP, abra a pasta `0.9.2` e execute `INICIAR_WINDOWS.bat` com Python 3 instalado. Depois abra `http://localhost:8000`.
3. Para sites estáticos, publique o conteúdo de `dist/`; para GitHub Pages, use `/docs`.
4. Para testar as regras com Node.js, abra um terminal nesta pasta e execute `npm test`.

As fichas permanecem armazenadas no navegador por origem (`localhost:8000` ou o domínio utilizado), não no ZIP. Faça backup antes de abrir versões diferentes do site.

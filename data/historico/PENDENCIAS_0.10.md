# Pendências e controles manuais — Ficha Arcana 0.10 Beta

Base: auditoria da 0.9.6 e decisões do usuário para a 0.10, em 6 de novembro de 2026. Esta lista distingue uma limitação conhecida de uma correção efetivamente aplicada. Não foram acrescentados relógio de combate, controle automático de rodada, alvos ou duração.

## Tratamento dos achados da auditoria anterior

| ID | Situação na 0.10 | Como administrar |
| --- | --- | --- |
| F01 — descanso com 0 PV/morto | Mantido a pedido do usuário | Confira se o personagem pode descansar; evite usar o descanso para reviver. |
| F02 — curas/recursos sem checar incapacidade uniformemente | Mantido a pedido do usuário | Só acione habilidades próprias quando a criatura puder agir; registre curas externas com a mesa. |
| F03 — fórmula personalizada perdida no dano | **Corrigido** | Ataque, dano, crítico, repetição e macro usam a configuração. Ajuste manualmente a fórmula para outro círculo. |
| F04 — nome do Mestre da Batalha não reconhecido | **Corrigido e ampliado** | Nome 2024, aliases, progressão e ações próprias. Gatilhos, alvos e limite por turno continuam manuais. |
| F05 — pré-requisitos de armadura/escudo de talentos incompletos no validador | Destaque visual implementado; validação completa permanece pendente | Confira o requisito destacado na janela e o treinamento real antes de selecionar. A borda dourada não significa elegibilidade confirmada. |
| F06 — reselecionar Arcano Místico renova o uso | Registrado, sem mudança | Não troque/reselecione o Arcano para recuperar seu uso; mantenha a marcação de gasto até o descanso devido. |
| F07 — subir de nível com 0 PV gera PV/estado divergentes | Registrado, sem mudança | Anote PV/estado antes de avançar; reconcilie-os nos controles da ficha após o avanço, com o Mestre. |
| F08 — reduzir nível conserva aumentos/talentos anteriores | Registrado, sem mudança | Revise Aumentos posteriores, talentos e estilos ao remover níveis. Não presuma que a redução desfaz todas as concessões. |
| F09 — infusão de armadura/escudo acompanha o espaço | Mantido; infusões não revisadas | Ao trocar o objeto, confira o vínculo da infusão e desfaça/refaça manualmente quando necessário. |
| F10 — alvo de infusão pode aceitar arma incompatível | Mantido; infusões não revisadas | Confira propriedades exigidas, como Munição, antes de vincular. |
| F11 — cargas e sintonização de infusões reativas | Mantido; infusões não revisadas | Acompanhe cargas, amanhecer e sintonização pela descrição, sem considerar o contador simplificado uma regra completa. |
| F12 — Clava Grande não recebe o dado de Artes Marciais em situação elegível | Registrado, sem mudança | Configure uma arma/rolagem personalizada com o dado correto, sem aplicar o ajuste às armas que não se qualificam. |
| F13 — talento extra humano não aparece em todos os painéis de ações | Registrado, sem mudança | Consulte o talento na ficha/biblioteca e registre suas escolhas e benefícios nos controles disponíveis. |
| F14 — traços de espécie repetidos em Habilidades | Registrado, sem mudança | Use uma única representação da habilidade; não configure nem gaste o mesmo benefício duas vezes. Não foi demonstrada duplicação automática de bônus apenas pela repetição textual. |
| F15 — Aura de Proteção e condições de efeitos antigos | Registrado, sem mudança | Confira incapacidade e encerre efeitos antigos quando deixarem de valer; ajuste a salvaguarda conforme a mesa. |
| F16 — legendas/blocos de criatura misturados em textos de magia | Revisão editorial pendente | Confira a descrição no livro, especialmente Convocar Celestial, Invocar Elementais Menores e Inseto Gigante. |
| F17 — custo inicial 594/27 e atributos vazios com total 10 | **Corrigido** | Valores ainda não distribuídos aparecem vazios. Compra de pontos tem custo próprio e atualização imediata. |
| F18 — rótulos antigos e textos pequenos | Corrigido parcialmente | Rótulos dos painéis atualizados e áreas novas adaptadas a tela estreita. Não foi redesenhada a tipografia de todas as telas antigas. |

## Outros registros desta versão

- **Seletor de campos numéricos:** corrigido o erro de `querySelector('#095-spell-mode')`; campos históricos com ID iniciado por número agora usam busca por ID. Os campos novos `010-*` seguem o mesmo caminho seguro.
- **Atualização das manobras:** corrigida a falta de atualização do painel ao selecionar/remover uma manobra. Fechar o seletor já permite usar a nova escolha.
- **Lista de magias após adicionar:** no percurso visual, a magia foi salva, mas a página sob a janela não se atualizou imediatamente ao fechar a pesquisa. **Contorno:** clique de novo em Magias. Registrado sem ampliar a mudança, conforme a preferência por tratar casos simples manualmente.
- **Texto sobre gastos na janela geral de dano:** o texto genérico pode sugerir confirmação futura. Na conjuração direta, o espaço/uso já é gasto em Confirmar conjuração; em macro, o botão Confirmar gasto registra os custos. Não execute ambos para representar um único uso.
- **Migração de concessões com JSON incompleto:** ainda existe risco de perder o contador de uma concessão especial se o arquivo omitir a lista auxiliar `knownSpellsByClass.special`. Não foi demonstrado esse defeito numa exportação normal completa da 0.9.6. Mantenha o backup integral.
- **Várias fontes da mesma magia:** o modelo atual não garante reservas independentes para todas as combinações de fontes que concedem o mesmo ID. Acompanhe usos/atributos por fonte quando houver sobreposição.

## Funcionalidades ainda incompletas

- Automação individual de todas as características das 88 subclasses. Esta atualização estrutura especificamente o Mestre da Batalha, preservando configurações anteriores.
- Escolhas internas e aplicação integral de todos os talentos, como magias de Iniciado em Magia e perícias de Habilidoso. Registrar o nome não concede automaticamente todos os efeitos.
- Fórmulas prontas de todas as 424 magias, múltiplos ataques/raios, dano posterior e efeitos especiais. A configuração explícita de rolagem cobre operações simples; alvos e consequências continuam com a mesa.
- Pacotes iniciais A/B completos e seus custos oficiais. “Custo inicial organizado” nesta versão corrige a **compra de atributos**, identificada na auditoria; recomendações de equipamento e moedas continuam como antes e devem ser conferidas no livro.
- Implementação integral dos poderes de cada item mágico, infusão, espécie legada, ferramenta, companheiro e forma alternativa.
- Matriz exaustiva de erratas e revisão editorial de todos os trechos extraídos. A conferência da 0.10 se concentrou nos elementos alterados e nas regras 2024 do Mestre da Batalha.
- Sincronização entre dispositivos e backup remoto: continuam fora da arquitetura atual.

## O que é manual por decisão de funcionamento

Duração, turnos, rodadas, áreas, alcance, linha de visão, escolha de alvo, posicionamento, elegibilidade situacional, reações, economia de ações e consequências narrativas são administrados pelo jogador/Mestre. Macros não tornam legais somas de ações independentes. Implacável exige confirmar sua disponibilidade uma vez por turno; o sistema não decide quando um turno começou.

Os testes da versão comprovam os cenários descritos no relatório, não a ausência das pendências acima.

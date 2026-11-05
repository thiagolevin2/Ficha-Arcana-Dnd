export const STANDARD_ARRAY = Object.freeze([15, 14, 13, 12, 10, 8]);

export function isStandardArray(values) {
  if (!Array.isArray(values) || values.length !== STANDARD_ARRAY.length) return false;
  return [...values].map(Number).sort((a, b) => a - b).join(',') === [...STANDARD_ARRAY].sort((a, b) => a - b).join(',');
}

export function classSpellSources(spell, sources) {
  if (!spell || !Array.isArray(spell.classes) || !Array.isArray(sources)) return [];
  return sources.filter(source => {
    const listName = source.listName || source.name;
    return !!listName && spell.classes.includes(listName) && Number(spell.level) <= Number(source.maxSpellLevel || 0);
  });
}

const DAMAGE_TYPES = [
  'Contundente', 'Cortante', 'Perfurante', 'Ácido', 'Elétrico', 'Gélido',
  'Ígneo', 'Trovejante', 'Venenoso', 'Necrótico', 'Radiante', 'Psíquico', 'Energético'
];

export function extractSpellDamage(spell, characterLevel = 1) {
  if (!spell || typeof spell.text !== 'string') return null;
  const types = DAMAGE_TYPES.join('|');
  const re = new RegExp('(\\d{1,2}d\\d{1,3}(?:\\s*\\+\\s*(?:\\d{1,2}d\\d{1,3}|\\d{1,3}))*)\\s+(?:pontos?\\s+de\\s+)?(?:de\\s+)?dano(?:\\s+(?:do tipo\\s+)?(' + types + '))?', 'i');
  const match = re.exec(spell.text);
  if (!match) return null;
  let formula = match[1].replace(/\s+/g, '');
  const prefix = spell.text.slice(0, match.index + match[0].length);
  const scaling = spell.text.match(/(?:Aprimoramento de Truque|dano(?:\s+(?:desta|dessa|da)\s+magia)?)[\s\S]{0,180}?aumenta em\s+(\d{1,2}d\d{1,3})/i);
  if (Number(spell.level) === 0 && scaling) {
    const additions = [5, 11, 17].filter(level => Number(characterLevel) >= level).length;
    if (additions) {
      const inc = scaling[1].toLowerCase();
      const [count, sides] = inc.split('d').map(Number);
      const added=count * additions;const base=formula.match(/^(\d+)d(\d+)$/i);formula=base&&Number(base[2])===sides?`${Number(base[1])+added}d${sides}`:`${formula}+${added}d${sides}`;
    }
  }
  const saveNames = ['Força', 'Destreza', 'Constituição', 'Inteligência', 'Sabedoria', 'Carisma'];
  const savePattern = new RegExp('(?:salvaguarda|teste de resistência) de (' + saveNames.join('|') + ')', 'i');
  const save = savePattern.exec(spell.text)?.[1] || null;
  const attack = /(?:realize|faça|efetue)\s+(?:um\s+)?ataque mágico|jogada de ataque mágico|ataque mágico (?:corpo a corpo|à distância)|ataques? corpo a corpo com magia/i.test(spell.text);
  const hasAdditional = (spell.text.match(new RegExp('\\d{1,2}d\\d{1,3}\\s+(?:pontos?\\s+de\\s+)?(?:de\\s+)?dano', 'gi')) || []).length > 1;
  return {
    formula,
    type: match[2] || 'Mágico',
    attack,
    save,
    half: /metade (?:desse|do) dano/i.test(spell.text.slice(match.index)),
    per: hasAdditional ? 'A descrição possui outros componentes de dano. Confira-os no texto completo e some-os separadamente.' : ''
  };
}

export function spellHealingSpec(spell, slotLevel, modifier = 0) {
  if (!spell) return null;
  const up = Math.max(0, Number(slotLevel || spell.level) - Number(spell.level));
  const mod = Number(modifier) || 0;
  const specs = {
    'Vigor Arcano': { formula: '1–2 Dados de Vida + mod', type: 'PV', healing: true, hitDice: true, per: 'Gaste 1 ou 2 Dados de Vida não gastos; cada círculo acima do 2º permite gastar mais um dado.' },
    'Curar Ferimentos': { formula: `${2 + up}d8${mod >= 0 ? '+' : ''}${mod}`, type: 'PV', healing: true },
    'Palavra Curativa': { formula: `${2 + up}d4${mod >= 0 ? '+' : ''}${mod}`, type: 'PV', healing: true },
    'Curar Ferimentos em Massa': { formula: `${5 + up}d8${mod >= 0 ? '+' : ''}${mod}`, type: 'PV por alvo', healing: true, per: 'Cada alvo escolhido recupera esse valor; até seis criaturas.' },
    'Palavra Curativa em Massa': { formula: `${2 + up}d4${mod >= 0 ? '+' : ''}${mod}`, type: 'PV por alvo', healing: true, per: 'Cada alvo escolhido recupera esse valor; até seis criaturas.' },
    'Aura de Vitalidade': { formula: '2d6', type: 'PV', healing: true, per: 'A aura também permite repetir a cura no início dos seus turnos enquanto durar.' },
    'Palavra de Poder: Salvar': { formula: '1', type: 'PV', healing: true, full: true, per: 'O alvo recupera todos os PV. O aplicativo aplica apenas ao personagem ativo.' },
    'Oração de Cura': { formula: `${2 + up}d8`, type: 'PV por alvo', healing: true, per: 'Até cinco criaturas recuperam esse valor após a conjuração.' },
    'Cura Completa': { formula: String(70 + 10 * up), type: 'PV', healing: true },
    'Cura Completa em Massa': { formula: '700', type: 'PV divididos', healing: true, per: 'Distribua até 700 PV entre as criaturas escolhidas.' },
    'Regeneração': { formula: '4d8+15', type: 'PV', healing: true, per: 'Além da cura inicial, o alvo recupera 1 PV no início de cada turno enquanto a magia durar.' },
    'Bom Fruto': { formula: '1', type: 'PV por fruto', healing: true, per: 'Cada fruto restaura 1 PV e fornece alimento. Considere um fruto por uso.' },
    'Revivificar': { formula: '1', type: 'PV', healing: true, per: 'A criatura retorna à vida com 1 PV; não é uma cura comum.' },
    'Ressurreição': { formula: 'PV máximos', type: 'PV', healing: true, full: true, per: 'A criatura retorna à vida com todos os PV; não é uma cura comum.' },
    'Reviver os Mortos': { formula: '1', type: 'PV', healing: true, per: 'A criatura retorna à vida com 1 PV; não é uma cura comum.' },
    'Ressurreição Verdadeira': { formula: 'PV máximos', type: 'PV', healing: true, full: true, per: 'A criatura retorna com todos os PV. O aplicativo aplica a recuperação ao personagem ativo.' }
  };
  return specs[spell.name] || null;
}

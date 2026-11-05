import test from 'node:test';
import assert from 'node:assert/strict';
import {STANDARD_ARRAY,isStandardArray,classSpellSources,extractSpellDamage,spellHealingSpec} from '../dist/spell-rules.js';

test('standard array validates the six exact values once each',()=>{
  assert.deepEqual(STANDARD_ARRAY,[15,14,13,12,10,8]);
  assert.equal(isStandardArray([8,10,12,13,14,15]),true);
  assert.equal(isStandardArray([15,15,13,12,10,8]),false);
});

test('spell access only matches the character class list and its spell level',()=>{
  const spell={level:2,classes:['Mago','Clérigo']};
  const sources=[{classId:'mago',name:'Mago',listName:'Mago',maxSpellLevel:3},{classId:'paladino',name:'Paladino',listName:'Paladino',maxSpellLevel:2}];
  assert.deepEqual(classSpellSources(spell,sources).map(x=>x.classId),['mago']);
  assert.equal(classSpellSources({...spell,level:4},sources).length,0);
});

test('damage extraction identifies dice, damage type and saving throw',()=>{
  const spec=extractSpellDamage({level:3,text:'Cada criatura realiza uma salvaguarda de Destreza, sofrendo 8d6 pontos de dano Ígneo se falhar, ou metade desse dano em caso de sucesso.'});
  assert.equal(spec.formula,'8d6');
  assert.equal(spec.type,'Ígneo');
  assert.equal(spec.save,'Destreza');
  assert.equal(spec.half,true);
});

test('healing spell formulas adjust with slot level and casting modifier',()=>{
  assert.equal(spellHealingSpec({name:'Curar Ferimentos',level:1},3,4).formula,'4d8+4');
  assert.equal(spellHealingSpec({name:'Palavra Curativa',level:1},2,2).formula,'3d4+2');
});


test('mass healing spell uses its five-d8 base value',()=>{
  assert.equal(spellHealingSpec({name:'Curar Ferimentos em Massa',level:5},5,3).formula,'5d8+3');
});

test('class spell filtering never grants access to a different class',()=>{
  const spell={level:1,classes:['Mago']};
  const paladin=[{classId:'paladino',name:'Paladino',listName:'Paladino',maxSpellLevel:2}];
  assert.deepEqual(classSpellSources(spell,paladin),[]);
});


test('mass healing spells scale dice with higher spell slots',()=>{
  assert.equal(spellHealingSpec({name:'Curar Ferimentos em Massa',level:5},7,2).formula,'7d8+2');
  assert.equal(spellHealingSpec({name:'Palavra Curativa em Massa',level:3},5,3).formula,'4d4+3');
});

test('Cura Completa gains ten points per slot above sixth',()=>{
  assert.equal(spellHealingSpec({name:'Cura Completa',level:6},8,0).formula,'90');
});


test('damage parser handles Portuguese damage wording and cantrip scaling',()=>{
  const blast=extractSpellDamage({level:5,text:'O alvo sofre 14d6 de dano Necrótico após falhar na salvaguarda de Constituição.'});
  assert.equal(blast.formula,'14d6');
  assert.equal(blast.type,'Necrótico');
  assert.equal(blast.save,'Constituição');
  const cantrip=extractSpellDamage({level:0,text:'O alvo recebe 1d8 de dano Elétrico. O dano dessa magia aumenta em 1d8 quando você alcança o 5º nível (2d8), 11º nível (3d8), e 17º nível (4d8).'},11);
  assert.equal(cantrip.formula,'3d8');
});


test('Vigor Arcano reserves a hit-dice healing mechanic',()=>{
  const spec=spellHealingSpec({name:'Vigor Arcano',level:2},4,3);
  assert.equal(spec.healing,true);
  assert.equal(spec.hitDice,true);
  assert.match(spec.per,/Dados de Vida/);
});

test('True Resurrection is recognized as full healing',()=>{
  const spec=spellHealingSpec({name:'Ressurreição Verdadeira',level:9},9,0);
  assert.equal(spec.full,true);
  assert.equal(spec.healing,true);
});


test('Revivificar appears in the healing workflow as a return with 1 HP',()=>{
  const spec=spellHealingSpec({name:'Revivificar',level:3},3,0);
  assert.equal(spec.healing,true);
  assert.equal(spec.formula,'1');
  assert.match(spec.per,/1 PV/);
});


test('Ressurreição is recognized as a full-healing revival spell',()=>{
  const spec=spellHealingSpec({name:'Ressurreição',level:7},7,0);
  assert.equal(spec.healing,true);
  assert.equal(spec.full,true);
  assert.match(spec.per,/todos os PV/);
});

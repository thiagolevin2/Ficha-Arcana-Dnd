import test from 'node:test';
import assert from 'node:assert/strict';
import {resolveSpellRoll,spellDamagePlan} from '../docs/spell-roll010.js';
import {attributeSetup,displayedAbility} from '../docs/creation010.js';
import {normalizeSpellRoll} from '../docs/rules095.js';
import {featPrerequisiteText} from '../docs/feats.js';
import {newCharacter,normalizeImported,roll} from '../docs/core.js';

test('0.10 magia personalizada: preserva fórmula e tipo até o dano',()=>{
 const plan=resolveSpellRoll({formula:'1d10',type:'Ígneo',attack:true},{mode:'attack',formula:'7d6+9',type:'Radiante'});
 const context={spell:{name:'Raio de Fogo'},spellRollPlan:{...plan}};
 assert.deepEqual(spellDamagePlan(context),{label:'Raio de Fogo',formula:'7d6+9',type:'Radiante'});
 plan.formula='1d4';assert.equal(spellDamagePlan(context).formula,'7d6+9');
});
test('0.10 crítico de magia dobra os dados, sem dobrar o valor fixo',()=>{
 const plan=resolveSpellRoll(null,{mode:'attack',formula:'7d6+9',type:'Necrótico'});
 const result=roll(plan.formula,{critical:true,random:()=>1});assert.equal(result.detail[0].count,14);assert.equal(result.total,23);
 assert.equal(roll('12',{critical:true}).total,12);
});
test('0.10 configuração funciona em magia sem fórmula pronta',()=>{
 assert.equal(resolveSpellRoll(null,{mode:'attack',formula:'2d8+3',type:'Gélido'}).formula,'2d8+3');
 assert.equal(resolveSpellRoll({type:'Ígneo',formula:'1d10'},{mode:'attack',formula:'3d6'}).type,'Ígneo');
 assert.equal(resolveSpellRoll(null,{mode:'attack',formula:'3d6'}).type,'Energético');
});
test('0.10 cura, dano com salvaguarda e uso sem rolar permanecem distintos',()=>{
 assert.equal(resolveSpellRoll({type:'Radiante'},{mode:'healing',formula:'8',type:'Ígneo'}).type,'Cura');
 const save=resolveSpellRoll({save:'Destreza',half:true},{mode:'save',formula:'2d6',type:'Ácido'});assert.equal(save.save,'Destreza');assert.equal(save.half,true);
 assert.equal(resolveSpellRoll({formula:'1d6'},{mode:'none'}),null);assert.equal(resolveSpellRoll(null,{mode:'test'}),null);
});
test('0.10 fórmula inválida não recebe dano genérico silenciosamente',()=>{
 assert.throws(()=>resolveSpellRoll(null,{mode:'attack',formula:'alert(1)'}),/fórmula/);
 assert.throws(()=>spellDamagePlan({spell:{name:'Magia'}}),/confirmada/);
});
test('0.10 configuração de tipo acompanha importação de ficha antiga',()=>{
 const c=newCharacter();c.spellRolls={'306':normalizeSpellRoll({mode:'attack',formula:'7d6+9',type:'Radiante'})};
 const restored=normalizeImported(JSON.parse(JSON.stringify(c)));assert.equal(restored.spellRolls['306'].type,'Radiante');
 assert.deepEqual(normalizeSpellRoll({mode:'test',ability:'wis'}),{mode:'test',ability:'wis',formula:''});
});
test('0.10 atributos não distribuídos não têm custo fictício nem total 10',()=>{
 const c={base:{str:0,dex:0,con:0,int:0,wis:0,cha:0},method:'manual'};
 assert.equal(attributeSetup(c).filled,0);assert.equal(attributeSetup(c).cost,null);assert.deepEqual(displayedAbility(c,'str'),{total:null,modifier:null});
});
test('0.10 compra de pontos exibe orçamento e excesso reais',()=>{
 const c={method:'points',base:{str:15,dex:14,con:13,int:12,wis:10,cha:8}};
 assert.equal(attributeSetup(c).cost,27);assert.equal(attributeSetup(c).remaining,0);c.base.cha=9;
 assert.equal(attributeSetup(c).cost,28);assert.equal(attributeSetup(c).overBudget,true);c.base.str=18;assert.equal(attributeSetup(c).cost,null);
});
test('0.10 conjunto padrão e atributos rolados não usam orçamento de compra',()=>{
 for(const method of ['standard','rolled']){const c={method,base:{str:15,dex:14,con:13,int:12,wis:10,cha:8}};assert.equal(attributeSetup(c).filled,6);assert.equal(attributeSetup(c).cost,null);}
 assert.deepEqual(displayedAbility({base:{str:15},origin:{str:2}},'str'),{total:17,modifier:3});
});
test('0.10 destaque usa o pré-requisito explícito, sem capturar benefícios',()=>{
 const f={originalText:'Talento Geral (Pré-requisito: Nível 4 ou superior, Treina-\nmento com Armadura Média) Aumento no Valor de Atributo. Aumente Força.'};
 assert.equal(featPrerequisiteText(f),'Nível 4 ou superior, Treinamento com Armadura Média');
 assert.equal(featPrerequisiteText({originalText:'Talento de Origem. Você adquire treinamento com ferramentas.'}), '');
});

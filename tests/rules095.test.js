import test from 'node:test';
import assert from 'node:assert/strict';
import {newCharacter,normalizeImported,normalizeItem,resources} from '../docs/core.js';
import {INFUSIONS,learnInfusion,bindInfusion} from '../docs/rules092.js';
import {createCompanion,enterWildShape} from '../docs/rules093.js';
import {normalize095,configureAction,activateAction,recover095,eligibleTransformations,canManageInfusions,editCompanion,companionAttack,companionDamage,rollItemPower,normalizeSpellRoll} from '../docs/rules095.js';

const r=()=>1;
test('0.9.5: abas de transformação são concedidas somente a personagens aptos',()=>{
 const fighter=newCharacter({classId:'guerreiro',level:5});
 assert.deepEqual(eligibleTransformations(fighter),[]);
 assert.equal(eligibleTransformations(newCharacter({classId:'druida',level:1})).length,0);
 assert.ok(eligibleTransformations(newCharacter({classId:'druida',level:2})).some(x=>x.id==='druid'));
 assert.ok(!eligibleTransformations(newCharacter({speciesId:'aasimar',level:3})).some(x=>x.id==='aasimar')); // 0.9.6: ativação em Habilidades, não Transformações
 assert.ok(eligibleTransformations(newCharacter({speciesId:'golias',level:5})).some(x=>x.id==='goliath'));
 assert.ok(!eligibleTransformations(newCharacter({speciesId:'draconato',level:5})).some(x=>x.id==='dragon')); // 0.9.6: somente descrição do voo
});
test('0.9.5: apenas artífice capacitado administra infusões',()=>{
 assert.equal(canManageInfusions(newCharacter({classId:'guerreiro',level:15})),false);
 assert.equal(canManageInfusions(newCharacter({classId:'artifice',level:1})),false);
 assert.equal(canManageInfusions(newCharacter({classId:'artifice',level:5})),true);
});
test('0.9.5: poder de talento com rolagem e custo é consumido uma vez',()=>{
 const c=newCharacter({classId:'guerreiro',level:4});normalize095(c);
 const source='species:'+c.speciesId+':0';
 configureAction(c,source,{mode:'damage',formula:'2d6+3',max:2,recovery:'short',resourceId:'wind',resourceCost:1,note:'Dano em acerto confirmado'});
 const a=activateAction(c,source,{resourceList:resources(c),random:r});
 assert.equal(a.result.total,5);assert.equal(c.abilityActions[source].used,1);assert.equal(c.resourceUsed.wind,1);
 activateAction(c,source,{resourceList:resources(c),random:r});
 assert.throws(()=>activateAction(c,source,{resourceList:resources(c),random:r}),/usos/);
 assert.equal(c.resourceUsed.wind,2);
 recover095(c,{long:false});assert.equal(c.abilityActions[source].used,0);
});
test('0.9.5: custo insuficiente não altera usos, carga ou recurso',()=>{
 const c=newCharacter({classId:'guerreiro',level:1});normalize095(c);const id=`species:${c.speciesId}:0`;
 configureAction(c,id,{mode:'healing',formula:'1d8+2',max:1,resourceCost:3,resourceId:'wind'});
 assert.throws(()=>activateAction(c,id,{resourceList:resources(c),random:r}),/insuficiente/);
 assert.equal(c.abilityActions[id].used,0);assert.equal(c.resourceUsed.wind||0,0);
});
test('0.9.5: poder não concedido não pode ser configurado',()=>{
 const c=newCharacter();assert.throws(()=>configureAction(c,'feature:inventada',{mode:'damage',formula:'3d6'}),/não disponível/);
});
test('0.9.5: infusão ativa pode ter cura configurável e fica persistida',()=>{
 const c=newCharacter({classId:'artifice',level:10});const f=INFUSIONS.find(x=>x.name==='Defesa Aprimorada');
 learnInfusion(c,f.id);bindInfusion(c,f.id,'armor');
 configureAction(c,f.id,{mode:'healing',formula:'10',max:1,recovery:'long'}, {infusion:true});
 assert.equal(activateAction(c,f.id,{infusion:true,resourceList:resources(c),random:r}).result.total,10);
 assert.throws(()=>activateAction(c,f.id,{infusion:true,resourceList:resources(c),random:r}),/usos/);
 const restored=normalizeImported(JSON.parse(JSON.stringify(c)));normalize095(restored);
 assert.equal(restored.infusionActions[f.id].formula,'10');assert.equal(restored.infusionActions[f.id].used,1);
 recover095(restored,{long:true});assert.equal(restored.infusionActions[f.id].used,0);
});
test('0.9.5: infusão vinculada não pode ser usada por outro personagem',()=>{
 const c=newCharacter({classId:'guerreiro',level:10});normalize095(c);
 assert.throws(()=>configureAction(c,INFUSIONS[0].id,{mode:'damage',formula:'1d6'},{infusion:true}),/não está ativa/);
});
test('0.9.5: companheiro editado mantém ataques, PV e dados no JSON',()=>{
 const c=newCharacter();const f=createCompanion(c,{name:'Lobo',kind:'besta',hpMax:12,hp:12});
 editCompanion(c,f.id,{name:'Lobo Cinzento',kind:'besta',source:'Viagem',ac:13,hpMax:17,hp:15,speed:12,attack:'Mordida',attackBonus:5,damageFormula:'1d8+2',notes:'Acompanha a caravana'});
 assert.equal(companionAttack(c,f.id,{random:r}).total,6);
 assert.equal(companionDamage(c,f.id,{random:r}).total,3);
 const saved=normalizeImported(JSON.parse(JSON.stringify(c)));
 assert.equal(saved.companions[0].attackBonus,5);
 assert.equal(saved.companions[0].damageFormula,'1d8+2');
 assert.equal(saved.companions[0].hp,15);
});
test('0.9.5: item mágico com cura fixa consome cargas e não aplica PV ao alvo',()=>{
 const c=newCharacter();c.items.push(normalizeItem({name:'Cajado de cura',qty:1,equipped:true,attunement:true,attuned:true,maxCharges:3,charges:3,power:{name:'Cura',chargeCost:2,effectMode:'healing',effectFormula:'9'}}));
 const item=c.items.at(-1),hp=c.hp;
 const plan=rollItemPower(c,item.id,{random:r});assert.equal(plan.mode,'healing');assert.equal(plan.result.total,9);
 assert.equal(item.charges,1);assert.equal(c.hp,hp);
 assert.throws(()=>rollItemPower(c,item.id,{random:r}),/insuficientes/);
 assert.equal(item.charges,1);
});
test('0.9.5: sintonização impede usar poderes de item',()=>{
 const c=newCharacter();c.items.push(normalizeItem({name:'Item',qty:1,equipped:true,attunement:true,attuned:false,maxCharges:5,charges:5,power:{name:'Bola de fogo',chargeCost:1,effectMode:'damage',effectFormula:'2d6'}}));
 assert.throws(()=>rollItemPower(c,c.items.at(-1).id,{random:r}),/sintonize/);
 assert.equal(c.items.at(-1).charges,5);
});
test('0.9.5: configuração de magia distingue ação sem rolagem e testes',()=>{
 assert.deepEqual(normalizeSpellRoll({mode:'test',ability:'wis',formula:'erro'}),{mode:'test',ability:'wis',formula:''});
 assert.equal(normalizeSpellRoll({mode:'save',formula:'3d6'}).formula,'3d6');
 assert.equal(normalizeSpellRoll({mode:'atacar'}).mode,'auto');
});

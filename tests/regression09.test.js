import test from 'node:test';
import assert from 'node:assert/strict';
import {newCharacter,attackStats,weaponAllowedAtCreation,derive,normalizeImported,finishRest} from '../docs/core.js';
import {training} from '../docs/progression.js';
import {featEligibility} from '../docs/feats.js';
import {WEAPONS} from '../docs/data.js';

const base={str:16,dex:12,con:14,int:10,wis:10,cha:10};

test('Ladino 2024 permite Chicote, mas não Espada Longa no equipamento inicial',()=>{
 const c=newCharacter({classId:'ladino'});
 assert.equal(weaponAllowedAtCreation(c,{key:'chicote',...WEAPONS.chicote}),true);
 assert.equal(weaponAllowedAtCreation(c,{key:'espadalonga',...WEAPONS.espadalonga}),false);
});

test('Monge avançado não transforma armas de distância em d12 de Artes Marciais',()=>{
 const c=newCharacter({classId:'monge',level:17,base});
 assert.ok(attackStats(c,{key:'dardo'}).formula.startsWith('1d4'));
 assert.ok(attackStats(c,{key:'funda'}).formula.startsWith('1d4'));
 assert.ok(attackStats(c,{key:'besta'}).formula.startsWith('1d8'));
});

test('Bárbaro mantém bônus de Fúria ao arremessar com Força',()=>{
 const c=newCharacter({classId:'barbaro',level:6,base,armor:'none'});c.raging=true;
 assert.equal(attackStats(c,{key:'azagaia'}).formula,attackStats(c,{key:'azagaia',thrownAttack:true}).formula);
 assert.equal(attackStats(c,{key:'azagaia',thrownAttack:true}).formula,'1d6+6');
});

test('Talento de armadura leve concede treinamento e benefício de escudo',()=>{
 const c=newCharacter({classId:'mago',feats:['Especialista em Armaduras Leves']});
 assert.deepEqual(training(c),{armor:1,shield:true,martial:false});
 assert.equal(featEligibility({name:'Especialista em Armaduras Leves',summary:'Você ganha treinamento com armadura leve.'},{level:4,armorTraining:0}).eligible,true);
});

test('Desmarcar estilo elimina bônus mesmo se talento legado permaneceu',()=>{
 const c=newCharacter({classId:'guerreiro',armor:'malha',style:'Defensivo',feats:['Defensivo']});
 const withStyle=derive(c).ac;c.style='';c.styles=[];
 assert.equal(derive(c).ac,withStyle-1);
});

test('Importar mantém mais de 200 itens e distribuições de progressão',()=>{
 const c=newCharacter({classId:'guerreiro'});
 c.items=Array.from({length:215},(_,i)=>({id:'item-'+i,name:'Item '+i,qty:1}));
 c.progressionLog=[{level:2,classId:'guerreiro',increases:{str:1,dex:1}}];
 const imported=normalizeImported(c);
 assert.equal(imported.items.length,215);
 assert.deepEqual(imported.progressionLog[0].increases,{str:1,dex:1});
});

test('Cada dado de vida gasto restaura pelo menos 1 PV e descanso não ressuscita',()=>{
 const c=newCharacter({classId:'guerreiro',base:{...base,con:4}});c.hp=1;
 const result=finishRest(c,{diceCounts:{10:1},random:()=>1});
 assert.equal(result.healing,1);
 assert.equal(result.character.hp,2);
 c.lifeState='morto';assert.throws(()=>finishRest(c,{long:true}),/não ressuscita/);
});

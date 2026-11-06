import test from 'node:test';
import assert from 'node:assert/strict';
import {CLASSES} from '../docs/data.js';
import {newCharacter,normalizeImported,derive,resources,finishRest,roll} from '../docs/core.js';
import {classLevel} from '../docs/progression.js';
import {superiorityPool,choiceLimit} from '../docs/rules091.js';
import {battleMasterInfo,configureBattleMaster,useManeuver,useKnowYourEnemy,restoreKnowYourEnemy,ARTISAN_TOOLS} from '../docs/battle-master010.js';
const make=(level=3)=>newCharacter({classId:'guerreiro',subclass:CLASSES.guerreiro.subclasses.find(n=>n==='Mestre da Batalha'),level,armor:'none',skills:[],origin:{},base:{str:14,dex:18,con:14,int:10,wis:12,cha:10}});
const randomRoll=formula=>roll(formula,{random:()=>1});
test('0.10 Mestre da Batalha: nome do seletor reconhece recursos e manobras',()=>{
 const c=make();assert.equal(superiorityPool(c).max,4);assert.equal(choiceLimit(c,'maneuver'),3);assert.ok(resources(c).some(r=>r.id==='superiority'));
});
test('0.10 progressão usa o nível de Guerreiro para dados e escolhas',()=>{
 for(const [level,count,sides,choices] of [[3,4,8,3],[7,5,8,5],[10,5,10,7],[15,6,10,9],[18,6,12,9]]){const c=make(level);assert.deepEqual(superiorityPool(c),{max:count,sides});assert.equal(choiceLimit(c,'maneuver'),choices);}
 const c=make(3);c.classes=[{classId:'guerreiro',level:3,subclass:'Mestre da Batalha'},{classId:'mago',level:10}];assert.equal(battleMasterInfo(c).pool.sides,8);assert.equal(battleMasterInfo(c).limit,3);
});
test('0.10 nomes antigos migram sem perder manobras, usos e ajustes',()=>{
 const c=make(7);c.subclass='Mestre de Batalha';c.advancedChoices.maneuver=['phb2024-maneuver-1'];c.resourceUsed.superiority=2;c.featureChoices={'guerreiro::Mestre de Batalha::3::Marco de subclasse — nível 3':'Anotação'};
 const saved=normalizeImported(JSON.parse(JSON.stringify(c)));assert.equal(saved.subclass,'Mestre da Batalha');assert.equal(saved.resourceUsed.superiority,2);assert.deepEqual(saved.advancedChoices.maneuver,c.advancedChoices.maneuver);assert.equal(saved.featureChoices['guerreiro::Mestre da Batalha::3::Marco de subclasse — nível 3'],'Anotação');
});
test('0.10 Estudioso da Guerra aplica perícia e preserva ferramenta no JSON',()=>{
 const c=make();configureBattleMaster(c,{skill:'História',tool:ARTISAN_TOOLS[0],ability:'dex'});assert.equal(derive(c).skills.História,1);assert.equal(battleMasterInfo(c).dc,14);
 const imported=normalizeImported(JSON.parse(JSON.stringify(c)));assert.equal(imported.battleMaster.tool,ARTISAN_TOOLS[0]);assert.equal(imported.battleMaster.ability,'dex');
 c.subclass='Campeão';assert.equal(derive(c).skills.História,undefined);assert.equal(battleMasterInfo(c),null);
});
test('0.10 manobra conhecida rola dado correto e desconta apenas um uso',()=>{
 const c=make(10);c.advancedChoices.maneuver=['phb2024-maneuver-6'];const result=useManeuver(c,'phb2024-maneuver-6',{roll:randomRoll});assert.equal(result.formula,'1d10');assert.equal(result.result.total,1);assert.equal(c.resourceUsed.superiority,1);
 assert.throws(()=>useManeuver(c,'phb2024-maneuver-20',{roll:randomRoll}),/conhece/);assert.equal(c.resourceUsed.superiority,1);
});
test('0.10 Aparar e Recuperar Energia seguem os modificadores de 2024',()=>{
 const c=make(10);configureBattleMaster(c,{ability:'dex'});c.advancedChoices.maneuver=['phb2024-maneuver-1','phb2024-maneuver-20'];
 assert.equal(useManeuver(c,'phb2024-maneuver-1',{roll:randomRoll}).formula,'1d10+4');
 const result=useManeuver(c,'phb2024-maneuver-20',{roll:randomRoll});assert.equal(result.formula,'1d10+5');assert.equal(result.kind,'PV temporários para o aliado');
});
test('0.10 Implacável usa d8 sem gasto com confirmação manual por turno',()=>{
 const c=make(18);c.advancedChoices.maneuver=['phb2024-maneuver-6'];c.resourceUsed.superiority=6;const r=useManeuver(c,'phb2024-maneuver-6',{relentless:true,roll:randomRoll});assert.equal(r.formula,'1d8');assert.equal(r.spent,0);assert.equal(c.resourceUsed.superiority,6);
 const lower=make(10);lower.advancedChoices.maneuver=c.advancedChoices.maneuver;assert.throws(()=>useManeuver(lower,'phb2024-maneuver-6',{relentless:true,roll:randomRoll}),/nível 15/);
});
test('0.10 falha de rolagem e saldo insuficiente não consomem dados',()=>{
 const c=make();c.advancedChoices.maneuver=['phb2024-maneuver-6'];assert.throws(()=>useManeuver(c,'phb2024-maneuver-6',{roll:()=>{throw Error('Falha simulada');}}));assert.equal(c.resourceUsed.superiority,undefined);
 c.resourceUsed.superiority=4;assert.throws(()=>useManeuver(c,'phb2024-maneuver-6',{roll:randomRoll}),/Sem Dados/);assert.equal(c.resourceUsed.superiority,4);
});
test('0.10 Conheça Seu Inimigo valida nível, uso e recuperação com dado',()=>{
 assert.throws(()=>useKnowYourEnemy(make(3)),/nível 7/);const c=make(7);useKnowYourEnemy(c);assert.equal(battleMasterInfo(c).enemyReady,false);assert.throws(()=>useKnowYourEnemy(c),/já foi usado/);restoreKnowYourEnemy(c);assert.equal(battleMasterInfo(c).enemyReady,true);assert.equal(c.resourceUsed.superiority,1);
});
test('0.10 descansos mantêm recuperações distintas do Mestre da Batalha',()=>{
 const c=make(7);c.resourceUsed.superiority=3;useKnowYourEnemy(c);const short=finishRest(c).character;assert.equal(short.resourceUsed.superiority,0);assert.equal(short.resourceUsed.knowyourenemy,1);assert.equal(finishRest(short,{long:true}).character.resourceUsed.knowyourenemy,undefined);
});
test('0.10 manobras não criam efeitos, alvos nem relógio de combate',()=>{
 const c=make(7);c.advancedChoices.maneuver=['phb2024-maneuver-17'];useManeuver(c,'phb2024-maneuver-17',{roll:randomRoll});assert.equal(c.sceneEffects.length,0);assert.equal(c.sceneTargets.length,0);assert.equal(classLevel(c,'guerreiro'),7);
});

test('0.10 CD de manobras usa os mesmos limites de atributo da ficha',()=>{
 const c=make(7);c.base.str=18;c.advances.str=20;assert.equal(battleMasterInfo(c).modifier,derive(c).m.str);assert.equal(battleMasterInfo(c).dc,8+derive(c).pb+derive(c).m.str);
});

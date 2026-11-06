import test from 'node:test';
import assert from 'node:assert/strict';
import {newCharacter,derive,normalizeImported,finishRest,normalizeItem} from '../docs/core.js';
import {subclassIndex,subclassCoverage,activeSubclassFeatures,powerPlan,useSpeciesPower,parseDuration,addSceneTarget,addSceneEffect,assignEffect,tickRound,breakConcentration,startSpellTracking,conditionsFor,createCompanion,changeLinkedHp,enterWildShape,leaveWildShape,useItemPower,setFeatureChoice,normalize093} from '../docs/rules093.js';

test('all 88 subclasses indexed and attached to valid class IDs',()=>{
 const indexed=subclassIndex();assert.equal(indexed.length,88);assert.equal(new Set(indexed.map(s=>s.classId+'|'+s.name)).size,88);assert.ok(subclassCoverage().withStructuredFeatures>=35);
});
test('native subclass stages are gated by own class level',()=>{
 const c=newCharacter({classId:'guerreiro',level:2,subclass:''});assert.equal(activeSubclassFeatures(c).length,0);c.level=3;c.subclass='Campeão';assert.ok(activeSubclassFeatures(c).length>=1);
});
test('supplement subclass keeps level and source provenance',()=>{
 const indexed=subclassIndex();const x=indexed.find(x=>x.name==='Caminho do Guardião Ancestral');assert.equal(x.playtest,true);assert.ok(x.features[0].description.length>50);
});
test('subclass feature choice is saved across export-import',()=>{
 const c=newCharacter({classId:'barbaro',level:3,subclass:'Caminho do Guardião Ancestral'});const f=activeSubclassFeatures(c)[0];setFeatureChoice(c,f.id,'Ativação tática com o Mestre');assert.equal(normalizeImported(JSON.parse(JSON.stringify(c))).featureChoices[f.id],'Ativação tática com o Mestre');
});
test('rounds parse minutes hours instant',()=>{
 assert.equal(parseDuration({duration:'Concentração, até 1 minuto'}).rounds,10);assert.equal(parseDuration({duration:'1 hora'}).rounds,600);assert.equal(parseDuration({duration:'Instantânea'}).rounds,0);
});
test('self spell with AC bonus affects derive and expires with round',()=>{
 const c=newCharacter({classId:'paladino',level:5});const base=derive(c).ac;
 startSpellTracking(c,{name:'Escudo',duration:'1 rodada',range:'Pessoal',concentration:false});assert.equal(derive(c).ac,base+5);tickRound(c);assert.equal(derive(c).ac,base);
});
test('concentration replaces prior spell effects',()=>{
 const c=newCharacter();startSpellTracking(c,{name:'Invisibilidade',duration:'Concentração, até 1 hora',concentration:true});assert.equal(c.concentration,'Invisibilidade');
 startSpellTracking(c,{name:'Escudo da Fé',duration:'Concentração, até 10 minutos',concentration:true});assert.equal(c.sceneEffects.length,1);assert.equal(c.concentration,'Escudo da Fé');breakConcentration(c);assert.equal(c.sceneEffects.length,0);assert.equal(c.concentration,null);
});
test('saving throw pending prevents condition until assigned',()=>{
 const c=newCharacter(),t=addSceneTarget(c,{name:'Bandido',ac:13,hp:11});const e=startSpellTracking(c,{name:'Paralisar Pessoa',duration:'Concentração, até 1 minuto',concentration:true});assert.equal(conditionsFor(c,t.id).includes('Paralisado'),false);assignEffect(c,e.id,t.id);assert.ok(conditionsFor(c,t.id).includes('Paralisado'));
});
test('successful save clears pending effect without condition',()=>{
 const c=newCharacter(),t=addSceneTarget(c,{name:'Bandido'}),e=startSpellTracking(c,{name:'Paralisar Pessoa',duration:'Até 1 minuto',concentration:true});assignEffect(c,e.id,t.id,{saveSucceeded:true});assert.equal(c.sceneEffects.length,0);
});
test('temporary condition reduces own speed to zero and restores',()=>{
 const c=newCharacter(),speed=derive(c).speed;const e=addSceneEffect(c,{name:'Teia',targetId:'self',condition:'Contido',rounds:3});assert.equal(derive(c).speed,0);tickRound(c,3);assert.equal(derive(c).speed,speed);
});
test('target and companion HP independent of player',()=>{
 const c=newCharacter(),beast=createCompanion(c,{name:'Pantera',kind:'besta',hpMax:20,hp:20,ac:13});changeLinkedHp(c,beast.id,-7);assert.equal(c.companions[0].hp,13);assert.equal(c.hp,derive(c).hpMax);
});
test('wild shape costs own druid resource and uses 2024 temporary HP',()=>{
 const c=newCharacter({classId:'druida',level:5,subclass:'Círculo da Lua'});c.tempHp=0;const f=enterWildShape(c,{name:'Urso',ac:12,speed:9});assert.equal(f.hpBonus,15);assert.equal(c.tempHp,15);assert.equal(c.resourceUsed.wild,1);assert.throws(()=>enterWildShape(c,{name:'Lobo'}));leaveWildShape(c);assert.equal(c.activeForm,null);
});
test('item active power spends charges and applies buff to derived AC',()=>{
 const c=newCharacter(),original=derive(c).ac;const it=normalizeItem({name:'Escudo Mágico',qty:1,equipped:true,maxCharges:3,charges:3,power:{name:'Proteção',chargeCost:1,rounds:2,ac:2}});c.items.push(it);useItemPower(c,it.id);assert.equal(it.charges,2);assert.equal(derive(c).ac,original+2);tickRound(c,2);assert.equal(derive(c).ac,original);
});
test('attunement, equipment, and insufficient charges block item power',()=>{
 const c=newCharacter();const it=normalizeItem({name:'Anel',qty:1,equipped:true,attunement:true,attuned:false,maxCharges:1,charges:1,power:{name:'Pulso',chargeCost:1}});c.items.push(it);assert.throws(()=>useItemPower(c,it.id),/sintonize/);it.attuned=true;useItemPower(c,it.id);assert.equal(it.charges,0);assert.throws(()=>useItemPower(c,it.id),/Cargas/);
});
test('powers, companions and timed spells persist on import, malformed parts bounded',()=>{
 const c=newCharacter();createCompanion(c,{name:'Corvo',hpMax:2,hp:2});startSpellTracking(c,{name:'Escudo',duration:'1 rodada'});c.items[0].power={name:'Pulso',chargeCost:2,rounds:6,ac:3};const x=normalizeImported(JSON.parse(JSON.stringify(c)));assert.equal(x.companions.length,1);assert.equal(x.sceneEffects.length,1);assert.equal(x.items[0].power.name,'Pulso');x.sceneEffects[0].ac=10000;normalize093(x);assert.equal(x.sceneEffects[0].ac,20);
});
test('rest recovers charges but respects manual duration tracking and long species powers',()=>{
 const c=newCharacter({speciesId:'aasimar',level:5});useSpeciesPower(c,'Asas Celestiais');assert.equal(c.speciesPowerUsed.revelation,1);c.items.push(normalizeItem({name:'Varinha',qty:1,equipped:true,maxCharges:2,charges:0,recovery:'short',power:{name:'Fagulha',chargeCost:1}}));
 const short=finishRest(c,{long:false}).character;assert.equal(short.items.at(-1).charges,2);assert.equal(short.speciesPowerUsed.revelation,1);assert.equal(short.sceneEffects.length,0);
 const long=finishRest(short,{long:true}).character;assert.equal(long.speciesPowerUsed.revelation,0);
});
test('power plan uses PB for Goliath and level gates Aasimar',()=>{
 const g=newCharacter({classId:'guerreiro',level:9,speciesId:'golias',variant:'Gigante da Pedra'});assert.equal(powerPlan(g).max,4);
 const a=newCharacter({classId:'guerreiro',level:1,speciesId:'aasimar'});assert.equal(powerPlan(a),null);
});

test('subclass configured passive and use counter have legitimate level gate and survive archive',async()=>{
 const {configureSubclassResource,spendSubclassResource}=await import('../docs/rules093.js');
 const c=newCharacter({classId:'guerreiro',level:3,subclass:'Campeão'}),f=activeSubclassFeatures(c)[0],base=derive(c);
 configureSubclassResource(c,f.id,{max:2,recovery:'short',enabled:true,ac:1,initiative:2,speed:1.5});
 assert.equal(derive(c).ac,base.ac+1);assert.equal(derive(c).initiative,base.initiative+2);assert.equal(derive(c).speed,base.speed+1.5);
 spendSubclassResource(c,f.id);assert.equal(c.featureSettings[f.id].used,1);
 const imported=normalizeImported(JSON.parse(JSON.stringify(c)));assert.equal(imported.featureSettings[f.id].used,1);
 const rested=finishRest(imported,{long:false}).character;assert.equal(rested.featureSettings[f.id].used,0);
});
test('species trait and feat choice notes imported without auto effect',async()=>{
 const {availableTraitNotes,updateTraitNote}=await import('../docs/rules093.js');const c=newCharacter({speciesId:'humano'});c.feats=['Observador'];const t=availableTraitNotes(c).find(x=>x.kind==='Talento');updateTraitNote(c,t.id,'Perícia escolhida conforme livro');assert.equal(normalizeImported(JSON.parse(JSON.stringify(c))).traitNotes[t.id],'Perícia escolhida conforme livro');
});
test('draconic flight uses 100 rounds (10 minutes), and disabling scene condition blocks actions',async()=>{
 const {cannotAct}=await import('../docs/rules09.js');const c=newCharacter({speciesId:'draconato',level:5});assert.equal(powerPlan(c).rounds,100);addSceneEffect(c,{name:'Paralisia',targetId:'self',rounds:2,condition:'Paralisado'});assert.equal(cannotAct(c),true);tickRound(c,2);assert.equal(cannotAct(c),false);
});

test('Radiant Weapon infused reaction requires binding, tracks blindness, recovers on short rest',async()=>{
 const {INFUSIONS,learnInfusion,bindInfusion}=await import('../docs/rules092.js');const {useInfusionReaction,infusionReactionAvailability}=await import('../docs/rules093.js');
 const c=newCharacter({classId:'artifice',level:6});const infusion=INFUSIONS.find(x=>x.name==='Arma Radiante');learnInfusion(c,infusion.id);bindInfusion(c,infusion.id,'weapon:'+c.weapons[0].id);
 assert.equal(infusionReactionAvailability(c,infusion.id).available,true);const result=useInfusionReaction(c,infusion.id);assert.equal(result.condition,'Cego');assert.equal(result.savingThrowPending,true);assert.equal(c.sceneEffects.length,0);
 assert.throws(()=>useInfusionReaction(c,infusion.id));const rested=finishRest(c,{long:false}).character;assert.equal(infusionReactionAvailability(rested,infusion.id).available,true);
});

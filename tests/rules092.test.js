import test from 'node:test';
import assert from 'node:assert/strict';
import {newCharacter,normalizeImported,derive,attackStats,finishRest} from '../docs/core.js';
import {INFUSIONS,infusionLimits,learnInfusion,bindInfusion,unbindInfusion,infusionEffects,normalizeInfusions,infusionTargets,itemEffects,normalizeEquipmentBonuses,spellGrantInfo,grantCanCast,expendGrant,masteryLimit,masteryEligible,toggleMastery,normalizeMasteries} from '../docs/rules092.js';
const arti=(lvl=10)=>newCharacter({classId:'artifice',level:lvl});
const id=name=>INFUSIONS.find(x=>x.name===name)?.id;
test('Artífice Tasha conhece e mantém apenas infusões compatíveis com nível',()=>{
 const c=arti(2);assert.deepEqual(infusionLimits(c),{known:4,active:2});
 const valid=INFUSIONS.filter(x=>(x.minimumArtificerLevel||2)<=2);
 for(const x of valid.slice(0,4))learnInfusion(c,x.id);
 assert.equal(c.knownInfusions.length,4);assert.throws(()=>learnInfusion(c,valid[4].id),/limite/i);
 assert.throws(()=>learnInfusion(c,INFUSIONS.find(x=>x.minimumArtificerLevel>=6).id),/indisponível/);
 c.level=1;normalizeInfusions(c);assert.deepEqual(c.knownInfusions,[]);
});
test('Arma Aprimorada e Defesa Aprimorada: +2 no nível 10, preservados por exportação/importação',()=>{
 const c=arti();c.armor='malha';const a=id('Arma Aprimorada'),d=id('Defesa Aprimorada');learnInfusion(c,a);learnInfusion(c,d);
 const startAtk=attackStats(c,c.weapons[0]).attack,startAC=derive(c).ac;
 bindInfusion(c,a,'weapon:'+c.weapons[0].id);bindInfusion(c,d,'armor');
 assert.equal(attackStats(c,c.weapons[0]).attack-startAtk,2);
 assert.equal(derive(c).ac-startAC,2);
 assert.equal(infusionEffects(c).weapons[c.weapons[0].id],2);
 const reloaded=normalizeImported(c);assert.equal(derive(reloaded).ac-startAC,2);assert.equal(attackStats(reloaded,reloaded.weapons[0]).attack-startAtk,2);
 unbindInfusion(reloaded,d);assert.equal(derive(reloaded).ac,startAC);
});
test('O mesmo item não recebe duas infusões e itens mágicos não são alvos',()=>{
 const c=arti();const a=id('Arma Aprimorada'),b=id('Arma Radiante');learnInfusion(c,a);learnInfusion(c,b);
 bindInfusion(c,a,'weapon:'+c.weapons[0].id);bindInfusion(c,b,'weapon:'+c.weapons[0].id);
 assert.deepEqual(c.activeInfusions.map(x=>x.optionId),[b]);
 c.weapons[0].magic=1;normalizeInfusions(c);assert.equal(c.activeInfusions.length,0);
 assert.ok(!infusionTargets(c).find(x=>x.id==='weapon:'+c.weapons[0].id).kind.includes('armor'));
});
test('Itens com bônus fixos exigem estar equipados e, se necessário, sintonizados',()=>{
 const c=newCharacter();const start=derive(c),i={id:'test',name:'Anel',qty:1,weight:0,rarity:'Raro',attunement:true,attuned:false,equipped:true,bonuses:{ac:2,saves:1,initiative:3,speed:1.5,spellAttack:1,spellDC:1}};
 c.items.push(i);assert.equal(derive(c).ac,start.ac);i.attuned=true;
 const next=derive(c);assert.equal(next.ac,start.ac+2);assert.equal(next.saveBonus,1);assert.equal(next.initiative,start.initiative+3);assert.equal(next.speed,start.speed+1.5);
 const reloaded=normalizeImported(c),newItem=reloaded.items.at(-1);assert.equal(newItem.id,'test');assert.deepEqual(newItem.bonuses,normalizeEquipmentBonuses(i.bonuses));assert.equal(derive(reloaded).ac,start.ac+2);newItem.equipped=false;assert.equal(derive(reloaded).ac,start.ac);
});
test('Bônus editáveis são limitados e saneados, nunca aceitam código arbitrário',()=>{
 assert.equal(normalizeEquipmentBonuses({ac:1e100,saves:'x',speed:-99}).ac,10);
 assert.equal(normalizeEquipmentBonuses({ac:1e100,saves:'x',speed:-99}).saves,0);
 assert.equal(normalizeEquipmentBonuses({ac:1e100,saves:'x',speed:-99}).speed,-10);
});
test('Concessões de magia gratuitas têm contador próprio e descansos recuperam',()=>{
 const c=newCharacter();c.spellAccess.test=spellGrantInfo({source:'Item de teste',ability:'wis',mode:'free',uses:2,recovery:'short'});
 assert.equal(grantCanCast(c.spellAccess.test),true);
 c.spellAccess.test=expendGrant(c.spellAccess.test);c.spellAccess.test=expendGrant(c.spellAccess.test);
 assert.equal(grantCanCast(c.spellAccess.test),false);assert.throws(()=>expendGrant(c.spellAccess.test));
 const short=finishRest(c,{long:false}).character;assert.equal(short.spellAccess.test.used,0);
 c.spellAccess.test.recovery='long';const shortAgain=finishRest(c,{long:false}).character;assert.equal(shortAgain.spellAccess.test.used,2);
 assert.equal(finishRest(c,{long:true}).character.spellAccess.test.used,0);
});
test('Maestrias são selecionadas por limite, não por mera posse de arma',()=>{
 const c=newCharacter({classId:'guerreiro'});assert.equal(masteryLimit(c),3);
 const choices=Object.keys((awaitedWeapons())); // fixture estática para evitar alterar catálogo.
 function awaitedWeapons(){return {adaga:1,espadalonga:1,arco:1,cimitarra:1};}
 const valid=choices.filter(k=>masteryEligible(c,k));assert.ok(valid.length>=3);
 for(const key of valid.slice(0,3))toggleMastery(c,key);
 assert.equal(c.masteries.length,3);if(valid[3])assert.throws(()=>toggleMastery(c,valid[3]),/Limite/);
 assert.equal(attackStats(c,c.weapons[0]).masteryKnown,c.masteries.includes(c.weapons[0].key));
 c.classId='mago';normalizeMasteries(c);assert.equal(c.masteries.length,0);
});

test('Elfos e Tiferinos concedem magias conforme linhagem e nível sem usar as listas de classe',async()=>{
 const catalog=JSON.parse((await import('node:fs')).readFileSync(new URL('../docs/spells.json',import.meta.url),'utf8'));
 const {syncAncestrySpellAccess,ancestrySpellPlan}=await import('../docs/rules092.js');
 const c=newCharacter({classId:'guerreiro',level:3,speciesId:'elfo',variant:'Drow'});
 assert.deepEqual(ancestrySpellPlan(c,catalog).map(o=>o.source),['Espécie: elfo|Drow','Espécie: elfo|Drow']);
 syncAncestrySpellAccess(c,catalog);const spellId=catalog.find(s=>s.name==='Fogo das Fadas').id;
 assert.equal(c.spellAccess[spellId].mode,'free');assert.equal(c.spellAccess[spellId].uses,1);
 c.spellAccess[spellId]=expendGrant(c.spellAccess[spellId]);assert.equal(c.spellAccess[spellId].used,1);
 syncAncestrySpellAccess(c,catalog);assert.equal(c.spellAccess[spellId].used,1);
 const imported=normalizeImported({...c,knownSpellsByClass:{special:[...Object.keys(c.spellAccess)]}});
 assert.equal(imported.spellAccess[spellId].used,1);
 imported.variant='Elfo Silvestre';syncAncestrySpellAccess(imported,catalog);
 assert.equal(imported.spellAccess[spellId],undefined);
 assert.ok(Object.values(imported.spellAccess).some(g=>g.automatic&&g.source==='Espécie: elfo|Elfo Silvestre'));
 imported.speciesId='tiferino';imported.variant='Infernal';imported.level=5;
 syncAncestrySpellAccess(imported,catalog);
 assert.ok(Object.values(imported.spellAccess).some(g=>g.source==='Espécie: tiferino|Infernal'&&g.mode==='free'));
});

test('Sopro do Draconato usa dano progressivo, ancestralidade e CD de Constituição',async()=>{
 const {dragonBreathInfo}=await import('../docs/rules092.js');
 const c=newCharacter({speciesId:'draconato',variant:'Azul',level:1});let info=dragonBreathInfo(c);
 assert.equal(info.formula,'1d10');assert.equal(info.type,'Elétrico');assert.equal(info.dc,8+2+2); // CON total 14 + modificador 2
 c.level=5;assert.equal(dragonBreathInfo(c).formula,'2d10');c.level=11;assert.equal(dragonBreathInfo(c).formula,'3d10');c.level=17;assert.equal(dragonBreathInfo(c).formula,'4d10');c.variant='Verde';assert.equal(dragonBreathInfo(c).type,'Venenoso');
 assert.equal(dragonBreathInfo(newCharacter()),null);
});
test('Orc: recursos de Adrenalina e Resistência Implacável; Golias Forma Grande altera deslocamento e encerra em descanso',async()=>{
 const {resources}=await import('../docs/core.js');
 let c=newCharacter({speciesId:'orc'});assert.ok(resources(c).find(r=>r.id==='adrenaline'));assert.ok(resources(c).find(r=>r.id==='relentless'));
 c=newCharacter({speciesId:'golias',level:5});assert.ok(resources(c).find(r=>r.id==='large'));const before=derive(c).speed;c.largeForm=true;assert.equal(derive(c).speed,before+3);assert.equal(finishRest(c,{long:false}).character.largeForm,false);assert.equal(finishRest(c,{long:true}).character.largeForm,false);
 const imported=normalizeImported({...c,largeForm:true});assert.equal(imported.largeForm,true);imported.speciesId='humano';assert.equal(normalizeImported(imported).largeForm,false);
});

test('Invocações 2024 bloqueiam nível insuficiente e pré-requisitos de Pacto',async()=>{
 const {toggleChoice,invocationRequirement}=await import('../docs/rules091.js');const {SUPPLEMENT_OPTIONS}=await import('../docs/compatibility.js');const c=newCharacter({classId:'bruxo',level:2});
 const opts=SUPPLEMENT_OPTIONS.filter(o=>o.kind==='invocation'&&o.source==='phb2024');
 const forbidden=opts.find(o=>o.name==='Visão da Bruxa');const blade=opts.find(o=>o.name==='Pacto da Lâmina');const thirsty=opts.find(o=>o.name==='Lâmina Sedenta');
 assert.equal(invocationRequirement(c,forbidden,opts).allowed,false);
 assert.throws(()=>toggleChoice(c,'invocation',forbidden,opts),/nível 15/);
 c.level=5;assert.throws(()=>toggleChoice(c,'invocation',thirsty,opts),/Pacto da Lâmina/);
 toggleChoice(c,'invocation',blade,opts);toggleChoice(c,'invocation',thirsty,opts);
 assert.ok(c.advancedChoices.invocation.includes(thirsty.id));
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {newCharacter,normalizeImported,attackStats,derive,finishRest} from '../docs/core.js';
import {classLevel} from '../docs/progression.js';
import {saveMacro,normalizeCombatMacros,deleteMacro,validMacroFormula} from '../docs/macros094-data.js';
import {evaluateMacro,spendMacroCosts} from '../docs/macros094.js';
import {expendGrant} from '../docs/rules092.js';
const sword=c=>c.weapons[0].id;
const opts={book:[],spellMechanic:()=>null,spellReady:()=>true,unarmedFormula:()=> '1d4+2'};
const evaluate=(c,m,o={})=>evaluateMacro(c,m,{...opts,...o});

test('0.9.4: macros can be created, replaced and deleted without changing equipment',()=>{
 const c=newCharacter();assert.deepEqual(c.combatMacros,[]);const m=saveMacro(c,{name:'Corte',baseType:'weapon',baseId:sword(c)});
 assert.equal(c.combatMacros.length,1);saveMacro(c,{...m,name:'Corte reforçado'});assert.equal(c.combatMacros.length,1);assert.equal(c.combatMacros[0].name,'Corte reforçado');
 deleteMacro(c,m.id);assert.equal(c.combatMacros.length,0);assert.ok(c.weapons.length>0);
});
test('0.9.4: formula validation bounds dice and import sanitizes malformed fields',()=>{
 for(const s of ['2d6+3','1d8+1d6-2','17','30d10'])assert.equal(validMacroFormula(s),true,s);
 for(const s of ['99d10','2d1','1d1001','10d6+evil()','1d6;alert(1)','1d0'])assert.equal(validMacroFormula(s),false,s);
 const c=newCharacter();c.combatMacros=[{id:'abc',name:'<img src=x>',baseType:'weapon',baseId:sword(c),parts:[{kind:'custom',formula:'1d6;evil()',type:'Invalid'}]},{id:'abc',name:'Duplicate'}];
 normalizeCombatMacros(c);assert.equal(c.combatMacros.length,1);assert.equal(c.combatMacros[0].parts[0].formula,'');assert.equal(c.combatMacros[0].parts[0].type,'Energético');
 const copy=normalizeImported(JSON.parse(JSON.stringify(c)));assert.equal(copy.combatMacros.length,1);
});
test('0.9.4: macro uses live attack bonus, weapon formula and equipment changes',()=>{
 const c=newCharacter({classId:'guerreiro',level:1});const m=saveMacro(c,{name:'Espada',baseType:'weapon',baseId:sword(c)});
 const original=evaluate(c,m);assert.equal(original.ready,true);assert.equal(original.base.bonus,attackStats(c,c.weapons[0]).attack);assert.equal(original.parts[0].formula,attackStats(c,c.weapons[0]).formula);
 c.weapons[0].magic=2;c.level=5;const changed=evaluate(c,m);assert.equal(changed.base.bonus,attackStats(c,c.weapons[0]).attack);assert.ok(changed.base.bonus>original.base.bonus);
 c.weapons.shift();assert.equal(evaluate(c,m).ready,false);
});
test('0.9.4: sneak attack requires eligible weapon, checked condition, and changes with rogue level',()=>{
 const c=newCharacter({classId:'ladino',level:5,weapons:[{key:'adaga'}]});const m=saveMacro(c,{name:'Furtivo',baseType:'weapon',baseId:sword(c),parts:[{kind:'sneak'}]});
 const inactive=evaluate(c,m);assert.equal(inactive.parts.length,1);assert.match(inactive.warnings.join(),/requisitos situacionais/);
 c.sneak=true;const active=evaluate(c,m);assert.equal(active.parts.length,2);assert.equal(active.parts[1].formula,'3d6');
 c.level=7;assert.equal(evaluate(c,m).parts[1].formula,'4d6');
 c.weapons[0].key='clava';assert.equal(evaluate(c,m).parts.length,1);
});
test('0.9.4: mark is situational, not always appended',()=>{
 const c=newCharacter();const m=saveMacro(c,{baseType:'weapon',baseId:sword(c),parts:[{kind:'mark'}]});
 assert.equal(evaluate(c,m).parts.length,1);c.mark=true;assert.equal(evaluate(c,m).parts.at(-1).formula,'1d6');
});
test('0.9.4: paladin radiant damage from level 11, smite only melee, and resources checked',()=>{
 const c=newCharacter({classId:'paladino',level:11,weapons:[{key:'adaga'}]});const book=[{id:'smite',name:'Destruição Divina',level:1}];
 const m=saveMacro(c,{baseType:'weapon',baseId:sword(c),parts:[{kind:'radiant'},{kind:'spell',spellId:'smite'}]});
 const o={book,spellMechanic:()=>({formula:'2d8',type:'Radiante'})};const a=evaluate(c,m,o);
 assert.equal(a.parts.length,3);assert.deepEqual(a.parts.map(x=>x.formula).slice(1),['1d8','2d8']);assert.equal(a.costs.length,1);
 spendMacroCosts(c,a.costs,expendGrant);assert.equal(c.resourceUsed.smite,1);
 const b=evaluate(c,m,o);assert.ok(b.costs.some(x=>x.kind==='slot'));c.weapons[0].key='arco';assert.equal(evaluate(c,m,o).parts.length,1);
});
test('0.9.4: spell casting generates a single damage outcome with save DC and slot cost',()=>{
 const c=newCharacter({classId:'mago',level:5});const sp={id:'fireball',name:'Bola de Fogo',level:3};const m=saveMacro(c,{baseType:'spell',baseId:sp.id});const o={book:[sp],spellMechanic:(_,slot)=>({formula:(8+slot-3)+'d6',type:'Ígneo',save:'Destreza'})};
 const result=evaluate(c,m,o);assert.equal(result.ready,true);assert.equal(result.base.attack,false);assert.equal(result.base.save,'Destreza');assert.equal(result.base.dc,derive(c).spellDC);assert.equal(result.costs.length,1);
 spendMacroCosts(c,result.costs,expendGrant);assert.equal(c.slotsUsed[2],1);
 const again=evaluate(c,m,o);assert.equal(again.ready,true);assert.equal(again.costs.length,1);
});
test('0.9.4: independent spell cannot join weapon without explicit manual approval',()=>{
 const c=newCharacter({classId:'mago',level:5});const book=[{id:'spark',name:'Raio de Fogo',level:0}];const m=saveMacro(c,{baseType:'weapon',baseId:sword(c),parts:[{kind:'spell',spellId:'spark'}]});const o={book,spellMechanic:()=>({formula:'2d10',type:'Ígneo',attack:true})};
 const denied=evaluate(c,m,o);assert.equal(denied.parts.length,1);assert.match(denied.warnings.join(),/independente/);
 m.parts[0].allowIndependent=true;const approved=evaluate(c,m,o);assert.equal(approved.parts.length,2);assert.match(approved.warnings.join(),/soma manual/);
});
test('0.9.4: custom feature expenses validated atomically and survive export',()=>{
 const c=newCharacter({classId:'monge',level:3});const m=saveMacro(c,{baseType:'unarmed',parts:[{kind:'feature',resourceId:'focus',name:'Poder',formula:'2d6+1',type:'Energético'}]});
 const r=evaluate(c,m);assert.equal(r.parts.length,2);assert.equal(r.costs[0].id,'focus');const saved=normalizeImported(JSON.parse(JSON.stringify(c)));
 assert.equal(saved.combatMacros[0].parts[0].formula,'2d6+1');
 c.resourceUsed.focus=3;const disabled=evaluate(c,m);assert.equal(disabled.parts.length,1);assert.match(disabled.warnings.join(),/indisponível/);
 c.resourceUsed.focus=0;const costs=[{kind:'resource',id:'focus',name:'Pontos de Foco'},{kind:'resource',id:'focus',name:'Pontos de Foco'},{kind:'resource',id:'focus',name:'Pontos de Foco'},{kind:'resource',id:'focus',name:'Pontos de Foco'}];
 assert.throws(()=>spendMacroCosts(c,costs,expendGrant),/esgotado/);assert.equal(c.resourceUsed.focus,0);
});
test('0.9.4: rest does not decrement tracked effect duration',()=>{
 const c=newCharacter();c.sceneEffects=[{id:'effect',name:'Escudo',targetId:'self',rounds:9,concentration:false}];
 const short=finishRest(c,{long:false}).character;assert.equal(short.sceneEffects[0].rounds,9);const long=finishRest(short,{long:true}).character;assert.equal(long.sceneEffects[0].rounds,9);
});

test('0.9.4: equipped item power contributes damage and spends charges only on confirmation',async()=>{
 const {normalizeItem}=await import('../docs/core.js');
 const c=newCharacter();const it=normalizeItem({name:'Anel de raios',qty:1,equipped:true,attunement:true,attuned:true,maxCharges:3,charges:3,power:{name:'Pulso',chargeCost:2,damageFormula:'2d6+1',damageType:'Elétrico'}});c.items.push(it);
 const m=saveMacro(c,{name:'Corte de tempestade',baseType:'weapon',baseId:sword(c),parts:[{kind:'item',itemId:it.id}]});
 const p=evaluate(c,m);assert.equal(p.ready,true);assert.equal(p.parts.length,2);assert.equal(p.parts[1].formula,'2d6+1');assert.equal(p.parts[1].type,'Elétrico');
 assert.equal(it.charges,3,'apenas prever dano não gasta cargas');
 spendMacroCosts(c,p.costs,expendGrant);assert.equal(it.charges,1);
 assert.equal(evaluate(c,m).parts.length,1,'item insuficiente não entra na macro');
 it.charges=3;it.attuned=false;assert.equal(evaluate(c,m).parts.length,1,'item não sintonizado fica inativo');
 const imported=normalizeImported(JSON.parse(JSON.stringify(c)));assert.equal(imported.combatMacros[0].parts[0].itemId,it.id);assert.equal(imported.items.at(-1).power.damageFormula,'2d6+1');
});

test('0.9.4: two item activations cannot spend more charges than available, atomically',async()=>{
 const {normalizeItem}=await import('../docs/core.js');const c=newCharacter();const it=normalizeItem({name:'Orbe',qty:1,equipped:true,maxCharges:2,charges:2,power:{name:'Raio',chargeCost:2,damageFormula:'1d6',damageType:'Ígneo'}});c.items.push(it);
 assert.throws(()=>spendMacroCosts(c,[{kind:'charges',id:it.id,amount:2,name:'Orbe'},{kind:'charges',id:it.id,amount:2,name:'Orbe'}],expendGrant),/Cargas indisponíveis/);
 assert.equal(it.charges,2);
});

test('0.9.4: divine smite cannot be an independent primary attack',()=>{
 const c=newCharacter({classId:'paladino',level:5});const book=[{id:'smite',name:'Destruição Divina',level:1}];const m=saveMacro(c,{baseType:'spell',baseId:'smite'});
 const result=evaluate(c,m,{book,spellMechanic:()=>({formula:'2d8',type:'Radiante'})});assert.equal(result.ready,false);assert.match(result.reason,/corpo a corpo/);
});

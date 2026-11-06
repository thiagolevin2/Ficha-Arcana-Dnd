import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {newCharacter,derive,normalizeImported} from '../docs/core.js';
import {SPECIES} from '../docs/data.js';
import {ORIGIN_FEATS_2024, HIGH_ELF_CANTRIPS,speciesCards096,speciesChoiceNeeds,speciesActionPlan,useSpecies096,restSpecies096,speciesPassiveBonuses,speciesMovements096} from '../docs/species096.js';
import {ancestrySpellPlan,syncAncestrySpellAccess,expendGrant,grantCanCast,restoreGrants,spellGrantInfo} from '../docs/rules092.js';
const spells=JSON.parse(fs.readFileSync(new URL('../docs/spells.json',import.meta.url)));
const sp=(id)=>spells.find(s=>s.name===id);

test('096: escolhas elficas entram nos cálculos e o Alto Elfo recebe o truque selecionado',()=>{
 const magic=sp('Raio de Fogo');const c=newCharacter({speciesId:'elfo',variant:'Alto Elfo',speciesChoices:{elfSkill:'Intuição',highElfCantrip:magic.id}});
 assert.deepEqual(speciesChoiceNeeds(c),[]);
 assert.ok(derive(c).skills['Intuição']);
 const granted=ancestrySpellPlan(c,spells);assert.ok(granted.some(x=>x.spellId===magic.id));
 assert.ok(!granted.some(x=>x.spellId===sp('Prestidigitação Arcana').id));
 assert.ok(HIGH_ELF_CANTRIPS.some(x=>x[0]===magic.id));
});
test('096: humano requer perícia e talento de Origem e ambos são aplicados',()=>{
 const c=newCharacter({speciesId:'humano',speciesChoices:{}});
 assert.equal(speciesChoiceNeeds(c).length,2);
 c.speciesChoices.humanSkill='Investigação';c.speciesChoices.humanFeat='Vigoroso';
 assert.deepEqual(speciesChoiceNeeds(c),[]);
 assert.ok(derive(c).skills['Investigação']);assert.ok(derive(c).feats.includes('Vigoroso'));assert.equal(derive(c).hpMax,newCharacter({speciesId:'humano',backgroundId:c.backgroundId}).hp+2);
 assert.ok(ORIGIN_FEATS_2024.includes('Iniciado em Magia (Mago)'));
});
test('096: Aasimar tem ativação e dano opcional, não exibe Transformação automática',()=>{
 const c=newCharacter({speciesId:'aasimar',level:5});
 const a=speciesActionPlan(c,'aasimar-revelation');assert.equal(a.max,1);assert.ok(a.available);
 useSpecies096(c,'aasimar-revelation');assert.ok(c.aasimarRevelationActive);assert.equal(speciesActionPlan(c,'aasimar-revelation').available,false);
 c.aasimarBonusThisAttack=true;assert.equal(c.aasimarBonusThisAttack,true);
 restSpecies096(c,false);assert.equal(speciesActionPlan(c,'aasimar-revelation').available,false);
 restSpecies096(c,true);assert.equal(speciesActionPlan(c,'aasimar-revelation').remaining,1);
 assert.ok(speciesCards096(c).some(x=>x.name==='Mãos Curativas'));
});
test('096: vantagens e informações nativas têm caixas, sem ativar recursos inventados',()=>{
 const dwarf=speciesCards096(newCharacter({speciesId:'anao'}));
 assert.ok(dwarf.some(c=>/veneno/i.test(c.description)));
 assert.equal(dwarf.find(x=>x.id==='dwarf-stone').action.max,2);
 const half=speciesCards096(newCharacter({speciesId:'pequenino'}));
 assert.ok(half.some(x=>x.id==='halfling-brave'));
 assert.ok(half.some(x=>x.id==='halfling-hide'));
 const rock=newCharacter({speciesId:'gnomo',variant:'Gnomo das Rochas'});
 assert.ok(speciesCards096(rock).some(x=>x.id==='rock-tinker'&&!x.action));
 assert.ok(ancestrySpellPlan(rock,spells).some(x=>x.spellId===sp('Reparar').id));
 assert.ok(ancestrySpellPlan(rock,spells).some(x=>x.spellId===sp('Prestidigitação Arcana').id));
 assert.ok(speciesCards096(newCharacter({speciesId:'draconato',level:5})).some(x=>x.id==='dragon-flight'&&!x.action));
 assert.ok(speciesCards096(newCharacter({speciesId:'tiferino',variant:'Infernal'})).some(x=>x.description.includes('ígneo')));
});
test('096: sem voo indevido nas variantes antigas de tiferino',()=>{
 for(const id of ['supp-races-small-species-tiferino-fogo-infernal','supp-races-small-species-tiferino-lingua-do-diabo']){
  assert.equal(SPECIES[id].movement.fly,undefined);
  const c=newCharacter({speciesId:id});assert.equal(derive(c).movements.fly,undefined);
 }
});
test('096: Aarakocra equipado com armadura média não recebe deslocamento de voo',()=>{
 const c=newCharacter({speciesId:'supp-races-small-species-aarakocra',armor:'peitoral'});
 assert.equal(derive(c).movements.fly,undefined);
});
test('096: Dhampiro com duas perícias conserva escolha exportada',()=>{
 const c=newCharacter({speciesId:'supp-ravenloft-species-dhampiro',speciesChoices:{dhampirLegacy:'Duas perícias',dhampirSkill1:'Percepção',dhampirSkill2:'Furtividade'}});
 assert.deepEqual(speciesChoiceNeeds(c),[]);
 assert.ok(derive(c).skills['Percepção']);assert.ok(derive(c).skills['Furtividade']);
 const restored=normalizeImported(JSON.parse(JSON.stringify(c)));
 assert.equal(restored.speciesChoices.dhampirSkill2,'Furtividade');
 assert.equal(speciesActionPlan(restored,'dhampir-bite-attack').attackBonus,derive(restored).m.con+derive(restored).pb);
});
test('096: Híbrido Simic escolhe adaptações e só aplica Carapaça após nível 5',()=>{
 const c=newCharacter({speciesId:'supp-races-large-species-hibrido-simic',level:5,armor:'peitoral',speciesChoices:{simicInitial:'Adaptação Subaquática',simicLater:'Carapaça'}});
 assert.deepEqual(speciesChoiceNeeds(c),[]);
 assert.equal(speciesPassiveBonuses(c,'Média').ac,1);
 assert.equal(speciesPassiveBonuses(c,'Pesada').ac,0);
 assert.ok(derive(c).movements.swim);
 assert.equal(derive(c).movements.climb,undefined);
 c.speciesChoices.simicLater='Adaptação Subaquática';assert.ok(speciesChoiceNeeds(c).some(x=>x.includes('diferente')));
});
test('096: Transmorfo Couro de Besta concede bônus temporário somente transformado',()=>{
 const c=newCharacter({speciesId:'supp-races-large-species-transmorfo-couro-de-besta',level:5});
 const ac0=derive(c).ac;const plan=speciesActionPlan(c,'shifter-shift');assert.equal(plan.max,1);assert.equal(plan.recovery,'short');
 useSpecies096(c,'shifter-shift');assert.equal(derive(c).ac,ac0+1);
 assert.equal(speciesActionPlan(c,'shifter-shift').available,false);
 restSpecies096(c,false);assert.equal(speciesActionPlan(c,'shifter-shift').available,false); // ainda está ativo
 c.shiftingActive=false;assert.equal(speciesActionPlan(c,'shifter-shift').available,true);
 assert.equal(derive(c).ac,ac0);
});
test('096: Transmorfo Passos Rápidos ganha +1,5 m enquanto ativo e mordida é condicional',()=>{
 const c=newCharacter({speciesId:'supp-races-large-species-transmorfo-passos-rapidos',level:3});
 const normal=derive(c).speed;useSpecies096(c,'shifter-shift');assert.equal(derive(c).speed,normal+1.5);c.shiftingActive=false;assert.equal(derive(c).speed,normal);
 const other=newCharacter({speciesId:'supp-races-large-species-transmorfo-dentes-longos',level:3});
 assert.equal(speciesActionPlan(other,'shifter-bite'),null);useSpecies096(other,'shifter-shift');assert.equal(speciesActionPlan(other,'shifter-bite').formula.includes('1d6'),true);
});
test('096: Genasi das quatro variantes recebem só magias raciais existentes',()=>{
 for(const [id,names,ability] of [
  ['supp-races-small-species-genasi-do-fogo',['Criar Chamas','Mãos Flamejantes'],'con'],
  ['supp-races-small-species-genasi-do-ar',['Levitação'],'con'],
  ['supp-races-small-species-genasi-da-terra',['Passo Sem Rastro'],'con'],
  ['supp-races-small-species-genasi-da-agua',['Criar ou Destruir Água'],'con']
 ]){
  const c=newCharacter({speciesId:id,level:5});const plan=ancestrySpellPlan(c,spells);
  assert.equal(plan.length,names.length,id);for(const name of names)assert.ok(plan.some(x=>x.spellId===sp(name).id&&x.ability===ability),id+': '+name);
 }
});
test('096: Tritão usa a mesma reserva de conjuração para Névoa e Lufada',()=>{
 const c=newCharacter({speciesId:'supp-races-large-species-tritao',level:5});
 const plan=ancestrySpellPlan(c,spells);assert.equal(plan.length,2);assert.equal(plan[0].group,'triton-water-magic');
 syncAncestrySpellAccess(c,spells);
 for(const g of Object.values(c.spellAccess))assert.equal(g.group,'triton-water-magic');
 const fog=c.spellAccess[sp('Névoa Obscurecente').id];c.spellAccess[sp('Névoa Obscurecente').id]=expendGrant(fog);
 for(const g of Object.values(c.spellAccess))if(g.group===fog.group)g.used=1;
 assert.equal(grantCanCast(c.spellAccess[sp('Lufada de Vento').id]),false);
 syncAncestrySpellAccess(c,spells);assert.equal(grantCanCast(c.spellAccess[sp('Lufada de Vento').id]),false);
 restoreGrants(c,true);assert.equal(grantCanCast(c.spellAccess[sp('Lufada de Vento').id]),true);
});
test('096: todas espécies têm representação textual de benefícios e nenhuma caixa genérica vazia',()=>{
 for(const [id,sp] of Object.entries(SPECIES)){
  const c=newCharacter({speciesId:id,level:5});const cards=speciesCards096(c);assert.ok(cards.length>0,id);
  for(const card of cards){assert.ok(card.name&&card.description,id+' '+card.id);assert.ok(!card.action||['use','damage','attack','healing','revelation','shifting'].includes(card.action.kind));}
 }
});
test('096: Draconato de Gemas exige escolha e exibe resistência conforme gema',()=>{
 const c=newCharacter({speciesId:'supp-fizban-species-draconato-de-gemas',level:5});
 assert.ok(speciesChoiceNeeds(c).some(x=>/gemas/i.test(x)));
 c.speciesChoices.gemAncestry='Safira';
 assert.deepEqual(speciesChoiceNeeds(c),[]);
 assert.match(speciesCards096(c).find(x=>x.id==='gem-resistance').description,/Trovejante/);
 assert.match(speciesActionPlan(c,'gem-breath').formula,/2d10/);
});
test('096: Tiferino recebe Taumaturgia, resistência na caixa e magias da herança escolhida',()=>{
 for(const [variant,dmg] of [['Abissal','venenoso'],['Ctônico','necrótico'],['Infernal','ígneo']]){
  const c=newCharacter({speciesId:'tiferino',variant,level:5});
  const grants=ancestrySpellPlan(c,spells);assert.ok(grants.some(g=>g.spellId===sp('Taumaturgia').id));
  assert.ok(grants.length>=4);assert.ok(speciesCards096(c).some(card=>card.description.includes('Resistência a dano '+dmg)));
 }
});

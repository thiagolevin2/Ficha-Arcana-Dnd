import test from 'node:test';
import assert from 'node:assert/strict';
import {newCharacter,derive,resources,slotInfo,preparedLimit,attackStats,advanceCharacter,updateClassPlan,finishRest,normalizeImported,normalizeWeapon,normalizeItem,roll,validPortrait} from '../dist/core.js';
import {classEntries,classLevel,totalLevel,castingSources,slotPools,multiclassEligibility,hitDicePools,cantripLimitFor,preparationClassIds} from '../dist/progression.js';
import {validatePortraitFile,portraitDimensions} from '../dist/portrait.js';
const stats={str:14,dex:14,con:14,int:16,wis:14,cha:16};
function multi(entries,part={}){return newCharacter({classId:entries[0].classId,classes:entries,base:{...stats},origin:{},armor:'none',...part});}

test('multiclass prerequisites check current classes and the new class; Fighter accepts STR or DEX',()=>{
 const fighter=newCharacter({base:{...stats,str:8,dex:13,int:13},origin:{}});assert.equal(multiclassEligibility(fighter,'mago').valid,true);
 const barbarian=newCharacter({classId:'barbaro',base:{...stats,str:12},origin:{}});assert.equal(multiclassEligibility(barbarian,'mago').valid,false);
 const wizard=newCharacter({classId:'mago',base:{...stats,wis:12},origin:{}});assert.equal(multiclassEligibility(wizard,'monge').valid,false);assert.equal(multiclassEligibility(wizard,'guardiao').valid,false);
 const lowCha=newCharacter({base:{...stats,cha:12},origin:{}});assert.equal(multiclassEligibility(lowCha,'paladino').valid,false);
});
test('only the first character level receives maximum Hit Die and initial saving throws',()=>{
 const wf=multi([{classId:'mago',level:1},{classId:'guerreiro',level:1}]),fw=multi([{classId:'guerreiro',level:1},{classId:'mago',level:1}]);
 assert.equal(derive(wf).hpMax,16);assert.equal(derive(fw).hpMax,18);assert.deepEqual(derive(wf).saveProficiencies,['int','wis']);assert.deepEqual(derive(fw).saveProficiencies,['str','con']);
 assert.equal(derive(wf).training.armor,2);assert.equal(derive(fw).training.armor,3);assert.equal(derive(wf).training.shield,true);
});
test('multiclass Barbarian and Rogue do not grant the omitted initial proficiencies',()=>{
 const c=multi([{classId:'mago',level:1},{classId:'barbaro',level:1}]);assert.equal(derive(c).training.armor,0);assert.equal(derive(c).training.shield,true);assert.equal(derive(c).training.martial,true);
 const rogue=multi([{classId:'mago',level:1},{classId:'ladino',level:1}]);assert.equal(attackStats(rogue,{key:'rapieira'}).proficient,false);
});
test('total level controls proficiency while class levels control class powers',()=>{
 const c=multi([{classId:'guerreiro',level:3,subclass:'Campeão'},{classId:'ladino',level:2}]);assert.equal(totalLevel(c),5);assert.equal(c.level,5);assert.equal(classLevel(c,'ladino'),2);assert.equal(derive(c).pb,3);assert.equal(derive(c).attacks,1);assert.equal(resources(c).find(r=>r.id==='wind').max,2);
});
test('2024 half casters round up and multiclass third casters round down',()=>{
 const example=multi([{classId:'guardiao',level:4,subclass:'Caçador'},{classId:'feiticeiro',level:3,subclass:'Feitiçaria Dracônica'}]);assert.deepEqual(slotPools(example).standard.counts,[4,3,2]);assert.deepEqual(castingSources(example).map(s=>s.maxSpellLevel),[1,2]);
 assert.deepEqual(slotPools(multi([{classId:'paladino',level:1},{classId:'guardiao',level:1}])).standard.counts,[3]);
 const ek=multi([{classId:'guerreiro',level:5,subclass:'Cavaleiro Místico'},{classId:'mago',level:1}]);assert.deepEqual(slotPools(ek).standard.counts,[3]);
 assert.deepEqual(slotInfo(newCharacter({classId:'guerreiro',level:4,subclass:'Cavaleiro Místico'})).counts,[3]);
});
test('preparation and casting ability remain separate despite higher combined slots',()=>{
 const c=multi([{classId:'mago',level:4,subclass:'Evocador'},{classId:'clerigo',level:3,subclass:'Domínio da Vida'}]);const d=derive(c);assert.equal(d.standardSlots.counts.length,4);assert.equal(preparedLimit(c,'mago'),7);assert.equal(preparedLimit(c,'clerigo'),6);assert.ok(d.castingSources.every(s=>s.maxSpellLevel===2));assert.deepEqual(d.castingSources.map(s=>s.ability),['int','wis']);
});
test('2024 preparation tables and cantrips are class specific',()=>{
 for(const [id,expected]of [['mago',25],['bardo',22],['clerigo',22],['druida',22],['feiticeiro',22],['bruxo',15]])assert.equal(preparedLimit(newCharacter({classId:id,level:20}),id),expected,id);
 assert.equal(preparedLimit(newCharacter({classId:'feiticeiro',level:1})),2);assert.equal(preparedLimit(newCharacter({classId:'guerreiro',level:3,subclass:'Cavaleiro Místico'})),3);assert.equal(cantripLimitFor(newCharacter({classId:'ladino',level:3,subclass:'Trapaceiro Arcano'}),'ladino'),3);
});
test('Innate Sorcery improves Sorcerer spell DC only',()=>{
 const c=multi([{classId:'mago',level:2},{classId:'feiticeiro',level:1}],{adjust:{innate:true},base:{...stats,cha:18}});const sources=derive(c).castingSources;assert.equal(sources.find(s=>s.classId==='mago').spellDC,13);assert.equal(sources.find(s=>s.classId==='feiticeiro').spellDC,15);
});
test('pact slots stay separate and short rest restores pact without restoring regular slots',()=>{
 const c=multi([{classId:'mago',level:2},{classId:'bruxo',level:3,subclass:'Patrono Ínfero'}],{slotsUsed:[2],pactUsed:2});const d=derive(c);assert.deepEqual(d.standardSlots.counts,[3]);assert.deepEqual(d.pactSlots.counts,[2]);assert.equal(d.pactSlots.level,2);
 const rested=finishRest(c).character;assert.deepEqual(rested.slotsUsed,[2]);assert.equal(rested.pactUsed,0);
});
test('Channel Divinity uses separate Cleric and Paladin resources',()=>{
 const c=multi([{classId:'clerigo',level:6,subclass:'Domínio da Vida'},{classId:'paladino',level:3,subclass:'Juramento da Devoção'}]);const channels=resources(c).filter(r=>r.name.startsWith('Canalizar'));assert.equal(channels.length,2);assert.notEqual(channels[0].id,channels[1].id);assert.deepEqual(channels.map(r=>r.max),[3,2]);
});
test('Extra Attack takes the greatest class benefit and never sums',()=>{
 assert.equal(derive(multi([{classId:'guerreiro',level:5},{classId:'paladino',level:5}])).attacks,2);
 assert.equal(derive(multi([{classId:'guerreiro',level:11},{classId:'paladino',level:5}])).attacks,3);
 const monk=multi([{classId:'guerreiro',level:5},{classId:'monge',level:1}]);assert.equal(attackStats(monk,{key:'adaga'}).dice,'1d6');
});
test('only one armor formula is used and an untrained shield gives no bonus',()=>{
 const c=multi([{classId:'barbaro',level:1},{classId:'monge',level:1}],{base:{...stats,dex:14,con:16,wis:18}});assert.equal(derive(c).ac,16);c.shield=true;assert.equal(derive(c).ac,17);
 const wizard=newCharacter({classId:'mago',armor:'none',shield:true,origin:{},base:stats});assert.equal(derive(wizard).shieldBonus,0);assert.equal(derive(wizard).ac,12);
});
test('mixed Hit Dice are tracked and consumed by die type',()=>{
 const c=multi([{classId:'mago',level:2},{classId:'guerreiro',level:2}],{hp:1});c.hp=1;assert.deepEqual(hitDicePools(c).map(p=>[p.sides,p.max]),[[10,2],[6,2]]);
 const result=finishRest(c,{diceCounts:{6:1,10:1},random:sides=>sides});assert.equal(result.healing,20);assert.equal(result.character.hp,21);assert.deepEqual(result.character.usedHDByDie,{'6':1,'10':1});assert.throws(()=>finishRest(result.character,{diceCounts:{6:2}}));
});
test('level advancement preserves damage and spent slots and applies retroactive Constitution',()=>{
 const c=newCharacter({level:3,xp:2700,subclass:'Campeão',base:{...stats,con:13},origin:{}});c.hp=20;c.slotsUsed=[1];const next=advanceCharacter(c,'guerreiro',{increases:{con:2}});assert.equal(next.level,4);assert.equal(derive(next).hpMax,36);assert.equal(next.hp,31);assert.equal(c.level,3);assert.equal(next.progressionLog.at(-1).pending,false);
 const spellcaster=newCharacter({classId:'mago',level:3,xp:2700,subclass:'Evocador',base:stats,origin:{},slotsUsed:[2,1]});const advanced=advanceCharacter(spellcaster,'mago');assert.deepEqual(advanced.slotsUsed,[2,1]);assert.equal(advanced.progressionLog.at(-1).pending,true);
});
test('a new class uses normal level HP and rolled HP is retained',()=>{
 const c=newCharacter({classId:'mago',level:1,xp:300,base:stats,origin:{},armor:'none'}),next=advanceCharacter(c,'guerreiro',{hpRoll:3});assert.equal(derive(next).hpMax,13);assert.equal(next.hpRolls[0].level,1);assert.equal(normalizeImported(next).hpRolls[0].roll,3);assert.equal(classLevel(next,'mago'),1);
});
test('advancement rejects invalid requirements, unearned ASI, missing subclass and total above 20',()=>{
 const c=newCharacter({classId:'mago',base:{...stats,str:8,dex:8},origin:{}});assert.throws(()=>advanceCharacter(c,'guerreiro'));
 assert.throws(()=>advanceCharacter(newCharacter({base:stats,origin:{}}),'guerreiro',{increases:{str:2}}));
 assert.throws(()=>advanceCharacter(newCharacter({level:2,base:stats,origin:{}}),'guerreiro'));
 assert.throws(()=>advanceCharacter(newCharacter({level:20,base:stats,origin:{}}),'mago'));
 assert.throws(()=>updateClassPlan(newCharacter({base:stats,origin:{}}),[{classId:'guerreiro',level:15},{classId:'mago',level:6}]));
});

test('XP official is required in the core before advancing and class editor cannot grant levels',()=>{
 const c=newCharacter({classId:'guerreiro',base:stats,origin:{}});
 assert.equal(c.xp,0);
 assert.throws(()=>advanceCharacter(c,'guerreiro'),/XP insuficiente/i);
 assert.throws(()=>updateClassPlan(c,[{classId:'guerreiro',level:2}]),/progressão de nível/i);
 assert.throws(()=>updateClassPlan(c,[{classId:'guerreiro',level:1},{classId:'mago',level:1}]),/progressão de nível/i);
 const ready=newCharacter({classId:'guerreiro',xp:300,base:stats,origin:{}});
 assert.equal(advanceCharacter(ready,'guerreiro').level,2);
});

test('custom weapons calculate attribute, magic, proficiency, critical damage and weight',()=>{
 const w=normalizeWeapon({custom:{name:'Lâmina Astral',dice:'2d6',type:'Psíquico',weight:3,simple:false},magic:1,ability:'int',proficiency:'yes',attackBonus:2,damageBonus:3}),c=newCharacter({level:5,base:{...stats,int:18},origin:{},weapons:[w],items:[],armor:'none'}),a=attackStats(c,w);assert.equal(a.attack,10);assert.equal(a.formula,'2d6+8');assert.equal(derive(c).weight,3);assert.equal(roll(a.formula,{critical:true,random:()=>3}).total,20);assert.throws(()=>normalizeWeapon({custom:{name:'Bad',dice:'1d6;alert(1)'}}));assert.throws(()=>normalizeWeapon({custom:{name:'Bad',dice:'99d100'}}));
});
test('custom items keep descriptions, attunement, charges and configured recovery',()=>{
 const item=normalizeItem({name:'Lanterna Lunar',qty:2,weight:.5,description:'Ilumina 6 m.',rarity:'Raro',attunement:true,attuned:true,maxCharges:3,charges:1,recovery:'long'}),c=newCharacter({items:[item]});assert.equal(finishRest(c).character.items[0].charges,1);assert.equal(finishRest(c,{long:true}).character.items[0].charges,3);assert.equal(normalizeImported(c).items[0].description,'Ilumina 6 m.');
});
test('old character imports and local migrations retain identity, portraits and custom equipment safely',()=>{
 const old=newCharacter({level:5,subclass:'Campeão',usedHD:2}),local=normalizeImported(old,{preserveId:true});assert.equal(local.id,old.id);assert.equal(hitDicePools(local)[0].remaining,3);assert.notEqual(normalizeImported(old).id,old.id);
 const portrait='data:image/png;base64,aGVsbG8=';assert.equal(validPortrait(portrait),portrait);assert.equal(validPortrait('data:image/svg+xml;base64,aGVsbG8='),'');assert.equal(validPortrait('javascript:alert(1)'),'');const withPhoto=normalizeImported({...old,portrait});assert.equal(withPhoto.portrait,portrait);
});
test('portrait file rules reject unsupported types, empty files and oversized images',()=>{
 assert.doesNotThrow(()=>validatePortraitFile({type:'image/png',size:400000}));assert.throws(()=>validatePortraitFile({type:'image/svg+xml',size:100}));assert.throws(()=>validatePortraitFile({type:'image/jpeg',size:0}));assert.throws(()=>validatePortraitFile({type:'image/webp',size:13*1024*1024}));
 assert.deepEqual(portraitDimensions(1800,1200),{width:900,height:600});assert.deepEqual(portraitDimensions(500,800),{width:500,height:800});assert.throws(()=>portraitDimensions(9000,9000));assert.throws(()=>portraitDimensions(0,200));
});
test('a complete multiclass JSON round trip preserves custom equipment and portrait framing',()=>{
 const c=multi([{classId:'guerreiro',level:3,subclass:'Campeão'},{classId:'mago',level:2}],{portrait:'data:image/png;base64,aGVsbG8=',portraitPosition:0,weapons:[normalizeWeapon({custom:{name:'Arma própria',dice:'1d8',type:'Radiante',weight:2,simple:true},ability:'int'})],items:[normalizeItem({name:'Item próprio',description:'Texto completo',maxCharges:4,charges:2,recovery:'short'})],spellClasses:{'12':['mago']},slotsUsed:[1],hpRolls:[{classId:'mago',level:1,roll:5}]});const copied=normalizeImported(JSON.parse(JSON.stringify(c)));assert.deepEqual(copied.classes,c.classes);assert.deepEqual(copied.weapons,c.weapons);assert.deepEqual(copied.items,c.items);assert.equal(copied.portrait,c.portrait);assert.equal(copied.portraitPosition,0);assert.deepEqual(copied.spellClasses,c.spellClasses);assert.equal(derive(copied).hpMax,derive(c).hpMax);
});

test('legacy preparation and level corrections cannot grant higher class spells from combined slots',()=>{
 const c=multi([{classId:'mago',level:1},{classId:'clerigo',level:5,subclass:'Domínio da Vida'}],{prepared:['fire'],spellClasses:{fire:['mago']}}),spell={id:'fire',name:'Bola de Fogo',level:3,classes:['Mago']};assert.equal(derive(c).standardSlots.counts.length,3);assert.deepEqual(preparationClassIds(c,spell),[]);delete c.spellClasses.fire;assert.deepEqual(preparationClassIds(c,spell),[]);c.spellClasses.fire=['clerigo'];assert.deepEqual(preparationClassIds(c,spell),['clerigo']);
});

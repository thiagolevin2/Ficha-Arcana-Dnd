import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {CLASSES,SPECIES,BACKGROUNDS} from '../dist/data.js';
import {SUPPLEMENT_OPTIONS,SOURCE_META,EXPANSION_SUMMARY} from '../dist/compatibility.js';
import {newCharacter,normalizeImported,derive,preparedLimit,slotInfo} from '../dist/core.js';
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url),'utf8'));
const catalog=read('../dist/supplement-catalog.json');

test('2024 class and species rules remain authoritative after supplements are applied',()=>{
 const base=read('../data/phb2024-data.json');
 for(const [id,cl] of Object.entries(base.classes)){
  for(const [key,value] of Object.entries(cl))if(key!=='subclasses')assert.deepEqual(CLASSES[id][key],value,id+' '+key);
  assert.deepEqual(CLASSES[id].subclasses.slice(0,cl.subclasses.length),cl.subclasses);
 }
 for(const [id,sp] of Object.entries(base.species))assert.deepEqual(SPECIES[id],sp);
 assert.deepEqual(BACKGROUNDS,base.backgrounds);
 assert.equal(Object.keys(CLASSES).length,13);
 assert.equal(Object.keys(SPECIES).length,110);
 for(const cl of Object.values(CLASSES))assert.ok(existsSync(new URL('../dist/assets/'+cl.art+'.jpg',import.meta.url)));
});

test('catalog identities are unique, superseded options cannot be selected, and text is renderable',()=>{
 assert.equal(new Set(catalog.map(e=>e.id)).size,catalog.length);
 for(const e of catalog){
  if(e.status?.startsWith('superseded'))assert.equal(e.selectable,false,e.name);
  if(e.kind==='species'&&e.selectable){assert.ok(e.traits.every(t=>typeof t==='string'));assert.ok(e.traits.every(t=>!/^(?:Aumento|Incremento|Aprimoramento).*(?:atributo|habilidade)/i.test(t)),e.name);}
 }
 for(const e of SUPPLEMENT_OPTIONS.filter(e=>e.kind==='subclass'&&e.selectable!==false)){
  assert.ok(CLASSES[e.classId].subclasses.includes(e.name),e.name);
  assert.ok(e.features.every(f=>f.level>=3),e.name);
 }
});

test('canonical spell descriptions are immutable and summon families stay distinct',()=>{
 const original=read('../data/phb2024-spells.json'),current=read('../dist/spells.json');
 assert.equal(original.length,391);assert.equal(current.length,424);
 for(const old of original){const now=current.find(s=>s.id===old.id);for(const [key,value]of Object.entries(old))if(key!=='classes')assert.deepEqual(now[key],value,old.name+' '+key);assert.ok(old.classes.every(c=>now.classes.includes(c)));}
 for(const name of ['Invocar Celestial','Convocar Celestial'])assert.ok(current.find(s=>s.name===name),name);
 const old=catalog.find(e=>e.source==='tasha'&&e.kind==='spell'&&e.name==='Invocar Celestial');
 assert.equal(old.selectable,false);assert.equal(old.supersededBy.name,'Convocar Celestial');
 for(const [name,target,level] of [['Invocar Celestial','Convocar Celestial',5],['Invocar Elemental','Convocar Elemental',4],['Invocar Feérico','Convocar Feérico',3]]){const legacy=catalog.find(e=>e.source==='tasha'&&e.kind==='spell'&&e.name===name);assert.equal(legacy.supersededBy.name,target);const applied=current.find(s=>s.id===legacy.supersededBy.id);assert.equal(applied.level,level);assert.match(applied.text,/Espírito/);}
});

test('supplement origin never adds racial ability bonuses and importing retains saved choices',()=>{
 const species=catalog.find(e=>e.kind==='species'&&e.name==='Dhampiro'&&e.selectable),option=catalog.find(e=>e.kind==='feat'&&e.selectable);
 const c=newCharacter({classId:'artifice',speciesId:species.id,level:5,selectedOptions:[option.id],base:{str:8,dex:14,con:13,int:15,wis:12,cha:10},origin:{int:2,con:1},subclass:'Armeiro'});
 const d=derive(c);assert.equal(d.sc.int,17);assert.equal(d.sc.con,14);assert.equal(preparedLimit(c),5);assert.deepEqual(slotInfo(c).counts,[4,2]);
 const imported=normalizeImported(JSON.parse(JSON.stringify(c)));assert.equal(imported.speciesId,species.id);assert.equal(imported.subclass,'Armeiro');assert.deepEqual(imported.selectedOptions,[option.id]);assert.equal(derive(imported).hpMax,d.hpMax);
 assert.deepEqual(slotInfo(newCharacter({classId:'artifice',level:1})).counts,[2]);
});

test('all provided source pages are indexed once with experimental provenance',()=>{
 const pages=read('../dist/supplement-pages.json');
 assert.equal(SOURCE_META.length,10);assert.equal(pages.length,509);assert.equal(EXPANSION_SUMMARY.indexedPageCount,490);assert.equal(EXPANSION_SUMMARY.duplicates.length,1);
 assert.equal(new Set(pages.map(p=>p.id)).size,pages.length);
 for(const p of pages)assert.ok(SOURCE_META.some(s=>s.id===p.source));
 for(const e of catalog.filter(e=>e.source.startsWith('ua-')))assert.equal(e.playtest,true,e.name);
});

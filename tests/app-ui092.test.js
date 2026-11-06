import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {newCharacter} from '../docs/core.js';
import {INFUSIONS} from '../docs/rules092.js';

test('simulação de interface 0.9.2: infusões, maestrias e magias de ancestralidade navegáveis',async()=>{
 const character=newCharacter({classId:'artifice',level:10,name:'Mestre Artífice',speciesId:'elfo',variant:'Drow'});
 character.armor='malha';
 const storage={arcana2024:JSON.stringify({version:3,characters:[character],activeId:character.id,history:[]})};
 globalThis.localStorage={getItem:k=>storage[k]||null,setItem:(k,v)=>{storage[k]=v;}};
 const els={},events={};
 globalThis.document={documentElement:{dataset:{}},body:{style:{}},activeElement:{isConnected:false},querySelector:key=>els[key]??={innerHTML:'',value:'',checked:false,focus(){},setSelectionRange(){},firstChild:null},querySelectorAll:()=>[],addEventListener:(kind,fn)=>(events[kind]??=[]).push(fn)};
 globalThis.window={scrollTo(){},print(){}};
 globalThis.requestAnimationFrame=()=>{};
 globalThis.fetch=async url=>({ok:true,json:async()=>JSON.parse(await fs.readFile(new URL('../docs/'+url,import.meta.url),'utf8'))});
 await import('../docs/app.js');
 async function click(action,data={}){const ev={target:{closest:()=>({disabled:false,dataset:{action,...data}})},preventDefault(){}};for(const fn of events.click||[])await fn(ev);}
 await click('navigate',{view:'inventory'});
 assert.match(els['#app'].innerHTML,/Criar infusões/);
 await click('095-inventory-tab',{tab:'infusions'});
 assert.match(els['#app'].innerHTML,/Infusões · Artífice/);
 await click('infusion-learn-dialog');assert.match(els['#modal-root'].innerHTML,/Defesa Aprimorada/);
 const infusion=INFUSIONS.find(x=>x.name==='Defesa Aprimorada');await click('infusion-learn-toggle',{id:infusion.id});
 assert.equal(JSON.parse(storage.arcana2024).characters[0].knownInfusions.length,1);
 await click('infusion-bind-dialog');document.querySelector('#infusion-choice').value=infusion.id;document.querySelector('#infusion-target').value='armor';await click('infusion-bind-confirm');
 assert.equal(JSON.parse(storage.arcana2024).characters[0].activeInfusions.length,1);
 await click('navigate',{view:'spells'});
 assert.match(els['#app'].innerHTML,/Magias por talentos, espécies/);
 assert.match(els['#app'].innerHTML,/Luzes Dançantes/);
 await click('navigate',{view:'inventory'});
 assert.match(els['#app'].innerHTML,/Mochila/);
});

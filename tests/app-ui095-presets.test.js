import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {newCharacter} from '../docs/core.js';

test('0.9.5: classe com companheiro recebe sugestão sem estatísticas inventadas',async()=>{
 const c=newCharacter({name:'Ranger',classId:'guardiao',subclass:'Senhor das Feras',level:5});
 const storage={arcana2024:JSON.stringify({version:3,characters:[c],activeId:c.id,history:[]}), 'arcana-dice3d':'off'}, els={}, events={};
 globalThis.localStorage={getItem:k=>storage[k]??null,setItem:(k,v)=>storage[k]=v};
 globalThis.document={documentElement:{dataset:{}},body:{style:{}},activeElement:{isConnected:false},querySelector:key=>els[key]??={innerHTML:'',value:'',checked:false,focus(){},setSelectionRange(){},firstChild:null},querySelectorAll:()=>[],addEventListener:(kind,fn)=>(events[kind]??=[]).push(fn)};
 globalThis.window={scrollTo(){},print(){},confirm:()=>true};globalThis.requestAnimationFrame=()=>{};
 globalThis.fetch=async url=>({ok:true,json:async()=>JSON.parse(await fs.readFile(new URL('../docs/'+url,import.meta.url),'utf8'))});
 await import('../docs/app.js?ui095presets');
 const click=async(action,data={})=>{const event={target:{closest:()=>({disabled:false,dataset:{action,...data}})},preventDefault(){}};for(const fn of events.click||[])await fn(event);};
 await click('navigate',{view:'companions'});
 assert.match(els['#app'].innerHTML,/Sugestões concedidas por sua classe/);
 assert.match(els['#app'].innerHTML,/data-id="beast"/);
 await click('095-companion-preset',{id:'beast'});
 assert.match(els['#modal-root'].innerHTML,/value="Companheiro Fera"/);
 assert.match(els['#modal-root'].innerHTML,/Guardião · Senhor das Feras/);
 assert.match(els['#modal-root'].innerHTML,/095-companion-damage/);
});

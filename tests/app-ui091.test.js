import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {newCharacter} from '../docs/core.js';

test('simulação sem navegador: hub, recursos, seleção arcana, magias, inventário e importação',async()=>{
 const character=newCharacter({classId:'bruxo',level:11,name:'Teste Arcano'});
 character.armor='none';character.speciesId='supp-races-large-species-tortle';
 const storage={arcana2024:JSON.stringify({version:3,characters:[character],activeId:character.id,history:[]})};
 globalThis.localStorage={getItem:k=>storage[k]||null,setItem:(k,v)=>{storage[k]=v;}};
 const els={},events={};
 globalThis.document={documentElement:{dataset:{}},body:{style:{}},activeElement:{isConnected:false},querySelector:key=>els[key]??={innerHTML:'',value:'',focus(){},setSelectionRange(){},firstChild:null},addEventListener:(kind,fn)=>(events[kind]??=[]).push(fn)};
 globalThis.window={scrollTo(){},print(){}};
 globalThis.requestAnimationFrame=()=>{};
 globalThis.fetch=async url=>({ok:true,json:async()=>JSON.parse(await fs.readFile(new URL('../docs/'+url,import.meta.url),'utf8'))});
 await import('../docs/app.js');
 assert.match(els['#app'].innerHTML,/Teste Arcano/);
 async function click(action,data={}){const t={target:{closest:()=>({disabled:false,dataset:{action,...data}})},preventDefault(){}};for(const h of events.click||[])await h(t);}
 await click('navigate',{view:'resources'});
 assert.match(els['#app'].innerHTML,/Regras avançadas/);
 assert.match(els['#app'].innerHTML,/Arcano Místico/);
 await click('arcanum-picker',{circle:'6'});
 assert.match(els['#modal-root'].innerHTML,/Arcano Místico/);
 await click('modal-close');
 await click('navigate',{view:'spells'});
 assert.match(els['#app'].innerHTML,/Conjuração|magia|Magias/i);
 await click('navigate',{view:'inventory'});
 assert.match(els['#app'].innerHTML,/sintonizaç|Sintonizaç/i);
});

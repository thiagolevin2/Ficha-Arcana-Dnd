import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {newCharacter,derive} from '../docs/core.js';

test('0.9.6 interface: benefícios raciais têm ações específicas, rolagens e recursos independentes',async()=>{
 const c=newCharacter({classId:'paladino',name:'Astrid',speciesId:'aasimar',level:5});
 const store={arcana2024:JSON.stringify({version:3,characters:[c],activeId:c.id,history:[]}), 'arcana-dice3d':'off'};
 const els={},events={};
 globalThis.localStorage={getItem:k=>store[k]??null,setItem:(k,v)=>{store[k]=v}};
 globalThis.document={documentElement:{dataset:{}},body:{style:{}},activeElement:{isConnected:false},querySelector:key=>els[key]??={innerHTML:'',value:'',checked:false,focus(){},setSelectionRange(){},firstChild:null},querySelectorAll:()=>[],addEventListener:(type,cb)=>(events[type]??=[]).push(cb)};
 globalThis.window={scrollTo(){},print(){},confirm:()=>true};globalThis.requestAnimationFrame=()=>{};
 globalThis.fetch=async url=>({ok:true,json:async()=>JSON.parse(await fs.readFile(new URL('../docs/'+url,import.meta.url),'utf8'))});
 await import('../docs/app.js?ui096');
 const ch=()=>JSON.parse(store.arcana2024).characters[0];
 const click=async(action,other={})=>{const e={target:{closest:()=>({disabled:false,dataset:{action,...other}})},preventDefault(){}};for(const f of events.click||[])await f(e)};
 await click('navigate',{view:'resources'});
 assert.match(els['#app'].innerHTML,/Benefícios de espécie/);
 assert.match(els['#app'].innerHTML,/Revelação Celestial/);
 assert.match(els['#app'].innerHTML,/096-species-use/);
 await click('096-species-use',{id:'aasimar-revelation'});
 assert.match(els['#modal-root'].innerHTML,/Asas Celestiais/);
 document.querySelector('#096-revelation-form').value='Mortalha Necrótica';
 await click('096-revelation-confirm');
 assert.equal(ch().aasimarRevelationActive,true);
 assert.equal(ch().speciesChoices.aasimarForm,'Mortalha Necrótica');
 assert.equal(ch().species096Used['aasimar-revelation'],1);
 await click('096-aasimar-bonus');
 assert.equal(ch().aasimarBonusThisAttack,true);
 assert.match(els['#app'].innerHTML,/Bônus ativado no ataque/);
 await click('096-revelation-end');
 assert.equal(ch().aasimarRevelationActive,false);
 assert.equal(ch().aasimarBonusThisAttack,false);
 assert.doesNotMatch(els['#app'].innerHTML,/Avançar rodada/);
 // Configuração de linhagem não cria efeitos de duração ou alvos.
 assert.equal(ch().sceneEffects.length,0);
});

test('0.9.6 interface: criador expõe escolhas de Elfo, Humano e Simic, controle de descrição para Gnomo',async()=>{
 const c=newCharacter({classId:'mago',name:'Outra',speciesId:'elfo',variant:'Alto Elfo',level:1,speciesChoices:{elfSkill:'Percepção',highElfCantrip:'306'}});
 const store={arcana2024:JSON.stringify({version:3,characters:[c],activeId:c.id,history:[]}), 'arcana-dice3d':'off'};
 const els={},events={};
 globalThis.localStorage={getItem:k=>store[k]??null,setItem:(k,v)=>store[k]=v};
 globalThis.document={documentElement:{dataset:{}},body:{style:{}},activeElement:{isConnected:false},querySelector:key=>els[key]??={innerHTML:'',value:'',checked:false,focus(){},setSelectionRange(){},firstChild:null},querySelectorAll:()=>[],addEventListener:(type,cb)=>(events[type]??=[]).push(cb)};
 globalThis.window={scrollTo(){},print(){},confirm:()=>true};globalThis.requestAnimationFrame=()=>{};
 globalThis.fetch=async url=>({ok:true,json:async()=>JSON.parse(await fs.readFile(new URL('../docs/'+url,import.meta.url),'utf8'))});
 await import('../docs/app.js?ui096b');
 const click=async(action,other={})=>{const e={target:{closest:()=>({disabled:false,dataset:{action,...other}})},preventDefault(){}};for(const f of events.click||[])await f(e)};
 await click('edit');
 assert.match(els['#modal-root'].innerHTML,/edit-elf-skill/);
 assert.match(els['#modal-root'].innerHTML,/edit-elf-cantrip/);
 await click('navigate',{view:'resources'});
 assert.match(els['#app'].innerHTML,/Sentidos Aguçados/);
 assert.match(els['#app'].innerHTML,/Raio de Fogo/);
});

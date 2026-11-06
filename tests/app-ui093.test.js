import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {newCharacter,normalizeItem} from '../docs/core.js';

test('0.9.5: interface simplificada de transformações, companheiros e itens salva corretamente',async()=>{
 const c=newCharacter({name:'Luna',classId:'druida',subclass:'Círculo da Lua',level:5,speciesId:'aasimar'});
 c.items.push(normalizeItem({name:'Anel de proteção',qty:1,equipped:true,maxCharges:3,charges:3}));
 const storage={arcana2024:JSON.stringify({version:3,characters:[c],activeId:c.id,history:[]}), 'arcana-dice3d':'off'},els={},events={};
 globalThis.localStorage={getItem:k=>storage[k]??null,setItem:(k,v)=>storage[k]=v};
 globalThis.document={documentElement:{dataset:{}},body:{style:{}},activeElement:{isConnected:false},querySelector:key=>els[key]??={innerHTML:'',value:'',checked:false,focus(){},setSelectionRange(){},firstChild:null},querySelectorAll:()=>[],addEventListener:(kind,fn)=>(events[kind]??=[]).push(fn)};
 globalThis.window={scrollTo(){},print(){},confirm:()=>true};globalThis.requestAnimationFrame=()=>{};
 globalThis.fetch=async url=>({ok:true,json:async()=>JSON.parse(await fs.readFile(new URL('../docs/'+url,import.meta.url),'utf8'))});
 await import('../docs/app.js?ui093updated');
 async function click(action,data={}){const ev={target:{closest:()=>({disabled:false,dataset:{action,...data}})},preventDefault(){}};for(const fn of events.click||[])await fn(ev);}
 const ch=()=>JSON.parse(storage.arcana2024).characters[0];
 await click('navigate',{view:'resources'});assert.match(els['#app'].innerHTML,/Poderes de espécie, linhagem, talentos e subclasses/);
 assert.match(els['#app'].innerHTML,/data-tab="transforms"/);
 assert.doesNotMatch(els['#app'].innerHTML,/Cena, concentração e efeitos/);
 await click('095-resources-tab',{tab:'transforms'});assert.match(els['#app'].innerHTML,/Forma Selvagem/);
 await click('093-wild-dialog');document.querySelector('#093-wild-name').value='Urso';document.querySelector('#093-wild-ac').value='12';document.querySelector('#093-wild-speed').value='12';document.querySelector('#093-wild-attack').value='Garra';await click('093-wild-create');
 assert.equal(ch().activeForm.name,'Urso');assert.equal(ch().resourceUsed.wild,1);
 await click('navigate',{view:'companions'});assert.match(els['#app'].innerHTML,/Companheiros da jornada/);
 await click('093-companion-dialog');document.querySelector('#095-companion-name').value='Familiar corvo';document.querySelector('#095-companion-kind').value='familiar';document.querySelector('#095-companion-source').value='Invocar Familiar';document.querySelector('#095-companion-ac').value='12';document.querySelector('#095-companion-hpmax').value='3';document.querySelector('#095-companion-hp').value='3';document.querySelector('#095-companion-speed').value='9';document.querySelector('#095-companion-attack').value='Bico';document.querySelector('#095-companion-bonus').value='3';document.querySelector('#095-companion-damage').value='1d4+1';document.querySelector('#095-companion-notes').value='Amigo';await click('095-companion-save',{id:'new'});
 assert.equal(ch().companions.length,1);assert.equal(ch().companions[0].damageFormula,'1d4+1');
 await click('navigate',{view:'inventory'});assert.match(els['#app'].innerHTML,/Itens mágicos e seus poderes/);
 const id=ch().items.at(-1).id;await click('093-item-power-dialog',{id});
 document.querySelector('#093-item-power-name').value='Cura ativável';document.querySelector('#093-item-power-cost').value='1';document.querySelector('#095-item-effect-mode').value='healing';document.querySelector('#095-item-effect-formula').value='7';document.querySelector('#093-item-power-damage-type').value='Radiante';document.querySelector('#093-item-power-note').value='Escolha o alvo';await click('093-item-power-save',{id});
 await click('095-item-use',{id});assert.equal(ch().items.at(-1).charges,2);assert.equal(ch().sceneEffects.length,0);
});

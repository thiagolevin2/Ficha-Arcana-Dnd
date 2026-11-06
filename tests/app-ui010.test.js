import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {newCharacter,normalizeImported} from '../docs/core.js';

// Eventos reais do aplicativo com DOM reduzido. A inspeção visual é feita à parte.
let sequence=0;
async function interfaceFor(c){
 const storage={arcana2024:JSON.stringify({version:3,characters:[c],activeId:c.id,history:[]}), 'arcana-dice3d':'off'},els={},events={};
 const element=key=>els[key]??={innerHTML:'',value:'',checked:false,focus(){},setSelectionRange(){},firstChild:null};
 globalThis.localStorage={getItem:k=>storage[k]??null,setItem:(k,v)=>{storage[k]=v;}};
 globalThis.document={documentElement:{dataset:{}},body:{style:{}},activeElement:{isConnected:false},getElementById:id=>element('#'+id),querySelector:key=>{if(/^#\d/.test(key))throw new SyntaxError('Seletor CSS numérico inválido');return element(key);},querySelectorAll:()=>[],addEventListener:(kind,fn)=>(events[kind]??=[]).push(fn)};
 globalThis.window={scrollTo(){},print(){},confirm:()=>true};globalThis.requestAnimationFrame=()=>{};
 globalThis.fetch=async url=>({ok:true,json:async()=>JSON.parse(await fs.readFile(new URL('../docs/'+url,import.meta.url),'utf8'))});
 await import('../docs/app.js?ui010-'+(++sequence));
 return {els,storage,ch:()=>JSON.parse(storage.arcana2024).characters[0],set:(id,value)=>{element('#'+id).value=value;},async click(action,data={}){const e={target:{closest:()=>({disabled:false,dataset:{action,...data}})},preventDefault(){}};for(const fn of events.click||[])await fn(e);},async input(id,value,dataset={}){const target={id,value,dataset,selectionStart:0};for(const fn of events.input||[])await fn({target});},async change(id,value,dataset={}){const target={id,value,checked:!!value,dataset};for(const fn of events.change||[])await fn({target});}};
}
function mage(id='306'){
 const c=newCharacter({name:'Lia',classId:'mago',speciesId:'aasimar',level:5,armor:'none'});c.armor='none';c.knownSpellsByClass.mago=[id];return c;
}
async function customAttack(ui,id='306'){
 await ui.click('cast-dialog',{id});assert.match(ui.els['#modal-root'].innerHTML,/095-spell-damage-type/);
 ui.set('cast-source','class:mago');ui.set('095-spell-mode','attack');ui.set('095-spell-formula','7d6+9');ui.set('095-spell-ability','int');ui.set('095-spell-damage-type','Radiante');
 await ui.click('cast-confirm',{id});assert.match(ui.els['#modal-root'].innerHTML,/attack-damage/);
}

test('0.10 interface: fórmula personalizada chega ao dano e à repetição, sem erro de seletor numérico',async()=>{
 const ui=await interfaceFor(mage()),hp=ui.ch().hp;
 await customAttack(ui);await ui.click('attack-damage');
 assert.match(ui.els['#modal-root'].innerHTML,/(?:7|14)d6\+9/);assert.match(ui.els['#modal-root'].innerHTML,/Radiante/);assert.doesNotMatch(ui.els['#modal-root'].innerHTML,/1d10/);
 await ui.click('damage-reroll');assert.match(ui.els['#modal-root'].innerHTML,/(?:7|14)d6\+9/);assert.equal(ui.ch().hp,hp);assert.equal(ui.ch().spellRolls['306'].type,'Radiante');
});
test('0.10 interface: magia sem fórmula pronta usa a configuração, sem substituir por 1d6',async()=>{
 const ui=await interfaceFor(mage('130'));await customAttack(ui,'130');await ui.click('attack-damage');
 assert.match(ui.els['#modal-root'].innerHTML,/(?:7|14)d6\+9/);assert.doesNotMatch(ui.els['#modal-root'].innerHTML,/1d6/);
});
test('0.10 interface: macro consulta a mesma fórmula e tipo de magia personalizada',async()=>{
 const ui=await interfaceFor(mage());await customAttack(ui);await ui.click('modal-close');
 await ui.click('navigate',{view:'sheet'});await ui.click('sheet-tab',{tab:'combat'});await ui.click('combat-tab',{tab:'macros'});
 await ui.click('macro-new');ui.set('macro-name','Raio customizado');ui.set('macro-base','spell:306');await ui.click('macro-save');
 const c=ui.ch();assert.equal(c.combatMacros.length,1);assert.match(ui.els['#app'].innerHTML,/(?:7|14)d6\+9/);
 await ui.click('macro-run',{id:c.combatMacros[0].id});await ui.click('attack-damage');assert.match(ui.els['#modal-root'].innerHTML,/(?:7|14)d6\+9/);assert.match(ui.els['#modal-root'].innerHTML,/Radiante/);assert.equal(ui.ch().hp,c.hp);assert.deepEqual(ui.ch().slotsUsed,c.slotsUsed);
});
test('0.10 interface: Mestre da Batalha configura escolhas, usa manobra e recupera Conheça Seu Inimigo',async()=>{
 const c=newCharacter({name:'Bruna',classId:'guerreiro',subclass:'Mestre da Batalha',speciesId:'aasimar',level:7,skills:[],base:{str:14,dex:18,con:14,int:10,wis:12,cha:10}});
 const ui=await interfaceFor(c);await ui.click('navigate',{view:'resources'});assert.match(ui.els['#app'].innerHTML,/Mestre da Batalha/);assert.match(ui.els['#app'].innerHTML,/Conheça Seu Inimigo/);
 for(const n of [1,6,20])await ui.click('advanced-toggle',{kind:'maneuver',id:'phb2024-maneuver-'+n});
 assert.match(ui.els['#app'].innerHTML,/data-action="010-battle-maneuver"[^>]+data-id="phb2024-maneuver-1"/);
 await ui.click('010-battle-choices');ui.set('010-battle-skill','História');ui.set('010-battle-artisan','Ferramentas de Ferreiro');ui.set('010-battle-ability','dex');await ui.click('010-battle-choices-save');
 assert.equal(ui.ch().battleMaster.skill,'História');await ui.click('010-battle-maneuver',{id:'phb2024-maneuver-1'});ui.set('010-battle-maneuver-select','phb2024-maneuver-1');await ui.click('010-battle-maneuver-confirm');
 assert.match(ui.els['#modal-root'].innerHTML,/1d8\+4/);assert.equal(ui.ch().resourceUsed.superiority,1);
 await ui.click('010-battle-enemy');assert.equal(ui.ch().resourceUsed.knowyourenemy,1);await ui.click('010-battle-enemy-restore');assert.equal(ui.ch().resourceUsed.knowyourenemy,0);assert.equal(ui.ch().resourceUsed.superiority,2);assert.equal(ui.ch().sceneEffects.length,0);
});
test('0.10 interface: custo inicial só aparece na compra de pontos e se atualiza ao digitar',async()=>{
 const ui=await interfaceFor(mage());await ui.click('new');await ui.input('wiz-name','Custo inicial');await ui.click('wizard-next');await ui.click('wizard-species',{key:'aasimar'});await ui.click('wizard-next');
 assert.match(ui.els['#modal-root'].innerHTML,/0\/6 atributos/);assert.match(ui.els['#modal-root'].innerHTML,/Não distribuído/);assert.doesNotMatch(ui.els['#modal-root'].innerHTML,/594|Total: 10/);
 await ui.click('wizard-points');assert.match(ui.els['#modal-root'].innerHTML,/>0<\/span> \/ 27 pontos/);await ui.input('wiz-base-str','15',{wizBase:'str'});
 assert.match(ui.els['#wizard-attribute-status'].innerHTML,/>9<\/span> \/ 27 pontos/);assert.equal(ui.els['#wiz-total-str'].textContent,'Total: 15');
 await ui.click('wizard-standard');assert.match(ui.els['#modal-root'].innerHTML,/Conjunto padrão/);assert.doesNotMatch(ui.els['#modal-root'].innerHTML,/\/ 27 pontos/);
 await ui.click('wizard-roll');assert.match(ui.els['#modal-root'].innerHTML,/Rolagem 4d6/);assert.doesNotMatch(ui.els['#modal-root'].innerHTML,/\/ 27 pontos/);
});
test('0.10 interface: janela de talento destaca o pré-requisito completo para conferência',async()=>{
 const ui=await interfaceFor(mage());await ui.click('feat-detail',{id:'phb2024-feat-28'});
 assert.match(ui.els['#modal-root'].innerHTML,/feat-modal-glow/);assert.match(ui.els['#modal-root'].innerHTML,/Pré-requisitos · conferência do jogador/);assert.match(ui.els['#modal-root'].innerHTML,/Armadura Média/);
});
test('0.10 interface: configuração importada sem fórmula não impede abrir o combate',async()=>{
 const c=mage();c.spellRolls={'306':{mode:'attack',formula:'script()',type:'Radiante'}};const ui=await interfaceFor(c);
 await ui.click('navigate',{view:'sheet'});await ui.click('sheet-tab',{tab:'combat'});await ui.click('combat-tab',{tab:'spells'});assert.match(ui.els['#app'].innerHTML,/Raio de Fogo/);assert.match(ui.els['#app'].innerHTML,/Rolagem opcional/);
});


test('0.10 interface: Economias abre, calcula o tesouro e não gera ReferenceError de economyEntries',async()=>{
 const ui=await interfaceFor(mage());
 await ui.click('navigate',{view:'economy'});
 assert.match(ui.els['#app'].innerHTML,/CONTROLE FINANCEIRO DO PERSONAGEM/);
 assert.match(ui.els['#app'].innerHTML,/Tesouro do personagem/);
 assert.match(ui.els['#app'].innerHTML,/Histórico de ganhos e gastos/);
 assert.doesNotMatch(ui.els['#app'].innerHTML,/economyEntries is not defined/i);
});

test('0.10 interface: grimório coloca magias preparadas primeiro e não oferece filtro exclusivo',async()=>{
 const c=mage();c.knownSpellsByClass.mago=['3','37'];c.spellClasses={'37':['mago']};c.prepared=['37'];
 const ui=await interfaceFor(c);await ui.click('navigate',{view:'spells'});
 const html=ui.els['#app'].innerHTML;
 assert.ok(html.indexOf('Bola de Fogo')<html.indexOf('Alarme'),'a magia preparada precisa vir antes das demais');
 assert.doesNotMatch(html,/data-action="filter-prepared"|Somente preparadas/);
});

test('0.10: Mochila é uma seção e não é criada ou importada como item',()=>{
 const c=newCharacter({classId:'guerreiro'});
 assert.equal(c.items.some(i=>i.name.trim().toLowerCase()==='mochila'),false);
 c.items.push({name:'Mochila',qty:1,weight:2});
 const imported=normalizeImported(c);
 assert.equal(imported.items.some(i=>i.name.trim().toLowerCase()==='mochila'),false);
});

test('0.10 interface: itens com descrição somente visual não entram na seção de itens mágicos',async()=>{
 const c=mage();c.items.push({name:'Anel decorativo',qty:1,weight:.1,rarity:'Muito Raro',maxCharges:3,charges:3,description:'Anel de prata com uma gravação antiga.'},{name:'Talismã de aparência mágica',qty:1,weight:.1,rarity:'Raro',description:'Um talismã mágico com runas antigas e acabamento brilhante.'},{name:'Anel de proteção',qty:1,weight:.1,description:'Concede +1 na Classe de Armadura.'});
 const ui=await interfaceFor(c);await ui.click('navigate',{view:'inventory'});
 const html=ui.els['#app'].innerHTML,magicSection=html.split('<div class="two-cols">')[0];
 assert.match(magicSection,/Itens mágicos e seus poderes/);
 assert.doesNotMatch(magicSection,/Anel decorativo|Talismã de aparência mágica/);
 assert.match(magicSection,/Anel de proteção/);
});

test('0.10 interface: espécie repetida em suplemento é ocultada em favor da opção do Livro 2024',async()=>{
 const c=mage();c.selectedOptions=['supp-races-large-species-aasimar'];
 const ui=await interfaceFor(c);await ui.click('navigate',{view:'sheet'});await ui.click('sheet-tab',{tab:'features'});
 assert.doesNotMatch(ui.els['#app'].innerHTML,/Escolhas e referências guardadas/);
});

test('0.10 interface: armaduras iniciais aparecem em cartões com CA e treinamento permitido',async()=>{
 const ui=await interfaceFor(mage());
 await ui.click('new');await ui.input('wiz-name','Armadura em cartões');await ui.click('wizard-next');
 await ui.click('wizard-species',{key:'aasimar'});await ui.click('wizard-next');await ui.click('wizard-standard');await ui.change('wiz-origin-str','2');await ui.change('wiz-origin-dex','1');await ui.click('wizard-next');
 const html=ui.els['#modal-root'].innerHTML;
 assert.match(html,/wizard-armor-grid/);
 assert.match(html,/wizard-armor-card/);
 assert.match(html,/data-wiz-armor="none"/);
 assert.match(html,/CA 10/);
 assert.match(html,/wizard-weapon-card/);
});


test('0.10 interface: Tesouro fica em Economias e não ocupa a Mochila',async()=>{
 const ui=await interfaceFor(mage());
 await ui.click('navigate',{view:'inventory'});
 assert.doesNotMatch(ui.els['#app'].innerHTML,/Tesouro do personagem/);
 await ui.click('navigate',{view:'economy'});
 assert.match(ui.els['#app'].innerHTML,/Tesouro do personagem/);
});

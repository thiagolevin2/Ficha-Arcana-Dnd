import test from 'node:test';
import assert from 'node:assert/strict';
import {newCharacter,derive,attackStats,normalizeImported,normalizeWeapon,normalizeCustomArmor,normalizeCustomShield} from '../docs/core.js';

test('custom armor CA bonus and custom shield bonus/weight are applied while equipped',()=>{
  const armor=normalizeCustomArmor({id:'armor-rune',name:'Couraça rúnica',base:14,dex:2,category:'Média',weight:8,bonus:1,effects:'Resistência ígnea'});
  const shield=normalizeCustomShield({id:'shield-rune',name:'Égide lunar',acBonus:3,weight:4,effects:'Brilha sob a lua'});
  const c=newCharacter({classId:'guerreiro',level:1,base:{str:16,dex:14,con:12,int:10,wis:10,cha:10},origin:{},armor:'custom:armor-rune',customArmors:[armor],customShields:[shield],shield:true,shieldId:'shield-rune'});
  const d=derive(c);
  assert.equal(d.ac,20); // 14 + DES 2 + bônus mágico 1 + escudo 3
  assert.equal(d.armor.name,'Couraça rúnica');
  assert.equal(d.shieldData.name,'Égide lunar');
  assert.equal(d.weight,22); // itens iniciais 7,5 kg + armadura 8 kg + escudo 4 kg + armas 2,5 kg; mochila é seção, não item
});

test('untrained custom shield does not add its custom AC bonus',()=>{
  const shield=normalizeCustomShield({id:'shield-rune',name:'Égide',acBonus:5,weight:4});
  const c=newCharacter({classId:'mago',armor:'none',customShields:[shield],shield:true,shieldId:'shield-rune'});
  const d=derive(c);
  assert.equal(d.shieldBonus,0);
  assert.ok(d.warnings.some(x=>x.includes('Escudo sem treinamento')));
});

test('custom weapon supports each requested damage composition',()=>{
  const c=newCharacter({classId:'guerreiro',base:{str:16,dex:12,con:12,int:10,wis:10,cha:10},origin:{}});
  const make=custom=>normalizeWeapon({key:'adaga',magic:0,ability:'auto',proficiency:'yes',custom:{name:'Machado experimental',dice:'1d8',type:'Cortante',simple:false,weight:2,baseKey:'machado grande',...custom}});
  assert.equal(attackStats(c,make({damageMode:'dice'})).formula,'1d8');
  assert.equal(attackStats(c,make({damageMode:'flat',damageFlat:4})).formula,'1d8+4');
  assert.equal(attackStats(c,make({damageMode:'extraDice',damageDice:'1d6'})).formula,'1d8+1d6');
  assert.equal(attackStats(c,make({damageMode:'ability',damageAbility:'auto'})).formula,'1d8+3');
  assert.equal(attackStats(c,make({damageMode:'flatDice',damageFlat:2,damageDice:'1d6'})).formula,'1d8+1d6+2');
  assert.equal(attackStats(c,make({damageMode:'ability',damageAbility:'dex'})).formula,'1d8+1');
});

test('custom equipment and alignment survive JSON export/import',()=>{
  const c=newCharacter({alignment:'Caótico e Bom',armor:'custom:armor-1',customArmors:[{id:'armor-1',name:'Armadura celestial',base:15,dex:2,category:'Média',bonus:2,effects:'Aura'}],customShields:[{id:'shield-1',name:'Escudo celestial',acBonus:3,effects:'Barreira'}],shield:true,shieldId:'shield-1',weapons:[{key:'adaga',custom:{name:'Lâmina Solar',dice:'1d8',type:'Radiante',baseKey:'adaga',damageMode:'flatDice',damageFlat:1,damageDice:'1d4'}}]});
  const imported=normalizeImported(JSON.parse(JSON.stringify(c)));
  assert.equal(imported.alignment,'Caótico e Bom');
  assert.equal(imported.armor,'custom:armor-1');
  assert.equal(imported.customArmors[0].effects,'Aura');
  assert.equal(imported.shieldId,'shield-1');
  assert.equal(imported.customShields[0].effects,'Barreira');
  assert.equal(imported.weapons[0].custom.baseKey,'adaga');
  assert.equal(attackStats(imported,imported.weapons[0]).formula,'1d8+1d4+1');
});

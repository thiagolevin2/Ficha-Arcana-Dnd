import test from 'node:test';
import assert from 'node:assert/strict';
import {newCharacter,derive,attackStats,rollWeaponDamage,weaponAllowedAtCreation,hasOtherLightWeapon} from '../docs/core.js';
import {WEAPONS} from '../docs/data.js';

const base={str:15,dex:14,con:13,int:10,wis:10,cha:10};
const origin={};

test('Arquearia soma +2 no ataque à distância e aparece como efeito ativo',()=>{
 const c=newCharacter({classId:'guerreiro',style:'Arquearia',base,origin,weapons:[{key:'arcolongo'}]});
 const a=attackStats(c,c.weapons[0]);
 assert.equal(a.attack,6);assert.ok(a.activeStyles.some(x=>x.startsWith('Arquearia')));
});

test('Duelismo concede +2 no dano com arma de uma mão e permite escudo',()=>{
 const c=newCharacter({classId:'guerreiro',style:'Duelismo',base,origin,shield:true,offhandEmpty:true,weapons:[{key:'espadalonga'}]});
 const a=attackStats(c,c.weapons[0]);
 assert.equal(a.formula,'1d8+4');assert.equal(a.styleDueling,true);
 c.dualWieldActive=true;
 assert.equal(attackStats(c,c.weapons[0]).styleDueling,false);
});

test('Duelismo não ativa com arma versátil empunhada em duas mãos',()=>{
 const c=newCharacter({classId:'guerreiro',style:'Duelismo',base,origin,weapons:[{key:'espadalonga',two:true}]});
 const a=attackStats(c,c.weapons[0]);
 assert.equal(a.styleDueling,false);assert.equal(a.formula,'1d10+2');
});

test('Combate com Armas de Arremesso acrescenta +2 ao dano do arremesso',()=>{
 const c=newCharacter({classId:'guerreiro',style:'Combate com Armas de Arremesso',base,origin,weapons:[{key:'machadinha'}]});
 const a=attackStats(c,{...c.weapons[0],thrownAttack:true});
 assert.equal(a.formula,'1d6+4');assert.equal(a.styleThrown,true);
});

test('Combate com Duas Armas só adiciona o atributo quando duas armas leves estão empunhadas',()=>{
 const c=newCharacter({classId:'guerreiro',style:'Combate com Duas Armas',base,origin,dualWieldActive:true,weapons:[{key:'adaga'},{key:'machadinha'}]});
 assert.equal(hasOtherLightWeapon(c,0),true);
 const withStyle=attackStats(c,{...c.weapons[0],twoWeaponExtra:true,otherLightWeapon:true});
 assert.equal(withStyle.formula,'1d4+2');assert.equal(withStyle.styleTwoWeapon,true);
 c.style='';c.styles=[];c.feats=[];
 const withoutStyle=attackStats(c,{...c.weapons[0],twoWeaponExtra:true,otherLightWeapon:true});
 assert.equal(withoutStyle.formula,'1d4');assert.equal(withoutStyle.styleTwoWeapon,false);
});

test('Combate com Armas Grandes converte 1 e 2 em 3, inclusive nos dados críticos',()=>{
 const seq=[1,2,5,3];let i=0;
 const normal=rollWeaponDamage('2d6+4',{greatWeapon:true,random:()=>seq[i++]});
 assert.equal(normal.total,10);assert.deepEqual(normal.adjustments.map(x=>x.from),[1,2]);
 const criticalSeq=[1,2,3,4];let j=0;
 const critical=rollWeaponDamage('2d6+4',{critical:true,greatWeapon:true,random:()=>criticalSeq[j++]});
 assert.equal(critical.total,17);assert.deepEqual(critical.adjustments.map(x=>x.to),[3,3]);
});

test('Defensivo soma +1 CA quando o personagem veste uma armadura',()=>{
 const plain=newCharacter({classId:'guerreiro',armor:'malha',base,origin});
 const style=newCharacter({classId:'guerreiro',armor:'malha',style:'Defensivo',base,origin});
 assert.equal(derive(style).ac,derive(plain).ac+1);
});

test('Seleção de equipamento inicial respeita proficiências e exceções de classe',()=>{
 const rogue=newCharacter({classId:'ladino'}),monk=newCharacter({classId:'monge'}),wizard=newCharacter({classId:'mago'}),fighter=newCharacter({classId:'guerreiro'});
 assert.equal(weaponAllowedAtCreation(rogue,{key:'rapieira',...WEAPONS.rapieira}),true);
 assert.equal(weaponAllowedAtCreation(rogue,{key:'montante',...WEAPONS.montante}),false);
 assert.equal(weaponAllowedAtCreation(monk,{key:'cimitarra',...WEAPONS.cimitarra}),true);
 assert.equal(weaponAllowedAtCreation(monk,{key:'machado',...WEAPONS.machado}),false);
 assert.equal(weaponAllowedAtCreation(wizard,{key:'espadagrande',...WEAPONS.espadagrande}),false);
 assert.equal(weaponAllowedAtCreation(fighter,{key:'espadagrande',...WEAPONS.espadagrande}),true);
});

test('Espada Grande consta no catálogo 2024 com dano 2d6 e propriedade de duas mãos',()=>{
 assert.equal(WEAPONS.espadagrande.name,'Espada Grande (Greatsword)');
 assert.equal(WEAPONS.espadagrande.dice,'2d6');
 assert.equal(WEAPONS.espadagrande.twoHanded,true);
 assert.equal(WEAPONS.picareta.two,'1d10'); // propriedade Versátil oficial 2024
});

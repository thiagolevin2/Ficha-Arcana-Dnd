import test from 'node:test';
import assert from 'node:assert/strict';
import {cannotAct,receiveDamage,receiveHealing,resolveDeathSave,syncEffects} from '../docs/rules09.js';
import {newCharacter} from '../docs/core.js';
test('0 PV and temporary hit points trigger death failures',()=>{const c=newCharacter();c.hp=0;c.tempHp=10;c.lifeState='morrendo';const x=receiveDamage(c,5,20);assert.equal(c.death.fail,1);assert.equal(c.tempHp,5);assert.equal(x.absorbed,5);receiveDamage(c,1,20,{critical:true});assert.equal(c.lifeState,'morto');assert.equal(receiveHealing(c,10,20),0)});
test('damage moves to dying and critical death is persistent',()=>{const c=newCharacter();c.hp=4;receiveDamage(c,4,12);assert.equal(c.lifeState,'morrendo');assert.equal(c.conditions.includes('Inconsciente'),true);assert.equal(cannotAct(c),true);resolveDeathSave(c,12,12);resolveDeathSave(c,13,13);resolveDeathSave(c,14,14);assert.equal(c.lifeState,'estavel');resolveDeathSave(c,1,1);assert.equal(c.death.fail,0);assert.equal(receiveHealing(c,2,12),2);assert.equal(c.lifeState,'consciente')});
test('inability ends rage and concentration',()=>{const c=newCharacter({raging:true,concentration:'Marca',conditions:['Paralisado']});syncEffects(c);assert.equal(c.raging,false);assert.equal(c.concentration,null)});

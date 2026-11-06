import test from 'node:test';import assert from 'node:assert/strict';
import {characterAudit} from '../docs/benefits09.js';
import {newCharacter} from '../docs/core.js';
test('audit reports origin bonuses and pending subclasses without inventing automation',()=>{let c=newCharacter({classId:'guerreiro',level:3,subclass:'',backgroundId:'soldado'});const a=characterAudit(c);assert.ok(a.pending.some(x=>x.name.includes('Guerreiro')));c=newCharacter({classId:'mago',backgroundId:'fazendeiro',feats:['Especialista em Armaduras Leves']});assert.ok(characterAudit(c).applied.some(x=>x.name==='Especialista em Armaduras Leves'));c.selectedOptions=['supp-some'];assert.ok(characterAudit(c).manual.some(x=>x.name.includes('supp-some')));});

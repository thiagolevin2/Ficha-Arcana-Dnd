import test from 'node:test';
import assert from 'node:assert/strict';
import { featCategory, featEligibility, grantsFightingStyle, hasFightingStyleFeature, FIGHTING_STYLE_FEATS } from '../docs/feats.js';

test('categoriza as quatro categorias de talentos de 2024', () => {
  assert.equal(featCategory({ summary: 'Talento de Origem. Você recebe...' }), 'Origem');
  assert.equal(featCategory({ summary: 'Talento Geral (Pré-requisito: nível 4 ou superior)' }), 'Geral');
  assert.equal(featCategory({ summary: 'Talento de Estilo de Luta (Pré-requisito: Característica de Estilo de Luta)' }), 'Estilo de Luta');
  assert.equal(featCategory({ summary: 'Talento de Dádiva Épica (Pré-requisito: nível 19 ou superior)' }), 'Dádiva Épica');
});

test('reconhece concessões de Estilo de Luta por Guerreiro, Paladino e Guardião', () => {
  assert.equal(grantsFightingStyle('guerreiro', 1), true);
  assert.equal(grantsFightingStyle('paladino', 2), true);
  assert.equal(grantsFightingStyle('guardiao', 2), true);
  assert.equal(grantsFightingStyle('paladino', 1), false);
  assert.equal(hasFightingStyleFeature({ guerreiro: 0, paladino: 2 }), true);
});

test('bloqueia talentos gerais antes do nível 4 e libera quando atende o nível', () => {
  const feat = { name: 'Atleta', summary: 'Talento Geral (Pré-requisito: nível 4 ou superior, Força ou Destreza 13 ou superior)' };
  assert.equal(featEligibility(feat, { level: 3, abilities: { str: 15 } }).eligible, false);
  assert.equal(featEligibility(feat, { level: 4, abilities: { str: 15 } }).eligible, true);
  assert.equal(featEligibility(feat, { level: 4, abilities: { str: 12, dex: 12 } }).eligible, false);
});

test('mostra os dez talentos de Estilo de Luta do livro de 2024', () => {
  assert.equal(FIGHTING_STYLE_FEATS.length, 10);
  assert.ok(FIGHTING_STYLE_FEATS.includes('Combate Desarmado'));
  assert.ok(FIGHTING_STYLE_FEATS.includes('Luta às Cegas'));
});

test('permite registrar talento de Estilo de Luta no nível de classe que concede a característica', async () => {
  const { newCharacter, advanceCharacter, derive } = await import('../docs/core.js');
  const paladin = newCharacter({ classId: 'paladino', level: 1, xp: 300, armor: 'malha' });
  const advanced = advanceCharacter(paladin, 'paladino', { fightingStyle: 'Defensivo' });
  assert.equal(advanced.level, 2);
  assert.ok(advanced.styles.includes('Defensivo'));
  assert.ok(advanced.feats.includes('Defensivo'));
  assert.equal(derive(advanced).ac, derive(paladin).ac + 1);
});

test('não permite escolher estilo de luta como concessão de nível de classe incorreto', async () => {
  const { newCharacter, advanceCharacter } = await import('../docs/core.js');
  const fighter = newCharacter({ classId: 'guerreiro', level: 1, xp: 300 });
  assert.throws(() => advanceCharacter(fighter, 'guerreiro', { fightingStyle: 'Arquearia' }), /nível não concede/i);
});

test('interpreta estilos de luta com o pré-requisito de característica', () => {
  const style = { name: 'Protetivo', summary: 'Talento de Estilo de Luta (Pré-requisito: Característica de Estilo de Luta).' };
  assert.equal(featEligibility(style, { level: 4, fightingStyleFeature: false }).eligible, false);
  assert.equal(featEligibility(style, { level: 4, fightingStyleFeature: true }).eligible, true);
});

import { test } from 'uvu';
import * as assert from 'uvu/assert';
import Query from '../src/query';

const query = new Query();
query.update('Привёт, мир!');

test('query', () => {
	assert.is(query.query, "привёт, мир!");
})

test('query mapped words', () => {
	assert.ok(query.queryWordsVariants.mappedWords.search("ghbd`nб"));
	assert.ok(query.queryWordsVariants.mappedWords.search("vbh"));
});

test('query eWords', () => {
	assert.ok(query.queryWordsVariants.eWords.search("привет"));
	assert.ok(query.queryWordsVariants.eWords.search("мир"));
})

test('query transliterated words', () => {
	assert.ok(query.queryWordsVariants.transliteratedWords.search("privet"));
	assert.ok(query.queryWordsVariants.transliteratedWords.search("pryvet"));
	assert.ok(query.queryWordsVariants.transliteratedWords.search("mir"));
	assert.ok(query.queryWordsVariants.transliteratedWords.search("myr"));
})

test('query transliterated mapped words', () => {
	assert.ok(query.queryWordsVariants.transliteratedMappedWords.search("гхбднb"));
	assert.ok(query.queryWordsVariants.transliteratedMappedWords.search("жхбднb"));
	assert.ok(query.queryWordsVariants.transliteratedMappedWords.search("вбх"));
});

test.run();
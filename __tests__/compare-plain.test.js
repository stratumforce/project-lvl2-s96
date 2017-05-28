import compare from '../src/';

const expectedResult = `Property 'timeout' was updated. From '50' to '20'
Property 'proxy' was removed
Property 'verbose' was added with value: true`;

const expectedNestResult = `Property 'common.setting2' was removed
Property 'common.setting6' was removed
Property 'common.setting4' was added with value: blah blah
Property 'common.setting5' was added with complex value
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed
Property 'group3' was added with complex value`;

const firstConfig = '__tests__/__fixtures__/before';
const secondConfig = '__tests__/__fixtures__/after';

test('Compare two JSON files with plain output', () => {
  expect(compare(`${firstConfig}.json`, `${secondConfig}.json`, 'plain')).toBe(expectedResult);
});

test('Compare two YAML files with plain output', () => {
  expect(compare(`${firstConfig}.yml`, `${secondConfig}.yml`, 'plain')).toBe(expectedResult);
});

test('Compare two INI files with plain output', () => {
  expect(compare(`${firstConfig}.ini`, `${secondConfig}.ini`, 'plain')).toBe(expectedResult);
});

test('Compare two JSON files with nested structure', () => {
  expect(compare(`${firstConfig}.nest.json`, `${secondConfig}.nest.json`, 'plain')).toBe(expectedNestResult);
});

test('Compare two YML files with nested structure', () => {
  expect(compare(`${firstConfig}.nest.yml`, `${secondConfig}.nest.yml`, 'plain')).toBe(expectedNestResult);
});

test('Compare two INI files with nested structure', () => {
  expect(compare(`${firstConfig}.nest.ini`, `${secondConfig}.nest.ini`, 'plain')).toBe(expectedNestResult);
});

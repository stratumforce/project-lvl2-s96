import compare from '../src/lib/compare';

const expectedResult = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

const firstConfig = '__tests__/data/before';
const secondConfig = '__tests__/data/after';

test('Compare two JSON files', () => {
  expect(compare(`${firstConfig}.json`, `${secondConfig}.json`)).toBe(expectedResult);
});

test('Compare two YAML files', () => {
  expect(compare(`${firstConfig}.yml`, `${secondConfig}.yml`)).toBe(expectedResult);
});

test('Compare two INI files', () => {
  expect(compare(`${firstConfig}.ini`, `${secondConfig}.ini`)).toBe(expectedResult);
});

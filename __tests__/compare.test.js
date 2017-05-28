import compare from '../src/';

const expectedResult = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

const expectedNestResult = `{
    common: {
        setting1: Value 1
      - setting2: 200
        setting3: true
      - setting6: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`;

const firstConfig = '__tests__/__fixtures__/before';
const secondConfig = '__tests__/__fixtures__/after';

test('Compare two JSON files', () => {
  expect(compare(`${firstConfig}.json`, `${secondConfig}.json`)).toBe(expectedResult);
});

test('Compare two YAML files', () => {
  expect(compare(`${firstConfig}.yml`, `${secondConfig}.yml`)).toBe(expectedResult);
});

test('Compare two INI files', () => {
  expect(compare(`${firstConfig}.ini`, `${secondConfig}.ini`)).toBe(expectedResult);
});

test('Compare two JSON files with nested structure', () => {
  expect(compare(`${firstConfig}.nest.json`, `${secondConfig}.nest.json`)).toBe(expectedNestResult);
});

test('Compare two YML files with nested structure', () => {
  expect(compare(`${firstConfig}.nest.yml`, `${secondConfig}.nest.yml`)).toBe(expectedNestResult);
});

test('Compare two INI files with nested structure', () => {
  expect(compare(`${firstConfig}.nest.ini`, `${secondConfig}.nest.ini`)).toBe(expectedNestResult);
});

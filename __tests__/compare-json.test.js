import compare from '../src/';

const expectedResult = `{
  "same": {
    "key": "host",
    "beforeValue": "hexlet.io",
    "afterValue": "",
    "children": []
  },
  "changed": {
    "key": "timeout",
    "beforeValue": 50,
    "afterValue": 20,
    "children": []
  },
  "removed": {
    "key": "proxy",
    "beforeValue": "123.234.53.22",
    "afterValue": "",
    "children": []
  },
  "added": {
    "key": "verbose",
    "beforeValue": "",
    "afterValue": true,
    "children": []
  }
}`;

const expectedNestResult = `{
  "same": {
    "key": "group1",
    "beforeValue": "",
    "afterValue": "",
    "children": [
      {
        "changed": {
          "key": "baz",
          "beforeValue": "bas",
          "afterValue": "bars",
          "children": []
        },
        "same": {
          "key": "foo",
          "beforeValue": "bar",
          "afterValue": "",
          "children": []
        }
      }
    ]
  },
  "removed": {
    "key": "group2",
    "beforeValue": "",
    "afterValue": "",
    "children": [
      {
        "same": {
          "key": "abc",
          "beforeValue": 12345,
          "afterValue": "",
          "children": []
        }
      }
    ]
  },
  "added": {
    "key": "group3",
    "beforeValue": "",
    "afterValue": "",
    "children": [
      {
        "same": {
          "key": "fee",
          "beforeValue": 100500,
          "afterValue": "",
          "children": []
        }
      }
    ]
  }
}`;

const firstConfig = '__tests__/__fixtures__/before';
const secondConfig = '__tests__/__fixtures__/after';

test('Compare two JSON files with JSON output', () => {
  expect(compare(`${firstConfig}.json`, `${secondConfig}.json`, 'json')).toBe(expectedResult);
});

test('Compare two YAML files with JSON output', () => {
  expect(compare(`${firstConfig}.yml`, `${secondConfig}.yml`, 'json')).toBe(expectedResult);
});

test('Compare two INI files with JSON output', () => {
  expect(compare(`${firstConfig}.ini`, `${secondConfig}.ini`, 'json')).toBe(expectedResult);
});

test('Compare two JSON files with nested structure with JSON output', () => {
  expect(compare(`${firstConfig}.nest.json`, `${secondConfig}.nest.json`, 'json')).toBe(expectedNestResult);
});

test('Compare two YML files with nested structure with JSON output', () => {
  expect(compare(`${firstConfig}.nest.yml`, `${secondConfig}.nest.yml`, 'json')).toBe(expectedNestResult);
});

test('Compare two INI files with nested structure with JSON output', () => {
  expect(compare(`${firstConfig}.nest.ini`, `${secondConfig}.nest.ini`, 'json')).toBe(expectedNestResult);
});

import compare from '../src/lib/compare';

test('Compare two files', () => {
  const firstConfig = '__tests__/data/before.json';
  const secondConfig = '__tests__/data/after.json';
  const expectedResult = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

  expect(compare(firstConfig, secondConfig)).toBe(expectedResult);
});

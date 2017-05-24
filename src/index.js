import commander from 'commander';
import compare from './lib/compare';

const program = commander;

program
  .version('0.0.5')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => compare(firstConfig, secondConfig));

export default() => program.parse(process.argv);

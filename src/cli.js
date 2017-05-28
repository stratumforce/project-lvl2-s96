import commander from 'commander';
import compare from '.';

const program = commander;

program
  .version('1.0.0')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) =>
    console.log(compare(firstConfig, secondConfig, program.format)));

export default() => program.parse(process.argv);

if (!process.argv.slice(2).length) program.help();

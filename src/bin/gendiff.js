#!/usr/bin/env node
import program from 'commander';
import getDifferense from '..';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<first_config> <second_config>')
  .action((first, second) => {
    console.log(getDifferense(first, second));
  });

program.parse(process.argv);

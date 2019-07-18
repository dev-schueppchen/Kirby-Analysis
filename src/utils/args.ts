/** @format */

import yargs from 'yargs';

export default yargs
  .command('analysis', 'Kirby database analysis script')
  .option('address', {
    alias: 'a',
    description: 'MongoDB uri',
    type: 'string',
  })
  .option('module', {
    alias: 'm',
    description: 'Module to run',
    type: 'string',
  }).argv;

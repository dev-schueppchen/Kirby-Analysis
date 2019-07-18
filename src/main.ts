/** @format */

import { MongoClient } from 'mongodb';
import args from './utils/args';
import IModule from './modules/module';

import toCSV from './utils/csv';

// Module imports
import ModuleChanMessageCount from './modules/channel/message/count';
import ModuleChanAvergaeLength from './modules/channel/message/averagelen';
import ModuleDaytime from './modules/channel/message/timeactivity/daytime';
import ModuleWeekday from './modules/channel/message/timeactivity/weekday';
import ModuleWeekdayDaytime from './modules/channel/message/timeactivity/weekdaydaytime';
import ModuleRoleMessageCount from './modules/role/message/count';
import ModuleRoleAverageLength from './modules/role/message/averagelength';

const modules: Map<string, IModule> = new Map([
  ['channel.message.count', new ModuleChanMessageCount()],
  ['channel.message.averagelen', new ModuleChanAvergaeLength()],
  ['channel.message.time.daytime', new ModuleDaytime()],
  ['channel.message.time.weekday', new ModuleWeekday()],
  ['channel.message.time.weekdaydaytime', new ModuleWeekdayDaytime()],
  ['role.message.count', new ModuleRoleMessageCount()],
  ['role.message.averagelen', new ModuleRoleAverageLength()],
]);

function errorAndExit(v: any) {
  console.error(v);
  process.exit(1);
}

function main() {
  const moduleKeys: string[] = [];
  modules.forEach((_, k) => moduleKeys.push(k));

  if (!args.address) {
    console.error('address must be passed!');
    return;
  }

  if (!args.module) {
    console.error(
      `module must be passed!\n\nAvailable modules:\n\n${moduleKeys.join('\n')}`
    );
    return;
  }

  const module = modules.get(args.module);
  if (!module) {
    console.error(
      `module not found!\n\nAvailable modules:\n\n${moduleKeys.join('\n')}`
    );
    return;
  }

  MongoClient.connect(args.address, { useNewUrlParser: true })
    .then((client) => {
      const db = client.db('kirby');
      module
        .execute(db)
        .then((data) => {
          toCSV(args.module || '', data)
            .then(() => process.exit())
            .catch(errorAndExit);
        })
        .catch(errorAndExit);
    })
    .catch(errorAndExit);
}

main();

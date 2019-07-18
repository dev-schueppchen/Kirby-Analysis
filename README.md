# Kirby-Analysis

This script is used to read and format the data collected by [**Kirby**](https://github.com/dev-schueppchen/Kirby) which is stored in a MongoDB database.

## How To Use

### Requirements

- NodeJS
- NPM

First of all, clone the repository to your workspace:

```
$ git clone https://github.com/dev-schueppchen/Kirby-Analysis.git --branch master --depth 1
```

When starting the script, you need to pass the [DSN](https://en.wikipedia.org/wiki/Data_source_name) of the MongoDB database server to connect to. Also, you need to pass the name of the module, you want to execute:

```
$ npm run -- \
    -a mongodb://[username]:[password]@[host]:[port]/[authenticationDatabase] \
    -m role.message.count
```

To get a list of currently implemented modules, just do not pass any module name:

```
$ npm run -- -a mongodb://[username]:[password]@[host]:[port]/[authenticationDatabase]
```

The data will be saved in your working directory in `./data/[moduleName].csv`. The module data will always be saved as CSV to simplify importing to a spreadsheet editor (MS Excel, Google Spreadsheets, LibreOffice Calc, ...).

### Contributing

If you want to contribute custom modules, just follow the `IModule` interface at `/src/modules/module.ts` which must be implemented by a custom module. Then, just import it into the `main.ts` and register it with a name identifier in the `modules` map.

```ts
import MyModule from './modules/channel/message/messagecountat1337oclock';

const modules: Map<string, IModule> = new Map([
  // ...
  ['channel.message.messagecountat1337oclock', new MyModule()],
]);
```

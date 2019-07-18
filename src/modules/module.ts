/** @format */

import { Db } from 'mongodb';

export default interface IModule {
  execute(db: Db): Promise<any[][]>;
}

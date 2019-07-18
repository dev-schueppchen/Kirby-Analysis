/** @format */

import IModule from '../../module';
import { Db } from 'mongodb';

export default class Module implements IModule {
  public execute(db: Db): Promise<any[][]> {
    return new Promise((resolve, rejects) => {
      const msgs = db.collection('messages');

      msgs
        .find({})
        .toArray()
        .then((data) => {
          const roleStats: Map<string, number> = new Map();

          data.forEach((d) => {
            const roles: string[] = d.roleids;

            roles.forEach((role) => {
              const curr = roleStats.get(role);
              if (!curr) {
                roleStats.set(role, 1);
              } else {
                roleStats.set(role, curr + 1);
              }
            });
          });

          let resData: any[][] = [];
          roleStats.forEach((v, k) => resData.push([k, v]));
          console.log(resData);

          resolve(resData);
        })
        .catch(rejects);
    });
  }
}

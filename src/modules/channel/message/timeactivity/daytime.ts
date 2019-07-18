/** @format */

import IModule from '../../../module';
import { Db } from 'mongodb';

export default class Module implements IModule {
  public execute(db: Db): Promise<any[][]> {
    return new Promise((resolve, rejects) => {
      const msgs = db.collection('messages');

      msgs
        .find({})
        .toArray()
        .then((data) => {
          const channelStats: Map<string, number> = new Map();

          data.forEach((d) => {
            const date = new Date(d.timestamp);
            const daytime = `${date.getHours()}:${
              date.getMinutes() > 15 && date.getMinutes() < 45 ? '30' : '00'
            }`;
            const curr = channelStats.get(daytime);
            if (!curr) {
              channelStats.set(daytime, 1);
            } else {
              channelStats.set(daytime, curr + 1);
            }
          });

          let resData: any[][] = [];
          channelStats.forEach((v, k) => resData.push([k, v]));
          console.log(resData);

          resolve(resData);
        })
        .catch(rejects);
    });
  }
}

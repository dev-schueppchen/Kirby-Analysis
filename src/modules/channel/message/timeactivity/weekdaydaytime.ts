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
          const channelStats: Map<string, number[]> = new Map();

          data.forEach((d) => {
            const date = new Date(d.timestamp);
            const day = date.getDay();
            const daytime = `${date.getHours()}:${
              date.getMinutes() > 15 && date.getMinutes() < 45 ? '30' : '00'
            }`;

            let curr = channelStats.get(daytime);
            if (!curr) {
              curr = [0, 0, 0, 0, 0, 0, 0];
              curr[day] = 1;
              channelStats.set(daytime, curr);
            } else {
              curr[day]++;
              channelStats.set(daytime, curr);
            }
          });

          let resData: any[][] = [];
          channelStats.forEach((v, k) => resData.push([k, v.join(',')]));
          console.log(resData);

          resolve(resData);
        })
        .catch(rejects);
    });
  }
}

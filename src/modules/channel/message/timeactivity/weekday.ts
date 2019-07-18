/** @format */

import IModule from '../../../module';
import { Db } from 'mongodb';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

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
            const day = days[date.getDay()];
            const curr = channelStats.get(day);
            if (!curr) {
              channelStats.set(day, 1);
            } else {
              channelStats.set(day, curr + 1);
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

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
          const channelStats: Map<string, number> = new Map();

          data.forEach((d) => {
            const chan = d.channelid;
            const curr = channelStats.get(chan);
            if (!curr) {
              channelStats.set(chan, 1);
            } else {
              channelStats.set(chan, curr + 1);
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

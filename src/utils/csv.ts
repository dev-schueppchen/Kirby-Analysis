/** @format */

import fs from 'fs';

const BASEDIR = './data';

export default function toCSV(name: string, data: any[][]): Promise<{}> {
  return new Promise((resolve, rejects) => {
    const dir = `${BASEDIR}/${name}.csv`;

    if (!fs.existsSync(BASEDIR)) {
      fs.mkdirSync(BASEDIR);
    }

    fs.writeFile(dir, data.map((d) => d.join(',')).join('\n'), (err) => {
      if (err) {
        rejects(err);
      } else {
        resolve();
      }
    });
  });
}

/** @format */

import { FilterQuery } from 'mongodb';

/** @format */

export function filter_per_day(date: Date): FilterQuery<any> {
  return {
    $and: [
      { timestamp: { $gte: date } },
      {
        timestamp: {
          $lte: new Date(date.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    ],
  };
}

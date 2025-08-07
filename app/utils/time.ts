import { DateTime } from "luxon";

const fromNow = (timestamp: number) => {
  return DateTime.fromSeconds(timestamp).toRelative();
};

const fromTimestamp = (timestampInMillis: number) => {
  return DateTime.fromMillis(timestampInMillis).toRelative();
};

const toMMMDDHHMM = (timestamp: number) => {
  return DateTime.fromSeconds(timestamp).toFormat("MMM dd, HH:mm");
};

// timeHelper
const th = {
  fromNow,
  fromTimestamp,
  toMMMDDHHMM,
};

export { fromNow, fromTimestamp, th, toMMMDDHHMM };

import dayjs from "dayjs";

export const calculateDelay = (scheduled: string, expected: string): number => {
  return dayjs(expected).diff(dayjs(scheduled), "minute");
};

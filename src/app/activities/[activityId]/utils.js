import dayjs from "dayjs";
import * as Yup from "yup";

export const timeschema = Yup.mixed()
  .nullable()
  .test("invalidTimeFormat", "Invalid time format", (value) => !dayjs.isDayjs(value));

export const numericSchema = Yup.number().nullable();

export function isTimeStringBefore(value, maxTimeString, including = true) {
  const time = dayjs(value, "HH:mm");
  const maxTime = dayjs(maxTimeString, "HH:mm");
  if (including) return time.isSameOrBefore(maxTime);
  else return time.isBefore(maxTime);
}

export function isTimeStringAfter(value, maxTimeString, including = true) {
  const time = dayjs(value, "HH:mm");
  const maxTime = dayjs(maxTimeString, "HH:mm");
  if (including) return time.isSameOrAfter(maxTime);
  else return time.isAfter(maxTime);
}

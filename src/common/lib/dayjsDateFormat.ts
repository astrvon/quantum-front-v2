import dayjs from "dayjs";

import { IDateFormatType } from "../interfaces/enum/dateFormatType.enum";

// Optional: set locale if needed
// import "dayjs/locale/id";
// dayjs.locale("id");

export const formatDate = (
  date: string | Date | undefined,
  formatType: IDateFormatType = IDateFormatType.PRETTY
): string => {
  return dayjs(date).format(formatType);
};

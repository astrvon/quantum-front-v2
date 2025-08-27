import { IPagination } from "../interfaces/pagination";

export const ParseTableNumber = (i: number, pagination: IPagination) =>
  (pagination?.take || 10) * ((pagination?.page || 1) - 1) + i + 1;

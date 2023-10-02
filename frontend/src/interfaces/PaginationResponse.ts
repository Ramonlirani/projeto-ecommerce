import { Meta } from "./Meta";

export interface PaginationResponse<T> {
  data: T[];
  meta: Meta;
}

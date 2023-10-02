import { PaginationOptionsDto } from './pagination-options.dto';

export interface PageMetaParametersDto {
  paginationOptions: PaginationOptionsDto;
  itemCount: number;
  showing: number;
}

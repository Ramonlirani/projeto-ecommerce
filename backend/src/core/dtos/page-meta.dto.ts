import { ApiProperty } from '@nestjs/swagger';
import { PageMetaParametersDto } from './page-meta-parameters.dto';

export class PageMetaDto {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly showing: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ showing, paginationOptions, itemCount }: PageMetaParametersDto) {
    this.page = paginationOptions.page;
    this.take = paginationOptions.take;
    this.itemCount = itemCount;
    this.showing = showing;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}

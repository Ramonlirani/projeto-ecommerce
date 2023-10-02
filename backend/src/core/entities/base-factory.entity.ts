export interface IBaseFactory<Entity, CreateDto, UpdateDto> {
  create(data: CreateDto): Entity;
  update?(data: UpdateDto): Entity;
}

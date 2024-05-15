export interface Model{
    title: string;
    description: string;
}
export interface ModelWithType extends Model{
    type: string;
}
export interface Association{
    model1: ModelWithType;
    model2: ModelWithType;
}
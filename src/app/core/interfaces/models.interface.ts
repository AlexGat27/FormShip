export interface Model{
    id: number;
    title: string;
    description: string;
    type: string;
}
export interface ShipSystemModel extends Model{
    category: number;
    document: string;
}


export interface Association{
    id: number;
    model1: Model;
    model2: ShipSystemModel;
}
export class CreateItemDto {
    name: string;
    price: number;
    description: string;
    message: string;
    type: 'other' | 'role';
    storeId: number;
}

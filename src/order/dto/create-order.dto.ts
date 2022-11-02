export class CreateOrderDto {
    orderName: string;
    userName: string;
    status: string; //canceled, accept, preparing, delivering, arrived, refunded
    countryCode: string;
    countryName: string;
    address: string;
    quantities: number;
    price: number;
    deliveryCost: number;
}

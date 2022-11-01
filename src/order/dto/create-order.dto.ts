export class CreateOrderDto {
    userId: number;
    couponId?: number;
    userName: string;
    status: string; //canceled, accept, preparing, delivering, arrived, refunded
    countryCode: string;
    countryName: string;
    address: string;
    quantities: number;
    price: number;
    deliveryPrice: number;
}

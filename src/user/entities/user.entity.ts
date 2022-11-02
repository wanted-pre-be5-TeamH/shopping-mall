import { Coupon } from "src/coupon/entities/coupon.entity";

export class User {
    id: number;
    email: string;
    hash: string;
    name: string;
    coupon: Coupon[]
}

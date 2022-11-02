import { Order } from "src/order/entities/order.entity";
import { User } from "src/user/entities/user.entity";

export class Coupon {
    id: number;
    name: string;
    type: string;
    isUsed: boolean;
    usedAt: Date;
    expireAt: Date;
    user: User;
    order: Order;
}

export class CreateCouponDto {
    name: string;
    type: string;
    discountAmount: number;
    isUsed: boolean;
    usedAt?: Date;
    expireAt: Date;
}

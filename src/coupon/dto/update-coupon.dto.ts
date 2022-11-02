import { PartialType } from '@nestjs/mapped-types';
import { CreateCouponDto } from './create-coupon.dto';

export class UpdateCouponDto extends PartialType(CreateCouponDto) {
    name: string;
    type: string;
    discountAmount: number;
    isUsed: boolean;
    usedAt?: Date;
    expireAt: Date;
}

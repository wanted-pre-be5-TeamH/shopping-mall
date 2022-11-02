import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { CouponModule } from './coupon/coupon.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),OrderModule, CouponModule, PrismaModule, UserModule],
})
export class AppModule {}

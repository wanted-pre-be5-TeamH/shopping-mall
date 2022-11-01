import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { CouponModule } from './coupon/coupon.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { TestModule } from './test/test.module';
import { CouponModule } from './coupon/coupon.module';

@Module({
  imports: [OrderModule, CouponModule, TestModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

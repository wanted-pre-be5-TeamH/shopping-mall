import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) { }

  // 8. 쿠폰 조회 (전체)
  @Get()
  findAll() {
    return this.couponService.findAll();
  }

  // 9. 쿠폰 조회 (사용자별)
  @Get(':id')
  findAllById(@Param('id') id: number) {
    return this.couponService.findAllById(id);
  }

  // 10. 쿠폰 내용 변경
  @Put(':id')
  update(@Param('id') id: number, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponService.update(id, updateCouponDto);
  }

  // 11. 쿠폰 삭제
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.couponService.remove(id);
  }

  // 12. 특정 신규 쿠폰 코드 발급
  @Post(':userId')
  create(@Param() userId: number, @Body() createCouponDto: CreateCouponDto) {
    return this.couponService.create(userId, createCouponDto);
  }

  // 13. 쿠폰 타입별 사용 횟수 및 총 할인액 조회
  @Get(':type')
  findUsedCountAndTotalDiscountByType(@Param('type') type: string) {
    return this.couponService.findUsedCountAndTotalDiscountByType(type);
  }
}

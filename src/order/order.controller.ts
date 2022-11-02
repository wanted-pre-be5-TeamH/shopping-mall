import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  // 1. 제품 주문 내역 열람 (전체)
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  // 2. 제품 주문 내역 열람 (사용자)
  @Get(':userId')
  findAllByUserId(@Param('userId') userId: number) {
    return this.orderService.findAllByUserId(userId);
  }

  // 3. 주문 내역 검색
  @Get(':userId/:orderName')
  findAllByOrderName(@Param('orderName') orderName: string) {
    return this.orderService.findAllByOrderName(orderName);
  }

  // 4. 주문 상태, 시작일자~종료일자에 따른 필터
  @Get(':userId/:status/:createdAt/:updatedAt')
  findAllByConditions(
    @Param('status') status: string,
    @Param('startAt') startAt: Date,
    @Param('endAt') endAt: Date
  ) {
    return this.orderService.findAllByConditions(status, startAt, endAt);
  }

  // 5. 주문자명으로 검색
  @Get(':userName')
  findAllByUserName(@Param('userName') userName: string) {
    return this.orderService.findAllByUserName(userName);
  }

  // 6. 제품 배송 상태 업데이트, 주문 건에 대해 발송처리 (배송중, 배송완료 등 수정)
    @Patch(':id')
  update(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  // 7. 구매하기 (쿠폰 사용에 따른 할인, 배송비 적용)
  @Post(':userId/:couponId')
  create(
    @Param() userId: number,
    @Param() couponId: number,
    @Body() createOrderDto: CreateOrderDto
    ) {
    return this.orderService.create(userId, couponId, createOrderDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.orderService.remove(+id);
  // }
}

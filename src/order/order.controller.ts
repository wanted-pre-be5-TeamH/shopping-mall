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
      @Get(':userId/:status/:createdAt/:finishedAt')
      findAllByConditions(@Param('status') status: string) {
        return this.orderService.findAllByStatus(status);
      }

    


  // 9. 구매하기 (쿠폰 사용에 따른 할인, 배송비 적용)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}

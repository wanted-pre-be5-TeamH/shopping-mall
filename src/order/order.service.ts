import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
  ) {

  }

  // 1. 제품 주문 내역 열람 (전체)
  async findAll() {
    try {
      const order = await this.prisma.order.findMany();
      return order;
    } catch (err) {
      console.log(err)
    }
  }

  // 2. 제품 주문 내역 열람 (사용자)
  async findAllByUserId(userId: number) {
    const userOrder = await this.prisma.order.findMany({
      where: {
        userId
      }
    })
    return userOrder;
  }

  // 3. 주문 내역 검색
  async findAllByOrderName(orderName: string) {
    const orderSearchResultByName = await this.prisma.order.findMany({
      where: {
        orderName
      }
    })
    return orderSearchResultByName;
  }

      // 4. 주문 상태, 시작일자~종료일자에 따른 필터
  async findAllByStatus(status: string) {
    const orderSearchResultByStatus = await this.prisma.order.findMany({
      where: {
        status
      }
    })
    return orderSearchResultByStatus;
  }

   

  // 9. 구매하기 (쿠폰 사용에 따른 할인, 배송비 적용)
  async create(dto: CreateOrderDto) {
    try {
      // 수량 별 배송비 책정
      const deliveryCost = await this.prisma.deliveryCost.findFirst({
        where: {
          countryName: dto.countryName,
          quantity: dto.quantities
        }
      })

      // 쿠폰 할인 적용
      const usedCoupon = await this.prisma.coupon.findFirst({
        where: {
          id: dto.couponId,
        }
      })
      let isDiscountDelivery = false;
      let discountAmount = 0;
      let discountPercentage = 0;
      const now = new Date();
      // 쿠폰 유효기간 체크
      let isExpired = usedCoupon.expireAt > now ? false : true;
      if (usedCoupon && !isExpired) {
        if (usedCoupon.type === 'delivery') {
          // 배송비 쿠폰
          isDiscountDelivery = true;
        } else if (usedCoupon.type === 'subscription') {
          // 정액 할인
          discountAmount = usedCoupon.discountAmount;
        } else if (usedCoupon.type === 'percentage') {
          // % 할인
          discountPercentage = usedCoupon.discountAmount * 0.01;
        }
      }

      const order = await this.prisma.order.create({
        data: {
          userId: dto.userId,
          couponId: dto.couponId,
          deliveryCost: isDiscountDelivery ? 0 : deliveryCost.cost,
          // 100원인데 10퍼 할인 적용이면 100 - 100*0.1 - 0 = 90원
          price: dto.price - dto.price * discountPercentage - discountAmount,
          ...dto,
          // userId:1,
          // couponId: 1,
          // userName: 'kim',
          // status:'accept',
          // countryCode:'KR',
          // countryName:'South Korea',
          // address:'Seoul',
          // quantities:5,
          // price:50000,
          // deliveryPrice:5000,
        },
      })
      return order;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        console.log(err)
      }
      throw err;
    }
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}

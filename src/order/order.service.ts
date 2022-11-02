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
      const orders = await this.prisma.order.findMany();
      return orders;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        console.log(`Order findAll Err : ${err}`)
      }
      throw err;
    }
  }

  // 2. 제품 주문 내역 열람 (사용자)
  async findAllByUserId(userId: number) {
    try {
      const userOrders = await this.prisma.order.findMany({
        where: {
          userId
        }
      })
      return userOrders;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        console.log(`Order findAllByUserId Err : ${err}`)
      }
      throw err;
    }
  }

  // 3. 주문 내역 검색
  async findAllByOrderName(orderName: string) {
    try {
      const orderSearchResultByName = await this.prisma.order.findMany({
        where: {
          orderName
        }
      })
      return orderSearchResultByName;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        console.log(`Order findAllByOrderName Err : ${err}`)
      }
      throw err;
    }
  }

  // 4. 주문 상태, 시작일자~종료일자에 따른 필터
  async findAllByConditions(
    status: string,
    startAt: Date,
    endAt: Date,
  ) {
    try {
      const orderSearchResultByStatus = await this.prisma.order.findMany({
        where: {
          status,
          updatedAt: {
            lte: startAt,
            gte: endAt,
          }
        }
      })
      return orderSearchResultByStatus;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        console.log(`Order findAllByStatus Err : ${err}`)
      }
      throw err;
    }
  }

  // 5. 주문자명으로 검색
  async findAllByUserName(userName: string) {
    try {
      const orderSearchResultByUserName = await this.prisma.order.findMany({
        where: {
          userName
        }
      })
      return orderSearchResultByUserName;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        console.log(`Order findAllByUserName Err : ${err}`)
      }
      throw err;
    }
  }

  // 6. 제품 배송 상태 업데이트, 주문 건에 대해 발송처리 (배송중, 배송완료 등 수정)
  async update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      const updateResult = await this.prisma.order.update({
        where: {
          id
        },
        data: {
          status: updateOrderDto.status
        }
      })
      return updateResult.status;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        console.log(`Order Update Err : ${err}`)
      }
      throw err;
    }
  }

  // 7. 구매하기 (쿠폰 사용에 따른 할인, 배송비 적용)
  async create(dto: CreateOrderDto) {
    try {
      // 수량 별 배송비 책정
      const deliveryCost = await this.prisma.deliveryCost.findFirst({
        where: {
          countryName: dto.countryName,
          quantity: dto.quantities
        }
      })
      let cost = 0;
      if (deliveryCost) {
        cost = deliveryCost.cost;
      }

      // 쿠폰 할인 적용
      const selectedCoupon = await this.prisma.coupon.findFirst({
        where: {
          id: dto.couponId,
          isUsed: false
        }
      })
      let isDiscountDelivery = false;
      let discountAmount = 0;
      let discountPercentage = 0;
      if (selectedCoupon) {
        const now = new Date();
        // 쿠폰 유효기간 체크
        const isExpired = selectedCoupon.expireAt > now ? false : true;
        if (selectedCoupon && !isExpired) {
          if (selectedCoupon.type === 'delivery') {
            // 배송비 쿠폰
            isDiscountDelivery = true;
          } else if (selectedCoupon.type === 'subscription') {
            // 정액 할인
            discountAmount = selectedCoupon.discountAmount;
          } else if (selectedCoupon.type === 'percentage') {
            // % 할인
            discountPercentage = selectedCoupon.discountAmount * 0.01;
          }
        }
      }

      const order = await this.prisma.order.create({
        data: {
          userId: dto.userId,
          couponId: dto.couponId,
          deliveryCost: isDiscountDelivery ? 0 : cost,
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
        console.log(`Order Create Err : ${err}`)
      }
      throw err;
    }
  }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}

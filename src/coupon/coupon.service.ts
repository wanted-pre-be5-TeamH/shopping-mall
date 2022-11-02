import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Injectable()
export class CouponService {
  constructor(
    private prisma: PrismaService,
  ) {

  }

  // 8. 쿠폰 조회 (전체)
  async findAll() {
    try {
      const coupons = await this.prisma.coupon.findMany();
      return coupons;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        console.log(`Coupon findAll Err : ${err}`)
      }
      throw err;
    }
  }

  // 9. 쿠폰 조회 (사용자별)
  async findAllById(id: number) {
    try {
      const userCoupons = await this.prisma.coupon.findMany({
        where: {
          id
        }
      })
      return userCoupons;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        console.log(`Coupon findAllById Err : ${err}`)
      }
      throw err;
    }
  }

  // 10. 쿠폰 내용 변경
  async update(id: number, updateCouponDto: UpdateCouponDto) {
    try {
      const coupon = await this.prisma.coupon.update({
        where: {
          id
        },
        data: {
          ...updateCouponDto
          // name: updateCouponDto.name,
          // type: updateCouponDto.type,
          // discountAmount: updateCouponDto.discountAmount,
          // isUsed: updateCouponDto.isUsed,
          // usedAt: updateCouponDto.usedAt,
          // expireAt: updateCouponDto.expireAt
        }
      })
      return coupon;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        console.log(`Coupon Update Err : ${err}`)
      }
      throw err;
    }
  }

  // 11. 쿠폰 삭제
  async remove(id: number) {
    try {
      const result = await this.prisma.coupon.delete({
        where: {
          id
        }
      })
      return result;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        console.log(`Coupon Remove Err : ${err}`)
      }
      throw err;
    }
  }

  // 12. 특정 신규 쿠폰 코드 발급
  async create(userId: number, createCouponDto: CreateCouponDto) {
    try {
      const coupon = await this.prisma.coupon.create({
        data: {
          userId,
          ...createCouponDto
        }
      })
      return coupon;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        console.log(`Coupon Create Err : ${err}`)
      }
      throw err;
    }
  }

  // 13. 쿠폰 타입별 사용 횟수 및 총 할인액 조회
  async findUsedCountAndTotalDiscountByType(type: string) {
    try {
      const userCoupons = await this.prisma.coupon.findMany({
        where: {
          type
        }
      })

      let usedCount = 0;
      let totalDiscount = 0;
      await userCoupons.map((e) => {
        if (e.isUsed) {
          usedCount++;
          // 총 할인액은 1) 국가별/수량별 책정된 배송비할인, 2) %할인 
          // 으로 처리된 총 할인율을 coupon 사용 시 Coupon의 신규 컬럼에 할인 처리된 금액을 
          // 저장시켜서 총 합을 더해주면 됨, 임시로 정액할인(정해진 할인액)만 총합으로 더해서 조회하도록 함
          totalDiscount += e.discountAmount;
        }
      })
      let result = {
        usedCount,
        totalDiscount
      }
      return result;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        console.log(`Coupon findAllById Err : ${err}`)
      }
      throw err;
    }
  }
}

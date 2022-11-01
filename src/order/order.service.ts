import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
  ) {

  }
  async create(dto: CreateOrderDto) {
    try {
      const order = await this.prisma.order.create({
        data: {
          userId: dto.userId,
          couponId: dto.couponId,
          ...dto
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

  async findAll() {
    try{
      const order = await this.prisma.order.findMany();
      return order;
    }catch(err){
      console.log(err)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}

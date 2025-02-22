import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderStatus } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  constructor(@InjectModel(Order.name) private orderSchema: Model<Order>) {}

  create(createOrderDto: CreateOrderDto) {
    return this.orderSchema.create({
      ...createOrderDto,
      partial: createOrderDto.shares,
      status: OrderStatus.PENDING,
    });
  }

  findAll(filter: { walletId: string }) {
    return this.orderSchema.find({
      wallet: filter.walletId,
    });
  }

  findOne(id: string) {
    return this.orderSchema.findById(id);
  }
}

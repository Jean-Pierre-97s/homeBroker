/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import crypto from 'crypto';
import mongoose, { HydratedDocument } from 'mongoose';
import { Asset, AssetDocument } from 'src/modules/assets/entities/asset.entity';
import {
  Wallet,
  WalletDocument,
} from 'src/modules/wallets/entities/wallet.entity';

export type OrderDocument = HydratedDocument<Order>;

export enum OrderType {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  FAILED = 'FAILED',
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ default: () => crypto.randomUUID() })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.Int32 })
  shares: number;

  @Prop({ type: mongoose.Schema.Types.Int32 })
  partial: number;

  @Prop({ type: mongoose.Schema.Types.Int32 })
  price: number;

  @Prop({ type: String, ref: Wallet.name })
  wallet: WalletDocument | string;

  @Prop({ type: String, ref: Asset.name })
  asset: AssetDocument | string;

  @Prop({ type: String, enum: OrderType })
  type: OrderType;

  @Prop({ type: String, enum: OrderStatus })
  status: OrderStatus;

  createdAt!: Date;

  updatedAt!: Date;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
export const OrderSchema = SchemaFactory.createForClass(Order);

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
OrderSchema.index({ wallet: 1, asset: 1 }, { unique: true });

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import crypto from 'crypto';
import { HydratedDocument } from 'mongoose';

export type WalletDocument = HydratedDocument<Wallet>;

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
@Schema({ timestamps: true })
export class Wallet {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Prop({ default: () => crypto.randomUUID() })
  _id: string;

  createdAt!: Date;

  updatedAt!: Date;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
export const WalletSchema = SchemaFactory.createForClass(Wallet);

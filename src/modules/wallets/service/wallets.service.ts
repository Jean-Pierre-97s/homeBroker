import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from '../dto/create-wallet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from '../entities/wallet.entity';

@Injectable()
export class WalletsService {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  constructor(@InjectModel(Wallet.name) private walletSchema: Model<Wallet>) {}

  create(createWalletDto: CreateWalletDto) {
    return this.walletSchema.create(createWalletDto);
  }

  findAll() {
    return this.walletSchema.find();
  }

  findOne(id: string) {
    return this.walletSchema.findById(id);
  }
}

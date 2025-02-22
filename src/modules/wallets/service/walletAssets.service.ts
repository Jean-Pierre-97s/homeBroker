/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { CreateWalletAssetDto } from '../dto/create-walletAsset.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { WalletAsset } from '../entities/walletAsset.entity';
import { Wallet } from '../entities/wallet.entity';

@Injectable()
export class WalletAssetsService {
  constructor(
    @InjectModel(WalletAsset.name)
    private walletAssetSchema: Model<WalletAsset>,
    @InjectModel(Wallet.name) private walletSchema: Model<Wallet>,
    @InjectConnection() private connection: mongoose.Connection,
  ) {}

  async create(createWalletAssetDto: CreateWalletAssetDto) {
    const session = await this.connection.startSession();
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await session.startTransaction();
    try {
      const docs = await this.walletAssetSchema.create(
        [{ ...createWalletAssetDto }],
        { session },
      );
      const walletAsset = docs[0];
      await this.walletSchema.updateOne(
        { _id: createWalletAssetDto.wallet },
        { $push: { assets: walletAsset._id } },
        { session },
      );
      await session.commitTransaction();
      return walletAsset;
    } catch (error) {
      console.error(error);
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  findAll() {
    return this.walletAssetSchema.find();
  }

  findOne(id: string) {
    return this.walletAssetSchema.findById(id);
  }
}

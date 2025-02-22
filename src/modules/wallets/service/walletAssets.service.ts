import { Injectable } from '@nestjs/common';
import { CreateWalletAssetDto } from '../dto/create-walletAsset.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WalletAsset } from '../entities/walletAsset.entity';

@Injectable()
export class WalletAssetsService {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    @InjectModel(WalletAsset.name)
    private walletAssetSchema: Model<WalletAsset>,
  ) {}

  create(createWalletAssetDto: CreateWalletAssetDto) {
    return this.walletAssetSchema.create(createWalletAssetDto);
  }

  findAll() {
    return this.walletAssetSchema.find();
  }

  findOne(id: string) {
    return this.walletAssetSchema.findById(id);
  }
}

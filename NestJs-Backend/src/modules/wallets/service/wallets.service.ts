import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from '../dto/create-wallet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from '../entities/wallet.entity';
import { AssetPresenter } from '../../assets/presenter/asset.presenter';
import { Asset } from 'src/modules/assets/entities/asset.entity';
import { WalletAsset } from '../entities/walletAsset.entity';

@Injectable()
export class WalletsService {
  constructor(@InjectModel(Wallet.name) private walletSchema: Model<Wallet>) {}

  create(createWalletDto: CreateWalletDto) {
    return this.walletSchema.create(createWalletDto);
  }

  findAll() {
    return this.walletSchema.find();
  }

  async findOne(id: string) {
    const wallet = await this.walletSchema
      .findById(id)
      .populate([{ path: 'assets', populate: ['asset'] }]);

    if (!wallet) return null;

    // Transform the assets using the presenter
    const output = {
      ...wallet.toObject(),
      assets: wallet.assets.map((walletAsset: WalletAsset) => ({
        ...walletAsset.toObject(),
        asset: new AssetPresenter(walletAsset.asset as Asset).toJSON(),
      })),
    };

    return output;
  }
}

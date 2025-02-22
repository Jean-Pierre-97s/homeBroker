/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { WalletsService } from './service/wallets.service';
import { WalletsController } from './controller/wallets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from './entities/wallet.entity';
import { WalletAsset, WalletAssetSchema } from './entities/walletAsset.entity';
import { WalletAssetsController } from './controller/walletAssets.controller';
import { WalletAssetsService } from './service/walletAssets.service';
@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    MongooseModule.forFeature([
      { name: Wallet.name, schema: WalletSchema },
      { name: WalletAsset.name, schema: WalletAssetSchema },
    ]),
  ],
  controllers: [WalletsController, WalletAssetsController],
  providers: [WalletsService, WalletAssetsService],
})
export class WalletsModule {}

import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateWalletAssetDto } from '../dto/create-walletAsset.dto';
import { WalletAssetsService } from '../service/walletAssets.service';

@Controller('walletAssets')
export class WalletAssetsController {
  constructor(private readonly walletAssetsService: WalletAssetsService) {}

  @Post()
  create(@Body() createWalletAssetDto: CreateWalletAssetDto) {
    return this.walletAssetsService.create(createWalletAssetDto);
  }

  @Get()
  findAll() {
    return this.walletAssetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walletAssetsService.findOne(id);
  }
}

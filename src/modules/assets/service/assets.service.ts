/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from '../dto/create-asset.dto';
import { Model } from 'mongoose';
import { Asset } from '../entities/asset.entity';
import { InjectModel } from '@nestjs/mongoose';
import { AssetPresenter } from '../presenter/asset.presenter';

@Injectable()
export class AssetsService {
  constructor(@InjectModel(Asset.name) private assetSchema: Model<Asset>) {}

  async create(createAssetDto: CreateAssetDto) {
    const asset = await this.assetSchema.create(createAssetDto);
    return new AssetPresenter(asset);
  }

  async findAll() {
    const assets = await this.assetSchema.find();
    return assets.map((asset) => new AssetPresenter(asset));
  }

  async findOne(symbol: string) {
    const asset = await this.assetSchema.findOne({ symbol });
    return new AssetPresenter(asset!);
  }
}

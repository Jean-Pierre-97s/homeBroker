import { Asset } from '../entities/asset.entity';

export class AssetPresenter {
  constructor(private asset: Asset) {}

  toJSON() {
    return {
      id: this.asset._id,
      name: this.asset.name,
      symbol: this.asset.symbol,
      image: `http://localhost:9000/${this.asset.image}`,
      price: this.asset.price,
      createdAt: this.formatDate(this.asset.createdAt),
      updatedAt: this.formatDate(this.asset.updatedAt),
    };
  }

  private formatDate(date: Date) {
    return date.toISOString();
  }
}

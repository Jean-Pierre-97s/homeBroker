export type Asset = {
  _id: string;
  name: string;
  symbol: string;
  price: number;
  image: string;
}

export type walletAsset = {
  _id: string;
  asset: Asset;
  shares: number;
}

export type Wallet = {
  _id: string;
  assets: walletAsset[];
}

export class CreateOrderDto {
  wallet: string;
  asset: string;
  type: string;
  shares: number;
  price: number;
}

export type Asset = {
  id: string;
  ticker: string;
  price: number;
}

export type WalletAsset = {
  id: string;
  walletId: string;
  assetId: string;
  shares: number;
  Asset: Asset
}

export type Order = {
  id: string;
  walletId: string;
  assetId: string;
  shares: number;
  partial: number;
  price: number;
  type: 'BUY' | 'SELL';
  createdAt: string;
  updatedAt: string;
  status: 'PENDING' | 'OPEN' | 'CLOSED' | 'FAILED';
  Asset: Pick<Asset, 'id' | 'ticker'>
}

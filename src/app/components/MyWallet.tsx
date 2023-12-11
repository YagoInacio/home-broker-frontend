import React from 'react'
import { WalletAsset } from '../models';
import { isHomeBrokerClosed } from '../utils';

type Props = {
  walletId: string;
}

export default async function MyWallet({ walletId }: Props) {
  const walletAssets = await getWalletAssets(walletId);

  return (
    <ul>
      {walletAssets.map((walletAsset) => {
        return (
          <li key={walletAsset.id}>
            {walletAsset.Asset.id} - {walletAsset.shares} - R${" "}
            {walletAsset.Asset.price}
          </li>
        );
      })}
    </ul>
  )
}

async function getWalletAssets(walletId: string): Promise<WalletAsset[]> {
  const response = await fetch(`http://localhost:8000/wallets/${walletId}/assets`, {
    next: {
      revalidate: isHomeBrokerClosed() ? 60 * 60 : 5,
    }
  });

  return response.json();
}

import React from 'react'
import MyWallet from '../components/MyWallet';

type Props = {
  params: {
    walletId: string;
  }
}

export default async function HomePage({ params: { walletId } }: Props) {

  return (
    <div>
      <h1>Meus investimentos</h1>
      <MyWallet walletId={walletId} />
    </div>
  )
}

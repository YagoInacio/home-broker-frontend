import MyOrders from '@/app/components/MyOrders';
import OrderForm from '@/app/components/OrderForm';
import React from 'react'

type Props = {
  params: {
    walletId: string;
    assetId: string;
  }
}

export default function HomeBrokerPage({ params: { walletId, assetId } }: Props) {
  return (
    <div>
      <h1>Home Broker</h1>
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div>
            <OrderForm walletId={walletId} assetId={assetId}/>
          </div>
          <div>
            <MyOrders walletId={walletId} />
          </div>
        </div>
        <div>grafico</div>
      </div>
    </div>
  )
}
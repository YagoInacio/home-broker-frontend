import React from 'react'
import { Order } from '../models';
import { isHomeBrokerClosed } from '../utils';

type Props = {
  walletId: string;
}

export default async function MyOrders({ walletId }: Props) {
  const orders = await getOrders(walletId);
  return (
    <ul>
      {orders.map((order) => {
        return (
          <li key={order.id}>
            {order.Asset.id} - {order.shares} - R${" "} {order.price} - {order.status}
          </li>
        );
      })}
    </ul>
  )
}

async function getOrders(walletId: string): Promise<Order[]> {
  const response = await fetch(`http://localhost:8000/orders?walletId=${walletId}`, {
    next: {
      tags: [
        `orders-wallet-${walletId}`
      ],
      revalidate: isHomeBrokerClosed() ? 60 * 60 : 5,
    }
  });

  return response.json();
}

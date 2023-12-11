import { revalidateTag } from 'next/cache';
import React from 'react'

type Props = {
  assetId: string;
  walletId: string;
}

export default function OrderForm({ assetId, walletId }: Props) {
  return (
    <div className="flex flex-col">
      <h1>Order Form</h1>
      <form
        className="flex flex-col"
        action={initTransaction}
      >
        <input name="assetId" type="hidden" defaultValue={assetId} />
        <input name="walletId" type="hidden" defaultValue={walletId} />
        <input name="type" type="hidden" defaultValue={"BUY"} />
        <input name="shares" type="number" min={1} step={1} placeholder="quantidade" />
        <input name="price" type="number" min={1} step={0.01} placeholder="preco" />
        <button type="submit">Comprar</button>
      </form>
    </div>
  )
}

async function initTransaction(formData: FormData) {
  'use server';

  const walletId = formData.get('walletId');
  const assetId = formData.get('assetId');
  const type = formData.get('type');
  const shares = formData.get('shares');
  const price = formData.get('price');

  const response = await fetch('http://localhost:8000/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
      walletId,
      assetId,
      type,
      shares,
      price,
      status: 'OPEN',
      Asset: {
        id: assetId,
        ticker: 'ABCD1'
      }
    })
  });

  revalidateTag(`orders-wallet-${walletId}`)

  return response.json();
}

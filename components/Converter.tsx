'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';

interface Props {
  symbol: string;
  icon?: string;
  priceList: Record<string, number>;
}

export default function Converter({ symbol, icon, priceList }: Props) {
  const available = Object.keys(priceList || {});
  const defaultFiat = available.includes('usd') ? 'usd' : available[0] || 'usd';
  const [fiat, setFiat] = useState<string>(defaultFiat);
  const [amount, setAmount] = useState<number>(1);

  React.useEffect(() => {
    if (!available.includes(fiat) && available.length) setFiat(available[0]);
  }, [available, fiat]);

  const price = priceList?.[fiat] ?? null;
  const converted = price !== null ? amount * price : null;

  return (
    <div className="flex flex-col gap-6">
      {/* Amount Input */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-300">Amount</label>
        <div className="flex items-center gap-3">
          {icon ? (
            <Image src={icon} width={40} height={40} alt={symbol} />
          ) : (
            <div className="w-10 h-10 bg-gray-700 rounded-full" />
          )}
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value) || 0)}
            min="0"
            step="any"
            className="flex-1 p-2 rounded bg-dark-400 text-white border border-gray-600 focus:border-purple-500 outline-none"
            placeholder="1"
          />
          <span className="text-sm font-medium text-gray-300">{symbol.toUpperCase()}</span>
        </div>
      </div>

      {/* Converted Amount */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-300">Converted to</label>
        <div className="p-3 rounded bg-dark-400 border border-gray-600">
          <div className="font-semibold text-lg">
            {converted === null ? '-' : formatCurrency(converted, { currency: fiat.toUpperCase() })}
          </div>
          <div className="text-xs text-gray-400">1 {symbol.toUpperCase()} = {formatCurrency(price ?? 0, { currency: fiat.toUpperCase() })}</div>
        </div>
      </div>

      {/* Currency Selector */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-300">Select Currency</label>
        <select
          value={fiat}
          onChange={(e) => setFiat(e.target.value)}
          className="p-2 rounded bg-dark-400 border border-gray-600 text-white focus:border-purple-500 outline-none"
        >
          {available.map((c) => (
            <option key={c} value={c}>
              {c.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

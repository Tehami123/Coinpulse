"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search } from "lucide-react";

const COINGECKO_MARKETS_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

export default function SearchModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [coins, setCoins] = useState<CoinMarketData[]>([]);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open && coins.length === 0) {
      fetch(COINGECKO_MARKETS_URL)
        .then((r) => r.json())
        .then((data) => setCoins(data || []))
        .catch(() => setCoins([]));
    }
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [open]);

  const filtered = (query
    ? coins.filter((c) =>
        `${c.name} ${c.symbol}`.toLowerCase().includes(query.toLowerCase())
      )
    : coins
  ).slice(0, 10);

  function onSelect(id: string) {
    setOpen(false);
    router.push(`/coins/${id}`);
  }

  return (
    <div className="inline-block align-middle ">
      <button
        onClick={() => setOpen(true)}
        aria-label="Open search"
        className="flex items-center gap-2 px-3 py-1 rounded-md bg-dark-500 hover:bg-dark-400 text-sm text-gray-200"
      >
        <Search className="w-4 h-4" />
        <span className="hidden md:inline">Search</span>
        <span className="ml-2 text-xs text-gray-400">Ctrl+K</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-linear-to-br from-dark-900 z-50 flex items-start justify-center pt-20"
          onMouseDown={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div
            ref={panelRef}
            onMouseDown={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-2xl mx-4 bg-dark-600 rounded-lg shadow-lg border border-purple-100/5"
          >
            <div className="p-4">
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search coins by name or symbol..."
                className="w-full bg-dark-500 text-white placeholder:text-gray-400 rounded-md px-3 py-2 border border-purple-100/5 outline-none"
              />
            </div>

            <div className="max-h-72 overflow-y-auto divide-y divide-gray-800">
              {filtered.length === 0 ? (
                <div className="p-4 text-sm text-gray-400">No results</div>
              ) : (
                filtered.map((coin) => (
                  <button
                    key={coin.id}
                    onClick={() => onSelect(coin.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-dark-500 text-left"
                  >
                    <div className="w-8 h-8 relative">
                      <Image
                        src={coin.image}
                        alt={coin.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">{coin.name}</div>
                      <div className="text-xs text-gray-400">{coin.symbol.toUpperCase()}</div>
                    </div>
                    <div className="text-sm text-gray-400">${coin.current_price?.toLocaleString()}</div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

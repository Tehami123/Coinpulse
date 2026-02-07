import { fetcher } from "@/lib/coingeko.actions";
import { NextPageProps } from "@/type.d";
import Image from "next/image";
import Link from "next/link";
import CoinsTable from "@/components/CoinsTable";

const Coins = async ({ searchParams }: NextPageProps) => {
  const params = await searchParams;
  const currentPage = parseInt((params?.page as string) || "1", 10);
  const itemsPerPage = 10;

  const coinsData = await fetcher<CoinMarketData[]>("/coins/markets", {
    vs_currency: "usd",
    order: "market_cap_desc",
    sparkline: "false",
    price_change_percentage: "24h",
    per_page: "250",
  });

  // console.log(coinsData);
  

  const totalPages = Math.ceil(coinsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCoins = coinsData.slice(startIndex, endIndex);

  return (
    <main id="coins-page">
      <div className="content">
        <h4>All Coins</h4>
        <CoinsTable
          coins={paginatedCoins}
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
        />

      </div>
    </main>
  );
};

export default Coins;
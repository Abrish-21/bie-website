import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// The shape of the exchange rate data, updated to match the table design.
interface ExchangeRate {
  currency: string;
  code: string;
  cashBuying: number;
  cashSelling: number;
  transactionalBuying: number;
  transactionalSelling: number;
}

// NOTE: Since there is no free public API for ETB, this component
// uses a placeholder for data fetching. You should replace this
// with your web scraping logic that retrieves data from the National Bank
// of Ethiopia's daily updates, ensuring it returns the new data structure.
async function fetchExchangeRates(): Promise<ExchangeRate[]> {
  // TODO: Implement your web scraping logic here.
  // This function should fetch the daily rates, parse them, and return a
  // structured array of ExchangeRate objects.

  // Example placeholder data for demonstration:
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { 
          currency: 'US Dollar', 
          code: 'USD', 
          cashBuying: 57.50, 
          cashSelling: 58.25,
          transactionalBuying: 57.60,
          transactionalSelling: 58.35
        },
        { 
          currency: 'Euro', 
          code: 'EUR', 
          cashBuying: 61.20, 
          cashSelling: 62.00,
          transactionalBuying: 61.30,
          transactionalSelling: 62.10
        },
        { 
          currency: 'British Pound', 
          code: 'GBP', 
          cashBuying: 70.85, 
          cashSelling: 71.75,
          transactionalBuying: 70.95,
          transactionalSelling: 71.85
        },
        {
          currency: 'Japanese Yen',
          code: 'JPY',
          cashBuying: 0.38,
          cashSelling: 0.39,
          transactionalBuying: 0.385,
          transactionalSelling: 0.395
        },
        {
          currency: 'Saudi Riyal',
          code: 'SAR',
          cashBuying: 15.33,
          cashSelling: 15.60,
          transactionalBuying: 15.40,
          transactionalSelling: 15.65
        }
      ]);
    }, 1000);
  });
}

export function LiveFX() {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRates = async () => {
      try {
        const fetchedRates = await fetchExchangeRates();
        setRates(fetchedRates);
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
      } finally {
        setLoading(false);
      }
    };
    getRates();
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-center text-sm text-gray-500">
        Loading live exchange rates...
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-sm border border-gray-200 rounded-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <span className="h-3 w-3 rounded-full bg-green-500 mr-2 animate-pulse"></span>
        Daily Exchange Rates
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        Source: National Bank of Ethiopia
      </p>

      <div className="overflow-x-auto border-[1px] border-black">
        <table className="min-w-full table-auto">
          <thead className="bg-black text-white uppercase text-xs font-semibold">
            <tr>
              <th className="px-4 py-3 text-left">Currency</th>
              <th className="px-4 py-3 text-left">Code</th>
              <th className="px-4 py-3 text-center" colSpan={2}>Cash</th>
              <th className="px-4 py-3 text-center" colSpan={2}>Transactional</th>
            </tr>
            <tr className="bg-black text-white text-xs">
              <th className="px-4 py-2 border-t border-gray-200"></th>
              <th className="px-4 py-2 border-t border-gray-200"></th>
              <th className="px-4 py-2 text-center border-t border-gray-200">Buying</th>
              <th className="px-4 py-2 text-center border-t border-gray-200">Selling</th>
              <th className="px-4 py-2 text-center border-t border-gray-200">Buying</th>
              <th className="px-4 py-2 text-center border-t border-gray-200">Selling</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black ">
            {rates.map((rate, index) => (
              <tr key={rate.code} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {rate.currency}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                  {rate.code}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center font-bold text-green-600">
                  {rate.cashBuying.toFixed(2)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center font-bold text-red-600">
                  {rate.cashSelling.toFixed(2)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center font-bold text-green-600">
                  {rate.transactionalBuying.toFixed(2)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center font-bold text-red-600">
                  {rate.transactionalSelling.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

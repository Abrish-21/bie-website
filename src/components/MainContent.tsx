import { useRouter } from "next/router";
import { Clock, User, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "./ui/button";

// helper: turn titles into clean slugs
const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

export function MainContent() {
  const router = useRouter();

  const sidebarArticles = [
    {
      title: "Why ETH 500 can't buy ETH 500 worth of goods in Piassa",
      timeAgo: "2 hours ago",
      imageUrl:
        "https://images.unsplash.com/photo-1607623198457-7aad066a4ade?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      excerpt:
        "Exploring Ethiopia's inflation crisis and why the currency's value continues to drop.",
    },
    {
      title: "Bitter harvest: why a quintal per export costs more in local market",
      timeAgo: "4 hours ago",
      imageUrl:
        "https://images.unsplash.com/photo-1666987571351-737b29874697?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      excerpt:
        "Farmers face tough choices as export markets promise higher returns than local buyers.",
    },
    {
      title: "Billionaires see a goldmine in African data centre market",
      timeAgo: "6 hours ago",
      imageUrl:
        "https://images.unsplash.com/photo-1658124974726-d96bc44783cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      excerpt:
        "Global investors pour billions into Africa's fast-growing digital infrastructure.",
    },
    {
      title: "African trade, finance firms seek global investor",
      timeAgo: "8 hours ago",
      imageUrl:
        "https://images.unsplash.com/photo-1551727974-8af20a3322f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      excerpt:
        "African businesses look abroad for funding to expand trade and finance capabilities.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Article */}
        <div className="lg:col-span-2">
          <article className="group">
            <div className="relative mb-6">
              <img
                src="https://images.unsplash.com/photo-1557804500-7a58fbcd4d1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
                alt="Main news story"
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-red-600 text-white px-3 py-1 text-xs font-medium rounded">
                  BREAKING
                </span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <User className="w-4 h-4 mr-1" />
                <span className="mr-4">Editorial Team</span>
                <Clock className="w-4 h-4 mr-1" />
                <span>15 minutes ago</span>
              </div>

              <h1 className="text-4xl font-bold text-black mb-4 leading-tight">
                New Foreign Exchange Policy Transforms Ethiopia's Import-Export
                Landscape
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                The National Bank of Ethiopia announces sweeping changes to
                foreign exchange regulations, promising to streamline currency
                allocation for importers while introducing new incentives for
                exporters. The policy, effective immediately, is expected to
                reduce bureaucratic delays and improve the country's trade
                balance.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Under the new framework, priority sectors including agriculture,
                manufacturing, and technology will receive preferential access
                to foreign currency. The central bank estimates this will reduce
                waiting times for forex allocation from an average of 45 days to
                just 7 days for qualifying businesses.
              </p>
            </div>

          </article>
        </div>
      </div>
    </div>
  );
}

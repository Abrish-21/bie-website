// src/pages/posts/[slug].tsx

import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";
import { ArrowLeft, Clock, Eye, BookOpen, User, Calendar, Tag, BarChart2, MessageSquare } from "lucide-react";
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

// Helper function to generate a URL-friendly slug
const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

interface BasePost {
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  readTime: string;
  publishDate: string;
  author: string;
  views: number;
  fullContent: string;
}

interface FeaturedArticle extends BasePost {
  type: 'featuredArticle';
  tags: string[];
}

interface MarketUpdate extends BasePost {
  type: 'marketUpdate';
  marketImpact: string;
  dataPoints: { label: string; value: string }[];
}

interface OpinionPiece extends BasePost {
  type: 'opinionPiece';
  topic: string;
  authorTitle: string;
  commentsCount: number;
}

type Post = FeaturedArticle | MarketUpdate | OpinionPiece;

// --- Unified Dummy Data for All Posts ---
// In a real application, this data would typically come from a CMS or API.
// For demonstration, it's combined here.
const allPosts: Post[] = [
  {
    type: 'featuredArticle',
    slug: createSlug("Ethiopia's Digital Transformation: A Leap Forward"),
    title: "Ethiopia's Digital Transformation: A Leap Forward",
    excerpt: "Exploring the rapid advancements in digital infrastructure and services reshaping Ethiopia's economy and society.",
    imageUrl: "https://images.unsplash.com/photo-1707018894236-40742e99d6d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU1NjQ0NDUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Technology",
    readTime: "10 min read",
    publishDate: "August 20, 2025",
    author: "Sara Kebede",
    views: 8200,
    tags: ["Digital Economy", "Innovation", "Infrastructure"],
    fullContent: `
      <p class="text-lg leading-relaxed mb-6">Ethiopia is experiencing an unprecedented surge in digital transformation, fundamentally reshaping its economic landscape and daily life for millions. This article delves into the key drivers and impacts of this technological revolution.</p>

      <h2 class="text-3xl font-bold mt-10 mb-6 text-gray-900">Expanding Connectivity and Digital Services</h2>
      <p class="text-base leading-relaxed mb-4">The expansion of internet access, particularly mobile broadband, has been a critical enabler. Government initiatives, coupled with private sector investments, are bridging the digital divide, allowing more citizens to access online services, information, and opportunities.</p>
      <figure class="my-8">
          <img src="https://images.unsplash.com/photo-1517430635293-9c8742d41a7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYSUyMGludGVybmV0fGVufDF8fHwxNzU1NjYzMzY3fDA&lib=rb-4.1.0&q=80&w=1080" alt="Person using a digital device in Ethiopia" class="w-full rounded-lg shadow-lg" />
          <figcaption class="text-center text-sm text-gray-500 mt-2">Digital adoption is accelerating across Ethiopia.</figcaption>
      </figure>
      <p class="text-base leading-relaxed mb-4">Digital banking, e-commerce, and e-governance platforms are rapidly gaining traction, enhancing efficiency and transparency across various sectors.</p>

      <h3 class="text-2xl font-semibold mt-8 mb-4 text-gray-900">Impact on Key Sectors</h3>
      <ul class="list-disc list-inside space-y-2 mb-6 text-base leading-relaxed">
        <li><strong>Finance:</strong> Mobile money and fintech solutions are driving financial inclusion, reaching previously unbanked populations.</li>
        <li><strong>Agriculture:</strong> Digital tools for weather forecasting, market prices, and farm management are empowering farmers.</li>
        <li><strong>Education:</strong> E-learning platforms are expanding access to quality education, especially in remote areas.</li>
      </ul>
      <p class="text-base leading-relaxed">While challenges like digital literacy and cybersecurity remain, Ethiopia's commitment to digital transformation promises a future of enhanced innovation, economic growth, and improved public services.</p>
    `
  },
  {
    type: 'marketUpdate',
    slug: createSlug("Ethiopian Birr Stabilization Efforts Yield Mixed Results"),
    title: "Ethiopian Birr Stabilization Efforts Yield Mixed Results",
    excerpt: "An analysis of the central bank's recent interventions and their impact on the Birr's exchange rate and inflation.",
    imageUrl: "https://images.unsplash.com/photo-1707018894236-40742e99d6d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjdXJyZW5jeSUyMGV4Y2hhbmdlfGVufDF8fHwxNzU1NjQ0NDUwfDA&lib=rb-4.1.0&q=80&w=1080",
    category: "Finance",
    readTime: "7 min read",
    publishDate: "August 19, 2025",
    author: "Dr. Alemayehu Getachew",
    views: 5900,
    marketImpact: "Moderate impact on import costs, limited effect on parallel market.",
    dataPoints: [
      { label: "Official Rate (USD/ETB)", value: "55.20" },
      { label: "Inflation Rate (YoY)", value: "28.5%" },
      { label: "FX Reserves (Months of Imports)", value: "1.8" },
    ],
    fullContent: `
      <p class="text-lg leading-relaxed mb-6">The National Bank of Ethiopia (NBE) has continued its efforts to stabilize the Ethiopian Birr amidst ongoing economic pressures. Recent measures, including tighter monetary policy and foreign exchange auctions, have shown varying degrees of success.</p>

      <h2 class="text-3xl font-bold mt-10 mb-6 text-gray-900">Policy Interventions and Market Response</h2>
      <p class="text-base leading-relaxed mb-4">The NBE's strategy primarily focuses on curbing inflation and reducing the disparity between the official and parallel market exchange rates. This has involved adjusting interest rates and imposing stricter controls on foreign currency outflows.</p>
      <figure class="my-8">
          <img src="https://images.unsplash.com/photo-1589140356597-dc194916a8d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYW4lMjBtb25leXxlbnwxfHx8fDE3NTU2NjM4MjJ8MA&lib=rb-4.1.0&q=80&w=1080" alt="Ethiopian Birr banknotes" class="w-full rounded-lg shadow-lg" />
          <figcaption class="text-center text-sm text-gray-500 mt-2">The Ethiopian Birr remains a focus of central bank policy.</figcaption>
      </figure>
      <p class="text-base leading-relaxed mb-4">While the official exchange rate has seen some stability, the parallel market continues to exhibit significant premiums, indicating persistent foreign currency shortages and a lack of full market confidence.</p>

      <h3 class="text-2xl font-semibold mt-8 mb-4 text-gray-900">Economic Outlook and Future Prospects</h3>
      <ul class="list-disc list-inside space-y-2 mb-6 text-base leading-relaxed">
        <li><strong>Inflation:</strong> Despite efforts, inflation remains high, driven by food prices and global supply chain disruptions.</li>
        <li><strong>Foreign Reserves:</strong> Foreign exchange reserves are slowly improving but remain below optimal levels, impacting import capacity.</li>
        <li><strong>Remittances:</strong> Remittances continue to be a crucial source of foreign currency, though their flow remains sensitive to market conditions.</li>
      </ul>
      <p class="text-base leading-relaxed">The path to full Birr stabilization is long, requiring sustained policy coherence, increased export earnings, and greater investor confidence. The NBE continues to monitor global and domestic factors to refine its approach.</p>
    `
  },
  {
      type: 'opinionPiece',
      slug: createSlug("The Promise of AfCFTA for Ethiopian Businesses"),
      title: "The Promise of AfCFTA for Ethiopian Businesses",
      excerpt: "An op-ed discussing how the African Continental Free Trade Area can unlock new markets and drive industrial growth for Ethiopia.",
      imageUrl: "https://images.unsplash.com/photo-1707018894236-40742e99d6d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYSUyMGJsYWNrJTIwbWFya2V0fGVufDF8fHwxNzU1NjQ0NDUwfDA&lib=rb-4.1.0&q=80&w=1080",
      category: "Trade",
      readTime: "8 min read",
      publishDate: "August 18, 2025",
      author: "Amina Yusuf",
      authorTitle: "Trade Policy Analyst",
      views: 4100,
      commentsCount: 15,
      topic: "African Continental Free Trade Area",
      fullContent: `
        <p class="text-lg leading-relaxed mb-6">The African Continental Free Trade Area (AfCFTA) represents a monumental opportunity for African nations, and Ethiopia stands to gain significantly. As the continent moves towards greater economic integration, Ethiopian businesses must strategically position themselves to capitalize on the vast new markets.</p>
  
        <h2 class="text-3xl font-bold mt-10 mb-6 text-gray-900">Unlocking Regional Market Access</h2>
        <p class="text-base leading-relaxed mb-4">AfCFTA aims to create a single market for goods and services, facilitating free movement of capital and people. For Ethiopia, this means unparalleled access to a market of 1.3 billion people, offering a crucial pathway to diversify exports beyond traditional commodities.</p>
        <figure class="my-8">
            <img src="https://images.unsplash.com/photo-1543269871-74431713d07e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYW4lMjBpbmR1c3RyeXxlbnwxfHx8fDE3NTU2NjM5ODJ8MA&lib=rb-4.1.0&q=80&w=1080" alt="African trade map" class="w-full rounded-lg shadow-lg" />
            <figcaption class="text-center text-sm text-gray-500 mt-2">AfCFTA presents a new frontier for Ethiopian trade.</figcaption>
        </figure>
        <p class="text-base leading-relaxed mb-4">Industries such as textiles, leather products, and processed agricultural goods, where Ethiopia has a competitive advantage, are particularly poised for growth.</p>
  
        <h3 class="text-2xl font-semibold mt-8 mb-4 text-gray-900">Challenges and Strategic Imperatives</h3>
        <ul class="list-disc list-inside space-y-2 mb-6 text-base leading-relaxed">
          <li><strong>Infrastructure:</strong> Enhancing transport and logistics infrastructure is paramount to efficiently connect Ethiopian producers to regional markets.</li>
          <li><strong>Productivity:</strong> Boosting industrial productivity and product quality will be essential to compete effectively within the free trade area.</li>
          <li><strong>Regulatory Harmonization:</strong> Active participation in harmonizing standards and regulations will facilitate smoother trade.</li>
        </ul>
        <p class="text-base leading-relaxed">Ethiopia's proactive engagement with AfCFTA is not just about trade; it's about fostering industrialization, creating jobs, and ensuring long-term economic resilience in a rapidly changing global landscape. The time to act is now.</p>
      `
    },
    {
    type: 'featuredArticle',
    slug: createSlug("The Future of FinTech in Ethiopia"),
    title: "The Future of FinTech in Ethiopia",
    excerpt: "How innovative financial technologies are shaping Ethiopia's banking sector and promoting financial inclusion.",
    imageUrl: "https://images.unsplash.com/photo-1707018894236-40742e99d6d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxmaW5hbmNpYWwlMjB0ZWNobm9sb2d5fGVufDF8fHwxNzU1NjQ0NDUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Finance",
    readTime: "9 min read",
    publishDate: "August 17, 2025",
    author: "Yonas Tesfaye",
    views: 7500,
    tags: ["FinTech", "Mobile Banking", "Financial Inclusion"],
    fullContent: `
      <p class="text-lg leading-relaxed mb-6">Ethiopia's financial sector is undergoing a profound transformation, driven by the rapid adoption of financial technology (FinTech). This article explores how these innovations are not only modernizing banking but also bringing financial services to millions of previously underserved individuals.</p>

      <h2 class="text-3xl font-bold mt-10 mb-6 text-gray-900">Mobile Money and Digital Wallets</h2>
      <p class="text-base leading-relaxed mb-4">Mobile money platforms have emerged as a cornerstone of Ethiopia's FinTech revolution. These services allow users to transfer money, pay bills, and even access micro-loans directly from their phones, bypassing the need for traditional banking infrastructure.</p>
      <figure class="my-8">
          <img src="https://images.unsplash.com/photo-1641989516513-f34dd4305204?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYW4lMjBtb2JpbGUlMjBiYW5raW5nfGVufDF8fHwxNzU1NjY0MDIyfDA&lib=rb-4.1.0&q=80&w=1080" alt="Person using mobile banking app" class="w-full rounded-lg shadow-lg" />
          <figcaption class="text-center text-sm text-gray-500 mt-2">Mobile banking is revolutionizing financial access in Ethiopia.</figcaption>
      </figure>
      <p class="text-base leading-relaxed mb-4">The growth of digital wallets and payment gateways is further accelerating e-commerce and facilitating seamless transactions for businesses and consumers alike.</p>

      <h3 class="text-2xl font-semibold mt-8 mb-4 text-gray-900">Regulatory Landscape and Future Growth</h3>
      <ul class="list-disc list-inside space-y-2 mb-6 text-base leading-relaxed">
        <li><strong>Supportive Regulation:</strong> The National Bank of Ethiopia is actively developing regulatory frameworks to foster innovation while ensuring stability and consumer protection in the FinTech space.</li>
        <li><strong>Partnerships:</strong> Collaborations between traditional banks and FinTech startups are creating a dynamic ecosystem, leveraging existing infrastructure with new technologies.</li>
        <li><strong>Challenges Ahead:</strong> While promising, challenges such as digital literacy, internet penetration in rural areas, and cybersecurity measures need continuous attention for sustainable growth.</li>
      </ul>
      <p class="text-base leading-relaxed">The future of FinTech in Ethiopia is bright, poised to unlock immense economic potential by enhancing efficiency, reducing transaction costs, and ultimately deepening financial inclusion across the country.</p>
    `
  },
];


const PostDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const post = allPosts.find(p => p.slug === slug);

  if (router.isFallback || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-gray-700 text-center text-lg">Loading post or post not found...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-yellow-600 hover:text-yellow-700 transition-colors group">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Homepage</span>
          </Link>
        </div>

        <main className="max-w-4xl mx-auto space-y-10 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <div className="flex flex-wrap items-center justify-center space-x-4 mb-4">
              <Badge className="bg-blue-600 text-white text-base font-medium px-3 py-1.5 rounded-full">
                {post.category}
              </Badge>
              {post.type === 'marketUpdate' && (
                 <Badge className="bg-green-600 text-white text-base font-medium px-3 py-1.5 rounded-full">
                   Market Update
                 </Badge>
              )}
              {post.type === 'opinionPiece' && (
                 <Badge className="bg-purple-600 text-white text-base font-medium px-3 py-1.5 rounded-full">
                   Opinion
                 </Badge>
              )}
               {post.type === 'featuredArticle' && (
                 <Badge className="bg-orange-600 text-white text-base font-medium px-3 py-1.5 rounded-full">
                   Featured Article
                 </Badge>
              )}
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              {post.title}
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-700 leading-relaxed italic max-w-3xl mx-auto">
              {post.excerpt}
            </p>
          </div>

          <figure className="my-8 relative rounded-xl overflow-hidden shadow-md">
            <ImageWithFallback
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-[350px] md:h-[450px] object-cover"
            />
            <figcaption className="sr-only">{post.title}</figcaption>
          </figure>

          <div className="border-t border-b border-gray-200 py-4 mb-6">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
              <span className="flex items-center space-x-2 font-semibold text-gray-800">
                <User className="h-4 w-4 text-gray-500" />
                <span>{post.author}</span>
                {(post as OpinionPiece).authorTitle && (
                    <span className="text-gray-500">, {(post as OpinionPiece).authorTitle}</span>
                )}
              </span>
              <span className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>{post.readTime}</span>
              </span>
              <span className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-gray-500" />
                <span>{post.views.toLocaleString()} views</span>
              </span>
              <span className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>Published: {post.publishDate}</span>
              </span>
              {(post as OpinionPiece).commentsCount !== undefined && (
                <span className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-gray-500" />
                  <span>{(post as OpinionPiece).commentsCount} comments</span>
                </span>
              )}
            </div>
          </div>

          {/* Conditional Content for Market Updates */}
          {(post as MarketUpdate).marketImpact && (
            <Card className="bg-yellow-50 border-yellow-200 shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <BarChart2 className="h-5 w-5 mr-2 text-yellow-600" /> Market Impact
              </h3>
              <p className="text-base text-gray-700 mb-4">{(post as MarketUpdate).marketImpact}</p>
              {(post as MarketUpdate).dataPoints && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(post as MarketUpdate).dataPoints.map((data, i) => (
                    <div key={i} className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-sm font-medium text-gray-600">{data.label}:</span>
                      <span className="text-base font-semibold text-gray-800">{data.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {/* Tags for Featured Articles */}
          {(post as FeaturedArticle).tags && (post as FeaturedArticle).tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {(post as FeaturedArticle).tags.map((tag, i) => (
                <Badge key={i} className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1.5 rounded-full">
                  <Tag className="h-3 w-3 mr-1 text-gray-600"/>{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Full Content */}
          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: post.fullContent }} />
          </div>

          <div className="text-center mt-12">
            <Link href="/" passHref>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-10 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                Back to Homepage
              </Button>
            </Link>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default PostDetailPage;

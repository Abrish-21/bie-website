// src/pages/insight-center/[slug].tsx

import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeft, FileText, Calendar, TrendingUp, User } from "lucide-react";
import { Card, CardContent } from '../../components/ui/card'; // Corrected import path
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { ImageWithFallback } from "../../components/figma/ImageWithFallback"; // Corrected import path
import { Footer } from "../../components/Footer"; // Corrected import path
import { Header } from "../../components/Header"; // Corrected import path

// Dummy data for reports - in a real app, this would come from an API/DB
const dummyReports = [
  {
    slug: "ethiopia-agriculture-report-2025-growth-drivers-export-opportunities",
    title: "Ethiopia Agriculture Report 2025: Growth Drivers & Export Opportunities",
    summary: "Comprehensive analysis of Ethiopia's agricultural sector performance, export opportunities, and policy impacts. Covers coffee, cereals, livestock, and emerging agribusiness trends.",
    coverImage: "https://images.unsplash.com/photo-1742996111692-2d924f12a058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYSUyMGJ1c2luZXNzJTIwbWVldGluZ3xlbnwxfHx8fDE3NTU2NDQ2Mjh8MA&lib=rb-4.1.0&q=80&w=1080",
    pages: 85,
    publishDate: "August 2025",
    author: "B-Insight Research Team",
    keyTakeaways: [
      "Coffee exports surged by 15% in H1 2025 due to strong global demand.",
      "Government policies are fostering increased investment in cereal production.",
      "Livestock sector shows potential for value-added processing and export expansion.",
      "Climate change adaptation strategies are crucial for sustained agricultural growth."
    ],
    fullContent: `
      <p class="text-lg leading-relaxed mb-6">Ethiopia's agricultural sector continues to be the backbone of its economy, contributing significantly to GDP, employment, and export earnings. The <strong>Ethiopia Agriculture Report 2025</strong> provides an in-depth look into the sector's performance, highlighting key growth drivers, emerging opportunities, and the impact of recent policy shifts.</p>

      <h2 class="text-3xl font-bold mt-10 mb-6 text-gray-900">Key Sector Performance Highlights</h2>
      <p class="text-base leading-relaxed mb-4">In the first half of 2025, coffee exports, a major foreign exchange earner, recorded a remarkable 15% increase compared to the same period last year. This surge is primarily attributed to strong international demand and successful market diversification efforts. Similarly, the cereal production sub-sector witnessed robust growth, driven by government-backed initiatives focused on improving agricultural productivity and supporting smallholder farmers with access to modern farming techniques and inputs.</p>
      <figure class="my-8">
          <img src="https://images.unsplash.com/photo-1549480111-9a4f4d2f026a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYSUyMGZhcm1pbmd8ZW58MXx8fHwxNzU1NjQ3MDIyfDA&lib=rb-4.1.0&q=80&w=1080" alt="Ethiopian farming landscape" class="w-full rounded-lg shadow-lg" />
          <figcaption class="text-center text-sm text-gray-500 mt-2">Farmers at work in a fertile region of Ethiopia.</figcaption>
      </figure>

      <h3 class="text-2xl font-semibold mt-8 mb-4 text-gray-900">Livestock and Agribusiness Trends</h3>
      <p class="text-base leading-relaxed mb-4">The livestock sector, traditionally a source of livelihoods for millions, is increasingly seen as a frontier for value-added processing. Investments in modern abattoirs and dairy processing plants are on the rise, aiming to meet both domestic demand and tap into regional export markets. Agribusiness, encompassing various stages from farm to fork, is attracting significant foreign direct investment, particularly in areas like horticulture and food processing, driven by the country's fertile land and diverse climate.</p>

      <h3 class="text-2xl font-semibold mt-8 mb-4 text-gray-900">Policy Environment and Outlook</h3>
      <p class="text-base leading-relaxed mb-4">Recent policy adjustments by the government, including incentives for agricultural mechanization and export-oriented farming, are playing a crucial role in shaping the sector's trajectory. These policies are designed to enhance competitiveness, reduce reliance on rain-fed agriculture, and promote sustainable practices. While challenges such as climate change vulnerability and market access persist, the outlook for Ethiopia's agriculture sector remains positive, with strong potential for sustained growth and increased contribution to national development.</p>

      <p class="text-base leading-relaxed">The report concludes with a detailed forecast for the next 12-18 months, offering insights into projected commodity prices, investment hotspots, and policy recommendations for stakeholders.</p>
    `
  },
  {
    slug: "manufacturing-sector-deep-dive",
    title: "Manufacturing Sector Deep Dive: Industrial Growth & Investment Opportunities",
    summary: "Analysis of Ethiopia's industrial growth trajectory and investment opportunities.",
    coverImage: "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU1NjExMjc5fDA&lib=rb-4.1.0&q=80&w=1080",
    pages: 62,
    publishDate: "July 2025",
    author: "B-Insight Analysts",
    keyTakeaways: [
      "Textile and garment industry shows strong recovery.",
      "Automotive assembly plants are expanding production capacity.",
      "Government focus on industrial parks is attracting FDI.",
      "Energy costs and logistics remain key challenges for manufacturers."
    ],
    fullContent: `
      <p class="text-lg leading-relaxed mb-6">Ethiopia's manufacturing sector is undergoing a transformative period, marked by significant government investment and a growing interest from international investors. This deep-dive report examines the current state of industrial development, key sub-sectors driving growth, and the abundant investment opportunities available.</p>
      <h2 class="text-3xl font-bold mt-10 mb-6 text-gray-900">Industrial Parks and FDI Inflow</h2>
      <p class="text-base leading-relaxed mb-4">The establishment of industrial parks across the country has been a cornerstone of Ethiopia's industrialization strategy. These parks offer state-of-the-art infrastructure, streamlined customs processes, and various incentives to attract foreign direct investment. The textile and garment industry, in particular, has seen a robust recovery, with several new factories commencing operations and existing ones expanding their capacities to meet global demand.</p>
      <figure class="my-8">
          <img src="https://images.unsplash.com/photo-1627916568218-09514f2441c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYSUyMGfhY3Rvcnl8ZW58MXx8fHwxNzU1NjQ3NjAxfDA&lib=rb-4.1.0&q=80&w=1080" alt="Ethiopian factory" class="w-full rounded-lg shadow-lg" />
          <figcaption class="text-center text-sm text-gray-500 mt-2">Modern manufacturing facility in an Ethiopian industrial park.</figcaption>
      </figure>
      <h3 class="text-2xl font-semibold mt-8 mb-4 text-gray-900">Automotive and Construction Materials</h3>
      <p class="text-base leading-relaxed mb-4">Beyond textiles, the automotive assembly sector is witnessing considerable growth, spurred by local demand and government support for domestic production. The construction materials industry is also booming, driven by ongoing infrastructure projects and rapid urbanization. Challenges such as access to consistent energy supply and efficient logistics networks are being addressed through strategic public and private partnerships.</p>
      <p class="text-base leading-relaxed">This report provides detailed insights into sub-sector performance, regulatory frameworks, and future growth projections, making it an essential read for investors and policymakers.</p>
    `
  },
  {
    slug: "ethiopia-fintech-landscape-2025",
    title: "Ethiopia FinTech Landscape 2025",
    summary: "Comprehensive overview of financial technology adoption and regulatory environment.",
    coverImage: "https://images.unsplash.com/photo-1744782211816-c5224434614f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxmaW5hbmNpYWwlMjBjaGFydCUyMGRhdGF8ZW58MXx8fHwxNzU1NjQ0NjI5fDA&lib=rb-4.1.0&q=80&w=1080",
    pages: 45,
    publishDate: "June 2025",
    author: "Digital Economy Experts",
    keyTakeaways: [
      "Mobile money transactions grew by 200% in the last year.",
      "New regulations are fostering a more competitive fintech market.",
      "Increased adoption of digital payments in rural areas.",
      "Challenges include internet penetration and digital literacy."
    ],
    fullContent: `
      <p class="text-lg leading-relaxed mb-6">The Ethiopian FinTech landscape is rapidly evolving, driven by increasing smartphone penetration and government initiatives aimed at fostering a digital economy. The <strong>Ethiopia FinTech Landscape 2025</strong> report offers a comprehensive overview of this dynamic sector, analyzing key trends, regulatory developments, and growth opportunities.</p>
      <h2 class="text-3xl font-bold mt-10 mb-6 text-gray-900">Mobile Money and Digital Payments</h2>
      <p class="text-base leading-relaxed mb-4">Mobile money services have emerged as a significant driver of financial inclusion, particularly in underserved rural areas. Transactions via mobile platforms have seen exponential growth, reflecting a broader shift towards digital payment solutions. The report highlights how various fintech innovations are streamlining financial services, from peer-to-peer transfers to digital lending and insurance.</p>
      <figure class="my-8">
          <img src="https://images.unsplash.com/photo-1621570183180-b74d3d8f8a1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxkaWdpdGFsJTIwcGF5bWVudHMlMjBhZnJpY2F8ZW5uayB8fHwxNzU1NjQ3OTY4fDA&lib=rb-4.1.0&q=80&w=1080" alt="Digital payments in Africa" class="w-full rounded-lg shadow-lg" />
          <figcaption class="text-center text-sm text-gray-500 mt-2">Digital payment services transforming commerce in East Africa.</figcaption>
      </figure>
      <h3 class="text-2xl font-semibold mt-8 mb-4 text-gray-900">Regulatory Environment and Future Outlook</h3>
      <p class="text-base leading-relaxed mb-4">The National Bank of Ethiopia has introduced several regulatory frameworks to support the growth of fintech, ensuring stability while encouraging innovation. Partnerships between traditional banks and fintech startups are becoming more common, creating a vibrant ecosystem. While challenges such as internet connectivity and digital literacy need to be addressed, the long-term outlook for fintech in Ethiopia is exceptionally promising.</p>
      <p class="text-base leading-relaxed">This report serves as a vital resource for fintech companies, investors, and policymakers looking to understand and engage with Ethiopia's evolving digital finance landscape.</p>
    `
  },
  {
    slug: "infrastructure-investment-guide",
    title: "Infrastructure Investment Guide",
    summary: "Strategic analysis of Ethiopia's infrastructure needs and public-private opportunities.",
    coverImage: "https://images.unsplash.com/photo-1741991110666-88115e724741?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYSUyMGJ1c2luZXNzJTIwc2t5bGluZXxlbnwxfHx8fDE3NTU2NDY4Njd8MA&lib=rb-4.1.0&q=80&w=1080",
    pages: 78,
    publishDate: "May 2025",
    author: "Infrastructure Development Group",
    keyTakeaways: [
      "Significant investments in road and rail networks are underway.",
      "Energy infrastructure projects are crucial for industrial growth.",
      "Public-private partnerships (PPPs) are key to bridging funding gaps.",
      "Urban development projects are creating new opportunities for contractors."
    ],
    fullContent: `
      <p class="text-lg leading-relaxed mb-6">Ethiopia's ambitious development agenda heavily relies on robust infrastructure. The <strong>Infrastructure Investment Guide</strong> provides a strategic analysis of the country's critical infrastructure needs, ongoing projects, and the vast opportunities available for investors and development partners.</p>
      <h2 class="text-3xl font-bold mt-10 mb-6 text-gray-900">Transportation Networks and Energy Projects</h2>
      <p class="text-base leading-relaxed mb-4">Major investments are being channeled into expanding and modernizing transportation networks, including extensive road construction projects and the development of new railway lines to enhance connectivity and facilitate trade. Concurrently, large-scale energy projects, particularly in hydroelectric power and renewable sources, are crucial for supporting industrial growth and ensuring energy security across the nation.</p>
      <figure class="my-8">
          <img src="https://images.unsplash.com/photo-1601662528390-bf38b25f4699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYSUyMGluZnJhc3RydWN0dXJlfGVufDF8fHwxNzU1NjQ4MjEzfDA&lib=rb-4.1.0&q=80&w=1080" alt="Ethiopian infrastructure" class="w-full rounded-lg shadow-lg" />
          <figcaption class="text-center text-sm text-gray-500 mt-2">Modern bridge construction in Ethiopia, symbolizing connectivity and progress.</figcaption>
      </figure>
      <h3 class="text-2xl font-semibold mt-8 mb-4 text-gray-900">Public-Private Partnerships and Urban Development</h3>
      <p class="text-base leading-relaxed mb-4">Public-Private Partnerships (PPPs) are at the forefront of financing and implementing large-scale infrastructure projects, offering attractive investment opportunities for both local and international entities. Rapid urbanization is also driving significant demand for urban infrastructure, including housing, sanitation, and transportation systems, creating new avenues for contractors and developers.</p>
      <p class="text-base leading-relaxed">This guide details the strategic importance of various infrastructure sub-sectors, providing essential information for those looking to invest in Ethiopia's growing economy.</p>
    `
  },
  {
    slug: "ceo-insights-on-ethiopias-economic-landscape",
    title: "CEO Insights on Ethiopia's Economic Landscape",
    summary: "Expert analysis from a leading CEO on the current business climate, challenges, and opportunities in Ethiopia.",
    coverImage: "https://images.unsplash.com/photo-1610631066894-62452ccb927c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjZW8lMjBwb3J0cmFpdCUyMHprb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTU2NDY4Njh8MA&lib=rb-4.1.0&q=80&w=1080",
    pages: 15,
    publishDate: "August 2025",
    author: "Almaz Mekonnen",
    keyTakeaways: [
      "Currency volatility is a significant business challenge.",
      "Opportunities in manufacturing and agriculture are immense.",
      "Strategic market understanding is key to mitigating risks.",
      "A young workforce and strategic location are key advantages."
    ],
    fullContent: `
      <p class="text-lg leading-relaxed mb-6">In a recent interview, Almaz Mekonnen, CEO of Ethiopian Agribusiness Corp, shared her perspectives on the current economic landscape and the challenges and opportunities facing businesses in Ethiopia.</p>
      <h2 class="text-3xl font-bold mt-10 mb-6 text-gray-900">Navigating Currency Volatility</h2>
      <p class="text-base leading-relaxed mb-4">Mekonnen highlighted **currency volatility** as the most pressing challenge, affecting import costs and financial planning for many businesses. "The fluctuating Birr creates an unpredictable environment, making long-term forecasting difficult," she stated. However, she emphasized that resilient strategies and strong market understanding are key to mitigating these risks.</p>
      <figure class="my-8">
          <img src="https://images.unsplash.com/photo-1579532536935-619928decd08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxidXNpbmVzcyUyMGNvbmZlcmVuY2UlMjBhZnJpY2F8ZW58MXx8fHwxNzU1NjQ4NzYxfDA&lib=rb-4.1.0&q=80&w=1080" alt="Business conference in Africa" class="w-full rounded-lg shadow-lg" />
          <figcaption class="text-center text-sm text-gray-500 mt-2">Leaders discussing economic trends at a business conference.</figcaption>
      </figure>
      <h3 class="text-2xl font-semibold mt-8 mb-4 text-gray-900">Opportunities in Core Sectors</h3>
      <p class="text-base leading-relaxed mb-4">Despite the challenges, Mekonnen remains optimistic about Ethiopia's potential, particularly in **manufacturing and agriculture**. "The opportunities in these sectors are immense and far outweigh the risks," she noted. She pointed to growing domestic markets, strategic geographic location, and a young workforce as key advantages.</p>
      <p class="text-base leading-relaxed">Her insights underscore a common sentiment among Ethiopian business leaders: while macro-economic factors present hurdles, the fundamental growth drivers within key industries offer compelling prospects for resilient investors.</p>
    `
  },
  {
    slug: "b-index-business-confidence-tracker",
    title: "B-Index: Business Confidence Tracker Report",
    summary: "The B-Index measures business confidence across key sectors including manufacturing, services, and agriculture based on monthly CEO surveys.",
    coverImage: "https://images.unsplash.com/photo-1559108422-4467c699042b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxmaW5hbmNpYWwlMjBjaGFydCUyMGRhdGF8ZW58MXx8fHwxNzU1NjU1Mzg5fDA&lib=rb-4.1.0&q=80&w=1080",
    pages: 20,
    publishDate: "August 2025",
    author: "B-Insight Data Science Team",
    keyTakeaways: [
      "Confidence levels rose by 3.2% in August, driven by service and tech sectors.",
      "Access to credit and policy stability remain key concerns.",
      "Future outlook is cautiously optimistic among surveyed CEOs."
    ],
    fullContent: `
      <p class="text-lg leading-relaxed mb-6">The **B-Index** serves as a vital barometer for the health of the Ethiopian business environment. This monthly report, compiled from surveys of over 500 CEOs and executives, tracks business confidence levels across key sectors including manufacturing, services, and agriculture.</p>
      <h2 class="text-3xl font-bold mt-10 mb-6 text-gray-900">August 2025 Findings</h2>
      <p class="text-base leading-relaxed mb-4">The latest data indicates a modest increase in the index, rising to **127.4**—a 3.2% increase from the previous month. This positive shift is largely attributed to renewed optimism within the service and technology sectors, which have shown resilience in the face of ongoing economic challenges.</p>
      <figure class="my-8">
          <img src="https://images.unsplash.com/photo-1549480111-9a4f4d2f026a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxmaW5hbmNpYWwlMjBjaGFydCUyMGRhdGF8ZW58MXx8fHwxNzU1NjU1NjczfDA&lib=rb-4.1.0&q=80&w=1080" alt="Financial data chart" class="w-full rounded-lg shadow-lg" />
          <figcaption class="text-center text-sm text-gray-500 mt-2">A visual representation of the B-Index over time.</figcaption>
      </figure>
      <h3 class="text-2xl font-semibold mt-8 mb-4 text-gray-900">Sectoral Analysis and Future Outlook</h3>
      <p class="text-base leading-relaxed mb-4">While confidence is up, the report notes that persistent issues such as access to affordable credit and a stable regulatory environment continue to be top concerns for business leaders. Despite these hurdles, a majority of CEOs express a **cautiously optimistic outlook** for the final quarter of the year, expecting a gradual improvement in economic conditions.</p>
    `
  },
  {
    slug: "digital-payment-adoption",
    title: "Digital Payment Adoption: Trends Across Ethiopia",
    summary: "Mobile money usage trends across Ethiopia.",
    coverImage: "https://images.unsplash.com/photo-1563207106-a94f6e3c1a3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxkaWdpdGFsJTIwcGF5bWVudHMlMjBhZnJpY2F8ZW58MXx8fHwxNzU1NjUwMTY3fDA&lib=rb-4.1.0&q=80&w=1080",
    pages: 35,
    publishDate: "July 2025",
    author: "Fintech Lab",
    keyTakeaways: [
      "Mobile money transactions grew by 200% in the last year.",
      "New regulations are fostering a more competitive fintech market.",
      "Increased adoption of digital payments in rural areas.",
      "Challenges include internet penetration and digital literacy."
    ],
    fullContent: `
      <p class="text-lg leading-relaxed mb-6">A deep dive into the accelerating adoption of digital payment solutions across Ethiopia, analyzing the factors driving this growth and its implications for the financial sector.</p>
      <h2 class="text-3xl font-bold mt-10 mb-6 text-gray-900">Rural and Urban Dynamics</h2>
      <p class="text-base leading-relaxed mb-4">The report highlights how mobile money is bridging the financial inclusion gap in rural areas, while urban centers are seeing sophisticated digital wallet and online transaction systems emerge.</p>
      <figure class="my-8">
          <img src="https://images.unsplash.com/photo-1563207106-a94f6e3c1a3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxkaWdpdGFsJTIwcGF5bWVudHMlMjBhZnJpY2F8ZW58MXx8fHwxNzU1NjUwMTY3fDA&lib=rb-4.1.0&q=80&w=1080" alt="Digital payment on phone" class="w-full rounded-lg shadow-lg" />
          <figcaption class="text-center text-sm text-gray-500 mt-2">Mobile payment transactions are becoming increasingly common.</figcaption>
      </figure>
      <p class="text-base leading-relaxed">Key drivers include increased mobile phone penetration, government support for cashless transactions, and innovative services offered by telecom operators and fintech companies.</p>
    `
  },
  {
    slug: "green-finance-initiative",
    title: "Green Finance Initiative",
    summary: "Sustainable investment opportunities.",
    coverImage: "https://images.unsplash.com/photo-1549480111-9a4f4d2f026a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzb2xhciUyMGZhcm0lMjBhZnJpY2F8ZW58MXx8fHwxNzU1NjUwMzA2fDA&lib=rb-4.1.0&q=80&w=1080",
    pages: 28,
    publishDate: "July 2025",
    author: "Sustainable Business Institute",
    keyTakeaways: [
      "Significant investments in renewable energy and eco-friendly projects.",
      "New green bonds and financial instruments are emerging.",
      "International partnerships are key to funding large-scale projects.",
    ],
    fullContent: `
      <p class="text-lg leading-relaxed mb-6">An exploration of Ethiopia's burgeoning green finance sector, detailing sustainable investment opportunities in renewable energy, eco-friendly agriculture, and waste management.</p>
      <h2 class="text-3xl font-bold mt-10 mb-6 text-gray-900">Renewable Energy Projects</h2>
      <p class="text-base leading-relaxed mb-4">The country is leveraging its vast renewable energy potential, with significant projects in hydropower, solar, and wind power attracting green financing from international institutions.</p>
      <figure class="my-8">
          <img src="https://images.unsplash.com/photo-1549480111-9a4f4d2f026a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzb2xhciUyMGZhcm0lMjBhZnJpY2F8ZW58MXx8fHwxNzU1NjUwMzA2fDA&lib=rb-4.1.0&q=80&w=1080" alt="Solar farm in Africa" class="w-full rounded-lg shadow-lg" />
          <figcaption class="text-center text-sm text-gray-500 mt-2">Solar energy projects are key to Ethiopia's green finance initiatives.</figcaption>
      </figure>
      <p class="text-base leading-relaxed">The report also covers sustainable agriculture practices and eco-tourism as critical areas for green investment.</p>
    `
  },
  {
    slug: "sme-growth-report",
    title: "SME Growth Report",
    summary: "Small business sector analysis.",
    coverImage: "https://images.unsplash.com/photo-1563207106-a94f6e3c1a3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzbWUlMjBhZnJpY2F8ZW5uayB8fHwxNzU1NjUwNDg5fDA&lib=rb-4.1.0&q=80&w=1080",
    pages: 40,
    publishDate: "June 2025",
    author: "Small Business Council",
    keyTakeaways: [
      "SMEs are vital for job creation and fostering innovation.",
      "Access to finance remains a major challenge.",
      "Government support programs are proving effective."
    ],
    fullContent: `
      <p class="text-lg leading-relaxed mb-6">An in-depth report on the growth of Small and Medium-sized Enterprises (SMEs) in Ethiopia, analyzing their contributions to economic development, challenges faced, and policy support mechanisms.</p>
      <h2 class="text-3xl font-bold mt-10 mb-6 text-gray-900">Job Creation and Innovation</h2>
      <p class="text-base leading-relaxed mb-4">SMEs are vital for job creation and fostering innovation. The report highlights sub-sectors where SMEs are thriving, such as local manufacturing, handicrafts, and tech startups.</p>
      <figure class="my-8">
          <img src="https://images.unsplash.com/photo-1563207106-a94f6e3c1a3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzbWUlMjBhZnJpY2F8ZW5uayB8fHwxNzU1NjUwNDg5fDA&lib=rb-4.1.0&q=80&w=1080" alt="Small business in Africa" class="w-full rounded-lg shadow-lg" />
          <figcaption class="text-center text-sm text-gray-500 mt-2">A vibrant small business operating in a local market.</figcaption>
      </figure>
      <p class="text-base leading-relaxed">Key challenges include access to finance, market linkages, and regulatory hurdles, which government and non-governmental organizations are working to address through various support programs.</p>
    `
  }
];


const ReportDetail = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Find the report based on the slug
  const report = dummyReports.find(r => r.slug === slug);

  if (router.isFallback || !report) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-gray-700">Loading report or report not found...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content Area - Full Width with Padding and Centered */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Back to Insight Center Link */}
          <div className="mb-6">
            <Link href="/insight-center" className="flex items-center text-yellow-600 hover:text-yellow-700 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Back to Insight Center</span>
            </Link>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            {report.title}
          </h1>

          {/* Summary */}
          <p className="text-xl font-light text-gray-600 leading-relaxed italic border-l-4 border-yellow-500 pl-4">
            {report.summary}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap items-center justify-between border-t border-b border-gray-200 py-4 gap-4">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span className="font-semibold text-gray-900">{report.author || "B-Insight Team"}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{report.publishDate}</span>
              </span>
              <span className="flex items-center space-x-1">
                <FileText className="h-4 w-4" />
                <span>{report.pages} pages</span>
              </span>
            </div>
          </div>

          {/* Main Image */}
          <figure className="mb-6">
            <ImageWithFallback
              src={report.coverImage}
              alt={report.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <figcaption className="text-xs text-gray-500 mt-2 text-center">{report.title}</figcaption>
          </figure>

          {/* Report Content */}
          <div className="prose prose-lg max-w-none text-gray-800">
            <div dangerouslySetInnerHTML={{ __html: report.fullContent }} />
          </div>

          {/* Key Takeaways */}
          {report.keyTakeaways && report.keyTakeaways.length > 0 && (
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-yellow-600 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-3" /> Key Takeaways
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {report.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="text-base leading-relaxed">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>

        {/* Related Reports and Custom Research Sections at the end */}
        <aside className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-6">
          <Card className="shadow-sm border-0">
            <CardContent className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">Related Insights</h3>
              <p className="text-gray-600 text-sm">
                This section can feature links to other relevant reports or analysis.
                It helps keep users engaged with more of your content.
              </p>
              <Button size="sm" variant="outline" className="w-full mt-4 text-yellow-600 border-yellow-600 hover:bg-yellow-50">
                View More Insights
              </Button>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-0 bg-yellow-50">
            <CardContent className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">Need Custom Research?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Our team can provide tailored reports and market analysis specific to your needs.
              </p>
              <Button size="sm" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                Request a Consultation
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
      <Footer />
    </div>
  );
};

export default ReportDetail;
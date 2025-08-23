// src/pages/insight-center/index.tsx

import React from 'react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback'; // Corrected import path
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';
import { Footer } from '../../components/Footer'; // Corrected import path
import { FileText, BarChart3, Users, TrendingUp, ExternalLink, BookOpen, Quote } from 'lucide-react'; 
import { Header } from '../../components/Header'; // Corrected import path
import Link from 'next/link';

// Helper function to generate a URL-friendly slug from a title
const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

export default function InsightCenterPage() {
  // Featured Report for top section
  const featuredReport = {
    title: "Ethiopia Agriculture Report 2025: Growth Drivers & Export Opportunities", 
    summary: "Comprehensive analysis of Ethiopia's agricultural sector performance, export opportunities, and policy impacts. Covers coffee, cereals, livestock, and emerging agribusiness trends.",
    coverImage: "https://images.unsplash.com/photo-1742996111692-2d924f12a058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYSUyMGJ1c2luZXNzJTIwbWVldGluZ3xlbnwxfHx8fDE3NTU2NDQ2Mjh8MA&lib=rb-4.1.0&q=80&w=1080",
    pages: 85,
    publishDate: "August 2025",
    slug: createSlug("Ethiopia Agriculture Report 2025: Growth Drivers & Export Opportunities"), 
    author: "B-Insight Research Team", 
    keyTakeaways: [
      "Coffee exports surged by 15% in H1 2025 due to strong global demand.",
      "Government policies are fostering increased investment in cereal production.",
      "Livestock sector shows potential for value-added processing and export expansion.",
      "Climate change adaptation strategies are crucial for sustained agricultural growth."
    ],
    fullContent: `
      <p class="text-lg leading-relaxed mb-6">Ethiopia's agricultural sector continues to be the backbone of its economy, contributing significantly to GDP, employment, and export earnings. The <strong>Ethiopia Agriculture Report 2025</strong> provides an in-depth look into the sector's performance, highlighting key growth drivers, emerging opportunities, and the impact of recent policy shifts.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4 text-gray-900">Key Sector Performance Highlights</h2>
      <p class="text-base leading-relaxed mb-4">In the first half of 2025, coffee exports, a major foreign exchange earner, recorded a remarkable 15% increase compared to the same period last year. This surge is primarily attributed to strong international demand and successful market diversification efforts. Similarly, the cereal production sub-sector witnessed robust growth, driven by government-backed initiatives focused on improving agricultural productivity and supporting smallholder farmers with access to modern farming techniques and inputs.</p>
      <figure class="my-8">
          <img src="https://images.unsplash.com/photo-1549480111-9a4f4d2f026a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYSUyMGZhcm1pbmd8ZW58MXx8fHwxNzU1NjQ3MDIyfDA&lib=rb-4.1.0&q=80&w=1080" alt="Ethiopian farming landscape" class="w-full rounded-lg shadow-lg" />
          <figcaption class="text-center text-sm text-gray-500 mt-2">Farmers at work in a fertile region of Ethiopia.</figcaption>
      </figure>

      <h3 class="text-xl font-semibold mt-6 mb-3 text-gray-900">Livestock and Agribusiness Trends</h3>
      <p class="text-base leading-relaxed mb-4">The livestock sector, traditionally a source of livelihoods for millions, is increasingly seen as a frontier for value-added processing. Investments in modern abattoirs and dairy processing plants are on the rise, aiming to meet both domestic demand and tap into regional export markets. Agribusiness, encompassing various stages from farm to fork, is attracting significant foreign direct investment, particularly in areas like horticulture and food processing, driven by the country's fertile land and diverse climate.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3 text-gray-900">Policy Environment and Outlook</h3>
      <p class="text-base leading-relaxed mb-4">Recent policy adjustments by the government, including incentives for agricultural mechanization and export-oriented farming, are playing a crucial role in shaping the sector's trajectory. These policies are designed to enhance competitiveness, reduce reliance on rain-fed agriculture, and promote sustainable practices. While challenges such as climate change vulnerability and market access persist, the outlook for Ethiopia's agriculture sector remains positive, with strong potential for sustained growth and increased contribution to national development.</p>

      <p class="text-base leading-relaxed">The report concludes with a detailed forecast for the next 12-18 months, offering insights into projected commodity prices, investment hotspots, and policy recommendations for stakeholders.</p>
    `
  };

  // Additional B-Insight Reports - Updated with dummy fullContent and author
  const additionalReports = [
    {
      title: "Manufacturing Sector Deep Dive",
      summary: "Analysis of Ethiopia's industrial growth trajectory and investment opportunities.",
      thumbnail: "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU1NjExMjc5fDA&lib=rb-4.1.0&q=80&w=1080",
      pages: 62,
      publishDate: "July 2025",
      slug: createSlug("Manufacturing Sector Deep Dive"),
      author: "Industry Analysis Group",
      keyTakeaways: [
        "Textile and garment industry shows strong recovery.",
        "Automotive assembly plants are expanding production capacity.",
        "Government focus on industrial parks is attracting FDI.",
        "Energy costs and logistics remain key challenges for manufacturers."
      ],
      fullContent: `
        <p class="text-lg leading-relaxed mb-6">Ethiopia's manufacturing sector is undergoing a transformative period, marked by significant government investment and a growing interest from international investors. This deep-dive report examines the current state of industrial development, key sub-sectors driving growth, and the abundant investment opportunities available.</p>
        <h2 class="text-2xl font-semibold mt-8 mb-4 text-gray-900">Industrial Parks and FDI Inflow</h2>
        <p class="text-base leading-relaxed mb-4">The establishment of industrial parks across the country has been a cornerstone of Ethiopia's industrialization strategy. These parks offer state-of-the-art infrastructure, streamlined customs processes, and various incentives to attract foreign direct investment. The textile and garment industry, in particular, has seen a robust recovery, with several new factories commencing operations and existing ones expanding their capacities to meet global demand.</p>
        <figure class="my-8">
            <img src="https://images.unsplash.com/photo-1627916568218-09514f2441c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYSUyMGfhY3Rvcnl8ZW58MXx8fHwxNzU1NjQ3NjAxfDA&lib=rb-4.1.0&q=80&w=1080" alt="Ethiopian factory" class="w-full rounded-lg shadow-lg" />
            <figcaption class="text-center text-sm text-gray-500 mt-2">Modern manufacturing facility in an Ethiopian industrial park.</figcaption>
        </figure>
        <h3 class="text-xl font-semibold mt-6 mb-3 text-gray-900">Automotive and Construction Materials</h3>
        <p class="text-base leading-relaxed mb-4">Beyond textiles, the automotive assembly sector is witnessing considerable growth, spurred by local demand and government support for domestic production. The construction materials industry is also booming, driven by ongoing infrastructure projects and rapid urbanization. Challenges such as access to consistent energy supply and efficient logistics networks are being addressed through strategic public and private partnerships.</p>
        <p class="text-base leading-relaxed">This report provides detailed insights into sub-sector performance, regulatory frameworks, and future growth projections, making it an essential read for investors and policymakers.</p>
      `
    },
    {
      title: "Ethiopia FinTech Landscape 2025",
      summary: "Comprehensive overview of financial technology adoption and regulatory environment.",
      thumbnail: "https://images.unsplash.com/photo-1744782211816-c5224434614f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxmaW5hbmNpYWwlMjBjaGFydCUyMGRhdGF8ZW58MXx8fHwxNzU1NjQ0NjI5fDA&lib=rb-4.1.0&q=80&w=1080",
      pages: 45,
      publishDate: "June 2025",
      slug: createSlug("Ethiopia FinTech Landscape 2025"),
      author: "Digital Economy Experts",
      keyTakeaways: [
        "Mobile money transactions grew by 200% in the last year.",
        "New regulations are fostering a more competitive fintech market.",
        "Increased adoption of digital payments in rural areas.",
        "Challenges include internet penetration and digital literacy."
      ],
      fullContent: `
        <p class="text-lg leading-relaxed mb-6">The Ethiopian FinTech landscape is rapidly evolving, driven by increasing smartphone penetration and government initiatives aimed at fostering a digital economy. The <strong>Ethiopia FinTech Landscape 2025</strong> report offers a comprehensive overview of this dynamic sector, analyzing key trends, regulatory developments, and growth opportunities.</p>
        <h2 class="text-2xl font-semibold mt-8 mb-4 text-gray-900">Mobile Money and Digital Payments</h2>
        <p class="text-base leading-relaxed mb-4">Mobile money services have emerged as a significant driver of financial inclusion, particularly in underserved rural areas. Transactions via mobile platforms have seen exponential growth, reflecting a broader shift towards digital payment solutions. The report highlights how various fintech innovations are streamlining financial services, from peer-to-peer transfers to digital lending and insurance.</p>
        <figure class="my-8">
            <img src="https://images.unsplash.com/photo-1621570183180-b74d3d8f8a1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxkaWdpdGFsJTIwcGF5bWVudHMlMjBhZnJpY2F8ZW5uayB8fHwxNzU1NjQ3OTY4fDA&lib=rb-4.1.0&q=80&w=1080" alt="Digital payments in Africa" class="w-full rounded-lg shadow-lg" />
            <figcaption class="text-center text-sm text-gray-500 mt-2">Digital payment services transforming commerce in East Africa.</figcaption>
        </figure>
        <h3 class="text-xl font-semibold mt-6 mb-3 text-gray-900">Regulatory Environment and Future Outlook</h3>
        <p class="text-base leading-relaxed mb-4">The National Bank of Ethiopia has introduced several regulatory frameworks to support the growth of fintech, ensuring stability while encouraging innovation. Partnerships between traditional banks and fintech startups are becoming more common, creating a vibrant ecosystem. While challenges such as internet connectivity and digital literacy need to be addressed, the long-term outlook for fintech in Ethiopia is exceptionally promising.</p>
        <p class="text-base leading-relaxed">This report serves as a vital resource for fintech companies, investors, and policymakers looking to understand and engage with Ethiopia's evolving digital finance landscape.</p>
      `
    },
    {
      title: "Infrastructure Investment Guide",
      summary: "Strategic analysis of Ethiopia's infrastructure needs and public-private opportunities.",
      thumbnail: "https://images.unsplash.com/photo-1741991110666-88115e724741?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYSUyMGJ1c2luZXNzJTIwc2t5bGluZXxlbnwxfHx8fDE3NTU2NDY4Njd8MA&lib=rb-4.1.0&q=80&w=1080",
      pages: 78,
      publishDate: "May 2025",
      slug: createSlug("Infrastructure Investment Guide"),
      author: "Infrastructure Development Group",
      keyTakeaways: [
        "Significant investments in road and rail networks are underway.",
        "Energy infrastructure projects are crucial for industrial growth.",
        "Public-private partnerships (PPPs) are key to bridging funding gaps.",
        "Urban development projects are creating new opportunities for contractors."
      ],
      fullContent: `
        <p class="text-lg leading-relaxed mb-6">Ethiopia's ambitious development agenda heavily relies on robust infrastructure. The <strong>Infrastructure Investment Guide</strong> provides a strategic analysis of the country's critical infrastructure needs, ongoing projects, and the vast opportunities available for investors and development partners.</p>
        <h2 class="text-2xl font-semibold mt-8 mb-4 text-gray-900">Transportation Networks and Energy Projects</h2>
        <p class="text-base leading-relaxed mb-4">Major investments are being channeled into expanding and modernizing transportation networks, including extensive road construction projects and the development of new railway lines to enhance connectivity and facilitate trade. Concurrently, large-scale energy projects, particularly in hydroelectric power and renewable sources, are crucial for supporting industrial growth and ensuring energy security across the nation.</p>
        <figure class="my-8">
            <img src="https://images.unsplash.com/photo-1601662528390-bf38b25f4699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYSUyMGluZnJhc3RydWN0dXJlfGVufDF8fHwxNzU1NjQ4MjEzfDA&lib=rb-4.1.0&q=80&w=1080" alt="Ethiopian infrastructure" class="w-full rounded-lg shadow-lg" />
          <figcaption class="text-center text-sm text-gray-500 mt-2">Modern bridge construction in Ethiopia, symbolizing connectivity and progress.</figcaption>
      </figure>
      <h3 class="text-xl font-semibold mt-6 mb-3 text-gray-900">Public-Private Partnerships and Urban Development</h3>
      <p class="text-base leading-relaxed mb-4">Public-Private Partnerships (PPPs) are at the forefront of financing and implementing large-scale infrastructure projects, offering attractive investment opportunities for both local and international entities. Rapid urbanization is also driving significant demand for urban infrastructure, including housing, sanitation, and transportation systems, creating new avenues for contractors and developers.</p>
      <p class="text-base leading-relaxed">This guide details the strategic importance of various infrastructure sub-sectors, providing essential information for those looking to invest in Ethiopia's growing economy.</p>
    `
    }
  ];

  // CEO Barometer featured quote - added fullContent for potential future detail page
  const featuredCEOQuote = {
    title: "CEO Insights on Ethiopia's Economic Landscape",
    quote: "Ethiopia's biggest business challenge is currency volatility, but the opportunities in manufacturing and agriculture far outweigh the risks.",
    ceoName: "Almaz Mekonnen",
    company: "Ethiopian Agribusiness Corp",
    photo: "https://images.unsplash.com/photo-1610631066894-62452ccb927c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjZW8lMjBwb3J0cmFpdCUyMHprb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTU2NDY4Njh8MA&lib=rb-4.1.0&q=80&w=1080",
    slug: createSlug("CEO-Insights-on-Ethiopias-Economic-Landscape"),
    fullContent: `
      <p class="text-lg leading-relaxed mb-6">In a recent interview, Almaz Mekonnen, CEO of Ethiopian Agribusiness Corp, shared her perspectives on the current economic landscape and the challenges and opportunities facing businesses in Ethiopia.</p>
      <h2 class="text-2xl font-semibold mt-8 mb-4 text-gray-900">Navigating Currency Volatility</h2>
      <p class="text-base leading-relaxed mb-4">Mekonnen highlighted **currency volatility** as the most pressing challenge, affecting import costs and financial planning for many businesses. "The fluctuating Birr creates an unpredictable environment, making long-term forecasting difficult," she stated. However, she emphasized that resilient strategies and strong market understanding are key to mitigating these risks.</p>
      <figure class="my-8">
          <img src="https://images.unsplash.com/photo-1579532536935-619928decd08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxidXNpbmVzcyUyMGNvbmZlcmVuY2UlMjBhZnJpY2F8ZW58MXx8fHwxNzU1NjQ4NzYxfDA&lib=rb-4.1.0&q=80&w=1080" alt="Business conference in Africa" class="w-full rounded-lg shadow-lg" />
          <figcaption class="text-center text-sm text-gray-500 mt-2">Leaders discussing economic trends at a business conference.</figcaption>
      </figure>
      <h3 class="text-xl font-semibold mt-6 mb-3 text-gray-900">Opportunities in Core Sectors</h3>
      <p class="text-base leading-relaxed mb-4">Despite the challenges, Mekonnen remains optimistic about Ethiopia's potential, particularly in **manufacturing and agriculture**. "The opportunities in these sectors are immense and far outweigh the risks," she noted. She pointed to growing domestic markets, strategic geographic location, and a young workforce as key advantages.</p>
      <p class="text-base leading-relaxed">Her insights underscore a common sentiment among Ethiopian business leaders: while macro-economic factors present hurdles, the fundamental growth drivers within key industries offer compelling prospects for resilient investors.</p>
    `
  };

  // CEO Barometer mini infographics - for display only on index
  const ceoInsights = [
    {
      title: "Top 5 Challenges in 2025",
      type: "list",
      data: [
        { label: "Currency Volatility", value: 35 },
        { label: "Access to Credit", value: 22 },
        { label: "Regulatory Changes", value: 18 },
        { label: "Skills shortage", value: 15 },
        { label: "Infrastructure", value: 10 }
      ]
    },
    {
      title: "CEO Confidence Levels",
      type: "bar-chart",
      data: [
        { period: "Q1 2025", value: 72 },
        { period: "Q2 2025", value: 68 },
        { period: "Q3 2025", value: 75 },
        { period: "Q4 2025", value: 79 }
      ]
    },
    {
      title: "Investment Priorities",
      type: "ranking",
      data: [
        { item: "Technology Upgrade", rank: 1 },
        { item: "Market Expansion", rank: 2 },
        { item: "Human Capital", rank: 3 },
        { item: "Supply Chain", rank: 4 }
      ]
    }
  ];

  // B-Index data
  const bIndexData = {
    currentValue: 127.4,
    change: 3.2,
    trend: "up",
    lastUpdate: "August 19, 2025",
    monthlyTrend: [
      { month: "Mar", value: 118.2 },
      { month: "Apr", value: 120.8 },
      { month: "May", value: 123.1 },
      { month: "Jun", value: 119.7 },
      { month: "Jul", value: 124.3 },
      { month: "Aug", value: 127.4 }
    ],
    slug: createSlug("B-Index-Business-Confidence-Tracker"), 
    description: "The B-Index measures business confidence across key sectors including manufacturing, services, and agriculture based on monthly CEO surveys."
  };
  
  // Trending Research data - updated to link to a generic detail page
  const trendingResearch = [
    {
      title: "Digital Payment Adoption",
      summary: "Mobile money usage trends across Ethiopia.",
      slug: createSlug("Digital Payment Adoption"),
      fullContent: `
        <p class="text-lg leading-relaxed mb-6">A deep dive into the accelerating adoption of digital payment solutions across Ethiopia, analyzing the factors driving this growth and its implications for the financial sector.</p>
        <h2 class="text-2xl font-semibold mt-8 mb-4 text-gray-900">Rural and Urban Dynamics</h2>
        <p class="text-base leading-relaxed mb-4">The report highlights how mobile money is bridging the financial inclusion gap in rural areas, while urban centers are seeing sophisticated digital wallet and online transaction systems emerge.</p>
        <figure class="my-8">
            <img src="https://images.unsplash.com/photo-1563207106-a94f6e3c1a3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxkaWdpdGFsJTIwcGF5bWVudHMlMjBhZnJpY2F8ZW58MXx8fHwxNzU1NjUwMTY3fDA&lib=rb-4.1.0&q=80&w=1080" alt="Digital payment on phone" class="w-full rounded-lg shadow-lg" />
            <figcaption class="text-center text-sm text-gray-500 mt-2">Mobile payment transactions are becoming increasingly common.</figcaption>
        </figure>
        <p class="text-base leading-relaxed">Key drivers include increased mobile phone penetration, government support for cashless transactions, and innovative services offered by telecom operators and fintech companies.</p>
      `
    },
    {
      title: "Green Finance Initiative",
      summary: "Sustainable investment opportunities.",
      slug: createSlug("Green Finance Initiative"),
      fullContent: `
        <p class="text-lg leading-relaxed mb-6">An exploration of Ethiopia's burgeoning green finance sector, detailing sustainable investment opportunities in renewable energy, eco-friendly agriculture, and waste management.</p>
        <h2 class="text-2xl font-semibold mt-8 mb-4 text-gray-900">Renewable Energy Projects</h2>
        <p class="text-base leading-relaxed mb-4">The country is leveraging its vast renewable energy potential, with significant projects in hydropower, solar, and wind power attracting green financing from international institutions.</p>
        <figure class="my-8">
            <img src="https://images.unsplash.com/photo-1549480111-9a4f4d2f026a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzb2xhciUyMGZhcm0lMjBhZnJpY2F8ZW58MXx8fHwxNzU1NjUwMzA2fDA&lib=rb-4.1.0&q=80&w=1080" alt="Solar farm in Africa" class="w-full rounded-lg shadow-lg" />
            <figcaption class="text-center text-sm text-gray-500 mt-2">Solar energy projects are key to Ethiopia's green finance initiatives.</figcaption>
        </figure>
        <p class="text-base leading-relaxed">The report also covers sustainable agriculture practices and eco-tourism as critical areas for green investment.</p>
      `
    },
    {
      title: "SME Growth Report",
      summary: "Small business sector analysis.",
      slug: createSlug("SME Growth Report"),
      fullContent: `
        <p class="text-lg leading-relaxed mb-6">An in-depth report on the growth of Small and Medium-sized Enterprises (SMEs) in Ethiopia, analyzing their contributions to economic development, challenges faced, and policy support mechanisms.</p>
        <h2 class="text-2xl font-semibold mt-8 mb-4 text-gray-900">Job Creation and Innovation</h2>
        <p class="text-base leading-relaxed mb-4">SMEs are vital for job creation and fostering innovation. The report highlights sub-sectors where SMEs are thriving, such as local manufacturing, handicrafts, and tech startups.</p>
        <figure class="my-8">
            <img src="https://images.unsplash.com/photo-1563207106-a94f6e3c1a3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzbWUlMjBhZnJpY2F8ZW58MXx8fHwxNzU1NjUwNDg5fDA&lib=rb-4.1.0&q=80&w=1080" alt="Small business in Africa" class="w-full rounded-lg shadow-lg" />
            <figcaption class="text-center text-sm text-gray-500 mt-2">A vibrant small business operating in a local market.</figcaption>
        </figure>
        <p class="text-base leading-relaxed">Key challenges include access to finance, market linkages, and regulatory hurdles, which government and non-governmental organizations are working to address through various support programs.</p>
      `
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Header />
      {/* Hero Area with consistent dark background */}
      <section 
        className="relative overflow-hidden text-white"
        style={{ backgroundColor: '#3d3d3d' }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Insight Center</h1>
            <p className="text-xl text-gray-200 mb-8">
              Research-backed analysis for leaders, investors, and analysts
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-300 mb-8">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-yellow-400" />
                <span>45+ Research Reports</span>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-yellow-400" />
                <span>Real-time Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-yellow-400" />
                <span>Expert Analysis</span>
              </div>
            </div>
            {/* Removed the "Read Latest Report" button from here */}
          </div>
        </div>
      </section>

      {/* Main Content Layout: 70% Left Column, 30% Right Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-12">
          
          {/* Left Column - Main Content (70%) */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* 2.1 B-Insight Reports */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">B-Insight</h2>
                <Link href="#" className="text-yellow-600 hover:text-yellow-700 font-medium flex items-center">
                  See All <ExternalLink className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              {/* Featured Report Card */}
              <Link
                href={`/insight-center/${featuredReport.slug}`}
                className="block cursor-pointer"
              >
                <Card className="mb-8 overflow-hidden shadow-sm border-0 hover:shadow-lg transition-shadow">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative h-64 md:h-80">
                      <ImageWithFallback
                        src={featuredReport.coverImage}
                        alt={featuredReport.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-yellow-500 text-black">Featured Report</Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="text-sm">{featuredReport.pages} pages • {featuredReport.publishDate}</div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors">{featuredReport.title}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">{featuredReport.summary}</p>
                      
                      <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                        Read Report
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </Link>
              
              {/* Additional Reports Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {additionalReports.map((report, index) => (
                  <Link
                    key={index}
                    href={`/insight-center/${report.slug}`}
                    className="block"
                  >
                    <Card className="shadow-sm border-0 hover:shadow-lg transition-shadow">
                      <div className="relative h-48 overflow-hidden">
                        <ImageWithFallback
                          src={report.thumbnail}
                          alt={report.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-3 left-3 text-white text-sm">
                          {report.pages} pages • {report.publishDate}
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        <h4 className="font-bold text-gray-900 mb-3 line-clamp-2">{report.title}</h4>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{report.summary}</p>
                        <Button size="sm" variant="outline" className="w-full text-yellow-600 border-yellow-600 hover:bg-yellow-50">
                          Read Report
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            {/* 2.2 CEO Barometer */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">CEO Barometer</h2>
                <Link href={`/insight-center/${featuredCEOQuote.slug}`} className="text-yellow-600 hover:text-yellow-700 font-medium flex items-center">
                  See All <ExternalLink className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              {/* Hero Pull-Quote Card */}
              <Link href={`/insight-center/${featuredCEOQuote.slug}`} className="block cursor-pointer">
                <Card className="mb-8 bg-gradient-to-r from-gray-50 to-yellow-50 border-0 shadow-sm hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-start space-x-6">
                      <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={featuredCEOQuote.photo}
                          alt={featuredCEOQuote.ceoName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <Quote className="h-8 w-8 text-yellow-600 mb-4" />
                        <blockquote className="text-lg md:text-xl text-gray-900 font-medium italic mb-4 leading-relaxed">
                          "{featuredCEOQuote.quote}"
                        </blockquote>
                        <div className="text-sm text-gray-600">
                          <div className="font-medium text-gray-900">{featuredCEOQuote.ceoName}</div>
                          <div>{featuredCEOQuote.company}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              
              {/* Mini Infographics Grid (these won't link to a detail page, just for display) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {ceoInsights.map((insight, index) => (
                  <Card key={index} className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <h4 className="font-bold text-gray-900 mb-4 text-center">{insight.title}</h4>
                      
                      {insight.type === 'list' && (
                        <div className="space-y-2">
                          {insight.data.map((item, i) => (
                            <div key={i} className="flex justify-between items-center text-sm">
                              { 'label' in item && <span className="text-gray-600">{item.label}</span> }
                              {'value' in item && <span className="font-medium">{item.value}%</span>}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {insight.type === 'bar-chart' && (
                        <div className="space-y-3">
                          {insight.data.map((item, i) => (
                            <div key={i} className="flex items-center space-x-3">
                              {'period' in item && (
                                <span className="text-sm text-gray-600 w-12">{item.period}</span>
                              )}
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-yellow-500 h-2 rounded-full"
                                  style={{ width: 'value' in item ? `${(item.value / 100) * 100}%` : '0%' }}
                                ></div>
                              </div>
                              {'value' in item && (
                                <span className="text-sm font-medium w-8 text-right">{item.value}%</span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {insight.type === 'ranking' && (
                        <div className="space-y-2">
                          {insight.data.map((item, i) => (
                            <div key={i} className="flex items-center space-x-3 text-sm">
                              <span className="w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center text-xs font-bold">
                                {'rank' in item ? item.rank : null}
                              </span>
                              {'item' in item && (
                                <span className="text-gray-900">{item.item}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
            
            {/* 2.3 Market Map Ethiopia */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Market Map Ethiopia</h2>
                <Link href="#" className="text-yellow-600 hover:text-yellow-700 font-medium flex items-center">
                  Explore Map <ExternalLink className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <Card className="border-0 shadow-sm p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Ethiopia Investment Ecosystem 2025</h3>
                    <p className="text-gray-600 mb-6">
                      Interactive visualization showing foreign direct investment patterns and regional distribution across Ethiopia's key economic sectors.
                    </p>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex justify-between items-center">
                        <span className="font-medium">FDI Inflow</span>
                        <span className="font-bold text-lg text-yellow-600">$2.8B</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="font-medium">Manufacturing Share</span>
                        <span className="font-bold text-lg text-green-600">45%</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="font-medium">Agriculture Share</span>
                        <span className="font-bold text-lg text-orange-600">23%</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Placeholder for Visual Map/Infographic */}
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-6 h-56 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Interactive Map Placeholder</span>
                  </div>
                </div>
              </Card>
            </section>

          </div>

          {/* Right Sidebar (30%) */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Trending Research */}
            <div className="bg-yellow-50 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Trending Research</h3>
              <div className="space-y-4 text-sm">
                {trendingResearch.map((item, index) => (
                  <Link 
                    key={index} 
                    href={`/insight-center/${item.slug}`}
                    className="block group"
                  >
                    <div className="cursor-pointer hover:text-yellow-600 transition-colors">
                      <h4 className="font-medium mb-1 group-hover:underline">{item.title}</h4>
                      <div className="text-gray-600 line-clamp-1">{item.summary}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 2.4 B-Index */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">B-Index: Business Confidence</h3>
              
              {/* Current Index Value */}
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-yellow-600 mb-1">{bIndexData.currentValue}</div>
                <div className={`flex items-center justify-center space-x-1 text-sm ${
                  bIndexData.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {bIndexData.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingUp className="h-4 w-4 transform rotate-180" /> /* Visual down arrow */
                  )}
                  <span>+{bIndexData.change}%</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">Last updated: {bIndexData.lastUpdate}</div>
              </div>
              
              {/* Mini Chart */}
              <div className="space-y-2 mb-4">
                {bIndexData.monthlyTrend.map((point, index) => (
                  <div key={index} className="flex items-center space-x-3 text-sm">
                    <span className="w-8 text-gray-600">{point.month}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-yellow-500 h-1.5 rounded-full"
                        style={{ width: `${(point.value / 140) * 100}%` }}
                      ></div>
                    </div>
                    <span className="w-12 font-medium text-right">{point.value}</span>
                  </div>
                ))}
              </div>
              
              <Link href={`/insight-center/${bIndexData.slug}`} className="block">
                <Button size="sm" variant="outline" className="w-full text-yellow-600 border-yellow-600 hover:bg-yellow-50">
                  View All Index Reports
                </Button>
              </Link>
            </div>

            {/* Premium Research & Gated Content (formerly Downloads) */}
            <div 
              className="text-white rounded-xl p-6 shadow-sm"
              style={{ backgroundColor: '#3d3d3d' }}
            >
              <div className="flex items-center mb-4">
                <BookOpen className="h-6 w-6 mr-3 text-yellow-400" />
                <h3 className="text-xl font-bold">Premium Access</h3>
              </div>
              <p className="text-gray-300 text-sm mb-6">
                Get exclusive access to all research reports and quarterly briefings.
              </p>
              
              <h4 className="font-medium text-gray-200 mb-4">Gated Content</h4> {/* Changed from Downloads */}
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between items-center">
                  <span>Quarterly Brief Q2</span>
                  <Badge variant="secondary">Premium</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>CEO Interview Series</span>
                  <Badge variant="secondary">Premium</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Market Forecast 2026</span>
                  <Badge variant="secondary">Premium</Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-gray-700 text-white border-gray-600 focus:ring-yellow-500 focus:border-yellow-500"
                />
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                  Request Access
                </Button>
              </div>
            </div>
            
            {/* Sponsored Box */}
            <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="text-xs text-gray-500 mb-3 text-center">SPONSORED</div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-black font-bold">AD</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Ethiopia Investment Summit 2025</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Connect with 500+ investors and business leaders. September 15-17, Addis Ababa.
                </p>
                <Button size="sm" variant="outline" className="text-yellow-600 border-yellow-600 hover:bg-yellow-50">
                  Register Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
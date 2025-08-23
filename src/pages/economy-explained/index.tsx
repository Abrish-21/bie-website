import React, { useState } from 'react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import Link from 'next/link';

import { Play, Clock, Eye, BookOpen, BarChart2, Filter } from 'lucide-react';


// Helper function to generate a URL-friendly slug
const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

export default function EconomyExplainedPage() {
  const allExplainerArticles = [ // Renamed for clarity in filtering
    {
      title: "How Ethiopia's New Tax Policy Will Affect Small Businesses",
      excerpt: "Breaking down the complex changes in Ethiopia's taxation system and what they mean for SMEs across different sectors. We examine the implementation timeline, exemptions, and practical implications.",
      imageUrl: "https://images.unsplash.com/photo-1744782211816-c5224434614f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxmaW5hbmNpYWwlMjBjaGFydCUyMGRhdGF8ZW58MXx8fHwxNzU1NjQ0NjI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Policy",
      readTime: "8 min read",
      publishDate: "August 23, 2025",
      author: "Meron Assefa",
      views: 4500,
      isVideo: false,
      complexity: "Beginner",
      slug: createSlug("How Ethiopia's New Tax Policy Will Affect Small Businesses"),
      fullContent: `
        <p class="text-lg leading-relaxed mb-6">Ethiopia's economic landscape is constantly evolving, and recent adjustments to the nation's tax policy mark a significant shift, particularly for small and medium-sized enterprises (SMEs). This article aims to demystify these changes, offering a clear breakdown of what businesses need to know to adapt and thrive.</p>

        <h2 class="text-3xl font-bold mt-10 mb-6 text-gray-900">Understanding the New Framework</h2>
        <p class="text-base leading-relaxed mb-4">The new tax policy, enacted in July 2025, introduces several modifications to value-added tax (VAT), corporate income tax, and excise duties. A primary objective is to broaden the tax base and enhance revenue collection for national development projects.</p>
        <figure class="my-8">
            <img src="https://images.unsplash.com/photo-1628126075908-66236b283dd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYSUyMHRheCUyMGZvcm1zfGVufDF8fHwxNzU1NjYzMjY5fDA&lib=rb-4.1.0&q=80&w=1080" alt="Tax documents and calculator" class="w-full rounded-lg shadow-lg" />
            <figcaption class="text-center text-sm text-gray-500 mt-2">New tax regulations are crucial for SMEs to understand.</figcaption>
        </figure>
        <p class="text-base leading-relaxed mb-4">For SMEs, some key changes include revised thresholds for VAT registration and potential adjustments in simplified tax regimes. The government aims to encourage formalization while providing support for burgeoning businesses.</p>

        <h3 class="text-2xl font-semibold mt-8 mb-4 text-gray-900">Key Implications for SMEs</h3>
        <ul class="list-disc list-inside space-y-2 mb-6 text-base leading-relaxed">
          <li><strong>Increased Compliance:</strong> Businesses might face new reporting requirements, necessitating better record-keeping and potentially new accounting software.</li>
          <li><strong>Cost Adjustments:</strong> Changes in VAT and excise duties could impact pricing strategies for goods and services.</li>
          <li><strong>Growth Opportunities:</strong> The policy includes incentives for certain sectors, offering tax breaks for investments in priority areas like manufacturing and technology.</li>
        </ul>
        <p class="text-base leading-relaxed">It is advisable for all small business owners to consult with tax professionals to fully understand how these changes specifically apply to their operations. Proactive planning will be essential for smooth transitions and continued success.</p>
      `
    },
    {
      title: "Understanding Ethiopia's Currency Exchange Reforms",
      excerpt: "A comprehensive guide to the recent changes in foreign exchange regulations, their impact on imports/exports, and what businesses need to know about the new exchange rate mechanisms.",
      imageUrl: "https://images.unsplash.com/photo-1579532536935-1610631066894-62452ccb927c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG5ld3MlMjBhZnJpY2F8ZW58MXx8fHwxNzU1NjQ0NjI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Finance",
      readTime: "12 min read",
      publishDate: "August 22, 2025",
      author: "Daniel Tadesse",
      views: 8200,
      isVideo: true,
      youtubeVideoId: "_M4C26Vv3x0", // Replaced with a sample YouTube ID
      complexity: "Intermediate",
      slug: createSlug("Understanding Ethiopia's Currency Exchange Reforms"),
      fullContent: `
        <p class="text-lg leading-relaxed mb-6">Ethiopia's central bank recently announced sweeping reforms to its currency exchange system, a move designed to stabilize the Birr and create a more predictable environment for international trade. This explainer video (content below) delves into the intricacies of these changes.</p>

        <h2 class="text-3xl font-bold mt-10 mb-6 text-gray-900">Key Aspects of the Reform</h2>
        <p class="text-base leading-relaxed mb-4">The reforms aim to address the long-standing foreign currency shortages and reduce the gap between official and parallel market exchange rates. This includes measures to enhance transparency and efficiency in foreign exchange allocation.</p>
        <figure class="my-8">
            <img src="https://images.unsplash.com/photo-1590283675662-f1b21c4a03e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjdXJyZW5jeSUyMGV4Y2hhbmdlfGVufDF8fHwxNzU1NjYzMzY3fDA&lib=rb-4.1.0&q=80&w=1080" alt="Currency exchange office" class="w-full rounded-lg shadow-lg" />
            <figcaption class="text-center text-sm text-gray-500 mt-2">Ethiopia's currency exchange market is undergoing significant reforms.</figcaption>
        </figure>
        <p class="text-base leading-relaxed mb-4">Businesses involved in imports and exports will be directly impacted. Exporters may find it easier to repatriate earnings, while importers could face new mechanisms for accessing foreign currency.</p>

        <h3 class="text-2xl font-semibold mt-8 mb-4 text-gray-900">Impact on Businesses and Economy</h3>
        <ul class="list-disc list-inside space-y-2 mb-6 text-base leading-relaxed">
          <li><strong>Importers:</strong> Might see more structured, albeit potentially tighter, access to foreign currency.</li>
          <li><strong>Exporters:</strong> Could benefit from increased transparency and potentially better rates for their foreign earnings.</li>
          <li><strong>Overall Economy:</strong> The reforms are expected to improve investor confidence and help stabilize macroeconomic indicators in the medium term.</li>
        </ul>
        <p class="text-base leading-relaxed">While these changes present adjustments for businesses, they are crucial steps towards a more stable and robust financial system for Ethiopia. Stay tuned for further updates and expert commentary on the evolving situation.</p>
      `
    },
    {
      title: "The Rise of Ethiopia's Manufacturing Sector",
      excerpt: "From textile to automotive assembly, explore how Ethiopia is positioning itself as East Africa's manufacturing hub. We analyze government incentives, foreign investment, and growth projections.",
      imageUrl: "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU1NjExMjc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Industry",
      readTime: "10 min read",
      publishDate: "August 21, 2025",
      author: "Sara Bekele",
      views: 6800,
      isVideo: false,
      complexity: "Beginner",
      slug: createSlug("The Rise of Ethiopia's Manufacturing Sector"),
      fullContent: `
        <p class="text-lg leading-relaxed mb-6">Ethiopia's ambition to become East Africa's manufacturing powerhouse is steadily gaining momentum. This article explores the strategic factors driving this growth, from supportive government policies to a burgeoning workforce.</p>

        <h2 class="text-3xl font-bold mt-10 mb-6 text-gray-900">Industrial Parks and FDI Inflow</h2>
        <p class="text-base leading-relaxed mb-4">The development of numerous industrial parks, equipped with modern infrastructure and attractive incentives, has been pivotal. These parks have become magnets for foreign direct investment, particularly in sectors like textiles, apparel, and light manufacturing.</p>
        <figure class="my-8">
            <img src="https://images.unsplash.com/photo-1627916568218-09514f2441c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYSUyMGZhY3Rvcnl8ZW58MXx8fHwxNzU1NjYzNDUzfDA&lib=rb-4.1.0&q=80&w=1080" alt="Modern factory in Ethiopia" class="w-full rounded-lg shadow-lg" />
            <figcaption class="text-center text-sm text-gray-500 mt-2">Ethiopian industrial parks are attracting significant foreign investment.</figcaption>
        </figure>
        <p class="text-base leading-relaxed mb-4">Government initiatives to streamline business registration and provide duty-free access to international markets further enhance the country's appeal as a manufacturing base.</p>

        <h3 class="text-2xl font-semibold mt-8 mb-4 text-gray-900">Sectoral Growth and Future Outlook</h3>
        <ul class="list-disc list-inside space-y-2 mb-6 text-base leading-relaxed">
          <li><strong>Textile & Apparel:</strong> Continues to be a flagship sector, benefiting from a large labor pool and preferential trade agreements.</li>
          <li><strong>Automotive Assembly:</strong> Local assembly plants are expanding, catering to growing domestic demand and exploring regional markets.</li>
          <li><strong>Construction Materials:</strong> Driven by massive infrastructure projects, this sector is also seeing significant domestic and foreign investment.</li>
        </ul>
        <p class="text-base leading-relaxed">Challenges such as energy reliability and logistical efficiency are being actively addressed, with the government and private sector collaborating to ensure sustained growth and competitiveness for Ethiopia's manufacturing sector.</p>
      `
    },
    {
      title: "Digital Banking Revolution in Ethiopia",
      excerpt: "How mobile money and digital banking services are transforming Ethiopia's financial landscape. Learn about the key players, regulatory challenges, and future outlook.",
      imageUrl: "https://images.unsplash.com/photo-1641989516513-f34dd4305204?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZW50cmVwcmVuZXVyc3xlbnwxfHx8fDE3NTU2NDQ2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Technology",
      readTime: "7 min read",
      publishDate: "August 20, 2025",
      author: "Kidist Alemayehu",
      views: 5600,
      isVideo: true,
      youtubeVideoId: "Y_8k4m8yL_E", // Replaced with a sample YouTube ID
      complexity: "Intermediate",
      slug: createSlug("Digital Banking Revolution in Ethiopia"),
      fullContent: `
        <p class="text-lg leading-relaxed mb-6">Ethiopia is on the cusp of a digital banking revolution, with mobile money and fintech innovations rapidly reshaping how financial services are accessed and utilized across the nation. This video explainer (content below) provides an overview of this transformative trend.</p>

        <h2 class="text-3xl font-bold mt-10 mb-6 text-gray-900">Mobile Money: Driving Financial Inclusion</h2>
        <p class="text-base leading-relaxed mb-4">Mobile money platforms have emerged as a critical tool for financial inclusion, especially in rural and underserved areas where traditional banking infrastructure is limited. Services like sending and receiving money, paying bills, and even accessing micro-loans are now available through mobile phones.</p>
        <figure class="my-8">
            <img src="https://images.unsplash.com/photo-1563207106-a94f6e3c1a3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxkaWdpdGFsJTIwcGF5bWVudHMlMjBhZnJpY2F8ZW58MXx8fHwxNzU1NjYzNjExfDA&lib=rb-4.1.0&q=80&w=1080" alt="Person using mobile money" class="w-full rounded-lg shadow-lg" />
            <figcaption class="text-center text-sm text-gray-500 mt-2">Mobile money is democratizing financial services in Ethiopia.</figcaption>
        </figure>
        <p class="text-base leading-relaxed mb-4">Major telecom operators and new fintech startups are leading this charge, introducing innovative solutions that cater to both individual consumers and small businesses.</p>

        <h3 class="text-2xl font-semibold mt-8 mb-4 text-gray-900">Regulatory Landscape and Future Growth</h3>
        <ul class="list-disc list-inside space-y-2 mb-6 text-base leading-relaxed">
          <li><strong>Evolving Regulations:</strong> The National Bank of Ethiopia is continually adapting its regulatory framework to support innovation while ensuring financial stability and consumer protection.</li>
          <li><strong>Partnerships:</strong> Collaborations between traditional banks and fintech firms are creating a dynamic ecosystem, bridging old and new financial systems.</li>
          <li><strong>Challenges:</strong> Internet penetration, digital literacy, and cybersecurity remain key areas needing attention for widespread adoption.</li>
        </ul>
        <p class="text-base leading-relaxed">The digital banking revolution promises to enhance efficiency, reduce transaction costs, and bring millions more Ethiopians into the formal financial sector, unlocking immense economic potential.</p>
      `
    },
    {
      title: "Ethiopia's Coffee Economy: Beyond the Bean",
      excerpt: "Dive deep into the economics of Ethiopia's most famous export. From farmer cooperatives to international markets, understand the entire coffee value chain and its economic impact.",
      imageUrl: "https://images.unsplash.com/photo-1742996111692-2d924f12a058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYSUyMGJ1c2luZXNzJTIwbWVldGluZ3xlbnwxfHx8fDE3NTU2NDQ2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Agriculture",
      readTime: "15 min read",
      publishDate: "August 19, 2025",
      author: "Robel Mekonnen",
      views: 9200,
      isVideo: false,
      complexity: "Advanced",
      slug: createSlug("Ethiopia's Coffee Economy: Beyond the Bean"),
      fullContent: `
        <p class="text-lg leading-relaxed mb-6">Ethiopia, the birthplace of Arabica coffee, holds a unique and central position in the global coffee economy. This article goes beyond the simple bean to explore the intricate value chain and profound economic impact of coffee on the nation.</p>

        <h2 class="text-3xl font-bold mt-10 mb-6 text-gray-900">From Farm to Cup: The Value Chain</h2>
        <p class="text-base leading-relaxed mb-4">The journey of Ethiopian coffee involves millions of smallholder farmers, washing stations, cooperatives, and exporters. Quality control at each stage is paramount, contributing to the distinct flavor profiles that highly sought-after Ethiopian coffees are known for globally.</p>
        <figure class="my-8">
            <img src="https://images.unsplash.com/photo-1553531384-5cd3b5160934?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYW4lMjBjb2ZmZWUlMjBmaWVsZHxlbnwxfHx8fDE3NTU2NjM3MDJ8MA&lib=rb-4.1.0&q=80&w=1080" alt="Ethiopian coffee field" class="w-full rounded-lg shadow-lg" />
            <figcaption class="text-center text-sm text-gray-500 mt-2">Harvesting coffee in the fertile regions of Ethiopia.</figcaption>
        </figure>
        <p class="text-base leading-relaxed mb-4">Farmer cooperatives play a crucial role in empowering producers, providing access to markets, and ensuring fair prices, ultimately enhancing their livelihoods.</p>

        <h3 class="text-2xl font-semibold mt-8 mb-4 text-gray-900">Economic Impact and Future Potential</h3>
        <ul class="list-disc list-inside space-y-2 mb-6 text-base leading-relaxed">
          <li><strong>Export Earnings:</strong> Coffee remains Ethiopia's primary export commodity, generating substantial foreign exchange crucial for national development.</li>
          <li><strong>Employment:</strong> The sector supports millions of jobs, from cultivation and processing to logistics and marketing.</li>
          <li><strong>Value Addition:</strong> Efforts are underway to increase local value addition, such as roasting and packaging, before export to capture a larger share of global profits.</li>
        </ul>
        <p class="text-base leading-relaxed">As global demand for specialty coffee continues to rise, Ethiopia's coffee economy is poised for further growth, with a strong focus on sustainable practices and quality enhancement.</p>
      `
    },
    {
      title: "Inflation Explained: Why Prices Keep Rising",
      excerpt: "A simple breakdown of Ethiopia's inflation challenges, what drives price increases, and how monetary policy attempts to control them. No economics degree required.",
      imageUrl: "https://images.unsplash.com/photo-1744782211816-c5224434614f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxmaW5hbmNpYWwlMjBjaGFydCUyMGRhdGF8ZW58MXx8fHwxNzU1NjQ0NjI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Economics",
      readTime: "6 min read",
      publishDate: "August 18, 2025",
      author: "Hanan Yusuf",
      views: 12400,
      isVideo: true,
      youtubeVideoId: "rbz2b3Jp4n4", // Replaced with a sample YouTube ID
      complexity: "Beginner",
      slug: createSlug("Inflation Explained: Why Prices Keep Rising"),
      fullContent: `
        <p class="text-lg leading-relaxed mb-6">Inflation is a pervasive economic challenge in Ethiopia, impacting everything from daily household expenses to business investment decisions. This video explainer (content below) simplifies the complex dynamics behind rising prices.</p>

        <h2 class="text-3xl font-bold mt-10 mb-6 text-gray-900">What Drives Inflation in Ethiopia?</h2>
        <p class="text-base leading-relaxed mb-4">Several factors contribute to Ethiopia's inflationary pressures, including supply chain disruptions, increased money supply, and rising global commodity prices. Food inflation, in particular, has been a significant component due to agricultural output variations and market inefficiencies.</p>
        <figure class="my-8">
            <img src="https://images.unsplash.com/photo-1589140356597-dc194916a8d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYW4lMjBtYXJrZXRzfGVufDF8fHwxNzU1NjYzODIyfDA&lib=rb-4.1.0&q=80&w=1080" alt="Ethiopian market" class="w-full rounded-lg shadow-lg" />
            <figcaption class="text-center text-sm text-gray-500 mt-2">Rising prices are a common sight in local markets.</figcaption>
        </figure>
        <p class="text-base leading-relaxed mb-4">The imbalance between aggregate demand and supply often leads to a sustained increase in the general price level.</p>

        <h3 class="text-2xl font-semibold mt-8 mb-4 text-gray-900">Monetary Policy Responses and Outlook</h3>
        <ul class="list-disc list-inside space-y-2 mb-6 text-base leading-relaxed">
          <li><strong>Central Bank Measures:</strong> The National Bank of Ethiopia employs various monetary policy tools, such as adjusting interest rates and managing liquidity, to curb inflation.</li>
          <li><strong>Fiscal Policy:</strong> Government fiscal measures, including subsidy rationalization and expenditure control, also play a role in managing inflationary pressures.</li>
          <li><strong>Future Outlook:</strong> Taming inflation remains a top economic priority, with efforts focused on boosting productivity and stabilizing the macro-economy.</li>
        </ul>
        <p class="text-base leading-relaxed">Understanding these dynamics is crucial for businesses and individuals to navigate the economic environment effectively and make informed decisions.</p>
      `
    },
    {
      title: "Ethiopian Export Diversification Strategy",
      excerpt: "Exploring strategies to diversify Ethiopia's export base beyond traditional commodities to boost economic resilience and growth.",
      imageUrl: "https://images.unsplash.com/photo-1621570183180-b74d3d8f8a1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYW4lMjBleHBvcnRzfGVufDF8fHwxNzU1NjU5OTY3fDA&lib=rb-4.1.0&q=80&w=1080",
      category: "Policy",
      readTime: "9 min read",
      publishDate: "August 17, 2025",
      author: "Aisha Mohammed",
      views: 3100,
      isVideo: false,
      complexity: "Intermediate",
      slug: createSlug("Ethiopian Export Diversification Strategy"),
      fullContent: `
        <p class="text-lg leading-relaxed mb-6">Ethiopia is actively pursuing strategies to diversify its export base, moving beyond traditional agricultural commodities to enhance economic resilience and achieve sustainable growth. This article outlines the key pillars of this ambitious strategy.</p>

        <h2 class="text-3xl font-bold mt-10 mb-6 text-gray-900">Shifting Focus: Non-Traditional Exports</h2>
        <p class="text-base leading-relaxed mb-4">The diversification strategy emphasizes boosting non-traditional exports such as manufactured goods (textiles, leather products), horticulture, and high-value agricultural products. The aim is to reduce vulnerability to commodity price fluctuations and create more stable foreign exchange earnings.</p>
        <figure class="my-8">
            <img src="https://images.unsplash.com/photo-1627916568218-09514f2441c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYW4lMjB0ZXh0aWxlfGVufDF8fHwxNzU1NjY0MDIwfDA&lib=rb-4.1.0&q=80&w=1080" alt="Textile factory in Ethiopia" class="w-full rounded-lg shadow-lg" />
            <figcaption class="text-center text-sm text-gray-500 mt-2">Ethiopia's textile industry is a key focus for export diversification.</figcaption>
        </figure>
        <p class="text-base leading-relaxed mb-4">Industrial parks, equipped with export processing zones, are central to attracting investment in these new growth areas.</p>

        <h3 class="text-2xl font-semibold mt-8 mb-4 text-gray-900">Supporting Mechanisms and Market Access</h3>
        <ul class="list-disc list-inside space-y-2 mb-6 text-base leading-relaxed">
          <li><strong>Incentives:</strong> Government provides various incentives, including tax holidays and customs duty exemptions, for export-oriented businesses.</li>
          <li><strong>Logistics Improvement:</strong> Significant investments are being made in transport infrastructure (roads, railways, ports) to improve efficiency and reduce export costs.</li>
          <li><strong>Market Linkages:</strong> Efforts are focused on forging stronger trade ties and securing preferential market access agreements with international partners.</li>
        </ul>
        <p class="text-base leading-relaxed">Successful export diversification is expected to create more jobs, foster technological transfer, and significantly contribute to Ethiopia's long-term economic prosperity.</p>
      `
    },
    {
      title: "Impact of Digital Transformation on Services Sector",
      excerpt: "How digital technologies are reshaping the services industry, from tourism to finance, in Ethiopia.",
      imageUrl: "https://images.unsplash.com/photo-1593642702821-ce1914edcd7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxkaWdpdGFsJTIwdHJhbnNmb3JtYXRpb258ZW5uayB8fHwxNzU1NjYwMDY4fDA&lib=rb-4.1.0&q=80&w=1080",
      category: "Technology",
      readTime: "11 min read",
      publishDate: "August 16, 2025",
      author: "Firaol Bekele",
      views: 4800,
      isVideo: true,
      youtubeVideoId: "Pq4M-5G2260", // Replaced with a sample YouTube ID
      complexity: "Advanced",
      slug: createSlug("Impact of Digital Transformation on Services Sector"),
      fullContent: `
        <p class="text-lg leading-relaxed mb-6">Digital transformation is sweeping across Ethiopia, bringing profound changes to its burgeoning services sector. This video explainer (content below) examines how technology is reshaping industries from tourism to finance.</p>

        <h2 class="text-3xl font-bold mt-10 mb-6 text-gray-900">Innovation Across Service Industries</h2>
        <p class="text-base leading-relaxed mb-4">In tourism, digital platforms are enhancing booking experiences and promoting Ethiopian destinations globally. In finance, mobile banking and fintech solutions are reaching previously unbanked populations. The retail sector is also experiencing a shift towards e-commerce and digital payment systems.</p>
        <figure class="my-8">
            <img src="https://images.unsplash.com/photo-1542435503-96b6330922b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxkaWdpdGFsJTIwdG91cmlzbXxlbnwxfHx8fDE3NTU2NjQwODd8MA&lib=rb-4.1.0&q=80&w=1080" alt="Person using digital device for tourism" class="w-full rounded-lg shadow-lg" />
            <figcaption class="text-center text-sm text-gray-500 mt-2">Digital tools are transforming how tourists experience Ethiopia.</figcaption>
        </figure>
        <p class="text-base leading-relaxed mb-4">These innovations are not only improving efficiency but also creating new business models and employment opportunities.</p>

        <h3 class="text-2xl font-semibold mt-8 mb-4 text-gray-900">Challenges and Opportunities</h3>
        <ul class="list-disc list-inside space-y-2 mb-6 text-base leading-relaxed">
          <li><strong>Skill Development:</strong> A key challenge is ensuring a skilled workforce capable of leveraging new digital tools and technologies.</li>
          <li><strong>Infrastructure:</strong> Expanding internet access and reliable power supply is crucial for widespread digital adoption.</li>
          <li><strong>Regulatory Frameworks:</strong> Governments are adapting regulations to foster innovation while protecting consumers and businesses in the digital space.</li>
        </ul>
        <p class="text-base leading-relaxed">Despite the challenges, digital transformation presents immense opportunities for Ethiopia's services sector to leapfrog traditional development stages and enhance its global competitiveness.</p>
      `
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const featuredExplainer = allExplainerArticles[0];
  const otherExplainers = allExplainerArticles.slice(1).filter(article =>
    selectedCategory === 'All Categories' || article.category === selectedCategory
  );

  const complexityColors = {
    'Beginner': 'bg-blue-100 text-blue-800',
    'Intermediate': 'bg-yellow-100 text-yellow-800',
    'Advanced': 'bg-red-100 text-red-800'
  };

  const categoryColors = {
    'Policy': 'bg-blue-600',
    'Finance': 'bg-yellow-600',
    'Industry': 'bg-purple-600',
    'Technology': 'bg-indigo-600',
    'Agriculture': 'bg-orange-600',
    'Economics': 'bg-red-600'
  };

  const categories = ['All Categories', ...new Set(allExplainerArticles.map(article => article.category))];

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      {/* Header */}
      <Header/>

      {/* Hero Section */}
      <section className="relative overflow-hidden text-white py-20 lg:py-32" style={{ backgroundColor: '#3d3d3d' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl text-center lg:text-left mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">Economy Explained</h1>
            <p className="text-xl md:text-2xl text-yellow-200 mb-8 max-w-2xl mx-auto lg:mx-0">
              Unraveling complex economic topics with clear, real-world insights from Ethiopia and beyond.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start space-x-6 text-sm text-yellow-100">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-yellow-400" />
                <span>Expert Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart2 className="h-5 w-5 text-yellow-400" />
                <span>Data-Driven</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-yellow-400" />
                <span>Quick Reads</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Featured Explainer Article */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">Featured Insight</h2>
          <Link href={`/economy-explained/${featuredExplainer.slug}`} passHref>
            <Card className="rounded-2xl overflow-hidden shadow-xl border-0 bg-white group hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-80 sm:h-96 lg:h-auto min-h-[300px]">
                  <ImageWithFallback
                    src={featuredExplainer.imageUrl}
                    alt={featuredExplainer.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {featuredExplainer.isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-5 md:p-6 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        <Play className="h-10 w-10 md:h-12 md:w-12 text-white" />
                      </div>
                    </div>
                  )}

                  <div className="absolute top-6 left-6 flex items-center space-x-3">
                    <Badge className={`${categoryColors[featuredExplainer.category as keyof typeof categoryColors]} text-white text-sm font-medium px-3 py-1 rounded-full`}>
                      {featuredExplainer.category}
                    </Badge>
                    <Badge className={`${complexityColors[featuredExplainer.complexity as keyof typeof complexityColors]} text-sm font-medium px-3 py-1 rounded-full`}>
                      {featuredExplainer.complexity}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-8 md:p-10 flex flex-col justify-center">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-yellow-700 transition-colors duration-300">
                    {featuredExplainer.title}
                  </h3>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed line-clamp-4">
                    {featuredExplainer.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center text-sm text-gray-600 mb-6 gap-x-6 gap-y-2">
                    <span className="font-semibold text-gray-800">{featuredExplainer.author}</span>
                    <span>• {featuredExplainer.publishDate}</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{featuredExplainer.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4 text-gray-500" />
                      <span>{featuredExplainer.views.toLocaleString()} views</span>
                    </div>
                  </div>

                  <Button size="lg" className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    {featuredExplainer.isVideo ? 'Read Article' : 'Read Article'}
                  </Button>
                </CardContent>
              </div>
            </Card>
          </Link>
        </section>

        {/* Filter and All Explainers */}
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <h2 className="text-3xl font-bold text-gray-900">All Explainers</h2>
            <div className="flex flex-wrap justify-center sm:justify-end gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  size="sm"
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={selectedCategory === category ? "bg-yellow-600 hover:bg-yellow-700 text-white" : "border-gray-300 text-gray-700 hover:bg-gray-100"}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherExplainers.length > 0 ? (
              otherExplainers.map((article, index) => (
                <Link key={index} href={`/economy-explained/${article.slug}`} passHref>
                  <Card className="rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 cursor-pointer">
                    <div className="relative h-52 overflow-hidden">
                      <ImageWithFallback
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {article.isVideo && (
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-white bg-opacity-90 rounded-full p-2.5">
                            <Play className="h-7 w-7 text-gray-900" />
                          </div>
                        </div>
                      )}
                      <div className="absolute top-4 left-4 flex items-center space-x-2">
                        <Badge className={`${categoryColors[article.category as keyof typeof categoryColors]} text-white text-xs font-medium px-2 py-0.5 rounded-full`}>
                          {article.category}
                        </Badge>
                        <Badge className={`${complexityColors[article.complexity as keyof typeof complexityColors]} text-xs font-medium px-2 py-0.5 rounded-full`}>
                          {article.complexity}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-yellow-700 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-3">
                        {article.excerpt}
                      </p>

                      <div className="flex flex-wrap items-center text-xs text-gray-500 gap-x-4 gap-y-1">
                        <span className="font-medium">{article.author}</span>
                        <span>• {article.publishDate}</span>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{article.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{article.views.toLocaleString()}</span>
                        </div>
                      </div>

                      <Button
                        className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        {article.isVideo ? 'Read Article' : 'Read Article'}
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600 text-lg py-8">No explainers found in this category.</p>
            )}
          </div>

          {/* Load More Button */}
          {otherExplainers.length > 0 && (
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" className="text-yellow-600 border-yellow-600 hover:bg-yellow-50 font-semibold px-8 py-3 rounded-lg">
                Load More Explainers
              </Button>
            </div>
          )}
        </section>

        {/* Newsletter CTA */}
        <section className="mt-20 rounded-2xl p-10 text-center text-white shadow-xl" style={{ backgroundColor: '#3d3d3d' }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Informed, Stay Ahead</h2>
          <p className="text-lg md:text-xl text-yellow-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get our weekly "Economy Explained" digest delivered to your inbox. Complex topics made simple, with real examples from Ethiopian markets.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              className="px-5 py-3 rounded-lg text-gray-900 border-0 focus:ring-2 focus:ring-yellow-300 flex-1 bg-white focus:outline-none"
            />
            <Button size="lg" className="bg-yellow-500 text-gray-900 hover:bg-yellow-600 px-8 font-semibold rounded-lg shadow-md">
              Subscribe
            </Button>
          </div>
          <p className="text-sm text-yellow-200 mt-4">
            Join 25,000+ readers who trust our economic insights
          </p>
        </section>
      </div>
      <Footer/>
    </div>
  );
}
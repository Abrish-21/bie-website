// src/pages/economy-explained/[slug].tsx

import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";
import { ArrowLeft, Clock, Eye, BookOpen, User, Lightbulb } from "lucide-react";
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Input } from '../../components/ui/input'; // Using shadcn/ui Input

// Helper function to generate a URL-friendly slug
const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

// Dummy data for explainer articles
const allExplainerArticles = [
  {
    title: "How Ethiopia's New Tax Policy Will Affect Small Businesses",
    excerpt: "Breaking down the complex changes in Ethiopia's taxation system and what they mean for SMEs across different sectors. We examine the implementation timeline, exemptions, and practical implications.",
    imageUrl: "https://images.unsplash.com/photo-1744782211816-c224434614f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxmaW5hbmNpYWwlMjBjaGFydCUyMGRhdGF8ZW58MXx8fHwxNzU1NjQ0NjI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Policy",
    readTime: "8 min read",
    publishDate: "August 23, 2025",
    author: "Meron Assefa",
    views: 4500,
    isVideo: false, // Set to false
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
    imageUrl: "https://images.unsplash.com/photo-1579532536935-1610631066894-62452ccb927c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxidXNpbmVzcyUyMG5ld3MlMjBhZnJpY2F8ZW58MXx8fHwxNzU1NjQ0NjI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Finance",
    readTime: "12 min read",
    publishDate: "August 22, 2025",
    author: "Daniel Tadesse",
    views: 8200,
    isVideo: false, // Set to false
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
    isVideo: false, // Set to false
    complexity: "Beginner",
    slug: createSlug("The Rise of Ethiopia's Manufacturing Sector"),
    fullContent: `
        <p class="text-lg leading-relaxed mb-6">Ethiopia's ambition to become East Africa's manufacturing powerhouse is steadily gaining momentum. This article explores the strategic factors driving this growth, from supportive government policies to a burgeoning workforce.</p>

        <h2 class="text-3xl font-bold mt-10 mb-6 text-gray-900">Industrial Parks and FDI Inflow</h2>
        <p class="text-base leading-relaxed mb-4">The development of numerous industrial parks, equipped with modern infrastructure and attractive incentives, has been pivotal. These parks have become magnets for foreign direct investment, particularly in sectors like textiles, apparel, and light manufacturing.</p>
        <figure class="my-8">
            <img src="https://images.unsplash.com/photo-1627916568218-09514f2441c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYW4lMjBmYWN0b3J5fGVufDF8fHwxNzU1NjYzNDUzfDA&lib=rb-4.1.0&q=80&w=1080" alt="Modern factory in Ethiopia" class="w-full rounded-lg shadow-lg" />
            <figcaption class="text-center text-sm text-gray-500 mt-2">Ethiopian industrial parks are attracting significant foreign investment.</figcaption>
        </figure>
        <p class="text-base leading-relaxed mb-4">Government initiatives to streamline business registration and provide duty-free access to international markets further enhance the country's appeal as a manufacturing base.</p>

        <h3 class="text-2xl font-semibold mt-8 mb-4 text-gray-900">Sectoral Growth and Future Outlook</h3>
        <ul class="list-disc list-inside space-y-2 mb-6 text-base leading-relaxed">
          <li><strong>Textile & Apparel:</strong> Continues to be a flagship sector, benefiting from a large labor pool and preferential trade agreements.</li>
          <li><strong>Automotive Assembly:</strong> Local assembly plants are expanding, catering to growing domestic demand and exploring regional markets.</li>
          <li><strong>Construction Materials:</strong> Driven by massive infrastructure projects, this sector is also seeing significant domestic and foreign investment.</li>
        </ul>
        <p class="text-base leading-relaxed">Challenges suchs energy reliability and logistical efficiency are being actively addressed, with the government and private sector collaborating to ensure sustained growth and competitiveness for Ethiopia's manufacturing sector.</p>
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
    isVideo: false, // Set to false
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
    imageUrl: "https://images.unsplash.com/photo-1742996111692-2d924f12a058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYW4lMjBjb2ZmZWUlMjBmaWVsZHxlbnwxfHx8fDE3NTU2NDQ2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Agriculture",
    readTime: "15 min read",
    publishDate: "August 19, 2025",
    author: "Robel Mekonnen",
    views: 9200,
    isVideo: false, // Set to false
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
      isVideo: false, // Set to false
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
      imageUrl: "https://images.unsplash.com/photo-1621570183180-b74d3d8f8a1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYW4lMjBleHBvcnRzfGVufDF8fHwxNzU1NjU5OTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Policy",
    readTime: "9 min read",
    publishDate: "August 17, 2025",
    author: "Aisha Mohammed",
    views: 3100,
    isVideo: false, // Set to false
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
      imageUrl: "https://images.unsplash.com/photo-1593642702821-ce1914edcd7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxkaWdpdGFsJTIwdHJhbnNmb3JtYXRpb258ZW5uayB8fHwxNzU1NjYwMDY4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Technology",
    readTime: "11 min read",
    publishDate: "August 16, 2025",
    author: "Firaol Bekele",
    views: 4800,
    isVideo: false, // Set to false
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


const ExplainerDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const article = allExplainerArticles.find(a => a.slug === slug);

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

  if (router.isFallback || !article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-gray-700 text-center text-lg">Loading explainer or explainer not found...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Get related articles (excluding the current one, same category if possible)
  const relatedExplainers = allExplainerArticles
    .filter(a => a.slug !== article.slug && a.category === article.category)
    .slice(0, 2); // Show up to 2 related articles

  // If not enough from the same category, get others
  if (relatedExplainers.length < 2) {
    const additionalRelated = allExplainerArticles
      .filter(a => a.slug !== article.slug && a.category !== article.category)
      .slice(0, 2 - relatedExplainers.length);
    relatedExplainers.push(...additionalRelated);
  }


  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Back to Economy Explained Link */}
        <div className="mb-8">
          <Link href="/economy-explained" className="inline-flex items-center text-yellow-600 hover:text-yellow-700 transition-colors group">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Economy Explained</span>
          </Link>
        </div>

        {/* Main Explainer Content Area */}
        <main className="max-w-4xl mx-auto space-y-10">
          {/* Article Header */}
          <div className="text-center">
            <div className="flex flex-wrap items-center justify-center space-x-4 mb-4">
              <Badge className={`${categoryColors[article.category as keyof typeof categoryColors]} text-white text-base font-medium px-3 py-1.5 rounded-full`}>
                {article.category}
              </Badge>
              <Badge className={`${complexityColors[article.complexity as keyof typeof complexityColors]} text-base font-medium px-3 py-1.5 rounded-full`}>
                {article.complexity}
              </Badge>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              {article.title}
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-700 leading-relaxed italic max-w-3xl mx-auto">
              {article.excerpt}
            </p>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap items-center justify-center border-t border-b border-gray-200 py-4 gap-x-6 gap-y-2 text-sm text-gray-600">
            <span className="flex items-center space-x-2 font-semibold text-gray-800">
              <User className="h-4 w-4 text-gray-500" />
              <span>{article.author || "B-Insight Team"}</span>
            </span>
            <span className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>{article.readTime}</span>
            </span>
            <span className="flex items-center space-x-2">
              <Eye className="h-4 w-4 text-gray-500" />
              <span>{article.views.toLocaleString()} views</span>
            </span>
            <span className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-gray-500" />
              <span>Published: {article.publishDate}</span>
            </span>
          </div>

          {/* Main Content: Image Only */}
          <figure className="my-8 relative rounded-xl overflow-hidden shadow-lg aspect-video">
            <ImageWithFallback
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-[400px] md:h-[550px] object-cover"
              />
            <figcaption className="sr-only">{article.title}</figcaption>
          </figure>

          {/* Full Content */}
          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: article.fullContent }} />
          </div>
        </main>

        {/* Call to Action Button */}
        <div className="text-center mt-12">
          <Link href="/economy-explained" passHref>
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-10 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              Explore All Explainers
            </Button>
          </Link>
        </div>

        {/* Related Explainers Section */}
        {relatedExplainers.length > 0 && (
          <section className="mt-20 border-t border-gray-200 pt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">More Explainers You Might Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedExplainers.map((relArticle, index) => (
                <Link key={index} href={`/economy-explained/${relArticle.slug}`} passHref>
                  <Card className="rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 cursor-pointer">
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={relArticle.imageUrl}
                        alt={relArticle.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 flex items-center space-x-2">
                        <Badge className={`${categoryColors[relArticle.category as keyof typeof categoryColors]} text-white text-xs font-medium px-2 py-0.5 rounded-full`}>
                          {relArticle.category}
                        </Badge>
                        <Badge className={`${complexityColors[relArticle.complexity as keyof typeof complexityColors]} text-xs font-medium px-2 py-0.5 rounded-full`}>
                          {relArticle.complexity}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-yellow-700 transition-colors line-clamp-2">
                        {relArticle.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-3">
                        {relArticle.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center text-xs text-gray-500 gap-x-4 gap-y-1">
                        <span className="font-medium">{relArticle.author}</span>
                        <span>• {relArticle.publishDate}</span>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{relArticle.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{relArticle.views.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ExplainerDetailPage;
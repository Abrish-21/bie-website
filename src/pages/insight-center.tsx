import React from 'react';

import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FileText, BarChart3, Users, TrendingUp, Download, Eye, Calendar, Quote, ArrowUp, ArrowDown, ExternalLink } from 'lucide-react';

export default function InsightCenterPage() {
  // Featured Report for top section
  const featuredReport = {
    title: "Ethiopia Agriculture Report 2025",
    summary: "Comprehensive analysis of Ethiopia's agricultural sector performance, export opportunities, and policy impacts. Covers coffee, cereals, livestock, and emerging agribusiness trends.",
    coverImage: "https://images.unsplash.com/photo-1742996111692-2d924f12a058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldGhpb3BpYSUyMGJ1c2luZXNzJTIwbWVldGluZ3xlbnwxfHx8fDE3NTU2NDQ2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    pages: 85,
    downloadCount: 24500,
    publishDate: "August 2025"
  };

  // Additional B-Insight Reports
  const additionalReports = [
    {
      title: "Manufacturing Sector Deep Dive",
      summary: "Analysis of Ethiopia's industrial growth trajectory and investment opportunities.",
      thumbnail: "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU1NjExMjc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      pages: 62,
      publishDate: "July 2025"
    },
    {
      title: "Ethiopia FinTech Landscape 2025",
      summary: "Comprehensive overview of financial technology adoption and regulatory environment.",
      thumbnail: "https://images.unsplash.com/photo-1744782211816-c5224434614f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBjaGFydCUyMGRhdGF8ZW58MXx8fHwxNzU1NjQ0NjI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      pages: 45,
      publishDate: "June 2025"
    },
    {
      title: "Infrastructure Investment Guide",
      summary: "Strategic analysis of Ethiopia's infrastructure needs and public-private opportunities.",
      thumbnail: "https://images.unsplash.com/photo-1741991110666-88115e724741?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldGhpb3BpYSUyMGJ1c2luZXNzJTIwc2t5bGluZXxlbnwxfHx8fDE3NTU2NDY4Njd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      pages: 78,
      publishDate: "May 2025"
    }
  ];

  // CEO Barometer featured quote
  const featuredCEOQuote = {
    quote: "Ethiopia's biggest business challenge is currency volatility, but the opportunities in manufacturing and agriculture far outweigh the risks.",
    ceoName: "Almaz Mekonnen",
    company: "Ethiopian Agribusiness Corp",
    photo: "https://images.unsplash.com/photo-1610631066894-62452ccb927c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZW8lMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTU2NDY4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080"
  };

  // CEO Barometer mini infographics
  const ceoInsights = [
    {
      title: "Top 5 Challenges in 2025",
      type: "pie-chart",
      data: [
        { label: "Currency Volatility", value: 35 },
        { label: "Access to Credit", value: 22 },
        { label: "Regulatory Changes", value: 18 },
        { label: "Skills Shortage", value: 15 },
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
    ]
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Area with consistent dark background */}
      <Header/>
      <section 
        className="relative overflow-hidden text-white"
        style={{ backgroundColor: '#3d3d3d' }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Insight Center</h1>
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
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
              Download Latest Report
            </Button>
          </div>
        </div>
      </section>

      {/* Main Layout: 60% Main Column, 20% Sidebar 1, 20% Sidebar 2 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          
          {/* Main Column (60%) */}
          <div className="lg:col-span-6 space-y-12">
            
            {/* 2.1 B-Insight Reports */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">B-Insight</h2>
              
              {/* Featured Report */}
              <Card className="mb-8 overflow-hidden shadow-xl border-0">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-80 md:h-full">
                    <ImageWithFallback
                      src={featuredReport.coverImage}
                      alt={featuredReport.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-yellow-500 text-black">Featured Report</Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-sm">{featuredReport.pages} pages • {featuredReport.publishDate}</div>
                    </div>
                  </div>
                  
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{featuredReport.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{featuredReport.summary}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                      <div className="flex items-center space-x-1">
                        <Download className="h-4 w-4" />
                        <span>{featuredReport.downloadCount.toLocaleString()} downloads</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FileText className="h-4 w-4" />
                        <span>{featuredReport.pages} pages</span>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                      Download Full Report (PDF)
                    </Button>
                  </CardContent>
                </div>
              </Card>
              
              {/* Additional Reports Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {additionalReports.map((report, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow border-0 shadow-md">
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
                      <h4 className="font-bold text-gray-900 mb-3">{report.title}</h4>
                      <p className="text-gray-600 text-sm mb-4">{report.summary}</p>
                      <Button size="sm" variant="outline" className="w-full text-yellow-600 border-yellow-600 hover:bg-yellow-50">
                        Download Report
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* 2.2 Market Map Ethiopia */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Market Map Ethiopia</h2>
              
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Ethiopia Investment Ecosystem 2025</h3>
                    
                    {/* Placeholder for Visual Map/Infographic */}
                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-8 mb-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="text-2xl font-bold text-yellow-600 mb-1">$2.8B</div>
                          <div className="text-sm text-gray-600">FDI Inflow</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="text-2xl font-bold text-green-600 mb-1">45%</div>
                          <div className="text-sm text-gray-600">Manufacturing</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="text-2xl font-bold text-orange-600 mb-1">23%</div>
                          <div className="text-sm text-gray-600">Agriculture</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="text-2xl font-bold text-purple-600 mb-1">18%</div>
                          <div className="text-sm text-gray-600">Services</div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6">
                      Interactive visualization showing foreign direct investment patterns and regional distribution across Ethiopia's key economic sectors.
                    </p>
                    
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                      Explore Full Market Map <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* SEO-friendly subheadings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-gray-200">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Top Investors in Ethiopia</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex justify-between">
                          <span>China Development Bank</span>
                          <span className="font-medium">$850M</span>
                        </li>
                        <li className="flex justify-between">
                          <span>World Bank Group</span>
                          <span className="font-medium">$720M</span>
                        </li>
                        <li className="flex justify-between">
                          <span>European Investment Bank</span>
                          <span className="font-medium">$450M</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Sector Shares 2025</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex justify-between">
                          <span>Manufacturing</span>
                          <span className="font-medium">45.2%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Agriculture & Food</span>
                          <span className="font-medium">23.1%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Financial Services</span>
                          <span className="font-medium">18.7%</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 2.3 CEO Barometer */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">CEO Barometer</h2>
              
              {/* Hero Pull-Quote Card */}
              <Card className="mb-8 bg-gradient-to-r from-gray-50 to-yellow-50 border-0 shadow-lg">
                <CardContent className="p-8">
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
                      <blockquote className="text-xl text-gray-900 font-medium italic mb-4 leading-relaxed">
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
              
              {/* Mini Infographics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {ceoInsights.map((insight, index) => (
                  <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <h4 className="font-bold text-gray-900 mb-4 text-center">{insight.title}</h4>
                      
                      {insight.type === 'pie-chart' && (
                        <div className="space-y-2">
                          {insight.data.map((item, i) => (
                            <div key={i} className="flex justify-between items-center text-sm">
                              {'label' in item && (
                                <span className="text-gray-600">{item.label}</span>
                              )}
                              {'value' in item && (
                                <span className="font-medium">{item.value}%</span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {insight.type === 'bar-chart' && (
                        <div className="space-y-3">
                          {insight.data.map((item, i) => (
                            <div key={i} className="flex items-center space-x-3">
                              { 'period' in item && (
                                <span className="text-sm text-gray-600 w-12">{item.period}</span>
                              )}
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-yellow-500 h-2 rounded-full"
                                  style={{ width: 'value' in item ? `${item.value}%` : '0%' }}
                                ></div>
                              </div>
                              { 'value' in item && (
                                <span className="text-sm font-medium w-8">{item.value}</span>
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
              
              <div className="text-center">
                <Button variant="outline" className="text-yellow-600 border-yellow-600 hover:bg-yellow-50">
                  Download Full CEO Survey
                </Button>
              </div>
            </section>
          </div>

          {/* Sidebar 1 (20%) - Trending Research */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-yellow-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Trending Research</h3>
              <div className="space-y-4 text-sm">
                <div className="cursor-pointer hover:text-yellow-600 transition-colors">
                  <h4 className="font-medium mb-1">Digital Payment Adoption</h4>
                  <div className="text-gray-600">Mobile money usage trends across Ethiopia</div>
                </div>
                <div className="cursor-pointer hover:text-yellow-600 transition-colors">
                  <h4 className="font-medium mb-1">Green Finance Initiative</h4>
                  <div className="text-gray-600">Sustainable investment opportunities</div>
                </div>
                <div className="cursor-pointer hover:text-yellow-600 transition-colors">
                  <h4 className="font-medium mb-1">SME Growth Report</h4>
                  <div className="text-gray-600">Small business sector analysis</div>
                </div>
              </div>
            </div>

            {/* 2.4 B-Index */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">B-Index: Ethiopia Business Confidence Tracker</h3>
              
              {/* Current Index Value */}
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-yellow-600 mb-1">{bIndexData.currentValue}</div>
                <div className={`flex items-center justify-center space-x-1 text-sm ${
                  bIndexData.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {bIndexData.trend === 'up' ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : (
                    <ArrowDown className="h-4 w-4" />
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
              
              <div className="text-xs text-gray-600 mb-4">
                The B-Index measures business confidence across key sectors including manufacturing, services, and agriculture based on monthly CEO surveys.
              </div>
              
              <Button size="sm" variant="outline" className="w-full text-yellow-600 border-yellow-600 hover:bg-yellow-50">
                See Previous Index Reports
              </Button>
            </div>
          </div>

          {/* Sidebar 2 (20%) - Newsletter & Premium Downloads */}
          <div className="lg:col-span-2 space-y-6">
            <div 
              className="text-white rounded-xl p-6"
              style={{ backgroundColor: '#3d3d3d' }}
            >
              <h3 className="font-bold mb-4">Premium Research</h3>
              <p className="text-gray-300 text-sm mb-6">
                Get access to exclusive reports, quarterly briefings, and CEO interviews.
              </p>
              
              <div className="space-y-4 mb-6">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-gray-700 text-white border-gray-600 focus:ring-yellow-500 focus:border-yellow-500"
                />
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                  Subscribe to Premium
                </Button>
              </div>
              
              <div className="text-xs text-gray-400">
                Premium subscribers get early access to all research reports and quarterly market briefings.
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Gated Downloads</h3>
              <div className="space-y-3 text-sm">
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
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
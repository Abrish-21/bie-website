// pages/business-pulse/[slug].tsx

import { useRouter } from "next/router";
import SocialShare from "@/components/SocialShare";
import TrendingArticles from "@/components/TrendingArticles";
import RecommendedArticles from "@/components/RecommendedArticles";
import Link from "next/link";
import { ArrowLeft, DollarSign, Tag, Clock, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const ArticleDetail = () => {
  const router = useRouter();
  const { title, excerpt, thumbnail, author, timestamp, keyPoints, sector, value, deadline, imageUrl, description } = router.query;

  // Check if this is a B-Opportunities page
  const isOpportunity = sector && value && deadline;

  if (router.isFallback || !title) {
    return <p>Loading...</p>;
  }

  // If it's a B-Opportunity, render the opportunity layout
  if (isOpportunity) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="md:col-span-2">
              <div className="mb-6">
                <Link href="/business-pulse" className="flex items-center text-yellow-600 hover:text-yellow-700 transition-colors">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Back to Business Pulse</span>
                </Link>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
              <div className="flex flex-wrap items-center gap-2 mb-6 text-sm text-gray-500">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  <Tag className="h-4 w-4 mr-2" />
                  {sector}
                </Badge>
                <span className="flex items-center space-x-1">
                  <DollarSign className="h-4 w-4" />
                  <span>Value: {value}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>Deadline: {deadline}</span>
                </span>
              </div>
              
              <div className="relative w-full h-96 mb-8 overflow-hidden rounded-lg shadow-lg">
                  <ImageWithFallback
                      src={imageUrl}
                      alt={title}
                      className="object-cover w-full h-full"
                  />
              </div>

              <div className="prose prose-lg max-w-none text-gray-700">
                  <p className="text-lg leading-relaxed">{description}</p>
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">Project Overview</h2>
                  <p>This section would contain a detailed description of the project, including scope, objectives, and key deliverables. This data is not passed from the query string and would typically be fetched from a database or API based on the `slug` parameter.</p>
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">How to Apply</h2>
                  <p>A step-by-step guide for businesses on how to submit their bids or proposals. This can include a list of required documents, contact information, and a link to the official tender portal.</p>
              </div>
              
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact & Application</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Ready to apply? Click the button below to get started on your application.
                  </p>
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                    Apply Now <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-center">
                      <Clock className="h-4 w-4 mr-3 text-gray-500" />
                      <span>Deadline: {deadline}</span>
                    </li>
                    <li className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-3 text-gray-500" />
                      <span>Estimated Value: {value}</span>
                    </li>
                    <li className="flex items-center">
                      <Tag className="h-4 w-4 mr-3 text-gray-500" />
                      <span>Sector: {sector}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Otherwise, render the news article layout (your original code)
  const points = keyPoints ? keyPoints.split("|") : [];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Article Content */}
          <main className="lg:col-span-2 space-y-8">
            {/* Back to Feed Link */}
            <div className="mb-6">
              <Link href="/business-pulse" className="flex items-center text-yellow-600 hover:text-yellow-700 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Back to Business Pulse</span>
              </Link>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              {title}
            </h1>

            {/* Lead Paragraph */}
            <p className="text-xl font-light text-gray-600 leading-relaxed italic border-l-4 border-yellow-500 pl-4">
              {excerpt}
            </p>

            {/* Author and Date */}
            <div className="flex items-center justify-between border-t border-b border-gray-200 py-4">
              <p className="font-medium text-sm text-gray-500 uppercase">
                BY <span className="text-black font-semibold">{author}</span> | {timestamp}
              </p>
              <SocialShare />
            </div>

            {/* Main Image */}
            <figure className="mb-6">
              <img
                src={thumbnail}
                alt={title}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              <figcaption className="text-xs text-gray-500 mt-2 text-center">{title}</figcaption>
            </figure>

            {/* Article Content - Placeholder for multiple paragraphs and a quote */}
            <div className="prose prose-lg max-w-none text-gray-800">
              <p>
                This is a placeholder for the full article content. The layout now supports multiple paragraphs to create a richer reading experience. You can insert your full article text here.
              </p>
              
              <blockquote>
                <p>
                  "We have seen unprecedented growth in the digital sector this quarter. This trend is a clear signal of a maturing market and increased investor confidence."
                </p>
                <footer>
                  — Jane Doe, Financial Analyst
                </footer>
              </blockquote>

              <p>
                The move towards more detailed content sections allows you to break up long blocks of text, making the article easier to read and digest. You can add more images or subheadings to further enhance the page's structure.
              </p>
            </div>

            {/* Key Points */}
            {points.length > 0 && (
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-yellow-600 mb-3">Key Points</h3>
                <ul className="list-disc list-inside space-y-2">
                  {points.map((point, idx) => (
                    <li key={idx} className="text-sm text-gray-700">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommended Articles */}
            <RecommendedArticles />
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <h2 className="news-sidebar-title text-xl font-bold text-gray-900 uppercase tracking-wide border-b pb-2 mb-4">
              TRENDING
            </h2>
            <TrendingArticles />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
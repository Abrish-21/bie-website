"use client"

import { useRouter } from "next/router"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { ArrowLeft, Clock, Eye, Calendar, Tag, BarChart2 } from "lucide-react"
import { Card } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Footer } from "../../components/Footer"
import { Header } from "../../components/Header"
import { getPostBySlug } from "../../lib/data"

interface Author {
  name: string
  email?: string
  profilePictureUrl?: string
}

interface PostData {
  _id: string
  title: string
  excerpt?: string
  content?: string
  fullContent?: string
  imageUrl?: string
  category: string
  type: "featured" | "market-watch" | "opinion" | "latest" | "exclusive" | "analysis" | string
  tags?: string[]
  isDraft?: boolean
  seoTitle?: string
  seoDescription?: string
  slug: string
  author: string | Author
  authorId?: string
  authorImageUrl?: string
  authorTitle?: string
  readTime?: string
  views?: number
  publishDate?: string
  commentsCount?: number
  marketImpact?: string
  dataPoints?: { label: string; value: string | number }[]
}

const PostDetailPage = () => {
  const router = useRouter()
  const { slug } = router.query
  const [post, setPost] = useState<PostData | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<any[]>([])
  const [authorPosts, setAuthorPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [currentAdIndex, setCurrentAdIndex] = useState(0)
  const [sidebarAdIndex, setSidebarAdIndex] = useState(0)

  const adCarouselItems = [
    {
      title: "Premium Investment Insights",
      subtitle: "Get market analysis from top analysts",
      cta: "Start Free Trial",
    },
    { title: "Financial Planning Tools", subtitle: "Advanced portfolio management solutions", cta: "Explore Tools" },
    { title: "Real-time Market Data", subtitle: "Live updates and breaking news alerts", cta: "Subscribe Now" },
    { title: "Trading Academy", subtitle: "Learn from professional traders", cta: "Join Course" },
    { title: "Risk Management Suite", subtitle: "Protect your investments with AI-powered tools", cta: "Get Started" },
    { title: "Economic Research Hub", subtitle: "In-depth analysis and forecasts", cta: "Access Reports" },
  ]

  const sidebarAds = [
    { title: "Market Analytics Pro", subtitle: "Professional trading tools", type: "banner" },
    { title: "Investment Newsletter", subtitle: "Weekly market insights", type: "square" },
    { title: "Portfolio Tracker", subtitle: "Monitor your investments", type: "banner" },
    { title: "Economic Calendar", subtitle: "Key events and data releases", type: "square" },
  ]

  useEffect(() => {
    const loadPostAndRelatedData = async () => {
      if (!slug || typeof slug !== "string") {
        setLoading(false)
        return
      }
      try {
        const fetchedPost = (await getPostBySlug(slug)) as PostData
        setPost(fetchedPost)

        if (fetchedPost) {
          // Fetch related and author posts from our new API endpoints
          try {
            const [relatedRes, authorRes] = await Promise.all([
              fetch(`/api/posts/related/${fetchedPost._id}`),
              fetch(`/api/posts/by-author/${(fetchedPost.authorId as any)?._id}?currentPostId=${fetchedPost._id}`),
            ])

            if (relatedRes.ok) {
              const relatedData = await relatedRes.json()
              setRelatedPosts(relatedData)
            }

            if (authorRes.ok) {
              const authorData = await authorRes.json()
              setAuthorPosts(authorData)
            }
          } catch (apiError) {
            console.error("Failed to fetch related or author posts:", apiError)
          }
        }
      } catch (error) {
        console.error("Failed to load post data:", error)
        setPost(null)
      } finally {
        setLoading(false)
      }
    }

    loadPostAndRelatedData()
  }, [slug])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % adCarouselItems.length)
      setSidebarAdIndex((prev) => (prev + 1) % sidebarAds.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const CarouselAdSection = ({ title }: { title: string }) => (
    <div className="my-12 py-8 px-6 bg-gray-50 border border-gray-200 rounded-lg relative overflow-hidden group hover:shadow-lg transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Advertisement</span>
          <div className="flex space-x-1">
            {adCarouselItems.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentAdIndex ? "bg-gray-800" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 transition-all duration-300">
            {adCarouselItems[currentAdIndex].title}
          </h3>
          <p className="text-gray-600 mb-4">{adCarouselItems[currentAdIndex].subtitle}</p>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-md transition-all duration-300 hover:scale-105">
            {adCarouselItems[currentAdIndex].cta}
          </Button>
        </div>
      </div>
    </div>
  )

  const RelatedPostsSection = ({ title, posts }: { title: string; posts: any[] }) => {
    console.log(`[Debug] Posts for "${title}":`, posts);
    if (!posts || posts.length === 0) return null
    return (
      <Card className="my-16 p-8 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
        <h3 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">{title}</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {posts.map((p) => (
            <Link href={`/posts/${p.slug}`} key={p._id} passHref>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <div className="relative overflow-hidden h-48">
                  <Image
                    src={p.imageUrl || "/placeholder.svg?height=300&width=600&query=news+article"}
                    alt={p.title}
                    layout="fill"
                    objectFit="cover"
                    className="grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded-sm">
                      {p.category || "News"}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {p.publishDate ? new Date(p.publishDate).toLocaleDateString() : "Today"}
                    </span>
                  </div>
                  <h4 className="font-bold text-xl text-gray-900 group-hover:text-gray-700 transition-colors duration-300 line-clamp-2 mb-3">
                    {p.title}
                  </h4>
                  <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">{p.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {p.readTime || "5 min read"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {(p.views || Math.floor(Math.random() * 5000) + 1000).toLocaleString()}
                    </span>
                  </div>
                  {p.authorId && (
                    <div className="flex items-center mt-4">
                      <Image
                        src={(p.authorId as any).profilePictureUrl || "/placeholder.svg"}
                        alt={(p.authorId as any).name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span className="ml-2 text-sm text-gray-600">{(p.authorId as any).name}</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-700 text-lg">Loading article...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
            <p className="text-gray-700 text-lg mb-6">Article not found.</p>
            <Link href="/" passHref>
              <Button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold">Back to Homepage</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const displayContent = post.fullContent || post.content || ""
  const displayImageUrl = post.imageUrl || "https://placehold.co/1200x400/f5f5f5/333333?text=No+Image"

  const authorName = typeof post.author === "string" ? post.author : (post.authorId as any)?.name || "Unknown Author"
  const authorImageUrl = typeof post.author === "object" ? post.author?.profilePictureUrl : (post.authorId as any)?.profilePictureUrl
  const authorInitial = authorName?.[0]?.toUpperCase() || "?"

  const renderContent = () => {
    const paragraphs = displayContent.split(/<p>/g).filter((p) => p.trim() !== "")
    const renderedContent = []
    const adInterval = 2
    const relatedPostsInsertIndex = 4

    for (let i = 0; i < paragraphs.length; i++) {
      const paragraph = paragraphs[i]
      if (paragraph) {
        renderedContent.push(
          <p
            key={`para-${i}`}
            className="mb-6 text-lg leading-relaxed text-gray-800"
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />,
        )
      }

      if ((i + 1) % adInterval === 0 && i < paragraphs.length - 1) {
        renderedContent.push(<CarouselAdSection key={`ad-${i}`} title="Advertisement" />)
      }

      if (i + 1 === relatedPostsInsertIndex && relatedPosts.length > 0) {
        renderedContent.push(
          <RelatedPostsSection key="related-posts-section" title="You Might Also Like" posts={relatedPosts} />,
        )
      }

      if (i + 1 === Math.floor(paragraphs.length * 0.6) && authorPosts.length > 0) {
        renderedContent.push(
          <RelatedPostsSection
            key="author-posts-mid"
            title={`More from ${authorName}`}
            posts={authorPosts.slice(0, 2)}
          />,
        )
      }
    }

    if (paragraphs.length > 5) {
      renderedContent.push(<CarouselAdSection key="final-ad" title="Advertisement" />)
    }

    return renderedContent
  }

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900 flex flex-col">
      <Header />
      <div className="flex w-full min-h-[calc(100vh-64px)]">
        {/* Main Content */}
        <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-sm font-medium">Back to Homepage</span>
            </Link>
          </div>

          <main className="space-y-8">
            {/* Article Header */}
            <div className="text-left border-b border-gray-200 pb-8">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge className="bg-gray-900 text-white text-sm font-medium px-3 py-1 rounded-sm">
                  {post.category}
                </Badge>
                {post.type === "marketUpdate" && (
                  <Badge className="bg-gray-700 text-white text-sm font-medium px-3 py-1 rounded-sm">
                    Market Update
                  </Badge>
                )}
                {post.type === "opinion" && (
                  <Badge className="bg-gray-600 text-white text-sm font-medium px-3 py-1 rounded-sm">Opinion</Badge>
                )}
                {post.type === "featured" && (
                  <Badge className="bg-black text-white text-sm font-medium px-3 py-1 rounded-sm">Featured</Badge>
                )}
                {post.type === "exclusive" && (
                  <Badge className="bg-gray-800 text-white text-sm font-medium px-3 py-1 rounded-sm">Exclusive</Badge>
                )}
                {post.type === "analysis" && (
                  <Badge className="bg-gray-500 text-white text-sm font-medium px-3 py-1 rounded-sm">Analysis</Badge>
                )}
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 text-balance">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-xl md:text-2xl font-light text-gray-600 leading-relaxed max-w-3xl text-pretty">
                  {post.excerpt}
                </p>
              )}
            </div>

            {/* Author and Meta Info */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-b border-gray-100">
              <div className="flex items-center space-x-4">
                {authorImageUrl ? (
                  <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-gray-200">
                    <Image
                      src={authorImageUrl || "/placeholder.svg"}
                      alt={authorName}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center text-lg font-medium text-white">
                    {authorInitial}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900">{authorName}</p>
                  {post.authorTitle && <p className="text-sm text-gray-600">{post.authorTitle}</p>}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime || "5 min read"}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{post.publishDate ? new Date(post.publishDate).toLocaleDateString() : "Today"}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{(post.views || 0).toLocaleString()}</span>
                </span>
              </div>
            </div>

            {/* Featured Image */}
            <figure className="my-8 relative rounded-lg overflow-hidden h-[300px] md:h-[400px]">
              <Image
                src={displayImageUrl || "/placeholder.svg"}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                className="grayscale hover:grayscale-0 transition-all duration-500"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== "https://placehold.co/1200x400/f5f5f5/333333?text=No+Featured+Image") {
                    target.src = "https://placehold.co/1200x400/f5f5f5/333333?text=No+Featured+Image"
                  }
                  target.onerror = null
                }}
              />
            </figure>

            {/* Market Impact Section */}
            {post.type === "marketUpdate" && post.marketImpact && (
              <Card className="bg-gray-50 border border-gray-200 p-6 my-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <BarChart2 className="h-5 w-5 mr-2 text-gray-700" /> Market Impact
                </h3>
                <p className="text-gray-700 mb-4">{post.marketImpact}</p>
                {post.dataPoints && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {post.dataPoints.map((data: any, i: number) => (
                      <div
                        key={i}
                        className="flex justify-between items-center bg-white p-3 rounded border border-gray-100"
                      >
                        <span className="text-sm font-medium text-gray-600">{data.label}:</span>
                        <span className="font-semibold text-gray-900">{data.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 py-4">
                {post.tags.map((tag: string, i: number) => (
                  <Badge
                    key={i}
                    className="bg-gray-100 text-gray-700 text-sm font-normal px-3 py-1 rounded-full border border-gray-200 hover:bg-gray-200 transition-colors duration-300"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              {displayContent ? (
                renderContent()
              ) : (
                <p className="text-gray-500 italic text-center py-8">No content available for this article.</p>
              )}
            </div>

            {/* Author's Other Posts */}
            {authorPosts.length > 0 && (
              <RelatedPostsSection title={`More Stories by ${authorName}`} posts={authorPosts} />
            )}

            <CarouselAdSection title="Advertisement" />

          </main>
        </div>

        <aside className="hidden xl:block w-80 bg-gray-50 border-l border-gray-200 sticky top-0 h-screen overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Rotating Banner Ad */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
              <div className="text-center">
                <div className="mb-4">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Sponsored</span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{sidebarAds[sidebarAdIndex]?.title}</h4>
                <p className="text-gray-600 mb-4 text-sm">{sidebarAds[sidebarAdIndex]?.subtitle}</p>
                <div className="bg-gray-100 h-32 rounded-md flex items-center justify-center mb-4">
                  <span className="text-gray-500 text-sm">Ad Creative</span>
                </div>
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white text-sm py-2 rounded-md transition-all duration-300">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Square Ad Grid */}
            <div className="grid grid-cols-2 gap-4">
              {sidebarAds.slice(0, 2).map((ad, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="bg-gray-100 h-20 rounded-md flex items-center justify-center mb-3">
                    <span className="text-gray-500 text-xs">Ad</span>
                  </div>
                  <h5 className="text-sm font-semibold text-gray-900 mb-1">{ad.title}</h5>
                  <p className="text-xs text-gray-600">{ad.subtitle}</p>
                </div>
              ))}
            </div>

            {/* Vertical Banner Ad */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
              <div className="text-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Advertisement</span>
                <div className="bg-gray-100 h-64 rounded-md flex items-center justify-center my-4">
                  <span className="text-gray-500 text-sm">Vertical Ad Space</span>
                </div>
                <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm py-2 rounded-md transition-all duration-300">
                  Click Here
                </Button>
              </div>
            </div>
          </div>
        </aside>
      </div>
      <Footer />
    </div>
  )
}

export default PostDetailPage
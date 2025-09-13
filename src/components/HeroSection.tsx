"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

interface PopularPost {
  _id: string
  title: string
  excerpt: string
  imageUrl: string
  slug: string
  publishDate: string
}

const HeroSection = () => {
  const [popularPosts, setPopularPosts] = useState<PopularPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPopularPosts = async () => {
      try {
        const res = await fetch("/api/posts/popular")
        if (res.ok) {
          const data = await res.json()
          setPopularPosts(data)
        }
      } catch (error) {
        console.error("Failed to fetch popular posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPopularPosts()
  }, [])

  return (
    <div className="w-full bg-white text-black py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-10 gap-8 px-4">
        {/* Left Column (60%) */}
        <div className="md:col-span-6">
          <div className="relative w-full h-[300px] md:h-full">
            <Image
              src="/assets/exchange.png"
              alt="Foreign Exchange"
              layout="fill"
              objectFit="cover"
              className="sharp-corners body-cover"
              width={600} height={400}
            />
            <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black via-black/70 to-transparent w-full">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Global Markets & Foreign Exchange</h2>
              <p className="text-white/90 mt-2 max-w-2xl">
                Stay updated with the latest trends, analysis, and data in the world of foreign currency exchange and international markets.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (40%) */}
        <div className="md:col-span-4">
          <h3 className="text-2xl font-bold text-black border-b-2 border-black pb-2 mb-4">
            Popular News
          </h3>
          <div className="space-y-4">
            {loading ? (
              Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-3 py-1">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-300 rounded"></div>
                      <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                    </div>
                  </div>
                  <div className="w-24 h-16 bg-gray-300"></div>
                </div>
              ))
            ) : (
              popularPosts.map((post) => (
                <Link href={`/posts/${post.slug}`} key={post._id}>
                  <div className="group flex items-start space-x-4 border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-1">
                        {new Date(post.publishDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <h4 className="font-bold text-lg text-black group-hover:underline leading-tight">
                        {post.title}
                      </h4>
                      <p className="text-gray-700 text-sm mt-1 line-clamp-2">{post.excerpt}</p>
                    </div>
                    <div className="w-28 h-20 relative flex-shrink-0">
                      <Image
                        src={post.imageUrl || "/placeholder.svg?width=112&height=80"}
                        alt={post.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection

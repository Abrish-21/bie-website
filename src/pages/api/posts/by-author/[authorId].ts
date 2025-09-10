// src/pages/api/posts/by-author/[authorId].ts

import { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "../../../../lib/dbConnect"
import Post from "../../../../models/Post"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  const { authorId, currentPostId } = req.query // We'll pass the current post ID to exclude it

  if (method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" })
  }

  if (!authorId) {
    return res.status(400).json({ message: "Author ID is required." })
  }

  try {
    await dbConnect()

    // Find posts by the same author, excluding the current post.
    // We also add a limit to avoid fetching too many posts.
    const authorPosts = await Post.find({
      author: authorId,
      _id: { $ne: currentPostId }, // $ne means "not equal"
    })
      .sort({ publishDate: -1 }) // Get the most recent ones
      .limit(4) // Limit to 4 posts
      .lean() // .lean() is a performance booster for read-only operations

    return res.status(200).json(authorPosts)
  } catch (error) {
    console.error("Failed to fetch posts by author:", error)
    return res.status(500).json({ message: "Internal Server Error" })
  }
}
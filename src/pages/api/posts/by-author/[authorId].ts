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
      authorId: authorId,
      _id: { $ne: currentPostId }, 
    })
      .select('title slug excerpt imageUrl category publishDate readTime views authorId')
      .populate('authorId', 'name profilePictureUrl') // Populate author details
      .sort({ publishDate: -1 }) 
      .limit(4) 
      .lean()

    return res.status(200).json(authorPosts)
  } catch (error) {
    console.error("Failed to fetch posts by author:", error)
    return res.status(500).json({ message: "Internal Server Error" })
  }
}
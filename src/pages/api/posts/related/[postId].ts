// src/pages/api/posts/related/[postId].ts

import { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "../../../../lib/dbConnect"
import Post from "../../../../models/Post"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  const { postId } = req.query

  if (method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" })
  }

  if (!postId) {
    return res.status(400).json({ message: "Post ID is required." })
  }

  try {
    await dbConnect()

    // First, find the current post to get its category and tags
    const currentPost = await Post.findById(postId).lean() as any;

    if (!currentPost) {
      return res.status(404).json({ message: "Original post not found." })
    }

    // Find posts that are NOT the current post and match:
    // 1. The same category OR
    // 2. Have at least one of the same tags
    const relatedPosts = await Post.find({
      _id: { $ne: postId }, // Exclude the current post
      $or: [
        { category: currentPost.category },
        { tags: { $in: currentPost.tags } }, 
      ],
    })
      .select('title slug excerpt imageUrl category publishDate readTime views authorId')
      .populate('authorId', 'name profilePictureUrl') // Populate author details
      .sort({ publishDate: -1 })
      .limit(4) 
      .lean()

    return res.status(200).json(relatedPosts)
  } catch (error) {
    console.error("Failed to fetch related posts:", error)
    return res.status(500).json({ message: "Internal Server Error" })
  }
}
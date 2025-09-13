import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Post from "../../../models/Post";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await dbConnect();

  try {
    const popularPosts = await Post.find({ isDraft: { $ne: true } })
      .sort({ views: -1 })
      .limit(4)
      .select("title excerpt imageUrl slug publishDate")
      .lean();

    res.status(200).json(popularPosts);
  } catch (error) {
    console.error("Error fetching popular posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

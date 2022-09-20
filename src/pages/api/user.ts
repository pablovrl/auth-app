// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connecToDatabase } from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connecToDatabase();
  switch (req.method) {
    case "GET": {
      const users = await db.collection("users").find({}).toArray();
      return res.status(200).json(users);
    }
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}

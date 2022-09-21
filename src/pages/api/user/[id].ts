import type { NextApiRequest, NextApiResponse } from "next";
import { connecToDatabase } from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connecToDatabase();
  switch (req.method) {
    case "GET": {
      const id = req.query.id as string;
      if (!id) return res.status(400).json({ error: "Missing id" });

      const user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(id) });
      if (!user) return res.status(404).json({ error: "User not found" });

      return res.status(200).json(user);
    }
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}

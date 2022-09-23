import type { NextApiRequest, NextApiResponse } from "next";
import { connecToDatabase } from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { verifyToken } from "../../../../utils/auth";
import bcrypt from "bcrypt";

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
    case "PUT": {
      const id = req.query.id as string;
      const { token } = req.cookies;
      let payload: any = verifyToken(token?.split(" ")[1]);
      if (!payload || payload._id !== id) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      let newData: {
        name?: string;
        email?: string;
        password?: string;
        phone?: string;
      } = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      };

      if (req.body.password) {
        newData.password = await bcrypt.hash(req.body.password, 10);
      }

      const user = await db
        .collection("users")
        .findOne({ email: newData.email });
      if (user && payload.email !== newData.email) {
        return res.status(400).json({ error: "Email already in use" });
      }

      await db
        .collection("users")
        .updateOne({ _id: new ObjectId(id) }, { $set: newData });
      return res.status(200).json({ message: "User updated successfully" });
    }
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}

import type { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";
import { connecToDatabase } from "../../../lib/mongodb";
import { sign } from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connecToDatabase();
  switch (req.method) {
    case "POST": {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "Missing email or password" });
      }

      const user = await db.collection("users").findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      const isPasswordCorrect = bcrypt.compareSync(password, user.password);

      if (!isPasswordCorrect) {
        return res.status(400).json({ error: "Invalid password" });
      }

      const payload = {
        _id: user._id,
        email: user.email,
        type: user.type,
      };

      const token = sign(payload, process.env.JWT_SECRET!, {
        expiresIn: "1d",
      });

      return res.status(200).json({ token: "Bearer " + token });
    }
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}

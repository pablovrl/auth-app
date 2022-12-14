// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";
import { connecToDatabase } from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connecToDatabase();
  switch (req.method) {
    case "POST": {
      const { name, phone, email, password } = req.body;
      if (!name || !phone || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const isExistingUser = await db.collection("users").findOne({ email });
      if (isExistingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      await db.collection("users").insertOne({
        name,
        email,
        phone,
        password: hashedPassword,
        type: "admin",
        photo: "",
      });
      return res.status(201).json({ message: "User created" });
    }
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}

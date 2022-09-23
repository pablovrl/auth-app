import fs from "fs";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { connecToDatabase } from "../../../lib/mongodb";
import { saveFile } from "../../../lib/multer";
import { verifyToken } from "../../../utils/auth";

const handler = nextConnect({
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(400).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

handler.use(saveFile.single("file"));

handler.post(
  async (
    req: NextApiRequest & { file: Express.Multer.File },
    res: NextApiResponse
  ) => {
    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }
    const { cookie } = req.headers;
    const token = cookie?.split("=")[1];
    let user: any = verifyToken(token);
    const userId = new ObjectId(user._id);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { db } = await connecToDatabase();
    user = await db.collection("users").findOne({ _id: userId });
    if (user.photo !== "") {
      const path = "./public/" + user.photo;
      fs.unlinkSync(path);
    }

    const path = "uploads/" + req.file.filename;
    await db
      .collection("users")
      .updateOne({ _id: userId }, { $set: { photo: path } });

    res.status(200).json({ message: "File uploaded successfully", path });
  }
);

export default handler;
export const config = {
  api: {
    bodyParser: false,
  },
};

import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Missing name" });
    const submission = await prisma.submission.create({ data: { name } });
    return res.status(200).json(submission);
  }
  if (req.method === "GET") {
    const submissions = await prisma.submission.findMany({ orderBy: { createdAt: "desc" } });
    return res.status(200).json(submissions);
  }
  res.setHeader("Allow", ["POST", "GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

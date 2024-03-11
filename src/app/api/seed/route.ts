import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();
  await prisma.todo.createMany({
    data: [
      { description: "Buy milk", complete: true },
      { description: "Call mom" },
      { description: "Write a blog post" },
      { description: "Run 5k" },
      { description: "Plan a trip" },
    ],
  });

  return NextResponse.json({ message: "Seed Executed OK" });
}

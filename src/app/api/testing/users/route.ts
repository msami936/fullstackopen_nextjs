import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  }

  const body = await request.json();
  const { username, name, password } = body;

  if (!username || !name || !password) {
    return NextResponse.json(
      { error: "username, name and password are required" },
      { status: 400 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const [user] = await db
    .insert(users)
    .values({
      username,
      name,
      passwordHash,
    })
    .returning({
      id: users.id,
      username: users.username,
      name: users.name,
    });

  return NextResponse.json(user, { status: 201 });
}

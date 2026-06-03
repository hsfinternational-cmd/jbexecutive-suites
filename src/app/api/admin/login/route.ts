import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const expectedEmail = process.env.ADMIN_EMAIL || "admin@jbexecutivesuites.test";
  const expectedPassword = process.env.ADMIN_PASSWORD || "change-me-in-production";
  const ok = email === expectedEmail && (await bcrypt.compare(password, await bcrypt.hash(expectedPassword, 10)));
  if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  const cookieStore = await cookies();
  cookieStore.set("jb_admin", "dev-session", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 8 });
  redirect("/admin");
}

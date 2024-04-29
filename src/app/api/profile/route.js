import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOpts } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(req) {
  mongoose.connect(process.env.CONNECTION_STRING);
  const data = await req.json();
  const session = await getServerSession(authOpts);
  console.log(session);
  if ("fullName" in data) {
  }
  return Response.json(true);
}

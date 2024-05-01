import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOpts } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/app/models/User";

export async function PUT(req) {
  mongoose.connect(process.env.CONNECTION_STRING);
  const data = await req.json();
  const session = await getServerSession(authOpts);
  const email = session?.user?.email;

  await User.updateOne({ email }, data);
  return Response.json(true);
}

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

async function checkAdmin() {
  mongoose.connect(process.env.CONNECTION_STRING);
  const session = await getServerSession(authOpts);
  const email = session?.user?.email;
  const user = await User.findOne({ email });
  return user?.admin;
}

export async function GET(req) {
  try {
    const isAdmin = await checkAdmin();
    return Response.json({ isAdmin });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "Unexpected Error" });
  }
}

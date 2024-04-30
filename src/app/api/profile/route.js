import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOpts } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/app/models/User";

export async function PUT(req) {
  mongoose.connect(process.env.CONNECTION_STRING);
  const data = await req.json();
  const session = await getServerSession(authOpts);
  const email = session?.user?.email;

  console.log(data);

  const update = {};
  if ("fullName" in data) {
    update.fullName = data.fullName;
  }
  if ("image" in data) {
    update.image = data.image;
  }

  if (Object.keys(update).length > 0) {
    await User.updateOne({ email }, update);
  }
  return Response.json(true);
}

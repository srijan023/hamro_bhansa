import { User } from "@/app/models/User";
import mongoose from "mongoose";

export async function POST (req) {
// npm add mongoose required
  const body = await req.json();

  console.log("Here")
  mongoose.connect(process.env.CONNECTION_STRING);
  const createdUser = await User.create(body);
  return Response.json(createdUser);
}

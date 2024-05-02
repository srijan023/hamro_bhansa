import { User } from "@/app/models/User";
import mongoose from "mongoose";

export async function POST(req) {
  // npm add mongoose required
  const body = await req.json();

  /*
    1. Destructure the respose body 
    2. Validate each iteam
    3. Check for injections
    4. Pass it to the database
  */

  // validation from the schema
  mongoose.connect(process.env.CONNECTION_STRING);
  const createdUser = await User.create(body);
  return Response.json(createdUser);
}

import mongoose from "mongoose";
import { Category } from "@/app/models/category";

const checkAdminFunc = async () => {
  const res = await fetch("/api/profile");
  const data = await res.json();
  return data?.isAdmin;
};

export async function POST(req) {
  // mongoose.connect(process.env.CONNECTION_STRING);
  const { name } = await req.json();
  // let isAdmin = await checkAdminFunc();
  // if(!isAdmin){
  //   return Response.json()
  // }
  const createdCategory = await Category.create({ name });
  return Response.json(createdCategory);
}

export async function DELETE(req) {
  const { delVal } = await req.json();

  const deletedCategory = await Category.deleteOne({ name: delVal });
  return Response.json(deletedCategory);
}

export async function GET(req) {
  return Response.json(await Category.find());
}

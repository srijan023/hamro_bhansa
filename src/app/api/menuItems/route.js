import mongoose from "mongoose";
import { MenuItem } from "../../models/menuItem";

export async function POST(req) {
  mongoose.connect(process.env.CONNECTION_STRING);
  const data = await req.json();
  console.log(data);
  const createdMenuItem = await MenuItem.create(data);
  return Response.json(createdMenuItem);
}

export async function PUT(req) {
  const data = await req.json();
  const { name } = data;

  const UpdatedMenuItem = await MenuItem.findOneAndUpdate(
    { name: name },
    data,
    { new: true }
  );
  return Response.json(UpdatedMenuItem);
}

export async function DELETE(req) {
  const name = await req.json();

  const deletedItem = await MenuItem.deleteOne(name);
  return Response.json(deletedItem);
}

export async function GET(req) {
  return Response.json(await MenuItem.find());
}

import { Schema, model, models } from "mongoose";

const MenuItemSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
    category: { type: String, required: true },
    isFavourite: { type: Boolean, default: false },
  },
  { timestamp: true }
);

export const MenuItem = models.MenuItem || model("MenuItem", MenuItemSchema);

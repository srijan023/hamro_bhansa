const { Schema, models, model } = require("mongoose");

const UserInfoSchema = new Schema(
  {
    email: { type: String, required: true },

    street: { type: String },
    city: { type: String },
    country: { type: String },
    postalCode: { type: String },

    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// NOTE: This is only required if we wish to sign in with google timestamp 5:14

export default UserInfoSchema =
  models?.UserInfoSchema || model("UserInfoSchema", UserInfoSchema);

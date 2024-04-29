import bcrypt from "bcrypt";
import { User } from "@/app/models/User";
import mongoose from "mongoose";
import NextAuth from "next-auth";
// credentials providers taken from next-auth.js/configuration/providers
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";

// TODO: Sign in with google timestamp 2:35:22

export const authOpts = {
  // required to keep the session on the database so that login is not required after each reload
  // adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        mongoose.connect(process.env.CONNECTION_STRING);

        const user = await User.findOne({ email });
        const isAuthorized =
          // comparing if the hashed value match iff the user exists
          user && bcrypt.compareSync(password, user.password);

        if (isAuthorized) return user;

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOpts);

export { handler as GET, handler as POST };

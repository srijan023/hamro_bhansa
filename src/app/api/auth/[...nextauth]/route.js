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
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      // if I directly pass in user with the token, the next time I reload there is no user and data is lost in session
      if (user?.fullName) {
        token.fullName = user.fullName;
      }

      if (user?.image) {
        token.image = user.image;
      }

      if (user?.phone) {
        token.phone = user.phone;
      }

      if (user?.postalCode) {
        token.postalCode = user.postalCode;
      }

      if (user?.city) {
        token.city = user.city;
      }

      if (user?.country) {
        token.country = user.country;
      }

      if (user?.street) {
        token.street = user.street;
      }

      if (trigger === "update" && session) {
        token.image = session.image;
        token.phone = session.phone;
        token.country = session.country;
        token.city = session.city;
        token.postalCode = session.postalCode;
        token.fullName = session.fullName;
        token.street = session.street;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.fullName) {
        session.fullName = token.fullName;
      }

      if (token?.image) {
        session.image = token.image;
      }

      if (token?.phone) {
        session.phone = token.phone;
      }

      if (token?.postalCode) {
        session.postalCode = token.postalCode;
      }

      if (token?.city) {
        session.city = token.city;
      }

      if (token?.country) {
        session.country = token.country;
      }

      if (token?.street) {
        session.street = token.street;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOpts);

export { handler as GET, handler as POST };

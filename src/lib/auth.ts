import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required.");
        }
        const existingUser = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!existingUser) {
          throw new Error("No user found with the provided email.");
        }
        const passwordMatch = await compare(credentials.password, existingUser.password);

        if (!passwordMatch) {
          throw new Error("Invalid password.");
        }

        return {
          id: `${existingUser.id}`,
          email: existingUser.email,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks:{
    async jwt({token,user}) {
        if(user){
            return{
                ...token,
                email:user.email
            }
        }
        return token
    },
    async session({session,token}){
        return{
            ...session,
            user:{
                ...session,
                email:token.email
            }
        }
    }
  }
  
};

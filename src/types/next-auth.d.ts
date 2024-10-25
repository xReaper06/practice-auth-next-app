import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    email:string
  }
  interface Session {
    user: user & {
      /** The user's postal address. */
      email: string
    }
    token:{
        email:string
    }
  }
}
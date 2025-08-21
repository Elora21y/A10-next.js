import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions= {
  providers: [
    CredentialsProvider({
    name: "Credentials",
    credentials: {
      username: { label: "Username", type: "text", placeholder: "Komola" },
      password: { label: "Password", type: "password" , placeholder: "komola123" },
      email: { label: "Email", type: "email" ,placeholder: "kom@la.com" },
    },
    async authorize(credentials, req) {
      // console.log('user', credentials)
      const user = credentials

      if (user.email && user.password) {
        return user //router.push(`/products`)
      } else {
        return null
      }
    }
  }),
   GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET
  })
  ],
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, { NextAuthOptions } from "next-auth";
export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const res = await fetch("https://backend.watanyia.com/api/v1/auth/admin/login", {
          method: 'POST',
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" }
        })
        const { data: user } = await res.json();
        if (res.ok && user) {
          return user
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token as any;
      return session
    },
  }
}
export default NextAuth(options);
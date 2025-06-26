import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // In a real app, you would query your database here
          // This is just a mock implementation

          // User credentials
          if (
            credentials?.email === "user@medicova.com" &&
            credentials?.password === "user123"
          ) {
            return {
              id: "1",
              name: "Regular User",
              email: "user@medicova.com",
              role: "user",
            };
          }

          // Seller credentials
          if (
            credentials?.email === "seller@medicova.com" &&
            credentials?.password === "seller123"
          ) {
            return {
              id: "2",
              name: "Seller Account",
              email: "seller@medicova.com",
              role: "seller",
            };
          }
          // Admin credentials
          if (
            credentials?.email === "admin@medicova.com" &&
            credentials?.password === "admin123"
          ) {
            return {
              id: "3",
              name: "admin Account",
              email: "admin@medicova.com",
              role: "admin",
            };
          }

          return null;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role; // Using 'role' instead of 'type' for better semantics
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { env } from '@/env/server.mjs';
import { prisma } from '@/server/db';

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (!session.user) {
        return session;
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);

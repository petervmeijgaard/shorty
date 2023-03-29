import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { type GetServerSidePropsContext } from 'next';
// eslint-disable-next-line camelcase
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { env } from '@/env.mjs';
import { prisma } from './db';

/**
 * Module augmentation for `next-auth` types.
 * Allows us to add custom properties to the `session` object and keep type
 * safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  type Session = {
    user?: {
      id: string;
    } & DefaultSession['user'];
  };
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks,
 * etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
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
    redirect() {
      return '/';
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here
     *
     * Most other providers require a bit more work than the Discord provider.
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
     */
  ],
  pages: {
    signIn: '/auth/sign-in',
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the
 * `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => getServerSession(ctx.req, ctx.res, authOptions);

export default getServerAuthSession;

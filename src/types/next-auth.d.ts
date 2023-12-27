import NextAuth, { DefaultSession } from 'next-auth';
import { DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      role: {
        id: number;
        name: string;
      } & DefaultSession
    }
  }
  interface User extends DefaultUser {
    role: {
      id: number;
      name: string;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: {
      id: number;
      name: string;
    }
  }
}
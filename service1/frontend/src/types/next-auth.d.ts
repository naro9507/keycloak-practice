import NextAuth, {
  DefaultSession,
  AdapterUser,
  KeycloackProfile,
} from "next-auth";

import { KeycloackProfile } from "next-auth/providers/keycloak";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  type Session = DefaultSession & {
    user: {
      id: string;
      email: string;
      emailVerified: Date | null;
      accessToken: string;
    };
  };
}

declare module "next-auth/jwt" {
  type JWT = KeycloackProfile & {
    accessToken: string;
  };
}

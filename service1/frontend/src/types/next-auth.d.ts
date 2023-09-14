import { DefaultSession, KeycloackProfile } from "next-auth";

import { KeycloackProfile } from "next-auth/providers/keycloak";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  // eslint-disable-next-line no-unused-vars
  type Session = DefaultSession & {
    user: {
      id: string;
      email: string;
      emailVerified: Date | null;
      accessToken?: string;
      refreshToken?: string;
      accessTokenExpires?: number;
    };
  };
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  // eslint-disable-next-line no-unused-vars
  type JWT = KeycloackProfile & {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: string;
  };
}

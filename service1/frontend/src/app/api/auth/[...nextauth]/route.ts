import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

const handler = NextAuth({
  debug: process.env.DEBUG === "true",
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID!,
      clientSecret: process.env.KEYCLOAK_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
    }),
  ],
  callbacks: {
    session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.sub,
          name: token.name,
          email: token.email,
          emailVerified: token.email_verified,
          accessToken: token.accessToken,
          accessTokenExpires: token.accessTokenExpires,
          refreshToken: token.refreshToken,
        },
      };
    },
    async jwt({ token, user, account }) {
      if (account && account.expires_at && user) {
        return {
          ...token,
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + account.expires_at * 1000,
          refreshToken: account.refresh_token,
        };
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };

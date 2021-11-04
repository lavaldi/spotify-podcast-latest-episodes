import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  providers: [
    SpotifyProvider({
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-email,user-library-read,user-read-playback-position",
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  ],

  secret: process.env.SECRET,

  session: {
    jwt: true,
  },

  jwt: {
    secret: process.env.SECRET,
  },

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.refresh_token;
      }
      return token;
    },
    async session(session, user) {
      session.user = user;
      return session;
    },
  },

  // Enable debug messages in the console if you are having problems
  debug: false,
});

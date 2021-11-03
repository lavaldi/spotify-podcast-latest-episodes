import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  providers: [
    SpotifyProvider({
      scope: ["user-read-email", "user-read-playback-position"],
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET
    })
  ],

  secret: process.env.SECRET,

  session: {
    jwt: true,
  },

  jwt: {
    secret: process.env.SECRET,
  },

  // Enable debug messages in the console if you are having problems
  debug: false,
});

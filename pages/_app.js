import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider
      options={{
        // * 0  - Disabled (always use cache value)
        // * 60 - Sync session state with server if it's older than 60 seconds
        staleTime: 0,
        refetchInterval: 0,
      }}
      session={pageProps.session}
    >
      <Component {...pageProps} />
    </SessionProvider>
  );
}

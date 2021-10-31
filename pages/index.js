import { getSession } from "next-auth/react";
import Layout from "../components/layout";

export default function Page({ session }) {
  return (
    <Layout>
      <h1>Spotify Auth Example</h1>
      {session ? <p>Yay! 🎉</p> : <p>Nothing to see here yet 😜</p>}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context)
    }
  }
}

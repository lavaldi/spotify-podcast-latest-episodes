import { getSession } from "next-auth/react";
import useSWR from "swr";
import Image from "next/image";
import fetcher from "../lib/fetcher";
import Layout from "../components/layout";

export default function Page({ authData }) {
  const { data } = useSWR("/api/shows", fetcher);

  return (
    <Layout>
      <h1>Spotify Auth Example</h1>
      {authData ? (
        <>
          <p>
            The latest episodes of your favorite podcasts will appear here 🎧
          </p>
          {data?.items.map(({ show }) => (
            <div key={show.id}>
              <h1>{show.name}</h1>
              <Image alt={show.name} src={show.images[0]?.url} width="100" height="100" />
            </div>
          ))}
        </>
      ) : (
        <p>Not signed in 🔒</p>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      authData: await getSession(context),
    },
  };
}

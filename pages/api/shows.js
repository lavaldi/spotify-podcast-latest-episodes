import { getUsersShows } from "../../lib/spotify";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const {
    token: { accessToken },
  } = await getSession({ req });

  try {
    const response = await getUsersShows(accessToken);
    const { items } = await response.json();

    res.status(200).json({ items });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
}

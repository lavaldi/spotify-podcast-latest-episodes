import { getEpisodes } from "../../lib/spotify";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const {
    token: { accessToken },
  } = await getSession({ req });

  try {
    const showsEpisodes = await getEpisodes(accessToken);
    const items = showsEpisodes.flatMap((show) => show.items);
    const episodes = items
      .filter((item) => !item.resume_point.fully_played)
      .sort(function (a, b) {
        return new Date(b.release_date) - new Date(a.release_date);
      });
    const uris = episodes.map((episode) => episode.uri);

    res.status(200).json({ episodes, uris });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
}

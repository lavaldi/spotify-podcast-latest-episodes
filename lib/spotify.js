const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const SHOWS_ENDPOINT = "https://api.spotify.com/v1/me/shows?offset=0&limit=50";
const EPISODES_ENDPOINT = "https://api.spotify.com/v1/shows/id/episodes";

const getAccessToken = async (refresh_token) => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  return response.json();
};

const getShows = async (access_token) => {
  const response = await fetch(SHOWS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return response.json();
};

export const getEpisodes = async (refreshToken) => {
  const { access_token } = await getAccessToken(refreshToken);
  const { items } = await getShows(access_token);

  const showsIds = items.map((item) => item.show.id);
  const promises = showsIds.map(async (id) => {
    const response = await fetch(EPISODES_ENDPOINT.replace("id", id), {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.json();
  });
  return await Promise.all(promises);
};

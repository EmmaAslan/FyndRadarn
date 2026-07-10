export const getWatchlists = async () => {
  const response = await fetch("http://localhost:3000/watchlists");
  return response.json();
};

export const createWatchlist = async (watchlistData) => {
  const response = await fetch("http://localhost:3000/watchlists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(watchlistData),
  });
  return response.json();
};

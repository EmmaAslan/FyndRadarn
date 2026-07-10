export const getWatchlists = async () => {
  const response = await fetch("http://localhost:3000/watchlists");
  return response.json();
};

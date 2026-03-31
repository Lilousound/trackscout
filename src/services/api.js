export const searchTracks = async (query) => {
  const queryCleaned = encodeURIComponent(query); // Clean the query to make it URL-safe
  const response = await fetch(`https://api.deezer.com/search?q=${queryCleaned}`);
  const data = await response.json();
  return data.data;
};

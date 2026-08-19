export const getWatchlists = async (email) => {
  try {
    const response = await fetch(`http://localhost:3000/watchlists?email=${encodeURIComponent(email)}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    if (error.message === "Failed to fetch") {
      error.message = "The server is currently unavailable. Please try again later.";
    }

    throw error;
  }
};

export const getPriceHistory = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/watchlists/${id}/history`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    if (error.message === "Failed to fetch") {
      error.message = "The server is currently unavailable. Please try again later.";
    }

    throw error;
  }
}

export const previewWatchlist = async (watchlistData) => {
  try {
    const response = await fetch("http://localhost:3000/watchlists/preview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(watchlistData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    if (error.message === "Failed to fetch") {
      error.message = "The server is currently unavailable. Please try again later.";
    }

    throw error;
  }
};

export const createWatchlist = async (watchlistData) => {
  try {
    const response = await fetch("http://localhost:3000/watchlists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(watchlistData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    if (error.message === "Failed to fetch") {
      error.message = "The server is currently unavailable. Please try again later.";
    }

    throw error;
  }
};

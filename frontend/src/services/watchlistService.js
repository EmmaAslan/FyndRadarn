import { supabase } from "../config/supabaseClient";

const getAuthHeaders = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session?.access_token}`,
  };
};

export const getWatchlists = async () => {
  try {
    const response = await fetch(`http://localhost:3000/watchlists`, {
      headers: await getAuthHeaders(),
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

export const getPriceHistory = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/watchlists/${id}/history`, { headers: await getAuthHeaders() });
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

export const previewWatchlist = async (watchlistData) => {
  try {
    const response = await fetch("http://localhost:3000/watchlists/preview", {
      method: "POST",
      headers: await getAuthHeaders(),
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

export const deleteWatchlist = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/watchlists/${id}`, {
      method: "DELETE",
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      console.log("Delete response status:", response.status);
      throw new Error("Failed to delete watchlist");
    }

    return response.json();
  } catch (error) {
    if (error.message === "Failed to fetch") {
      error.message = "The server is currently unavailable. Please try again later.";
    }

    throw error;
  }
};

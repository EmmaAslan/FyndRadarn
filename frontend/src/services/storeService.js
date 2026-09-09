export const getStores = async () => {
  try {
    const response = await fetch(`http://localhost:3000/stores`);
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

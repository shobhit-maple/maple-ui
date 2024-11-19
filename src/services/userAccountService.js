const API_BASE_URL = process.env.REACT_APP_API_BASE_URL + "/api/organization/";

export const getUserAccount = async (request) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request), // Send login credentials
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to log in.");
    }

    return await response.json(); // Return the response data if successful
  } catch (error) {
    throw new Error("An error occurred. Please try again.");
  }
};

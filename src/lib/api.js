export const API_BASE_URL = "https://0275-103-136-59-134.ngrok-free.app";

export const fetchApi = async (endpoint, options = {}) => {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    credentials: "include",
  };

  const finalOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, finalOptions);
    const data = await response.json();
    return { response, data };
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};

import axios from "axios";

const API_URL = "http://localhost:5000/api/memberships";

export const getMemberships = async () => {
  try {
    const response = await axios.get(API_URL);

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Network Error",
      }
    );
  }
};

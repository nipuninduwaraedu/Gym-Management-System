import api from "./api";

export const getMemberships = async () => {
  try {
    const response = await api.get("/memberships");

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Network Error",
      }
    );
  }
};

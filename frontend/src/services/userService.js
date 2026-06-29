import api from "./api";

export const getUserProfile = async (token) => {
  try {
    const response = await api.get("/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error" };
  }
};

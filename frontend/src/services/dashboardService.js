import api from "./api";

export const getUserDashboard = async (token) => {
  try {
    const response = await api.get("/bookings/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error" };
  }
};

export const getAdminDashboard = async (token) => {
  try {
    const response = await api.get("/bookings/admin/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error" };
  }
};

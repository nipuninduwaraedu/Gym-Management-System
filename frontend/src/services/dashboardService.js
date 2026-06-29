import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getUserDashboard = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/bookings/my`, {
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
    const response = await axios.get(`${API_URL}/bookings/admin/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error" };
  }
};

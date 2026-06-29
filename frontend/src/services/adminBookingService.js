import axios from "axios";

const API_URL = "http://localhost:5000/api/bookings";

export const getAllBookings = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/admin/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error" };
  }
};

export const updateBookingStatus = async (id, status, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/admin/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error" };
  }
};

export const deleteBookingAdmin = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/admin/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error" };
  }
};

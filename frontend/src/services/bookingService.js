import api from "./api";

export const createBooking = async (data, token) => {
  try {
    const response = await api.post("/bookings", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error" };
  }
};

export const getMyBookings = async (token) => {
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

export const deleteBooking = async (id, token) => {
  try {
    const response = await api.delete(`/bookings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error" };
  }
};

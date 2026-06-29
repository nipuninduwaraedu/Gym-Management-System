import api from "./api";

export const getAllBookings = async (token) => {
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

export const updateBookingStatus = async (id, status, token) => {
  try {
    const response = await api.put(
      `/bookings/admin/${id}`,
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
    const response = await api.delete(`/bookings/admin/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error" };
  }
};

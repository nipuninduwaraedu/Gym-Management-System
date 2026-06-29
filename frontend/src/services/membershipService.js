import api from "./api";

export const getMemberships = async () => {
  try {
    const response = await api.get("/memberships");

    return response.data;
  } catch (error) {
    throw error.response?.data || {
      message: "Network Error",
    };
  }
};

export const createMembership = async (data, token) => {
  try {
    const response = await api.post("/memberships", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network Error" };
  }
};

export const updateMembership = async (id, data, token) => {
  try {
    const response = await api.put(`/memberships/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network Error" };
  }
};

export const deleteMembership = async (id, token) => {
  try {
    const response = await api.delete(`/memberships/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network Error" };
  }
};

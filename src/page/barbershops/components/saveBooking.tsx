import { api } from "../../../../config/ConfigAxios";

export const saveBooking = async (bookingData) => {
    try {
      const response = await api.post('/api/agendamento', bookingData);
      return response.data;
    } catch (error) {
      console.error('Error saving booking:', error);
      throw error;
    }
  };
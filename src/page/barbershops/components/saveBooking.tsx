import { api } from "../../../../config/ConfigAxios";

interface Booking {
  id: string;
  date: Date;
  // Adicione outras propriedades relevantes aqui
}
interface BookingData {
  barbershopId: string;
  date: string; // "yyyy-MM-dd"
  hora: string; // "HH:mm"
  clienteId: string;
  // outras propriedades que podem existir em BookingData
}

export const saveBooking = async (bookingData: BookingData) => {
    try {
      const response = await api.post('/agendamento', bookingData);
      return response.data;
    } catch (error) {
      console.error('Error saving booking:', error);
      throw error;
    }
  };
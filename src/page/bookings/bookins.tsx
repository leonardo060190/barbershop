import BookingItem from "../../components/bookingItem/bookingItem";
import Header from "../../components/header/header";
import { isFuture, isPast } from "date-fns";

const bookings = () => {


  const confirmedBookings = bookings.filter(booking => isFuture(booking.date))
  const finishedBookings = bookings.filter(booking => isPast(booking.date))

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">
          Cofirmados
        </h2>
        <div className="flex flex-col gap-3">
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>

        <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">
          Finalizados
        </h2>
        <div className="flex flex-col gap-3">
          {finishedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </>
  );
};

export default bookings;

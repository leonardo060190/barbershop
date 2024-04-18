import { endOfDay, startOfDay } from "date-fns";

export const getDayBookings = async (barbershopId: string, date:Date) =>{
    const bookings = await db.bookings.finMany({
        where:{
            barbershopId,
            date:{
                lte: endOfDay(date),
                gte: startOfDay(date),
            },
        },
    })

    return bookings;
};
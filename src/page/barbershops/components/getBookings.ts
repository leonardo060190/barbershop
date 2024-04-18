import { endOfDay, startOfDay } from "date-fns";

export const getDayBookings = async (date:Date) =>{
    const bookings = await db.bookings.finMany({
        where:{
            date:{
                lte: endOfDay(date),
                gte: startOfDay(date),
            },
        },
    })

    return bookings;
};
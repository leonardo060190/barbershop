import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
// import { isFuture, isPast } from "date-fns";
// import bookings from "@/page/bookings/bookins";
// import bookings from "@/page/bookings/bookins";

const bookingItem = () => {

  // const isBookingConfirmed = isFuture(booking.date);

  return (
    <Card>
      <CardContent className="p-0 flex py-0">
        <div className="flex flex-col gap-2 py-5 flex-[3] pl-5">
          <div className=" flex items-center">
            <Badge
              // variant={isBookingConfirmed ? "default" : "secondary"}
              className=" justify-center"
            >
              {/* {isBookingConfirmed ? "Confirmado" : "Finalizado"} */}
            </Badge>
          </div>

          <h2 className="font-bold">Corte de cabelo</h2>

          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="LD"
                width={30}
                className="rounded-full"
              />
              <AvatarFallback>LD</AvatarFallback>
            </Avatar>

            <h3 className="text-sm">Vintage Barbar</h3>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center border-l flex-1 border-solid border-secondary">
          <p className="text-sm">janeiro</p>
          <p className="text-2xl">06</p>
          <p className="text-sm">09:23</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default bookingItem;

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

const bookingItem = () => {
  return (
    <Card>
      <CardContent className="p-5 flex justify-between py-0">
        <div className="flex flex-col gap-2 py-5">
          <Badge className=" bg-[#221c3d] text-primary hover:bg-[#221c3d] justify-center">
            Confirmado
          </Badge>
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

        <div className="flex flex-col items-center justify-center border-l px-3 border-solid border-secondary">
          <p className="text-sm">janeiro</p>
          <p className="text-2xl">06</p>
          <p className="text-sm">09:23</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default bookingItem;

import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const header = () => {
  return (
    <Card>
      <CardContent>
        <img src="/Logo.png" alt="FSW Barber" width={130} height={22} />
        <Button variant="outline" size="icon">
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  );
};

export default header;

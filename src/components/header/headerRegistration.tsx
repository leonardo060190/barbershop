import { Card, CardContent } from "../ui/card";

import { Link } from "react-router-dom";

const headerRegistration = () => {
  return (
    <Card className="rounded-none border-none shadow-xl">
      <CardContent className="p-9 py-8 justify-between items-center flex flex-row">
        <Link to={"/"}>
          <img src="/Logo.png" alt="FSW Barber" width={130} height={22} />
        </Link>
      </CardContent>
    </Card>
  );
};

export default headerRegistration;

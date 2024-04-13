"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const search = () => {
  return (
    <div className="flex items-center gap-2">
      <Input
        className="outline-0"
        type="text"
        placeholder="Buscar Barbearias"
      />
      <Button variant="default">
        <Search />
      </Button>
    </div>
  );
};

export default search;

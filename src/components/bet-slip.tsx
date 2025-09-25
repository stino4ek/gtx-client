import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart } from "lucide-react";

export function BetSlip() {
  const betCount = 0;
  const inPlayCount = 0;

  return (
    <div className="fixed bottom-3 md:bottom-4 right-3 md:right-4 left-3 md:left-auto z-50">
      <Card className="p-3 md:p-4 bg-primary text-primary-foreground shadow-lg">
        <div className="flex items-center justify-between md:min-w-[200px]">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
            <span className="font-medium text-sm md:text-base">Купон</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {betCount > 0 && (
              <Badge variant="secondary" className="bg-white text-primary text-xs">
                {betCount}
              </Badge>
            )}
            {inPlayCount > 0 && (
              <Badge variant="secondary" className="bg-warning text-warning-foreground text-xs">
                В игре: {inPlayCount}
              </Badge>
            )}
          </div>
        </div>
        
        {betCount === 0 && inPlayCount === 0 && (
          <div className="text-center text-xs md:text-sm opacity-75 mt-2">
            Выберите события для ставок
          </div>
        )}
      </Card>
    </div>
  );
}
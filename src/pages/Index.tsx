import { useState } from "react";
import { Header } from "@/components/header";
import { SportsSidebar } from "@/components/sports-sidebar";
import { BettingInterface } from "@/components/betting-interface";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [selectedSport, setSelectedSport] = useState<string>("");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex flex-col lg:flex-row">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <SportsSidebar 
            selectedSport={selectedSport}
            onSportSelect={setSelectedSport}
          />
        </div>
        
        {/* Mobile Sports Menu - horizontal scroll */}
        <div className="lg:hidden border-b bg-background sticky top-14 z-40">
          <div className="flex overflow-x-auto p-2 space-x-2 scrollbar-hide">
            {["Футбол", "Теннис", "Баскетбол", "Хоккей", "Киберспорт", "Live"].map((sport) => (
              <Button 
                key={sport}
                variant={selectedSport === sport ? "default" : "outline"} 
                size="sm" 
                className="whitespace-nowrap"
                onClick={() => setSelectedSport(sport)}
              >
                {sport}
              </Button>
            ))}
          </div>
        </div>
        
        <BettingInterface />
      </div>
    </div>
  );
};

export default Index;

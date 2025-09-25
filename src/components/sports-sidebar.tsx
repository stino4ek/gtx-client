import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Sport {
  id: string;
  name: string;
  count: number;
  icon?: string;
}

import { 
  Trophy, 
  Circle, 
  Target, 
  Zap, 
  Gamepad2, 
  Gamepad, 
  Monitor, 
  Tv,
  Disc,
  Activity,
  CirclePlay,
  Shield,
  Waves,
  Medal,
  Hexagon,
  Mountain,
  Home,
  Users,
  Hand
} from "lucide-react";

const sports: Sport[] = [
  { id: "football", name: "Футбол", count: 504, icon: "Trophy" },
  { id: "tennis", name: "Теннис", count: 23, icon: "Circle" },
  { id: "basketball", name: "Баскетбол", count: 22, icon: "Target" },
  { id: "hockey", name: "Хоккей", count: 10, icon: "Zap" },
  { id: "cybersport", name: "Киберспорт", count: 18, icon: "Gamepad2" },
  { id: "cyber-fifa", name: "Кибер FIFA", count: 7, icon: "Gamepad" },
  { id: "cyber-nba", name: "Кибер NBA", count: 3, icon: "Monitor" },
  { id: "cyber-nhl", name: "Кибер NHL", count: 4, icon: "Tv" },
  { id: "table-tennis", name: "Настольный теннис", count: 18, icon: "Disc" },
  { id: "volleyball", name: "Волейбол", count: 11, icon: "Activity" },
  { id: "darts", name: "Дартс", count: 11, icon: "CirclePlay" },
  { id: "mma", name: "ММА", count: 0, icon: "Shield" },
  { id: "beach-football", name: "Пляжный футбол", count: 0, icon: "Waves" },
  { id: "american-football", name: "Ам.футбол", count: 11, icon: "Medal" },
  { id: "basketball-3x3", name: "Баскетбол 3x3", count: 1, icon: "Hexagon" },
  { id: "badminton", name: "Бадминтон", count: 1, icon: "Mountain" },
  { id: "baseball", name: "Бейсбол", count: 0, icon: "Home" },
  { id: "boxing", name: "Бокс", count: 0, icon: "Users" },
  { id: "handball", name: "Гандбол", count: 12, icon: "Hand" },
];

const getIcon = (iconName: string) => {
  const icons = {
    Trophy, Circle, Target, Zap, Gamepad2, Gamepad, Monitor, Tv,
    Disc, Activity, CirclePlay, Shield, Waves, Medal, Hexagon, Mountain, Home, Users, Hand
  };
  return icons[iconName as keyof typeof icons] || Trophy;
};

interface SportsSidebarProps {
  selectedSport?: string;
  onSportSelect: (sportId: string) => void;
}

export function SportsSidebar({ selectedSport, onSportSelect }: SportsSidebarProps) {
  return (
    <div className="w-64 xl:w-72 bg-sidebar border-r border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-2 mb-4">
          <Button 
            variant={!selectedSport ? "default" : "ghost"} 
            size="sm" 
            className="flex-1 justify-start"
            onClick={() => onSportSelect("")}
          >
            <Star className="h-4 w-4 mr-2" />
            Избранное
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex-1 justify-start text-muted-foreground"
          >
            <Clock className="h-4 w-4 mr-2" />
            Ближайшие
          </Button>
        </div>
      </div>
      
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-2 space-y-1">
          {sports.map((sport) => (
            <Button
              key={sport.id}
              variant={selectedSport === sport.id ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-between font-normal"
              onClick={() => onSportSelect(sport.id)}
            >
              <span className="flex items-center">
                {sport.icon && (() => {
                  const IconComponent = getIcon(sport.icon);
                  return <IconComponent className="h-4 w-4 mr-2" />;
                })()}
                <span className="truncate">{sport.name}</span>
              </span>
              {sport.count > 0 && (
                <Badge 
                  variant="secondary" 
                  className="ml-2 min-w-[20px] h-5 text-xs bg-primary text-primary-foreground"
                >
                  {sport.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
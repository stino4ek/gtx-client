import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, TrendingUp, Clock, Star, Gamepad2, Target, Trophy, Building2, Zap } from "lucide-react";
import { useState } from "react";
import { BetModal } from "./bet-modal";

interface Match {
  id: string;
  team1: string;
  team2: string;
  sport: string;
  tournament: string;
  time: string;
  isLive: boolean;
  score?: string;
  odds: {
    win1: number;
    draw?: number;
    win2: number;
  };
  minute?: number;
}

const mockMatches: Match[] = [
  {
    id: "1",
    team1: "Динамо М",
    team2: "Спартак М",
    sport: "Футбол",
    tournament: "РПЛ",
    time: "19:00",
    isLive: true,
    score: "2:1",
    minute: 67,
    odds: { win1: 1.85, draw: 3.40, win2: 4.20 }
  },
  {
    id: "2", 
    team1: "Локомотив М",
    team2: "ЦСКА М",
    sport: "Футбол",
    tournament: "РПЛ",
    time: "21:30",
    isLive: false,
    odds: { win1: 2.10, draw: 3.20, win2: 3.80 }
  },
  {
    id: "3",
    team1: "Зенит",
    team2: "Краснодар",
    sport: "Футбол", 
    tournament: "РПЛ",
    time: "16:00",
    isLive: true,
    score: "0:0",
    minute: 23,
    odds: { win1: 1.45, draw: 4.10, win2: 6.50 }
  }
];

export function BettingInterface() {
  const [selectedBet, setSelectedBet] = useState<{
    matchId: string;
    team: string;
    odds: number;
    type: string;
  } | null>(null);

  const handleBetClick = (matchId: string, team: string, odds: number, type: string) => {
    setSelectedBet({ matchId, team, odds, type });
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row">
      {/* Main Content */}
      <div className="flex-1 p-3 md:p-6">
        {/* Hero Banner */}
        <Card className="mb-4 md:mb-6 p-4 md:p-6 bg-gradient-betting text-white overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-xl md:text-3xl font-bold mb-1 md:mb-2">ПОБЕЖДАЙ В ГОНКАХ СТАВОК</h2>
            <p className="text-sm md:text-lg opacity-90">BET RACE</p>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/3 opacity-20">
            <div className="h-full bg-gradient-to-l from-white/20 to-transparent"></div>
          </div>
        </Card>

        {/* Quick Sports */}
        <div className="mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
            {[
              { name: "ТОП Футбол", Icon: Trophy },
              { name: "The International 2025", Icon: Gamepad2 },
              { name: "Dota 2 Playground", Icon: Target },
              { name: "UFC Fight Night", Icon: Zap },
              { name: "Кубок Англии", Icon: Trophy },
              { name: "Первая Лига", Icon: Building2 }
            ].map((sport, index) => (
              <Card key={index} className="p-2 md:p-4 text-center cursor-pointer hover:shadow-md transition-shadow animate-fade-in">
                <sport.Icon className="h-6 w-6 md:h-8 md:w-8 mb-1 md:mb-2 mx-auto text-primary" />
                <div className="text-xs md:text-sm font-medium line-clamp-2">{sport.name}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Events */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Главные события</h3>
            <Button variant="outline" size="sm">
              Показать все
            </Button>
          </div>

          {mockMatches.map((match) => (
            <Card key={match.id} className="p-3 md:p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {match.tournament}
                    </Badge>
                    {match.isLive && (
                      <Badge className="bg-live-indicator text-white text-xs">
                        <Play className="h-3 w-3 mr-1" />
                        LIVE
                      </Badge>
                    )}
                    <span className="text-sm text-muted-foreground">
                      {match.isLive ? `${match.minute}'` : match.time}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                      <div className="text-sm md:text-lg font-medium">{match.team1}</div>
                      {match.isLive && match.score && (
                        <div className="font-bold text-lg md:text-xl my-1 md:my-0">{match.score}</div>
                      )}
                      <div className="text-sm md:text-lg font-medium">{match.team2}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1 md:space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="min-w-[50px] md:min-w-[60px] hover:bg-odds-hover"
                    onClick={() => handleBetClick(match.id, match.team1, match.odds.win1, "П1")}
                  >
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">1</div>
                      <div className="font-bold text-xs md:text-sm">{match.odds.win1}</div>
                    </div>
                  </Button>
                  
                  {match.odds.draw && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="min-w-[50px] md:min-w-[60px] hover:bg-odds-hover"
                      onClick={() => handleBetClick(match.id, "Ничья", match.odds.draw, "X")}
                    >
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">X</div>
                        <div className="font-bold text-xs md:text-sm">{match.odds.draw}</div>
                      </div>
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="min-w-[50px] md:min-w-[60px] hover:bg-odds-hover"
                    onClick={() => handleBetClick(match.id, match.team2, match.odds.win2, "П2")}
                  >
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">2</div>
                      <div className="font-bold text-xs md:text-sm">{match.odds.win2}</div>
                    </div>
                  </Button>
                  
                  <Button variant="ghost" size="icon" className="h-8 w-8 md:h-10 md:w-10">
                    <Star className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Live Events Sidebar - Hidden on mobile */}
      <div className="hidden lg:block w-72 xl:w-80 border-l bg-card">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Live сейчас</h3>
        </div>
        
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="p-4 space-y-4">
            {mockMatches.filter(m => m.isLive).map((match) => (
              <Card key={match.id} className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-live-indicator text-white text-xs">
                      <Play className="h-3 w-3 mr-1" />
                      LIVE
                    </Badge>
                    <span className="text-xs text-muted-foreground">{match.minute}'</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Star className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{match.team1}</span>
                    <span className="font-bold">{match.score?.split(':')[0] || '0'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{match.team2}</span>
                    <span className="font-bold">{match.score?.split(':')[1] || '0'}</span>
                  </div>
                </div>
                
                <div className="flex justify-between mt-3 space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs hover:bg-odds-hover"
                    onClick={() => handleBetClick(match.id, match.team1, match.odds.win1, "П1")}
                  >
                    {match.odds.win1}
                  </Button>
                  {match.odds.draw && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs hover:bg-odds-hover"
                      onClick={() => handleBetClick(match.id, "Ничья", match.odds.draw, "X")}
                    >
                      {match.odds.draw}
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs hover:bg-odds-hover"
                    onClick={() => handleBetClick(match.id, match.team2, match.odds.win2, "П2")}
                  >
                    {match.odds.win2}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      <BetModal 
        bet={selectedBet}
        onClose={() => setSelectedBet(null)}
      />
    </div>
  );
}
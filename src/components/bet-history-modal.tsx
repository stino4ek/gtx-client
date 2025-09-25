import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Clock, TrendingUp, Trophy, AlertCircle, CheckCircle } from "lucide-react";

interface BetHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BetHistoryModal({ open, onOpenChange }: BetHistoryModalProps) {
  const bets = [
    {
      id: 1,
      match: "Манчестер Юнайтед - Арсенал",
      bet: "Победа П1",
      odds: 2.15,
      amount: 1000,
      status: "won",
      payout: 2150,
      date: "2024-01-21 18:45",
      league: "Английская Премьер-лига"
    },
    {
      id: 2,
      match: "Барселона - Реал Мадрид",
      bet: "Тотал больше 2.5",
      odds: 1.85,
      amount: 500,
      status: "lost",
      payout: 0,
      date: "2024-01-20 21:30",
      league: "Ла Лига"
    },
    {
      id: 3,
      match: "Зенит - Спартак",
      bet: "Ничья",
      odds: 3.20,
      amount: 750,
      status: "active",
      payout: 2400,
      date: "2024-01-22 19:00",
      league: "РПЛ"
    },
    {
      id: 4,
      match: "Интер - Милан",
      bet: "Фора 1 (-1)",
      odds: 2.45,
      amount: 300,
      status: "won",
      payout: 735,
      date: "2024-01-19 20:15",
      league: "Серия А"
    },
    {
      id: 5,
      match: "ПСЖ - Лион",
      bet: "Обе забьют",
      odds: 1.65,
      amount: 800,
      status: "lost",
      payout: 0,
      date: "2024-01-18 22:00",
      league: "Лига 1"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "won":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "lost":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "active":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "won":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Выигрыш</Badge>;
      case "lost":
        return <Badge variant="destructive">Проигрыш</Badge>;
      case "active":
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">В игре</Badge>;
      default:
        return null;
    }
  };

  const activeBets = bets.filter(bet => bet.status === "active");
  const completedBets = bets.filter(bet => bet.status !== "active");

  const totalWon = bets.filter(bet => bet.status === "won").reduce((sum, bet) => sum + bet.payout, 0);
  const totalLost = bets.filter(bet => bet.status === "lost").reduce((sum, bet) => sum + bet.amount, 0);
  const profit = totalWon - totalLost;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] animate-scale-in data-[state=closed]:animate-scale-out transition-all duration-300 ease-out">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            История ставок
          </DialogTitle>
        </DialogHeader>
        
        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 border rounded-lg">
            <Trophy className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
            <div className="text-lg font-bold text-green-500">+{totalWon.toLocaleString()} ₽</div>
            <div className="text-xs text-muted-foreground">Всего выиграно</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <div className={`text-lg font-bold ${profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {profit >= 0 ? '+' : ''}{profit.toLocaleString()} ₽
            </div>
            <div className="text-xs text-muted-foreground">Прибыль</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <Calendar className="h-6 w-6 mx-auto mb-2 text-purple-500" />
            <div className="text-lg font-bold">{bets.length}</div>
            <div className="text-xs text-muted-foreground">Всего ставок</div>
          </div>
        </div>
        
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active" className="transition-all duration-200">
              Активные ({activeBets.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="transition-all duration-200">
              Завершенные ({completedBets.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="animate-fade-in">
            <ScrollArea className="h-[400px]">
              <div className="space-y-3">
                {activeBets.length > 0 ? activeBets.map((bet) => (
                  <div key={bet.id} className="border rounded-lg p-4 animate-fade-in hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(bet.status)}
                        <div className="font-medium">{bet.match}</div>
                      </div>
                      {getStatusBadge(bet.status)}
                    </div>
                    <div className="text-sm text-muted-foreground mb-1">{bet.league}</div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {bet.bet} • Коэф. {bet.odds} • Ставка: {bet.amount.toLocaleString()} ₽
                      {bet.status === "active" && ` • Возможный выигрыш: ${bet.payout.toLocaleString()} ₽`}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {bet.date}
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Нет активных ставок</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="completed" className="animate-fade-in">
            <ScrollArea className="h-[400px]">
              <div className="space-y-3">
                {completedBets.map((bet) => (
                  <div key={bet.id} className="border rounded-lg p-4 animate-fade-in hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(bet.status)}
                        <div className="font-medium">{bet.match}</div>
                      </div>
                      {getStatusBadge(bet.status)}
                    </div>
                    <div className="text-sm text-muted-foreground mb-1">{bet.league}</div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {bet.bet} • Коэф. {bet.odds} • Ставка: {bet.amount.toLocaleString()} ₽
                      {bet.status === "won" && ` • Выигрыш: ${bet.payout.toLocaleString()} ₽`}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-muted-foreground">
                        {bet.date}
                      </div>
                      {bet.status === "won" && (
                        <div className="text-sm font-bold text-green-500">
                          +{(bet.payout - bet.amount).toLocaleString()} ₽
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
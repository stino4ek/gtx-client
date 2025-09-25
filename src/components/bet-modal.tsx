import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Calculator, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BetModalProps {
  bet: {
    matchId: string;
    team: string;
    odds: number;
    type: string;
  } | null;
  onClose: () => void;
}

export function BetModal({ bet, onClose }: BetModalProps) {
  const [amount, setAmount] = useState<string>("");
  const [betType, setBetType] = useState<"single" | "express">("single");
  const { toast } = useToast();

  if (!bet) return null;

  const potentialWin = amount ? (parseFloat(amount) * bet.odds).toFixed(2) : '0.00';

  const handlePlaceBet = () => {
    // Mock bet placement
    console.log("Placing bet:", { bet, amount, betType });
    toast({
      title: "Ставка принята!",
      description: `Ставка на ${amount} ₽ успешно размещена`,
    });
    onClose();
    setAmount("");
  };

  const quickAmounts = [100, 500, 1000, 5000];

  return (
    <Dialog 
      open={!!bet} 
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-[500px] animate-scale-in data-[state=closed]:animate-scale-out transition-all duration-300 ease-out">
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-xl">Купон ставок</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 animate-fade-in">
          {/* Bet Type Selector */}
          <div className="flex space-x-2 animate-fade-in">
            <Button
              variant={betType === "single" ? "default" : "outline"}
              size="sm"
              className="flex-1 transition-all duration-200 hover:scale-105"
              onClick={() => setBetType("single")}
            >
              Одиночная
            </Button>
            <Button
              variant={betType === "express" ? "default" : "outline"}
              size="sm"
              className="flex-1 transition-all duration-200 hover:scale-105"
              onClick={() => setBetType("express")}
            >
              Экспресс
            </Button>
          </div>

          {/* Bet Details */}
          <div className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  {bet.type}
                </Badge>
                <span className="font-medium">{bet.team}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Коэффициент</span>
              <span className="font-bold text-lg">{bet.odds}</span>
            </div>
          </div>

          {/* Bet Amount */}
          <div className="space-y-3">
            <Label htmlFor="bet-amount">Сумма ставки</Label>
            <Input
              id="bet-amount"
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="10"
              max="100000"
            />
            
          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {quickAmounts.map((quickAmount) => (
              <Button
                key={quickAmount}
                variant="outline"
                size="sm"
                className="transition-all duration-200 hover:scale-105 hover:bg-primary/10"
                onClick={() => setAmount(quickAmount.toString())}
              >
                {quickAmount} ₽
              </Button>
            ))}
          </div>
          </div>

          {/* Potential Win */}
          <div className="border rounded-lg p-4 bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calculator className="h-4 w-4" />
                <span className="font-medium">Потенциальный выигрыш</span>
              </div>
              <span className="font-bold text-xl text-success">{potentialWin} ₽</span>
            </div>
            {amount && (
              <div className="text-sm text-muted-foreground mt-2">
                Ставка: {amount} ₽ × Коэф: {bet.odds} = {potentialWin} ₽
              </div>
            )}
          </div>

          {/* Account Balance */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Баланс счета:</span>
            <span className="font-medium">15,750 ₽</span>
          </div>

          {/* Place Bet Button */}
          <Button 
            className="w-full transition-all duration-200 hover:scale-105" 
            onClick={handlePlaceBet}
            disabled={!amount || parseFloat(amount) < 10}
          >
            Сделать ставку {amount && `на ${amount} ₽`}
          </Button>

          {/* Terms */}
          <div className="text-xs text-muted-foreground text-center">
            Минимальная ставка: 10 ₽ • Максимальная ставка: 100,000 ₽
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
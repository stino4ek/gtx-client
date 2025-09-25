import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle } from "lucide-react";

interface TransactionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TransactionsModal({ open, onOpenChange }: TransactionsModalProps) {
  const transactions = [
    {
      id: 1,
      type: "deposit",
      amount: 5000,
      status: "completed",
      date: "2024-01-15 14:30",
      method: "Visa **** 1234"
    },
    {
      id: 2,
      type: "bet",
      amount: -500,
      status: "completed",
      date: "2024-01-15 12:15",
      method: "Ставка на Футбол"
    },
    {
      id: 3,
      type: "withdrawal",
      amount: -2000,
      status: "pending",
      date: "2024-01-14 18:45",
      method: "Сбербанк"
    },
    {
      id: 4,
      type: "win",
      amount: 1200,
      status: "completed",
      date: "2024-01-14 16:20",
      method: "Выигрыш по ставке"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deposit":
      case "win":
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
      case "withdrawal":
      case "bet":
        return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Завершено";
      case "pending":
        return "В обработке";
      case "failed":
        return "Отклонено";
      default:
        return status;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case "deposit":
        return "Пополнение";
      case "withdrawal":
        return "Вывод";
      case "bet":
        return "Ставка";
      case "win":
        return "Выигрыш";
      default:
        return type;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] animate-scale-in data-[state=closed]:animate-scale-out transition-all duration-300 ease-out">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            История операций
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="text-xs">Все</TabsTrigger>
            <TabsTrigger value="deposits" className="text-xs">Пополнения</TabsTrigger>
            <TabsTrigger value="bets" className="text-xs">Ставки</TabsTrigger>
            <TabsTrigger value="withdrawals" className="text-xs">Выводы</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4 mt-6">
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="border rounded-lg p-4 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(transaction.type)}
                      <div>
                        <div className="font-medium">{getTypeText(transaction.type)}</div>
                        <div className="text-sm text-muted-foreground">{transaction.method}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()} ₽
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        {getStatusIcon(transaction.status)}
                        <span>{getStatusText(transaction.status)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    {transaction.date}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
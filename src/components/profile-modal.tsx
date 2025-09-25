import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Wallet, Settings, History, LogOut, Edit, CreditCard, ArrowUpRight, TrendingUp, Calendar } from "lucide-react";
import { DepositModal } from "./deposit-modal";
import { WithdrawalModal } from "./withdrawal-modal";
import { TransactionsModal } from "./transactions-modal";
import { useState } from "react";

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileModal({ open, onOpenChange }: ProfileModalProps) {
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false);
  const [transactionsModalOpen, setTransactionsModalOpen] = useState(false);
  
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-[95vw] sm:max-w-[600px] md:max-w-4xl max-h-[80vh] overflow-y-auto animate-scale-in data-[state=closed]:animate-scale-out transition-all duration-300 ease-out">
          <DialogHeader>
          <DialogTitle className="text-center text-lg md:text-xl font-bold">
            Личный кабинет
          </DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="wallet" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="wallet" className="text-xs transition-all duration-200">
                <Wallet className="h-4 w-4 mr-1" />
                Баланс
              </TabsTrigger>
              <TabsTrigger value="profile" className="text-xs transition-all duration-200">
                <User className="h-4 w-4 mr-1" />
                Профиль
              </TabsTrigger>
              <TabsTrigger value="history" className="text-xs transition-all duration-200">
                <History className="h-4 w-4 mr-1" />
                История
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-xs transition-all duration-200">
                <Settings className="h-4 w-4 mr-1" />
                Настройки
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="wallet" className="space-y-4 mt-6 animate-fade-in">
              <div className="space-y-4">
                <div className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
                  <div className="text-3xl font-bold">15,750 ₽</div>
                  <div className="text-muted-foreground">Основной баланс</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setDepositModalOpen(true)}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Пополнить
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setWithdrawalModalOpen(true)}
                  >
                    <ArrowUpRight className="h-4 w-4 mr-2" />
                    Вывести
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-500" />
                    <div className="text-lg font-bold text-green-500">+2,350 ₽</div>
                    <div className="text-xs text-muted-foreground">За 30 дней</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Wallet className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                    <div className="text-lg font-bold">12</div>
                    <div className="text-xs text-muted-foreground">Активных ставок</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Calendar className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                    <div className="text-lg font-bold">47</div>
                    <div className="text-xs text-muted-foreground">Дней с нами</div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setTransactionsModalOpen(true)}
                >
                  <History className="h-4 w-4 mr-2" />
                  История операций
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="profile" className="space-y-4 animate-fade-in">
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 border rounded-lg">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="text-lg font-bold">ИИ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">Иван Иванов</h3>
                    <p className="text-sm text-muted-foreground">ivan@example.com</p>
                    <p className="text-sm text-muted-foreground">+7 900 123-45-67</p>
                    <Badge variant="outline" className="mt-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Верифицирован
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Имя</Label>
                      <Input id="firstName" defaultValue="Иван" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Фамилия</Label>
                      <Input id="lastName" defaultValue="Иванов" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="ivan@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" type="tel" defaultValue="+7 900 123-45-67" />
                  </div>
                  
                  <Button className="w-full">
                    <Edit className="h-4 w-4 mr-2" />
                    Сохранить изменения
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="space-y-4 animate-fade-in">
              <div className="space-y-4">
                <h3 className="font-semibold">История ставок</h3>
                <div className="space-y-2">
                  <div className="p-3 border rounded">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium">Манчестер Юнайтед - Арсенал</div>
                      <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Выигрыш</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Победа П1 • Коэф. 2.15 • Ставка: 1,000 ₽ • Выигрыш: 2,150 ₽
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      21.09.2025, 18:45
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium">Барселона - Реал Мадрид</div>
                      <Badge variant="destructive">Проигрыш</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Тотал больше 2.5 • Коэф. 1.85 • Ставка: 500 ₽
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      20.09.2025, 21:30
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium">Зенит - Спартак</div>
                      <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">В игре</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Ничья • Коэф. 3.20 • Ставка: 750 ₽
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      22.09.2025, 19:00
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4 animate-fade-in">
              <div className="space-y-4">
                <h3 className="font-semibold">Настройки аккаунта</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <div className="font-medium">Двухфакторная аутентификация</div>
                      <div className="text-sm text-muted-foreground">Дополнительная защита аккаунта</div>
                    </div>
                    <Button variant="outline" size="sm">Включить</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <div className="font-medium">Email уведомления</div>
                      <div className="text-sm text-muted-foreground">Получать уведомления на email</div>
                    </div>
                    <Button variant="outline" size="sm">Настроить</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <div className="font-medium">SMS уведомления</div>
                      <div className="text-sm text-muted-foreground">Получать SMS уведомления</div>
                    </div>
                    <Button variant="outline" size="sm">Настроить</Button>
                  </div>
                  
                  <Separator />
                  
                  <Button variant="destructive" className="w-full">
                    <LogOut className="h-4 w-4 mr-2" />
                    Выйти из аккаунта
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      
      <DepositModal 
        open={depositModalOpen} 
        onOpenChange={setDepositModalOpen} 
      />
      <WithdrawalModal 
        open={withdrawalModalOpen} 
        onOpenChange={setWithdrawalModalOpen} 
      />
      <TransactionsModal 
        open={transactionsModalOpen} 
        onOpenChange={setTransactionsModalOpen} 
      />
    </>
  );
}
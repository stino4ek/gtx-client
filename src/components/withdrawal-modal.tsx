import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Building, Wallet, ArrowUpRight } from "lucide-react";

interface WithdrawalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WithdrawalModal({ open, onOpenChange }: WithdrawalModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] animate-scale-in data-[state=closed]:animate-scale-out transition-all duration-300 ease-out">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Вывод средств
          </DialogTitle>
        </DialogHeader>
        
        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Доступно для вывода:</span>
            <span className="font-bold text-lg">15,750 ₽</span>
          </div>
        </div>
        
        <Tabs defaultValue="cards" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cards" className="text-sm">
              <CreditCard className="h-4 w-4 mr-2" />
              Банковские карты
            </TabsTrigger>
            <TabsTrigger value="banks" className="text-sm">
              <Building className="h-4 w-4 mr-2" />
              Банковские счета
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="cards" className="space-y-4 mt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" className="p-4 h-auto flex flex-col items-center">
                  <CreditCard className="h-6 w-6 mb-2" />
                  <span className="text-xs">Visa</span>
                </Button>
                <Button variant="outline" className="p-4 h-auto flex flex-col items-center">
                  <CreditCard className="h-6 w-6 mb-2" />
                  <span className="text-xs">MasterCard</span>
                </Button>
                <Button variant="outline" className="p-4 h-auto flex flex-col items-center">
                  <CreditCard className="h-6 w-6 mb-2" />
                  <span className="text-xs">МИР</span>
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="withdrawal-amount">Сумма вывода</Label>
                  <Input
                    id="withdrawal-amount"
                    type="number"
                    placeholder="Введите сумму"
                    min="500"
                    max="100000"
                  />
                  <div className="text-xs text-muted-foreground">
                    Минимум: 500 ₽ • Максимум: 100,000 ₽
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  <Button variant="outline" size="sm">1,000 ₽</Button>
                  <Button variant="outline" size="sm">5,000 ₽</Button>
                  <Button variant="outline" size="sm">10,000 ₽</Button>
                  <Button variant="outline" size="sm">Все</Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="card-number">Номер карты</Label>
                  <Input
                    id="card-number"
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cardholder-name">Имя владельца карты</Label>
                  <Input
                    id="cardholder-name"
                    placeholder="IVAN PETROV"
                  />
                </div>
                
                <Button className="w-full">
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  Запросить вывод
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="banks" className="space-y-4 mt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="p-4 h-auto flex flex-col items-center">
                  <Building className="h-6 w-6 mb-2" />
                  <span className="text-xs">Сбербанк</span>
                </Button>
                <Button variant="outline" className="p-4 h-auto flex flex-col items-center">
                  <Building className="h-6 w-6 mb-2" />
                  <span className="text-xs">ВТБ</span>
                </Button>
                <Button variant="outline" className="p-4 h-auto flex flex-col items-center">
                  <Building className="h-6 w-6 mb-2" />
                  <span className="text-xs">Альфа-Банк</span>
                </Button>
                <Button variant="outline" className="p-4 h-auto flex flex-col items-center">
                  <Building className="h-6 w-6 mb-2" />
                  <span className="text-xs">Тинькофф</span>
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="bank-amount">Сумма вывода</Label>
                  <Input
                    id="bank-amount"
                    type="number"
                    placeholder="Введите сумму"
                    min="500"
                    max="500000"
                  />
                  <div className="text-xs text-muted-foreground">
                    Минимум: 500 ₽ • Максимум: 500,000 ₽
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bank-select">Выберите банк</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите банк" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sberbank">Сбербанк</SelectItem>
                      <SelectItem value="vtb">ВТБ</SelectItem>
                      <SelectItem value="alfabank">Альфа-Банк</SelectItem>
                      <SelectItem value="tinkoff">Тинькофф</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="account-number">Номер счета</Label>
                  <Input
                    id="account-number"
                    placeholder="40817810099910004312"
                    maxLength={20}
                  />
                </div>
                
                <Button className="w-full">
                  <Building className="h-4 w-4 mr-2" />
                  Запросить вывод
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-xs text-muted-foreground text-center mt-4">
          Обработка заявок на вывод от 24 до 72 часов. Комиссия за вывод не взимается.
        </div>
      </DialogContent>
    </Dialog>
  );
}
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Smartphone, Building, Wallet } from "lucide-react";

interface DepositModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DepositModal({ open, onOpenChange }: DepositModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] animate-scale-in data-[state=closed]:animate-scale-out transition-all duration-300 ease-out">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Пополнение счета
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="cards" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cards" className="text-xs">
              <CreditCard className="h-4 w-4 mr-1" />
              Карты
            </TabsTrigger>
            <TabsTrigger value="mobile" className="text-xs">
              <Smartphone className="h-4 w-4 mr-1" />
              Мобильные
            </TabsTrigger>
            <TabsTrigger value="banks" className="text-xs">
              <Building className="h-4 w-4 mr-1" />
              Банки
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="cards" className="space-y-4 mt-6 animate-fade-in">
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
                  <Label htmlFor="amount">Сумма пополнения</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Введите сумму"
                    min="100"
                    max="100000"
                  />
                  <div className="text-xs text-muted-foreground">
                    Минимум: 100 ₽ • Максимум: 100,000 ₽
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  <Button variant="outline" size="sm">500 ₽</Button>
                  <Button variant="outline" size="sm">1,000 ₽</Button>
                  <Button variant="outline" size="sm">5,000 ₽</Button>
                  <Button variant="outline" size="sm">10,000 ₽</Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="card-number">Номер карты</Label>
                  <Input
                    id="card-number"
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Срок действия</Label>
                    <Input
                      id="expiry"
                      placeholder="ММ/ГГ"
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="000"
                      maxLength={3}
                      type="password"
                    />
                  </div>
                </div>
                
                <Button className="w-full">
                  <Wallet className="h-4 w-4 mr-2" />
                  Пополнить счет
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="mobile" className="space-y-4 mt-6 animate-fade-in">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" className="p-4 h-auto flex flex-col items-center">
                  <Smartphone className="h-6 w-6 mb-2" />
                  <span className="text-xs">МТС</span>
                </Button>
                <Button variant="outline" className="p-4 h-auto flex flex-col items-center">
                  <Smartphone className="h-6 w-6 mb-2" />
                  <span className="text-xs">Билайн</span>
                </Button>
                <Button variant="outline" className="p-4 h-auto flex flex-col items-center">
                  <Smartphone className="h-6 w-6 mb-2" />
                  <span className="text-xs">МегаФон</span>
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="mobile-amount">Сумма пополнения</Label>
                  <Input
                    id="mobile-amount"
                    type="number"
                    placeholder="Введите сумму"
                    min="100"
                    max="15000"
                  />
                  <div className="text-xs text-muted-foreground">
                    Минимум: 100 ₽ • Максимум: 15,000 ₽
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Номер телефона</Label>
                  <Input
                    id="phone"
                    placeholder="+7 900 123-45-67"
                    type="tel"
                  />
                </div>
                
                <Button className="w-full">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Пополнить с телефона
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="banks" className="space-y-4 mt-6 animate-fade-in">
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
                  <Label htmlFor="bank-amount">Сумма пополнения</Label>
                  <Input
                    id="bank-amount"
                    type="number"
                    placeholder="Введите сумму"
                    min="100"
                    max="500000"
                  />
                  <div className="text-xs text-muted-foreground">
                    Минимум: 100 ₽ • Максимум: 500,000 ₽
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
                
                <Button className="w-full">
                  <Building className="h-4 w-4 mr-2" />
                  Перейти к оплате
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-xs text-muted-foreground text-center mt-4">
          Пополнение происходит моментально. Комиссия за пополнение не взимается.
        </div>
      </DialogContent>
    </Dialog>
  );
}
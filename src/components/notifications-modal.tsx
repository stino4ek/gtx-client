import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, CheckCircle, AlertCircle, Gift, TrendingUp, Trash2 } from "lucide-react";
import { useState } from "react";

interface NotificationsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Notification {
  id: number;
  type: "win" | "bonus" | "info" | "warning";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export function NotificationsModal({ open, onOpenChange }: NotificationsModalProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "win",
      title: "Выигрыш по ставке!",
      message: "Ваша ставка на матч Манчестер Юнайтед - Арсенал выиграла. Выигрыш: 2,150 ₽",
      time: "2 часа назад",
      read: false
    },
    {
      id: 2,
      type: "bonus",
      title: "Бонус за депозит",
      message: "Получите 100% бонус на первое пополнение до 10,000 ₽!",
      time: "4 часа назад",
      read: false
    },
    {
      id: 3,
      type: "info",
      title: "Новый турнир",
      message: "Стартует новый турнир Champions League. Делайте ставки на лучших условиях!",
      time: "6 часов назад",
      read: true
    },
    {
      id: 4,
      type: "warning",
      title: "Проигрышная ставка",
      message: "Ваша ставка на матч Барселона - Реал Мадрид не прошла",
      time: "1 день назад",
      read: true
    },
    {
      id: 5,
      type: "bonus",
      title: "Кешбэк 5%",
      message: "Возврат 5% с проигрышных ставок за неделю: 250 ₽",
      time: "2 дня назад",
      read: true
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case "win":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "bonus":
        return <Gift className="h-5 w-5 text-purple-500" />;
      case "info":
        return <TrendingUp className="h-5 w-5 text-blue-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "win":
        return "default";
      case "bonus":
        return "secondary";
      case "info":
        return "outline";
      case "warning":
        return "destructive";
      default:
        return "outline";
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] animate-scale-in data-[state=closed]:animate-scale-out transition-all duration-300 ease-out">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Уведомления</span>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {unreadCount}
                </Badge>
              )}
            </div>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs"
              >
                Прочитать все
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[500px]">
          <div className="space-y-3">
            {notifications.length > 0 ? notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                  !notification.read ? 'bg-primary/5 border-primary/20' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {notification.time}
                        </span>
                        <Badge variant={getBadgeVariant(notification.type)} className="text-xs">
                          {notification.type === "win" && "Выигрыш"}
                          {notification.type === "bonus" && "Бонус"}
                          {notification.type === "info" && "Инфо"}
                          {notification.type === "warning" && "Уведомление"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-50 hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Нет уведомлений</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
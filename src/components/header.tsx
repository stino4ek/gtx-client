import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Bell, User, Wallet, Search, Menu, X } from "lucide-react";
import { AuthModal } from "./auth-modal";
import { ProfileModal } from "./profile-modal";
import { NotificationsModal } from "./notifications-modal";
import { BetHistoryModal } from "./bet-history-modal";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [notificationsModalOpen, setNotificationsModalOpen] = useState(false);
  const [betHistoryModalOpen, setBetHistoryModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 md:h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-4 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <img
              src="../../public/gtx-light.png"
              alt="GTXBET"
              className="h-8 md:h-10 w-auto dark:hidden"
            />
            <img
              src="../../public/gtx-dark.png" 
              alt="GTXBET"
              className="h-8 md:h-10 w-auto hidden dark:block"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            <a href="#" className="text-primary font-semibold hover:text-primary/80 transition-colors">Линия</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Live сейчас</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Игры 24/7</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Киберспорт</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Мой счет</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Результаты</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">О нас</a>
          </nav>
        </div>

        {/* Right Side - Auth/Profile */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <ModeToggle />
          
          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <nav className="flex flex-col space-y-4 mt-6">
                <a href="#" className="text-primary font-semibold hover:text-primary/80 transition-colors py-2">Линия</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors py-2">Live сейчас</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors py-2">Игры 24/7</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors py-2">Киберспорт</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors py-2">Мой счет</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors py-2">Результаты</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors py-2">О нас</a>
                {isAuthenticated && (
                  <Button
                    variant="outline"
                    className="mt-4 justify-start"
                    onClick={() => {
                      setBetHistoryModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                  >
                    История ставок
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          
          {isAuthenticated ? (
            <>
              {/* Balance Display - Hidden on small screens */}
              <div className="hidden lg:flex items-center space-x-2 px-3 py-1 bg-primary/10 rounded-full">
                <Wallet className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">15,750 ₽</span>
              </div>
              
              {/* Mobile Balance */}
              <div className="lg:hidden flex items-center space-x-1 px-2 py-1 bg-primary/10 rounded-full">
                <Wallet className="h-3 w-3 text-primary" />
                <span className="font-medium text-xs">15.7K</span>
              </div>
              
              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="relative h-8 w-8 md:h-10 md:w-10"
                onClick={() => setNotificationsModalOpen(true)}
              >
                <Bell className="h-4 w-4 md:h-5 md:w-5" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 p-0 text-[10px] md:text-xs bg-red-500">
                  3
                </Badge>
              </Button>
              
              {/* Profile */}
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 md:h-10 md:w-10"
                onClick={() => setProfileModalOpen(true)}
              >
                <User className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </>
          ) : (
            <Button onClick={() => setAuthModalOpen(true)} className="text-sm md:text-base">
              Войти
            </Button>
          )}
        </div>
      </div>

      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen}
        onLoginSuccess={() => {
          // Auth state is managed by context, no need to set local state
        }}
      />
      
      <ProfileModal 
        open={profileModalOpen} 
        onOpenChange={setProfileModalOpen} 
      />
      
      <NotificationsModal 
        open={notificationsModalOpen} 
        onOpenChange={setNotificationsModalOpen} 
      />
      
      <BetHistoryModal 
        open={betHistoryModalOpen} 
        onOpenChange={setBetHistoryModalOpen} 
      />
    </header>
  );
}
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { Eye, EyeOff, Loader2, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";

// Validation schemas
const loginSchema = z.object({
  email: z.string().email('Пожалуйста, введите корректный email'),
  password: z.string().min(1, 'Пароль обязателен'),
  rememberMe: z.boolean().optional(),
});

const registerSchema = z.object({
  email: z.string().email('Пожалуйста, введите корректный email'),
  username: z.string().min(3, 'Имя пользователя должно содержать минимум 3 символа'),
  phone: z.string().min(10, 'Введите корректный номер телефона'),
  password: z.string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/, 
      'Пароль должен содержать заглавные и строчные буквы, цифры и специальные символы'),
  confirmPassword: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, 'Необходимо согласиться с условиями'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess: () => void;
}

export function AuthModal({ open, onOpenChange, onLoginSuccess }: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const { toast } = useToast();
  const { login, register, isLoading, error, clearError } = useAuth();

  // Forms
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      agreeToTerms: false,
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      clearError();
      await login(data.email, data.password, data.rememberMe);
      
      toast({
        title: "Добро пожаловать!",
        description: "Вы успешно вошли в систему",
      });
      onLoginSuccess();
      onOpenChange(false);
    } catch (err: any) {
      // Error is handled by the auth context
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    try {
      clearError();
      await register(data);
      
      toast({
        title: "Регистрация успешна!",
        description: "Добро пожаловать в GTXBET",
      });
      onLoginSuccess();
      onOpenChange(false);
    } catch (err: any) {
      // Error is handled by the auth context
    }
  };

  const switchTab = (tab: string) => {
    setActiveTab(tab);
    clearError();
    loginForm.reset();
    registerForm.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] sm:max-w-[500px] max-h-[90vh] overflow-hidden animate-scale-in data-[state=closed]:animate-scale-out transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Добро пожаловать в GTXBET
          </DialogTitle>
        </DialogHeader>
        
        <div className="w-full overflow-hidden">
          <Tabs value={activeTab} onValueChange={switchTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 relative overflow-hidden bg-muted/50">
              <TabsTrigger 
                value="login" 
                className="transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] relative z-10 hover:scale-105 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Вход
              </TabsTrigger>
              <TabsTrigger 
                value="register" 
                className="transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] relative z-10 hover:scale-105 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Регистрация
              </TabsTrigger>
            </TabsList>
            
            <div className="relative overflow-hidden">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <TabsContent 
                value="login" 
                className={`space-y-4 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transform ${
                  activeTab === "login" 
                    ? "translate-x-0 opacity-100 scale-100 rotate-0" 
                    : "translate-x-[-120%] opacity-0 scale-90 rotate-[-2deg]"
                }`}
                style={{
                  filter: activeTab === "login" ? "blur(0px)" : "blur(2px)",
                  transformOrigin: "center center",
                  minHeight: "320px"
                }}
              >
                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="example@mail.com"
                      {...loginForm.register("email")}
                      className={loginForm.formState.errors.email ? "border-destructive" : ""}
                    />
                    {loginForm.formState.errors.email && (
                      <p className="text-sm text-destructive">{loginForm.formState.errors.email.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Пароль</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Введите пароль"
                        {...loginForm.register("password")}
                        className={loginForm.formState.errors.password ? "border-destructive pr-10" : "pr-10"}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {loginForm.formState.errors.password && (
                      <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="rememberMe"
                        {...loginForm.register("rememberMe")}
                      />
                      <Label htmlFor="rememberMe" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Запомнить меня
                      </Label>
                    </div>
                    <a href="#" className="text-primary hover:underline">
                      Забыли пароль?
                    </a>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Вход...
                      </>
                    ) : (
                      'Войти'
                    )}
                  </Button>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    Нет аккаунта?{" "}
                    <button
                      type="button"
                      className="text-primary hover:underline transition-colors duration-200"
                      onClick={() => switchTab("register")}
                    >
                      Зарегистрируйтесь
                    </button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent 
                value="register" 
                className={`space-y-4 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transform ${
                  activeTab === "register" 
                    ? "translate-x-0 opacity-100 scale-100 rotate-0" 
                    : "translate-x-[120%] opacity-0 scale-90 rotate-[2deg]"
                }`}
                style={{
                  filter: activeTab === "register" ? "blur(0px)" : "blur(2px)",
                  transformOrigin: "center center",
                  minHeight: "600px"
                }}
              >
                <div className="max-h-[500px] overflow-y-auto pr-2">
                  <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-firstName">Имя</Label>
                        <Input
                          id="register-firstName"
                          type="text"
                          placeholder="Иван"
                          {...registerForm.register("firstName")}
                          className={registerForm.formState.errors.firstName ? "border-destructive" : ""}
                        />
                        {registerForm.formState.errors.firstName && (
                          <p className="text-sm text-destructive">{registerForm.formState.errors.firstName.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="register-lastName">Фамилия</Label>
                        <Input
                          id="register-lastName"
                          type="text"
                          placeholder="Иванов"
                          {...registerForm.register("lastName")}
                          className={registerForm.formState.errors.lastName ? "border-destructive" : ""}
                        />
                        {registerForm.formState.errors.lastName && (
                          <p className="text-sm text-destructive">{registerForm.formState.errors.lastName.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="example@mail.com"
                        {...registerForm.register("email")}
                        className={registerForm.formState.errors.email ? "border-destructive" : ""}
                      />
                      {registerForm.formState.errors.email && (
                        <p className="text-sm text-destructive">{registerForm.formState.errors.email.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-username">Имя пользователя</Label>
                      <Input
                        id="register-username"
                        type="text"
                        placeholder="ivan123"
                        {...registerForm.register("username")}
                        className={registerForm.formState.errors.username ? "border-destructive" : ""}
                      />
                      {registerForm.formState.errors.username && (
                        <p className="text-sm text-destructive">{registerForm.formState.errors.username.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-phone">Телефон</Label>
                      <Input
                        id="register-phone"
                        type="tel"
                        placeholder="+7 900 123-45-67"
                        {...registerForm.register("phone")}
                        className={registerForm.formState.errors.phone ? "border-destructive" : ""}
                      />
                      {registerForm.formState.errors.phone && (
                        <p className="text-sm text-destructive">{registerForm.formState.errors.phone.message}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-country">Страна</Label>
                        <Input
                          id="register-country"
                          type="text"
                          placeholder="Россия"
                          {...registerForm.register("country")}
                          className={registerForm.formState.errors.country ? "border-destructive" : ""}
                        />
                        {registerForm.formState.errors.country && (
                          <p className="text-sm text-destructive">{registerForm.formState.errors.country.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="register-city">Город</Label>
                        <Input
                          id="register-city"
                          type="text"
                          placeholder="Москва"
                          {...registerForm.register("city")}
                          className={registerForm.formState.errors.city ? "border-destructive" : ""}
                        />
                        {registerForm.formState.errors.city && (
                          <p className="text-sm text-destructive">{registerForm.formState.errors.city.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Пароль</Label>
                      <div className="relative">
                        <Input
                          id="register-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Создайте пароль"
                          {...registerForm.register("password")}
                          className={registerForm.formState.errors.password ? "border-destructive pr-10" : "pr-10"}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      {registerForm.formState.errors.password && (
                        <p className="text-sm text-destructive">{registerForm.formState.errors.password.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-confirm-password">Подтвердите пароль</Label>
                      <div className="relative">
                        <Input
                          id="register-confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Повторите пароль"
                          {...registerForm.register("confirmPassword")}
                          className={registerForm.formState.errors.confirmPassword ? "border-destructive pr-10" : "pr-10"}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      {registerForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-destructive">{registerForm.formState.errors.confirmPassword.message}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreeToTerms"
                        {...registerForm.register("agreeToTerms")}
                        className={registerForm.formState.errors.agreeToTerms ? "border-destructive" : ""}
                      />
                      <Label htmlFor="agreeToTerms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Я согласен с{' '}
                        <a href="#" className="text-primary hover:underline">
                          условиями использования
                        </a>{' '}
                        и{' '}
                        <a href="#" className="text-primary hover:underline">
                          политикой конфиденциальности
                        </a>
                      </Label>
                    </div>
                    {registerForm.formState.errors.agreeToTerms && (
                      <p className="text-sm text-destructive">{registerForm.formState.errors.agreeToTerms.message}</p>
                    )}
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Регистрация...
                        </>
                      ) : (
                        'Зарегистрироваться'
                      )}
                    </Button>
                    
                    <div className="text-center text-sm text-muted-foreground">
                      Уже есть аккаунт?{' '}
                      <button
                        type="button"
                        className="text-primary hover:underline transition-colors duration-200"
                        onClick={() => switchTab("login")}
                      >
                        Войдите
                      </button>
                    </div>
                  </form>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
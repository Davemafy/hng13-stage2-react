import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupData } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, UserPlus } from "lucide-react";

export default function Signup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: SignupData) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Signup failed",
          description: result.message || "Username already exists. Please try another.",
        });
        return;
      }

      localStorage.setItem("ticketapp_session", result.token);
      
      toast({
        title: "Account created",
        description: "Welcome to TicketFlow!",
      });
      
      setLocation("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to connect to server. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      {/* Decorative Circles */}
      <div 
        className="absolute top-20 left-20 w-64 h-64 bg-chart-2/10 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-20 right-20 w-48 h-48 bg-primary/10 rounded-full blur-2xl"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
            <CardDescription className="text-center">
              Get started with TicketFlow today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Choose a username"
                          data-testid="input-username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            data-testid="input-password"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPassword(!showPassword)}
                            data-testid="button-toggle-password"
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4" aria-hidden="true" />
                            ) : (
                              <Eye className="w-4 h-4" aria-hidden="true" />
                            )}
                            <span className="sr-only">
                              {showPassword ? "Hide password" : "Show password"}
                            </span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            data-testid="input-confirm-password"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            data-testid="button-toggle-confirm-password"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-4 h-4" aria-hidden="true" />
                            ) : (
                              <Eye className="w-4 h-4" aria-hidden="true" />
                            )}
                            <span className="sr-only">
                              {showConfirmPassword ? "Hide password" : "Show password"}
                            </span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                  data-testid="button-submit-signup"
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Already have an account?</span>{" "}
              <Link href="/auth/login">
                <a className="text-primary hover:underline font-medium" data-testid="link-login">
                  Login
                </a>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link href="/">
            <a className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-home">
              ← Back to home
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Ticket, CheckCircle2, Clock, LogOut, LayoutDashboard } from "lucide-react";
import type { Ticket as TicketType } from "@shared/schema";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("ticketapp_session");
    if (!token) {
      toast({
        variant: "destructive",
        title: "Unauthorized",
        description: "Your session has expired — please log in again.",
      });
      setLocation("/auth/login");
    }
  }, [setLocation, toast]);

  const { data: tickets, isLoading } = useQuery<TicketType[]>({
    queryKey: ["/api/tickets"],
  });

  const totalTickets = tickets?.length || 0;
  const openTickets = tickets?.filter(t => t.status === "open").length || 0;
  const resolvedTickets = tickets?.filter(t => t.status === "closed").length || 0;

  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-[1440px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <h1 className="text-xl font-bold text-card-foreground">TicketFlow</h1>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 mr-2" aria-hidden="true" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Dashboard</h2>
          <p className="text-muted-foreground text-lg">
            Overview of your ticket management system
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-lg border-t-4 border-t-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Tickets
              </CardTitle>
              <Ticket className="w-5 h-5 text-primary" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-card-foreground" data-testid="text-total-tickets">
                {isLoading ? "..." : totalTickets}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                All tickets in the system
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-t-4 border-t-chart-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Open Tickets
              </CardTitle>
              <Clock className="w-5 h-5 text-chart-2" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-card-foreground" data-testid="text-open-tickets">
                {isLoading ? "..." : openTickets}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Awaiting resolution
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-t-4 border-t-chart-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Resolved Tickets
              </CardTitle>
              <CheckCircle2 className="w-5 h-5 text-chart-1" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-card-foreground" data-testid="text-resolved-tickets">
                {isLoading ? "..." : resolvedTickets}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Successfully completed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Manage all your tickets from one centralized location
            </p>
            <Link href="/tickets">
              <Button size="lg" className="w-full sm:w-auto" data-testid="button-manage-tickets">
                <Ticket className="w-4 h-4 mr-2" aria-hidden="true" />
                Manage Tickets
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

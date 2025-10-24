import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTicketSchema, type InsertTicket, type Ticket } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Plus, Edit, Trash2, ArrowLeft, AlertCircle } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const statusColors = {
  open: "bg-green-100 text-green-800 border-green-200",
  in_progress: "bg-amber-100 text-amber-800 border-amber-200",
  closed: "bg-gray-100 text-gray-800 border-gray-200",
};

const priorityColors = {
  low: "bg-blue-100 text-blue-800 border-blue-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  high: "bg-red-100 text-red-800 border-red-200",
};

export default function Tickets() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

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

  const { data: tickets, isLoading } = useQuery<Ticket[]>({
    queryKey: ["/api/tickets"],
  });

  const createForm = useForm<InsertTicket>({
    resolver: zodResolver(insertTicketSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "open",
      priority: "medium",
    },
  });

  const editForm = useForm<InsertTicket>({
    resolver: zodResolver(insertTicketSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "open",
      priority: "medium",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertTicket) => {
      return await apiRequest("POST", "/api/tickets", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tickets"] });
      toast({
        title: "Success",
        description: "Ticket created successfully",
      });
      setCreateDialogOpen(false);
      createForm.reset();
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create ticket. Please try again.",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: InsertTicket }) => {
      return await apiRequest("PATCH", `/api/tickets/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tickets"] });
      toast({
        title: "Success",
        description: "Ticket updated successfully",
      });
      setEditDialogOpen(false);
      setSelectedTicket(null);
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update ticket. Please try again.",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/tickets/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tickets"] });
      toast({
        title: "Success",
        description: "Ticket deleted successfully",
      });
      setDeleteDialogOpen(false);
      setSelectedTicket(null);
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete ticket. Please try again.",
      });
    },
  });

  const handleEdit = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    editForm.reset({
      title: ticket.title,
      description: ticket.description || "",
      status: ticket.status as "open" | "in_progress" | "closed",
      priority: (ticket.priority as "low" | "medium" | "high") || "medium",
    });
    setEditDialogOpen(true);
  };

  const handleDelete = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-[1440px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLocation("/dashboard")}
                data-testid="button-back"
              >
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                <span className="sr-only">Back to Dashboard</span>
              </Button>
              <h1 className="text-xl font-bold text-card-foreground">Ticket Management</h1>
            </div>
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button data-testid="button-create-ticket">
                  <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
                  Create Ticket
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Ticket</DialogTitle>
                  <DialogDescription>
                    Fill in the details to create a new ticket
                  </DialogDescription>
                </DialogHeader>
                <Form {...createForm}>
                  <form onSubmit={createForm.handleSubmit((data) => createMutation.mutate(data))} className="space-y-4">
                    <FormField
                      control={createForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter ticket title"
                              data-testid="input-create-title"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={createForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter ticket description"
                              rows={4}
                              data-testid="input-create-description"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={createForm.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-create-status">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="open">Open</SelectItem>
                              <SelectItem value="in_progress">In Progress</SelectItem>
                              <SelectItem value="closed">Closed</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={createForm.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-create-priority">
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCreateDialogOpen(false)}
                        data-testid="button-cancel-create"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={createMutation.isPending}
                        data-testid="button-submit-create"
                      >
                        {createMutation.isPending ? "Creating..." : "Create Ticket"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-6 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </CardHeader>
                <CardContent>
                  <div className="h-20 bg-muted rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : tickets && tickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <Card key={ticket.id} className="shadow-lg hover-elevate transition-all" data-testid={`card-ticket-${ticket.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg line-clamp-2">{ticket.title}</CardTitle>
                    <Badge className={statusColors[ticket.status as keyof typeof statusColors]} data-testid={`badge-status-${ticket.id}`}>
                      {ticket.status === "in_progress" ? "In Progress" : ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </Badge>
                  </div>
                  {ticket.priority && (
                    <Badge variant="outline" className={priorityColors[ticket.priority as keyof typeof priorityColors]}>
                      {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {ticket.description && (
                    <p className="text-sm text-muted-foreground line-clamp-3" data-testid={`text-description-${ticket.id}`}>
                      {ticket.description}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleEdit(ticket)}
                      data-testid={`button-edit-${ticket.id}`}
                    >
                      <Edit className="w-3 h-3 mr-1" aria-hidden="true" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1"
                      onClick={() => handleDelete(ticket)}
                      data-testid={`button-delete-${ticket.id}`}
                    >
                      <Trash2 className="w-3 h-3 mr-1" aria-hidden="true" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="shadow-lg">
            <CardContent className="py-16 text-center">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No tickets found</h3>
              <p className="text-muted-foreground mb-6">
                Get started by creating your first ticket
              </p>
              <Button onClick={() => setCreateDialogOpen(true)} data-testid="button-create-first">
                <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
                Create Your First Ticket
              </Button>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Ticket</DialogTitle>
            <DialogDescription>
              Update the ticket details
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit((data) => selectedTicket && updateMutation.mutate({ id: selectedTicket.id, data }))} className="space-y-4">
              <FormField
                control={editForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter ticket title"
                        data-testid="input-edit-title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter ticket description"
                        rows={4}
                        data-testid="input-edit-description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-edit-status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-edit-priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditDialogOpen(false)}
                  data-testid="button-cancel-edit"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={updateMutation.isPending}
                  data-testid="button-submit-edit"
                >
                  {updateMutation.isPending ? "Updating..." : "Update Ticket"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the ticket "{selectedTicket?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedTicket && deleteMutation.mutate(selectedTicket.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-testid="button-confirm-delete"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

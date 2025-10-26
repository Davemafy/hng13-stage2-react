import type { User, Ticket, LoginData, SignupData } from '@shared/schema';

const USERS_KEY = 'ticket_app_users';
const CURRENT_USER_KEY = 'ticket_app_current_user';
const TICKETS_KEY = 'ticket_app_tickets';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// User Management
export function getUsers(): User[] {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}

function saveUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function signup(data: SignupData): { success: boolean; error?: string; user?: User } {
  const users = getUsers();
  
  if (users.some(u => u.username === data.username)) {
    return { success: false, error: 'Username already exists' };
  }
  
  const newUser: User = {
    id: generateId(),
    username: data.username,
    password: data.password, // Note: In real app, this should be hashed
  };
  
  users.push(newUser);
  saveUsers(users);
  
  return { success: true, user: newUser };
}

export function login(data: LoginData): { success: boolean; error?: string; user?: User } {
  const users = getUsers();
  const user = users.find(u => u.username === data.username && u.password === data.password);
  
  if (!user) {
    return { success: false, error: 'Invalid username or password' };
  }
  
  setCurrentUser(user);
  return { success: true, user };
}

export function logout(): void {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getCurrentUser(): User | null {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
}

function setCurrentUser(user: User): void {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

// Ticket Management
export function getTickets(): Ticket[] {
  const tickets = localStorage.getItem(TICKETS_KEY);
  if (!tickets) return [];
  
  const parsed = JSON.parse(tickets);
  // Convert ISO strings back to Date objects
  return parsed.map((t: any) => ({
    ...t,
    createdAt: new Date(t.createdAt),
    updatedAt: new Date(t.updatedAt),
  }));
}

function saveTickets(tickets: Ticket[]): void {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
}

export function createTicket(data: { title: string; description?: string; status: string; priority?: string }): Ticket {
  const tickets = getTickets();
  
  const newTicket: Ticket = {
    id: generateId(),
    title: data.title,
    description: data.description || null,
    status: data.status,
    priority: data.priority || null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  tickets.push(newTicket);
  saveTickets(tickets);
  
  return newTicket;
}

export function updateTicket(id: string, data: Partial<{ title: string; description?: string; status: string; priority?: string }>): Ticket | null {
  const tickets = getTickets();
  const index = tickets.findIndex(t => t.id === id);
  
  if (index === -1) return null;
  
  const updatedTicket: Ticket = {
    ...tickets[index],
    ...data,
    updatedAt: new Date(),
  };
  
  tickets[index] = updatedTicket;
  saveTickets(tickets);
  
  return updatedTicket;
}

export function deleteTicket(id: string): boolean {
  const tickets = getTickets();
  const filtered = tickets.filter(t => t.id !== id);
  
  if (filtered.length === tickets.length) return false;
  
  saveTickets(filtered);
  return true;
}

export function getTicketById(id: string): Ticket | null {
  const tickets = getTickets();
  return tickets.find(t => t.id === id) || null;
}

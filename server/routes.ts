import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertTicketSchema } from "@shared/schema";
import { z } from "zod";

// Middleware to verify authentication
function requireAuth(req: Request, res: Response, next: Function) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.substring(7);
  const userId = storage.getUserIdFromToken(token);
  
  if (!userId) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  (req as any).userId = userId;
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication Routes
  app.post("/api/auth/signup", async (req: Request, res: Response) => {
    try {
      const data = insertUserSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(data.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // Create user
      const user = await storage.createUser(data);
      
      // Create session token
      const token = storage.createSession(user.id);

      res.status(201).json({
        token,
        user: { id: user.id, username: user.username },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }

      // Find user
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Create session token
      const token = storage.createSession(user.id);

      res.json({
        token,
        user: { id: user.id, username: user.username },
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Ticket Routes (all protected)
  app.get("/api/tickets", requireAuth, async (req: Request, res: Response) => {
    try {
      const tickets = await storage.getTickets();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tickets" });
    }
  });

  app.get("/api/tickets/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const ticket = await storage.getTicket(req.params.id);
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }
      res.json(ticket);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch ticket" });
    }
  });

  app.post("/api/tickets", requireAuth, async (req: Request, res: Response) => {
    try {
      const data = insertTicketSchema.parse(req.body);
      const ticket = await storage.createTicket(data);
      res.status(201).json(ticket);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create ticket" });
    }
  });

  app.patch("/api/tickets/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const data = insertTicketSchema.parse(req.body);
      const ticket = await storage.updateTicket(req.params.id, data);
      
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }
      
      res.json(ticket);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to update ticket" });
    }
  });

  app.delete("/api/tickets/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const success = await storage.deleteTicket(req.params.id);
      
      if (!success) {
        return res.status(404).json({ message: "Ticket not found" });
      }
      
      res.json({ message: "Ticket deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete ticket" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

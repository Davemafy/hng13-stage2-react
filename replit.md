# TicketFlow - React Ticket Management System

## Overview

TicketFlow is a full-stack ticket management web application built with React and Express. It provides a complete CRUD interface for managing support tickets with status tracking, user authentication, and a responsive Material Design-inspired UI. The application features a landing page, authentication system, dashboard with statistics, and comprehensive ticket management capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for type-safe component development
- Wouter for lightweight client-side routing (alternative to React Router)
- TanStack Query for server state management, caching, and data fetching
- React Hook Form with Zod for form validation and schema-based type safety

**UI Component Strategy:**
- Shadcn UI component library built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Design system based on Material Design principles for card-based layouts
- Responsive grid system: mobile (single column), tablet (2 columns), desktop (3 columns)
- Maximum content width constraint of 1440px, centered horizontally

**State Management Approach:**
- TanStack Query handles all server state (tickets, user data)
- Local storage for session token persistence
- React Hook Form manages form state independently
- No global state management library needed due to server-centric architecture

**Form Validation Pattern:**
- Zod schemas defined in shared directory for client-server consistency
- React Hook Form integration via @hookform/resolvers
- Inline validation feedback and toast notifications for errors
- Strict validation rules: title/status required, status enum enforcement (open, in_progress, closed)

### Backend Architecture

**Server Framework:**
- Express.js web server with TypeScript
- RESTful API design pattern
- Custom middleware for authentication via Bearer tokens

**Data Storage Strategy:**
- In-memory storage implementation using Map data structures
- Session management via token-to-userId mapping
- No database dependency in current implementation (designed for easy database migration)
- UUIDs for entity identification (users and tickets)

**Authentication System:**
- Token-based authentication using randomUUID for session tokens
- Session tokens stored in localStorage on client, validated via Authorization header
- Middleware pattern (`requireAuth`) for protecting routes
- Password storage without hashing (suitable for development, requires enhancement for production)

**API Design:**
- RESTful endpoints following standard conventions:
  - POST /api/auth/signup - User registration
  - POST /api/auth/login - User authentication
  - GET /api/tickets - Retrieve all tickets
  - POST /api/tickets - Create new ticket
  - PATCH /api/tickets/:id - Update ticket
  - DELETE /api/tickets/:id - Delete ticket
- Consistent JSON response format with error messages
- Zod validation on incoming request bodies

### Design System

**Color Coding Strategy:**
- Status-based color scheme: Open (green), In Progress (amber), Closed (gray)
- Priority badges: Low (blue), Medium (yellow), High (red)
- CSS custom properties for theme consistency

**Typography System:**
- Inter font family for UI text (weights: 400, 500, 600, 700)
- JetBrains Mono for status tags and code-like elements
- Hierarchical type scale from hero headings (5xl/6xl) to labels (sm)

**Layout Patterns:**
- Tailwind spacing scale (4, 6, 8, 12, 16) for consistent rhythm
- Card-based component pattern with shadows and rounded corners
- Wavy SVG background on landing page for visual interest
- Decorative circles and gradient text treatments

### External Dependencies

**Database:**
- Drizzle ORM configured for PostgreSQL (via drizzle.config.ts)
- Schema definitions using Drizzle's pgTable with Neon serverless driver
- Migration support configured but not currently used (in-memory storage active)
- Database URL expected via environment variable DATABASE_URL

**Third-Party Services:**
- @neondatabase/serverless - PostgreSQL connection adapter
- connect-pg-simple - PostgreSQL session store (configured but not active)

**UI Component Library:**
- Radix UI primitives (27+ component packages)
- Comprehensive accessible component set: dialogs, dropdowns, forms, toasts, etc.
- Lucide React for iconography

**Development Tools:**
- Vite for build tooling and development server
- Replit-specific plugins for error overlay and development banner
- ESBuild for server-side bundling

**Validation & Type Safety:**
- Zod for runtime schema validation
- drizzle-zod for automatic schema generation from database definitions
- Shared schema definitions between client and server for consistency

**Styling & Animation:**
- Tailwind CSS with custom configuration
- class-variance-authority for component variant management
- Embla Carousel for carousel components
- date-fns for date manipulation

**Session Management Note:**
Currently using in-memory session storage. The `connect-pg-simple` package is installed for future PostgreSQL-backed session persistence when database integration is activated.
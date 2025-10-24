# TicketFlow - React Ticket Management System

A professional ticket management web application built with React, featuring a complete CRUD interface, authentication system, and responsive design.

## 🚀 Features

- **Landing Page**: Welcoming hero section with wavy SVG background and decorative circles
- **Authentication**: Secure login and signup with form validation and session management
- **Dashboard**: Real-time statistics showing total, open, and resolved tickets
- **Ticket Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Responsive Design**: Mobile-first approach with max-width 1440px centered layout
- **Status-Based Color Coding**:
  - Open → Green
  - In Progress → Amber
  - Closed → Gray
- **Accessible UI**: Semantic HTML, ARIA labels, keyboard navigation, focus states

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Shadcn UI** - Component library
- **Wouter** - Client-side routing
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **TanStack Query** - Data fetching and caching
- **Lucide React** - Icon library

### Backend
- **Express.js** - Web server
- **TypeScript** - Type safety
- **In-memory Storage** - Session and data persistence
- **Zod** - Request validation

## 📦 Installation & Setup

### Prerequisites
- Node.js 20 or higher
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ticketflow-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Open your browser to `http://localhost:5000`
   - The application will be available at the displayed URL

## 🎯 Usage Guide

### Getting Started

1. **Visit the Landing Page**
   - Navigate to the home page
   - Click "Get Started" or "Login"

2. **Create an Account**
   - Click "Get Started" or navigate to signup
   - Enter username (minimum 3 characters)
   - Enter password (minimum 6 characters)
   - Confirm password
   - Submit to create account

3. **Login**
   - Enter your username and password
   - Click "Login" to access the dashboard

### Managing Tickets

1. **View Dashboard**
   - See statistics: Total, Open, and Resolved tickets
   - Click "Manage Tickets" to access ticket management

2. **Create a Ticket**
   - Click "Create Ticket" button
   - Fill in required fields:
     - **Title** (required)
     - **Status** (required): open, in_progress, or closed
     - **Description** (optional)
     - **Priority** (optional): low, medium, or high
   - Click "Create Ticket"

3. **Edit a Ticket**
   - Click "Edit" on any ticket card
   - Update the fields
   - Click "Update Ticket"

4. **Delete a Ticket**
   - Click "Delete" on any ticket card
   - Confirm deletion in the dialog
   - Ticket will be permanently removed

### Logging Out
- Click "Logout" button in the header
- You'll be redirected to the landing page
- Session will be cleared

## 🧪 Test User Credentials

You can create any account through the signup flow. For testing purposes:

**Example Account:**
- Username: `testuser`
- Password: `password123`

(Note: Create this account via the signup page first)

## 🎨 Design Features

### Layout
- Max-width: 1440px (centered on larger screens)
- Fully responsive: Mobile, Tablet, Desktop
- Consistent spacing and typography

### Visual Elements
- **Wavy SVG Background**: Bottom of hero section
- **Decorative Circles**: 3+ circular elements across pages
- **Card-based UI**: Rounded corners with shadows
- **Status Badges**: Color-coded by ticket status
- **Smooth Transitions**: Hover and active states

### Accessibility
- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Sufficient color contrast (WCAG AA)
- Focus visible states
- Screen reader friendly

## 📁 Project Structure

```
ticketflow-react/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/          # Shadcn UI components
│   │   ├── lib/
│   │   │   └── queryClient.ts
│   │   ├── pages/
│   │   │   ├── landing.tsx
│   │   │   ├── login.tsx
│   │   │   ├── signup.tsx
│   │   │   ├── dashboard.tsx
│   │   │   └── tickets.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   └── index.html
├── server/
│   ├── routes.ts           # API endpoints
│   ├── storage.ts          # In-memory storage
│   └── index.ts
├── shared/
│   └── schema.ts           # Shared types and validation
├── design_guidelines.md
├── package.json
└── README.md
```

## 🔐 Security & Authorization

### Session Management
- Sessions stored in localStorage with key: `ticketapp_session`
- Token-based authentication using Bearer tokens
- Protected routes redirect unauthorized users to login

### Route Protection
- Dashboard and Ticket Management require valid session
- Automatic redirect to `/auth/login` if unauthorized
- Clear error messages for expired sessions

## ⚙️ API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login to existing account

### Tickets (Protected)
- `GET /api/tickets` - Get all tickets
- `GET /api/tickets/:id` - Get single ticket
- `POST /api/tickets` - Create new ticket
- `PATCH /api/tickets/:id` - Update ticket
- `DELETE /api/tickets/:id` - Delete ticket

## 🎨 UI Components

### Shadcn Components Used
- Button - Interactive actions
- Card - Container layouts
- Form - Form management
- Input - Text inputs
- Textarea - Multi-line text
- Select - Dropdown selections
- Dialog - Modal overlays
- Alert Dialog - Confirmation dialogs
- Badge - Status indicators
- Toast - Notifications

## 🔄 State Management

- **TanStack Query** for server state
- **React Hook Form** for form state
- **localStorage** for session persistence
- Query invalidation for real-time updates

## 📱 Responsive Breakpoints

- Mobile: < 768px (single column)
- Tablet: 768px - 1024px (2 columns)
- Desktop: > 1024px (3 columns)
- Max container width: 1440px

## 🐛 Known Issues

- None currently reported

## 🤝 Contributing

This is a demonstration project. For production use:
1. Implement persistent database (PostgreSQL)
2. Add password hashing (bcrypt)
3. Implement proper JWT tokens
4. Add rate limiting
5. Implement pagination for large datasets
6. Add user roles and permissions

## 📄 License

MIT License - feel free to use this project for learning and development.

## 👨‍💻 Author

Built as part of the Multi-Framework Ticket Web App challenge.

---

**Note**: This is the React implementation. Vue.js and Twig versions are separate implementations with identical layouts and features.

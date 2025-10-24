# Design Guidelines: Ticket Management Web Application (React Version)

## Design Approach
**System-Based Approach**: This is a utility-focused productivity application requiring consistent, functional UI patterns with Material Design principles for card-based layouts and form interactions.

---

## Layout System

### Container & Spacing
- **Max Width**: All content constrained to `max-w-[1440px]` centered horizontally
- **Spacing Units**: Use Tailwind spacing scale - primary units of `4`, `6`, `8`, `12`, and `16`
- **Section Padding**: `py-12` mobile, `py-16` tablet, `py-20` desktop
- **Card Spacing**: `p-6` for card content, `gap-6` for grid layouts

### Responsive Grid
- **Mobile**: Single column stack
- **Tablet**: 2-column grid for features/stats
- **Desktop**: 3-column grid for ticket cards and statistics

---

## Typography

### Font Family
- Primary: **Inter** via Google Fonts (400, 500, 600, 700)
- Monospace: **JetBrains Mono** for status tags

### Hierarchy
- **Hero Heading**: `text-5xl md:text-6xl font-bold`
- **Page Titles**: `text-3xl md:text-4xl font-bold`
- **Section Headings**: `text-2xl font-semibold`
- **Card Titles**: `text-lg font-semibold`
- **Body Text**: `text-base`
- **Labels/Meta**: `text-sm font-medium`
- **Status Tags**: `text-xs font-medium uppercase tracking-wide`

---

## Component Library

### Landing Page Components

**Hero Section**
- Full viewport height section (`min-h-screen`) with wavy SVG background at bottom
- Large headline with gradient text treatment
- Two prominent CTA buttons: "Login" (primary) and "Get Started" (secondary)
- Decorative floating circle (large, semi-transparent) overlapping hero content
- Wavy background: SVG path creating smooth wave transition to next section

**Features Section**
- Box-shaped cards with `rounded-2xl shadow-lg`
- Each feature card contains icon, title, and description
- 3-column grid on desktop, 2-column tablet, stacked mobile
- Decorative circles positioned between sections

**Footer**
- Full-width with centered content container
- App name, description, and links (Privacy, Terms, Contact)
- Social media icons
- Copyright text

### Authentication Components

**Login/Signup Forms**
- Centered card layout (`max-w-md mx-auto`)
- Form inputs with clear labels above fields
- Inline error messages below invalid fields (red text, small)
- Toast notifications for authentication failures (slide from top-right)
- Password visibility toggle icon in input
- "Remember me" checkbox
- Link to switch between login/signup

### Dashboard Components

**Statistics Cards**
- Three metric cards in grid layout
- Large number display with label below
- Icon representing each metric
- Colored accent border-top based on metric type
- Shadow and hover elevation effect

**Navigation**
- Top navigation bar with app logo and user menu
- "Manage Tickets" prominent button/link
- Logout button in user dropdown menu

### Ticket Management Components

**Ticket Cards**
- Card-based layout with `rounded-xl shadow-md`
- Status badge in top-right corner with color coding:
  - **Open**: Green background (`bg-green-100 text-green-800`)
  - **In Progress**: Amber background (`bg-amber-100 text-amber-800`)
  - **Closed**: Gray background (`bg-gray-100 text-gray-800`)
- Title as heading
- Description text (truncated if long)
- Edit and Delete action buttons at bottom
- Hover state: `shadow-xl` elevation

**Create/Edit Form**
- Modal overlay or dedicated form section
- Input fields for Title (required), Description, Status dropdown, Priority
- Real-time validation with red border on invalid fields
- Inline error messages beneath fields
- Action buttons: Save (primary) and Cancel (secondary)
- Toast notification on success/failure

**Delete Confirmation**
- Modal overlay with confirmation message
- Two buttons: "Confirm Delete" (destructive red) and "Cancel"

---

## Decorative Elements

### SVG Wave
- Positioned at bottom of hero section
- Smooth curved path creating organic transition
- Two-tone color variation for depth

### Floating Circles
- At least **3 decorative circles** across the site:
  - Large circle (400px) semi-transparent, overlapping hero
  - Medium circle (200px) in features section
  - Small circle (100px) in footer area
- Use gradient fills with low opacity
- Position with CSS absolute positioning

### Box Elements
- All content sections use card/box containers
- Consistent `rounded-2xl` corners
- `shadow-lg` for elevation
- White background on light theme

---

## Interactive States

### Buttons
- **Primary**: Solid background, white text, `rounded-lg`, `px-6 py-3`
- **Secondary**: Outlined with border, transparent background
- **Hover**: Slight scale transform (`scale-105`), deeper shadow
- **Focus**: Visible outline ring for accessibility
- **Disabled**: Reduced opacity, cursor not-allowed

### Form Inputs
- Default: Border with subtle shadow
- Focus: Blue accent border, ring effect
- Error: Red border with shake animation
- Success: Green border with checkmark icon

### Cards
- Default: `shadow-md`
- Hover: `shadow-xl` with subtle lift (`-translate-y-1`)

---

## Validation & Error Handling

### Form Validation
- **Required Fields**: Title and Status
- **Status Values**: Dropdown restricted to 'open', 'in_progress', 'closed'
- **Error Display**: 
  - Inline: Red text beneath field, red border on input
  - Toast: Slide from top-right corner, auto-dismiss in 4 seconds

### Error Messages
- "Title is required"
- "Please select a valid status"
- "Your session has expired — please log in again"
- "Failed to load tickets. Please retry."

### Toast Notifications
- Success: Green accent with checkmark icon
- Error: Red accent with X icon
- Info: Blue accent with info icon
- Position: Top-right corner with slide-in animation

---

## Accessibility

- Semantic HTML5 elements (`<nav>`, `<main>`, `<section>`, `<article>`)
- ARIA labels on all interactive elements
- Focus visible states with outline ring
- Sufficient color contrast (WCAG AA minimum)
- Alt text for all decorative circles (marked decorative)
- Keyboard navigation support for all interactions
- Form labels associated with inputs

---

## Icons
Use **Heroicons** via CDN for all icons (outline style for primary, solid for emphasis)

---

## Images
**Hero Section**: No photographic hero image - use gradient background with SVG wave and decorative geometric shapes for modern, clean aesthetic
# 11thOne EV Website

## Overview

11thOne is a modern, responsive marketing website for an electric vehicle brand targeting the Indian market. The brand offers two prototype products: an EV Adventure Motorcycle for men and an Exclusive EV Scooty for women. The website serves as a landing page to collect waiting list signups and showcase the brand's vision for sustainable electric mobility.

The application follows a full-stack TypeScript architecture with a React frontend and Express backend, using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS with custom design tokens for a dark, futuristic EV aesthetic
- **UI Components**: shadcn/ui component library (Radix UI primitives with Tailwind styling)
- **Animations**: Framer Motion for scroll-triggered animations and page transitions
- **State Management**: TanStack React Query for server state and form handling with react-hook-form
- **Build Tool**: Vite with React plugin

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Design**: RESTful endpoints defined in `shared/routes.ts` with Zod schemas for validation
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Session Management**: connect-pg-simple for PostgreSQL-backed sessions

### Data Storage
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Schema Location**: `shared/schema.ts` using Drizzle ORM table definitions
- **Migrations**: Drizzle Kit with `db:push` command for schema synchronization
- **Current Tables**: `waiting_list` (id, name, email, phone, createdAt)

### Shared Code Pattern
The `shared/` directory contains code used by both frontend and backend:
- `schema.ts`: Database table definitions and Zod validation schemas
- `routes.ts`: API route definitions with input/output type safety

### Build System
- Development: Vite dev server with HMR proxied through Express
- Production: Vite builds to `dist/public`, esbuild bundles server to `dist/index.cjs`
- Server dependencies are selectively bundled to optimize cold start times

## External Dependencies

### Email Service
- **Resend**: Used for sending email notifications when users join the waiting list
- **Configuration**: Requires `RESEND_API_KEY` environment variable (optional - falls back to console logging)
- **Notification Target**: syamsundark1999@gmail.com receives waiting list signup notifications

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle Kit**: Schema management and migrations

### Frontend Libraries
- **Radix UI**: Accessible component primitives (dialog, dropdown, forms, etc.)
- **Embla Carousel**: Carousel/slider functionality
- **Lucide React**: Icon library
- **date-fns**: Date formatting utilities

### Development Tools
- **Replit Plugins**: Runtime error overlay, cartographer, and dev banner for Replit environment
- **TypeScript**: Strict mode enabled with path aliases (@/, @shared/)
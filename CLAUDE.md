# CMS Project Plan & Summary

## Overview
This project is a headless-capable CMS designed specifically for portfolios. It allows users to write rich-text posts (including graphics, images, and code blocks) and display them. It uses Next.js (App Router), Prisma for database management, Better Auth for authentication, and TipTap for the rich text editor.

## Architecture
- **Framework**: Next.js (version 16+)
- **Database**: Prisma ORM (SQLite for dev, easily swappable to PostgreSQL)
- **Authentication**: Better Auth with Prisma adapter
- **Editor**: TipTap (Starter Kit, Image, CodeBlock, Placeholder)
- **Styling**: Tailwind CSS v4, shadcn/ui
- **API**: Next.js Route Handlers / Server Actions for data fetching and integration.

## Database Schema (Prisma)
1.  **Better Auth Required Models**: `User`, `Session`, `Account`, `Verification`.
2.  **CMS Models**:
    -   `Post`: `id`, `title`, `slug`, `content` (JSON/HTML), `published` (boolean), `authorId` (relation to User), `createdAt`, `updatedAt`.

## Execution Plan

### Step 1: Initialization & Setup
- [ ] Initialize `TODO.md` in the `source/` directory.
- [ ] Set up Prisma schema with Auth and Post models.
- [ ] Run Prisma migration.

### Step 2: Authentication
- [ ] Configure Better Auth in `lib/auth.ts`.
- [ ] Create API route for Better Auth (`app/api/auth/[...all]/route.ts`).
- [ ] Create Login/Register pages and UI components.
- [ ] Implement middleware to protect dashboard routes.

### Step 3: CMS Dashboard & Editor
- [ ] Create Dashboard layout.
- [ ] Implement TipTap rich text editor component with Image and Code Block extensions.
- [ ] Create Server Actions for CRUD operations on Posts.
- [ ] Build the "Create Post" and "Edit Post" pages.
- [ ] Implement image upload handling (e.g., via local API route or cloud storage if configured).

### Step 4: Public API & Integration
- [ ] Create public API routes (e.g., `GET /api/posts` and `GET /api/posts/[slug]`) to allow minimal setup integration with any external site.
- [ ] Support CORS for external domains to fetch posts.
- [ ] Create a showcase page to demonstrate how the posts look (similar to the provided screenshot).

### Step 5: Refinement
- [ ] Polish UI with Tailwind CSS and shadcn/ui.
- [ ] Add loading states and error handling.
- [ ] Finalize `TODO.md` and documentation on how to integrate the CMS.

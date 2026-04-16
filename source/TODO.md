# Project TODOs

## Step 1: Initialization & Setup
- [x] Initialize `TODO.md` in the `source/` directory.
- [x] Set up Prisma schema with Auth and Post models.
- [x] Run Prisma migration.

## Step 2: Authentication
- [x] Configure Better Auth in `lib/auth.ts`.
- [x] Create API route for Better Auth (`app/api/auth/[...all]/route.ts`).
- [x] Create Login/Register pages and UI components.
- [ ] Implement middleware to protect dashboard routes.

## Step 3: CMS Dashboard & Editor
- [x] Create Dashboard layout.
- [x] Implement TipTap rich text editor component with Image and Code Block extensions.
- [x] Create Server Actions for CRUD operations on Posts.
- [x] Build the "Create Post" and "Edit Post" pages.
- [x] Implement image upload handling (e.g., via local API route or cloud storage if configured).

## Step 4: Public API & Integration
- [x] Create public API routes (e.g., `GET /api/posts` and `GET /api/posts/[slug]`) to allow minimal setup integration with any external site.
- [x] Support CORS for external domains to fetch posts.
- [x] Create a showcase page to demonstrate how the posts look (similar to the provided screenshot).
- [x] Create an embeddable script (`embed.js`) that renders posts via Shadow DOM for external sites.

## Step 5: Refinement
- [x] Polish UI with Tailwind CSS and shadcn/ui.
- [x] Add loading states and error handling.
- [x] Finalize `TODO.md` and documentation on how to integrate the CMS.

## Progress Log

### 2026-04-15T16:37:28Z
- Initialized TODO.md, setup Prisma schema with Auth and Post models, generated and synced DB.
- Configured Better Auth, API route handler, and initial AuthPage UI.
- Implemented TipTap Editor component with core extensions (Image, CodeBlock).

### 2026-04-15T16:42:09Z
- Created Dashboard layout and post list page.
- Created Server Actions for CRUD operations on Posts.
- Built "Create Post" and "Edit Post" pages with PostEditor integration.
- Implemented local image upload API route.

### 2026-04-15T16:45:34Z
- Implemented public API routes for fetching posts with CORS enabled.
- Created showcase page and individual post view page to demonstrate frontend integration.
- Added `@tailwindcss/typography` for rich text rendering.
- Finalized CMS integration and `TODO.md` tracking.

### 2026-04-15T17:03:40Z
- Implemented `embed.js` for dropping the CMS into any external website.
- Created `embed-demo.html` to demonstrate the standalone drop-in functionality using Shadow DOM.

### 2026-04-15T17:19:16Z
- Redesigned the Auth screen (`app/auth/page.tsx`) with a professional, elegant Google-like UI.
- Improved error handling and loading states in the authentication flow.

### 2026-04-15T18:44:13Z
- Updated `embed.js` to support dynamic URL routing via query parameters (`?post=slug`).
- Updated `embed-demo.html` to showcase seamless single-page post rendering using the `data-link-format` configuration.
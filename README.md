# SocialPing Server

Express.js API server with Supabase integration for social media monitoring.

## Setup

1. **Install dependencies:**

   ```bash
   pnpm install
   npm install
   yarn install
   ```

2. **Set up Supabase:**

   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and service role key
   - Run the migration to create tables:
     ```sql
     -- Copy and paste the contents of supabase/migrations/001_initial_schema.sql
     -- into your Supabase SQL editor and run it
     ```

3. **Environment variables:**

   ```bash
   cp .env.example .env
   # Fill in your actual values
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Keywords

- `GET /api/keywords` - Get user's keywords
- `POST /api/keywords` - Add new keyword
- `DELETE /api/keywords/:id` - Delete keyword
- `PATCH /api/keywords/:id/toggle` - Toggle keyword active status

### Mentions

- `GET /api/mentions` - Get user's mentions (paginated)
- `PATCH /api/mentions/:id/read` - Mark mention as read
- `GET /api/mentions/stats` - Get mention statistics

## Database Schema

The server uses Supabase (PostgreSQL) with the following tables:

- **users** - User profiles linked to Supabase Auth
- **keywords** - Keywords to monitor per user
- **mentions** - Social media mentions found for keywords

## Architecture

```
┌─────────────────┐    HTTP/REST API    ┌─────────────────┐    Supabase SDK    ┌─────────────────┐
│   Next.js       │ ──────────────────► │   Express.js    │ ──────────────────► │   Supabase      │
│   Client        │ ◄────────────────── │   Server        │ ◄────────────────── │   Database      │
└─────────────────┘    JSON Responses   └─────────────────┘    Database Ops     └─────────────────┘
```

## Features

- 🔐 **JWT Authentication** with Supabase Auth integration
- 🔍 **Social Media Monitoring** (Twitter, Reddit, LinkedIn, YouTube)
- 📧 **Email Alerts** via Resend
- 🛡️ **Row Level Security** for data protection
- ⚡ **Real-time capabilities** ready for future features
- 📊 **Analytics and Statistics**

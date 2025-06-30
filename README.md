<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-react/lucide/main/icons/bell.svg" alt="SocialPing Logo" width="80" height="80">
  
  # 🔔 SocialPing
  
  **Monitor Your Online Presence Everywhere**
  
  *Get alerted when someone mentions your name, product, or brand — before it goes viral.*
  
  [![Built with Bolt.new](https://img.shields.io/badge/Built%20with-Bolt.new-orange?style=for-the-badge&logo=lightning)](https://bolt.new)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
  [![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
  
</div>

---

## 🎯 What is SocialPing?

SocialPing is a powerful **mini SaaS platform** that helps startups, creators, and brands monitor their online presence across multiple social media platforms. Never miss an important conversation about your brand again!

### 🚀 **Key Features**

- 🔍 **Multi-Platform Monitoring** - Track mentions across Twitter/X, Reddit, LinkedIn, and YouTube
- ⚡ **Real-Time Alerts** - Get instant email notifications when someone mentions your keywords
- 📊 **Smart Analytics** - Visualize mention trends and track sentiment over time
- 🛡️ **Brand Protection** - Monitor brand sentiment and respond before issues escalate
- 👥 **Team Collaboration** - Share insights with your team and assign mentions for follow-up
- 🤖 **Automation** - Set it and forget it - our system works 24/7

---

## 🎯 Use Cases

| Target User | Problem Solved |
|-------------|----------------|
| 🚀 **Startups** | Know when people mention their product |
| 🎨 **Influencers** | Track personal name or handle across social platforms |
| 🏢 **Brands** | Monitor brand sentiment or competitor mentions |
| 🏛️ **Agencies** | Offer monitoring as a service to multiple clients |

---

## 🧩 MVP Features

### ✅ **Completed Features**

- 🔐 **Authentication System** - Secure JWT-based auth with Supabase
- 🔑 **Keyword Management** - Add, edit, and manage monitoring keywords
- 📱 **Social Media Monitoring** - Real-time polling of Twitter and Reddit APIs
- 📊 **User Dashboard** - Beautiful interface to view and manage mentions
- 📧 **Email Alerts** - Automated notifications for new mentions
- 🎨 **Modern UI** - Built with Next.js, Tailwind CSS, and shadcn/ui

### 🔮 **Future Enhancements**

- 🤖 **AI Sentiment Analysis** - Advanced sentiment detection
- 📱 **Mobile App** - iOS and Android applications
- 🔗 **Slack/Teams Integration** - Direct notifications to team channels
- 📈 **Advanced Analytics** - Deeper insights and reporting
- 🌍 **Multi-language Support** - Global reach capabilities

---

## 💸 Pricing Model

<div align="center">

| Plan | Price | Features |
|------|-------|----------|
| 🆓 **Free** | $0/month | 1 keyword, 12-hour delay, dashboard only |
| ⭐ **Pro** | $9/month | 5 keywords, real-time alerts, email notifications |
| 🚀 **Enterprise** | $19/month | Unlimited keywords, team access, platform filters |

</div>

---

## 🛠️ Tech Stack

### 🎨 **Frontend**
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **Language**: TypeScript
- **State Management**: React Context API
- **Charts**: Recharts for analytics visualization

### ⚙️ **Backend**
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **Authentication**: JWT with Supabase Auth
- **Database**: PostgreSQL (Supabase)
- **Email**: Resend for transactional emails
- **Cron Jobs**: node-cron for scheduled monitoring

### 🔌 **APIs & Services**
- **Twitter/X**: Official Twitter API v2
- **Reddit**: Public JSON API
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Email**: Resend API
- **Hosting**: Ready for Vercel (Frontend) + Railway/Render (Backend)

### 🏗️ **Architecture**

```
┌─────────────────┐    HTTP/REST API    ┌─────────────────┐    Supabase SDK    ┌─────────────────┐
│   Next.js       │ ──────────────────► │   Express.js    │ ──────────────────► │   Supabase      │
│   Client        │ ◄────────────────── │   Server        │ ◄────────────────── │   Database      │
└─────────────────┘    JSON Responses   └─────────────────┘    Database Ops     └─────────────────┘
```

---

## 🚀 Quick Start

### 📋 **Prerequisites**

- Node.js 18+ and npm/yarn/pnpm
- Supabase account
- Twitter Developer Account (for Twitter API)
- Resend account (for emails)

### 🔧 **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/socialpingg.git
   cd socialping
   ```

2. **Install dependencies**
   ```bash
   # Install client dependencies
   cd client
   npm install
   
   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy environment files
   cp client/.env.example client/.env
   cp server/.env.example server/.env
   ```

---

## ⚙️ Configuration

### 🗄️ **Database Setup (Supabase)**

1. **Create a Supabase project** at [supabase.com](https://supabase.com)

2. **Run the database migration**
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of `supabase/migrations/20250630031541_emerald_harbor.sql`
   - Execute the migration

3. **Get your credentials**
   - Project URL: `https://your-project.supabase.co`
   - Anon Key: Found in Settings > API
   - Service Role Key: Found in Settings > API (keep this secret!)

### 🔑 **Environment Variables**

#### **Client (.env)**
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

#### **Server (.env)**
```env
# Database
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Authentication
JWT_SECRET=your-super-secret-jwt-key

# Social Media APIs
TWITTER_BEARER_TOKEN=your-twitter-bearer-token

# Email Service
RESEND_API_KEY=your-resend-api-key

# Server Configuration
PORT=4000
NODE_ENV=development
```

### 🐦 **Twitter API Setup**

1. **Apply for Twitter Developer Account** at [developer.twitter.com](https://developer.twitter.com)
2. **Create a new app** and get your Bearer Token
3. **Add the Bearer Token** to your server `.env` file

### 📧 **Email Setup (Resend)**

1. **Sign up at Resend** [resend.com](https://resend.com)
2. **Get your API key** from the dashboard
3. **Add the API key** to your server `.env` file

---

## 🏃‍♂️ Running the Application

### 🖥️ **Development Mode**

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on `http://localhost:4000`

2. **Start the frontend client** (in a new terminal)
   ```bash
   cd client
   npm run dev
   ```
   Client will run on `http://localhost:3000`

3. **Visit the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

### 🏗️ **Production Build**

1. **Build the client**
   ```bash
   cd client
   npm run build
   ```

2. **Build the server**
   ```bash
   cd server
   npm run build
   ```

3. **Start production servers**
   ```bash
   # Start backend
   cd server
   npm start
   
   # Start frontend
   cd client
   npm start
   ```

---

## 📁 Project Structure

```
socialping/
├── 📁 client/                 # Next.js frontend application
│   ├── 📁 app/               # App router pages
│   │   ├── 📁 (auth)/        # Authentication pages
│   │   ├── 📁 dashboard/     # Dashboard pages
│   │   └── 📄 page.tsx       # Landing page
│   ├── 📁 components/        # Reusable UI components
│   │   ├── 📁 ui/           # shadcn/ui components
│   │   └── 📁 charts/       # Chart components
│   ├── 📁 contexts/         # React contexts
│   ├── 📁 lib/              # Utility functions
│   └── 📄 package.json      # Client dependencies
│
├── 📁 server/                # Express.js backend API
│   ├── 📁 src/              # Source code
│   │   ├── 📁 routes/       # API route handlers
│   │   ├── 📁 services/     # Business logic services
│   │   ├── 📁 middleware/   # Express middleware
│   │   ├── 📁 config/       # Configuration files
│   │   └── 📄 index.ts      # Server entry point
│   └── 📄 package.json      # Server dependencies
│
├── 📁 supabase/             # Database migrations
│   └── 📁 migrations/       # SQL migration files
│
└── 📄 README.md             # This file
```

---

## 🔌 API Endpoints

### 🔐 **Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user  
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### 🔑 **Keywords**
- `GET /api/keywords` - Get user's keywords
- `POST /api/keywords` - Add new keyword
- `DELETE /api/keywords/:id` - Delete keyword
- `PATCH /api/keywords/:id/toggle` - Toggle keyword status

### 💬 **Mentions**
- `GET /api/mentions` - Get user's mentions (paginated)
- `PATCH /api/mentions/:id/read` - Mark mention as read
- `GET /api/mentions/stats` - Get mention statistics

---

## 🗃️ Database Schema

### 👥 **Users Table**
```sql
users (
  id uuid PRIMARY KEY,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  plan text DEFAULT 'free',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
)
```

### 🔑 **Keywords Table**
```sql
keywords (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users(id),
  keyword text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
)
```

### 💬 **Mentions Table**
```sql
mentions (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users(id),
  keyword_id uuid REFERENCES keywords(id),
  platform text NOT NULL,
  text text NOT NULL,
  url text NOT NULL,
  author text NOT NULL,
  published_at timestamptz NOT NULL,
  is_read boolean DEFAULT false,
  sentiment text,
  created_at timestamptz DEFAULT now()
)
```

---

## 🔒 Security Features

- 🛡️ **Row Level Security (RLS)** - Database-level access control
- 🔐 **JWT Authentication** - Secure token-based auth
- 🚫 **Rate Limiting** - API abuse prevention
- 🔒 **CORS Protection** - Cross-origin request security
- 🛡️ **Helmet.js** - Security headers
- 🔑 **Environment Variables** - Secure credential management

---

## 🚀 Deployment

### 🌐 **Frontend (Vercel)**

1. **Connect your GitHub repo** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on every push to main

### ⚙️ **Backend (Railway/Render)**

1. **Connect your GitHub repo** to Railway or Render
2. **Set environment variables** in the platform dashboard
3. **Configure build command**: `npm run build`
4. **Configure start command**: `npm start`

### 🗄️ **Database (Supabase)**

- Already hosted and managed by Supabase
- Automatic backups and scaling
- Built-in monitoring and analytics

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **🍴 Fork the repository**
2. **🌿 Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **💾 Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **📤 Push to the branch** (`git push origin feature/amazing-feature`)
5. **🔄 Open a Pull Request**

### 📋 **Development Guidelines**

- Follow TypeScript best practices
- Use conventional commit messages
- Add tests for new features
- Update documentation as needed
- Ensure code passes linting and formatting

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **🔥 Built with [Bolt.new](https://bolt.new)** - The fastest way to build full-stack applications
- **🎨 UI Components** by [shadcn/ui](https://ui.shadcn.com/)
- **🗄️ Database & Auth** by [Supabase](https://supabase.com/)
- **📧 Email Service** by [Resend](https://resend.com/)
- **🐦 Social APIs** by Twitter and Reddit

---

## 📞 Support

- 📧 **Email**: support@socialping.com
- 💬 **Discord**: [Join our community](https://discord.gg/socialping)
- 📖 **Documentation**: [docs.socialping.com](https://docs.socialping.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/socialping/issues)

---

<div align="center">
  
  **⭐ Star this repo if you find it helpful!**
  
  Made with ❤️ by the SocialPing team
  
  [![Built with Bolt.new](https://img.shields.io/badge/Built%20with-Bolt.new-orange?style=flat-square&logo=lightning)](https://bolt.new)
  
</div>
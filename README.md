# AuraMail 🚀 - AI-Powered Email Generator

AuraMail is a premium, AI-driven email crafting tool designed to help users generate and polish professional emails in seconds. It leverages the power of Large Language Models (LLMs) via Groq and LangChain, featuring a personalized writing style engine and a robust PostgreSQL-backed history system.

![AuraMail Preview](https://via.placeholder.com/1200x600.png?text=AuraMail+Interface+Preview)

## ✨ Features

- **AI Email Generation**: Generate high-quality drafts based on topics, tone, and specific audience requirements.
- **Smart Improvement**: Paste your rough drafts and let AI polish them for better flow, grammar, and professionalism.
- **Personalized Writing Style**: An AI-powered engine that analyzes your email history to create a custom writing style profile.
- **Usage Limiting**: Built-in daily credit system (10 credits/day) with a sleek progress UI.
- **Secure Authentication**: Robust JWT-based auth system with persistent sessions.
- **Admin Dashboard**: Centralized management for administrators to monitor users and email generations.
- **Premium UI/UX**: Modern dark-themed interface built with Tailwind CSS and smooth micro-animations.

## 🛠️ Tech Stack

### Frontend
- **React (Vite)**: Core framework for a fast, modern UI.
- **Tailwind CSS**: Utility-first styling for a premium aesthetic.
- **Lucide React**: Clean and consistent iconography.
- **Axios**: Centralized API handling with automated request interceptors for JWT.

### Backend
- **Node.js & Express**: Scalable server-side logic.
- **Prisma ORM**: Modern database toolkit for PostgreSQL.
- **PostgreSQL**: Reliable relational data storage.
- **LangChain & Groq**: High-performance AI integration using LLaMA 3.
- **Zod**: Strict server-side input validation and type safety.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [PostgreSQL](https://www.postgresql.org/)
- [Groq API Key](https://console.groq.com/)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Divyanshukhatri-51/emailMaster.git
   cd emailMaster
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5001
   DATABASE_URL="postgresql://user:password@localhost:5432/aura_mail"
   JWT_SECRET="your_jwt_secret"
   GROQ_API_KEY="your_groq_api_key"
   NODE_ENV="development"
   ```
   Initialize the database:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   ```
   Create a `.env` file in the `client` directory:
   ```env
   VITE_API_URL="http://localhost:5001/api"
   VITE_NODE_ENV="development"
   ```

### Running Locally

1. **Start Backend Server**
   ```bash
   cd server
   npm run dev
   ```

2. **Start Frontend App**
   ```bash
   cd client
   npm run dev
   ```

---

## 🔒 Security & Performance
- **Validation**: Every request is validated using Zod schemas before reaching the controller.
- **Rate Limiting**: Integrated middleware to prevent API abuse.
- **Database Indexing**: Optimized PostgreSQL queries through Prisma.
- **Auth Guard**: Role-based access control (RBAC) for user and admin routes.

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

---
Built with ❤️ by [Divyanshu Khatri](https://github.com/Divyanshukhatri-51)

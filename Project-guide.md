# Project Setup Guide

This guide provides comprehensive instructions for setting up, configuring, and running the 360 Explorer project locally.

---

## Prerequisites

To run this project, ensure the following software is installed on your machine:

- **Node.js (v18.x or higher)**: The JavaScript runtime required to execute both frontend and backend code.
- **npm (v9.x or higher)**: The default package manager for Node.js, used to install and manage project dependencies.
- **PostgreSQL (v14.x or higher)**: The primary relational database used for storing users, adventures, bookings, and audit logs.
- **Git**: Required for version control and cloning the project repository.
- **VS Code (Recommended)**: An optional but highly recommended IDE with support for TypeScript and Prisma.

---

## Project Installation

### Clone Repository

First, download the source code by cloning the repository and navigating into the project directory:

```bash
git clone <repository-url>
cd 360-Explorers-main
```

### Install Dependencies

The project is split into a Next.js frontend and an Express backend. You must install dependencies for both.

**Frontend (Root Directory):**

```bash
npm install
```

*This command reads the root `package.json` and installs Next.js, React, Framer Motion, and other UI-related libraries.*

**Backend:**

```bash
cd backend
npm install
```

*This command installs server-side dependencies like Express, Razorpay, ExcelJS, and JWT handling libraries.*

---

## Environment Variables Configuration

The application requires specific environment variables to handle database connections, authentication, and payments.

### Configuration Files

1. **.env**: Created in the root directory for general settings.
2. **.env.local**: (Optional) For local development overrides (Next.js automatically detects this).
3. **backend/.env**: Required for the Express server to connect to the database and external services.

### Sample Configuration

Create a `.env` file in the **root** and a duplicate/relevant one in the **backend** folder:

```env
# Database
DATABASE_URL="postgresql://postgres:Explore%23360@localhost:5432/360_explorer_db"

# Authentication
JWT_SECRET="your_jwt_secret_here"
NEXTAUTH_SECRET="your_nextauth_secret_here"
NEXTAUTH_URL="http://localhost:3000"

# Server
PORT=5001

# Payment Gateway
RAZORPAY_KEY_ID="rzp_test_your_id"
RAZORPAY_KEY_SECRET="your_razorpay_secret"

# WhatsApp Configuration (Optional)
NEXT_PUBLIC_WHATSAPP_NUMBER="917770000206"
```

### Variable Descriptions:

- **DATABASE_URL**: The connection string for PostgreSQL.
- **JWT_SECRET**: Secret key for signing JSON Web Tokens.
- **NEXTAUTH_SECRET**: Used by NextAuth.js to encrypt cookies.
- **NEXTAUTH_URL**: The base URL of your application.
- **PORT**: The port number on which the backend Express server runs (default: 5001).
- **RAZORPAY_KEY_ID/SECRET**: Your credentials from the Razorpay Dashboard (Test Mode).

---

## Database Setup

This project uses **PostgreSQL** as its core database engine due to its reliability and support for complex relations via Prisma ORM.

### Local Installation Steps

1. Download and install PostgreSQL from the [official website](https://www.postgresql.org/download/).
2. During installation, set a password for the default `postgres` user.
3. Ensure the PostgreSQL service is running.

### Create Database

Open your terminal or `psql` shell and run:

```sql
CREATE DATABASE 360explorer;
```

### Create User

```sql
CREATE USER explorer_admin WITH PASSWORD 'Explore%23';
```

### Grant Permissions

```sql
GRANT ALL PRIVILEGES ON DATABASE 360explorer TO explorer_admin;
```

### Verify Connection

```bash
psql -h localhost -U explorer_admin -d 360explorer
```

---

## Database Connection Setup

1. **Install Database**: Install PostgreSQL on your OS.
2. **Create Database**: Use `createdb` or SQL commands to create `360explorer`.
3. **Create User**: Setup a dedicated user for the application.
4. **Configure DATABASE_URL**: Update the `.env` file with your credentials:
   - Example: `postgresql://explorer_admin:secure_password@localhost:5432/360explorer`
5. **Test Connection**: Run the Prisma migration command to verify the link.

---

## ORM Setup (Prisma)

The project uses Prisma to interact with the database. Follow these steps to sync your schema:

### Install Prisma CLI

```bash
npm install prisma --save-dev
```

### Generate Client

```bash
npx prisma generate
```

*Creates the type-safe database client used in the code.*

### Run Migration

```bash
npx prisma migrate dev --name init
```

*Creates the actual tables in your PostgreSQL database based on `schema.prisma`.*

### Open Prisma Studio

```bash
npx prisma studio
```

*Opens a GUI in your browser (usually at `http://localhost:5555`) to view and edit database data.*

---

## Backend Setup

The backend serves the API for payments, bookings, and user management.

### Run Backend Development Server

```bash
cd backend
npm run dev
```

*Starts the Express server on port 5001 using `ts-node`.*

### Production Build

```bash
npm run build
```

*Compiles TypeScript into optimized JavaScript.*

### Production Start

```bash
npm start
```

*Runs the compiled production server.*

---

## Frontend Setup

The frontend is built with Next.js and Tailwind CSS.

### Run Frontend Development Server

```bash
npm run dev
```

*Starts the Next.js development server at `http://localhost:3000`.*

### Build Frontend

```bash
npm run build
```

*Generates an optimized production build.*

### Start Production Frontend

```bash
npm start
```

*Starts the production-ready Next.js server.*

---

## Running Full Project

To run the entire application successfully, follow this exact sequence:

1. **Step 1: Start Database**: Ensure PostgreSQL service is active.
2. **Step 2: Run Migrations**: `npx prisma migrate dev` (Run from root).
3. **Step 3: Start Backend**: `cd backend && npm run dev`.
4. **Step 4: Start Frontend**: In a new terminal (root), `npm run dev`.
5. **Step 5: Open Browser**: Navigate to `http://localhost:3000`.

---

## Common Development Commands

| Command                    | Description                   |
| :------------------------- | :---------------------------- |
| `npm install`            | Install all dependencies      |
| `npm run dev`            | Start development environment |
| `npm run build`          | Create production build       |
| `npm run start`          | Run production server         |
| `npx prisma generate`    | Generate Prisma client        |
| `npx prisma migrate dev` | Apply schema changes to DB    |
| `npx prisma studio`      | Open database visualizer      |

---

## Troubleshooting

- **Database connection failed**: Check if PostgreSQL is running and your `DATABASE_URL` credentials are correct.
- **Migration errors**: Ensure the database exists and the user has `CREATE` permissions. Try `npx prisma migrate reset` as a last resort (Warning: deletes data).
- **Environment variable errors**: Ensure `.env` exists in both the root and `backend` directories.
- **Port already in use**: If port 3000 or 5001 is busy, find the process and kill it: `npx kill-port 3000`.
- **Backend not connecting to DB**: Verify the `backend/.env` file has the correct `DATABASE_URL`.
- **Frontend API connection issues**: Ensure the `baseUrl` in frontend fetch calls matches the backend port (5001).

---

## Verification Checklist

- [ ] PostgreSQL Database is running
- [ ] Environment variables configured in `.env` (Root & Backend)
- [ ] Dependencies installed (`npm install`)
- [ ] Prisma migrations executed (`npx prisma migrate dev`)
- [ ] Backend server running on port 5001
- [ ] Frontend server running on port 3000
- [ ] Database connected successfully (Verify via Prisma Studio)
- [ ] Application accessible at `http://localhost:3000`

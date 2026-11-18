# 🍱 FoodHub

> **"Discover & Order Delicious Meals"**

FoodHub is a full-stack web application for meal ordering. Customers can browse menus from various food providers, place orders, and track delivery status. Providers can manage their menus and fulfill orders. Admins oversee the platform and manage all users.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Roles & Permissions](#-roles--permissions)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Pages & Routes](#-pages--routes)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Order Flow](#-order-flow)

---

## ✨ Features

### 🌍 Public
- Browse all available meals and providers
- Filter meals by cuisine, dietary preferences, and price
- View provider profiles with their menus

### 👤 Customer
- Register & login as a customer
- Add meals to cart
- Place orders with delivery address (Cash on Delivery)
- Track real-time order status
- Leave reviews after ordering
- Manage profile

### 🍳 Provider
- Register & login as a provider
- Add, edit, and remove menu items
- View & manage incoming orders
- Update order status (Preparing → Ready → Delivered)

### 🛡️ Admin
- View all users (customers and providers)
- Manage user status (suspend / activate)
- View all platform orders
- Manage food categories

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | LTS | Runtime |
| **Express** | v5 | Web framework |
| **TypeScript** | v7 | Type safety |
| **Prisma ORM** | v7 | Database ORM |
| **PostgreSQL** | — | Relational database |
| **Better Auth** | v1.7 | Authentication |
| **pnpm** | v12 | Package manager |

### Dev Tools
| Tool | Purpose |
|------|---------|
| `tsx` | TypeScript execution & watch mode |
| `dotenv` | Environment variable management |
| `cors` | Cross-origin resource sharing |

---

## 👥 Roles & Permissions

| Role | Description | Key Permissions |
|------|-------------|-----------------|
| **Customer** | Users who order meals | Browse menus, place orders, track status, leave reviews |
| **Provider** | Food vendors/restaurants | Manage menu, view orders, update order status |
| **Admin** | Platform moderators | Manage all users, oversee orders, moderate content |

> 💡 **Note:** Users select their role during registration. Admin accounts are seeded in the database.

---

## 📁 Project Structure

```
Food_Hub/
└── server/
    ├── src/
    │   ├── app.ts              # Express app setup, middleware, routes
    │   ├── server.ts           # Server entry point
    │   ├── config/
    │   │   └── index.ts        # Environment variable config
    │   └── lib/
    │       ├── auth.ts         # Better Auth configuration
    │       └── prisma.ts       # Prisma client instance
    ├── prisma/
    │   ├── schema.prisma       # Database schema
    │   └── migrations/         # Migration history
    ├── generated/
    │   └── prisma/             # Auto-generated Prisma client
    ├── .env                    # Environment variables
    ├── package.json
    ├── tsconfig.json
    └── prisma7.config.ts
```

---

## 🗄️ Database Schema

### ERD
> 📊 [View Full ERD on Google Drive](https://drive.google.com/file/d/1V1CLazRr_Agsg3w-lu-rJMsJaJwlsMq0/view?usp=drive_link)

### Models Overview

```
User ─────────────── Session
  │                   Account
  │
ProviderProfile ───── Orders ──── OrderItems ──── Meals ──── Category
  │                                                 │
  └── Reviews ──────────────────────────────────────┘
```

| Model | Table | Description |
|-------|-------|-------------|
| `User` | `user` | Auth users with role (`customer`/`provider`/`admin`) and status |
| `Session` | `session` | Better Auth session tokens |
| `Account` | `account` | OAuth/credential accounts (Better Auth) |
| `ProviderProfile` | `provider_profile` | Restaurant details linked to a User |
| `Category` | `category` | Food categories (e.g., Pizza, Sushi) |
| `Meals` | `meals` | Menu items offered by providers |
| `Orders` | `orders` | Customer orders with delivery address & status |
| `OrderItems` | `order_items` | Individual meals within an order |
| `Reviews` | `reviews` | Customer ratings & comments per meal |

### Order Status Enum
```
PENDING → PREPARED → READY → DELIVERED
                  ↘ CANCELLED
```

---

## 🔌 API Endpoints

> **Base URL:** `http://localhost:5000`

### 🔐 Authentication (Better Auth)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `POST` | `/api/auth/sign-up/email` | Register new user | ❌ |
| `POST` | `/api/auth/sign-in/email` | Login user | ❌ |
| `GET` | `/api/auth/get-session` | Get current session/user | ✅ |
| `POST` | `/api/auth/sign-out` | Logout user | ✅ |

### 🍽️ Meals & Providers (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/meals` | Get all meals (supports filters) |
| `GET` | `/api/meals/:id` | Get meal details |
| `GET` | `/api/providers` | Get all providers |
| `GET` | `/api/providers/:id` | Get provider with their menu |

### 📦 Orders
| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| `POST` | `/api/orders` | Create a new order | Customer |
| `GET` | `/api/orders` | Get user's orders | Customer |
| `GET` | `/api/orders/:id` | Get order details | Customer |

### 🍳 Provider Management
| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| `POST` | `/api/provider/meals` | Add meal to menu | Provider |
| `PUT` | `/api/provider/meals/:id` | Update a meal | Provider |
| `DELETE` | `/api/provider/meals/:id` | Remove a meal | Provider |
| `PATCH` | `/api/provider/orders/:id` | Update order status | Provider |

### 🛡️ Admin
| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| `GET` | `/api/admin/users` | Get all users | Admin |
| `PATCH` | `/api/admin/users/:id` | Update user status | Admin |
| `GET` | `/api/admin/orders` | Get all orders | Admin |
| `GET` | `/api/admin/categories` | Get all categories | Admin |
| `POST` | `/api/admin/categories` | Create a category | Admin |

---

## 🗺️ Pages & Routes

### Public Routes
| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, categories, featured meals |
| `/meals` | Browse Meals | List with filters |
| `/meals/:id` | Meal Details | Info, add to cart |
| `/providers/:id` | Provider Profile | Menu, info |
| `/login` | Login | Login form |
| `/register` | Register | Registration form |

### Customer Routes (Private)
| Route | Page | Description |
|-------|------|-------------|
| `/cart` | Cart | View cart items |
| `/checkout` | Checkout | Delivery address & confirm |
| `/orders` | My Orders | Order history |
| `/orders/:id` | Order Details | Items, status tracking |
| `/profile` | Profile | Edit user info |

### Provider Routes (Private)
| Route | Page | Description |
|-------|------|-------------|
| `/provider/dashboard` | Dashboard | Orders overview & stats |
| `/provider/menu` | Menu Management | Add/edit/remove meals |
| `/provider/orders` | Orders | View & update order status |

### Admin Routes (Private)
| Route | Page | Description |
|-------|------|-------------|
| `/admin` | Dashboard | Platform statistics |
| `/admin/users` | Users | Manage all users |
| `/admin/orders` | Orders | View all platform orders |
| `/admin/categories` | Categories | Manage food categories |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v20+
- **pnpm** v12+
- **PostgreSQL** (local or remote instance)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd Food_Hub/server
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your values (see Environment Variables section)
```

### 4. Run database migrations
```bash
pnpm prisma migrate dev
```

### 5. Start the development server
```bash
pnpm dev
```

The server will start at **http://localhost:5000**

---

## 🔧 Environment Variables

Create a `.env` file in the `server/` directory:

```env
# Server
PORT=5000

# Database
DATABASE_URL="postgres://username:password@localhost:5432/foodHubs"

# Frontend URL (for CORS & trusted origins)
APP_URL=http://localhost:3000

# Better Auth
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:5000
```

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `DATABASE_URL` | PostgreSQL connection string | `postgres://user:pass@localhost:5432/db` |
| `APP_URL` | Frontend application URL | `http://localhost:3000` |
| `BETTER_AUTH_SECRET` | Random secret for Better Auth (min 32 chars) | `3ULbDNUxeE9ZFYxQwez...` |
| `BETTER_AUTH_URL` | Backend URL used by Better Auth | `http://localhost:5000` |

> ⚠️ **Never commit your `.env` file to version control.**

---

## 🔄 Order Flow

```
Customer                Provider              System
   │                       │                    │
   │── Place Order ────────────────────────────>│
   │                       │                 [PENDING]
   │                       │<── New Order ───────│
   │                       │── Accept ──────────>│
   │                       │                 [PREPARED]
   │                       │── Mark Ready ──────>│
   │                       │                 [READY]
   │                       │── Deliver ─────────>│
   │                       │                 [DELIVERED]
   │<── Status Updates ─────────────────────────│
```

### Status Transitions

| From | To | Triggered By |
|------|----|-------------|
| `PENDING` | `PREPARED` | Provider accepts the order |
| `PREPARED` | `READY` | Provider marks food ready |
| `READY` | `DELIVERED` | Provider confirms delivery |
| `PENDING` | `CANCELLED` | Customer cancels the order |

---

## 📌 Requirement Analysis

> 📋 [View Full Requirement Analysis on Eraser](https://app.eraser.io/workspace/3xtFlRBz9MiATZKtWH37)

---

## 📄 License

This project is for educational purposes.


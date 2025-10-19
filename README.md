# NTR

A modern, production-ready monorepo built with Turborepo featuring a NestJS backend API and React frontend with Tailwind CSS. This project follows industry best practices with automated setup, code quality tools, and comprehensive development standards.

## 🚀 Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd ntr

# Run the automated setup (handles everything!)
npm run setup

# Start development environment (runs both frontend & backend)
npm run dev
```

That's it! The setup script will:

- Install all dependencies
- Configure environment variables with symlinks
- Setup Git hooks for code quality
- Configure Prettier, ESLint, and Husky
- Setup VS Code workspace settings
- Create development environment

## 📁 Project Structure

```
ntr/
├── .github/
│   └── copilot-instructions.md    # GitHub Copilot configuration
├── .husky/                        # Git hooks
├── .vscode/                       # VS Code workspace settings
├── apps/
│   ├── api/                       # NestJS Backend API
│   │   ├── src/
│   │   │   ├── main.ts           # API entry point with env config
│   │   │   ├── app.module.ts     # Main app module with ConfigModule
│   │   │   ├── app.controller.ts # API controllers
│   │   │   └── app.service.ts    # Business logic services
│   │   ├── .env -> ../../.env    # Symlinked environment file
│   │   ├── .eslintrc.js          # NestJS-specific ESLint config
│   │   └── package.json
│   └── web/                       # React Frontend
│       ├── src/
│       │   ├── App.tsx           # Main React component
│       │   ├── main.tsx          # Frontend entry point
│       │   └── index.css         # Tailwind styles
│       ├── .env -> ../../.env    # Symlinked environment file
│       ├── .eslintrc.js          # React-specific ESLint config
│       ├── index.html
│       ├── vite.config.ts
│       ├── tailwind.config.js
│       └── package.json
├── packages/
│   ├── eslint-config/            # Shared ESLint configurations
│   │   ├── index.js              # Base TypeScript config
│   │   ├── react.js              # React-specific config
│   │   └── package.json
│   └── typescript-config/        # Shared TypeScript configurations
│       ├── base.json
│       ├── react-library.json
│       └── package.json
├── scripts/
│   └── setup.js                  # Automated setup script
├── .env                          # Root environment configuration
├── .prettierrc                   # Prettier configuration
├── .prettierignore              # Prettier ignore patterns
├── .gitignore                   # Git ignore patterns
├── turbo.json                   # Turborepo configuration
└── package.json                 # Root package.json with scripts
```

## 🛠 Tech Stack

### Frontend (apps/web)

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- Runs on <http://localhost:3000>

### Backend (apps/api)

- **NestJS** with TypeScript
- **Express** under the hood
- CORS enabled for frontend communication
- Runs on <http://localhost:3001>

### Monorepo Management

- **Turborepo** for build orchestration and caching
- **npm workspaces** for package management
- Shared configurations for consistency

## 🔗 Available Endpoints

### Backend API (<http://localhost:3001>)

- `GET /` - Hello message from API
- `GET /health` - Health check endpoint

### Frontend (<http://localhost:3000>)

- Interactive dashboard showing API connection status
- Displays project tech stack
- Real-time API health monitoring

## 📋 Development Commands

```bash
# Root commands (run from project root)
npm run dev          # Start both frontend & backend in parallel
npm run build        # Build all packages
npm run lint         # Lint all packages
npm run type-check   # Type check all packages
npm run clean        # Clean build artifacts

# Individual app commands
cd apps/api
npm run dev          # Start only backend
npm run build        # Build only backend

cd apps/web
npm run dev          # Start only frontend
npm run build        # Build only frontend
```

## 🎯 Features

- **Hot Reload**: Both frontend and backend support hot reload during development
- **Type Safety**: Full TypeScript support across the entire monorepo
- **Modern Styling**: Tailwind CSS with responsive design
- **API Integration**: Frontend automatically connects to backend API
- **Build Optimization**: Turborepo caching for faster builds
- **CORS Configured**: Backend properly configured for frontend communication

## 🔧 Configuration

### Environment Setup

The project is pre-configured with:

- TypeScript configurations for both frontend and backend
- ESLint for code quality
- Tailwind CSS for styling
- NestJS with Express
- Vite for fast frontend builds

### Ports

- Frontend: <http://localhost:3000>
- Backend: <http://localhost:3001>

### CORS

The backend is configured to accept requests from the frontend running on localhost:3000.

## 🏗 Project Architecture

This monorepo follows a clean architecture pattern:

1. **Apps**: Contains the main applications (web frontend, api backend)
2. **Packages**: Shared configurations and utilities
3. **Root**: Monorepo configuration and scripts

The Turborepo configuration ensures:

- Efficient task running with caching
- Proper dependency management between packages
- Parallel execution of tasks when possible

## 🚀 Getting Started

1. **Clone and Install**

   ```bash
   npm install
   ```

2. **Start Development**

   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - Frontend: <http://localhost:3000>
   - Backend: <http://localhost:3001>

The frontend will display the connection status to the backend and show the project's tech stack.

## 📝 Next Steps

To continue developing:

1. **Add new API endpoints** in `apps/api/src/`
2. **Create new React components** in `apps/web/src/`
3. **Add shared utilities** in `packages/`
4. **Configure additional tools** as needed

The project is ready for development with hot reload, type checking, and a modern development experience!

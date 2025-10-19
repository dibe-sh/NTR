# NTR - Turborepo with NestJS & React Project Guidelines

This is a production-ready monorepo built with Turborepo containing:

- **Backend**: NestJS API server (`apps/api`) with TypeScript and ConfigModule
- **Frontend**: React application with Tailwind CSS (`apps/web`) using Vite
- **Shared**: Common utilities and configurations (`packages/*`)
- **Tooling**: ESLint, Prettier, Husky, lint-staged for code quality

## 🏗 Architecture & Development Standards

### Project Structure Guidelines

- Keep shared utilities and configurations in `packages/` directory
- Use TypeScript across the entire monorepo with strict settings
- Follow NestJS conventions for backend API development
- Use Tailwind CSS for frontend styling with utility-first approach
- Leverage Turborepo's caching for faster builds and development

### Code Quality Standards

- **ESLint**: Enforce strict TypeScript rules with import organization
- **Prettier**: Consistent code formatting across all files
- **Husky**: Pre-commit hooks for automated quality checks
- **lint-staged**: Format and lint only changed files before commit
- **TypeScript**: Strict type checking with proper interfaces and types

### Environment Configuration

- Use centralized `.env` file in root directory
- Symlinked environment files in each app (`apps/*/env -> ../../.env`)
- Environment variables properly typed and validated
- Separate configuration for development, staging, and production

### Development Workflow

- Use `npm run setup` for initial project setup (automated)
- Use `npm run dev` to start both frontend and backend simultaneously
- Backend runs on <http://localhost:3001> with CORS configured
- Frontend runs on <http://localhost:3000> with hot reload
- Both applications support hot reload during development

## 🎯 Code Organization Best Practices

### Backend (NestJS) Guidelines

- Place API routes and business logic in appropriate modules
- Use dependency injection and proper service patterns
- Implement proper error handling and validation
- Use ConfigModule for environment variable management
- Structure code with controllers, services, and modules
- Apply decorators properly for guards, interceptors, and pipes

### Frontend (React) Guidelines

- Keep React components and UI logic organized by feature
- Use TypeScript interfaces for props and state
- Implement proper error boundaries and loading states
- Follow React hooks best practices (useEffect, useState, etc.)
- Use Tailwind CSS classes for consistent styling
- Implement responsive design patterns

### Shared Code Guidelines

- Share types and utilities through workspace packages
- Use proper import paths with workspace references
- Create reusable configurations for tools (ESLint, TypeScript)
- Document shared utilities and their usage

## 🔧 Development Commands & Tooling

### Root Level Commands

```bash
npm run setup          # Initial setup (run once)
npm run cleanup        # Remove node_modules, builds, caches
npm run cleanup:pack   # Cleanup + create distributable package
npm run dev            # Start both apps in development
npm run build          # Build all packages
npm run lint           # Lint all packages
npm run lint:fix       # Fix linting issues
npm run format         # Format code with Prettier
npm run type-check     # TypeScript type checking
```

### Project Cleanup & Distribution

The `cleanup` script provides comprehensive project cleaning and packaging:

- **`npm run cleanup`**: Removes all temporary files, build outputs, and dependencies
  - Deletes all `node_modules` directories
  - Removes build outputs (`dist`, `build`, `.turbo`, `.vite`)
  - Cleans up log files and OS-generated files
  - Removes local environment files (preserves `.env.example`)
  - Clears cache directories and temporary files

- **`npm run cleanup:pack`**: Performs cleanup + creates a distributable package
  - Executes full cleanup process
  - Creates compressed `.tar.gz` archive
  - Shows package size and contents
  - Provides usage instructions for recipients

### Quality Assurance

- Pre-commit hooks automatically run linting and formatting
- Import statements are automatically organized
- Unused imports are automatically removed
- Accessibility rules are enforced for React components
- TypeScript strict mode is enabled across all packages

## 🚀 Best Practices for Implementation

### When Adding New Features

1. **Plan the architecture** - Consider where the feature belongs (frontend/backend/shared)
2. **Use TypeScript** - Define proper types and interfaces
3. **Follow patterns** - Use existing patterns for consistency
4. **Error handling** - Implement proper error boundaries and validation
5. **Testing** - Write tests for critical functionality
6. **Documentation** - Update relevant documentation

### When Modifying Existing Code

1. **Understand context** - Review existing implementation patterns
2. **Maintain consistency** - Follow established coding styles
3. **Update types** - Ensure TypeScript types are updated
4. **Test changes** - Verify functionality works correctly
5. **Run quality checks** - Ensure linting and formatting pass

### Performance Considerations

- Leverage Turborepo caching for build optimization
- Use React.memo and useMemo for expensive calculations
- Implement proper lazy loading for code splitting
- Optimize bundle sizes with proper imports
- Use proper database queries and caching strategies

## 🔒 Security & Environment Best Practices

### Environment Variables

- Never commit sensitive data to version control
- Use proper environment variable validation
- Implement different configurations for different environments
- Use TypeScript to type environment variables

### API Security

- Implement proper CORS configuration
- Use proper authentication and authorization
- Validate all inputs and sanitize data
- Implement rate limiting and security headers
- Use HTTPS in production environments

## 📚 Learning Resources & Extensions

### Recommended VS Code Extensions

- ESLint for code quality
- Prettier for code formatting
- Tailwind CSS IntelliSense
- TypeScript Hero for import organization
- Auto Rename Tag for HTML/JSX
- Path Intellisense for file paths

### Documentation References

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [NestJS Documentation](https://docs.nestjs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## ⚡ Performance & Optimization Guidelines

### Build Optimization

- Use Turborepo's intelligent caching system
- Implement proper code splitting and lazy loading
- Optimize asset loading and bundle sizes
- Use proper import strategies to reduce bundle size

### Development Experience

- Utilize hot reload for rapid development
- Use TypeScript for better IDE support and error catching
- Leverage shared configurations to maintain consistency
- Implement proper debugging tools and practices

Remember: This NTR project is designed for scalability and maintainability. Always consider the long-term implications of architectural decisions and maintain consistency with established patterns.

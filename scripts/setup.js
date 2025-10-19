#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI color codes for better output
const colors = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function success(message) {
  log(`✅ ${message}`, colors.green);
}

function info(message) {
  log(`ℹ️  ${message}`, colors.blue);
}

function warning(message) {
  log(`⚠️  ${message}`, colors.yellow);
}

function error(message) {
  log(`❌ ${message}`, colors.red);
}

function setupEnvironment() {
  info('Setting up environment configuration...');

  const rootEnvPath = path.join(__dirname, '..', '.env');
  const apiEnvPath = path.join(__dirname, '..', 'apps', 'api', '.env');
  const webEnvPath = path.join(__dirname, '..', 'apps', 'web', '.env');

  // Create root .env if it doesn't exist
  if (!fs.existsSync(rootEnvPath)) {
    const envContent = `# NTR Environment Variables
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ntr"

# API Configuration
API_PORT=3001
API_HOST=localhost

# Frontend Configuration
VITE_API_URL=http://localhost:3001
VITE_APP_TITLE="NTR"

# Development
NODE_ENV=development
LOG_LEVEL=debug

# CORS Origins (comma-separated)
CORS_ORIGINS="http://localhost:3000,http://127.0.0.1:3000"
`;
    fs.writeFileSync(rootEnvPath, envContent);
    success('Created root .env file');
  }

  // Create symlinks for apps
  try {
    // Remove existing files/symlinks
    if (fs.existsSync(apiEnvPath)) {
      fs.unlinkSync(apiEnvPath);
    }
    if (fs.existsSync(webEnvPath)) {
      fs.unlinkSync(webEnvPath);
    }

    // Create symlinks
    fs.symlinkSync('../../.env', apiEnvPath);
    fs.symlinkSync('../../.env', webEnvPath);

    success('Created environment symlinks for apps');
  } catch (err) {
    warning('Could not create symlinks (this is normal on Windows)');
    // Copy files instead of symlinks for Windows compatibility
    fs.writeFileSync(apiEnvPath, fs.readFileSync(rootEnvPath));
    fs.writeFileSync(webEnvPath, fs.readFileSync(rootEnvPath));
    success('Copied environment files to apps');
  }
}

function setupGitHooks() {
  info('Setting up Git hooks...');

  try {
    execSync('npx husky install', { stdio: 'inherit' });

    // Create pre-commit hook
    const preCommitHook = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
`;

    // Create .husky directory if it doesn't exist
    const huskyDir = '.husky';
    if (!fs.existsSync(huskyDir)) {
      fs.mkdirSync(huskyDir, { recursive: true });
    }
    
    fs.writeFileSync('.husky/pre-commit', preCommitHook);

    // Make it executable
    if (process.platform !== 'win32') {
      execSync('chmod +x .husky/pre-commit');
    }

    success('Git hooks configured');
  } catch (err) {
    error('Failed to setup Git hooks: ' + err.message);
  }
}

function setupLintStaged() {
  info('Configuring lint-staged...');

  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  packageJson['lint-staged'] = {
    '*.{js,ts,tsx}': ['eslint --fix', 'prettier --write'],
    '*.{json,css,md}': ['prettier --write'],
  };

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  success('lint-staged configuration added');
}

function setupPrettierConfig() {
  info('Setting up Prettier configuration...');

  const prettierConfig = {
    semi: true,
    trailingComma: 'es5',
    singleQuote: true,
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
    quoteProps: 'as-needed',
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: 'avoid',
    endOfLine: 'lf',
  };

  fs.writeFileSync('.prettierrc', JSON.stringify(prettierConfig, null, 2) + '\n');

  const prettierIgnore = `# Dependencies
node_modules/

# Build outputs
dist/
build/
.next/
.turbo/

# Environment files
.env
.env.local
.env.production.local
.env.development.local

# Logs
*.log
npm-debug.log*
yarn-debug.log*

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo

# Package manager files
package-lock.json
yarn.lock
pnpm-lock.yaml
`;

  fs.writeFileSync('.prettierignore', prettierIgnore);
  success('Prettier configuration created');
}

function setupVSCodeSettings() {
  info('Setting up VS Code workspace settings...');

  const vscodeDir = path.join(__dirname, '..', '.vscode');
  if (!fs.existsSync(vscodeDir)) {
    fs.mkdirSync(vscodeDir, { recursive: true });
  }

  const settings = {
    'editor.formatOnSave': true,
    'editor.defaultFormatter': 'esbenp.prettier-vscode',
    'editor.codeActionsOnSave': {
      'source.fixAll.eslint': 'explicit',
      'source.organizeImports': 'explicit',
    },
    'typescript.preferences.importModuleSpecifier': 'relative',
    'eslint.workingDirectories': ['apps/web', 'apps/api'],
    'files.associations': {
      '*.css': 'tailwindcss',
    },
    'tailwindCSS.includeLanguages': {
      typescript: 'typescript',
      typescriptreact: 'typescriptreact',
    },
    'tailwindCSS.experimental.classRegex': [
      ['clsx\\(([^)]*)\\)', "(?:'|\"|`)([^']*)(?:'|\"|`)"],
      ['classnames\\(([^)]*)\\)', "(?:'|\"|`)([^']*)(?:'|\"|`)"],
      ['cn\\(([^)]*)\\)', "(?:'|\"|`)([^']*)(?:'|\"|`)"],
    ],
  };

  const extensions = {
    recommendations: [
      'esbenp.prettier-vscode',
      'dbaeumer.vscode-eslint',
      'bradlc.vscode-tailwindcss',
      'ms-vscode.vscode-typescript-next',
      'formulahendry.auto-rename-tag',
      'christian-kohler.path-intellisense',
      'ms-vscode-remote.remote-containers',
    ],
  };

  fs.writeFileSync(path.join(vscodeDir, 'settings.json'), JSON.stringify(settings, null, 2) + '\n');
  fs.writeFileSync(path.join(vscodeDir, 'extensions.json'), JSON.stringify(extensions, null, 2) + '\n');

  success('VS Code workspace configured');
}

function installDependencies() {
  info('Installing dependencies...');

  try {
    execSync('npm install', { stdio: 'inherit' });
    success('Dependencies installed');
  } catch (err) {
    error('Failed to install dependencies: ' + err.message);
    process.exit(1);
  }
}

function main() {
  log('\n🚀 NTR Project Setup\n', colors.bold + colors.blue);

  try {
    installDependencies();
    setupEnvironment();
    setupPrettierConfig();
    setupGitHooks();
    setupLintStaged();
    setupVSCodeSettings();

    log('\n🎉 Setup completed successfully!\n', colors.bold + colors.green);

    info('Next steps:');
    log('  1. Review and update the .env file with your configuration');
    log('  2. Run "npm run dev" to start the development servers');
    log('  3. Open the project in VS Code for the best development experience');
    log('  4. Install recommended VS Code extensions when prompted\n');
  } catch (err) {
    error('Setup failed: ' + err.message);
    process.exit(1);
  }
}

main();

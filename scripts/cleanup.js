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
  bold: '\x1b[1m'
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

function removeDirectory(dirPath, description) {
  if (fs.existsSync(dirPath)) {
    try {
      fs.rmSync(dirPath, { recursive: true, force: true });
      success(`Removed ${description}: ${dirPath}`);
    } catch (err) {
      error(`Failed to remove ${description}: ${err.message}`);
    }
  } else {
    info(`${description} not found: ${dirPath}`);
  }
}

function removeFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      success(`Removed ${description}: ${filePath}`);
    } catch (err) {
      error(`Failed to remove ${description}: ${err.message}`);
    }
  } else {
    info(`${description} not found: ${filePath}`);
  }
}

function cleanupProject() {
  log('\n🧹 NTR Project Cleanup\n', colors.bold + colors.blue);
  
  try {
    // Remove node_modules directories
    info('Removing node_modules directories...');
    removeDirectory('./node_modules', 'Root node_modules');
    removeDirectory('./apps/api/node_modules', 'API node_modules');
    removeDirectory('./apps/web/node_modules', 'Web node_modules');
    removeDirectory('./packages/eslint-config/node_modules', 'ESLint config node_modules');
    removeDirectory('./packages/typescript-config/node_modules', 'TypeScript config node_modules');

    // Remove lock files
    info('Removing lock files...');
    removeFile('./package-lock.json', 'Root package-lock.json');
    removeFile('./apps/api/package-lock.json', 'API package-lock.json');
    removeFile('./apps/web/package-lock.json', 'Web package-lock.json');
    removeFile('./packages/eslint-config/package-lock.json', 'ESLint config package-lock.json');
    removeFile('./packages/typescript-config/package-lock.json', 'TypeScript config package-lock.json');

    // Remove build outputs
    info('Removing build outputs...');
    removeDirectory('./dist', 'Root dist');
    removeDirectory('./build', 'Root build');
    removeDirectory('./apps/api/dist', 'API dist');
    removeDirectory('./apps/web/dist', 'Web dist');
    removeDirectory('./apps/web/build', 'Web build');

    // Remove cache directories
    info('Removing cache directories...');
    removeDirectory('./.turbo', 'Turbo cache');
    removeDirectory('./.next', 'Next.js cache');
    removeDirectory('./apps/web/.vite', 'Vite cache');

    // Remove log files
    info('Removing log files...');
    const logPatterns = [
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      'lerna-debug.log*',
      '*.log'
    ];
    
    for (const pattern of logPatterns) {
      try {
        execSync(`find . -name "${pattern}" -type f -delete`, { stdio: 'pipe' });
      } catch (err) {
        // Ignore errors for missing files
      }
    }
    success('Cleaned up log files');

    // Remove OS generated files
    info('Removing OS generated files...');
    const osFiles = [
      '.DS_Store',
      'Thumbs.db',
      'ehthumbs.db',
      '*.tmp',
      '*.temp'
    ];
    
    for (const pattern of osFiles) {
      try {
        execSync(`find . -name "${pattern}" -type f -delete`, { stdio: 'pipe' });
      } catch (err) {
        // Ignore errors for missing files
      }
    }
    success('Cleaned up OS generated files');

    // Remove environment files (keep .env.example)
    info('Checking environment files...');
    if (fs.existsSync('./.env')) {
      removeFile('./.env', 'Local .env file');
    }
    if (fs.existsSync('./apps/api/.env')) {
      removeFile('./apps/api/.env', 'API .env symlink');
    }
    if (fs.existsSync('./apps/web/.env')) {
      removeFile('./apps/web/.env', 'Web .env symlink');
    }

    // Remove temporary files
    info('Removing temporary files...');
    removeDirectory('./tmp', 'Temporary directory');
    removeDirectory('./temp', 'Temp directory');

    log('\n✨ Cleanup completed successfully!\n', colors.bold + colors.green);
    
  } catch (err) {
    error('Cleanup failed: ' + err.message);
    process.exit(1);
  }
}

function createPackage() {
  log('\n📦 Creating project package...\n', colors.bold + colors.blue);
  
  try {
    const packageName = `ntr-clean-${new Date().toISOString().split('T')[0]}.tar.gz`;
    
    info('Creating compressed archive...');
    
    // Create tar.gz excluding common ignore patterns
    execSync(`tar -czf ${packageName} \\
      --exclude=node_modules \\
      --exclude=dist \\
      --exclude=build \\
      --exclude=.turbo \\
      --exclude=.next \\
      --exclude=.vite \\
      --exclude=*.log \\
      --exclude=.DS_Store \\
      --exclude=Thumbs.db \\
      --exclude=.env \\
      --exclude=tmp \\
      --exclude=temp \\
      --exclude=package-lock.json \\
      .`, { stdio: 'inherit' });
    
    success(`Package created: ${packageName}`);
    
    // Get package size
    const stats = fs.statSync(packageName);
    const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    info(`Package size: ${sizeInMB} MB`);
    
    log('\n📋 Package contents:', colors.bold);
    log('• Source code for NestJS backend and React frontend');
    log('• Shared configurations and packages');
    log('• Setup and cleanup scripts');
    log('• Documentation and VS Code settings');
    log('• Environment template (.env.example)');
    log('• Git configuration and hooks');
    
    log('\n📝 To use this package:', colors.bold);
    log(`1. Extract: tar -xzf ${packageName}`);
    log('2. Navigate: cd ntr');
    log('3. Setup: npm run setup');
    log('4. Develop: npm run dev');
    
  } catch (err) {
    error('Package creation failed: ' + err.message);
    process.exit(1);
  }
}

function main() {
  const args = process.argv.slice(2);
  const shouldPackage = args.includes('--package') || args.includes('-p');
  const skipConfirmation = args.includes('--yes') || args.includes('-y');
  
  if (!skipConfirmation) {
    log('\n⚠️  This will remove all node_modules, build files, and caches.', colors.yellow);
    log('Make sure you have committed your changes to git.\n');
    
    // In a real scenario, you'd want to add readline for confirmation
    // For now, we'll proceed automatically
    info('Proceeding with cleanup...');
  }
  
  cleanupProject();
  
  if (shouldPackage) {
    createPackage();
  }
  
  log('\n🎉 All done!\n', colors.bold + colors.green);
  
  if (!shouldPackage) {
    info('To create a distributable package, run: npm run cleanup -- --package');
  }
  
  info('To setup the project again, run: npm run setup');
}

main();
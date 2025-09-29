# PashuNetra Development Setup Guide

## Prerequisites

### Required Software
1. **Node.js** (v18.0.0 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js) or **yarn**
   - Verify npm: `npm --version`
   - Or install yarn: `npm install -g yarn`

3. **Git**
   - Download from: https://git-scm.com/
   - Verify: `git --version`

4. **VS Code**
   - Download from: https://code.visualstudio.com/

### System Requirements
- **RAM**: Minimum 8GB (16GB recommended)
- **Storage**: At least 5GB free space
- **OS**: Windows 10+, macOS 10.15+, or Linux Ubuntu 18.04+

## VS Code Extensions Installation

### Method 1: Automatic Installation
1. Open VS Code
2. Open the project folder
3. VS Code will automatically suggest installing recommended extensions
4. Click "Install All" when prompted

### Method 2: Manual Installation
Install these essential extensions:

#### Core Development Extensions
```bash
# React & TypeScript
code --install-extension bradlc.vscode-tailwindcss
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension burkeholland.simple-react-snippets

# Code Quality
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension streetsidesoftware.code-spell-checker

# Git & GitHub
code --install-extension eamodio.gitlens
code --install-extension github.vscode-pull-request-github
code --install-extension github.copilot

# Productivity
code --install-extension formulahendry.auto-rename-tag
code --install-extension christian-kohler.path-intellisense
code --install-extension ms-vscode.vscode-thunder-client

# Themes & Icons
code --install-extension vscode-icons-team.vscode-icons
code --install-extension pkief.material-icon-theme
```

## Project Dependencies

### Core Dependencies (Already in package.json)
```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.57.4",
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.9.1"
  }
}
```

### Additional Dependencies for Full Features
Run these commands to add advanced features:

```bash
# AI/ML Integration
npm install @tensorflow/tfjs @tensorflow/tfjs-react-native

# Audio Processing
npm install recordrtc web-audio-api

# Image Processing
npm install fabric canvas

# Charts & Analytics
npm install recharts chart.js react-chartjs-2

# Date & Time (Panchang)
npm install moment hijri-date

# Blockchain Integration
npm install web3 ethers

# Geolocation
npm install @react-native-async-storage/async-storage

# Camera & Media
npm install react-webcam react-media-recorder

# Internationalization
npm install react-i18next i18next

# State Management (if needed)
npm install zustand

# Form Handling
npm install react-hook-form @hookform/resolvers yup

# Notifications
npm install react-hot-toast

# File Upload
npm install react-dropzone

# QR Code
npm install qrcode react-qr-code

# Crypto for Blockchain
npm install crypto-js
```

### Development Dependencies
```bash
# Testing
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Storybook (for component development)
npm install --save-dev @storybook/react @storybook/addon-essentials

# Bundle Analyzer
npm install --save-dev @vitejs/plugin-bundle-analyzer

# PWA Support
npm install --save-dev vite-plugin-pwa
```

## Environment Setup

### 1. Create Environment Files
```bash
# Development environment
touch .env.local

# Production environment  
touch .env.production
```

### 2. Environment Variables
Add these to your `.env.local`:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Endpoints
VITE_API_BASE_URL=http://localhost:3000/api
VITE_ML_API_URL=http://localhost:8000

# Feature Flags
VITE_ENABLE_BLOCKCHAIN=true
VITE_ENABLE_AUDIO_CAPTURE=true
VITE_ENABLE_BIOMETRIC=true

# External Services
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
VITE_WEATHER_API_KEY=your_weather_api_key

# Development
VITE_DEBUG_MODE=true
VITE_LOG_LEVEL=debug
```

## Development Workflow

### 1. Initial Setup
```bash
# Clone the repository
git clone <repository-url>
cd pashunetra

# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Code Quality Setup
```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type checking
npm run type-check
```

### 3. Testing Setup
```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## VS Code Workspace Configuration

### Recommended Folder Structure
```
pashunetra/
├── .vscode/
│   ├── extensions.json
│   ├── settings.json
│   ├── launch.json
│   └── tasks.json
├── src/
│   ├── components/
│   ├── pages/
│   ├── contexts/
│   ├── hooks/
│   ├── utils/
│   ├── types/
│   └── styles/
├── public/
├── docs/
└── tests/
```

### Keyboard Shortcuts (Recommended)
- `Ctrl+Shift+P` - Command Palette
- `Ctrl+`` - Toggle Terminal
- `Ctrl+Shift+E` - Explorer
- `Ctrl+Shift+F` - Search
- `Ctrl+Shift+G` - Source Control
- `F5` - Start Debugging
- `Ctrl+F5` - Run Without Debugging

## Debugging Setup

### Browser Debugging
1. Install Chrome/Firefox debugger extensions
2. Set breakpoints in VS Code
3. Press F5 to start debugging
4. Browser will open with debugger attached

### React Developer Tools
Install browser extensions:
- React Developer Tools
- Redux DevTools (if using Redux)

## Performance Optimization

### VS Code Performance
```json
{
  "typescript.preferences.includePackageJsonAutoImports": "off",
  "typescript.suggest.autoImports": false,
  "search.followSymlinks": false,
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/.git/**": true,
    "**/dist/**": true
  }
}
```

### Build Optimization
```bash
# Analyze bundle size
npm run build:analyze

# Build for production
npm run build

# Preview production build
npm run preview
```

## Troubleshooting

### Common Issues

1. **Node Modules Issues**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **TypeScript Errors**
   ```bash
   npm run type-check
   # Fix reported errors
   ```

3. **ESLint Issues**
   ```bash
   npm run lint:fix
   ```

4. **Port Already in Use**
   ```bash
   # Kill process on port 5173
   npx kill-port 5173
   ```

### VS Code Issues

1. **Extensions Not Working**
   - Reload VS Code: `Ctrl+Shift+P` → "Developer: Reload Window"
   - Check extension compatibility

2. **IntelliSense Not Working**
   - Restart TypeScript server: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

3. **Formatting Issues**
   - Check Prettier configuration
   - Verify default formatter in settings

## Additional Tools

### Recommended Browser Extensions
- React Developer Tools
- Redux DevTools
- Lighthouse
- Web Vitals
- ColorZilla (for design)

### Useful VS Code Extensions for AI/ML
- Python (for ML model development)
- Jupyter (for data analysis)
- REST Client (for API testing)
- Thunder Client (API testing)

## Getting Help

### Documentation
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

### Community
- [React Community](https://react.dev/community)
- [TypeScript Community](https://www.typescriptlang.org/community)
- [VS Code Community](https://code.visualstudio.com/docs/supporting/community)

---

## Quick Start Checklist

- [ ] Install Node.js (v18+)
- [ ] Install VS Code
- [ ] Install recommended extensions
- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Create `.env.local` file
- [ ] Run `npm run dev`
- [ ] Open http://localhost:5173
- [ ] Start coding! 🚀
# PashuNetra Installation Guide

## Quick Installation Commands

### 1. Install VS Code Extensions (Run in Terminal)
```bash
# Essential Extensions
code --install-extension bradlc.vscode-tailwindcss
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension eamodio.gitlens
code --install-extension github.copilot
code --install-extension vscode-icons-team.vscode-icons
code --install-extension formulahendry.auto-rename-tag
code --install-extension christian-kohler.path-intellisense
code --install-extension ms-vscode.vscode-thunder-client
code --install-extension streetsidesoftware.code-spell-checker
code --install-extension aaron-bond.better-comments
code --install-extension heybourn.headwind
code --install-extension ms-vscode.live-server
```

### 2. Install Project Dependencies
```bash
# Core dependencies (already in package.json)
npm install

# Additional AI/ML dependencies
npm install @tensorflow/tfjs @tensorflow/tfjs-react-native

# Audio processing
npm install recordrtc web-audio-api

# Image processing  
npm install fabric canvas

# Charts and analytics
npm install recharts chart.js react-chartjs-2

# Blockchain integration
npm install web3 ethers crypto-js

# Additional utilities
npm install moment hijri-date qrcode react-qr-code
npm install react-webcam react-media-recorder
npm install react-dropzone react-hook-form react-hot-toast
npm install zustand react-i18next i18next

# Development dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
npm install --save-dev @storybook/react @storybook/addon-essentials
npm install --save-dev @vitejs/plugin-bundle-analyzer vite-plugin-pwa
```

### 3. System Requirements Check
```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version
npm --version

# Check Git version
git --version
```

## Step-by-Step Installation

### Step 1: Install Prerequisites
1. **Node.js** (v18.0.0 or higher)
   - Windows: Download from https://nodejs.org/
   - macOS: `brew install node` or download from website
   - Linux: `sudo apt install nodejs npm` or use package manager

2. **VS Code**
   - Download from https://code.visualstudio.com/
   - Install with default settings

3. **Git**
   - Windows: Download from https://git-scm.com/
   - macOS: `brew install git` or use Xcode tools
   - Linux: `sudo apt install git`

### Step 2: Clone and Setup Project
```bash
# Clone the repository
git clone <your-repository-url>
cd pashunetra

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### Step 3: Configure VS Code
1. Open VS Code
2. Open the project folder: `File > Open Folder`
3. Install recommended extensions when prompted
4. VS Code will automatically use the workspace settings

### Step 4: Environment Configuration
Edit `.env.local` file:
```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_key_here
VITE_API_BASE_URL=http://localhost:3000/api
VITE_ENABLE_BLOCKCHAIN=true
VITE_ENABLE_AUDIO_CAPTURE=true
VITE_DEBUG_MODE=true
```

### Step 5: Start Development
```bash
# Start the development server
npm run dev

# Open browser to http://localhost:5173
```

## Verification Checklist

### ✅ VS Code Extensions Working
- [ ] Tailwind CSS IntelliSense working
- [ ] TypeScript errors showing
- [ ] ESLint highlighting issues
- [ ] Prettier formatting on save
- [ ] Auto imports working
- [ ] Git integration visible

### ✅ Project Features Working
- [ ] Development server starts (`npm run dev`)
- [ ] Hot reload working
- [ ] TypeScript compilation successful
- [ ] Tailwind styles applying
- [ ] React components rendering
- [ ] Routing working between pages

### ✅ Advanced Features Ready
- [ ] Camera access working (for image capture)
- [ ] Audio recording functional
- [ ] Geolocation services available
- [ ] Local storage working
- [ ] Offline functionality enabled

## Troubleshooting

### Common Installation Issues

#### 1. Node.js Version Issues
```bash
# Check current version
node --version

# If version is below 18, update Node.js
# Windows: Download latest from nodejs.org
# macOS: brew upgrade node
# Linux: Use NodeSource repository
```

#### 2. Permission Issues (macOS/Linux)
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

#### 3. VS Code Extensions Not Installing
```bash
# Reset VS Code extensions
code --list-extensions
code --uninstall-extension <extension-id>
code --install-extension <extension-id>
```

#### 4. Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173
# Or use different port
npm run dev -- --port 3000
```

#### 5. TypeScript Errors
```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
npm run type-check
```

### Performance Optimization

#### For Low-End Machines
Add to VS Code settings.json:
```json
{
  "typescript.preferences.includePackageJsonAutoImports": "off",
  "search.followSymlinks": false,
  "files.watcherExclude": {
    "**/node_modules/**": true
  }
}
```

#### For Better Development Experience
```bash
# Install additional tools
npm install -g @storybook/cli
npm install -g serve
npm install -g lighthouse
```

## Platform-Specific Notes

### Windows
- Use PowerShell or Command Prompt
- May need to enable script execution: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
- Consider using Windows Terminal for better experience

### macOS
- Use Terminal or iTerm2
- May need Xcode Command Line Tools: `xcode-select --install`
- Homebrew recommended for package management

### Linux (Ubuntu/Debian)
```bash
# Install build essentials
sudo apt update
sudo apt install build-essential

# Install additional dependencies for canvas
sudo apt install libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

## Next Steps After Installation

1. **Explore the Codebase**
   - Check `src/` folder structure
   - Review component organization
   - Understand routing setup

2. **Run Tests**
   ```bash
   npm run test
   ```

3. **Build for Production**
   ```bash
   npm run build
   npm run preview
   ```

4. **Start Development**
   - Create feature branches
   - Follow coding standards
   - Use provided VS Code snippets

## Getting Help

If you encounter issues:
1. Check this troubleshooting guide
2. Review VS Code extension documentation
3. Check project GitHub issues
4. Contact development team

---

**Happy Coding! 🚀**

Your PashuNetra development environment is now ready for building the future of cattle breed identification in India!
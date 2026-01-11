# Quick Start Guide

## To Run the Full React App

**Step 1: Install Node.js**

Choose one of these methods:

### Method A: Using Homebrew (if you have it)
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install node
```

### Method B: Direct Download
1. Visit: https://nodejs.org/
2. Download the macOS installer (.pkg file)
3. Run the installer
4. Restart your terminal

### Method C: Using nvm (Node Version Manager)
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.zshrc
nvm install --lts
nvm use --lts
```

**Step 2: Install Dependencies**
```bash
cd /Users/prashantupadhyay/Downloads/new
npm install
```

**Step 3: Run the App**
```bash
npm run dev
```

The app will open automatically at `http://localhost:3000`

---

## Quick Preview (Static HTML)

If you just want to see the UI quickly, open `preview.html` in your browser. This is a simplified static version without full React functionality.


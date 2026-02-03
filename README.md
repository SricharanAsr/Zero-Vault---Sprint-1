# Zero-Vault - Sprint 1 (50% Implementation)

A secure, zero-knowledge password manager built with modern web technologies. This is the **Sprint 1 version** representing approximately 50% of the planned features, focusing on core functionality and foundational UI/UX.

## 🎯 Sprint 1 Scope (50% Complete)

This version includes the essential features needed for a functional password vault:

### ✅ Implemented Features

#### Core Vault Functionality
- **Secure Entry Management**: Add, edit, and delete password entries
- **Category Organization**: Organize entries by categories (Work, Personal, Finance, Social, Entertainment, Shopping)
- **Favorites System**: Mark important entries as favorites for quick access
- **Search & Filter**: Real-time search across entries with category filtering

#### Security Features
- **Password Strength Analysis**: Real-time strength indicators with color-coded feedback
- **Breach Detection**: Identifies commonly compromised passwords
- **Security Challenge**: Optional security question/answer for sensitive entries
- **Auto-Lock Timer**: Configurable inactivity timeout (5-60 minutes)
- **Clipboard Auto-Clear**: Automatic clipboard clearing after password copy (10-120 seconds)

#### User Experience
- **Dark Glass UI**: Premium glassmorphism design with backdrop blur effects
- **Responsive Layout**: Fully responsive design for desktop and mobile
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Password Generator**: Built-in strong password generator with customizable options
- **Keyboard Shortcuts**: 
  - `Ctrl+K` - Search vault
  - `Ctrl+N` - New entry
  - `Ctrl+L` - Lock vault
  - `Ctrl+,` - Settings

## 🚀 Technology Stack

- **Frontend**: React 18 + TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide Icons
- **Backend**: Node.js, Express, SQLite (with MongoDB migration support)
- **Security**: Zero-Knowledge Proofs, PBKDF2 Hashing, MFA implementation

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/SricharanAsr/Zero-Vault---Sprint-1.git
   cd Zero-Vault---Sprint-1
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm start
   ```

3. **Frontend Setup**
   *(Open a new terminal window)*
   ```bash
   cd zero-vault-sprint-1/zero-vault-sprint-1
   npm install
   npm run dev
   ```

4. **Access the Application**
   - Frontend: `http://localhost:5173` (default Vite port)
   - Backend: `http://localhost:5000` (typical server port)

## 🔮 Planned for Sprint 2 (Remaining 50%)

The following features are planned for the next iteration:

- **Vault Insights Dashboard**: Security audit with compromised/weak/reused password detection
- **Password History**: Track last 5 password changes per entry
- **Import/Export**: JSON-based vault backup and restore
- **Extension Mockup**: Browser extension preview page
- **Virtual Scrolling**: Performance optimization for large vaults (100+ entries)
- **Enhanced Security**: Additional encryption options and 2FA preparation

## 📝 Current Limitations

As this is Sprint 1 (50% complete):
- No data persistence beyond localStorage/local SQLite
- No cloud sync (currently local-first)
- Limited multi-vault support

## 🛡️ Security Note

This is a **client-side focused** implementation with backend support. For production use, consider:
- End-to-end encryption for all stored fields
- Secure cloud backup with client-side keys
- Biometric authentication integration

---

*Sprint 1 - Foundation Complete | Sprint 2 - Advanced Features Coming Soon*

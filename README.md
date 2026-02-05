# Zero-Vault - Secure Password Management

**# Zero-Knowledge Password Vault - Sprint 1

A secure, zero-knowledge password manager built with modern web technologies. This project implements client-side encryption, zero-knowledge authentication, and a beautiful user interface.

## 🚀 Features

- **Zero-Knowledge Architecture**: Your master password never leaves your device
- **Client-Side Encryption**: All vault data is encrypted before storage
- **Modern UI/UX**: Built with React, TypeScript, and Framer Motion
- **Cross-Device Sync**: Encrypted vault synchronization across devices
- **Password Analytics**: Insights into password strength and security
- **Auto-Lock**: Automatic vault locking after inactivity
- **Panic Mode**: Emergency data wipe functionality

## ⌨️ Keyboard Shortcuts

Boost your productivity with these keyboard shortcuts:

- `Ctrl+K` - Search vault
- `Ctrl+N` - Create new entry
- `Ctrl+L` - Lock vault
- `Ctrl+,` - Open settings

## 🛠️ Technologies Used

### Frontend
- React 18 with TypeScript
- Vite for blazing-fast builds
- Framer Motion for smooth animations
- Wouter for lightweight routing
- Lucide React for beautiful icons

### Backend
- Node.js with Express
- MongoDB for data persistence
- JWT for authentication
- Zero-knowledge proof verification

## 📦 Project Structure

```
Frontend+Backend/
├── zero-vault-sprint-1/     # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── contexts/        # React contexts
│   │   ├── services/        # API services
│   │   └── utils/           # Utility functions
│   └── package.json
└── backend/
    └── zero-knowledge/      # Express backend
```

---

## 🔄 Project Workflow

How Zero-Vault keeps your data safe:

1.  **Secure Registration**: During signup, a unique cryptographic secret is generated locally. Only the "proof" is stored on the server.
2.  **Zero-Knowledge Login**: When you unlock your vault, the system verifies your identity through a mathematical challenge that doesn't reveal your password.
3.  **Client-Side Encryption**: Your passwords are encrypted on your device *before* being saved to the database.
4.  **Risk Engine**: A background service monitors for suspicious activity, brute-force attempts, and weak master passwords.

---

## 📅 Sprint 2 Roadmap (Planned)

We are continuously evolving. Here is what's coming next:

- [ ] **Multi-Factor Authentication (MFA)**: Adding TOTP (Google Authenticator) and Email OTP layers.
- [ ] **Cloud Sync**: Full migration to MongoDB for seamless multi-device access.
- [ ] **Security Audit Dashboard**: A dedicated UI to view login attempts and security health.
- [ ] **Auto-Fill Extension**: A browser extension to bring Zero-Vault to every website.

---

## 🚀 How to Run the Project (Step-by-Step)

Follow these steps exactly to get your project running from zero to hero.

### **1. Prerequisites**
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (Latest LTS version)
- [Git](https://git-scm.com/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- [MongoDB Compass](https://www.mongodb.com/try/download/compass) (Graphical Interface for MongoDB)

### **2. Clone the Repository**
> [!TIP]
> **Permission Denied Error?** If you see "Permission denied", it's because you are at the system root (`/`). Navigate to a folder you own (like `Documents` or your D: drive) using `cd` before cloning.
>
> **Already Exists Error?** If you see "already exists and is not an empty directory", it means you've already cloned it! Just skip to the `cd` command below.

Open your terminal (Git Bash, Command Prompt, or PowerShell) and run:
```bash
git clone https://github.com/SricharanAsr/Zero-Vault---Sprint-1.git
cd Zero-Vault---Sprint-1
```

### **3. Start the Backend (Server)**
1.  **Navigate to the backend folder:**
    ```bash
    cd backend/zero-knowledge
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Setup Environment Variables:**
    Ensure you have a `.env` file in `backend/zero-knowledge/` with the following:
    ```env
    MONGO_URI=mongodb://localhost:27017/zero-knowledge
    JWT_SECRET=super-secret-key-change-this-in-production
    ```
4.  **Launch the Server:**
    ```bash
    npm start
    ```
    *Keep this terminal window open!*

### **4. Start the Frontend (App)**
1.  **Open a SECOND terminal window.**
2.  **Navigate to the cloned project folder:**
    ```bash
    cd Zero-Vault---Sprint-1
    ```
3.  **Go to the frontend folder (Note: it is nested twice):**
    ```bash
    cd zero-vault-sprint-1/zero-vault-sprint-1
    ```
4.  **Install dependencies:**
    ```bash
    npm install
    ```
5.  **Start the development server:**
    ```bash
    npm run dev
    ```
6.  **Open in Your Browser:** 👉 **[http://localhost:5173](http://localhost:5173)**

### **5. Verify Data in MongoDB Compass**
1.  Open **MongoDB Compass** and click **Connect** (default `mongodb://localhost:27017`).
2.  In the Zero-Vault app, create a new account or save an entry.
3.  In Compass, refresh the list. You should see a `zero-knowledge` database with `users` and `vaults` collections!

---

## 🛠️ How to Update your GitHub Repository
1. **Stage changes:** `git add .`
2. **Commit:** `git commit -m "Your message here"`
3. **Push:** `git push origin main`

---

*Sprint 1 - Foundation Complete | Sprint 2 - Advanced Features Coming Soon*

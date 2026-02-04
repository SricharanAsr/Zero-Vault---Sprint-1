# Zero-Vault - Secure Password Management

**Zero-Vault** is a high-security, zero-knowledge password manager designed for the modern web. Built with a focus on privacy and user experience, it ensures that sensitive data never leaves the client in an unencrypted state.

---

## 🛠️ Frameworks & Technologies

The project utilizes a robust and modern tech stack to provide security, speed, and a premium user experience.

### **Frontend**
- **React.js & TypeScript**: For a type-safe, component-based user interface.
- **Vite**: Ultra-fast development environment and build tool.
- **Framer Motion**: Powering smooth, high-end micro-animations.
- **Vanilla CSS**: Custom-crafted Design System featuring **Glassmorphism** and a premium "Dark Glass" aesthetic.

### **Backend**
- **Node.js & Express.js**: Scalable and efficient server-side logic.
- **SQLite**: Reliable local data storage (Current Sprint).
- **MongoDB**: Future-ready cloud synchronization (Integration in progress).

### **Security Core**
- **Zero-Knowledge Proofs (ZKP)**: Authenticate without ever sending your actual password.
- **AES-256 Encryption**: Industry-standard encryption for vault data.
- **Diffie-Hellman**: Secure key exchange for establishing encrypted channels.

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

Follow these steps exactly to get your project running.

### **Step 1: Open Git Bash and Navigate to Project**
```bash
cd "d:/sricharan-A/amrita/sem 6/Software engineering/Sprint_1/final/Frontend+Backend"
```

### **Step 2: Start the Backend (Server)**
1. **Go to the backend folder:**
   ```bash
   cd backend/zero-knowledge
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the server:**
   ```bash
   npm start
   ```
*⚠️ Keep this terminal window open!*

### **Step 3: Start the Frontend (App)**
1. **Open a SECOND Git Bash window.**
2. **Navigate to the project root:**
   ```bash
   cd "d:/sricharan-A/amrita/sem 6/Software engineering/Sprint_1/final/Frontend+Backend"
   ```
3. **Go to the frontend folder:**
   ```bash
   cd zero-vault-sprint-1/zero-vault-sprint-1
   ```
4. **Install dependencies:**
   ```bash
   npm install
   ```
5. **Start the app:**
   ```bash
   npm run dev
   ```

### **Step 4: Open in Your Browser**
👉 **[http://localhost:5173](http://localhost:5173)**

---

## 🛠️ How to Update your GitHub Repository
1. **Stage changes:** `git add .`
2. **Commit:** `git commit -m "Your message here"`
3. **Push:** `git push origin main`

---

*Sprint 1 - Foundation Complete | Sprint 2 - Advanced Features Coming Soon*

# Zero-Vault - Secure Password Management

**Zero-Knowledge Password Vault - Sprint 1 & 2**

Zero-Vault is a high-security, zero-knowledge password manager designed to protect your credentials across all devices. By leveraging client-side encryption and zero-knowledge proofs, we ensure that your master password and decrypted data never leave your local environment.

---

## Table of Contents
1. [Introduction](#introduction)
2. [About](#about)
    - [Features](#features)
    - [Technologies Used](#technologies-used)
    - [Project Structure](#project-structure)
3. [Installing](#installing)
    - [Prerequisites](#prerequisites)
    - [Step-by-Step Installation](#step-by-step-installation)
4. [Usage](#usage)
    - [Step-by-Step Project Running](#step-by-step-project-running)
5. [Running Tests](#running-tests)
    - [Step-by-Step Test Suite Running](#step-by-step-test-suite-running)
    - [Quality Assurance Modules](#quality-assurance-modules)
6. [Sprint 2 Plan](#sprint-2-plan)
7. [Compatibility](#compatibility)
8. [Project Support](#project-support)
9. [License](#license)

---

## 1. Introduction
Zero-Vault keeps your data safe through a rigorous cryptographic workflow:
1.  **Secure Registration**: A unique cryptographic secret is generated locally. Only a non-identifying "proof" is stored on the server.
2.  **Zero-Knowledge Login**: Identity verification occurs via a mathematical challenge that never reveals your master password.
3.  **Client-Side Encryption**: Passwords are encrypted on your device before being transmitted or saved to the database.
4.  **Risk Engine**: Continuous monitoring for suspicious activity and brute-force attempts.

---

## 2. About

### Features
- **Zero-Knowledge Architecture**: Total privacy for your master password.
- **Client-Side Encryption**: AEAD-protected vault storage.
- **Modern UI/UX**: Responsive glassmorphism interface built with React.
- **Password Analytics**: Real-time strength meter and security insights.
- **Multi-Device Management**: Track and revoke active device sessions.
- **API Versioning & Throttling**: Scalable `/api/v1` architecture with rate limiting.
- **Auto-Lock**: Configurable inactivity timers for enhanced security.
- **Keyboard Productivity**: `Ctrl+K` (Search), `Ctrl+N` (New Entry), `Ctrl+L` (Lock).

### Technologies Used
**Frontend:** React 18, TypeScript, Vite, Framer Motion, Tailwind CSS, Lucide React.  
**Backend:** Node.js, Express, MongoDB, JWT, Zero-Knowledge Proof Primitives.

### Project Structure
```
Frontend+Backend/
├── zero-vault-sprint-1/     # React frontend
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── pages/           # Views (Dashboard, Unlock, etc.)
│   │   ├── contexts/        # State Management
│   │   └── utils/           # Crypto & helper functions
│   └── tests/               # Playwright E2E suites
└── backend/
    └── zero-knowledge/      # Express API & ZK Logic
```

---

## 3. Installing

### Prerequisites
Before setting up Zero-Vault, ensure you have the following installed:
- **Node.js**: v18.x or higher (LTS recommended)
- **Git**: For version control
- **MongoDB**: Community Server (running locally on port 27017)
- **Browsers**: Chromium (for E2E tests)

### Step-by-Step Installation
1. **Clone the project:**
   ```bash
   git clone https://github.com/SricharanAsr/Zero-Vault---Sprint-1.git
   cd Zero-Vault---Sprint-1
   ```
2. **Setup Backend:**
   ```bash
   cd backend/zero-knowledge
   npm install
   ```
3. **Setup Frontend:**
   ```bash
   cd ../../zero-vault-sprint-1/zero-vault-sprint-1
   npm install
   npx playwright install chromium
   ```

---

## 4. Usage

### Step-by-Step Project Running
To run the full application locally, follow these steps in separate terminals:

**Terminal 1: Backend Server**
```bash
cd backend/zero-knowledge
echo MONGO_URI=mongodb://localhost:27017/zero-knowledge > .env
echo JWT_SECRET=mysecretkey >> .env
npm start
```

**Terminal 2: Frontend App**
```bash
cd zero-vault-sprint-1/zero-vault-sprint-1
npm run dev
```
Navigate to `http://localhost:5173` to access your vault.

---

## 5. Running Tests

Zero-Vault uses **Full-Stack Integrated Testing** to verify the complete application. This ensures that the frontend, backend, and database work together correctly in a real-world environment.

### Prerequisites
Before running tests, ensure both servers are running:

**Terminal 1: Backend Server**
```bash
cd backend/zero-knowledge
echo MONGO_URI=mongodb://localhost:27017/zero-knowledge > .env
echo JWT_SECRET=mysecretkey >> .env
npm start
```

**Terminal 2: Frontend Server**
```bash
cd zero-vault-sprint-1/zero-vault-sprint-1
npm run dev
```

### Executing Integrated Tests

**Terminal 3: Run Tests**
```bash
cd zero-vault-sprint-1/zero-vault-sprint-1
npx playwright test
```

This executes all test suites (Functional, Accessibility, Performance) in headless mode.

### View Test Reports
After tests complete, view the interactive HTML report:
```bash
npx playwright show-report
```

### Run Specific Test Suites

- **Functional Flow** (Registration, Login, Vault CRUD):
  ```bash
  npx playwright test tests/functional.e2e.ts
  ```

- **Accessibility Audits** (WCAG 2.1 AA Compliance):
  ```bash
  npx playwright test tests/accessibility.e2e.ts
  ```

- **Performance Stress Tests** (1,000+ vault entries):
  ```bash
  npx playwright test tests/performance.e2e.ts
  ```

### Quality Assurance Coverage
- **Authentication Flow**: Registration with zero-knowledge proofs, login validation, JWT issuance
- **Vault Operations**: Create, read, update, delete encrypted entries
- **Security**: Rate limiting, device management, session handling
- **Accessibility**: Keyboard navigation, screen reader compatibility, color contrast
- **Performance**: Large dataset rendering, search latency, memory usage

---

## 6. Sprint 2 Plan
The final development cycle focuses on:
- **Cryptographic Audit**: Deep validation of KDF and AEAD integrity.
- **Multi-Device Sync**: Robust conflict resolution for concurrent updates.
- **Security Penetration**: MITM, XSS, and Replay attack simulation.
- **Advanced Performance**: 24-hour memory leak monitoring and scaled sync latency.

---

## 7. Compatibility
- **Browsers**: Chrome, Firefox, Edge, Safari (Webkit).
- **Resolutions**: Optimized for Desktop (1920x1080) and Mobile-responsive views.
- **OS**: Windows, macOS, Linux.

---

## 8. Project Support
For support or contributions:
- **Developer**: Sricharan A
- **Repository**: [GitHub Issues](https://github.com/SricharanAsr/Zero-Vault---Sprint-1/issues)

---

## License
Distributed under the **MIT License**. See `LICENSE` for more information.

---
*Sprint 1 - Foundation Complete | Sprint 2 - Advanced Security in Progress*

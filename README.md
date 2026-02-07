# Zero-Vault - Secure Password Management

**Zero-Knowledge Password Vault - Sprint 1**

A secure, zero-knowledge password manager built with modern web technologies. This project implements client-side encryption, zero-knowledge authentication, and a professional user interface.

## Features

- **Zero-Knowledge Architecture**: Your master password never leaves your device
- **Client-Side Encryption**: All vault data is encrypted before storage
- **Modern UI/UX**: Built with React, TypeScript, and Framer Motion
- **Cross-Device Sync**: Encrypted vault synchronization across devices
- **Password Analytics**: Insights into password strength and security
- **Auto-Lock**: Automatic vault locking after inactivity
- **Panic Mode**: Emergency data wipe functionality

## Keyboard Shortcuts

Boost your productivity with these keyboard shortcuts:

- `Ctrl+K` - Search vault
- `Ctrl+N` - Create new entry
- `Ctrl+L` - Lock vault
- `Ctrl+,` - Open settings

## Technologies Used

### Frontend
- React 18 with TypeScript
- Vite for fast builds
- Framer Motion for animations
- Wouter for lightweight routing
- Lucide React for icons

### Backend
- Node.js with Express
- MongoDB for data persistence
- JWT for authentication
- Zero-knowledge proof verification

## Project Structure

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

## Project Workflow

How Zero-Vault keeps your data safe:

1.  **Secure Registration**: During signup, a unique cryptographic secret is generated locally. Only the "proof" is stored on the server.
2.  **Zero-Knowledge Login**: When you unlock your vault, the system verifies your identity through a mathematical challenge that doesn't reveal your password.
3.  **Client-Side Encryption**: Your passwords are encrypted on your device before being saved to the database.
4.  **Risk Engine**: A background service monitors for suspicious activity, brute-force attempts, and weak master passwords.

---

## Sprint 2 Roadmap (Planned)

We are continuously evolving. Here is what's coming next:

- [ ] **Multi-Factor Authentication (MFA)**: Adding TOTP (Google Authenticator) and Email OTP layers.
- [ ] **Cloud Sync**: Full migration to MongoDB for seamless multi-device access.
- [ ] **Security Audit Dashboard**: A dedicated UI to view login attempts and security health.
- [ ] **Auto-Fill Extension**: A browser extension to bring Zero-Vault to every website.

---

## Quality Assurance and Testing (QA)

Zero-Vault follows a rigorous testing protocol to ensure your data remains secure. We have implemented four Quality Assurance Epics as part of Sprint 1.

### 1. Functional E2E Testing (US 2)
- **Scope**: Automated verification of the entire user journey: Registration, Unlock, Dashboard, and CRUD.
- **Run Locally**: `npx playwright test tests/functional.spec.ts`
- **Output**: Verified that vault data persists locally and synchronizes correctly to the backend.

### 2. Performance Testing at Scale (US 6)
- **Scope**: Stress testing the vault with 10,000 synthetic entries.
- **Run Locally**: `npx playwright test tests/performance.spec.ts`
- **Result**: Confirmed stable rendering using react-window virtualization with large data payloads.

### 3. Usability and Accessibility Testing (US 7)
- **Scope**: WCAG 2.1 AA compliance audits using @axe-core/playwright.
- **Run Locally**: `npx playwright test tests/accessibility.spec.ts`
- **Finding**: Logged violations for further refinement including labeling and color contrast.

### 4. CI/CD Automation (US 8)
- **Scope**: Integration of automated testing into the GitHub workflow.
- **Location**: .github/workflows/ci.yml
- **Function**: Automatically runs full test suite (Lint, Unit, E2E) on every push to main or master.

---

## How to Run the Full Test Suite

Follow these steps to execute the automated testing suite on your local machine.

### 1. Open your Terminal
Open a new terminal window or command prompt.

### 2. Navigate to the Frontend Project
The test suite is managed within the frontend directory.
```bash
cd zero-vault-sprint-1/zero-vault-sprint-1
```

### 3. Install Browser Binaries
If this is your first time running tests, you must install the Playwright browser engines.
```bash
npx playwright install chromium
```

### 4. Execute Unit Tests
Run the component and utility unit tests using Vitest.
```bash
npm run test
```

### 5. Execute E2E, Performance, and Accessibility Tests
Ensure your backend server is running in another terminal before starting these tests.
```bash
npm run test:e2e
```

### 6. Generate and View Reports
After the tests complete, you can view a detailed visual report of the results.
```bash
npx playwright show-report
```

---

## CI/CD Automation Procedure

The project uses GitHub Actions to maintain code quality through an automated pipeline.

### Step 1: Code Contribution
When you push code to the main or master branch, or open a pull request, the CI/CD pipeline is automatically triggered.

### Step 2: Environment Setup
The GitHub runner initializes a Linux environment, installs Node.js, and pulls the latest project dependencies for both the frontend and backend.

### Step 3: Automated Quality Checks
The pipeline executes the following checks in sequence:
1. Linting: Verifies code style and identifies potential errors.
2. Unit Testing: Runs the Vitest suite to ensure component logic is sound.
3. E2E Testing: Launches the backend, starts the frontend, and runs the Playwright suite to verify functional, performance, and accessibility requirements.

### Step 4: Final Status
- If all checks pass, the build is marked as successful (Green).
- If any test fails, the build fails, and the developer is notified to review the logs and apply fixes.

---

## How to Run the Project (Step-by-Step)

Follow these steps exactly to get your project running.

### **1. Prerequisites**
Ensure you have the following installed on your system:
- Node.js (Latest LTS version)
- Git
- MongoDB Community Server
- MongoDB Compass (Graphical Interface for MongoDB)

### **2. Clone the Repository**

If you encounter a permission denied error, ensure you are in a directory you own using the cd command.

Open your terminal and run:
```bash
# Navigate to your target directory
cd /d

# Create a fresh folder for the project
mkdir -p "ZeroVault-Github"
cd "ZeroVault-Github"

# Clone the repository
git clone https://github.com/SricharanAsr/Zero-Vault---Sprint-1.git .
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
    Ensure you have a .env file in backend/zero-knowledge/ with the following:
    ```env
    MONGO_URI=mongodb://localhost:27017/zero-knowledge
    JWT_SECRET=super-secret-key-change-this-in-production
    ```
4.  **Launch the Server:**
    ```bash
    npm start
    ```
    Note: Keep this terminal window open.

### **4. Start the Frontend (App)**
1.  **Open a second terminal window.**
2.  **Navigate to the project root.**
3.  **Go to the frontend folder:**
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
6.  **Open in Your Browser:** http://localhost:5173

### **5. Verify Data in MongoDB Compass**
1.  Open MongoDB Compass and click Connect.
2.  In the Zero-Vault app, create a new account or save an entry.
3.  In Compass, refresh the list to see the zero-knowledge database.

---

## How to Update your GitHub Repository
1. Stage changes: `git add .`
2. Commit: `git commit -m "Your message here"`
3. Push: `git push origin main`

---

*Sprint 1 - Foundation Complete | Sprint 2 - Advanced Features Coming Soon*

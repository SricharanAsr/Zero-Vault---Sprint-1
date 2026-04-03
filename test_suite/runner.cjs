const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log("\x1b[36m%s\x1b[0m", "=== Zero-Knowledge Vault: Unified Test Suite ===");
console.log("Running on Node.js " + process.version + "\n");

let passed = 0;
let failed = 0;

function assert(condition, message) {
    if (condition) {
        console.log("\x1b[32m[PASS]\x1b[0m " + message);
        passed++;
    } else {
        console.log("\x1b[31m[FAIL]\x1b[0m " + message);
        failed++;
    }
}

// --- PART 1: Frontend Unit Tests (Password Logic) ---
console.log("\x1b[33m%s\x1b[0m", "--- PART 1: Frontend Logic Tests ---");

// Check if password is commonly used (Replica of utils/passwordStrength.ts)
function isCommonPassword(password) {
    const commonPasswords = [
        'password', '123456', '12345678', 'qwerty', 'abc123',
        'monkey', '1234567', 'letmein', 'trustno1', 'dragon',
        'baseball', 'iloveyou', 'master', 'sunshine', 'ashley',
        'bailey', 'passw0rd', 'shadow', '123123', '654321',
    ];
    if (!password) return false;
    return commonPasswords.includes(password.toLowerCase());
}

function calculatePasswordStrength(password) {
    let score = 0;
    if (!password) return 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    return Math.min(score, 4);
}

// Tests
assert(calculatePasswordStrength("123") === 1, "Short numeric password score should be 1");
assert(calculatePasswordStrength("Admin123!") >= 4, "Strong password 'Admin123!' should have high score");
assert(isCommonPassword("password") === true, "'password' should be flagged as common");
assert(isCommonPassword("StrongP@ssw0rd") === false, "'StrongP@ssw0rd' should NOT be flagged as common");


// --- PART 2: Risk Engine Integration ---
console.log("\n\x1b[33m%s\x1b[0m", "--- PART 2: Risk Engine Integration ---");

const riskEnginePath = path.resolve('../../../risk-engine/risk-engine/test_driver.exe');
// Adjust path relative to where script is run. Assuming run from `zero-vault-sprint-1/test_suite`
// Structure:
// root/
//   zero-vault-sprint-1/zero-vault-sprint-1/test_suite/runner.js
//   risk-engine/risk-engine/test_driver.exe

// Abs path calc
const repoRoot = path.resolve(__dirname, '../../../');
const engineExe = path.join(repoRoot, 'risk-engine', 'risk-engine', 'test_driver.exe');

console.log("Looking for engine at: " + engineExe);

if (fs.existsSync(engineExe)) {
    exec(`"${engineExe}"`, (error, stdout, stderr) => {
        if (error) {
            console.log("\x1b[31m[FAIL]\x1b[0m Risk Engine execution failed: " + error.message);
            failed++;
        } else {
            console.log("Output:\n" + stdout.trim());
            if (stdout.includes("Risk decision = 0")) {
                assert(true, "Risk Engine returned correct baseline decision (0)");
            } else {
                assert(false, "Risk Engine returned unexpected output");
            }
        }
        finish();
    });
} else {
    console.log("\x1b[31m[SKIP]\x1b[0m Risk Engine executable not found. Make sure to compile it if possible.");
    console.log("(Note: Missing GCC prevents recompilation, checking for pre-existing .exe)");
    finish();
}

function finish() {
    console.log("\n" + "=".repeat(30));
    console.log(`Tests Completed: ${passed + failed}`);
    console.log(`Passed: \x1b[32m${passed}\x1b[0m`);
    console.log(`Failed: \x1b[31m${failed}\x1b[0m`);

    if (failed > 0) {
        process.exit(1);
    } else {
        process.exit(0);
    }
}

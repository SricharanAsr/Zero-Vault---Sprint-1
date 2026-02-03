// Native fetch is available in Node.js 18+
// const fetch = require("node-fetch"); 

async function testRegister() {
    try {
        const response = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: "debug_user_" + Date.now(),
                proof: "debug_proof",
            }),
        });

        const data = await response.json();
        console.log("Status:", response.status);
        console.log("Response:", data);
    } catch (error) {
        console.error("Error:", error);
    }
}

testRegister();

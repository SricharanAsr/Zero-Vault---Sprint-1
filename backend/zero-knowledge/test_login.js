
async function testLogin() {
    try {
        const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: "vbn@gmail.com",
                proof: "Ram@123",
            }),
        });

        const data = await response.json();
        console.log("Status:", response.status);
        console.log("Response:", data);
    } catch (error) {
        console.error("Error:", error);
    }
}

testLogin();

const API = "http://localhost:3002";

async function login(data) {
    const response = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return response.json();
}
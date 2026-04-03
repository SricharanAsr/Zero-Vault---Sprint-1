const API_URL = 'http://localhost:3000';

export interface LoginResponse {
    message: string;
    token: string;
}

export const api = {
    login: async (username: string, proof: string): Promise<LoginResponse> => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, proof }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Login failed');
        }

        return response.json();
    }
};

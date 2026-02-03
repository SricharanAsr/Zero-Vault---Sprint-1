import { API_BASE_URL } from '../config';

export const authService = {
    async register(email: string, proof: string) {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: email, proof }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Registration failed');
        }

        return response.json();
    },

    async login(username: string, proof: string) {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, proof }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Login failed');
        }

        return response.json();
    }
};

export const vaultService = {
    async upload(encryptedVault: string) {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${API_BASE_URL}/vault/upload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ encryptedVault }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to upload vault');
        }

        return response.json();
    },

    async getData() {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${API_BASE_URL}/vault/data`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 404) {
            return null; // No vault found yet
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to retrieve vault');
        }

        return response.json();
    }
};

import { logger } from '../utils/logger';
import { handleError } from '../utils/errorHandler';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export interface LoginResponse {
    message: string;
    token: string;
}

export const api = {
    login: async (username: string, proof: string): Promise<LoginResponse> => {
        logger.info('api', `Attempting login for user: ${username}`);
        try {
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

            const data = await response.json();
            logger.info('api', 'Login successful');
            return data;
        } catch (error) {
            handleError(error, 'api_login', true);
            throw error; // Re-throw for caller handling
        }
    }
};

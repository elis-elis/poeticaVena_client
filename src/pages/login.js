/** 
The login form captures the user's email and password.
It sends a POST request to your backend's /auth/login endpoint.
If successful, it stores the JWT token in localStorage and redirects the user to the homepage.
*/

import { useState } from 'react';
import api from '@/utils/api'; // The axios instance is already set up
import { useRouter } from 'next/router';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            // Clear old tokens from localStorage and cookies
            localStorage.removeItem('token');
            localStorage.removeItem('refresh_token');
            document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";

            // Send login request
            const response = await api.post('/auth/login', {
                email,
                password,
            });

            const token = response.data.access_token;

            // Store the new JWT token in localStorage
            localStorage.setItem('token', token);

            // Set the Authorization header for subsequent requests
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            console.log('Login successful, token stored:', token);

            // Redirect user to homepage or another protected route
            router.push('/');
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div>
            <h1>Login, gently, but confidently</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

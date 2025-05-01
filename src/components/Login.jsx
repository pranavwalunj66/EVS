import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Redirect if already logged in
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedIsAdmin = localStorage.getItem('isAdmin');
    const storedUser = localStorage.getItem('user');

    useEffect(() => {
        if (storedIsLoggedIn && storedIsAdmin && storedUser) {
            if (storedIsAdmin === 'true') {
                navigate('/admin-dashboard');
            } else {
                navigate('/user-dashboard');
            }
        }
    }, [storedIsLoggedIn, storedIsAdmin, storedUser, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null); // Clear previous errors

        try {
            // Check user login
            let response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                onLogin(data.user, false); // Pass user data and isAdmin=false
                navigate('/user-dashboard');
                return;
            }

            // If user login fails, check admin login
            response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/admins/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                onLogin(data.admin, true); // Pass admin data and isAdmin=true
                navigate('/admin-dashboard');
                return;
            }

            // If both fail, show error
            setError('Invalid credentials. Please try again.');
        } catch (error) {
            setError('Error during login: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center relative">
            {/* Back to homepage button */}
            <div className="absolute top-4 left-4">
                <button
                    onClick={() => navigate('/')}
                    className="text-green-600 hover:text-green-700 font-semibold text-lg"
                >
                    ← Back to Homepage
                </button>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white p-8 rounded shadow-md w-96"
            >
                <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            type="submit"
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                        {error && <p className="text-red-500 mt-4">{error}</p>}
                        <Link
                            to="/signup"
                            className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800 mt-4"
                        >
                            Sign Up
                        </Link>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;

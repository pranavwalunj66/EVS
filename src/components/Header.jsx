import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, isAdmin, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    return (
        <header className="bg-green-600 text-white p-4 absloute w-full z-10 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">
                    Waste Management System
                </Link>
                <nav>
                    <ul className="flex space-x-4">
                        {isLoggedIn ? (
                            <>
                                {isAdmin ? (
                                    <>
                                        <li>
                                            <Link to="/admin-dashboard">Admin Dashboard</Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link to="/user-dashboard">User Dashboard</Link>
                                        </li>
                                    </>
                                )}
                                <li>
                                    <button onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link to="/signup">Signup</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;

import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Metrics from './components/Metrics';
import SuccessStories from './components/SuccessStories';
import ConnectedSocieties from './components/ConnectedSocieties';
import ProcessVisualization from './components/ProcessVisualization';
import RegistrationForm from './components/RegistrationForm';
import ConnectedSocietiesPage from './components/ConnectedSocietiesPage';
import DashboardNav from './components/DashboardNav';
import './App.css';
import WasteIdentification from './components/WasteIdentification';
import EducationalResources from './components/EducationalResources';
import Header from './components/Header';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import SignUp from './components/SignUp';
import AdminSignUp from './components/AdminSignUp';

const ProtectedRoute = ({ isLoggedIn, isAdmin, children }) => {
  const location = useLocation();
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (isAdmin && location.pathname !== "/admin-dashboard") {
    return <Navigate to="/admin-dashboard" state={{ from: location }} replace />;
  }
  if (!isAdmin && location.pathname !== "/user-dashboard") {
    return <Navigate to="/user-dashboard" state={{ from: location }} replace />;
  }
  return children;
};

function App() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    // Check for login state in localStorage on mount
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedIsAdmin = localStorage.getItem('isAdmin');
    const storedUser = localStorage.getItem('user');

    if (storedIsLoggedIn && storedIsAdmin && storedUser) {
      setIsLoggedIn(storedIsLoggedIn === 'true');
      setIsAdmin(storedIsAdmin === 'true');
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData, adminStatus) => {
    setIsLoggedIn(true);
    setIsAdmin(adminStatus);
    setUser(userData);

    // Store login state in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('isAdmin', adminStatus.toString());
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);

    // Clear login state from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('user');
  };

  const handleRegister = (societyData) => {
    console.log('Registered society:', societyData);
    setShowRegistration(false);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'metrics':
        return <Metrics />;
      case 'societies':
        return <ConnectedSocietiesPage onBack={() => setCurrentPage('dashboard')} />;
      case 'stories':
        return <SuccessStories />;
      case 'process':
        return <ProcessVisualization />;
      case 'identification':
        return <WasteIdentification />;
      case 'education':
        return <EducationalResources />;
      case 'registration':
        return <SignUp />;
      default:
        return <DashboardNav onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      <Router>

        <div className="min-h-screen bg-gray-50 flex flex-col">
          {/* <Header isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={handleLogout} /> */}
          {showRegistration ? (
            <div className="container mx-auto px-4 py-8">
              <button
                onClick={() => setShowRegistration(false)}
                className="mb-4 text-green-600 hover:text-green-700"
              >
                ← Back to Dashboard
              </button>
              <RegistrationForm
                onClose={() => setShowRegistration(false)}
                onRegister={handleRegister}
              />
            </div>
          ) : (

            <Routes>
              <Route path="/" element={
                <>
                  {currentPage === 'dashboard' && (
                <Hero
                      isLoggedIn={isLoggedIn} />
                  )}
                  {currentPage !== 'dashboard' && (
                    <div className="container mx-auto px-4 py-4">
                      <button
                        onClick={() => setCurrentPage('dashboard')}
                        className="text-green-600 hover:text-green-700"
                      >
                        ← Back to Dashboard
                      </button>
                    </div>
                  )}
                  <div className="container mx-auto px-4">
                    {renderPage()}
                  </div>
                </>
              } />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/admin-login" element={<AdminLogin onLogin={handleLogin} />} />
              <Route path="/admin-signup" element={<AdminSignUp />} />
              <Route
                path="/user-dashboard"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
                    <UserDashboard user={user} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

            </Routes>
          )}
        </div>

      </Router>

    </>
  );
}

export default App;

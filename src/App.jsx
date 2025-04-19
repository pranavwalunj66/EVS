import { useState } from 'react';
import Hero from './components/Hero';
import Metrics from './components/Metrics';
import SuccessStories from './components/SuccessStories';
import ConnectedSocieties from './components/ConnectedSocieties';
import ProcessVisualization from './components/ProcessVisualization';
import RegistrationForm from './components/RegistrationForm';
import ConnectedSocietiesPage from './components/ConnectedSocietiesPage';
import DashboardNav from './components/DashboardNav';
import './App.css'

function App() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

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
      default:
        return <DashboardNav onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
        <>
          <Hero onRegisterClick={() => setShowRegistration(true)} />
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
      )}
    </div>
  );
}

export default App;

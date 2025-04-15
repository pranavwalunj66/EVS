import Hero from './components/Hero';
import Metrics from './components/Metrics';
import SuccessStories from './components/SuccessStories';
import ConnectedSocieties from './components/ConnectedSocieties';
import ProcessVisualization from './components/ProcessVisualization';
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-background w-full">
      <Hero />
      <Metrics />
      <SuccessStories />
      <ConnectedSocieties />
      <ProcessVisualization />
    </div>
  );
}

export default App;

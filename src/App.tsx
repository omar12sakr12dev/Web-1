import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import { MouseFollower, ScrollProgress } from './components/InteractiveElements';
import LanguageProvider from './contexts/LanguageContext';
import AuthProvider from './contexts/AuthContext';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import OrderForm from './pages/OrderForm';
import AdminDashboard from './pages/AdminDashboard';
import Blog from './pages/Blog';
import PriceCalculator from './pages/PriceCalculator';
import Consultation from './pages/Consultation';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <div className="App min-h-screen relative">
            <ScrollProgress />
            <MouseFollower />
            <ParticleBackground />
            <Navbar />
            
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/order" element={<OrderForm />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/calculator" element={<PriceCalculator />} />
                <Route path="/consultation" element={<Consultation />} />
              </Routes>
            </AnimatePresence>
            
            <Footer />
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                },
              }}
            />
          </div>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;


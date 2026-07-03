import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AgeGate from './components/AgeGate';

function App() {
  const { i18n } = useTranslation();
  const [isAgeVerified, setIsAgeVerified] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if age verification is stored in localStorage
    const ageVerified = localStorage.getItem('ageVerified') === 'true';
    setIsAgeVerified(ageVerified);
  }, []);

  if (isAgeVerified === null) {
    return <div>Loading...</div>;
  }

  if (!isAgeVerified) {
    return <AgeGate onVerify={() => setIsAgeVerified(true)} />;
  }

  return (
    <Router>
      <Routes>
        {/* TODO: Add main routes */}
        <Route path="/" element={<div>Welcome to SameSky</div>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

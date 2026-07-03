import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface AgeGateProps {
  onVerify: () => void;
}

const AgeGate: React.FC<AgeGateProps> = ({ onVerify }) => {
  const { t } = useTranslation();
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dob) {
      setError(t('ageGate.dobRequired'));
      return;
    }

    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 15) {
      setError(t('ageGate.tooYoung'));
      return;
    }

    localStorage.setItem('ageVerified', 'true');
    localStorage.setItem('userDob', dob);
    onVerify();
  };

  return (
    <div className="age-gate-container">
      <div className="age-gate-modal">
        <h1 className="age-gate-title">{t('ageGate.title')}</h1>
        <p className="age-gate-description">{t('ageGate.description')}</p>
        
        <form onSubmit={handleVerify}>
          <input
            type="date"
            value={dob}
            onChange={(e) => {
              setDob(e.target.value);
              setError('');
            }}
            className="age-gate-input"
            max={new Date().toISOString().split('T')[0]}
          />
          
          {error && <p className="age-gate-error">{error}</p>}
          
          <button type="submit" className="age-gate-button">
            {t('ageGate.confirm')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgeGate;

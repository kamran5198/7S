import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { CompanyProfileForm } from '../components/CompanyProfileForm';
import { useSimulationStore } from '../store/simulationStore';
import { CompanyProfile } from '../types';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { simulation, setCompany, initializeSevenSModel } = useSimulationStore();
  
  const handleProfileSubmit = (profile: CompanyProfile) => {
    setCompany(profile);
    initializeSevenSModel();
    navigate('/simulation');
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Company Profile
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Define your company's characteristics to personalize the simulation.
          </p>
        </div>
        
        <CompanyProfileForm 
          onSubmit={handleProfileSubmit} 
          existingProfile={simulation.company || undefined}
        />
      </div>
    </Layout>
  );
};
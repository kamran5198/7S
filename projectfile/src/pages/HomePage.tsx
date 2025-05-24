import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Activity, FileText, BarChart3, Settings } from 'lucide-react';
import { useSimulationStore } from '../store/simulationStore';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { simulation, resetSimulation } = useSimulationStore();
  
  const startNewSimulation = () => {
    resetSimulation();
    navigate('/profile');
  };
  
  const continueSimulation = () => {
    navigate('/simulation');
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            McKinsey 7S Model Simulator
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore the dynamic relationships among the 7S elements and simulate real-time strategic decision-making.
          </p>
        </div>
        
        <div className="flex justify-center space-x-6 mb-16">
          <Button size="lg" onClick={startNewSimulation}>
            Start New Simulation
          </Button>
          
          {simulation.company && (
            <Button size="lg" variant="secondary" onClick={continueSimulation}>
              Continue Simulation
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            title="Company Profile"
            description="Set up your company's profile with industry, size, structure, and key characteristics."
            icon={<FileText className="h-8 w-8 text-blue-600" />}
          />
          
          <FeatureCard 
            title="7S Model Visualization"
            description="Visualize the interconnections between Strategy, Structure, Systems, Shared Values, Skills, Style, and Staff."
            icon={<Activity className="h-8 w-8 text-blue-600" />}
          />
          
          <FeatureCard 
            title="Strategic Decision-Making"
            description="Make decisions across various scenarios and see their impact on the 7S elements in real-time."
            icon={<Settings className="h-8 w-8 text-blue-600" />}
          />
          
          <FeatureCard 
            title="Results & Analytics"
            description="Track KPIs, alignment scores, and system health to understand the impact of your decisions."
            icon={<BarChart3 className="h-8 w-8 text-blue-600" />}
          />
        </div>
        
        <div className="mt-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            About the McKinsey 7S Model
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The McKinsey 7S Model is a framework for analyzing organizational effectiveness. 
            It examines the alignment of seven internal elements to ensure that an organization 
            can achieve its objectives.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-2 text-blue-600">Hard Elements</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li><span className="font-medium">Strategy:</span> Direction and competitive positioning</li>
                <li><span className="font-medium">Structure:</span> Organization and reporting lines</li>
                <li><span className="font-medium">Systems:</span> Business processes and information flows</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-2 text-purple-600">Soft Elements</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li><span className="font-medium">Shared Values:</span> Core beliefs and corporate culture</li>
                <li><span className="font-medium">Skills:</span> Capabilities and competencies</li>
                <li><span className="font-medium">Style:</span> Leadership approach</li>
                <li><span className="font-medium">Staff:</span> Workforce demographics and attitudes</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-2 text-green-600">CAS Integration</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li><span className="font-medium">Interconnectedness:</span> Elements affect each other</li>
                <li><span className="font-medium">Feedback Loops:</span> Circular causality patterns</li>
                <li><span className="font-medium">Emergence:</span> Complex behaviors from simple rules</li>
                <li><span className="font-medium">Adaptation:</span> System responds to changes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 transition-transform hover:-translate-y-1">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};
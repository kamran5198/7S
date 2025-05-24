import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { DecisionMaker } from '../components/DecisionMaker';
import { TensionResolver } from '../components/TensionResolver';
import { Button } from '../components/ui/Button';
import { useSimulationStore } from '../store/simulationStore';

export const DecisionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { simulation, makeDecision, resolveTension, updateKPI } = useSimulationStore();
  
  if (!simulation.company || !simulation.sevenSModel) {
    navigate('/profile');
    return null;
  }
  
  const handleMakeDecision = (decisionId: string, optionId: string) => {
    makeDecision(decisionId, optionId);
    
    // Simulate KPI updates based on decisions
    const kpis = simulation.company?.kpis || [];
    kpis.forEach(kpi => {
      // Simple random adjustment for demonstration
      const currentValue = simulation.kpiTracker.find(k => k.name === kpi.name)?.history.slice(-1)[0].value || kpi.current;
      const change = (Math.random() * 0.2 - 0.1) * currentValue; // -10% to +10% change
      updateKPI(kpi.name, currentValue + change);
    });
  };
  
  const handleResolveTension = (tensionId: string, optionId: string) => {
    resolveTension(tensionId, optionId);
  };
  
  const allDecisionsMade = simulation.decisions.every(d => d.selectedOption);
  const allTensionsResolved = simulation.tensions.every(t => t.resolved);
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Strategic Decisions
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Make strategic choices and resolve organizational tensions.
          </p>
        </div>
        
        {simulation.decisions.length > 0 && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Pending Decisions
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {simulation.decisions.map(decision => (
                <DecisionMaker 
                  key={decision.id}
                  decision={decision}
                  onMakeDecision={handleMakeDecision}
                />
              ))}
            </div>
          </>
        )}
        
        {simulation.tensions.length > 0 && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 mt-8">
              Organizational Tensions
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {simulation.tensions.map(tension => (
                <TensionResolver
                  key={tension.id}
                  tension={tension}
                  onResolve={handleResolveTension}
                />
              ))}
            </div>
          </>
        )}
        
        <div className="mt-8 flex justify-end">
          <Button 
            size="lg"
            onClick={() => navigate('/results')}
            disabled={!allDecisionsMade || !allTensionsResolved}
          >
            View Results
          </Button>
        </div>
        
        {(!allDecisionsMade || !allTensionsResolved) && (
          <p className="text-amber-600 dark:text-amber-400 text-sm mt-2 text-right">
            Please address all decisions and tensions before viewing results.
          </p>
        )}
      </div>
    </Layout>
  );
};
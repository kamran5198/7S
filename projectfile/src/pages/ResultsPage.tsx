import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { ResultsDashboard } from '../components/ResultsDashboard';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { useSimulationStore } from '../store/simulationStore';

export const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { simulation, resetSimulation } = useSimulationStore();
  
  if (!simulation.company || !simulation.sevenSModel) {
    navigate('/profile');
    return null;
  }
  
  const handleStartNew = () => {
    resetSimulation();
    navigate('/profile');
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Simulation Results
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
              Review the outcomes of your strategic decisions.
            </p>
          </div>
          <Button onClick={handleStartNew}>
            Start New Simulation
          </Button>
        </div>
        
        <ResultsDashboard simulation={simulation} />
        
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getInsightsForSimulation(simulation).map((insight, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-md ${insight.type === 'positive' 
                    ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500' 
                    : insight.type === 'negative' 
                      ? 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500' 
                      : 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500'
                  }`}
                >
                  <p className={`font-medium ${insight.type === 'positive' 
                    ? 'text-green-800 dark:text-green-300' 
                    : insight.type === 'negative' 
                      ? 'text-red-800 dark:text-red-300' 
                      : 'text-blue-800 dark:text-blue-300'
                  }`}>
                    {insight.title}
                  </p>
                  <p className={`mt-1 text-sm ${insight.type === 'positive' 
                    ? 'text-green-700 dark:text-green-400' 
                    : insight.type === 'negative' 
                      ? 'text-red-700 dark:text-red-400' 
                      : 'text-blue-700 dark:text-blue-400'
                  }`}>
                    {insight.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 flex justify-between">
          <Button variant="outline" onClick={() => navigate('/decisions')}>
            Back to Decisions
          </Button>
          <Button onClick={handleStartNew}>
            Start New Simulation
          </Button>
        </div>
      </div>
    </Layout>
  );
};

interface Insight {
  title: string;
  description: string;
  type: 'positive' | 'negative' | 'neutral';
}

function getInsightsForSimulation(simulation: any): Insight[] {
  const { sevenSModel, decisions } = simulation;
  
  if (!sevenSModel) return [];
  
  const insights: Insight[] = [];
  
  // Overall alignment insight
  if (sevenSModel.alignmentScore > 0.8) {
    insights.push({
      title: 'Strong Organizational Alignment',
      description: 'Your organization shows excellent alignment across the 7S elements, providing a solid foundation for strategic execution.',
      type: 'positive'
    });
  } else if (sevenSModel.alignmentScore < 0.5) {
    insights.push({
      title: 'Alignment Challenges',
      description: 'Your organization has significant misalignments that may hinder strategic execution. Focus on aligning the 7S elements more effectively.',
      type: 'negative'
    });
  } else {
    insights.push({
      title: 'Moderate Alignment',
      description: 'Your organization has reasonable alignment with some areas that could be improved for better strategic execution.',
      type: 'neutral'
    });
  }
  
  // Strategy-Structure alignment
  if (sevenSModel.strategy.alignmentScore > 0.7 && sevenSModel.structure.alignmentScore > 0.7) {
    insights.push({
      title: 'Strategy-Structure Fit',
      description: 'Your organizational structure supports your strategic direction well, enabling effective execution.',
      type: 'positive'
    });
  } else if (sevenSModel.strategy.alignmentScore > 0.7 && sevenSModel.structure.alignmentScore < 0.5) {
    insights.push({
      title: 'Strategy-Structure Mismatch',
      description: 'Your ambitious strategy may be constrained by your current organizational structure. Consider structural adjustments.',
      type: 'negative'
    });
  }
  
  // Systems effectiveness
  if (sevenSModel.systems.alignmentScore < 0.6) {
    insights.push({
      title: 'Systems Need Attention',
      description: 'Your organizational systems may not adequately support your strategy and structure. Review and update key processes.',
      type: 'negative'
    });
  }
  
  // People factors (Staff, Skills, Style)
  const peopleFactors = [
    sevenSModel.staff.alignmentScore,
    sevenSModel.skills.alignmentScore,
    sevenSModel.style.alignmentScore
  ];
  const avgPeopleScore = peopleFactors.reduce((sum, score) => sum + score, 0) / peopleFactors.length;
  
  if (avgPeopleScore > 0.75) {
    insights.push({
      title: 'Strong People Factors',
      description: 'Your staff capabilities, skills development, and leadership style are well-aligned and support your strategic direction.',
      type: 'positive'
    });
  } else if (avgPeopleScore < 0.5) {
    insights.push({
      title: 'People Factors Lagging',
      description: 'Your human elements (staff, skills, leadership style) need attention to better support your strategic objectives.',
      type: 'negative'
    });
  }
  
  // Add insights based on specific decisions if there are any
  if (decisions.length > 0) {
    // Find if any decisions had significant positive or negative impacts
    const decisionImpacts = decisions
      .filter(d => d.selectedOption)
      .flatMap(d => {
        const option = d.options.find(o => o.id === d.selectedOption);
        if (!option) return [];
        return d.impact.filter(i => i.description.includes(option.description));
      });
    
    const significantPositiveImpacts = decisionImpacts.filter(i => i.value > 0.15);
    const significantNegativeImpacts = decisionImpacts.filter(i => i.value < -0.15);
    
    if (significantPositiveImpacts.length > 0) {
      insights.push({
        title: 'High-Impact Decisions',
        description: 'Some of your strategic decisions had significant positive effects, particularly on ' + 
          significantPositiveImpacts.map(i => i.element).join(', ') + '.',
        type: 'positive'
      });
    }
    
    if (significantNegativeImpacts.length > 0) {
      insights.push({
        title: 'Challenging Decisions',
        description: 'Some decisions had notable negative consequences, particularly affecting ' + 
          significantNegativeImpacts.map(i => i.element).join(', ') + '. Consider mitigation strategies.',
        type: 'negative'
      });
    }
  }
  
  return insights;
}
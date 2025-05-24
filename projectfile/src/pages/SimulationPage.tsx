import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { SevenSModelViz } from '../components/SevenSModelViz';
import { StrategySelector } from '../components/StrategySelector';
import { StructureSelector } from '../components/StructureSelector';
import { SystemsSelector } from '../components/SystemsSelector';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useSimulationStore } from '../store/simulationStore';
import { generateId } from '../lib/utils';

export const SimulationPage: React.FC = () => {
  const navigate = useNavigate();
  const { simulation, updateSevenSElement, addTension, addDecision } = useSimulationStore();
  const [activeTab, setActiveTab] = useState<'visualization' | 'strategy' | 'structure' | 'systems'>('visualization');
  
  if (!simulation.company || !simulation.sevenSModel) {
    navigate('/profile');
    return null;
  }
  
  const handleContinue = () => {
    // Generate some tensions based on the current model state
    generateTensions();
    
    // Generate some decisions based on the current model state
    generateDecisions();
    
    // Navigate to the decisions page
    navigate('/decisions');
  };
  
  const generateTensions = () => {
    const { sevenSModel } = simulation;
    if (!sevenSModel) return;
    
    // Example: Generate a tension between Strategy and Structure
    if (sevenSModel.strategy.corporateLevel === 'Product Development' && 
        sevenSModel.structure.type === 'Mechanistic') {
      addTension({
        elements: ['Strategy', 'Structure'],
        description: 'Your product development strategy requires innovation and flexibility, but your mechanistic structure may hinder creativity and rapid iteration.',
        severity: 7,
        resolutionOptions: [
          {
            id: generateId(),
            description: 'Create cross-functional innovation teams that operate with different rules than the rest of the organization',
            impacts: [
              { element: 'Structure', value: 0.1, description: 'Slightly more organic structure' },
              { element: 'Strategy', value: 0.2, description: 'Better alignment with product development goals' }
            ]
          },
          {
            id: generateId(),
            description: 'Shift to a hybrid structure with mechanistic elements for operations and organic elements for innovation',
            impacts: [
              { element: 'Structure', value: 0.3, description: 'More balanced structure' },
              { element: 'Systems', value: -0.1, description: 'More complex systems to manage' }
            ]
          },
          {
            id: generateId(),
            description: 'Modify strategy to focus more on incremental improvements rather than disruptive innovation',
            impacts: [
              { element: 'Strategy', value: -0.2, description: 'Less ambitious strategy' },
              { element: 'Structure', value: 0.1, description: 'Better fit with current structure' }
            ]
          }
        ],
        resolved: false
      });
    }
    
    // Example: Generate a tension between Systems and Staff
    if (sevenSModel.systems.hr.performanceManagement === 'Annual performance reviews' && 
        sevenSModel.staff.changeReadiness > 0.7) {
      addTension({
        elements: ['Systems', 'Staff'],
        description: 'Your staff has high change readiness, but your annual performance review system doesn\'t provide frequent enough feedback for continuous improvement.',
        severity: 5,
        resolutionOptions: [
          {
            id: generateId(),
            description: 'Implement a continuous feedback system with regular check-ins',
            impacts: [
              { element: 'Systems', value: 0.2, description: 'More responsive performance management' },
              { element: 'Staff', value: 0.1, description: 'Increased engagement' }
            ]
          },
          {
            id: generateId(),
            description: 'Add quarterly pulse surveys while maintaining annual reviews',
            impacts: [
              { element: 'Systems', value: 0.1, description: 'Somewhat more responsive' },
              { element: 'Staff', value: 0.05, description: 'Slightly increased engagement' }
            ]
          }
        ],
        resolved: false
      });
    }
    
    // Generate more tensions based on other potential misalignments
  };
  
  const generateDecisions = () => {
    const { company, sevenSModel, scenarioId } = simulation;
    if (!company || !sevenSModel) return;
    
    // Example: Decision about entering a new market
    addDecision({
      scenarioId,
      element: 'Strategy',
      description: `${company.name} has an opportunity to enter a new geographical market. How should you proceed?`,
      options: [
        {
          id: generateId(),
          description: 'Rapid expansion with significant investment'
        },
        {
          id: generateId(),
          description: 'Phased approach with measured investment'
        },
        {
          id: generateId(),
          description: 'Partnership with local established player'
        }
      ],
      impact: [
        { 
          element: 'Strategy', 
          value: 0.2, 
          description: 'Rapid expansion with significant investment - Higher growth potential'
        },
        { 
          element: 'Structure', 
          value: -0.1, 
          description: 'Rapid expansion with significant investment - Organizational strain'
        },
        { 
          element: 'Systems', 
          value: -0.15, 
          description: 'Rapid expansion with significant investment - Systems overload'
        },
        { 
          element: 'Strategy', 
          value: 0.1, 
          description: 'Phased approach with measured investment - Controlled growth'
        },
        { 
          element: 'Structure', 
          value: 0.05, 
          description: 'Phased approach with measured investment - Manageable adaptation'
        },
        { 
          element: 'Systems', 
          value: 0.05, 
          description: 'Phased approach with measured investment - Gradual systems scaling'
        },
        { 
          element: 'Strategy', 
          value: 0.15, 
          description: 'Partnership with local established player - Faster market access'
        },
        { 
          element: 'Skills', 
          value: 0.1, 
          description: 'Partnership with local established player - Knowledge acquisition'
        },
        { 
          element: 'Shared Values', 
          value: -0.05, 
          description: 'Partnership with local established player - Potential culture clash'
        }
      ]
    });
    
    // Example: Decision about leadership development program
    addDecision({
      scenarioId,
      element: 'Staff',
      description: `The board is asking for a leadership development initiative. Which approach should ${company.name} take?`,
      options: [
        {
          id: generateId(),
          description: 'Executive coaching for top management only'
        },
        {
          id: generateId(),
          description: 'Comprehensive program for all management levels'
        },
        {
          id: generateId(),
          description: 'Focus on identifying and developing high-potential employees'
        }
      ],
      impact: [
        { 
          element: 'Staff', 
          value: 0.05, 
          description: 'Executive coaching for top management only - Limited leadership improvement'
        },
        { 
          element: 'Style', 
          value: 0.1, 
          description: 'Executive coaching for top management only - More effective senior leadership'
        },
        { 
          element: 'Staff', 
          value: 0.2, 
          description: 'Comprehensive program for all management levels - Broad leadership improvement'
        },
        { 
          element: 'Systems', 
          value: 0.1, 
          description: 'Comprehensive program for all management levels - Better management systems'
        },
        { 
          element: 'Skills', 
          value: 0.15, 
          description: 'Comprehensive program for all management levels - Enhanced management skills'
        },
        { 
          element: 'Staff', 
          value: 0.1, 
          description: 'Focus on high-potential employees - Targeted improvement'
        },
        { 
          element: 'Shared Values', 
          value: -0.05, 
          description: 'Focus on high-potential employees - Potential perception of favoritism'
        }
      ]
    });
    
    // Generate more decisions based on the company profile and model state
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            7S Model Simulation
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Visualize and adjust your organization's 7S elements to optimize alignment.
          </p>
        </div>
        
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <TabButton 
              active={activeTab === 'visualization'} 
              onClick={() => setActiveTab('visualization')}
            >
              Visualization
            </TabButton>
            <TabButton 
              active={activeTab === 'strategy'} 
              onClick={() => setActiveTab('strategy')}
            >
              Strategy
            </TabButton>
            <TabButton 
              active={activeTab === 'structure'} 
              onClick={() => setActiveTab('structure')}
            >
              Structure
            </TabButton>
            <TabButton 
              active={activeTab === 'systems'} 
              onClick={() => setActiveTab('systems')}
            >
              Systems
            </TabButton>
          </nav>
        </div>
        
        <div className="space-y-6">
          {activeTab === 'visualization' && (
            <>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Organizational Alignment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md text-center">
                      <div className="text-sm text-blue-800 dark:text-blue-300 mb-1">Strategy</div>
                      <div className="font-medium text-2xl text-blue-600 dark:text-blue-400">
                        {(simulation.sevenSModel.strategy.alignmentScore * 100).toFixed(0)}%
                      </div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md text-center">
                      <div className="text-sm text-green-800 dark:text-green-300 mb-1">Structure</div>
                      <div className="font-medium text-2xl text-green-600 dark:text-green-400">
                        {(simulation.sevenSModel.structure.alignmentScore * 100).toFixed(0)}%
                      </div>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-md text-center">
                      <div className="text-sm text-amber-800 dark:text-amber-300 mb-1">Systems</div>
                      <div className="font-medium text-2xl text-amber-600 dark:text-amber-400">
                        {(simulation.sevenSModel.systems.alignmentScore * 100).toFixed(0)}%
                      </div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-md text-center">
                      <div className="text-sm text-purple-800 dark:text-purple-300 mb-1">Shared Values</div>
                      <div className="font-medium text-2xl text-purple-600 dark:text-purple-400">
                        {(simulation.sevenSModel.sharedValues.alignmentScore * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-md text-center">
                      <div className="text-sm text-pink-800 dark:text-pink-300 mb-1">Skills</div>
                      <div className="font-medium text-2xl text-pink-600 dark:text-pink-400">
                        {(simulation.sevenSModel.skills.alignmentScore * 100).toFixed(0)}%
                      </div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md text-center">
                      <div className="text-sm text-red-800 dark:text-red-300 mb-1">Style</div>
                      <div className="font-medium text-2xl text-red-600 dark:text-red-400">
                        {(simulation.sevenSModel.style.alignmentScore * 100).toFixed(0)}%
                      </div>
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-md text-center">
                      <div className="text-sm text-indigo-800 dark:text-indigo-300 mb-1">Staff</div>
                      <div className="font-medium text-2xl text-indigo-600 dark:text-indigo-400">
                        {(simulation.sevenSModel.staff.alignmentScore * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <SevenSModelViz model={simulation.sevenSModel} />
              
              <div className="mt-6 flex justify-end">
                <Button size="lg" onClick={handleContinue}>
                  Continue to Decisions
                </Button>
              </div>
            </>
          )}
          
          {activeTab === 'strategy' && (
            <StrategySelector 
              strategy={simulation.sevenSModel.strategy}
              onUpdate={(strategy) => updateSevenSElement('Strategy', strategy)}
            />
          )}
          
          {activeTab === 'structure' && (
            <StructureSelector 
              structure={simulation.sevenSModel.structure}
              onUpdate={(structure) => updateSevenSElement('Structure', structure)}
            />
          )}
          
          {activeTab === 'systems' && (
            <SystemsSelector 
              systems={simulation.sevenSModel.systems}
              onUpdate={(systems) => updateSevenSElement('Systems', systems)}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, children }) => (
  <button
    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
      active
        ? "border-blue-500 text-blue-600 dark:border-blue-500 dark:text-blue-400"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);
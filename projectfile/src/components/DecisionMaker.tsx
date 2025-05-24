import React, { useState } from 'react';
import { Decision, DecisionOption, Impact } from '../types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from './ui/Card';
import { Button } from './ui/Button';
import { Select } from './ui/Select';
import { getElementColor } from '../lib/utils';

interface DecisionMakerProps {
  decision: Decision;
  onMakeDecision: (decisionId: string, optionId: string) => void;
}

export const DecisionMaker: React.FC<DecisionMakerProps> = ({ decision, onMakeDecision }) => {
  const [selectedOption, setSelectedOption] = useState<string>(decision.selectedOption || '');
  
  const handleMakeDecision = () => {
    if (selectedOption) {
      onMakeDecision(decision.id, selectedOption);
    }
  };
  
  return (
    <Card className={decision.selectedOption ? 'border-green-500 dark:border-green-700' : ''}>
      <CardHeader>
        <CardTitle>Decision: {decision.element}</CardTitle>
        <CardDescription>
          Scenario #{decision.scenarioId}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {decision.description}
        </p>
        
        {!decision.selectedOption ? (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Options
            </label>
            <Select
              value={selectedOption}
              onChange={e => setSelectedOption(e.target.value)}
              disabled={!!decision.selectedOption}
            >
              <option value="">Select an option...</option>
              {decision.options.map(option => (
                <option key={option.id} value={option.id}>
                  {option.description}
                </option>
              ))}
            </Select>
            
            {selectedOption && (
              <div className="mt-4 space-y-2">
                <h4 className="font-medium text-gray-800 dark:text-white">Potential Impacts</h4>
                {getOptionImpacts(decision, selectedOption).map((impact, index) => (
                  <div 
                    key={index} 
                    className="flex items-center text-sm"
                  >
                    <span 
                      className="w-2 h-2 rounded-full mr-2"
                      style={{ backgroundColor: getElementColor(impact.element) }}
                    />
                    <span className="font-medium">{impact.element}:</span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">
                      {impact.description} ({impact.value > 0 ? '+' : ''}{impact.value.toFixed(2)})
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md">
            <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">Decision Made</h4>
            <p className="text-sm text-green-700 dark:text-green-400">
              {decision.options.find(o => o.id === decision.selectedOption)?.description}
            </p>
            
            <div className="mt-4 space-y-2">
              <h4 className="font-medium text-green-800 dark:text-green-300">Impacts</h4>
              {getOptionImpacts(decision, decision.selectedOption || '').map((impact, index) => (
                <div 
                  key={index} 
                  className="flex items-center text-sm"
                >
                  <span 
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: getElementColor(impact.element) }}
                  />
                  <span className="font-medium">{impact.element}:</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    {impact.description} ({impact.value > 0 ? '+' : ''}{impact.value.toFixed(2)})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      {!decision.selectedOption && (
        <CardFooter>
          <Button 
            onClick={handleMakeDecision} 
            disabled={!selectedOption || !!decision.selectedOption}
          >
            Make Decision
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

function getOptionImpacts(decision: Decision, optionId: string): Impact[] {
  const option = decision.options.find(opt => opt.id === optionId);
  if (!option) return [];
  
  return decision.impact.filter(impact => 
    impact.description.includes(option.description)
  );
}
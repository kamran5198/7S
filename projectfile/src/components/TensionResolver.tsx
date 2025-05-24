import React, { useState } from 'react';
import { Tension, ResolutionOption, Impact } from '../types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from './ui/Card';
import { Button } from './ui/Button';
import { Select } from './ui/Select';
import { getElementColor } from '../lib/utils';

interface TensionResolverProps {
  tension: Tension;
  onResolve: (tensionId: string, optionId: string) => void;
}

export const TensionResolver: React.FC<TensionResolverProps> = ({ tension, onResolve }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  
  const handleResolve = () => {
    if (selectedOption) {
      onResolve(tension.id, selectedOption);
    }
  };
  
  return (
    <Card className={tension.resolved ? 'border-green-500 dark:border-green-700' : 'border-amber-500 dark:border-amber-700'}>
      <CardHeader className={tension.resolved ? 'bg-green-50 dark:bg-green-900/20' : 'bg-amber-50 dark:bg-amber-900/20'}>
        <CardTitle className="flex items-center">
          <span 
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: getElementColor(tension.elements[0]) }}
          />
          {tension.elements[0]} 
          <span className="mx-2">⟷</span>
          <span 
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: getElementColor(tension.elements[1]) }}
          />
          {tension.elements[1]}
        </CardTitle>
        <CardDescription>
          {tension.resolved ? 'Resolved Tension' : `Severity: ${tension.severity}/10`}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {tension.description}
        </p>
        
        {!tension.resolved ? (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Resolution Options
            </label>
            <Select
              value={selectedOption}
              onChange={e => setSelectedOption(e.target.value)}
              disabled={tension.resolved}
            >
              <option value="">Select an option...</option>
              {tension.resolutionOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.description}
                </option>
              ))}
            </Select>
            
            {selectedOption && (
              <div className="mt-4 space-y-2">
                <h4 className="font-medium text-gray-800 dark:text-white">Potential Impacts</h4>
                {getSelectedOptionImpacts(tension.resolutionOptions, selectedOption).map((impact, index) => (
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
            <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">Resolution Applied</h4>
            <p className="text-sm text-green-700 dark:text-green-400">
              {tension.resolutionOptions.find(o => o.id === selectedOption)?.description || 
              "This tension has been successfully resolved."}
            </p>
          </div>
        )}
      </CardContent>
      {!tension.resolved && (
        <CardFooter>
          <Button 
            onClick={handleResolve} 
            disabled={!selectedOption || tension.resolved}
          >
            Apply Resolution
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

function getSelectedOptionImpacts(options: ResolutionOption[], selectedId: string): Impact[] {
  const option = options.find(opt => opt.id === selectedId);
  return option ? option.impacts : [];
}
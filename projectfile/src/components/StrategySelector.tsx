import React, { useState } from 'react';
import { 
  StrategyElement, 
  CorporateLevelStrategy, 
  BusinessLevelStrategy, 
  FunctionalLevelStrategy
} from '../types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/Card';
import { Button } from './ui/Button';
import { Select } from './ui/Select';
import { Textarea } from './ui/Textarea';
import { useSimulationStore } from '../store/simulationStore';

interface StrategySelectorProps {
  strategy: StrategyElement;
  onUpdate: (strategy: StrategyElement) => void;
}

export const StrategySelector: React.FC<StrategySelectorProps> = ({ strategy, onUpdate }) => {
  const [corporateLevel, setCorporateLevel] = useState<CorporateLevelStrategy>(strategy.corporateLevel);
  const [businessLevel, setBusinessLevel] = useState<BusinessLevelStrategy>(strategy.businessLevel);
  const [functionalLevel, setFunctionalLevel] = useState<FunctionalLevelStrategy>(strategy.functionalLevel);
  const [rationale, setRationale] = useState("");
  
  const handleSubmit = () => {
    onUpdate({
      ...strategy,
      corporateLevel,
      businessLevel,
      functionalLevel
    });
  };
  
  const corporateStrategies: CorporateLevelStrategy[] = [
    'Market Penetration',
    'Product Development',
    'Market Development',
    'Related Diversification',
    'Unrelated Diversification',
    'Forward Integration',
    'Backward Integration',
    'Horizontal Integration',
    'Joint Venture',
    'Strategic Alliance',
    'Merger & Acquisition',
    'Turnaround',
    'Divestiture',
    'Liquidation',
    'Harvesting',
    'Stability'
  ];
  
  const businessStrategies: BusinessLevelStrategy[] = [
    'Cost Leadership',
    'Differentiation',
    'Focus - Cost',
    'Focus - Differentiation'
  ];
  
  const functionalStrategies: FunctionalLevelStrategy[] = [
    'Dynamic Capabilities',
    'Knowledge Management',
    'Innovation',
    'Operational Excellence',
    'Customer Intimacy',
    'Product Leadership'
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Strategic Direction</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Corporate Level Strategy
          </label>
          <Select
            value={corporateLevel}
            onChange={e => setCorporateLevel(e.target.value as CorporateLevelStrategy)}
          >
            {corporateStrategies.map(strategy => (
              <option key={strategy} value={strategy}>
                {strategy}
              </option>
            ))}
          </Select>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {getStrategyDescription(corporateLevel, 'corporate')}
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Business Level Strategy
          </label>
          <Select
            value={businessLevel}
            onChange={e => setBusinessLevel(e.target.value as BusinessLevelStrategy)}
          >
            {businessStrategies.map(strategy => (
              <option key={strategy} value={strategy}>
                {strategy}
              </option>
            ))}
          </Select>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {getStrategyDescription(businessLevel, 'business')}
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Functional Level Strategy
          </label>
          <Select
            value={functionalLevel}
            onChange={e => setFunctionalLevel(e.target.value as FunctionalLevelStrategy)}
          >
            {functionalStrategies.map(strategy => (
              <option key={strategy} value={strategy}>
                {strategy}
              </option>
            ))}
          </Select>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {getStrategyDescription(functionalLevel, 'functional')}
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Strategy Rationale
          </label>
          <Textarea
            value={rationale}
            onChange={e => setRationale(e.target.value)}
            placeholder="Explain why these strategies align with your organizational goals..."
          />
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md">
          <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Strategy Impact Analysis</h4>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            {getStrategyImpact(corporateLevel, businessLevel, functionalLevel)}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit}>
          Update Strategy
        </Button>
      </CardFooter>
    </Card>
  );
};

function getStrategyDescription(strategy: string, level: 'corporate' | 'business' | 'functional'): string {
  const descriptions: Record<string, string> = {
    // Corporate level
    'Market Penetration': 'Increasing market share with existing products in existing markets.',
    'Product Development': 'Introducing new products to existing markets.',
    'Market Development': 'Entering new markets with existing products.',
    'Related Diversification': 'Expanding into related industries or product lines.',
    'Unrelated Diversification': 'Expanding into unrelated industries or product lines.',
    'Forward Integration': 'Acquiring or controlling distributors or retailers.',
    'Backward Integration': 'Acquiring or controlling suppliers.',
    'Horizontal Integration': 'Acquiring or controlling competitors.',
    'Joint Venture': 'Partnering with another company for a specific project or market.',
    'Strategic Alliance': 'Forming a partnership without creating a new entity.',
    'Merger & Acquisition': 'Combining with or acquiring another company.',
    'Turnaround': 'Reversing declining performance through cost reduction and restructuring.',
    'Divestiture': 'Selling a business unit or division.',
    'Liquidation': 'Selling all assets and closing the business.',
    'Harvesting': 'Minimizing investment to maximize short-term cash flow.',
    'Stability': 'Maintaining current position without significant changes.',
    
    // Business level
    'Cost Leadership': 'Offering the lowest prices in the market through efficient operations.',
    'Differentiation': 'Creating unique products or services that competitors cannot easily imitate.',
    'Focus - Cost': 'Offering the lowest prices to a specific market segment.',
    'Focus - Differentiation': 'Creating unique products for a specific market segment.',
    
    // Functional level
    'Dynamic Capabilities': 'Developing the ability to quickly reconfigure resources for changing environments.',
    'Knowledge Management': 'Creating, sharing, and effectively using organizational knowledge.',
    'Innovation': 'Developing new products, services, or processes.',
    'Operational Excellence': 'Focusing on efficient operations and processes.',
    'Customer Intimacy': 'Building deep customer relationships and delivering custom solutions.',
    'Product Leadership': 'Focusing on product innovation and quality.'
  };
  
  return descriptions[strategy] || 'No description available.';
}

function getStrategyImpact(
  corporate: CorporateLevelStrategy, 
  business: BusinessLevelStrategy, 
  functional: FunctionalLevelStrategy
): string {
  // Simplified impact analysis
  if (corporate === 'Market Penetration' && business === 'Cost Leadership') {
    return "This combination suggests an aggressive pricing strategy to capture market share. It may require significant operational efficiency improvements and could impact staff morale if cost-cutting measures are implemented.";
  } else if (corporate.includes('Diversification') && business === 'Differentiation') {
    return "This approach focuses on creating unique offerings in new markets. It will require significant innovation capabilities, an adaptive organizational structure, and strong leadership to manage the complexity.";
  } else if (corporate === 'Turnaround') {
    return "Turnaround strategies often create tension between short-term cost-cutting and long-term capability building. Leadership style will need to be directive initially, while systems must support quick decision-making.";
  } else if (functional === 'Innovation') {
    return "Focusing on innovation requires an organic structure, collaborative culture, and skills development. This may conflict with certain cost leadership approaches at the business level.";
  }
  
  return "This strategic combination will require alignment across all 7S elements. Consider how your structure, systems, and staff capabilities will need to evolve to support these strategic choices.";
}
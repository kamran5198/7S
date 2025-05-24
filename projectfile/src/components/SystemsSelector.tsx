import React, { useState } from 'react';
import { SystemsElement, HRSystem } from '../types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/Card';
import { Button } from './ui/Button';
import { Select } from './ui/Select';
import { Textarea } from './ui/Textarea';

interface SystemsSelectorProps {
  systems: SystemsElement;
  onUpdate: (systems: SystemsElement) => void;
}

export const SystemsSelector: React.FC<SystemsSelectorProps> = ({ systems, onUpdate }) => {
  const [financial, setFinancial] = useState(systems.financial);
  const [operational, setOperational] = useState(systems.operational);
  const [information, setInformation] = useState(systems.information);
  const [hrSystem, setHRSystem] = useState<HRSystem>(systems.hr);
  
  const handleSubmit = () => {
    onUpdate({
      ...systems,
      financial,
      operational,
      information,
      hr: hrSystem
    });
  };

  const financialOptions = [
    'Traditional budgeting and reporting',
    'Zero-based budgeting',
    'Activity-based costing',
    'Beyond budgeting',
    'Rolling forecasts',
    'Balanced scorecard'
  ];
  
  const operationalOptions = [
    'Standard operating procedures',
    'Total quality management',
    'Six sigma',
    'Lean operations',
    'Agile methodologies',
    'Business process reengineering'
  ];
  
  const informationOptions = [
    'Legacy systems with some modern tools',
    'Cloud-based enterprise systems',
    'Integrated ERP systems',
    'Data-driven decision making',
    'AI-augmented analytics',
    'Decentralized information systems'
  ];
  
  const hrOptions = {
    talentAcquisition: [
      'Traditional recruitment',
      'Employer branding focus',
      'AI-powered talent acquisition',
      'Internal talent marketplace',
      'Gig economy integration'
    ],
    trainingDevelopment: [
      'Basic training programs',
      'Continuous learning culture',
      'Personalized development paths',
      'Peer learning networks',
      'External partnerships'
    ],
    performanceManagement: [
      'Annual performance reviews',
      'Continuous feedback',
      'OKRs (Objectives & Key Results)',
      'Multi-source feedback',
      'Performance coaching'
    ],
    compensationBenefits: [
      'Market-based compensation',
      'Pay-for-performance',
      'Total rewards approach',
      'Flexible benefits',
      'Equity-based compensation'
    ]
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Organizational Systems</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Financial Systems
          </label>
          <Select
            value={financial}
            onChange={e => setFinancial(e.target.value)}
          >
            {financialOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Operational Processes
          </label>
          <Select
            value={operational}
            onChange={e => setOperational(e.target.value)}
          >
            {operationalOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Information Systems
          </label>
          <Select
            value={information}
            onChange={e => setInformation(e.target.value)}
          >
            {informationOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">HR Systems</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Talent Acquisition
              </label>
              <Select
                value={hrSystem.talentAcquisition}
                onChange={e => setHRSystem({...hrSystem, talentAcquisition: e.target.value})}
              >
                {hrOptions.talentAcquisition.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Training & Development
              </label>
              <Select
                value={hrSystem.trainingDevelopment}
                onChange={e => setHRSystem({...hrSystem, trainingDevelopment: e.target.value})}
              >
                {hrOptions.trainingDevelopment.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Performance Management
              </label>
              <Select
                value={hrSystem.performanceManagement}
                onChange={e => setHRSystem({...hrSystem, performanceManagement: e.target.value})}
              >
                {hrOptions.performanceManagement.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Compensation & Benefits
              </label>
              <Select
                value={hrSystem.compensationBenefits}
                onChange={e => setHRSystem({...hrSystem, compensationBenefits: e.target.value})}
              >
                {hrOptions.compensationBenefits.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md">
          <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Systems Impact Analysis</h4>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            {getSystemsImpact(financial, operational, information, hrSystem)}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit}>
          Update Systems
        </Button>
      </CardFooter>
    </Card>
  );
};

function getSystemsImpact(
  financial: string,
  operational: string,
  information: string,
  hr: HRSystem
): string {
  let impact = '';
  
  // Financial impact
  if (financial.includes('Traditional')) {
    impact += 'Traditional financial systems provide stability but may limit agility. ';
  } else if (financial.includes('Zero-based')) {
    impact += 'Zero-based budgeting supports cost control but requires significant management attention. ';
  } else if (financial.includes('Beyond')) {
    impact += 'Beyond budgeting enables adaptability but requires a mature culture of trust. ';
  }
  
  // Operational impact
  if (operational.includes('Agile')) {
    impact += 'Agile methodologies support flexibility and innovation but may create friction with traditional systems. ';
  } else if (operational.includes('Lean')) {
    impact += 'Lean operations drive efficiency but require cultural commitment to continuous improvement. ';
  } else if (operational.includes('Six sigma')) {
    impact += 'Six sigma reduces variation but may stifle innovation if applied too rigidly. ';
  }
  
  // HR impact
  const hrMaturity = 
    hr.talentAcquisition.includes('AI') ||
    hr.trainingDevelopment.includes('Personalized') ||
    hr.performanceManagement.includes('OKRs') ||
    hr.compensationBenefits.includes('Equity');
  
  if (hrMaturity) {
    impact += 'Your advanced HR systems should support a high-performance culture and talent development. ';
  } else {
    impact += 'Consider evolving your HR systems to better support your strategic objectives. ';
  }
  
  return impact;
}
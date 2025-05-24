import React, { useState } from 'react';
import { StructureElement } from '../types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/Card';
import { Button } from './ui/Button';
import { Select } from './ui/Select';

interface StructureSelectorProps {
  structure: StructureElement;
  onUpdate: (structure: StructureElement) => void;
}

export const StructureSelector: React.FC<StructureSelectorProps> = ({ structure, onUpdate }) => {
  const [type, setType] = useState<'Organic' | 'Mechanistic' | 'Hybrid'>(structure.type);
  const [centralization, setCentralization] = useState(structure.centralization);
  const [formalization, setFormalization] = useState(structure.formalization);
  const [complexity, setComplexity] = useState(structure.complexity);
  
  const handleSubmit = () => {
    onUpdate({
      ...structure,
      type,
      centralization,
      formalization,
      complexity
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Organizational Structure</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Structure Type
          </label>
          <Select
            value={type}
            onChange={e => setType(e.target.value as 'Organic' | 'Mechanistic' | 'Hybrid')}
          >
            <option value="Organic">Organic</option>
            <option value="Mechanistic">Mechanistic</option>
            <option value="Hybrid">Hybrid</option>
          </Select>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {type === 'Organic' ? 
              'Flexible, adaptable structure with decentralized authority' : 
              type === 'Mechanistic' ? 
                'Rigid, hierarchical structure with centralized authority' : 
                'Combines elements of both organic and mechanistic structures'}
          </p>
        </div>
        
        <div>
          <label className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <span>Centralization</span>
            <span>{Math.round(centralization * 100)}%</span>
          </label>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={centralization}
            onChange={e => setCentralization(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Decentralized</span>
            <span>Centralized</span>
          </div>
        </div>
        
        <div>
          <label className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <span>Formalization</span>
            <span>{Math.round(formalization * 100)}%</span>
          </label>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={formalization}
            onChange={e => setFormalization(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Informal</span>
            <span>Formal</span>
          </div>
        </div>
        
        <div>
          <label className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <span>Complexity</span>
            <span>{Math.round(complexity * 100)}%</span>
          </label>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={complexity}
            onChange={e => setComplexity(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Simple</span>
            <span>Complex</span>
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md">
          <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Structure Impact Analysis</h4>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            {getStructureImpactDescription(type, centralization, formalization, complexity)}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit}>
          Update Structure
        </Button>
      </CardFooter>
    </Card>
  );
};

function getStructureImpactDescription(
  type: string, 
  centralization: number, 
  formalization: number, 
  complexity: number
): string {
  let description = "";
  
  if (type === "Organic") {
    description += "Organic structures are adaptable and work well for innovation-focused strategies. ";
    if (centralization > 0.6) {
      description += "However, your high centralization may limit the benefits of an organic structure. ";
    }
  } else if (type === "Mechanistic") {
    description += "Mechanistic structures provide efficiency and clear control, supporting operational excellence. ";
    if (centralization < 0.4) {
      description += "Your low centralization seems at odds with a mechanistic structure. ";
    }
  } else {
    description += "Hybrid structures can be versatile but may create internal tensions if not carefully managed. ";
  }
  
  if (formalization > 0.7) {
    description += "High formalization works well for stable environments but may hinder adaptation to change. ";
  } else if (formalization < 0.3) {
    description += "Low formalization enables flexibility but may create consistency challenges. ";
  }
  
  if (complexity > 0.7) {
    description += "Complex structures require sophisticated management systems and clear communication channels. ";
  } else if (complexity < 0.3) {
    description += "Simple structures enable quick decision-making but may limit specialization. ";
  }
  
  return description;
}
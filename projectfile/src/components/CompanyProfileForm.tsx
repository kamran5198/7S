import React from 'react';
import { useForm } from 'react-hook-form';
import { CompanyProfile, KPI } from '../types';
import { Button } from './ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/Card';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Textarea } from './ui/Textarea';
import { generateId } from '../lib/utils';

interface CompanyProfileFormProps {
  onSubmit: (data: CompanyProfile) => void;
  existingProfile?: CompanyProfile;
}

export const CompanyProfileForm: React.FC<CompanyProfileFormProps> = ({ onSubmit, existingProfile }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CompanyProfile>({
    defaultValues: existingProfile || {
      id: generateId(),
      coreValues: [''],
      systems: [''],
      marketChallenges: [''],
      pastStrategicMoves: [''],
      kpis: [{ name: 'Profitability', current: 0, target: 0, unit: '%' }]
    }
  });
  
  const [coreValues, setCoreValues] = React.useState<string[]>(existingProfile?.coreValues || ['']);
  const [systems, setSystems] = React.useState<string[]>(existingProfile?.systems || ['']);
  const [challenges, setChallenges] = React.useState<string[]>(existingProfile?.marketChallenges || ['']);
  const [strategicMoves, setStrategicMoves] = React.useState<string[]>(existingProfile?.pastStrategicMoves || ['']);
  const [kpis, setKpis] = React.useState<KPI[]>(
    existingProfile?.kpis || [
      { name: 'Profitability', current: 0, target: 0, unit: '%' }
    ]
  );
  
  const addCoreValue = () => setCoreValues([...coreValues, '']);
  const removeCoreValue = (index: number) => {
    setCoreValues(coreValues.filter((_, i) => i !== index));
  };
  
  const addSystem = () => setSystems([...systems, '']);
  const removeSystem = (index: number) => {
    setSystems(systems.filter((_, i) => i !== index));
  };
  
  const addChallenge = () => setChallenges([...challenges, '']);
  const removeChallenge = (index: number) => {
    setChallenges(challenges.filter((_, i) => i !== index));
  };
  
  const addStrategicMove = () => setStrategicMoves([...strategicMoves, '']);
  const removeStrategicMove = (index: number) => {
    setStrategicMoves(strategicMoves.filter((_, i) => i !== index));
  };
  
  const addKPI = () => setKpis([...kpis, { name: '', current: 0, target: 0, unit: '%' }]);
  const removeKPI = (index: number) => {
    setKpis(kpis.filter((_, i) => i !== index));
  };
  
  const updateKPI = (index: number, field: keyof KPI, value: string | number) => {
    const updatedKpis = [...kpis];
    if (field === 'current' || field === 'target') {
      updatedKpis[index][field] = Number(value);
    } else {
      updatedKpis[index][field] = value as string;
    }
    setKpis(updatedKpis);
  };
  
  const processFormData = (data: any) => {
    const formData: CompanyProfile = {
      ...data,
      id: existingProfile?.id || generateId(),
      coreValues: coreValues.filter(v => v.trim() !== ''),
      systems: systems.filter(s => s.trim() !== ''),
      marketChallenges: challenges.filter(c => c.trim() !== ''),
      pastStrategicMoves: strategicMoves.filter(m => m.trim() !== ''),
      kpis: kpis.filter(k => k.name.trim() !== '')
    };
    
    onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit(processFormData)} className="max-w-4xl mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Company Name
              </label>
              <Input
                {...register('name', { required: 'Company name is required' })}
                error={errors.name?.message}
                placeholder="Enter company name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Industry
              </label>
              <Input
                {...register('industry', { required: 'Industry is required' })}
                error={errors.industry?.message}
                placeholder="e.g., Technology, Healthcare"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sector
              </label>
              <Input
                {...register('sector')}
                placeholder="e.g., Software, Pharmaceuticals"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Company Size
              </label>
              <Select {...register('size', { required: 'Company size is required' })}>
                <option value="">Select size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="Enterprise">Enterprise</option>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Geographical Presence
              </label>
              <Select {...register('geographicalPresence', { required: 'Geographical presence is required' })}>
                <option value="">Select presence</option>
                <option value="Local">Local</option>
                <option value="Regional">Regional</option>
                <option value="Global">Global</option>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Current Strategic Focus
              </label>
              <Input
                {...register('strategicFocus')}
                placeholder="e.g., Growth, Innovation"
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Mission
              </label>
              <Textarea
                {...register('mission')}
                placeholder="Company mission statement"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Vision
              </label>
              <Textarea
                {...register('vision')}
                placeholder="Company vision statement"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Organization Structure</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Structure Type
              </label>
              <Select {...register('structure')}>
                <option value="">Select structure type</option>
                <option value="Organic">Organic</option>
                <option value="Mechanistic">Mechanistic</option>
                <option value="Hybrid">Hybrid</option>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Leadership Style & Culture
              </label>
              <Input
                {...register('leadershipStyle')}
                placeholder="e.g., Democratic, Hierarchical"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Workforce Characteristics
            </label>
            <Textarea
              {...register('workforceCharacteristics')}
              placeholder="Describe key workforce characteristics"
            />
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Core Values</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {coreValues.map((value, index) => (
            <div key={index} className="flex space-x-2">
              <Input
                value={value}
                onChange={(e) => {
                  const newValues = [...coreValues];
                  newValues[index] = e.target.value;
                  setCoreValues(newValues);
                }}
                placeholder={`Core Value ${index + 1}`}
                className="flex-1"
              />
              {coreValues.length > 1 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => removeCoreValue(index)}
                  aria-label="Remove core value"
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button type="button" onClick={addCoreValue}>
            Add Core Value
          </Button>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Systems & Processes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {systems.map((system, index) => (
            <div key={index} className="flex space-x-2">
              <Input
                value={system}
                onChange={(e) => {
                  const newSystems = [...systems];
                  newSystems[index] = e.target.value;
                  setSystems(newSystems);
                }}
                placeholder={`System/Process ${index + 1}`}
                className="flex-1"
              />
              {systems.length > 1 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => removeSystem(index)}
                  aria-label="Remove system"
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button type="button" onClick={addSystem}>
            Add System/Process
          </Button>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Market Challenges</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {challenges.map((challenge, index) => (
            <div key={index} className="flex space-x-2">
              <Input
                value={challenge}
                onChange={(e) => {
                  const newChallenges = [...challenges];
                  newChallenges[index] = e.target.value;
                  setChallenges(newChallenges);
                }}
                placeholder={`Market Challenge ${index + 1}`}
                className="flex-1"
              />
              {challenges.length > 1 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => removeChallenge(index)}
                  aria-label="Remove challenge"
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button type="button" onClick={addChallenge}>
            Add Market Challenge
          </Button>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Past Strategic Moves</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {strategicMoves.map((move, index) => (
            <div key={index} className="flex space-x-2">
              <Input
                value={move}
                onChange={(e) => {
                  const newMoves = [...strategicMoves];
                  newMoves[index] = e.target.value;
                  setStrategicMoves(newMoves);
                }}
                placeholder={`Strategic Move ${index + 1}`}
                className="flex-1"
              />
              {strategicMoves.length > 1 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => removeStrategicMove(index)}
                  aria-label="Remove strategic move"
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button type="button" onClick={addStrategicMove}>
            Add Strategic Move
          </Button>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Key Performance Indicators (KPIs)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {kpis.map((kpi, index) => (
            <div key={index} className="grid grid-cols-4 gap-2">
              <div>
                <Input
                  value={kpi.name}
                  onChange={(e) => updateKPI(index, 'name', e.target.value)}
                  placeholder="KPI Name"
                />
              </div>
              <div>
                <Input
                  type="number"
                  value={kpi.current}
                  onChange={(e) => updateKPI(index, 'current', e.target.value)}
                  placeholder="Current"
                />
              </div>
              <div>
                <Input
                  type="number"
                  value={kpi.target}
                  onChange={(e) => updateKPI(index, 'target', e.target.value)}
                  placeholder="Target"
                />
              </div>
              <div className="flex space-x-2">
                <Input
                  value={kpi.unit}
                  onChange={(e) => updateKPI(index, 'unit', e.target.value)}
                  placeholder="Unit"
                  className="flex-1"
                />
                {kpis.length > 1 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => removeKPI(index)}
                    aria-label="Remove KPI"
                    className="whitespace-nowrap"
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>
          ))}
          <Button type="button" onClick={addKPI}>
            Add KPI
          </Button>
        </CardContent>
      </Card>
      
      <div className="flex justify-end mb-8">
        <Button type="submit" isLoading={isSubmitting} size="lg">
          {existingProfile ? 'Update Company Profile' : 'Create Company Profile'}
        </Button>
      </div>
    </form>
  );
};
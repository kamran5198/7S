import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { SimulationState, SevenSElement } from '../types';
import { getElementColor, formatDate } from '../lib/utils';

interface ResultsDashboardProps {
  simulation: SimulationState;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ simulation }) => {
  const { sevenSModel, kpiTracker, decisions, tensions } = simulation;

  if (!sevenSModel) {
    return <div>No simulation data available</div>;
  }
  
  // Prepare alignment data for radar chart
  const alignmentData = [
    { element: 'Strategy', value: sevenSModel.strategy.alignmentScore },
    { element: 'Structure', value: sevenSModel.structure.alignmentScore },
    { element: 'Systems', value: sevenSModel.systems.alignmentScore },
    { element: 'Shared Values', value: sevenSModel.sharedValues.alignmentScore },
    { element: 'Skills', value: sevenSModel.skills.alignmentScore },
    { element: 'Style', value: sevenSModel.style.alignmentScore },
    { element: 'Staff', value: sevenSModel.staff.alignmentScore },
  ];
  
  // Prepare KPI data
  const kpiData = kpiTracker.map(kpi => {
    return {
      name: kpi.name,
      data: kpi.history.map(h => ({
        date: formatDate(h.date),
        value: h.value
      }))
    };
  });
  
  // Decision stats
  const totalDecisions = decisions.length;
  const decisionsCompleted = decisions.filter(d => d.selectedOption).length;
  
  // Tension stats
  const totalTensions = tensions.length;
  const tensionsResolved = tensions.filter(t => t.resolved).length;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overall Alignment Score */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Alignment Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-32">
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">
                  {(sevenSModel.alignmentScore * 100).toFixed(0)}%
                </div>
                <div className="text-gray-500 dark:text-gray-400 mt-2">
                  Organizational Alignment
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Simulation Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Simulation Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {decisionsCompleted}/{totalDecisions}
                </div>
                <div className="text-gray-500 dark:text-gray-400 mt-2">
                  Decisions Made
                </div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {tensionsResolved}/{totalTensions}
                </div>
                <div className="text-gray-500 dark:text-gray-400 mt-2">
                  Tensions Resolved
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* 7S Model Alignment */}
      <Card>
        <CardHeader>
          <CardTitle>7S Element Alignment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={alignmentData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="element" />
                <PolarRadiusAxis domain={[0, 1]} />
                <Radar
                  name="Alignment"
                  dataKey="value"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* KPI Tracking */}
      {kpiData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>KPI Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" allowDuplicatedCategory={false} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {kpiData.map((kpi, index) => (
                    <Line
                      key={kpi.name}
                      type="monotone"
                      data={kpi.data}
                      name={kpi.name}
                      dataKey="value"
                      stroke={Object.values(getElementColor)[index % 7] || "#8884d8"}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Decision Impact Analysis */}
      {decisions.filter(d => d.selectedOption).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Decision Impact Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Impact of decisions on 7S elements
            </p>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getDecisionImpactData(decisions)}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="element" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="positive" name="Positive Impact" fill="#10b981" stackId="stack" />
                  <Bar dataKey="negative" name="Negative Impact" fill="#ef4444" stackId="stack" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

function getDecisionImpactData(decisions: Decision[]) {
  const elements: SevenSElement[] = [
    'Strategy', 'Structure', 'Systems', 'Shared Values', 'Skills', 'Style', 'Staff'
  ];
  
  const impactData = elements.map(element => {
    let positive = 0;
    let negative = 0;
    
    decisions.forEach(decision => {
      if (!decision.selectedOption) return;
      
      const option = decision.options.find(o => o.id === decision.selectedOption);
      if (!option) return;
      
      decision.impact
        .filter(impact => impact.element === element && impact.description.includes(option.description))
        .forEach(impact => {
          if (impact.value > 0) {
            positive += impact.value;
          } else {
            negative += Math.abs(impact.value);
          }
        });
    });
    
    return {
      element,
      positive: parseFloat(positive.toFixed(2)),
      negative: -parseFloat(negative.toFixed(2))
    };
  });
  
  return impactData;
}
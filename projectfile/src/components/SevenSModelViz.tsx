import React, { useMemo, useCallback } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { SevenSModel, GraphData, Node, Link } from '../types';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { getElementColor } from '../lib/utils';

interface SevenSModelVizProps {
  model: SevenSModel;
}

export const SevenSModelViz: React.FC<SevenSModelVizProps> = ({ model }) => {
  const graphData = useMemo(() => {
    const data: GraphData = {
      nodes: [],
      links: []
    };
    
    // Create central node for Shared Values
    data.nodes.push({
      id: 'sharedValues',
      name: 'Shared Values',
      group: 'Shared Values',
      value: model.sharedValues.alignmentScore * 10,
      description: `Alignment Score: ${model.sharedValues.alignmentScore.toFixed(2)}`
    });
    
    // Create other 6 S nodes
    data.nodes.push({
      id: 'strategy',
      name: 'Strategy',
      group: 'Strategy',
      value: model.strategy.alignmentScore * 10,
      description: `Corporate: ${model.strategy.corporateLevel}\nBusiness: ${model.strategy.businessLevel}\nAlignment Score: ${model.strategy.alignmentScore.toFixed(2)}`
    });
    
    data.nodes.push({
      id: 'structure',
      name: 'Structure',
      group: 'Structure',
      value: model.structure.alignmentScore * 10,
      description: `Type: ${model.structure.type}\nAlignment Score: ${model.structure.alignmentScore.toFixed(2)}`
    });
    
    data.nodes.push({
      id: 'systems',
      name: 'Systems',
      group: 'Systems',
      value: model.systems.alignmentScore * 10,
      description: `Alignment Score: ${model.systems.alignmentScore.toFixed(2)}`
    });
    
    data.nodes.push({
      id: 'skills',
      name: 'Skills',
      group: 'Skills',
      value: model.skills.alignmentScore * 10,
      description: `Core Competencies: ${model.skills.coreCompetencies.join(', ')}\nAlignment Score: ${model.skills.alignmentScore.toFixed(2)}`
    });
    
    data.nodes.push({
      id: 'style',
      name: 'Style',
      group: 'Style',
      value: model.style.alignmentScore * 10,
      description: `Leadership Style: ${model.style.leadershipStyle}\nAlignment Score: ${model.style.alignmentScore.toFixed(2)}`
    });
    
    data.nodes.push({
      id: 'staff',
      name: 'Staff',
      group: 'Staff',
      value: model.staff.alignmentScore * 10,
      description: `Change Readiness: ${model.staff.changeReadiness * 100}%\nAlignment Score: ${model.staff.alignmentScore.toFixed(2)}`
    });
    
    // Create links between nodes
    const elements = ['strategy', 'structure', 'systems', 'skills', 'style', 'staff'];
    
    // Link Shared Values to all other elements
    elements.forEach(element => {
      data.links.push({
        source: 'sharedValues',
        target: element,
        value: 3
      });
    });
    
    // Link all hard elements together (Structure, Strategy, Systems)
    data.links.push({ source: 'strategy', target: 'structure', value: 2 });
    data.links.push({ source: 'strategy', target: 'systems', value: 2 });
    data.links.push({ source: 'structure', target: 'systems', value: 2 });
    
    // Link all soft elements together (Staff, Skills, Style)
    data.links.push({ source: 'staff', target: 'skills', value: 2 });
    data.links.push({ source: 'staff', target: 'style', value: 2 });
    data.links.push({ source: 'skills', target: 'style', value: 2 });
    
    // Cross-link hard and soft elements
    data.links.push({ source: 'strategy', target: 'skills', value: 1 });
    data.links.push({ source: 'structure', target: 'staff', value: 1 });
    data.links.push({ source: 'systems', target: 'style', value: 1 });
    
    return data;
  }, [model]);
  
  const nodeCanvasObject = useCallback((node: Node, ctx, globalScale) => {
    const label = node.name;
    const fontSize = 12/globalScale;
    const nodeR = Math.sqrt(node.value) * 3;
    
    // Draw node circle
    ctx.beginPath();
    ctx.arc(node.x || 0, node.y || 0, nodeR, 0, 2 * Math.PI);
    ctx.fillStyle = getElementColor(node.group);
    ctx.fill();
    
    // Draw node label
    ctx.font = `${fontSize}px Sans-Serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    ctx.fillText(label, node.x || 0, node.y || 0);
  }, []);
  
  const linkColor = useCallback((link: Link) => {
    return link.value === 3 
      ? 'rgba(139, 92, 246, 0.6)' // Shared Values connections
      : link.value === 2 
        ? 'rgba(14, 165, 233, 0.6)' // Same type connections
        : 'rgba(156, 163, 175, 0.4)'; // Cross-type connections
  }, []);

  return (
    <Card className="h-[600px]">
      <CardHeader className="pb-0">
        <CardTitle>7S Model Visualization</CardTitle>
      </CardHeader>
      <CardContent className="h-[550px]">
        <ForceGraph2D
          graphData={graphData}
          nodeCanvasObject={nodeCanvasObject}
          linkColor={linkColor}
          linkWidth={link => link.value * 0.5}
          nodeRelSize={8}
          linkDirectionalParticles={2}
          linkDirectionalParticleSpeed={d => d.value * 0.01}
          cooldownTicks={100}
          onNodeHover={(node) => {
            document.body.style.cursor = node ? 'pointer' : 'default';
          }}
          nodeLabel={(node: Node) => node.description || node.name}
        />
      </CardContent>
    </Card>
  );
};
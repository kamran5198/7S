import { create } from 'zustand';
import { 
  CompanyProfile, 
  SimulationState, 
  SevenSModel, 
  Decision, 
  Tension, 
  KPITracker, 
  SevenSElement 
} from '../types';
import { generateId, calculateAlignment } from '../lib/utils';

interface SimulationStoreState {
  simulation: SimulationState;
  setCompany: (company: CompanyProfile) => void;
  initializeSevenSModel: () => void;
  updateSevenSElement: (element: SevenSElement, data: any) => void;
  addDecision: (decision: Omit<Decision, 'id'>) => void;
  makeDecision: (decisionId: string, optionId: string) => void;
  addTension: (tension: Omit<Tension, 'id'>) => void;
  resolveTension: (tensionId: string, optionId: string) => void;
  updateKPI: (name: string, value: number) => void;
  getAlignmentScore: () => number;
  resetSimulation: () => void;
}

const initialSevenSModel: SevenSModel = {
  strategy: {
    corporateLevel: 'Stability',
    businessLevel: 'Cost Leadership',
    functionalLevel: 'Operational Excellence',
    alignmentScore: 0
  },
  structure: {
    type: 'Hybrid',
    centralization: 0.5,
    formalization: 0.5,
    complexity: 0.5,
    alignmentScore: 0
  },
  systems: {
    financial: 'Traditional budgeting and reporting',
    operational: 'Standard operating procedures',
    hr: {
      talentAcquisition: 'Traditional recruitment',
      trainingDevelopment: 'Basic training programs',
      performanceManagement: 'Annual performance reviews',
      compensationBenefits: 'Market-based compensation'
    },
    information: 'Legacy systems with some modern tools',
    alignmentScore: 0
  },
  sharedValues: {
    values: ['Integrity', 'Customer Focus', 'Excellence'],
    alignmentScore: 0
  },
  skills: {
    coreCompetencies: ['Industry Knowledge', 'Technical Expertise'],
    requiredSkills: ['Communication', 'Problem Solving', 'Teamwork'],
    alignmentScore: 0
  },
  style: {
    leadershipStyle: 'Democratic',
    decisionMaking: 'Consultative',
    alignmentScore: 0
  },
  staff: {
    composition: 'Balanced mix of experience levels',
    capabilities: 'Adequate for current operations',
    changeReadiness: 0.6,
    alignmentScore: 0
  },
  alignmentScore: 0
};

const initialState: SimulationState = {
  company: null,
  sevenSModel: null,
  scenarioId: 1,
  decisions: [],
  tensions: [],
  kpiTracker: []
};

export const useSimulationStore = create<SimulationStoreState>((set, get) => ({
  simulation: initialState,
  
  setCompany: (company: CompanyProfile) => 
    set(state => ({ 
      simulation: { 
        ...state.simulation, 
        company,
        kpiTracker: company.kpis.map(kpi => ({
          name: kpi.name,
          history: [{ date: new Date(), value: kpi.current }]
        }))
      } 
    })),
  
  initializeSevenSModel: () => 
    set(state => {
      const company = state.simulation.company;
      if (!company) return state;
      
      const sevenSModel = { ...initialSevenSModel };
      
      // Adapt the model based on company profile
      sevenSModel.structure.type = company.structure;
      sevenSModel.sharedValues.values = company.coreValues;
      
      // Calculate initial alignment scores
      sevenSModel.strategy.alignmentScore = 0.7;
      sevenSModel.structure.alignmentScore = 0.7;
      sevenSModel.systems.alignmentScore = 0.7;
      sevenSModel.sharedValues.alignmentScore = 0.7;
      sevenSModel.skills.alignmentScore = 0.7;
      sevenSModel.style.alignmentScore = 0.7;
      sevenSModel.staff.alignmentScore = 0.7;
      
      sevenSModel.alignmentScore = calculateAlignment([
        sevenSModel.strategy.alignmentScore,
        sevenSModel.structure.alignmentScore,
        sevenSModel.systems.alignmentScore,
        sevenSModel.sharedValues.alignmentScore,
        sevenSModel.skills.alignmentScore,
        sevenSModel.style.alignmentScore,
        sevenSModel.staff.alignmentScore
      ]);
      
      return { 
        simulation: { 
          ...state.simulation, 
          sevenSModel 
        } 
      };
    }),
  
  updateSevenSElement: (element: SevenSElement, data: any) =>
    set(state => {
      if (!state.simulation.sevenSModel) return state;
      
      const sevenSModel = { ...state.simulation.sevenSModel };
      const elementKey = element.charAt(0).toLowerCase() + element.slice(1).replace(' ', '');
      
      if (elementKey in sevenSModel) {
        sevenSModel[elementKey as keyof typeof sevenSModel] = {
          ...sevenSModel[elementKey as keyof typeof sevenSModel],
          ...data
        };
      }
      
      // Recalculate alignment scores
      sevenSModel.alignmentScore = calculateAlignment([
        sevenSModel.strategy.alignmentScore,
        sevenSModel.structure.alignmentScore,
        sevenSModel.systems.alignmentScore,
        sevenSModel.sharedValues.alignmentScore,
        sevenSModel.skills.alignmentScore,
        sevenSModel.style.alignmentScore,
        sevenSModel.staff.alignmentScore
      ]);
      
      return { 
        simulation: { 
          ...state.simulation, 
          sevenSModel 
        } 
      };
    }),
  
  addDecision: (decision: Omit<Decision, 'id'>) =>
    set(state => ({
      simulation: {
        ...state.simulation,
        decisions: [
          ...state.simulation.decisions,
          {
            ...decision,
            id: generateId()
          }
        ]
      }
    })),
  
  makeDecision: (decisionId: string, optionId: string) =>
    set(state => {
      const decisions = [...state.simulation.decisions];
      const decisionIndex = decisions.findIndex(d => d.id === decisionId);
      
      if (decisionIndex === -1) return state;
      
      const decision = decisions[decisionIndex];
      const updatedDecision = {
        ...decision,
        selectedOption: optionId
      };
      
      decisions[decisionIndex] = updatedDecision;
      
      // Apply impacts of the decision
      const sevenSModel = { ...state.simulation.sevenSModel };
      if (!sevenSModel) return state;
      
      const option = decision.options.find(opt => opt.id === optionId);
      if (!option) return state;
      
      const impacts = decision.impact.filter(impact => 
        impact.description.includes(option.description)
      );
      
      impacts.forEach(impact => {
        const elementKey = impact.element.charAt(0).toLowerCase() + 
          impact.element.slice(1).replace(' ', '');
        
        if (elementKey in sevenSModel) {
          const element = sevenSModel[elementKey as keyof typeof sevenSModel];
          if ('alignmentScore' in element) {
            (element as any).alignmentScore = 
              Math.max(0, Math.min(1, (element as any).alignmentScore + impact.value));
          }
        }
      });
      
      // Recalculate overall alignment
      sevenSModel.alignmentScore = calculateAlignment([
        sevenSModel.strategy.alignmentScore,
        sevenSModel.structure.alignmentScore,
        sevenSModel.systems.alignmentScore,
        sevenSModel.sharedValues.alignmentScore,
        sevenSModel.skills.alignmentScore,
        sevenSModel.style.alignmentScore,
        sevenSModel.staff.alignmentScore
      ]);
      
      return {
        simulation: {
          ...state.simulation,
          decisions,
          sevenSModel
        }
      };
    }),
  
  addTension: (tension: Omit<Tension, 'id'>) =>
    set(state => ({
      simulation: {
        ...state.simulation,
        tensions: [
          ...state.simulation.tensions,
          {
            ...tension,
            id: generateId(),
            resolved: false
          }
        ]
      }
    })),
  
  resolveTension: (tensionId: string, optionId: string) =>
    set(state => {
      const tensions = [...state.simulation.tensions];
      const tensionIndex = tensions.findIndex(t => t.id === tensionId);
      
      if (tensionIndex === -1) return state;
      
      const tension = tensions[tensionIndex];
      const option = tension.resolutionOptions.find(opt => opt.id === optionId);
      
      if (!option) return state;
      
      tensions[tensionIndex] = {
        ...tension,
        resolved: true
      };
      
      // Apply impacts of the resolution
      const sevenSModel = { ...state.simulation.sevenSModel };
      if (!sevenSModel) return state;
      
      option.impacts.forEach(impact => {
        const elementKey = impact.element.charAt(0).toLowerCase() + 
          impact.element.slice(1).replace(' ', '');
        
        if (elementKey in sevenSModel) {
          const element = sevenSModel[elementKey as keyof typeof sevenSModel];
          if ('alignmentScore' in element) {
            (element as any).alignmentScore = 
              Math.max(0, Math.min(1, (element as any).alignmentScore + impact.value));
          }
        }
      });
      
      // Recalculate overall alignment
      sevenSModel.alignmentScore = calculateAlignment([
        sevenSModel.strategy.alignmentScore,
        sevenSModel.structure.alignmentScore,
        sevenSModel.systems.alignmentScore,
        sevenSModel.sharedValues.alignmentScore,
        sevenSModel.skills.alignmentScore,
        sevenSModel.style.alignmentScore,
        sevenSModel.staff.alignmentScore
      ]);
      
      return {
        simulation: {
          ...state.simulation,
          tensions,
          sevenSModel
        }
      };
    }),
  
  updateKPI: (name: string, value: number) =>
    set(state => {
      const kpiTracker = [...state.simulation.kpiTracker];
      const kpiIndex = kpiTracker.findIndex(k => k.name === name);
      
      if (kpiIndex === -1) return state;
      
      kpiTracker[kpiIndex] = {
        ...kpiTracker[kpiIndex],
        history: [
          ...kpiTracker[kpiIndex].history,
          { date: new Date(), value }
        ]
      };
      
      return {
        simulation: {
          ...state.simulation,
          kpiTracker
        }
      };
    }),
  
  getAlignmentScore: () => {
    const { sevenSModel } = get().simulation;
    return sevenSModel?.alignmentScore || 0;
  },
  
  resetSimulation: () =>
    set({ simulation: initialState })
}));
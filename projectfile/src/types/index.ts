export interface CompanyProfile {
  id: string;
  name: string;
  industry: string;
  sector: string;
  size: 'Small' | 'Medium' | 'Large' | 'Enterprise';
  geographicalPresence: 'Local' | 'Regional' | 'Global';
  strategicFocus: string;
  mission: string;
  vision: string;
  coreValues: string[];
  structure: 'Organic' | 'Mechanistic' | 'Hybrid';
  systems: string[];
  workforceCharacteristics: string;
  leadershipStyle: string;
  culture: string;
  marketChallenges: string[];
  pastStrategicMoves: string[];
  kpis: KPI[];
}

export interface KPI {
  name: string;
  current: number;
  target: number;
  unit: string;
}

export interface Node {
  id: string;
  name: string;
  group: SevenSElement;
  value: number;
  description?: string;
}

export interface Link {
  source: string;
  target: string;
  value: number;
  description?: string;
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
}

export type SevenSElement = 
  | 'Strategy' 
  | 'Structure' 
  | 'Systems' 
  | 'Shared Values' 
  | 'Skills' 
  | 'Style' 
  | 'Staff';

export interface SevenSModel {
  strategy: StrategyElement;
  structure: StructureElement;
  systems: SystemsElement;
  sharedValues: SharedValuesElement;
  skills: SkillsElement;
  style: StyleElement;
  staff: StaffElement;
  alignmentScore: number;
}

export interface StrategyElement {
  corporateLevel: CorporateLevelStrategy;
  businessLevel: BusinessLevelStrategy;
  functionalLevel: FunctionalLevelStrategy;
  alignmentScore: number;
}

export type CorporateLevelStrategy = 
  | 'Market Penetration'
  | 'Product Development'
  | 'Market Development'
  | 'Related Diversification'
  | 'Unrelated Diversification'
  | 'Forward Integration'
  | 'Backward Integration'
  | 'Horizontal Integration'
  | 'Joint Venture'
  | 'Strategic Alliance'
  | 'Merger & Acquisition'
  | 'Turnaround'
  | 'Divestiture'
  | 'Liquidation'
  | 'Harvesting'
  | 'Stability';

export type BusinessLevelStrategy =
  | 'Cost Leadership'
  | 'Differentiation'
  | 'Focus - Cost'
  | 'Focus - Differentiation';

export type FunctionalLevelStrategy =
  | 'Dynamic Capabilities'
  | 'Knowledge Management'
  | 'Innovation'
  | 'Operational Excellence'
  | 'Customer Intimacy'
  | 'Product Leadership';

export interface StructureElement {
  type: 'Organic' | 'Mechanistic' | 'Hybrid';
  centralization: number;
  formalization: number;
  complexity: number;
  alignmentScore: number;
}

export interface SystemsElement {
  financial: string;
  operational: string;
  hr: HRSystem;
  information: string;
  alignmentScore: number;
}

export interface HRSystem {
  talentAcquisition: string;
  trainingDevelopment: string;
  performanceManagement: string;
  compensationBenefits: string;
}

export interface SharedValuesElement {
  values: string[];
  alignmentScore: number;
}

export interface SkillsElement {
  coreCompetencies: string[];
  requiredSkills: string[];
  alignmentScore: number;
}

export interface StyleElement {
  leadershipStyle: 
    | 'Transformational'
    | 'Transactional'
    | 'Democratic'
    | 'Autocratic'
    | 'Laissez-Faire'
    | 'Servant';
  decisionMaking: string;
  alignmentScore: number;
}

export interface StaffElement {
  composition: string;
  capabilities: string;
  changeReadiness: number;
  alignmentScore: number;
}

export interface SimulationState {
  company: CompanyProfile | null;
  sevenSModel: SevenSModel | null;
  scenarioId: number;
  decisions: Decision[];
  tensions: Tension[];
  kpiTracker: KPITracker[];
}

export interface Decision {
  id: string;
  scenarioId: number;
  element: SevenSElement;
  description: string;
  options: DecisionOption[];
  selectedOption?: string;
  impact: Impact[];
}

export interface DecisionOption {
  id: string;
  description: string;
}

export interface Impact {
  element: SevenSElement;
  value: number;
  description: string;
}

export interface Tension {
  id: string;
  elements: [SevenSElement, SevenSElement];
  description: string;
  severity: number;
  resolutionOptions: ResolutionOption[];
  resolved: boolean;
}

export interface ResolutionOption {
  id: string;
  description: string;
  impacts: Impact[];
}

export interface KPITracker {
  name: string;
  history: { date: Date; value: number }[];
}
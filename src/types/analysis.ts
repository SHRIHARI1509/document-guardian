export type RiskLevel = 'low' | 'medium' | 'high';

export interface Clause {
  id: string;
  title: string;
  content: string;
  risk: RiskLevel;
  explanation: string;
}

export interface KeyTerm {
  term: string;
  definition: string;
}

export interface LegalSection {
  code: string;
  title: string;
  relevance: string;
}

export interface AnalysisResult {
  id: string;
  documentName: string;
  summary: string;
  riskScore: number;
  riskLevel: RiskLevel;
  clauses: Clause[];
  keyTerms: KeyTerm[];
  bnsIpcSections: LegalSection[];
  analyzedAt: string;
}

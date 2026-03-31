import { AnalysisResult, RiskLevel } from '@/types/analysis';

export function generateMockAnalysis(documentName: string, text: string): AnalysisResult {
  const riskScore = Math.floor(Math.random() * 100);
  const riskLevel: RiskLevel = riskScore < 35 ? 'low' : riskScore < 70 ? 'medium' : 'high';

  return {
    id: crypto.randomUUID(),
    documentName,
    summary: `This ${documentName.replace('.pdf', '')} document contains ${Math.floor(Math.random() * 10 + 5)} key clauses. The overall risk assessment indicates ${riskLevel} risk areas primarily concerning liability limitations, indemnification obligations, and termination provisions. Key attention areas include non-compete restrictions and intellectual property assignment clauses.`,
    riskScore,
    riskLevel,
    clauses: [
      {
        id: '1',
        title: 'Limitation of Liability',
        content: 'The total aggregate liability shall not exceed the amount paid in the preceding 12 months.',
        risk: 'medium',
        explanation: 'This clause significantly caps liability, which may leave one party exposed to unrecoverable damages.',
      },
      {
        id: '2',
        title: 'Indemnification',
        content: 'Party A shall indemnify and hold harmless Party B from all claims, damages, and expenses.',
        risk: 'high',
        explanation: 'Broad indemnification without mutual obligation creates asymmetric risk exposure.',
      },
      {
        id: '3',
        title: 'Termination for Convenience',
        content: 'Either party may terminate this agreement with 30 days written notice.',
        risk: 'low',
        explanation: 'Standard termination clause with reasonable notice period.',
      },
      {
        id: '4',
        title: 'Non-Compete Restriction',
        content: 'For a period of 2 years following termination, Party A shall not engage in competing business within 100 miles.',
        risk: 'high',
        explanation: 'Broad geographic and temporal scope may be unenforceable and overly restrictive.',
      },
      {
        id: '5',
        title: 'Intellectual Property Assignment',
        content: 'All work product created during the term shall be the exclusive property of Party B.',
        risk: 'medium',
        explanation: 'Blanket IP assignment may include pre-existing work; consider carving out prior inventions.',
      },
    ],
    keyTerms: [
      { term: 'Force Majeure', definition: 'Unforeseeable circumstances preventing fulfillment of contract obligations.' },
      { term: 'Indemnification', definition: 'Obligation to compensate for harm or loss incurred by another party.' },
      { term: 'Arbitration', definition: 'Dispute resolution method outside of courts, using a neutral third party.' },
      { term: 'Liquidated Damages', definition: 'Pre-determined amount of compensation for breach of contract.' },
      { term: 'Severability', definition: 'If one provision is invalid, the remaining provisions continue in effect.' },
    ],
    bnsIpcSections: [
      { code: 'BNS 318', title: 'Cheating', relevance: 'Applicable if misrepresentation of contract terms is established.' },
      { code: 'IPC 420', title: 'Cheating and dishonestly inducing delivery of property', relevance: 'Relevant when fraudulent intent in contract execution is suspected.' },
      { code: 'BNS 336', title: 'Forgery', relevance: 'Applicable if document authenticity is questioned.' },
      { code: 'IPC 463', title: 'Forgery', relevance: 'Relevant for forged contract signatures or altered documents.' },
    ],
    analyzedAt: new Date().toISOString(),
  };
}

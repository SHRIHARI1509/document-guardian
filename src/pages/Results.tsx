import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnalysisResult } from '@/types/analysis';
import { RiskMeter } from '@/components/RiskMeter';
import { ClauseCard } from '@/components/ClauseCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, BookOpen, Gavel } from 'lucide-react';

const Results = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem('analysisResult');
    if (stored) {
      setResult(JSON.parse(stored));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!result) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Button variant="ghost" onClick={() => navigate('/')} className="mb-6 gap-2">
        <ArrowLeft className="w-4 h-4" /> New Analysis
      </Button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <FileText className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">{result.documentName}</h1>
            <p className="text-muted-foreground text-sm">
              Analyzed on {new Date(result.analyzedAt).toLocaleDateString('en-US', { dateStyle: 'long' })}
            </p>
          </div>
        </div>
      </div>

      {/* Summary + Risk Meter */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="w-5 h-5 text-primary" /> Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80 leading-relaxed">{result.summary}</p>
          </CardContent>
        </Card>
        <RiskMeter score={result.riskScore} level={result.riskLevel} />
      </div>

      {/* Clauses */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Gavel className="w-5 h-5 text-primary" /> Clause Analysis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.clauses.map((clause) => (
            <ClauseCard key={clause.id} clause={clause} />
          ))}
        </div>
      </div>

      {/* Key Terms + Legal Sections side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Key Terms */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Key Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {result.keyTerms.map((term) => (
              <div key={term.term} className="border-b border-border/50 pb-3 last:border-0 last:pb-0">
                <span className="font-semibold text-sm text-primary">{term.term}</span>
                <p className="text-muted-foreground text-sm mt-0.5">{term.definition}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* BNS/IPC Sections */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">BNS / IPC Sections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {result.bnsIpcSections.map((section) => (
              <div key={section.code} className="border-b border-border/50 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="font-mono text-xs">{section.code}</Badge>
                  <span className="font-semibold text-sm">{section.title}</span>
                </div>
                <p className="text-muted-foreground text-sm">{section.relevance}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Results;

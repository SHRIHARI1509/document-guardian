import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnalysisResult } from '@/types/analysis';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Trash2, Clock } from 'lucide-react';

const HistoryPage = () => {
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('analysisHistory') || '[]');
    setHistory(stored);
  }, []);

  const viewResult = (result: AnalysisResult) => {
    sessionStorage.setItem('analysisResult', JSON.stringify(result));
    navigate('/results');
  };

  const clearHistory = () => {
    localStorage.removeItem('analysisHistory');
    setHistory([]);
  };

  const riskColor = (level: string) =>
    level === 'low' ? 'text-risk-low border-risk-low' :
    level === 'medium' ? 'text-risk-medium border-risk-medium' :
    'text-risk-high border-risk-high';

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Clock className="w-6 h-6 text-primary" /> Analysis History
          </h1>
          <p className="text-muted-foreground text-sm mt-1">{history.length} documents analyzed</p>
        </div>
        {history.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearHistory} className="text-muted-foreground hover:text-destructive gap-2">
            <Trash2 className="w-4 h-4" /> Clear All
          </Button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="glass-card rounded-xl p-12 text-center">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No documents analyzed yet.</p>
          <Button className="mt-4" onClick={() => navigate('/')}>Analyze a Document</Button>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item, i) => (
            <Card
              key={`${item.id}-${i}`}
              className="glass-card cursor-pointer hover:bg-accent/30 transition-colors"
              onClick={() => viewResult(item)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="w-5 h-5 text-primary shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{item.documentName}</p>
                    <p className="text-muted-foreground text-xs">
                      {new Date(item.analyzedAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`font-bold text-lg ${riskColor(item.riskLevel)}`}>{item.riskScore}</span>
                  <Badge variant="outline" className={riskColor(item.riskLevel)}>
                    {item.riskLevel}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;

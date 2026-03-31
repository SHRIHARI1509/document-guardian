import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileUpload } from '@/components/FileUpload';
import { generateMockAnalysis } from '@/lib/mock-analysis';
import { Scale, Shield, Zap } from 'lucide-react';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = async (name: string, text: string) => {
    setIsLoading(true);
    // Simulate AI analysis delay
    await new Promise((r) => setTimeout(r, 2000));
    const result = generateMockAnalysis(name, text);
    // Store in sessionStorage for results page
    sessionStorage.setItem('analysisResult', JSON.stringify(result));
    // Also store in history (localStorage for now)
    const history = JSON.parse(localStorage.getItem('analysisHistory') || '[]');
    history.unshift(result);
    localStorage.setItem('analysisHistory', JSON.stringify(history.slice(0, 50)));
    setIsLoading(false);
    navigate('/results');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="text-center mb-10 max-w-xl">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Analyze Legal Documents
            <span className="text-primary"> Instantly</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Upload contracts, agreements, or legal documents for AI-powered risk analysis, clause detection, and legal insights.
          </p>
        </div>

        <FileUpload onAnalyze={handleAnalyze} isLoading={isLoading} />

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-3xl w-full">
          {[
            { icon: Shield, title: 'Risk Detection', desc: 'Identify high-risk clauses and unfavorable terms' },
            { icon: Scale, title: 'Legal Sections', desc: 'Auto-detect relevant BNS & IPC sections' },
            { icon: Zap, title: 'Instant Analysis', desc: 'Get comprehensive results in seconds' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass-card rounded-xl p-5 text-center">
              <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-sm mb-1">{title}</h3>
              <p className="text-muted-foreground text-xs">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;

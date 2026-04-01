import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileUpload } from '@/components/FileUpload';
import { generateMockAnalysis } from '@/lib/mock-analysis';
import { Scale, Shield, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { sendToN8n } from '@/lib/webhook';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAnalyze = async (name: string, text: string) => {
    setIsLoading(true);
    try {
      // 1. Save to Supabase
      const { data: docData, error: docError } = await supabase
        .from('documents')
        .insert([{ file_name: name, original_text: text }])
        .select()
        .single();

      if (docError) throw docError;

      // 2. Send to n8n Webhook for processing
      // Note: We're calling it, but for the UI we'll still use the mock generator
      // unless n8n returns the full AnalysisResult format.
      try {
        await sendToN8n(text, name);
      } catch (webhookError) {
        console.warn('Webhook failed, but proceeding with local analysis:', webhookError);
      }

      // 3. Generate Analysis (mocked for now, but linked to Supabase ID)
      const result = generateMockAnalysis(name, text);
      result.id = docData.id; // Link to the database ID

      // 4. Save analysis results to Supabase
      const { error: analysisError } = await supabase
        .from('analysis_results')
        .insert([{
          document_id: docData.id,
          summary: result.summary,
          risk_score: result.riskScore,
          language: 'English', // Default
          risk_flags: result.riskLevel as any,
          clauses: result.clauses as any,
          key_terms: result.keyTerms as any,
          bns_sections: result.bnsIpcSections as any
        }]);

      if (analysisError) throw analysisError;

      // Store in sessionStorage and history as before
      sessionStorage.setItem('analysisResult', JSON.stringify(result));
      const history = JSON.parse(localStorage.getItem('analysisHistory') || '[]');
      history.unshift(result);
      localStorage.setItem('analysisHistory', JSON.stringify(history.slice(0, 50)));

      toast({
        title: "Analysis Complete",
        description: "Document successfully saved to Supabase and analyzed.",
      });

      navigate('/results');
    } catch (error: any) {
      console.error('Analysis failed:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to process document. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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

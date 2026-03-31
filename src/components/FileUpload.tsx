import { useState, useCallback } from 'react';
import { Upload, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FileUploadProps {
  onAnalyze: (name: string, text: string) => void;
  isLoading: boolean;
}

export function FileUpload({ onAnalyze, isLoading }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState('');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile?.type === 'application/pdf') {
      setFile(droppedFile);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleSubmitFile = () => {
    if (file) onAnalyze(file.name, 'PDF content placeholder');
  };

  const handleSubmitText = () => {
    if (pastedText.trim()) onAnalyze('Pasted Document', pastedText);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-secondary">
          <TabsTrigger value="upload">Upload PDF</TabsTrigger>
          <TabsTrigger value="paste">Paste Text</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-4">
          <div
            className={`glass-card rounded-xl p-12 text-center transition-all cursor-pointer ${
              dragActive ? 'border-primary border-2 bg-primary/5' : 'border-dashed border-2'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <input
              id="file-input"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileInput}
            />
            {file ? (
              <div className="flex flex-col items-center gap-3">
                <FileText className="w-12 h-12 text-primary" />
                <p className="text-foreground font-medium">{file.name}</p>
                <p className="text-muted-foreground text-sm">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <Upload className="w-12 h-12 text-muted-foreground" />
                <p className="text-foreground font-medium">Drop your PDF here</p>
                <p className="text-muted-foreground text-sm">or click to browse</p>
              </div>
            )}
          </div>
          <Button
            className="w-full mt-4"
            size="lg"
            disabled={!file || isLoading}
            onClick={handleSubmitFile}
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Analyze Document
          </Button>
        </TabsContent>

        <TabsContent value="paste" className="mt-4">
          <Textarea
            placeholder="Paste your legal document text here..."
            className="min-h-[200px] glass-card resize-none font-mono text-sm"
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
          />
          <Button
            className="w-full mt-4"
            size="lg"
            disabled={!pastedText.trim() || isLoading}
            onClick={handleSubmitText}
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Analyze Text
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}

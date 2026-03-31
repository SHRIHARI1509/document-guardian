import { Clause } from '@/types/analysis';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface ClauseCardProps {
  clause: Clause;
}

export function ClauseCard({ clause }: ClauseCardProps) {
  const borderColor = clause.risk === 'low'
    ? 'border-l-risk-low'
    : clause.risk === 'medium'
    ? 'border-l-risk-medium'
    : 'border-l-risk-high';

  const Icon = clause.risk === 'low' ? CheckCircle : clause.risk === 'medium' ? AlertCircle : AlertTriangle;
  const iconColor = clause.risk === 'low' ? 'text-risk-low' : clause.risk === 'medium' ? 'text-risk-medium' : 'text-risk-high';

  return (
    <Card className={`glass-card border-l-4 ${borderColor} hover:bg-accent/30 transition-colors`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Icon className={`w-4 h-4 ${iconColor}`} />
            {clause.title}
          </CardTitle>
          <Badge
            variant="outline"
            className={`${
              clause.risk === 'low' ? 'border-risk-low text-risk-low' :
              clause.risk === 'medium' ? 'border-risk-medium text-risk-medium' :
              'border-risk-high text-risk-high'
            }`}
          >
            {clause.risk}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground font-mono leading-relaxed">"{clause.content}"</p>
        <p className="text-sm text-foreground/80">{clause.explanation}</p>
      </CardContent>
    </Card>
  );
}

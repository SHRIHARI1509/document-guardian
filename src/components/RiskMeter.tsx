import { RiskLevel } from '@/types/analysis';

interface RiskMeterProps {
  score: number;
  level: RiskLevel;
}

export function RiskMeter({ score, level }: RiskMeterProps) {
  const rotation = (score / 100) * 180 - 90;
  const colorClass = level === 'low' ? 'text-risk-low' : level === 'medium' ? 'text-risk-medium' : 'text-risk-high';
  const glowClass = level === 'low' ? 'risk-glow-low' : level === 'medium' ? 'risk-glow-medium' : 'risk-glow-high';

  return (
    <div className={`glass-card rounded-xl p-6 flex flex-col items-center ${glowClass}`}>
      <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">Risk Assessment</h3>
      <div className="relative w-48 h-24 overflow-hidden">
        {/* Background arc */}
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <defs>
            <linearGradient id="meterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--risk-low))" />
              <stop offset="50%" stopColor="hsl(var(--risk-medium))" />
              <stop offset="100%" stopColor="hsl(var(--risk-high))" />
            </linearGradient>
          </defs>
          <path
            d="M 20 95 A 80 80 0 0 1 180 95"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M 20 95 A 80 80 0 0 1 180 95"
            fill="none"
            stroke="url(#meterGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${(score / 100) * 251.2} 251.2`}
          />
          {/* Needle */}
          <line
            x1="100"
            y1="95"
            x2="100"
            y2="30"
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
            strokeLinecap="round"
            transform={`rotate(${rotation}, 100, 95)`}
            className="transition-all duration-1000"
          />
          <circle cx="100" cy="95" r="5" fill="hsl(var(--foreground))" />
        </svg>
      </div>
      <div className="mt-3 text-center">
        <span className={`text-4xl font-bold ${colorClass}`}>{score}</span>
        <span className="text-muted-foreground text-lg">/100</span>
      </div>
      <span className={`mt-1 text-sm font-semibold uppercase tracking-wider ${colorClass}`}>
        {level} Risk
      </span>
    </div>
  );
}

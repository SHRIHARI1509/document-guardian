import { Link, useLocation } from 'react-router-dom';
import { Scale, History, Home } from 'lucide-react';

export function AppHeader() {
  const location = useLocation();

  const linkClass = (path: string) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      location.pathname === path
        ? 'bg-primary/10 text-primary'
        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
    }`;

  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <Scale className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg tracking-tight">LegalLens</span>
        </Link>
        <nav className="flex items-center gap-1">
          <Link to="/" className={linkClass('/')}>
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <Link to="/history" className={linkClass('/history')}>
            <History className="w-4 h-4" />
            <span className="hidden sm:inline">History</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

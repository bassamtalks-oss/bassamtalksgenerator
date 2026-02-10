import React from 'react';
import { RuleViolation } from '@/data/types';
import { AlertTriangle, XCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ValidationPanelProps {
  violations: RuleViolation[];
}

export function ValidationPanel({ violations }: ValidationPanelProps) {
  if (violations.length === 0) {
    return (
      <div className="p-4 rounded-lg border border-border bg-secondary/20">
        <p className="text-xs text-muted-foreground flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[hsl(142,71%,45%)] animate-pulse" />
          Configuration valid — no rule violations
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      {violations.map((v, i) => (
        <div
          key={`${v.id}-${i}`}
          className={cn(
            'flex items-start gap-2 p-2.5 rounded-md text-xs border',
            v.severity === 'HARD' && 'bg-destructive/10 border-destructive/30 text-destructive',
            v.severity === 'WARNING' && 'bg-[hsl(38,92%,50%)]/10 border-[hsl(38,92%,50%)]/30 text-[hsl(38,92%,50%)]',
            v.severity === 'INFO' && 'bg-[hsl(200,80%,55%)]/10 border-[hsl(200,80%,55%)]/30 text-[hsl(200,80%,55%)]'
          )}
        >
          {v.severity === 'HARD' && <XCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />}
          {v.severity === 'WARNING' && <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" />}
          {v.severity === 'INFO' && <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />}
          <span className="leading-relaxed">{v.message}</span>
        </div>
      ))}
    </div>
  );
}

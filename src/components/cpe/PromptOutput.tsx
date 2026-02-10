import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { TargetModel } from '@/data/types';
import { targetModels } from '@/data/options';
import { cn } from '@/lib/utils';

interface PromptOutputProps {
  prompt: string;
  targetModel: TargetModel;
  onTargetModelChange: (model: TargetModel) => void;
  hasErrors: boolean;
}

export function PromptOutput({ prompt, targetModel, onTargetModelChange, hasErrors }: PromptOutputProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (!prompt) return;
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Target Model</h3>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {targetModels.map(m => (
          <button
            key={m.id}
            onClick={() => onTargetModelChange(m.id)}
            className={cn(
              'px-2.5 py-1 text-xs rounded-md border transition-all',
              targetModel === m.id
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-secondary/50 text-secondary-foreground border-border hover:bg-secondary'
            )}
          >
            {m.name}
            <span className="ml-1 opacity-50 text-[10px]">{m.type === 'video' ? '🎬' : '🖼'}</span>
          </button>
        ))}
      </div>

      <div className="relative">
        <div className={cn(
          'min-h-[120px] rounded-lg border p-4 font-mono text-xs leading-relaxed',
          hasErrors ? 'border-destructive/30 bg-destructive/5' : 'border-primary/20 bg-secondary/30',
          !prompt && 'flex items-center justify-center text-muted-foreground'
        )}>
          {prompt || 'Configure your shot to generate a prompt...'}
        </div>
        {prompt && (
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-2 right-2 h-7 px-2"
            onClick={handleCopy}
          >
            {copied ? <Check className="h-3.5 w-3.5 text-[hsl(142,71%,45%)]" /> : <Copy className="h-3.5 w-3.5" />}
          </Button>
        )}
      </div>
      {hasErrors && (
        <p className="text-[10px] text-destructive">⚠ Configuration has hard rule violations. Fix them before using this prompt.</p>
      )}
    </div>
  );
}

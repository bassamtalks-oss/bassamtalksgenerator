import React from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface ConfigSelectorProps<T extends string> {
  label: string;
  value: T | null;
  options: { id: T; name: string; disabled?: boolean }[];
  onChange: (value: T | null) => void;
  className?: string;
}

export function ConfigSelector<T extends string>({ label, value, options, onChange, className }: ConfigSelectorProps<T>) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      <div className="flex flex-wrap gap-1.5">
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => onChange(value === opt.id ? null : opt.id)}
            disabled={opt.disabled}
            className={cn(
              'px-2.5 py-1 text-xs rounded-md border transition-all duration-150',
              value === opt.id
                ? 'bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20'
                : 'bg-secondary/50 text-secondary-foreground border-border hover:bg-secondary hover:border-primary/30',
              opt.disabled && 'opacity-30 cursor-not-allowed hover:bg-secondary/50 hover:border-border'
            )}
          >
            {opt.name}
          </button>
        ))}
      </div>
    </div>
  );
}

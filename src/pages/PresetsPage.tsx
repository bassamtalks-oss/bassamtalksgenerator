import React from 'react';
import { filmPresets } from '@/data/presets';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Film, Calendar, User, Clapperboard } from 'lucide-react';
import { CPEConfiguration } from '@/data/types';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PresetsPageProps {
  onLoadPreset: (config: Partial<CPEConfiguration>) => void;
  onNavigateToBuilder: () => void;
}

export default function PresetsPage({ onLoadPreset, onNavigateToBuilder }: PresetsPageProps) {
  const categories = [
    { id: 'new_wave', label: 'New Wave & 1960s' },
    { id: 'new_hollywood', label: 'New Hollywood' },
    { id: 'modern_film', label: 'Modern Film' },
    { id: 'modern_digital', label: 'Modern Digital' },
  ] as const;

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Film Presets</h1>
          <p className="text-sm text-muted-foreground mt-1">Real cinematography configurations from landmark films. Click to load into the Prompt Builder.</p>
        </div>

        {categories.map(cat => {
          const presets = filmPresets.filter(p => p.category === cat.id);
          if (presets.length === 0) return null;
          return (
            <div key={cat.id} className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-primary flex items-center gap-2">
                <Film className="h-4 w-4" />
                {cat.label}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {presets.map(preset => (
                  <Card key={preset.id} className="group hover:border-primary/30 transition-colors cursor-pointer" onClick={() => { onLoadPreset(preset.config); onNavigateToBuilder(); }}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{preset.name}</CardTitle>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-mono">{preset.year}</span>
                      </div>
                      <CardDescription className="text-xs">
                        <span className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1"><User className="h-3 w-3" />{preset.director}</span>
                          <span className="flex items-center gap-1"><Clapperboard className="h-3 w-3" />{preset.cinematographer}</span>
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-1">
                        {preset.config.camera && <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">Camera</span>}
                        {preset.config.lens && <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">Lens</span>}
                        {preset.config.filmStock && <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">Film Stock</span>}
                        {preset.config.lightingStyle && <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">Lighting</span>}
                        {preset.config.mood && <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">Mood</span>}
                        {preset.config.aspectRatio && <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">{preset.config.aspectRatio}</span>}
                      </div>
                      <Button variant="ghost" size="sm" className="mt-2 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        Load Preset →
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}

import React, { useMemo } from 'react';
import { useCPEConfiguration } from '@/hooks/useCPEConfiguration';
import { ConfigSelector } from '@/components/cpe/ConfigSelector';
import { ValidationPanel } from '@/components/cpe/ValidationPanel';
import { PromptOutput } from '@/components/cpe/PromptOutput';
import { cameras } from '@/data/cameras';
import { lenses } from '@/data/lenses';
import { filmStocks } from '@/data/filmStocks';
import { lightSources, lightingStyles } from '@/data/lighting';
import { shotSizes, compositionStyles, movementEquipments, movementTypes, movementTimings, moods, colorTones, aspectRatios, timesOfDay } from '@/data/options';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RotateCcw, Camera, Aperture, Film, Sun, Move, Palette, Type } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

function Section({ title, icon: Icon, children, defaultOpen = true }: { title: string; icon: React.ElementType; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="border-b border-border pb-4">
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 group">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Icon className="h-4 w-4 text-primary" />
          {title}
        </div>
        <ChevronDown className={cn('h-4 w-4 text-muted-foreground transition-transform', open && 'rotate-180')} />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2 space-y-3">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

export default function PromptBuilder() {
  const { config, updateConfig, resetConfig, violations, hardViolations, warnings, infos, prompt } = useCPEConfiguration();

  const selectedCamera = useMemo(() => config.camera ? cameras.find(c => c.id === config.camera) : null, [config.camera]);
  const isFilmCamera = selectedCamera?.type === 'film' || selectedCamera?.type === 'imax';
  const isDigitalCamera = selectedCamera?.type === 'digital';

  // Filter lenses based on camera
  const availableLenses = useMemo(() => {
    return lenses.map(l => {
      let disabled = false;
      if (selectedCamera) {
        const isPVCamera = selectedCamera.manufacturer === 'Panavision';
        const isPVLens = l.manufacturer === 'Panavision';
        if (isPVCamera && !isPVLens) disabled = true;
        if (!isPVCamera && isPVLens && selectedCamera.id !== 'alexa_65') disabled = true;
        if (selectedCamera.id === 'alexa_65' && !['arri_prime_65', 'panavision_primo_70', 'hasselblad_v'].includes(l.id)) disabled = true;
      }
      return { ...l, disabled };
    });
  }, [selectedCamera]);

  // Filter film stocks
  const availableStocks = useMemo(() => {
    return filmStocks.map(s => {
      let disabled = isDigitalCamera;
      if (selectedCamera) {
        if (s.format === 'IMAX' && selectedCamera.type !== 'imax') disabled = true;
        if (s.format === '65mm' && !['Film 65mm', '65mm'].includes(selectedCamera.sensorSize)) disabled = true;
      }
      return { ...s, disabled };
    });
  }, [selectedCamera, isDigitalCamera]);

  // Filter light sources by era
  const availableLights = useMemo(() => {
    return lightSources.map(l => {
      let disabled = false;
      if (selectedCamera && l.availableFrom && selectedCamera.year < l.availableFrom) disabled = true;
      return { ...l, disabled };
    });
  }, [selectedCamera]);

  // Filter movement equipment by weight
  const availableMovement = useMemo(() => {
    return movementEquipments.map(eq => {
      let disabled = false;
      if (selectedCamera?.weightClass === 'heavy' && ['handheld', 'gimbal', 'drone'].includes(eq.id)) disabled = true;
      return { ...eq, disabled };
    });
  }, [selectedCamera]);

  return (
    <div className="flex flex-col lg:flex-row gap-0 h-full">
      {/* Left: Configuration */}
      <ScrollArea className="flex-1 lg:border-r border-border">
        <div className="p-5 space-y-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold tracking-tight">Shot Configuration</h2>
            <Button variant="ghost" size="sm" onClick={resetConfig} className="text-xs gap-1.5 text-muted-foreground">
              <RotateCcw className="h-3 w-3" /> Reset
            </Button>
          </div>

          {/* Scene Description */}
          <Section title="Scene" icon={Type} defaultOpen={true}>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Subject</Label>
              <Input
                placeholder="e.g., A lone figure standing at the edge of a cliff"
                value={config.subjectDescription}
                onChange={e => updateConfig({ subjectDescription: e.target.value })}
                className="text-xs h-9"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Scene Description</Label>
              <Textarea
                placeholder="e.g., Rain-soaked neon streets of a futuristic Tokyo..."
                value={config.sceneDescription}
                onChange={e => updateConfig({ sceneDescription: e.target.value })}
                className="text-xs min-h-[60px]"
              />
            </div>
          </Section>

          {/* Camera */}
          <Section title="Camera" icon={Camera}>
            <ConfigSelector
              label="Camera Body"
              value={config.camera}
              options={cameras.map(c => ({ id: c.id, name: c.name }))}
              onChange={v => {
                updateConfig({ camera: v });
                // Clear film stock if switching to digital
                const cam = v ? cameras.find(c => c.id === v) : null;
                if (cam?.type === 'digital' && config.filmStock) {
                  updateConfig({ camera: v, filmStock: null });
                }
              }}
            />
            {selectedCamera && (
              <div className="flex gap-3 text-[10px] text-muted-foreground">
                <span>Type: <span className="text-foreground">{selectedCamera.type}</span></span>
                <span>Sensor: <span className="text-foreground">{selectedCamera.sensorSize}</span></span>
                <span>Weight: <span className="text-foreground">{selectedCamera.weightClass}</span></span>
                <span>Year: <span className="text-foreground">{selectedCamera.year}</span></span>
              </div>
            )}
          </Section>

          {/* Lens */}
          <Section title="Lens" icon={Aperture}>
            <ConfigSelector
              label="Lens Family"
              value={config.lens}
              options={availableLenses.map(l => ({ id: l.id, name: l.name, disabled: l.disabled }))}
              onChange={v => updateConfig({ lens: v })}
            />
          </Section>

          {/* Film Stock */}
          {(isFilmCamera || (!selectedCamera && !isDigitalCamera)) && (
            <Section title="Film Stock" icon={Film} defaultOpen={!!isFilmCamera}>
              <ConfigSelector
                label="Film Stock"
                value={config.filmStock}
                options={availableStocks.map(s => ({ id: s.id, name: s.name, disabled: s.disabled }))}
                onChange={v => updateConfig({ filmStock: v })}
              />
            </Section>
          )}

          {/* Lighting */}
          <Section title="Lighting" icon={Sun}>
            <ConfigSelector
              label="Time of Day"
              value={config.timeOfDay}
              options={timesOfDay}
              onChange={v => updateConfig({ timeOfDay: v })}
            />
            <ConfigSelector
              label="Light Source"
              value={config.lightSource}
              options={availableLights.map(l => ({ id: l.id, name: l.name, disabled: l.disabled }))}
              onChange={v => updateConfig({ lightSource: v })}
            />
            <ConfigSelector
              label="Lighting Style"
              value={config.lightingStyle}
              options={lightingStyles}
              onChange={v => updateConfig({ lightingStyle: v })}
            />
          </Section>

          {/* Shot */}
          <Section title="Shot & Composition" icon={Camera}>
            <ConfigSelector label="Shot Size" value={config.shotSize} options={shotSizes.map(s => ({ id: s.id, name: `${s.abbr} — ${s.name}` }))} onChange={v => updateConfig({ shotSize: v })} />
            <ConfigSelector label="Composition" value={config.composition} options={compositionStyles} onChange={v => updateConfig({ composition: v })} />
            <ConfigSelector label="Aspect Ratio" value={config.aspectRatio} options={aspectRatios.map(a => ({ id: a.id, name: a.name }))} onChange={v => updateConfig({ aspectRatio: v })} />
          </Section>

          {/* Movement */}
          <Section title="Camera Movement" icon={Move}>
            <ConfigSelector label="Equipment" value={config.movementEquipment} options={availableMovement.map(e => ({ id: e.id, name: e.name, disabled: e.disabled }))} onChange={v => updateConfig({ movementEquipment: v })} />
            {config.movementEquipment && config.movementEquipment !== 'static' && (
              <>
                <ConfigSelector label="Movement Type" value={config.movementType} options={movementTypes} onChange={v => updateConfig({ movementType: v })} />
                <ConfigSelector label="Timing" value={config.movementTiming} options={movementTimings} onChange={v => updateConfig({ movementTiming: v })} />
              </>
            )}
          </Section>

          {/* Mood & Color */}
          <Section title="Mood & Color" icon={Palette}>
            <ConfigSelector label="Mood" value={config.mood} options={moods} onChange={v => updateConfig({ mood: v })} />
            <ConfigSelector label="Color Tone" value={config.colorTone} options={colorTones} onChange={v => updateConfig({ colorTone: v })} />
          </Section>
        </div>
      </ScrollArea>

      {/* Right: Output */}
      <div className="lg:w-[380px] flex flex-col">
        <ScrollArea className="flex-1">
          <div className="p-5 space-y-5">
            <PromptOutput
              prompt={prompt}
              targetModel={config.targetModel}
              onTargetModelChange={m => updateConfig({ targetModel: m })}
              hasErrors={hardViolations.length > 0}
            />
            
            <div>
              <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">
                Validation
                {violations.length > 0 && (
                  <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-secondary">
                    {hardViolations.length > 0 && <span className="text-destructive">{hardViolations.length} error{hardViolations.length > 1 ? 's' : ''}</span>}
                    {hardViolations.length > 0 && warnings.length > 0 && ' · '}
                    {warnings.length > 0 && <span className="text-[hsl(38,92%,50%)]">{warnings.length} warning{warnings.length > 1 ? 's' : ''}</span>}
                    {(hardViolations.length > 0 || warnings.length > 0) && infos.length > 0 && ' · '}
                    {infos.length > 0 && <span className="text-[hsl(200,80%,55%)]">{infos.length} info</span>}
                  </span>
                )}
              </h3>
              <ValidationPanel violations={violations} />
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

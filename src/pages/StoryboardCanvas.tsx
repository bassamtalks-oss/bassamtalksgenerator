import React, { useState, useCallback, useRef, useEffect } from 'react';
import { StoryboardPanel, StoryboardProject, CPEConfiguration } from '@/data/types';
import { getDefaultConfig } from '@/data/defaults';
import { generatePrompt } from '@/engine/promptGenerator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, ZoomIn, ZoomOut, Save, FolderOpen, Star, Copy, Check, Trash2, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

const PANEL_WIDTH = 320;
const PANEL_HEIGHT = 280;

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

export default function StoryboardCanvas() {
  const [panels, setPanels] = useState<StoryboardPanel[]>([]);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState<string | null>(null);
  const [panning, setPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [selectedPanel, setSelectedPanel] = useState<string | null>(null);
  const [projectName, setProjectName] = useState('Untitled Project');
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const addPanel = useCallback(() => {
    const newPanel: StoryboardPanel = {
      id: generateId(),
      name: `Shot_${panels.length + 1}`,
      x: (-offset.x + 100) / zoom,
      y: (-offset.y + 100) / zoom,
      width: PANEL_WIDTH,
      height: PANEL_HEIGHT,
      config: getDefaultConfig(),
      images: [],
      currentImageIndex: 0,
      rating: 0,
      notes: '',
      prompt: '',
    };
    setPanels(prev => [...prev, newPanel]);
    setSelectedPanel(newPanel.id);
  }, [panels.length, offset, zoom]);

  const updatePanel = useCallback((id: string, updates: Partial<StoryboardPanel>) => {
    setPanels(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  const deletePanel = useCallback((id: string) => {
    setPanels(prev => prev.filter(p => p.id !== id));
    if (selectedPanel === id) setSelectedPanel(null);
  }, [selectedPanel]);

  // Pan handler
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === canvasRef.current || (e.target as HTMLElement).dataset.canvas === 'true') {
      setPanning(true);
      setPanStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
      setSelectedPanel(null);
    }
  }, [offset]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (panning) {
      setOffset({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
    }
    if (dragging) {
      setPanels(prev => prev.map(p => {
        if (p.id !== dragging) return p;
        return {
          ...p,
          x: (e.clientX - offset.x) / zoom - dragOffset.current.x,
          y: (e.clientY - offset.y) / zoom - dragOffset.current.y,
        };
      }));
    }
  }, [panning, panStart, dragging, offset, zoom]);

  const handleMouseUp = useCallback(() => {
    setPanning(false);
    setDragging(null);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(z => Math.min(3, Math.max(0.2, z * delta)));
  }, []);

  const startDrag = useCallback((e: React.MouseEvent, panel: StoryboardPanel) => {
    e.stopPropagation();
    setDragging(panel.id);
    setSelectedPanel(panel.id);
    dragOffset.current = {
      x: (e.clientX - offset.x) / zoom - panel.x,
      y: (e.clientY - offset.y) / zoom - panel.y,
    };
  }, [offset, zoom]);

  // Save/Load
  const saveProject = useCallback(() => {
    const project: StoryboardProject = {
      id: generateId(),
      name: projectName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      panels,
      canvasZoom: zoom,
      canvasX: offset.x,
      canvasY: offset.y,
    };
    localStorage.setItem('dc_project', JSON.stringify(project));
  }, [panels, zoom, offset, projectName]);

  const loadProject = useCallback(() => {
    const data = localStorage.getItem('dc_project');
    if (!data) return;
    const project: StoryboardProject = JSON.parse(data);
    setPanels(project.panels);
    setZoom(project.canvasZoom);
    setOffset({ x: project.canvasX, y: project.canvasY });
    setProjectName(project.name);
  }, []);

  useEffect(() => {
    loadProject();
  }, []);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const copyPrompt = (panel: StoryboardPanel) => {
    const prompt = generatePrompt(panel.config);
    navigator.clipboard.writeText(prompt);
    setCopiedId(panel.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="h-11 border-b border-border flex items-center justify-between px-3 shrink-0 bg-card/50">
        <div className="flex items-center gap-2">
          <Input
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
            className="h-7 w-44 text-xs bg-transparent border-none focus-visible:ring-1"
          />
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setZoom(z => Math.min(3, z * 1.2))}>
            <ZoomIn className="h-3.5 w-3.5" />
          </Button>
          <span className="text-[10px] text-muted-foreground w-10 text-center font-mono">{Math.round(zoom * 100)}%</span>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setZoom(z => Math.max(0.2, z * 0.8))}>
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>
          <div className="w-px h-4 bg-border mx-1" />
          <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={addPanel}>
            <Plus className="h-3 w-3" /> Add Panel
          </Button>
          <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={saveProject}>
            <Save className="h-3 w-3" /> Save
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ background: 'radial-gradient(circle at center, hsl(var(--secondary)) 1px, transparent 1px)', backgroundSize: `${20 * zoom}px ${20 * zoom}px`, backgroundPosition: `${offset.x}px ${offset.y}px` }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        data-canvas="true"
      >
        {panels.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" data-canvas="true">
            <div className="text-center space-y-3">
              <div className="text-6xl opacity-20">🎬</div>
              <p className="text-sm text-muted-foreground">Click <strong>"Add Panel"</strong> to start your storyboard</p>
            </div>
          </div>
        )}

        {/* Panels */}
        {panels.map(panel => {
          const prompt = generatePrompt(panel.config);
          return (
            <div
              key={panel.id}
              className={cn(
                'absolute rounded-lg border bg-card shadow-lg transition-shadow',
                selectedPanel === panel.id ? 'border-primary shadow-primary/10 ring-1 ring-primary/20' : 'border-border',
                dragging === panel.id && 'opacity-90'
              )}
              style={{
                left: panel.x * zoom + offset.x,
                top: panel.y * zoom + offset.y,
                width: panel.width * zoom,
                minHeight: panel.height * zoom,
                transform: `scale(1)`,
              }}
              onClick={e => { e.stopPropagation(); setSelectedPanel(panel.id); }}
            >
              {/* Panel header */}
              <div
                className="flex items-center justify-between px-2 py-1.5 border-b border-border cursor-move"
                onMouseDown={e => startDrag(e, panel)}
              >
                <div className="flex items-center gap-1">
                  <GripVertical className="h-3 w-3 text-muted-foreground" />
                  <Input
                    value={panel.name}
                    onChange={e => updatePanel(panel.id, { name: e.target.value })}
                    className="h-5 text-[10px] bg-transparent border-none p-0 w-24 font-mono"
                    onClick={e => e.stopPropagation()}
                    onMouseDown={e => e.stopPropagation()}
                  />
                </div>
                <div className="flex items-center gap-0.5">
                  <Button variant="ghost" size="icon" className="h-5 w-5" onClick={e => { e.stopPropagation(); copyPrompt(panel); }}>
                    {copiedId === panel.id ? <Check className="h-2.5 w-2.5 text-[hsl(142,71%,45%)]" /> : <Copy className="h-2.5 w-2.5" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-5 w-5 text-destructive/60 hover:text-destructive" onClick={e => { e.stopPropagation(); deletePanel(panel.id); }}>
                    <Trash2 className="h-2.5 w-2.5" />
                  </Button>
                </div>
              </div>

              {/* Image area */}
              <div className="aspect-video bg-secondary/30 flex items-center justify-center border-b border-border">
                {panel.images.length > 0 ? (
                  <img src={panel.images[panel.currentImageIndex]} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs text-muted-foreground">No image</span>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-0.5 px-2 py-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button key={star} onClick={e => { e.stopPropagation(); updatePanel(panel.id, { rating: panel.rating === star ? 0 : star }); }}>
                    <Star className={cn('h-3 w-3', star <= panel.rating ? 'fill-primary text-primary' : 'text-muted-foreground/30')} />
                  </button>
                ))}
              </div>

              {/* Prompt preview */}
              {prompt && (
                <div className="px-2 pb-2">
                  <p className="text-[9px] font-mono text-muted-foreground line-clamp-2 leading-relaxed">{prompt}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

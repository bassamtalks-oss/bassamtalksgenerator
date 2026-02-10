import React, { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Camera, LayoutGrid, Film, Clapperboard } from 'lucide-react';
import PromptBuilder from '@/pages/PromptBuilder';
import PresetsPage from '@/pages/PresetsPage';
import StoryboardCanvas from '@/pages/StoryboardCanvas';
import { useCPEConfiguration } from '@/hooks/useCPEConfiguration';
import { cn } from '@/lib/utils';
import { CPEConfiguration } from '@/data/types';

type Page = 'builder' | 'presets' | 'storyboard';

const navItems = [
  { id: 'builder' as Page, title: 'Prompt Builder', icon: Camera },
  { id: 'presets' as Page, title: 'Film Presets', icon: Film },
  { id: 'storyboard' as Page, title: 'Storyboard', icon: LayoutGrid },
];

export default function AppLayout() {
  const [activePage, setActivePage] = useState<Page>('builder');
  const { loadPreset } = useCPEConfiguration();

  const handleLoadPreset = (config: Partial<CPEConfiguration>) => {
    loadPreset(config);
    setActivePage('builder');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r border-border">
          <SidebarContent>
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Clapperboard className="h-5 w-5 text-primary" />
                <span className="font-semibold text-sm tracking-tight">Director's Console</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">Cinema Prompt Engineering</p>
            </div>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map(item => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => setActivePage(item.id)}
                        className={cn(
                          'transition-colors',
                          activePage === item.id && 'bg-sidebar-accent text-primary font-medium'
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          <header className="h-11 border-b border-border flex items-center px-3 shrink-0 bg-card/30">
            <SidebarTrigger className="mr-3" />
            <h1 className="text-sm font-medium">{navItems.find(n => n.id === activePage)?.title}</h1>
          </header>

          <div className="flex-1 overflow-hidden">
            {activePage === 'builder' && <PromptBuilder />}
            {activePage === 'presets' && <PresetsPage onLoadPreset={handleLoadPreset} onNavigateToBuilder={() => setActivePage('builder')} />}
            {activePage === 'storyboard' && <StoryboardCanvas />}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

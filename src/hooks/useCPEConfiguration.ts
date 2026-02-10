import { useState, useCallback, useMemo } from 'react';
import { CPEConfiguration, RuleViolation } from '@/data/types';
import { getDefaultConfig } from '@/data/defaults';
import { validateConfiguration } from '@/engine/rules';
import { generatePrompt } from '@/engine/promptGenerator';

export function useCPEConfiguration() {
  const [config, setConfig] = useState<CPEConfiguration>(getDefaultConfig());

  const updateConfig = useCallback((updates: Partial<CPEConfiguration>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(getDefaultConfig());
  }, []);

  const loadPreset = useCallback((presetConfig: Partial<CPEConfiguration>) => {
    setConfig({ ...getDefaultConfig(), ...presetConfig });
  }, []);

  const violations = useMemo(() => validateConfiguration(config), [config]);
  const prompt = useMemo(() => generatePrompt(config), [config]);
  const hardViolations = useMemo(() => violations.filter(v => v.severity === 'HARD'), [violations]);
  const warnings = useMemo(() => violations.filter(v => v.severity === 'WARNING'), [violations]);
  const infos = useMemo(() => violations.filter(v => v.severity === 'INFO'), [violations]);

  return {
    config,
    updateConfig,
    resetConfig,
    loadPreset,
    violations,
    hardViolations,
    warnings,
    infos,
    prompt,
  };
}

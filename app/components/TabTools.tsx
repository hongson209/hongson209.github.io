'use client';

import React, { useState, useEffect } from 'react';
import { Wand2, Type, Boxes } from 'lucide-react';
import ConfigTranslator from './tools/ConfigTranslator';
import FontConverter from './tools/FontConverter';
import PluginHub from './tools/PluginHub';

export type ToolSubTab = 'translator' | 'font' | 'plugins';

interface TabToolsProps {
  initialSubTab?: ToolSubTab;
}

export default function TabTools({ initialSubTab = 'translator' }: TabToolsProps) {
  const [subTab, setSubTab] = useState<ToolSubTab>(initialSubTab);

  useEffect(() => {
    if (initialSubTab) {
      setSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  const subTabs: {
    id: ToolSubTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: 'translator', label: 'Dịch Config', icon: Wand2 },
    { id: 'font', label: 'Font Mini', icon: Type },
    { id: 'plugins', label: 'Kho Plugins', icon: Boxes },
  ];

  return (
    <div className="space-y-2">
      {/* Compact Sub-tab Navigation */}
      <div className="flex items-center gap-1.5 pb-1 border-b border-white/10">
        <div className="flex items-center gap-1 p-0.5 bg-black/40 border border-white/10 rounded-xl">
          {subTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = subTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id)}
                className={'flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold font-mono transition-all ' + (
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                )}
              >
                <Icon className={'w-3.5 h-3.5 ' + (isActive ? 'text-white' : 'text-gray-400')} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render selected Tool Sub-view */}
      <div className="animate-tab-fade">
        {subTab === 'translator' && <ConfigTranslator />}
        {subTab === 'font' && <FontConverter />}
        {subTab === 'plugins' && <PluginHub />}
      </div>
    </div>
  );
}

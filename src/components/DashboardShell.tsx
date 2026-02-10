import { StatusBar } from './StatusBar';
import { DigivolutionNexus } from './DigivolutionNexus';
import { TokenBreakdown } from './Sidebar/TokenBreakdown';
import { CostEstimate } from './Sidebar/CostEstimate';
import { BattleLog } from './Sidebar/BattleLog';
import { Cpu } from 'lucide-react';

export const DashboardShell = () => {
  return (
    <div className="min-h-screen bg-[#0a0f1e] p-4">
      {/* Main container */}
      <div className="max-w-[1600px] mx-auto relative">
        {/* Header */}
        <div className="relative flex items-center gap-4 mb-4 pb-3 border-b-2 border-[#00D4FF]/50">
          <div className="w-10 h-10 bg-gradient-to-br from-[#00D4FF] to-[#0099CC] rounded-lg flex items-center justify-center">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white tracking-wider" style={{ textShadow: '0 0 15px rgba(0,212,255,0.5)' }}>
              DIGIMON AI AGENT EVOLUTION DASHBOARD
            </h1>
          </div>
        </div>

        {/* Status Bar */}
        <StatusBar />

        {/* Main Content Grid - 75% main, 25% sidebar */}
        <div className="grid grid-cols-[3fr_1fr] gap-5 mt-5 relative">
          {/* Left: Digivolution Nexus */}
          <div className="h-[600px]">
            <DigivolutionNexus />
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-4">
            <TokenBreakdown />
            <CostEstimate />
            <BattleLog />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center py-3 border-t border-[#00D4FF]/20">
          <p className="text-xs text-gray-500 font-mono tracking-wider">
            SYSTEM ACTIVE | V1.0 | AI AGENT EVOLUTION MONITOR
          </p>
        </div>
      </div>
    </div>
  );
};

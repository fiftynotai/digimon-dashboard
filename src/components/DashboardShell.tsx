import { StatusBar } from './StatusBar';
import { DigivolutionNexus } from './DigivolutionNexus';
import { TokenBreakdown } from './Sidebar/TokenBreakdown';
import { CostEstimate } from './Sidebar/CostEstimate';
import { BattleLog } from './Sidebar/BattleLog';
import { Cpu } from 'lucide-react';

export const DashboardShell = () => {
  return (
    <div className="min-h-screen bg-[#0a1628] p-4">
      {/* Main container with gradient overlay */}
      <div className="max-w-[1800px] mx-auto relative">
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }} />

        {/* Header */}
        <div className="relative flex items-center gap-4 mb-4 pb-4 border-b-2 border-cyan-500/50">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.5)]">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white tracking-wider" style={{ textShadow: '0 0 20px rgba(6, 182, 212, 0.5)' }}>
              DIGIMON AI AGENT EVOLUTION DASHBOARD
            </h1>
            <p className="text-xs text-cyan-400 font-mono tracking-wide">
              Real-time Agent Monitoring & Tactical Analysis System
            </p>
          </div>
        </div>

        {/* Status Bar */}
        <StatusBar />

        {/* Main Content Grid */}
        <div className="grid grid-cols-[1fr_340px] gap-5 mt-5 relative">
          {/* Left: Digivolution Nexus */}
          <div className="h-[650px]">
            <DigivolutionNexus />
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-5">
            <TokenBreakdown />
            <CostEstimate />
            <BattleLog />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center py-3 border-t border-cyan-500/20">
          <p className="text-xs text-gray-500 font-mono tracking-wider">
            SYSTEM ACTIVE | V1.0 | AI AGENT EVOLUTION MONITOR
          </p>
        </div>
      </div>
    </div>
  );
};

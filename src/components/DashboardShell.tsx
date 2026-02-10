import { StatusBar } from './StatusBar';
import { DigivolutionNexus } from './DigivolutionNexus';
import { TokenBreakdown } from './Sidebar/TokenBreakdown';
import { CostEstimate } from './Sidebar/CostEstimate';
import { BattleLog } from './Sidebar/BattleLog';
import { Cpu } from 'lucide-react';

export const DashboardShell = () => {
  return (
    <div
      className="min-h-screen p-4"
      style={{
        background: 'radial-gradient(ellipse at center, #122B45 0%, #070D18 100%)',
      }}
    >
      {/* Digital noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main container */}
      <div className="max-w-[1600px] mx-auto relative">
        {/* Header */}
        <div className="relative flex items-center gap-4 mb-4 pb-3 border-b border-[#00D4FF]">
          {/* Orange crest icon */}
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #FF8C00, #FF6B00)',
              boxShadow: '0 0 15px rgba(255,140,0,0.4)',
            }}
          >
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1
              className="text-3xl font-bold text-white tracking-wider"
              style={{
                textShadow: '0 0 10px #00D4FF, 0 0 20px #0088AA',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: 700,
                letterSpacing: '2px',
              }}
            >
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
        <div className="mt-6 text-center py-3 border-t border-[#00D4FF]/30">
          <p className="text-xs text-gray-500 font-mono tracking-wider">
            SYSTEM ACTIVE | V1.0 | AI AGENT EVOLUTION MONITOR
          </p>
        </div>
      </div>
    </div>
  );
};

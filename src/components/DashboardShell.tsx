import { StatusBar } from './StatusBar';
import { DigivolutionNexus } from './DigivolutionNexus';
import { TokenBreakdown } from './Sidebar/TokenBreakdown';
import { CostEstimate } from './Sidebar/CostEstimate';
import { BattleLog } from './Sidebar/BattleLog';
import { Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export const DashboardShell = () => {
  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: '#050a14',
        backgroundImage: `
          radial-gradient(ellipse at 20% 50%, rgba(0, 240, 255, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, rgba(255, 170, 0, 0.08) 0%, transparent 50%)
        `,
      }}
    >
      {/* Digital noise texture overlay - scanlines */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.03) 2px, rgba(0, 0, 0, 0.03) 4px)',
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(0deg, rgba(0, 240, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main container */}
      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative flex items-center gap-4 mb-6 pb-4"
          style={{
            borderBottom: '2px solid #00f0ff',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)',
          }}
        >
          {/* Orange crest icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="relative w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #ffaa00, #ff6b00)',
              boxShadow: '0 0 25px rgba(255, 170, 0, 0.5), 0 0 40px rgba(255, 107, 0, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.2)',
            }}
          >
            <Cpu className="w-7 h-7 text-white" style={{ filter: 'drop-shadow(0 0 8px rgba(255, 170, 0, 0.8))' }} />
          </motion.div>

          <div className="flex-1">
            <h1
              className="text-4xl font-bold text-white tracking-widest uppercase"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                textShadow: '0 0 15px #00f0ff, 0 0 30px rgba(0, 240, 255, 0.4), 0 0 50px rgba(0, 240, 255, 0.2)',
                letterSpacing: '3px',
              }}
            >
              DIGIMON AI AGENT
            </h1>
            <h2
              className="text-2xl font-bold text-white tracking-widest uppercase mt-1"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                textShadow: '0 0 10px #ffaa00, 0 0 20px rgba(255, 170, 0, 0.3)',
                letterSpacing: '2px',
              }}
            >
              EVOLUTION DASHBOARD
            </h2>
          </div>

          {/* Decorative corner lines */}
          <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none">
            <div
              className="absolute top-0 right-0 w-12 h-1"
              style={{ background: '#ffaa00', boxShadow: '0 0 10px #ffaa00' }}
            />
            <div
              className="absolute top-0 right-0 w-1 h-12"
              style={{ background: '#ffaa00', boxShadow: '0 0 10px #ffaa00' }}
            />
          </div>
        </motion.div>

        {/* Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <StatusBar />
        </motion.div>

        {/* Main Content Grid - 75% main, 25% sidebar */}
        <div className="grid grid-cols-[3fr_1fr] gap-6 mt-6 relative">
          {/* Left: Digivolution Nexus */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-[700px]"
          >
            <DigivolutionNexus />
          </motion.div>

          {/* Right: Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-5"
          >
            <TokenBreakdown />
            <CostEstimate />
            <BattleLog />
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-center py-4"
          style={{
            borderTop: '1px solid #00f0ff44',
          }}
        >
          <p
            className="text-xs uppercase tracking-widest font-mono"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              color: '#6b7280',
              textShadow: '0 0 6px rgba(0, 240, 255, 0.3)',
            }}
          >
            ◆ SYSTEM ACTIVE | V1.0 | AI AGENT EVOLUTION MONITOR ◆
          </p>
        </motion.div>
      </div>
    </div>
  );
};

import { useDashboardStore } from '../../stores/dashboardStore';
import { AgentNode } from './AgentNode';
import { ConnectionBeam } from './ConnectionBeam';
import type { DigimonAgent } from '../../types/dashboard';
import { motion } from 'framer-motion';

export const DigivolutionNexus = () => {
  const { agents } = useDashboardStore();

  // Find central agent (the one at position 50, 50)
  const centralAgent = agents.find((a) => a.position.x === 50 && a.position.y === 50);

  // Get all connections (avoid duplicates)
  const connections: { from: DigimonAgent; to: DigimonAgent }[] = [];
  const processedPairs = new Set<string>();

  agents.forEach((agent) => {
    agent.connections.forEach((targetId) => {
      const targetAgent = agents.find((a) => a.id === targetId);
      if (targetAgent) {
        const pairKey = [agent.id, targetId].sort().join('-');
        if (!processedPairs.has(pairKey)) {
          processedPairs.add(pairKey);
          connections.push({ from: agent, to: targetAgent });
        }
      }
    });
  });

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#0a1628] via-[#0f1f3a] to-[#0a1628] border-2 border-cyan-500/40 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.3)]">
      {/* Title overlay */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-4 left-6 z-50 pointer-events-none"
      >
        <h2 className="font-bold text-lg tracking-wider text-white" style={{ textShadow: '0 0 20px rgba(6, 182, 212, 0.7)' }}>
          DIGIVOLUTION NEXUS
        </h2>
        <p className="text-xs text-cyan-400/70 font-mono mt-1">Agent Evolution Tree</p>
      </motion.div>

      {/* Connection Beams Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {connections.map((conn) => (
          <ConnectionBeam key={`${conn.from.id}-${conn.to.id}`} from={conn.from} to={conn.to} />
        ))}
      </div>

      {/* Agent Nodes Layer */}
      <div className="relative w-full h-full">
        {agents.map((agent) => (
          <AgentNode
            key={agent.id}
            agent={agent}
            isCentral={agent.id === centralAgent?.id}
          />
        ))}
      </div>

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/50" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/50" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50" />
    </div>
  );
};

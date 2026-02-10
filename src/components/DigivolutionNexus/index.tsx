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
    <div
      className="relative w-full h-full border-2 rounded-lg overflow-hidden"
      style={{
        background: 'rgba(8, 20, 35, 0.85)',
        borderColor: 'linear-gradient(90deg, #00D4FF, #FF6B00)',
      }}
    >
      {/* Hexagonal grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(0deg, rgba(26, 58, 92, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26, 58, 92, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '70px 70px',
          backgroundPosition: '0 0',
        }}
      />

      {/* Title overlay */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-4 left-6 z-50 pointer-events-none"
      >
        <h2
          className="font-bold text-xl tracking-wider"
          style={{
            color: '#00D4FF',
            letterSpacing: '4px',
            textShadow: '0 0 10px rgba(0,212,255,0.3)',
          }}
        >
          DIGIVOLUTION NEXUS
        </h2>
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

      {/* Corner accent decorations */}
      <div
        className="absolute top-3 left-3 w-8 h-0.5"
        style={{
          background: '#00D4FF',
          boxShadow: '0 0 8px #00D4FF',
        }}
      />
      <div
        className="absolute top-3 right-3 w-8 h-0.5"
        style={{
          background: '#FF6B00',
          boxShadow: '0 0 8px #FF6B00',
        }}
      />
      <div
        className="absolute bottom-3 left-3 w-8 h-0.5"
        style={{
          background: '#00D4FF',
          boxShadow: '0 0 8px #00D4FF',
        }}
      />
      <div
        className="absolute bottom-3 right-3 w-8 h-0.5"
        style={{
          background: '#FF6B00',
          boxShadow: '0 0 8px #FF6B00',
        }}
      />
    </div>
  );
};

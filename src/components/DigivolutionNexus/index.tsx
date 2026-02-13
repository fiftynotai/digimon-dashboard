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
      className="relative w-full h-full overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #050a14 0%, #0a1425 50%, #050a14 100%)',
        border: '2px solid #00f0ff',
        boxShadow: '0 0 30px rgba(0, 240, 255, 0.2), inset 0 0 60px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Grid background with hexagon pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(0deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.5,
        }}
      />

      {/* Hexagonal overlay pattern */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="hexPattern"
            width="80"
            height="70"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(2)"
          >
            <path
              d="M40 0 L80 20 L80 60 L40 80 L0 60 L0 20 Z"
              fill="none"
              stroke="#00f0ff"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexPattern)" />
      </svg>

      {/* Scanline effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 240, 255, 0.02) 2px, rgba(0, 240, 255, 0.02) 4px)',
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
          className="font-bold text-2xl tracking-wider uppercase"
          style={{
            fontFamily: 'Orbitron, sans-serif',
            color: '#00f0ff',
            textShadow: '0 0 10px #00f0ff, 0 0 20px rgba(0, 240, 255, 0.5), 0 0 40px rgba(0, 240, 255, 0.3)',
            letterSpacing: '4px',
          }}
        >
          DIGIVOLUTION NEXUS
        </h2>
        <div className="mt-1 h-0.5 w-32" style={{ background: 'linear-gradient(90deg, #00f0ff, transparent)' }} />
      </motion.div>

      {/* Corner frame decorations */}
      <div className="absolute top-2 left-2 w-16 h-16 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-8 h-1"
          style={{ background: '#00f0ff', boxShadow: '0 0 10px #00f0ff' }}
        />
        <div
          className="absolute top-0 left-0 w-1 h-8"
          style={{ background: '#00f0ff', boxShadow: '0 0 10px #00f0ff' }}
        />
      </div>

      <div className="absolute top-2 right-2 w-16 h-16 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-8 h-1"
          style={{ background: '#ffaa00', boxShadow: '0 0 10px #ffaa00' }}
        />
        <div
          className="absolute top-0 right-0 w-1 h-8"
          style={{ background: '#ffaa00', boxShadow: '0 0 10px #ffaa00' }}
        />
      </div>

      <div className="absolute bottom-2 left-2 w-16 h-16 pointer-events-none">
        <div
          className="absolute bottom-0 left-0 w-8 h-1"
          style={{ background: '#00f0ff', boxShadow: '0 0 10px #00f0ff' }}
        />
        <div
          className="absolute bottom-0 left-0 w-1 h-8"
          style={{ background: '#00f0ff', boxShadow: '0 0 10px #00f0ff' }}
        />
      </div>

      <div className="absolute bottom-2 right-2 w-16 h-16 pointer-events-none">
        <div
          className="absolute bottom-0 right-0 w-8 h-1"
          style={{ background: '#ffaa00', boxShadow: '0 0 10px #ffaa00' }}
        />
        <div
          className="absolute bottom-0 right-0 w-1 h-8"
          style={{ background: '#ffaa00', boxShadow: '0 0 10px #ffaa00' }}
        />
      </div>

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
    </div>
  );
};

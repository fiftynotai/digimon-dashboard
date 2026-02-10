import { motion } from 'framer-motion';
import type { DigimonAgent } from '../../types/dashboard';

interface AgentNodeProps {
  agent: DigimonAgent;
  isCentral?: boolean;
  onClick?: () => void;
}

export const AgentNode = ({ agent, isCentral = false, onClick }: AgentNodeProps) => {
  const getColorClasses = () => {
    const colorMap: Record<string, { border: string; bg: string; text: string; glow: string }> = {
      red: {
        border: 'border-[#FF3366]',
        bg: 'bg-gradient-to-b from-[#1a1525]/85 to-[#0a0f1e]/95',
        text: 'text-[#FF3366]',
        glow: 'shadow-[0_0_15px_rgba(255,51,102,0.3)]',
      },
      blue: {
        border: 'border-[#00D4FF]',
        bg: 'bg-gradient-to-b from-[#152530]/85 to-[#0a0f1e]/95',
        text: 'text-[#00D4FF]',
        glow: 'shadow-[0_0_15px_rgba(0,212,255,0.3)]',
      },
      gold: {
        border: 'border-[#F5A623]',
        bg: 'bg-gradient-to-b from-[#302520]/85 to-[#0a0f1e]/95',
        text: 'text-[#F5A623]',
        glow: 'shadow-[0_0_15px_rgba(245,166,35,0.3)]',
      },
      cyan: {
        border: 'border-[#00D4FF]',
        bg: 'bg-gradient-to-b from-[#152530]/85 to-[#0a0f1e]/95',
        text: 'text-[#00D4FF]',
        glow: 'shadow-[0_0_15px_rgba(0,212,255,0.3)]',
      },
    };
    return colorMap[agent.color];
  };

  const classes = getColorClasses();
  const width = isCentral ? 'w-[220px]' : 'w-[180px]';
  const height = isCentral ? 'h-[160px]' : 'h-[120px]';
  const borderWidth = isCentral ? 'border-3' : 'border-2';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: isCentral ? 0.2 : 0 }}
      whileHover={{ scale: 1.03, zIndex: 10 }}
      onClick={onClick}
      className={`
        absolute cursor-pointer
        ${classes.bg} ${classes.border} ${borderWidth} ${classes.glow}
        ${width} ${height}
      `}
      style={{
        left: `${agent.position.x}%`,
        top: `${agent.position.y}%`,
        transform: 'translate(-50%, -50%)',
        // Hexagonal shape using clip-path
        clipPath: 'polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)',
      }}
    >
      {/* Inner glow overlay */}
      <div
        className="absolute inset-1 opacity-50"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
          clipPath: 'polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)',
        }}
      />

      {/* Corner accent for central node */}
      {isCentral && (
        <div
          className="absolute top-0 left-0 w-3 h-3"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 0 100%)',
            backgroundColor: agent.color === 'red' ? '#FF3366' : agent.color === 'blue' ? '#00D4FF' : '#F5A623',
          }}
        />
      )}

      {/* Sprite */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2">
        <span className="text-4xl drop-shadow-lg">{agent.sprite}</span>
      </div>

      {/* Name */}
      <div className="absolute bottom-14 left-0 right-0 text-center px-4">
        <h3 className="font-bold text-white text-sm tracking-wide" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
          {agent.name}
        </h3>
      </div>

      {/* Stage badges */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-1 px-2">
        <span
          className={`
            text-[9px] font-bold px-2 py-0.5 rounded-sm
            ${classes.text} bg-black/60
          `}
        >
          {agent.stage}
        </span>
        {agent.trainingStage && (
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-sm bg-black/60 text-gray-300">
            {agent.trainingStage}
          </span>
        )}
      </div>

      {/* Stats row at bottom */}
      <div className="absolute bottom-2.5 left-3 right-3 flex justify-between items-center">
        <div className="text-[9px] text-gray-400 font-mono">
          {agent.runs.current}/{agent.runs.total}
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: agent.maxEnergy }).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-2 rounded-sm ${
                i < agent.energy
                  ? agent.color === 'red'
                    ? 'bg-[#FF3366]'
                    : agent.color === 'blue'
                    ? 'bg-[#00D4FF]'
                    : 'bg-[#F5A623]'
                  : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* HP bar */}
      <div className="absolute bottom-0 left-3 right-3 h-1.5 bg-black/70 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${agent.hp}%` }}
          transition={{ duration: 0.8 }}
          className={`h-full ${
            agent.hp > 60 ? 'bg-green-500' : agent.hp > 30 ? 'bg-amber-500' : 'bg-red-500'
          }`}
        />
      </div>
    </motion.div>
  );
};

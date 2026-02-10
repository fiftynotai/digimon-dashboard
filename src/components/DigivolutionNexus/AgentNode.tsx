import { motion } from 'framer-motion';
import type { DigimonAgent } from '../../types/dashboard';

interface AgentNodeProps {
  agent: DigimonAgent;
  isCentral?: boolean;
  onClick?: () => void;
}

export const AgentNode = ({ agent, isCentral = false, onClick }: AgentNodeProps) => {
  const getColorClasses = () => {
    const colorMap: Record<string, { border: string; glow: string; text: string }> = {
      red: {
        border: 'border-red-500',
        glow: 'shadow-[0_0_20px_rgba(239,68,68,0.5),0_0_40px_rgba(239,68,68,0.3)]',
        text: 'text-red-400',
      },
      blue: {
        border: 'border-cyan-500',
        glow: 'shadow-[0_0_20px_rgba(6,182,212,0.5),0_0_40px_rgba(6,182,212,0.3)]',
        text: 'text-cyan-400',
      },
      gold: {
        border: 'border-amber-500',
        glow: 'shadow-[0_0_20px_rgba(245,158,11,0.5),0_0_40px_rgba(245,158,11,0.3)]',
        text: 'text-amber-400',
      },
      cyan: {
        border: 'border-teal-400',
        glow: 'shadow-[0_0_20px_rgba(45,212,191,0.5),0_0_40px_rgba(45,212,191,0.3)]',
        text: 'text-teal-400',
      },
    };
    return colorMap[agent.color];
  };

  const classes = getColorClasses();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: isCentral ? 0.3 : 0 }}
      whileHover={{ scale: 1.05, y: -2 }}
      onClick={onClick}
      className={`
        absolute bg-gradient-to-br from-[#0a1628] to-[#0f1f3a] 
        ${classes.border} ${classes.glow} p-4 cursor-pointer
        ${isCentral ? 'hex-clip w-56 h-56' : 'rounded-xl border-2'}
        backdrop-blur-sm
      `}
      style={{
        left: `${agent.position.x}%`,
        top: `${agent.position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Glow ring for central nodes */}
      {isCentral && (
        <div
          className={`
            absolute inset-0 ${classes.border} rounded-lg
            animate-pulse opacity-30
          `}
          style={{ transform: 'scale(1.1)', filter: 'blur(8px)' }}
        />
      )}

      {/* Sprite area */}
      <div className={`flex justify-center mb-3 ${isCentral ? 'mt-6' : ''}`}>
        <div
          className={`
            relative ${isCentral ? 'w-24 h-24' : 'w-16 h-16'}
            rounded-lg ${classes.border} bg-gradient-to-br 
            from-[#0a1628] to-[#0f1f3a] flex items-center 
            justify-center ${classes.glow}
          `}
        >
          <span className={`text-${isCentral ? '5xl' : '3xl'} drop-shadow-lg`}>
            {agent.sprite}
          </span>
          {/* HP bar on sprite */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${agent.hp}%` }}
              transition={{ duration: 0.8 }}
              className={`h-full ${
                agent.hp > 60 ? 'bg-green-500' : agent.hp > 30 ? 'bg-amber-500' : 'bg-red-500'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Name & Stage badges */}
      <div className="text-center space-y-1">
        <h3 className="font-bold text-white tracking-wide text-sm">
          {agent.name}
        </h3>
        <div className="flex gap-1 justify-center flex-wrap">
          <span
            className={`
              text-[9px] font-bold px-2 py-0.5 rounded-full 
              ${classes.border} ${classes.text} bg-opacity-20
            `}
          >
            {agent.stage}
          </span>
          {agent.trainingStage && (
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-gray-700 text-gray-300">
              {agent.trainingStage}
            </span>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="text-center">
          <div className="text-[9px] text-gray-500 font-mono">RUNS</div>
          <div className="text-xs font-mono font-bold text-white">
            {agent.runs.current}/{agent.runs.total}
          </div>
        </div>
        <div className="text-center">
          <div className="text-[9px] text-gray-500 font-mono">ENERGY</div>
          <div className="flex gap-0.5 justify-center">
            {Array.from({ length: agent.maxEnergy }).map((_, i) => (
              <div
                key={i}
                className={`
                  w-1.5 h-2 rounded-sm ${i < agent.energy ? classes.text : 'bg-gray-700'}
                `}
                style={i < agent.energy ? { textShadow: '0 0 8px currentColor' } : {}}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mini stat bars */}
      {isCentral && (
        <div className="mt-3 space-y-1.5">
          <div>
            <div className="flex justify-between text-[8px] text-gray-500 mb-0.5">
              <span>STR</span>
              <span className="text-amber-400">85</span>
            </div>
            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                className="h-full bg-gradient-to-r from-amber-600 to-amber-400"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[8px] text-gray-500 mb-0.5">
              <span>VIT</span>
              <span className="text-green-400">72</span>
            </div>
            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '72%' }}
                className="h-full bg-gradient-to-r from-green-600 to-green-400"
              />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

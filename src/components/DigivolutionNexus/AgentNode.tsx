import { motion } from 'framer-motion';
import type { DigimonAgent } from '../../types/dashboard';

interface AgentNodeProps {
  agent: DigimonAgent;
  isCentral?: boolean;
  onClick?: () => void;
}

export const AgentNode = ({ agent, isCentral = false, onClick }: AgentNodeProps) => {
  const getColorHex = (color: string): string => {
    const colorMap: Record<string, string> = {
      red: '#ff003c',
      blue: '#00f0ff',
      gold: '#ffaa00',
      cyan: '#00f0ff',
    };
    return colorMap[color] || '#00f0ff';
  };

  const getSecondaryColor = (color: string): string => {
    const colorMap: Record<string, string> = {
      red: '#ff3366',
      blue: '#00d4ff',
      gold: '#f5a623',
      cyan: '#00ffcc',
    };
    return colorMap[color] || '#00d4ff';
  };

  const primaryColor = getColorHex(agent.color);
  const secondaryColor = getSecondaryColor(agent.color);

  const width = isCentral ? 'w-[200px]' : 'w-[170px]';
  const height = isCentral ? 'h-[180px]' : 'h-[140px]';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: isCentral ? 0.2 : 0 }}
      whileHover={{ scale: 1.03, zIndex: 10 }}
      onClick={onClick}
      className={`
        absolute cursor-pointer
        ${width} ${height}
      `}
      style={{
        left: `${agent.position.x}%`,
        top: `${agent.position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Outer hexagon - neon glow border */}
      <div
        className="absolute inset-0"
        style={{
          background: primaryColor,
          boxShadow: isCentral
            ? `0 0 20px ${primaryColor}, 0 0 40px ${primaryColor}66, inset 0 0 20px ${primaryColor}33`
            : `0 0 10px ${primaryColor}, 0 0 20px ${primaryColor}66`,
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        }}
      />

      {/* Inner hexagon - darker background */}
      <div
        className="absolute inset-[2px]"
        style={{
          background: 'linear-gradient(135deg, #0d1a2d 0%, #050a14 100%)',
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        }}
      />

      {/* Inner border - secondary glow */}
      <div
        className="absolute inset-[4px]"
        style={{
          background: secondaryColor,
          boxShadow: `0 0 8px ${secondaryColor}`,
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
          opacity: 0.5,
        }}
      />

      {/* Innermost content area */}
      <div
        className="absolute inset-[6px]"
        style={{
          background: 'linear-gradient(180deg, rgba(8, 25, 45, 0.95) 0%, rgba(5, 10, 20, 0.98) 100%)',
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        }}
      />

      {/* Scanline overlay inside hexagon */}
      <div
        className="absolute inset-[6px] pointer-events-none opacity-10"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 240, 255, 0.1) 2px, rgba(0, 240, 255, 0.1) 4px)',
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        }}
      />

      {/* Corner decorations */}
      {isCentral && (
        <>
          <div
            className="absolute top-[8px] left-[8px] w-3 h-3"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 0 100%)',
              backgroundColor: primaryColor,
              boxShadow: `0 0 8px ${primaryColor}`,
            }}
          />
          <div
            className="absolute bottom-[8px] right-[8px] w-3 h-3"
            style={{
              clipPath: 'polygon(100% 100%, 0 100%, 100% 0)',
              backgroundColor: primaryColor,
              boxShadow: `0 0 8px ${primaryColor}`,
            }}
          />
        </>
      )}

      {/* Placeholder image area */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <div
          className={`flex items-center justify-center ${isCentral ? 'w-20 h-20' : 'w-16 h-16'} rounded-sm`}
          style={{
            background: `linear-gradient(135deg, ${primaryColor}33, ${secondaryColor}11)`,
            border: `1px solid ${secondaryColor}66`,
            boxShadow: `0 0 10px ${primaryColor}44`,
          }}
        >
          <span className={`${isCentral ? 'text-4xl' : 'text-3xl'} drop-shadow-lg filter`} style={{ filter: `drop-shadow(0 0 8px ${primaryColor})` }}>
            {agent.sprite}
          </span>
        </div>
      </div>

      {/* Name */}
      <div className="absolute bottom-12 left-0 right-0 text-center px-2">
        <h3
          className="font-bold text-white text-sm tracking-wide uppercase"
          style={{
            fontFamily: 'Orbitron, sans-serif',
            textShadow: `0 0 8px ${primaryColor}, 0 2px 4px rgba(0,0,0,0.8)`,
          }}
        >
          {agent.name}
        </h3>
      </div>

      {/* Stage badges */}
      <div className="absolute bottom-7 left-0 right-0 flex justify-center gap-1 px-2">
        <span
          className="text-[9px] font-bold px-2 py-0.5 rounded-sm"
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            backgroundColor: `${primaryColor}22`,
            color: primaryColor,
            border: `1px solid ${primaryColor}66`,
            textShadow: `0 0 6px ${primaryColor}`,
          }}
        >
          {agent.stage}
        </span>
        {agent.trainingStage && (
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-sm"
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              backgroundColor: `${secondaryColor}22`,
              color: secondaryColor,
              border: `1px solid ${secondaryColor}66`,
              textShadow: `0 0 6px ${secondaryColor}`,
            }}
          >
            {agent.trainingStage}
          </span>
        )}
      </div>

      {/* Stats row at bottom */}
      <div className="absolute bottom-2 left-4 right-4 flex justify-between items-center">
        <div className="text-[9px] text-gray-400 font-mono" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          {agent.runs.current}/{agent.runs.total}
        </div>
        <div className="flex gap-1">
          {Array.from({ length: agent.maxEnergy }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="w-1.5 h-2.5 rounded-sm"
              style={{
                backgroundColor: i < agent.energy ? primaryColor : '#2a3545',
                boxShadow: i < agent.energy ? `0 0 6px ${primaryColor}` : 'none',
              }}
            />
          ))}
        </div>
      </div>

      {/* HP bar - segmented style */}
      <div className="absolute bottom-0 left-3 right-3 h-2 bg-black/70 overflow-hidden">
        <div className="flex w-full h-full">
          {Array.from({ length: 10 }).map((_, i) => {
            const hpThreshold = (i + 1) * 10;
            const shouldFill = agent.hp >= hpThreshold;
            const barColor = agent.hp > 60 ? '#22c55e' : agent.hp > 30 ? '#f59e0b' : '#ef4444';

            return (
              <div
                key={i}
                className={`flex-1 border-r border-black/50`}
                style={{
                  transform: 'skewX(-20deg)',
                  transformOrigin: 'bottom',
                  backgroundColor: shouldFill ? barColor : '#1a1a2e',
                  boxShadow: shouldFill ? `0 0 4px ${barColor}` : 'none',
                }}
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

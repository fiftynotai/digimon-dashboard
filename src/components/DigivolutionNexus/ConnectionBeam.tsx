import { motion } from 'framer-motion';
import type { DigimonAgent } from '../../types/dashboard';

interface ConnectionBeamProps {
  from: DigimonAgent;
  to: DigimonAgent;
}

export const ConnectionBeam = ({ from, to }: ConnectionBeamProps) => {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <defs>
        <linearGradient id={`beam-${from.id}-${to.id}`}>
          <stop offset="0%" stopColor={getColorHex(from.color)} stopOpacity="0.8" />
          <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor={getColorHex(to.color)} stopOpacity="0.8" />
        </linearGradient>
        <filter id={`glow-${from.id}-${to.id}`}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main beam line */}
      <motion.line
        x1={`${from.position.x}%`}
        y1={`${from.position.y}%`}
        x2={`${to.position.x}%`}
        y2={`${to.position.y}%`}
        stroke={`url(#beam-${from.id}-${to.id})`}
        strokeWidth="3"
        strokeDasharray="0,0"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: 1,
          opacity: 0.6,
        }}
        transition={{
          pathLength: { duration: 1.2, ease: 'easeInOut' },
          opacity: { duration: 0.5 },
        }}
        filter={`url(#glow-${from.id}-${to.id})`}
      />

      {/* Animated dashes overlay */}
      <motion.line
        x1={`${from.position.x}%`}
        y1={`${from.position.y}%`}
        x2={`${to.position.x}%`}
        y2={`${to.position.y}%`}
        stroke="#ffffff"
        strokeWidth="2"
        strokeDasharray="8,12"
        initial={{ pathLength: 0 }}
        animate={{
          pathLength: 1,
          strokeDashoffset: [0, -200],
        }}
        transition={{
          pathLength: { duration: 1.2 },
          strokeDashoffset: {
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
        opacity="0.8"
      />

      {/* Traveling particle */}
      <motion.circle
        r="4"
        fill="#00d4ff"
        style={{ filter: 'drop-shadow(0 0 6px #00d4ff)' }}
        initial={{ opacity: 0 }}
        animate={{
          cx: [`${from.position.x}%`, `${to.position.x}%`],
          cy: [`${from.position.y}%`, `${to.position.y}%`],
          opacity: [0, 1, 1, 0],
          scale: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: Math.random() * 2,
        }}
      />
    </svg>
  );
};

const getColorHex = (color: string): string => {
  const colorMap: Record<string, string> = {
    red: '#ef4444',
    blue: '#06b6d4',
    gold: '#f59e0b',
    cyan: '#2dd4bf',
  };
  return colorMap[color] || '#00d4ff';
};

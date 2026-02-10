import { motion } from 'framer-motion';
import type { DigimonAgent } from '../../types/dashboard';

interface ConnectionBeamProps {
  from: DigimonAgent;
  to: DigimonAgent;
}

const getColorHex = (color: string): string => {
  const colorMap: Record<string, string> = {
    red: '#FF3366',
    blue: '#00D4FF',
    gold: '#F5A623',
    cyan: '#00D4FF',
  };
  return colorMap[color] || '#00D4FF';
};

export const ConnectionBeam = ({ from, to }: ConnectionBeamProps) => {
  const fromColor = getColorHex(from.color);
  const toColor = getColorHex(to.color);

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <defs>
        <linearGradient id={`beam-${from.id}-${to.id}`}>
          <stop offset="0%" stopColor={fromColor} stopOpacity="0.9" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="100%" stopColor={toColor} stopOpacity="0.9" />
        </linearGradient>
        <filter id={`glow-${from.id}-${to.id}`}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main beam line - solid, not dashed */}
      <motion.line
        x1={`${from.position.x}%`}
        y1={`${from.position.y}%`}
        x2={`${to.position.x}%`}
        y2={`${to.position.y}%`}
        stroke={`url(#beam-${from.id}-${to.id})`}
        strokeWidth="3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        filter={`url(#glow-${from.id}-${to.id})`}
        strokeLinecap="round"
      />

      {/* Animated pulse node at midpoint */}
      <motion.circle
        r="5"
        fill="#FFFFFF"
        style={{
          filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8))',
        }}
        cx="50%"
        cy={`${(from.position.y + to.position.y) / 2}%`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Traveling particle */}
      <motion.circle
        r="3"
        fill="#00D4FF"
        style={{ filter: 'drop-shadow(0 0 6px #00D4FF)' }}
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

      {/* Secondary particles for energy effect */}
      {[0, 1].map((i) => (
        <motion.circle
          key={i}
          r="2"
          fill={toColor}
          style={{ filter: `drop-shadow(0 0 4px ${toColor}80)` }}
          animate={{
            cx: [`${from.position.x}%`, `${to.position.x}%`],
            cy: [`${from.position.y}%`, `${to.position.y}%`],
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 1.5,
          }}
        />
      ))}
    </svg>
  );
};

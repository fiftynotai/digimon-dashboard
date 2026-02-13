import { motion } from 'framer-motion';
import type { DigimonAgent } from '../../types/dashboard';

interface ConnectionBeamProps {
  from: DigimonAgent;
  to: DigimonAgent;
}

const getColorHex = (color: string): string => {
  const colorMap: Record<string, string> = {
    red: '#ff003c',
    blue: '#00f0ff',
    gold: '#ffaa00',
    cyan: '#00f0ff',
  };
  return colorMap[color] || '#00f0ff';
};

export const ConnectionBeam = ({ from, to }: ConnectionBeamProps) => {
  const fromColor = getColorHex(from.color);
  const toColor = getColorHex(to.color);

  // Calculate midpoint
  const midX = (from.position.x + to.position.x) / 2;
  const midY = (from.position.y + to.position.y) / 2;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <defs>
        {/* Main gradient for the connection line */}
        <linearGradient id={`beam-${from.id}-${to.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={fromColor} stopOpacity="1" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="100%" stopColor={toColor} stopOpacity="1" />
        </linearGradient>

        {/* Glow filter */}
        <filter id={`glow-${from.id}-${to.id}`}>
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Circuit board pattern */}
        <pattern
          id={`circuit-${from.id}-${to.id}`}
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 10 0 L 10 20 M 0 10 L 20 10"
            stroke={`${fromColor}33`}
            strokeWidth="0.5"
            fill="none"
          />
        </pattern>
      </defs>

      {/* Circuit board background line */}
      <motion.line
        x1={`${from.position.x}%`}
        y1={`${from.position.y}%`}
        x2={`${to.position.x}%`}
        y2={`${to.position.y}%`}
        stroke={`${fromColor}44`}
        strokeWidth="6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5 }}
      />

      {/* Main beam line */}
      <motion.line
        x1={`${from.position.x}%`}
        y1={`${from.position.y}%`}
        x2={`${to.position.x}%`}
        y2={`${to.position.y}%`}
        stroke={`url(#beam-${from.id}-${to.id})`}
        strokeWidth="2.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        filter={`url(#glow-${from.id}-${to.id})`}
        strokeLinecap="round"
      />

      {/* Secondary glow line */}
      <motion.line
        x1={`${from.position.x}%`}
        y1={`${from.position.y}%`}
        x2={`${to.position.x}%`}
        y2={`${to.position.y}%`}
        stroke={fromColor}
        strokeWidth="4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        filter={`url(#glow-${from.id}-${to.id})`}
        strokeLinecap="round"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Circuit node at midpoint */}
      <g style={{ transform: `translate(${midX}%, ${midY}%)` }}>
        <motion.circle
          r="8"
          fill="#050a14"
          stroke={fromColor}
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ filter: `drop-shadow(0 0 8px ${fromColor})` }}
        />
        <motion.circle
          r="4"
          fill={fromColor}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ filter: `drop-shadow(0 0 12px ${fromColor})` }}
        />
      </g>

      {/* Animated pulse traveling along the beam */}
      <motion.circle
        r="4"
        fill="#FFFFFF"
        style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.9))' }}
        initial={{ opacity: 0 }}
        animate={{
          cx: [`${from.position.x}%`, `${to.position.x}%`],
          cy: [`${from.position.y}%`, `${to.position.y}%`],
          opacity: [0, 1, 1, 0],
          scale: [0.5, 1.2, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: Math.random() * 2,
        }}
      />

      {/* Multiple smaller energy particles */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          r="2"
          fill={toColor}
          style={{ filter: `drop-shadow(0 0 6px ${toColor})` }}
          animate={{
            cx: [`${from.position.x}%`, `${to.position.x}%`],
            cy: [`${from.position.y}%`, `${to.position.y}%`],
            opacity: [0, 0.8, 0.6, 0],
            scale: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2.5 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.8,
          }}
        />
      ))}

      {/* Circuit decorations along the path */}
      {(() => {
        const segments = 4;
        return Array.from({ length: segments }).map((_, i) => {
          return (
            <motion.rect
              key={i}
              width="6"
              height="2"
              fill={fromColor}
              style={{
                filter: `drop-shadow(0 0 4px ${fromColor})`,
                transformBox: 'fill-box',
                transformOrigin: 'center',
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          );
        });
      })()}
    </svg>
  );
};

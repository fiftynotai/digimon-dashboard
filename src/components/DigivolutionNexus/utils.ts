import type { AgentColor } from '../../types/dashboard';

export const getAgentColorClass = (color: AgentColor): string => {
  const colorMap: Record<AgentColor, string> = {
    red: 'border-neon-red text-neon-red',
    blue: 'border-neon-blue text-neon-blue',
    gold: 'border-neon-gold text-neon-gold',
    cyan: 'border-neon-cyan text-neon-cyan',
  };
  return colorMap[color];
};

export const getAgentGlowClass = (color: AgentColor): string => {
  const glowMap: Record<AgentColor, string> = {
    red: 'shadow-glow-red',
    blue: 'shadow-glow-blue',
    gold: 'shadow-glow-gold',
    cyan: 'shadow-glow-cyan',
  };
  return glowMap[color];
};

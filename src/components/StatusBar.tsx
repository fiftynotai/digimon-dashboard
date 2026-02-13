import { motion } from 'framer-motion';
import { useDashboardStore } from '../stores/dashboardStore';
import { Heart, Database } from 'lucide-react';

export const StatusBar = () => {
  const { hpCritical, dataLoad } = useDashboardStore();

  const createSegmentedBar = (value: number, color: string, glowColor: string) => {
    const segments = 20;
    const filledSegments = Math.round((value / 100) * segments);

    return (
      <div className="relative w-full h-5 bg-[#0a0a14] overflow-hidden" style={{ clipPath: 'polygon(0 0, 100% 0, 98% 100%, 2% 100%)' }}>
        {/* Background segments */}
        <div className="flex w-full h-full">
          {Array.from({ length: segments }).map((_, i) => (
            <div
              key={`bg-${i}`}
              className="flex-1 border-r border-black/60"
              style={{
                transform: 'skewX(-15deg)',
                transformOrigin: 'bottom',
                backgroundColor: '#1a1a2e',
              }}
            />
          ))}
        </div>

        {/* Filled segments */}
        <div className="absolute top-0 left-0 w-full h-full flex">
          {Array.from({ length: segments }).map((_, i) => {
            const isFilled = i < filledSegments;
            return (
              <motion.div
                key={`filled-${i}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="flex-1 border-r border-black/60"
                style={{
                  transform: 'skewX(-15deg)',
                  transformOrigin: 'bottom',
                  backgroundColor: isFilled ? color : 'transparent',
                  boxShadow: isFilled ? `0 0 8px ${glowColor}` : 'none',
                }}
              />
            );
          })}
        </div>

        {/* Value text overlay */}
        <span
          className="absolute inset-0 flex items-center justify-center text-sm font-bold"
          style={{
            fontFamily: 'Orbitron, sans-serif',
            color: '#ffffff',
            textShadow: `0 0 10px ${glowColor}, 0 2px 4px rgba(0,0,0,0.8)`,
            letterSpacing: '1px',
          }}
        >
          {value.toFixed(1)}%
        </span>
      </div>
    );
  };

  return (
    <div className="flex gap-6 p-4 bg-[#050a14]/90" style={{ border: '1px solid #00f0ff44', boxShadow: 'inset 0 0 30px rgba(0, 240, 255, 0.05)' }}>
      {/* HP Critical Bar */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <div className="relative">
            <Heart className="w-4 h-4" style={{ color: '#ff003c' }} />
            <div className="absolute inset-0" style={{ filter: 'blur(2px)', color: '#ff003c' }} />
          </div>
          <span
            className="text-xs font-bold tracking-wider uppercase"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              color: '#ff003c',
              textShadow: '0 0 8px #ff003c',
            }}
          >
            HP Critical
          </span>
        </div>
        {createSegmentedBar(hpCritical, '#ef4444', '#ff003c')}
      </div>

      {/* Data Load Bar */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <div className="relative">
            <Database className="w-4 h-4" style={{ color: '#00f0ff' }} />
            <div className="absolute inset-0" style={{ filter: 'blur(2px)', color: '#00f0ff' }} />
          </div>
          <span
            className="text-xs font-bold tracking-wider uppercase"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              color: '#00f0ff',
              textShadow: '0 0 8px #00f0ff',
            }}
          >
            Data Load
          </span>
        </div>
        {createSegmentedBar(dataLoad, '#06b6d4', '#00f0ff')}
      </div>
    </div>
  );
};

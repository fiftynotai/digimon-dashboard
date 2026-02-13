import { motion } from 'framer-motion';
import { useDashboardStore } from '../../stores/dashboardStore';
import { Swords } from 'lucide-react';
import { useEffect, useRef } from 'react';

export const BattleLog = () => {
  const { battleLog } = useDashboardStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [battleLog]);

  return (
    <div
      className="border rounded-lg p-4 flex flex-col"
      style={{
        background: 'linear-gradient(135deg, #0a0a14 0%, #050a14 100%)',
        borderColor: '#ff003c44',
        boxShadow: 'inset 0 0 20px rgba(255, 0, 60, 0.05)',
        height: '280px',
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <Swords className="w-5 h-5" style={{ color: '#ff003c' }} />
          <div className="absolute inset-0" style={{ filter: 'blur(3px)', color: '#ff003c' }} />
        </div>
        <h3
          className="font-bold text-sm tracking-wider uppercase"
          style={{
            fontFamily: 'Orbitron, sans-serif',
            color: '#ff003c',
            textShadow: '0 0 8px #ff003c',
          }}
        >
          Battle Log
        </h3>
      </div>

      {/* Terminal-style log area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto pr-2 space-y-2"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#00f0ff44 #0a0a14',
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid #00f0ff22',
          borderRadius: '4px',
          padding: '12px',
        }}
      >
        {battleLog.map((entry, index) => (
          <motion.div
            key={index}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="font-mono"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '12px',
              lineHeight: '1.7',
            }}
          >
            {/* Timestamp */}
            <span
              className="mr-2"
              style={{
                color: '#00f0ff',
                textShadow: '0 0 4px rgba(0, 240, 255, 0.5)',
                opacity: '0.8',
              }}
            >
              [{entry.timestamp}]
            </span>
            {/* Agent name */}
            <span
              className="mr-2 font-bold"
              style={{
                color: '#ffaa00',
                textShadow: '0 0 6px rgba(255, 170, 0, 0.6)',
              }}
            >
              {entry.agentName}
            </span>
            {/* Action */}
            <span
              style={{
                color: '#d1d5db',
                opacity: '0.9',
              }}
            >
              {entry.action}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Terminal status indicator */}
      <div className="mt-3 flex items-center gap-2">
        <div
          className="w-2 h-2 rounded-full animate-pulse"
          style={{
            backgroundColor: '#00f0ff',
            boxShadow: '0 0 8px #00f0ff',
          }}
        />
        <span
          className="text-xs font-mono"
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            color: '#00f0ff',
            opacity: '0.7',
          }}
        >
          LIVE FEED ACTIVE
        </span>
      </div>
    </div>
  );
};

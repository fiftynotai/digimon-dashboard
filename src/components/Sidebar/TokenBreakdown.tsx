import { motion } from 'framer-motion';
import { useDashboardStore } from '../../stores/dashboardStore';
import { Layers } from 'lucide-react';

export const TokenBreakdown = () => {
  const { tokens } = useDashboardStore();

  const createSegmentedProgressBar = (value: number, color: string) => {
    const segments = 15;
    const filledSegments = Math.round((value / 100) * segments);

    return (
      <div className="relative w-full h-2 bg-[#1a1a2e] overflow-hidden">
        <div className="flex w-full h-full">
          {Array.from({ length: segments }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: i < filledSegments ? 1 : 0 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="flex-1 border-r border-black/50"
              style={{
                transform: 'skewX(-20deg)',
                transformOrigin: 'bottom',
                backgroundColor: i < filledSegments ? color : 'transparent',
                boxShadow: i < filledSegments ? `0 0 6px ${color}` : 'none',
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className="border rounded-lg p-5"
      style={{
        background: 'linear-gradient(135deg, #0a0a14 0%, #050a14 100%)',
        borderColor: '#00f0ff44',
        boxShadow: 'inset 0 0 20px rgba(0, 240, 255, 0.05)',
      }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="relative">
          <Layers className="w-5 h-5" style={{ color: '#00f0ff' }} />
          <div className="absolute inset-0" style={{ filter: 'blur(3px)', color: '#00f0ff' }} />
        </div>
        <h3
          className="font-bold text-sm tracking-wider uppercase"
          style={{
            fontFamily: 'Orbitron, sans-serif',
            color: '#00f0ff',
            textShadow: '0 0 8px #00f0ff',
          }}
        >
          Token Breakdown
        </h3>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-14 h-14 rounded-lg flex items-center justify-center relative"
          style={{
            background: `linear-gradient(135deg, #00f0ff22, #00f0ff11)`,
            border: '1px solid #00f0ff66',
            boxShadow: '0 0 15px rgba(0, 240, 255, 0.3), inset 0 0 10px rgba(0, 240, 255, 0.1)',
          }}
        >
          <span className="text-3xl">💠</span>
        </div>
        <div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="text-3xl font-bold"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              color: '#ffffff',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
            }}
          >
            {tokens.total.toLocaleString()}
          </motion.div>
          <div
            className="text-xs mt-0.5 uppercase tracking-widest"
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              color: '#6b7280',
              textShadow: '0 0 4px rgba(107, 114, 128, 0.3)',
            }}
          >
            Total Tokens
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {tokens.breakdown.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {/* Crystal/diamond icon */}
                <div
                  className="w-3 h-3 rotate-45 relative"
                  style={{
                    backgroundColor: item.color,
                    boxShadow: `0 0 10px ${item.color}, 0 0 20px ${item.color}66`,
                  }}
                />
                <span
                  className="text-xs uppercase tracking-wide"
                  style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    color: '#9ca3af',
                  }}
                >
                  {item.label}
                </span>
              </div>
              <span
                className="text-sm font-bold"
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  color: '#ffffff',
                  textShadow: `0 0 8px ${item.color}88`,
                }}
              >
                {item.percent}%
              </span>
            </div>
            {createSegmentedProgressBar(item.percent, item.color)}
          </div>
        ))}
      </div>
    </div>
  );
};

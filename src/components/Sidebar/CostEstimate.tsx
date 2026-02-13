import { motion } from 'framer-motion';
import { useDashboardStore } from '../../stores/dashboardStore';
import { DollarSign } from 'lucide-react';

export const CostEstimate = () => {
  const { costEstimate } = useDashboardStore();

  const createSegmentedProgressBar = (value: number, color: string) => {
    const segments = 12;
    const filledSegments = Math.round((value / 100) * segments);

    return (
      <div className="relative w-full h-2 bg-[#1a1a2e] overflow-hidden">
        <div className="flex w-full h-full">
          {Array.from({ length: segments }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: i < filledSegments ? 1 : 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
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
        borderColor: '#00ff7f44',
        boxShadow: 'inset 0 0 20px rgba(0, 255, 127, 0.05)',
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <DollarSign className="w-5 h-5" style={{ color: '#00ff7f' }} />
          <div className="absolute inset-0" style={{ filter: 'blur(3px)', color: '#00ff7f' }} />
        </div>
        <h3
          className="font-bold text-sm tracking-wider uppercase"
          style={{
            fontFamily: 'Orbitron, sans-serif',
            color: '#00ff7f',
            textShadow: '0 0 8px #00ff7f',
          }}
        >
          Cost Estimate
        </h3>
      </div>

      <div className="mb-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="text-2xl font-bold"
          style={{
            fontFamily: 'Orbitron, sans-serif',
            color: '#ffffff',
            textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
          }}
        >
          ${costEstimate.total.toFixed(2)}
        </motion.div>
        <div
          className="text-xs mt-0.5 uppercase tracking-widest"
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            color: '#6b7280',
            textShadow: '0 0 4px rgba(107, 114, 128, 0.3)',
          }}
        >
          Estimated Total
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {/* Crystal icon */}
            <div
              className="w-3 h-3 rotate-45"
              style={{
                backgroundColor: '#00ced1',
                boxShadow: '0 0 10px #00ced1, 0 0 20px #00ced166',
              }}
            />
            <span
              className="text-xs uppercase tracking-wide"
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                color: '#9ca3af',
              }}
            >
              Budget
            </span>
          </div>
          <span
            className="text-sm font-bold"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              color: '#ffffff',
              textShadow: '0 0 8px #00ff7f88',
            }}
          >
            {costEstimate.percent}%
          </span>
        </div>
        {createSegmentedProgressBar(costEstimate.percent, '#00ff7f')}
      </div>
    </div>
  );
};

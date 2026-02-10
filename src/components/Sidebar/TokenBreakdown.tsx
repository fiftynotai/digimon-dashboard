import { motion } from 'framer-motion';
import { useDashboardStore } from '../../stores/dashboardStore';
import { Database } from 'lucide-react';

export const TokenBreakdown = () => {
  const { tokens } = useDashboardStore();

  const formatLargeNumber = (num: number): string => {
    if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(1)}M`;
    }
    if (num >= 1_000) {
      return `${(num / 1_000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="bg-gradient-to-br from-[#0a1628] to-[#0f1f3a] border-2 border-amber-500/40 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Database className="w-4 h-4 text-amber-500" />
        <h3 className="font-bold text-sm tracking-wider text-amber-400">TOTAL TOKENS</h3>
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="mb-4"
      >
        <span className="text-4xl font-bold text-white" style={{ textShadow: '0 0 20px rgba(245, 158, 11, 0.5)' }}>
          {formatLargeNumber(tokens.total)}
        </span>
      </motion.div>

      <div className="space-y-3">
        {tokens.breakdown.map((item, index) => (
          <div key={item.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400 font-mono">{item.label}</span>
              <span className="text-white font-mono font-bold">{item.percent}%</span>
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${item.percent}%` }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="h-3 bg-[#0a1628] rounded-full overflow-hidden border border-white/10"
            >
              <div
                className="h-full"
                style={{
                  backgroundColor: item.color,
                  boxShadow: `0 0 12px ${item.color}66`,
                }}
              />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

import { motion } from 'framer-motion';
import { useDashboardStore } from '../../stores/dashboardStore';
import { Layers } from 'lucide-react';

export const TokenBreakdown = () => {
  const { tokens } = useDashboardStore();

  return (
    <div className="bg-[#0a0a14] border border-[#1a3a5c] rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Layers className="w-4 h-4 text-[#00D4FF]" />
        <h3 className="font-bold text-sm tracking-wider text-[#00D4FF]">TOKEN BREAKDOWN</h3>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D4FF]/20 to-[#00D4FF]/10 flex items-center justify-center">
          <span className="text-lg">💠</span>
        </div>
        <div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="text-2xl font-bold text-white"
          >
            {tokens.total.toLocaleString()}
          </motion.div>
          <div className="text-xs text-gray-400">Tokens</div>
        </div>
      </div>

      <div className="space-y-3">
        {tokens.breakdown.map((item, index) => (
          <div key={item.label}>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-gray-400 flex items-center gap-2">
                <span
                  className="w-2 h-2 rotate-45"
                  style={{
                    backgroundColor: item.color,
                    boxShadow: `0 0 8px ${item.color}80`,
                  }}
                />
                {item.label}
              </span>
              <span className="text-white font-bold">{item.percent}%</span>
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${item.percent}%` }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="h-2.5 bg-[#1a1a2e] rounded-full overflow-hidden"
            >
              <div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${item.color}, ${item.color}CC)`,
                  boxShadow: `0 0 10px ${item.color}60`,
                }}
              />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

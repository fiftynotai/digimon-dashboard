import { motion } from 'framer-motion';
import { useDashboardStore } from '../../stores/dashboardStore';
import { DollarSign } from 'lucide-react';

export const CostEstimate = () => {
  const { costEstimate } = useDashboardStore();

  return (
    <div className="bg-gradient-to-br from-[#0a1628] to-[#0f1f3a] border-2 border-teal-500/40 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <DollarSign className="w-4 h-4 text-teal-400" />
        <h3 className="font-bold text-sm tracking-wider text-teal-400">COST</h3>
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="mb-2"
      >
        <span className="text-3xl font-bold text-white" style={{ textShadow: '0 0 20px rgba(45, 212, 191, 0.5)' }}>
          ${costEstimate.total.toFixed(2)}
        </span>
      </motion.div>

      <div className="text-xs text-gray-400 font-mono mb-3">
        Estimated Total
      </div>

      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-400 font-mono">Budget Used</span>
          <span className="text-white font-mono font-bold">{costEstimate.percent}%</span>
        </div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${costEstimate.percent}%` }}
          transition={{ duration: 0.8 }}
          className="h-3 bg-[#0a1628] rounded-full overflow-hidden border border-white/10"
        >
          <div
            className="h-full bg-gradient-to-r from-teal-600 to-teal-400"
            style={{ boxShadow: '0 0 12px rgba(45, 212, 191, 0.6)' }}
          />
        </motion.div>
      </div>
    </div>
  );
};

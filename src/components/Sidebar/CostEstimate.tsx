import { motion } from 'framer-motion';
import { useDashboardStore } from '../../stores/dashboardStore';
import { DollarSign } from 'lucide-react';

export const CostEstimate = () => {
  const { costEstimate } = useDashboardStore();

  return (
    <div className="bg-[#0a0a14] border border-[#1a3a5c] rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="w-4 h-4 text-[#00D4FF]" />
        <h3 className="font-bold text-sm tracking-wider text-[#00D4FF]">COST ESTIMATE</h3>
      </div>

      <div className="mb-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="text-2xl font-bold text-white"
        >
          ${costEstimate.total.toFixed(2)}
        </motion.div>
        <div className="text-xs text-gray-400">Estimated Total</div>
      </div>

      <div>
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-gray-400 flex items-center gap-2">
            <span
              className="w-2 h-2 rotate-45"
              style={{
                backgroundColor: '#00CED1',
                boxShadow: '0 0 8px rgba(0,206,209,0.5)',
              }}
            />
            Budget
          </span>
          <span className="text-white font-bold">{costEstimate.percent}%</span>
        </div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${costEstimate.percent}%` }}
          transition={{ duration: 0.8 }}
          className="h-3.5 bg-[#1a1a2e] rounded-full overflow-hidden"
        >
          <div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #00CED1, #00FF7F)',
              boxShadow: '0 0 10px rgba(0,206,209,0.5)',
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

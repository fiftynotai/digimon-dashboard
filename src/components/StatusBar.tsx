import { motion } from 'framer-motion';
import { useDashboardStore } from '../stores/dashboardStore';
import { Heart, Database } from 'lucide-react';

export const StatusBar = () => {
  const { hpCritical, dataLoad } = useDashboardStore();

  return (
    <div className="flex gap-6 p-4 border-b border-[#00D4FF]/30 bg-[#0a0f1e]">
      {/* HP Critical Bar */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-4 h-4 text-[#FF3366]" />
          <span className="text-xs font-bold tracking-wider text-[#FF3366]">HP CRITICAL</span>
        </div>
        <div className="relative h-3.5 bg-[#1a1a2e] rounded-lg overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${hpCritical}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full"
            style={{
              background: 'linear-gradient(90deg, #DC2626, #EF4444, #F87171)',
              boxShadow: '0 0 15px rgba(239,68,68,0.4)',
            }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-white drop-shadow-md">
            {hpCritical.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Data Load Bar */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Database className="w-4 h-4 text-[#00D4FF]" />
          <span className="text-xs font-bold tracking-wider text-[#00D4FF]">DATA LOAD</span>
        </div>
        <div className="relative h-3.5 bg-[#1a1a2e] rounded-lg overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${dataLoad}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full"
            style={{
              background: 'linear-gradient(90deg, #0284C7, #0369A1, #06B6D4)',
              boxShadow: '0 0 15px rgba(6,182,212,0.4)',
            }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-white drop-shadow-md">
            {dataLoad.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
};

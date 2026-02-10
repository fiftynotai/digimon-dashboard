import { motion } from 'framer-motion';
import { useDashboardStore } from '../stores/dashboardStore';
import { Heart, Database } from 'lucide-react';

export const StatusBar = () => {
  const { hpCritical, dataLoad } = useDashboardStore();

  return (
    <div className="flex gap-6 p-4 border-b-2 border-cyan-500/30 bg-gradient-to-b from-[#0a1628] to-[#0f1f3a]">
      {/* HP Critical Bar */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-4 h-4 text-red-500" />
          <span className="text-xs font-bold tracking-wider text-red-400">HP CRITICAL</span>
        </div>
        <div className="relative h-4 bg-[#0a1628] rounded-lg overflow-hidden border border-red-500/30">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${hpCritical}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-red-600 via-red-500 to-red-400"
            style={{
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)',
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
          <Database className="w-4 h-4 text-cyan-500" />
          <span className="text-xs font-bold tracking-wider text-cyan-400">DATA LOAD</span>
        </div>
        <div className="relative h-4 bg-[#0a1628] rounded-lg overflow-hidden border border-cyan-500/30">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${dataLoad}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-cyan-600 via-cyan-500 to-teal-400"
            style={{
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.6)',
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

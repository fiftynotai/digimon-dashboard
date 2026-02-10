import { motion } from 'framer-motion';
import { useDashboardStore } from '../../stores/dashboardStore';
import { Swords } from 'lucide-react';
import { useEffect, useRef } from 'react';

export const BattleLog = () => {
  const { battleLog } = useDashboardStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new entries are added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [battleLog]);

  return (
    <div className="bg-gradient-to-br from-[#0a1628] to-[#0f1f3a] border-2 border-red-500/40 rounded-xl p-4 flex flex-col h-72">
      <div className="flex items-center gap-2 mb-3">
        <Swords className="w-4 h-4 text-red-500" />
        <h3 className="font-bold text-sm tracking-wider text-red-400">BATTLE LOG</h3>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-2 pr-2 font-mono text-xs"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#06b6d4 #0a1628',
        }}
      >
        {battleLog.map((entry, index) => (
          <motion.div
            key={index}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex gap-2 text-gray-300"
          >
            <span className="text-gray-500 shrink-0">[{entry.timestamp}]</span>
            <span className="text-amber-400 font-bold shrink-0">{entry.agentName}</span>
            <span className="text-gray-300">{entry.action}</span>
          </motion.div>
        ))}
      </div>

      {/* Fade-out gradient at top */}
      <div className="absolute top-[76px] left-4 right-4 h-8 pointer-events-none bg-gradient-to-b from-[#0f1f3a] via-transparent to-transparent rounded-t-lg" />
    </div>
  );
};

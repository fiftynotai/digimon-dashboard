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
    <div className="bg-[#0a0a14] border border-[#1a3a5c] rounded-lg p-3 flex flex-col h-64">
      <div className="flex items-center gap-2 mb-3">
        <Swords className="w-4 h-4 text-[#FF3366]" />
        <h3 className="font-bold text-sm tracking-wider text-[#FF3366]">BATTLE LOG</h3>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-2 pr-2"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#1a3a5c #0a0a14',
          fontSize: '12px',
          lineHeight: '1.6',
        }}
      >
        {battleLog.map((entry, index) => (
          <motion.div
            key={index}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="text-[#CCCCCC]"
          >
            <span className="text-[#888888] mr-2">[{entry.timestamp}]</span>
            <span className="text-[#FFA500] font-bold mr-2">{entry.agentName}</span>
            <span className="text-[#E0E0E0]">{entry.action}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

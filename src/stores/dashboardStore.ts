import { create } from 'zustand';
import type { DashboardState, BattleLogEntry } from '../types/dashboard';

interface DashboardStore extends DashboardState {
  setHpCritical: (value: number) => void;
  setDataLoad: (value: number) => void;
  addBattleLogEntry: (entry: BattleLogEntry) => void;
  updateAgentEnergy: (agentId: string, energy: number) => void;
  updateAgentHp: (agentId: string, hp: number) => void;
  incrementAgentRun: (agentId: string) => void;
}

// Updated mock data with proper positioning and colors from image analysis
const mockAgents = [
  {
    id: '1',
    name: 'IGRIS',
    stage: 'ROOKIE' as const,
    trainingStage: 'IN-TRAINING' as const,
    sprite: '🔥',
    runs: { current: 3, total: 18 },
    energy: 3,
    maxEnergy: 5,
    hp: 92,
    color: 'blue' as const, // Cyan/teal for Rookie
    position: { x: 20, y: 30 },
    connections: ['2'],
  },
  {
    id: '2',
    name: 'METALGREYMON',
    stage: 'CHAMPION' as const,
    sprite: '⚡',
    runs: { current: 7, total: 12 },
    energy: 4,
    maxEnergy: 5,
    hp: 100,
    color: 'red' as const, // Red/crimson for central/active
    position: { x: 50, y: 50 }, // Central position
    connections: ['1', '3', '4'],
  },
  {
    id: '3',
    name: 'GABUMON',
    stage: 'ROOKIE' as const,
    sprite: '❄️',
    runs: { current: 5, total: 20 },
    energy: 2,
    maxEnergy: 5,
    hp: 78,
    color: 'blue' as const, // Cyan/teal for Rookie
    position: { x: 80, y: 30 },
    connections: ['2'],
  },
  {
    id: '4',
    name: 'OMEGAMON',
    stage: 'MEGA' as const,
    sprite: '🛡️',
    runs: { current: 2, total: 8 },
    energy: 5,
    maxEnergy: 5,
    hp: 100,
    color: 'red' as const, // Red/crimson for Mega
    position: { x: 50, y: 80 },
    connections: ['2'],
  },
];

const mockBattleLog: BattleLogEntry[] = [
  { timestamp: '10:14:32', agentName: 'IGRIS', action: 'deployed to server.' },
  { timestamp: '10:14:35', agentName: 'GABUMON', action: 'initiated scan sequence.' },
  { timestamp: '10:14:38', agentName: 'METALGREYMON', action: 'executed query batch.' },
  { timestamp: '10:14:42', agentName: 'OMEGAMON', action: 'deployed to server.' },
  { timestamp: '10:14:45', agentName: 'IGRIS', action: 'training cycle complete.' },
  { timestamp: '10:14:48', agentName: 'METALGREYMON', action: 'digivolution ready.' },
  { timestamp: '10:14:52', agentName: 'GABUMON', action: 'energy recharged.' },
];

export const useDashboardStore = create<DashboardStore>((set) => ({
  agents: mockAgents,
  hpCritical: 98.2,
  dataLoad: 45.7,
  tokens: {
    total: 185200000,
    breakdown: [
      { label: 'Input', percent: 35, color: '#FF3366' },
      { label: 'Output', percent: 45, color: '#F5A623' },
      { label: 'System', percent: 20, color: '#00D4FF' },
    ],
  },
  costEstimate: {
    total: 56.89,
    percent: 30,
  },
  battleLog: mockBattleLog,

  setHpCritical: (value) => set({ hpCritical: value }),
  setDataLoad: (value) => set({ dataLoad: value }),

  addBattleLogEntry: (entry) =>
    set((state) => ({
      battleLog: [...state.battleLog, entry],
    })),

  updateAgentEnergy: (agentId, energy) =>
    set((state) => ({
      agents: state.agents.map((agent) =>
        agent.id === agentId ? { ...agent, energy } : agent
      ),
    })),

  updateAgentHp: (agentId, hp) =>
    set((state) => ({
      agents: state.agents.map((agent) =>
        agent.id === agentId ? { ...agent, hp } : agent
      ),
    })),

  incrementAgentRun: (agentId) =>
    set((state) => ({
      agents: state.agents.map((agent) =>
        agent.id === agentId
          ? { ...agent, runs: { ...agent.runs, current: agent.runs.current + 1 } }
          : agent
      ),
    })),
}));

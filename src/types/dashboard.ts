export type DigiStage = 'ROOKIE' | 'CHAMPION' | 'ULTIMATE' | 'MEGA' | 'IN-TRAINING';

export type AgentColor = 'red' | 'blue' | 'gold' | 'cyan';

export interface DigimonAgent {
  id: string;
  name: string;
  stage: DigiStage;
  trainingStage?: DigiStage;
  sprite: string;
  runs: {
    current: number;
    total: number;
  };
  energy: number;
  maxEnergy: number;
  hp: number; // 0-100
  color: AgentColor;
  position: {
    x: number;
    y: number;
  };
  connections: string[];
}

export interface DashboardState {
  agents: DigimonAgent[];
  hpCritical: number; // 0-100
  dataLoad: number; // 0-100
  tokens: {
    total: number;
    breakdown: {
      label: string;
      percent: number;
      color: string;
    }[];
  };
  costEstimate: {
    total: number;
    percent: number;
  };
  battleLog: BattleLogEntry[];
}

export interface BattleLogEntry {
  timestamp: string;
  agentName: string;
  action: string;
}

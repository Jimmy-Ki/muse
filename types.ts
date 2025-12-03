export type ViewState = 'dashboard' | 'chat' | 'portfolio' | 'intelligence';

export interface PortfolioItem {
  symbol: string;
  name: string;
  sector: string;
  quantity: number;
  value: number; // Price per share
  allocation: number; // 0-1
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  summary: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  impactScore: number; // 1-10
  relatedTickers: string[];
}

export interface ActionSuggestion {
  id: string;
  type: '卖出' | '买入' | '持有' | '观望';
  ticker: string;
  description: string;
  reasoning: string;
  urgency: 'high' | 'medium' | 'low';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
}

export interface MarketSentiment {
  sector: string;
  score: number; // 0-100
  trend: 'up' | 'down' | 'flat';
}

export interface MarketIndex {
  name: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  lastUpdated: string;
}
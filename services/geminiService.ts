import { PortfolioItem, ActionSuggestion, ChatMessage, MarketIndex, NewsItem } from "../types";

// --- Pure Mock Service for Demo ---

export const fetchMarketOverview = async (): Promise<MarketIndex[]> => {
  // Simulate network delay for realism
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    { name: "S&P 500", value: "5,203.12", change: "+0.85%", trend: "up", lastUpdated: "Live" },
    { name: "NASDAQ", value: "16,398.20", change: "+1.10%", trend: "up", lastUpdated: "Live" },
    { name: "BTC-USD", value: "67,450.00", change: "+2.50%", trend: "up", lastUpdated: "Live" },
    { name: "VIX", value: "13.50", change: "-4.20%", trend: "down", lastUpdated: "Live" },
  ];
};

export const updatePortfolioPrices = async (portfolio: PortfolioItem[]): Promise<PortfolioItem[]> => {
  return portfolio.map(item => ({
    ...item,
    value: item.value * (1 + (Math.random() * 0.02 - 0.01)) // Random tiny fluctuation
  }));
};

export const fetchMarketIntelligence = async (): Promise<NewsItem[]> => {
  return [
    { id: '1', title: '突发：美联储暗示 9 月降息概率升至 80%', source: 'Bloomberg', time: '10分钟前', summary: '...', sentiment: 'positive', impactScore: 9, relatedTickers: ['SPY', 'QQQ'] },
    { id: '2', title: '台积电新工艺良率超预期，苹果追加订单', source: 'Reuters', time: '30分钟前', summary: '...', sentiment: 'positive', impactScore: 8, relatedTickers: ['AAPL', 'TSM'] },
    { id: '3', title: '红海局势升级，航运成本指数飙升', source: 'WSJ', time: '1小时前', summary: '...', sentiment: 'negative', impactScore: 7, relatedTickers: ['ZIM'] },
  ];
};

export const generateActionReport = async (portfolio: PortfolioItem[]): Promise<ActionSuggestion[]> => {
  // Simulate AI Thinking Time
  await new Promise(resolve => setTimeout(resolve, 2000));

  return [
    {
      id: '1',
      type: '卖出',
      ticker: 'TSLA',
      description: '建议减仓 20%',
      reasoning: '欧盟关税政策落地，预计 Q3 毛利率承压，触发风控阈值。',
      urgency: 'high'
    },
    {
      id: '2',
      type: '持有',
      ticker: 'AAPL',
      description: '维持当前仓位',
      reasoning: '虽然 iPhone 销量疲软，但服务业务增长强劲，且 AI 预期尚未兑现。',
      urgency: 'medium'
    },
    {
      id: '3',
      type: '买入',
      ticker: 'NVDA',
      description: '逢低吸纳',
      reasoning: 'Blackwell 芯片需求超预期，供应链限制解除，目标价上调至 $1100。',
      urgency: 'medium'
    }
  ];
};

export const chatWithMuse = async (
  history: ChatMessage[], 
  newMessage: string, 
  portfolio: PortfolioItem[]
): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return "基于您的 TSLA 持仓，当前的欧盟关税政策确实构成短期风险。我的量化模型显示，如果关税维持在 20% 以上，TSLA 的欧洲区利润将下降 15%。建议您可以考虑卖出部分仓位以锁定利润，或者买入 Put 期权进行对冲。您想看具体的对冲方案吗？";
};
import React, { useEffect, useState } from 'react';
import { PortfolioItem, ActionSuggestion, MarketIndex } from '../types';
import { generateActionReport, fetchMarketOverview } from '../services/geminiService';
import { AlertTriangle, TrendingUp, TrendingDown, ArrowRight, Activity, ShieldAlert, Loader2, Globe, Cpu } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';

interface DashboardProps {
  portfolio: PortfolioItem[];
  onViewChange: (view: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ portfolio, onViewChange }) => {
  const [suggestions, setSuggestions] = useState<ActionSuggestion[]>([]);
  const [marketIndices, setMarketIndices] = useState<MarketIndex[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(true);
  const [loadingMarket, setLoadingMarket] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    // Fetch Agent Actions
    const fetchSuggestions = async () => {
      try {
        const data = await generateActionReport(portfolio);
        if (isMounted) {
          setSuggestions(data);
          setLoadingSuggestions(false);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setLoadingSuggestions(false);
      }
    };

    // Fetch Real Market Data
    const fetchMarket = async () => {
      try {
        const data = await fetchMarketOverview();
        if (isMounted) {
          setMarketIndices(data);
          setLoadingMarket(false);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setLoadingMarket(false);
      }
    };

    fetchSuggestions();
    fetchMarket();

    return () => { isMounted = false; };
  }, [portfolio]);

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e'];

  // Calculate sector exposure for chart
  const sectorData = portfolio.reduce((acc: any[], item) => {
    const existing = acc.find(x => x.subject === item.sector);
    if (existing) {
      existing.A += item.quantity * item.value;
    } else {
      acc.push({ subject: item.sector, A: item.quantity * item.value, fullMark: 100000 });
    }
    return acc;
  }, []);

  return (
    <div className="flex flex-col gap-6 h-full">
      
      {/* Real-Time Market Ticker - List view on mobile (grid), Cards on Desktop */}
      <section className="w-full">
         <div className="flex items-center gap-2 mb-2 px-1">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <Activity size={10} /> Live Data Stream via <span className="text-emerald-500 font-bold">Agent A (Flash)</span>
            </span>
         </div>
        {/* Mobile: Grid Layout (Listed) */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
           {loadingMarket ? (
             Array(4).fill(0).map((_, i) => (
                <div key={i} className="bg-slate-900/50 rounded-lg p-3 animate-pulse border border-slate-800">
                   <div className="h-3 w-12 bg-slate-800 rounded mb-2"></div>
                   <div className="h-5 w-20 bg-slate-800 rounded"></div>
                </div>
             ))
           ) : (
             marketIndices.map((idx, i) => (
                <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-lg p-3 flex flex-col relative overflow-hidden">
                   <div className="flex justify-between items-start z-10">
                      <span className="text-slate-400 text-[10px] font-semibold uppercase">{idx.name}</span>
                      {idx.trend === 'up' ? <TrendingUp size={14} className="text-emerald-500" /> : idx.trend === 'down' ? <TrendingDown size={14} className="text-red-500" /> : <Activity size={14} className="text-slate-500" />}
                   </div>
                   <div className="mt-1 z-10">
                      <span className="text-lg font-bold text-slate-100 block">{idx.value}</span>
                      <span className={`text-[10px] font-medium ${idx.trend === 'up' ? 'text-emerald-400' : idx.trend === 'down' ? 'text-red-400' : 'text-slate-400'}`}>
                        {idx.change}
                      </span>
                   </div>
                </div>
             ))
           )}
        </div>

        {/* Desktop: Horizontal Row */}
        <div className="hidden md:grid md:grid-cols-4 gap-4">
          {loadingMarket ? (
             Array(4).fill(0).map((_, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-4 animate-pulse flex flex-col justify-center">
                   <div className="h-4 w-16 bg-slate-800 rounded mb-2"></div>
                   <div className="h-6 w-24 bg-slate-800 rounded"></div>
                </div>
             ))
          ) : (
            marketIndices.map((idx, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
                <div className="flex justify-between items-start z-10">
                  <span className="text-slate-400 text-xs font-semibold uppercase">{idx.name}</span>
                  {idx.trend === 'up' ? <TrendingUp size={16} className="text-emerald-500" /> : idx.trend === 'down' ? <TrendingDown size={16} className="text-red-500" /> : <Activity size={16} className="text-slate-500" />}
                </div>
                <div className="mt-2 z-10">
                  <span className="text-xl font-bold text-slate-100 block">{idx.value}</span>
                  <span className={`text-xs font-medium ${idx.trend === 'up' ? 'text-emerald-400' : idx.trend === 'down' ? 'text-red-400' : 'text-slate-400'}`}>
                    {idx.change}
                  </span>
                </div>
                {/* Background Sparkline effect */}
                <div className={`absolute bottom-0 left-0 w-full h-1/2 opacity-10 pointer-events-none ${idx.trend === 'up' ? 'bg-emerald-500' : idx.trend === 'down' ? 'bg-red-500' : 'bg-slate-500'}`} style={{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 40%, 75% 60%, 50% 30%, 25% 70%, 0% 50%)'}}></div>
              </div>
            ))
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Action Center (Agent Output) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Hero: Action Reports */}
          {/* Mobile: Remove heavy card styling ("border border-indigo-500/20") to fit better */}
          <section className="md:bg-slate-900/80 md:backdrop-blur-md md:border md:border-indigo-500/20 md:rounded-2xl md:p-6 md:shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
                <Cpu className="text-indigo-400" />
                行动建议报告
                <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded border border-indigo-500/20 hidden sm:inline-block">Agent B: Strategist (Pro 3.0)</span>
              </h2>
              {loadingSuggestions && <Loader2 className="animate-spin text-slate-400" />}
            </div>

            <div className="grid gap-4">
              {loadingSuggestions ? (
                <div className="text-center py-12 text-slate-500">正在调用 Gemini 3.0 Pro 推理核心...</div>
              ) : suggestions.length > 0 ? (
                suggestions.map((action, idx) => (
                  <div key={idx} className={`group relative p-4 rounded-xl border transition-all hover:scale-[1.01] hover:shadow-lg ${
                    action.urgency === 'high' 
                      ? 'bg-red-950/20 border-red-500/30 hover:border-red-500/50' 
                      : action.type === '买入' 
                        ? 'bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500/50'
                        : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          action.type === '卖出' ? 'bg-red-500/20 text-red-400' : 
                          action.type === '买入' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-300'
                        }`}>
                          {action.type}
                        </span>
                        <span className="font-mono text-lg font-bold text-slate-200">{action.ticker}</span>
                      </div>
                      {action.urgency === 'high' && (
                        <span className="flex items-center text-xs text-red-400 font-semibold gap-1">
                          <AlertTriangle size={14} /> 高风险影响
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-slate-100 mb-1">{action.description}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      <span className="text-indigo-400 font-medium">深度理由: </span>
                      {action.reasoning}
                    </p>
                    <div className="mt-3 flex justify-end">
                      <button onClick={() => onViewChange('chat')} className="text-xs flex items-center gap-1 text-slate-400 hover:text-indigo-400 transition-colors">
                        询问 Agent B 详情 <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-slate-500 text-center py-8">Agent B 未检测到显著的持仓风险，建议保持现状。</div>
              )}
            </div>
          </section>

          {/* Sub-section: Intelligence Feed Preview */}
          {/* Mobile: Minimalist style */}
          <section className="md:bg-slate-900 md:border md:border-slate-800 md:rounded-xl md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-300 flex items-center gap-2"><Globe size={18} className="text-indigo-400"/> 情报流 (Agent A)</h3>
              <button onClick={() => onViewChange('intelligence')} className="text-xs text-indigo-400 hover:text-indigo-300">查看全部</button>
            </div>
            <div className="space-y-3">
               <div className="flex gap-4 items-center p-3 hover:bg-slate-800/50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-700">
                  <div className="w-1 h-10 bg-emerald-500 rounded-full shrink-0"></div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-200 line-clamp-1">NVIDIA 发布新一代 Blackwell 芯片架构</h4>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">科技</span>
                      <span className="text-[10px] text-slate-500">30分钟前</span>
                    </div>
                  </div>
               </div>
               <div className="flex gap-4 items-center p-3 hover:bg-slate-800/50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-700">
                  <div className="w-1 h-10 bg-red-500 rounded-full shrink-0"></div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-200 line-clamp-1">美联储会议纪要显示鹰派倾向</h4>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">宏观</span>
                      <span className="text-[10px] text-slate-500">5分钟前</span>
                    </div>
                  </div>
               </div>
            </div>
          </section>
        </div>

        {/* Right Column: Visualization & Stats */}
        <div className="flex flex-col gap-6">
          
          {/* Risk Radar */}
          <div className="md:bg-slate-900 md:border md:border-slate-800 md:rounded-xl md:p-6 flex flex-col items-center min-h-[300px]">
            <h3 className="w-full text-left font-bold text-slate-300 mb-2 flex items-center gap-2">
              <ShieldAlert size={18} className="text-orange-400" /> 风险敞口
            </h3>
            <div className="flex-1 w-full min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={sectorData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} axisLine={false} />
                  <Radar
                    name="风险暴露"
                    dataKey="A"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    fill="#8b5cf6"
                    fillOpacity={0.3}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                    itemStyle={{ color: '#818cf8' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-center text-slate-500 mt-2">
              检测到 <span className="text-slate-300 font-medium">半导体</span> 行业集中度较高。
            </p>
          </div>

          {/* Portfolio Breakdown */}
          <div className="md:bg-slate-900 md:border md:border-slate-800 md:rounded-xl md:p-6 flex-1 min-h-[300px]">
            <h3 className="font-bold text-slate-300 mb-4">资产分布</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolio}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="quantity"
                  >
                    {portfolio.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                    formatter={(value: number) => [`${value} 股`, '数量']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {portfolio.map((item, idx) => (
                 <div key={item.symbol} className="flex justify-between text-sm">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length]}}></div>
                      <span className="text-slate-400">{item.symbol}</span>
                   </div>
                   <span className="font-mono text-slate-200">${item.value.toFixed(2)}</span>
                 </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
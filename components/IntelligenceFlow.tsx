import React, { useEffect, useState } from 'react';
import { NewsItem } from '../types';
import { fetchMarketIntelligence } from '../services/geminiService';
import { ExternalLink, Globe, TrendingUp, BarChart3, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const IntelligenceFlow: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetchMarketIntelligence().then(setNews);
  }, []);

  // Mock Sentiment Data for Heatmap Visual
  const sentimentData = [
    { name: '科技', sentiment: 85 },
    { name: '能源', sentiment: 45 },
    { name: '金融', sentiment: 60 },
    { name: '医疗', sentiment: 30 },
    { name: '消费', sentiment: 70 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full overflow-hidden">
      
      {/* Left: News Feed (The Seeker) */}
      <div className="lg:col-span-2 flex flex-col gap-6 h-full overflow-auto pr-2">
        <h2 className="text-xl font-bold flex items-center gap-2 sticky top-0 bg-slate-950/80 backdrop-blur z-10 py-2">
          <Globe className="text-indigo-400" /> 全球情报流
          <span className="text-xs font-normal text-slate-500 border border-slate-700 rounded px-2">Agent A: Seeker</span>
        </h2>
        
        <div className="space-y-4 pb-4">
          {news.map((item) => (
            <div key={item.id} className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-indigo-500/30 transition-all group">
              <div className="flex justify-between items-start">
                <div className="flex gap-2 mb-2">
                   {item.relatedTickers.map(t => (
                     <span key={t} className="text-[10px] font-mono font-bold bg-indigo-900/30 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-500/20">{t}</span>
                   ))}
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  item.impactScore >= 8 ? 'bg-red-500/20 text-red-400' : 'bg-slate-700 text-slate-400'
                }`}>
                  影响度: {item.impactScore}/10
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-slate-100 mb-2 group-hover:text-indigo-300 transition-colors">
                {item.title}
              </h3>
              
              <div className="flex items-center gap-4 text-xs text-slate-500 mt-3">
                <span className="flex items-center gap-1"><Zap size={12} /> {item.source}</span>
                <span>•</span>
                <span>{item.time}</span>
                <span className="ml-auto flex items-center gap-1 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  分析影响 <ExternalLink size={12} />
                </span>
              </div>
            </div>
          ))}
          
          {/* Mock filler items to show scroll */}
          {[1,2,3].map(i => (
             <div key={i} className="bg-slate-900/50 border border-slate-800/50 p-5 rounded-xl opacity-60">
                <div className="h-4 w-20 bg-slate-800 rounded mb-3"></div>
                <div className="h-6 w-3/4 bg-slate-800 rounded mb-2"></div>
                <div className="h-3 w-1/2 bg-slate-800 rounded"></div>
             </div>
          ))}
        </div>
      </div>

      {/* Right: Sentiment Heatmap & Macro */}
      <div className="flex flex-col gap-6 h-full overflow-auto">
        
        {/* Market Sentiment - Hidden on mobile */}
        <div className="hidden md:block bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="font-bold text-slate-300 mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-emerald-400" /> 市场情绪
          </h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sentimentData} layout="vertical">
                <XAxis type="number" hide domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={60} tick={{fill: '#94a3b8', fontSize: 11}} />
                <Tooltip 
                   cursor={{fill: 'transparent'}}
                   contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                />
                <Bar dataKey="sentiment" radius={[0, 4, 4, 0]} barSize={20}>
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.sentiment > 60 ? '#10b981' : entry.sentiment < 40 ? '#ef4444' : '#f59e0b'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-500 mt-2 text-center">基于 50k+ 社交源的实时 NLP 分析。</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex-1">
           <h3 className="font-bold text-slate-300 mb-4 flex items-center gap-2">
            <BarChart3 size={18} className="text-indigo-400" /> 宏观风向标
          </h3>
          <div className="space-y-4">
            <div className="p-3 bg-slate-950 rounded border border-slate-800">
               <div className="text-xs text-slate-500 mb-1">通胀率 (CPI)</div>
               <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-slate-200">3.4%</span>
                  <span className="text-xs text-emerald-400">-0.1% 预期</span>
               </div>
               <div className="w-full h-1 bg-slate-800 mt-2 rounded-full overflow-hidden">
                 <div className="h-full bg-emerald-500 w-[60%]"></div>
               </div>
            </div>
            
            <div className="p-3 bg-slate-950 rounded border border-slate-800">
               <div className="text-xs text-slate-500 mb-1">10年期国债</div>
               <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-slate-200">4.21%</span>
                  <span className="text-xs text-red-400">+0.05%</span>
               </div>
               <div className="w-full h-1 bg-slate-800 mt-2 rounded-full overflow-hidden">
                 <div className="h-full bg-red-500 w-[75%]"></div>
               </div>
            </div>

            <div className="p-3 bg-slate-950 rounded border border-slate-800">
               <div className="text-xs text-slate-500 mb-1">VIX (恐慌指数)</div>
               <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-slate-200">14.5</span>
                  <span className="text-xs text-slate-400">中性</span>
               </div>
                <div className="w-full h-1 bg-slate-800 mt-2 rounded-full overflow-hidden">
                 <div className="h-full bg-indigo-500 w-[30%]"></div>
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default IntelligenceFlow;
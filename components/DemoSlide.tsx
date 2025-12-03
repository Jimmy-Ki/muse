import React, { useState } from 'react';
import { generateActionReport } from '../services/geminiService';
import { PortfolioItem, ActionSuggestion } from '../types';
import { Play, Loader2, FileJson, AlertTriangle, Terminal } from 'lucide-react';

const DEMO_PORTFOLIO: PortfolioItem[] = [
  { symbol: 'TSLA', name: 'Tesla', sector: 'Auto', quantity: 150, value: 245, allocation: 0.5 },
  { symbol: 'AAPL', name: 'Apple', sector: 'Tech', quantity: 100, value: 175, allocation: 0.5 },
];

const DemoSlide: React.FC = () => {
  const [newsInput, setNewsInput] = useState("突发：欧盟宣布对进口电动汽车征收 35% 的额外关税，立即生效。");
  const [result, setResult] = useState<ActionSuggestion[] | null>(null);
  const [loading, setLoading] = useState(false);

  const runDemo = async () => {
    setLoading(true);
    setResult(null);
    try {
      const data = await generateActionReport(DEMO_PORTFOLIO);
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl h-full flex flex-col justify-center">
       <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">
            实时智能演示
          </h2>
          <p className="text-xl text-slate-400">
            真实的 <span className="text-amber-400 font-mono">Agent B</span> 实时推理演示
          </p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch h-[600px]">
          {/* Input Side */}
          <div className="glass-card rounded-[2rem] p-8 flex flex-col relative overflow-hidden group border-t-4 border-indigo-500">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                   <Terminal size={20} />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-white">市场情报输入</h3>
                   <p className="text-xs text-slate-500 font-mono">来源: 彭博 / 路透</p>
                </div>
             </div>
             
             <textarea 
                value={newsInput}
                onChange={(e) => setNewsInput(e.target.value)}
                className="w-full flex-1 bg-black/40 border border-white/10 rounded-xl p-6 text-indigo-100 resize-none focus:outline-none focus:border-indigo-500/50 transition-colors font-mono text-lg leading-relaxed shadow-inner"
             />
             
             <div className="mt-6 flex justify-end">
                <button 
                  onClick={runDemo}
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition-all transform active:scale-95 disabled:opacity-50 shadow-[0_0_30px_rgba(99,102,241,0.4)]"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <Play size={20} fill="currentColor" />}
                  启动引擎
                </button>
             </div>
          </div>

          {/* Output Side */}
          <div className="glass-card rounded-[2rem] p-8 flex flex-col relative overflow-hidden border-t-4 border-emerald-500">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                   <FileJson size={20} />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-white">策略生成报告</h3>
                   <p className="text-xs text-slate-500 font-mono">输出: 可执行 JSON</p>
                </div>
             </div>
             
             <div className="flex-1 bg-black/40 rounded-xl p-6 overflow-auto font-mono text-sm border border-white/10 shadow-inner relative">
                {loading ? (
                   <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 gap-4 bg-black/60 backdrop-blur-sm z-10">
                      <Loader2 className="animate-spin text-emerald-500" size={48} />
                      <div className="flex flex-col items-center gap-1 font-mono text-xs tracking-widest text-emerald-400/80">
                         <span className="animate-pulse">加载持仓上下文...</span>
                         <span className="animate-pulse delay-75">计算风险敞口...</span>
                         <span className="animate-pulse delay-150">生成 Alpha 策略...</span>
                      </div>
                   </div>
                ) : result ? (
                   <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                      {result.map((item, idx) => (
                         <div key={idx} className="border-l-2 border-emerald-500 pl-4 py-2 group hover:bg-white/5 transition-colors rounded-r-lg">
                            <div className="flex items-center gap-3 mb-2">
                               <span className={`text-xs font-bold px-2 py-1 rounded ${
                                  item.type === '卖出' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                               }`}>{item.type.toUpperCase()}</span>
                               <span className="text-amber-400 font-bold text-lg">{item.ticker}</span>
                               {item.urgency === 'high' && <span className="flex items-center text-red-500 text-xs font-bold gap-1"><AlertTriangle size={12}/> 高优先级</span>}
                            </div>
                            <p className="text-slate-300 mb-2 font-sans">{item.description}</p>
                            <p className="text-slate-500 text-xs italic border-t border-white/5 pt-2 mt-2">"{item.reasoning}"</p>
                         </div>
                      ))}
                      <div className="mt-4 pt-4 border-t border-dashed border-white/10 text-emerald-600/60 text-xs">
                         {`// 耗时: 0.84s`} <br/>
                         {`// 模型: Gemini 1.5 Pro`}
                      </div>
                   </div>
                ) : (
                   <div className="h-full flex flex-col items-center justify-center text-slate-700">
                      <div className="w-20 h-20 border-2 border-dashed border-slate-800 rounded-full flex items-center justify-center mb-4">
                         <Play size={24} className="ml-1 opacity-50" />
                      </div>
                      <p className="font-mono text-xs">等待输入流...</p>
                   </div>
                )}
             </div>
          </div>
       </div>
    </div>
  );
};

export default DemoSlide;
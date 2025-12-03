import React, { useState, useEffect } from 'react';
import Slide from './components/Slide';
import DemoSlide from './components/DemoSlide';
import BackgroundScene from './components/BackgroundScene';
import { ChevronDown, Brain, Zap, Code2, Globe, ShieldCheck, BellRing, ScanSearch, Radio } from 'lucide-react';

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const root = document.getElementById('root');
    if (!root) return;

    const handleScroll = () => {
      const scrollPosition = root.scrollTop;
      const windowHeight = window.innerHeight;
      const index = Math.round(scrollPosition / windowHeight);
      setActiveSlide(index);
    };

    root.addEventListener('scroll', handleScroll);
    return () => root.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSlide = (index: number) => {
    const root = document.getElementById('root');
    if (root) {
      root.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  const navLabels = ['简介', '痛点', '愿景', '引擎', '求真', '触达', '演示', '价值', '路线', '接入'];

  return (
    <>
      <BackgroundScene slideIndex={activeSlide} />
      
      {/* Overlay UI Container */}
      <div className="relative z-10 font-sans text-slate-200 selection:bg-indigo-500/30">
        
        {/* Navigation */}
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-4 bg-black/20 backdrop-blur-xl p-3 rounded-full border border-white/5">
          {navLabels.map((label, i) => (
            <div key={i} className="relative flex items-center justify-center group">
               <span className={`absolute right-8 text-[10px] font-medium tracking-widest text-white bg-black/80 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ${activeSlide === i ? 'opacity-100' : ''}`}>
                 {label}
               </span>
               <button
                onClick={() => scrollToSlide(i)}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  activeSlide === i 
                    ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] scale-125' 
                    : 'bg-white/20 hover:bg-white/50'
                }`}
              />
            </div>
          ))}
        </div>

        {/* --- 0. Cover --- */}
        <Slide>
          <div className="text-center space-y-10 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-500/10 backdrop-blur-md text-amber-300 text-xs font-semibold tracking-wider uppercase animate-fade-in-up">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              Muse Engine Alpha 1.0
            </div>
            
            <h1 className="text-8xl md:text-[9rem] font-black tracking-tighter leading-none text-white drop-shadow-2xl mix-blend-overlay">
              MUSE
              <span className="block text-4xl md:text-5xl mt-2 font-thin tracking-[0.2em] text-white/80">ENGINE</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300/80 max-w-3xl mx-auto font-light leading-relaxed glass-panel p-6 rounded-2xl border-t border-white/20">
              金融信息的<span className="text-amber-400 font-semibold">终极降噪</span>。
            </p>

            <div className="pt-24 animate-bounce">
              <ChevronDown className="mx-auto text-white/30" size={32} />
            </div>
          </div>
        </Slide>

        {/* --- 1. Problem --- */}
        <Slide>
          <div className="w-full max-w-6xl relative z-10">
            <h2 className="text-6xl font-bold mb-16 text-center text-red-500 mix-blend-screen tracking-tighter uppercase">
              信息碎片化
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "新闻终端", desc: "每日 10,000+ 篇资讯", color: "border-red-500/50" },
                { title: "行情软件", desc: "Tick 级行情噪音", color: "border-red-500/50" },
                { title: "研报库", desc: "非结构化研报 PDF", color: "border-red-500/50" },
              ].map((item, i) => (
                <div key={i} className={`glass-card p-12 rounded-3xl border-2 ${item.color} flex flex-col items-center justify-center text-center bg-red-950/10`}>
                  <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-red-300 font-mono">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-center mt-12 text-xl text-slate-400">现有工具正在撕裂您的注意力。</p>
          </div>
        </Slide>

        {/* --- 2. Vision --- */}
        <Slide>
          <div className="flex flex-col items-start w-full max-w-6xl pl-12">
            <h2 className="text-7xl font-bold mb-8 text-left text-emerald-400">
              反向<br/>投研.
            </h2>
            <div className="glass-panel p-8 rounded-2xl max-w-lg border-l-4 border-emerald-500 bg-black/40">
                <p className="text-2xl text-white font-light leading-relaxed">
                  不再从新闻找标的。<br/>
                  而是从 <span className="font-bold text-emerald-400">您的持仓</span> 出发。
                </p>
            </div>
          </div>
        </Slide>

        {/* --- 3. Agents --- */}
        <Slide>
          <div className="w-full max-w-7xl relative z-10 mt-32">
            <div className="text-center mb-12">
                <span className="font-mono text-indigo-400 tracking-widest text-sm uppercase">多智能体协作 (MoA)</span>
                <h2 className="text-5xl font-bold mt-2">三位一体架构</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="h-64 flex flex-col justify-end p-6 border-b border-indigo-500/50 text-right">
                 <h3 className="text-2xl font-bold text-indigo-300">搜寻者 (Seeker)</h3>
                 <p className="text-sm text-slate-400">实时全网数据抓取与清洗</p>
              </div>
              <div className="h-64 flex flex-col justify-end p-6 border-b border-pink-500/50 text-center">
                 <h3 className="text-2xl font-bold text-pink-300">策略家 (Strategist)</h3>
                 <p className="text-sm text-slate-400">基于持仓的思维链 (CoT) 推理</p>
              </div>
              <div className="h-64 flex flex-col justify-end p-6 border-b border-emerald-500/50 text-left">
                 <h3 className="text-2xl font-bold text-emerald-300">联络员 (Liaison)</h3>
                 <p className="text-sm text-slate-400">自然语言交互与情感化陪伴</p>
              </div>
            </div>
          </div>
        </Slide>

        {/* --- 4. Feature A: AI Truth Seeking (New) --- */}
        <Slide>
            <div className="flex flex-col items-center w-full max-w-5xl">
                <div className="flex items-center gap-4 mb-6 text-cyan-400">
                    <ShieldCheck size={48} />
                    <h2 className="text-5xl font-bold">AI 求真引擎</h2>
                </div>
                <p className="text-xl text-slate-300 mb-16 text-center max-w-2xl">
                    在后真相时代，我们用多源交叉验证消除 <span className="text-cyan-400 font-bold">LLM 幻觉</span>。
                    每一条建议，都有据可查。
                </p>

                <div className="flex gap-8 items-center w-full justify-center">
                    {/* Before Card */}
                    <div className="glass-card p-6 rounded-2xl w-80 opacity-50 scale-90 blur-[2px]">
                         <div className="text-red-400 font-bold mb-2 flex items-center gap-2"><ScanSearch size={16}/> 谣言噪音</div>
                         <p className="text-slate-500 text-sm line-through">"据传闻，某科技巨头将收购一家电动车企..."</p>
                    </div>
                    
                    {/* Process Arrow */}
                    <div className="flex flex-col items-center text-cyan-500 gap-2">
                        <span className="font-mono text-xs tracking-widest">GROUNDING</span>
                        <div className="w-16 h-1 bg-cyan-500/50 rounded-full"></div>
                    </div>

                    {/* After Card */}
                    <div className="glass-card p-8 rounded-2xl w-96 border border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                         <div className="text-cyan-400 font-bold mb-2 flex items-center gap-2"><ShieldCheck size={16}/> 事实核查</div>
                         <p className="text-white text-sm">
                             "经 Bloomberg 及 SEC 文件查证，该收购传闻不实。公司官方已发布辟谣公告。"
                         </p>
                         <div className="mt-4 flex gap-2">
                             <span className="px-2 py-1 bg-cyan-900/50 text-cyan-300 text-[10px] rounded border border-cyan-500/30">SOURCE: REUTERS</span>
                             <span className="px-2 py-1 bg-cyan-900/50 text-cyan-300 text-[10px] rounded border border-cyan-500/30">CONFIDENCE: 99%</span>
                         </div>
                    </div>
                </div>
            </div>
        </Slide>

        {/* --- 5. Feature B: Smart Push (New) --- */}
        <Slide>
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                    <h2 className="text-6xl font-bold mb-8 text-orange-500">
                        毫秒级<br/>智能触达
                    </h2>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                                <Zap size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">零延迟推送</h3>
                                <p className="text-slate-400">当关键事件触发您的持仓风险阈值，系统将在 50ms 内发送警报。</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                                <Radio size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">个性化降噪</h3>
                                <p className="text-slate-400">只有真正影响 <span className="text-orange-400">您的</span> 钱袋子的消息，才会打扰您。</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Visual Placeholder for Pulse Animation (Handled by 3D BG) */}
                <div className="order-1 md:order-2 flex justify-center items-center h-[400px] relative">
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 bg-orange-500 rounded-full animate-ping opacity-20"></div>
                     </div>
                     <div className="glass-card p-6 rounded-2xl flex items-center gap-4 border-l-4 border-orange-500 animate-[bounce_3s_infinite]">
                         <BellRing size={24} className="text-orange-500" />
                         <div>
                             <div className="text-xs text-orange-300 font-bold uppercase">Muse Alert • Now</div>
                             <div className="text-white font-bold">AAPL: 关键支撑位跌破</div>
                         </div>
                     </div>
                </div>
            </div>
        </Slide>

        {/* --- 6. Demo --- */}
        <Slide>
           <div className="flex flex-col items-end w-full max-w-7xl pr-12">
              <DemoSlide />
           </div>
        </Slide>

        {/* --- 7. Value --- */}
        <Slide>
           <div className="w-full max-w-6xl flex flex-col items-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center">
                 交付即行动
              </h2>
              <div className="flex flex-col md:flex-row gap-16 items-center justify-center w-full">
                 <div className="w-[280px] aspect-[9/19] bg-black border-[6px] border-slate-800 rounded-[2.5rem] relative overflow-hidden shadow-2xl rotate-[-3deg] hover:rotate-0 transition-all duration-500 shrink-0">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-5 bg-slate-800 rounded-b-lg z-20"></div>
                    <div className="w-full h-full bg-slate-900 p-4 pt-12 flex flex-col gap-3">
                       <div className="text-white text-xl font-bold mb-2">Muse 预警</div>
                       <div className="bg-slate-800/80 p-3 rounded-xl border-l-4 border-red-500 backdrop-blur">
                          <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                             <span>刚刚</span>
                             <span>Agent B</span>
                          </div>
                          <h4 className="font-bold text-white text-sm mb-1">建议减仓 TSLA</h4>
                          <p className="text-xs text-slate-300 leading-tight">检测到欧盟关税政策落地，预计影响毛利 2%。建议执行卖出策略。</p>
                       </div>
                       <div className="bg-slate-800/80 p-3 rounded-xl border-l-4 border-emerald-500 backdrop-blur">
                           <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                             <span>10分钟前</span>
                             <span>Agent A</span>
                          </div>
                          <h4 className="font-bold text-white text-sm mb-1">NVDA 财报超预期</h4>
                          <p className="text-xs text-slate-300 leading-tight">营收同比增长 260%。建议维持持有。</p>
                       </div>
                    </div>
                 </div>

                 <div className="hidden md:block w-full max-w-md glass-card p-8 rounded-2xl rotate-[2deg] hover:rotate-0 transition-all duration-500 border-t border-white/20">
                    <div className="flex items-center gap-4 border-b border-white/10 pb-6 mb-6">
                       <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center font-bold text-black text-xl">M</div>
                       <div>
                          <div className="font-bold text-white text-xl">Muse 每日简报</div>
                          <div className="text-sm text-slate-400">致: VIP 客户</div>
                       </div>
                    </div>
                    <div className="space-y-4 font-mono text-sm">
                       <div className="flex justify-between items-center bg-white/5 p-2 rounded">
                          <span className="text-slate-400">市场情绪</span>
                          <span className="text-emerald-400 font-bold">贪婪 (78)</span>
                       </div>
                       
                       <div className="space-y-2">
                          <div className="text-xs text-indigo-400 font-bold uppercase tracking-wider mb-2">核心持仓异动</div>
                          <div className="flex justify-between border-b border-dashed border-white/10 pb-1">
                             <span className="text-white">NVDA</span>
                             <span className="text-emerald-400">+3.2% (财报预期)</span>
                          </div>
                          <div className="flex justify-between border-b border-dashed border-white/10 pb-1">
                             <span className="text-white">AAPL</span>
                             <span className="text-slate-400">-0.5% (销量平淡)</span>
                          </div>
                       </div>

                       <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded text-xs text-amber-200">
                          <span className="font-bold">策略提示:</span> 今日宏观数据发布前，建议维持较低杠杆率。
                       </div>
                       
                       <div className="pt-2 text-center">
                          <button className="text-xs text-slate-500 hover:text-white transition-colors">查看完整研报 PDF &rarr;</button>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </Slide>

        {/* --- 8. Roadmap --- */}
        <Slide>
           <h2 className="text-4xl md:text-6xl font-bold mb-20 text-center">
              发展路线图
           </h2>
           <div className="w-full max-w-5xl relative bg-black/40 p-12 rounded-3xl border border-white/5 backdrop-blur-sm">
              <div className="flex justify-between">
                 {[
                   { phase: "Phase I", title: "MVP / Alpha 版", date: "Now", desc: "基础 RAG + CoT 推理", active: true },
                   { phase: "Phase II", title: "券商 API 对接", date: "Q3 2024", desc: "对接富途/IB 实盘交易", active: false },
                   { phase: "Phase III", title: "全球市场扩展", date: "2025", desc: "多语言与全资产覆盖", active: false }
                 ].map((item, i) => (
                    <div key={i} className={`flex flex-col items-center text-center w-1/3 relative z-10 ${item.active ? 'opacity-100' : 'opacity-40'}`}>
                       <div className={`w-8 h-8 rounded-full border-4 border-black mb-6 ${item.active ? 'bg-indigo-400 box-content shadow-[0_0_20px_#818cf8]' : 'bg-slate-700'}`}></div>
                       <h3 className="text-2xl font-bold text-white mb-1">{item.title}</h3>
                       <span className="text-xs font-mono text-indigo-400 mb-2 block">{item.phase}</span>
                       <p className="text-sm text-slate-400 max-w-[200px]">{item.desc}</p>
                    </div>
                 ))}
              </div>
              <div className="absolute top-[80px] left-20 w-[80%] h-1 bg-gradient-to-r from-indigo-500 via-indigo-900 to-slate-800 z-0"></div>
           </div>
        </Slide>

        {/* --- 9. End --- */}
        <Slide>
           <div className="text-center relative z-10">
              <h2 className="text-[8rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-800 leading-none mb-8">
                 MUSE
              </h2>
              
              <div className="flex gap-6 justify-center">
                 <button className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                    申请内测
                 </button>
              </div>

              <div className="mt-24 flex gap-8 justify-center text-slate-600 font-mono text-xs tracking-widest">
                 <span className="flex items-center gap-2"><Code2 size={16}/> REACT 19</span>
                 <span className="flex items-center gap-2"><Globe size={16}/> THREE.JS</span>
                 <span className="flex items-center gap-2"><Zap size={16}/> GEMINI 1.5</span>
              </div>
           </div>
        </Slide>

      </div>
    </>
  );
}
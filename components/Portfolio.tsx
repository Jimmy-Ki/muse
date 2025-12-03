import React, { useState } from 'react';
import { PortfolioItem } from '../types';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';

interface PortfolioProps {
  portfolio: PortfolioItem[];
  onAddAsset: (asset: PortfolioItem) => void;
  onRemoveAsset: (symbol: string) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ portfolio, onAddAsset, onRemoveAsset }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newAsset, setNewAsset] = useState<Partial<PortfolioItem>>({
    symbol: '',
    name: '',
    sector: 'Technology',
    quantity: 0,
    value: 0,
    allocation: 0
  });

  const handleSave = () => {
    if (newAsset.symbol && newAsset.quantity) {
      onAddAsset({
        symbol: newAsset.symbol.toUpperCase(),
        name: newAsset.name || newAsset.symbol.toUpperCase(),
        sector: newAsset.sector || 'Other',
        quantity: Number(newAsset.quantity),
        value: Number(newAsset.value), // This might be updated by backend shortly after
        allocation: 0.1 // Default placeholder
      } as PortfolioItem);
      setIsAdding(false);
      setNewAsset({ symbol: '', name: '', sector: 'Technology', quantity: 0, value: 0 });
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-slate-800 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-100">我的持仓</h2>
          <p className="text-slate-400 text-sm">管理 {portfolio.length} 项自选资产</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isAdding ? 'bg-slate-700 text-slate-300' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
          }`}
        >
          {isAdding ? <X size={16} /> : <Plus size={16} />} 
          {isAdding ? '取消' : '添加资产'}
        </button>
      </div>
      
      <div className="overflow-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-950/50 sticky top-0 z-10">
            <tr>
              <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">代码</th>
              <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">名称</th>
              <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">板块</th>
              <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">数量</th>
              <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">现价</th>
              <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">总市值</th>
              <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {isAdding && (
              <tr className="bg-indigo-900/20 animate-in fade-in slide-in-from-top-2">
                <td className="p-4">
                  <input 
                    type="text" 
                    placeholder="SYMBOL" 
                    className="w-24 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-sm text-white uppercase focus:ring-1 focus:ring-indigo-500"
                    value={newAsset.symbol}
                    onChange={e => setNewAsset({...newAsset, symbol: e.target.value})}
                  />
                </td>
                <td className="p-4">
                   <input 
                    type="text" 
                    placeholder="Name (Optional)" 
                    className="w-32 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-sm text-white focus:ring-1 focus:ring-indigo-500"
                    value={newAsset.name}
                    onChange={e => setNewAsset({...newAsset, name: e.target.value})}
                  />
                </td>
                <td className="p-4">
                  <select 
                    className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-sm text-white focus:ring-1 focus:ring-indigo-500"
                    value={newAsset.sector}
                    onChange={e => setNewAsset({...newAsset, sector: e.target.value})}
                  >
                    <option value="Technology">Technology</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Consumer">Consumer</option>
                    <option value="Energy">Energy</option>
                  </select>
                </td>
                <td className="p-4 text-right">
                   <input 
                    type="number" 
                    placeholder="0" 
                    className="w-20 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-sm text-white text-right focus:ring-1 focus:ring-indigo-500"
                    value={newAsset.quantity}
                    onChange={e => setNewAsset({...newAsset, quantity: Number(e.target.value)})}
                  />
                </td>
                <td className="p-4 text-right">
                   <input 
                    type="number" 
                    placeholder="0.00" 
                    className="w-24 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-sm text-white text-right focus:ring-1 focus:ring-indigo-500"
                    value={newAsset.value}
                    onChange={e => setNewAsset({...newAsset, value: Number(e.target.value)})}
                  />
                </td>
                <td className="p-4 text-right text-slate-500">-</td>
                <td className="p-4 flex justify-center gap-2">
                   <button onClick={handleSave} className="p-1.5 bg-emerald-600 hover:bg-emerald-500 rounded text-white transition-colors"><Save size={16} /></button>
                </td>
              </tr>
            )}
            {portfolio.map((item) => (
              <tr key={item.symbol} className="hover:bg-slate-800/30 transition-colors group">
                <td className="p-4 font-mono font-bold text-indigo-400">{item.symbol}</td>
                <td className="p-4 text-slate-200 font-medium">{item.name}</td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded bg-slate-800 text-slate-400 text-xs border border-slate-700">
                    {item.sector}
                  </span>
                </td>
                <td className="p-4 text-right text-slate-300">{item.quantity}</td>
                <td className="p-4 text-right text-slate-300">${item.value.toFixed(2)}</td>
                <td className="p-4 text-right font-bold text-emerald-400">
                  ${(item.quantity * item.value).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td className="p-4 flex justify-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                   <button onClick={() => onRemoveAsset(item.symbol)} className="p-2 hover:bg-red-900/50 rounded text-slate-400 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
            {portfolio.length === 0 && !isAdding && (
                <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500">
                        暂无持仓。点击右上角“添加资产”开始。
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-slate-800 bg-slate-900 text-center text-xs text-slate-500 flex justify-between px-6">
        <span>数据状态: {portfolio.length > 0 && portfolio[0].value > 0 ? 'Hybrid (Real/Mock)' : 'Idle'}</span>
        <span>Muse Engine Alpha</span>
      </div>
    </div>
  );
};

export default Portfolio;
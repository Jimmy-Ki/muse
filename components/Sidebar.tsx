import React from 'react';
import { LayoutDashboard, MessageSquareText, LineChart, Radio, PieChart, Settings } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', label: '仪表盘', icon: LayoutDashboard },
    { id: 'intelligence', label: '情报流', icon: Radio },
    { id: 'chat', label: '智能助手', icon: MessageSquareText },
    { id: 'portfolio', label: '我的持仓', icon: PieChart },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-slate-900 border-t border-slate-800 flex justify-around items-center h-16 md:hidden z-50 px-2 pb-safe">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as ViewState)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? 'text-indigo-400' : 'text-slate-500'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-indigo-400' : 'text-slate-500'} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-slate-900 border-r border-slate-800 flex-col justify-between shrink-0 transition-all duration-300">
        <div className="flex flex-col py-6 gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id as ViewState)}
                className={`flex items-center gap-4 px-6 py-3 mx-2 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon size={24} className={isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-200'} />
                <span className={`font-medium ${isActive ? 'text-indigo-100' : ''}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-4 px-4 py-3 text-slate-500 hover:text-slate-300 transition-colors w-full">
            <Settings size={20} />
            <span className="text-sm">设置</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
import React, { useState } from 'react';
import { LayoutDashboard, Factory, PackageSearch, FileText, Settings, Menu, X, ChevronRight, CakeSlice, Heart } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'production', label: 'Production', icon: <Factory size={20} /> },
    { id: 'inventory', label: 'Inventory', icon: <PackageSearch size={20} /> },
    { id: 'blueprint', label: 'System Blueprint', icon: <FileText size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-cream-50 flex font-sans text-slate-800">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-72 bg-white/80 backdrop-blur-md border-r border-bakery-100 transform transition-transform duration-300 ease-out shadow-xl lg:shadow-none
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-24 flex items-center px-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-bakery-400 to-bakery-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-bakery-200">
              <CakeSlice size={24} fill="currentColor" fillOpacity={0.2} />
            </div>
            <div>
              <h1 className="font-extrabold text-2xl tracking-tight text-bakery-800 leading-none">AISHA</h1>
              <span className="text-xs font-bold text-bakery-400 tracking-widest uppercase">Bakery ERP</span>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setSidebarOpen(false);
              }}
              className={`
                w-full flex items-center px-5 py-3.5 text-sm font-bold rounded-2xl transition-all duration-200 group
                ${activePage === item.id 
                  ? 'bg-gradient-to-r from-bakery-500 to-bakery-400 text-white shadow-md shadow-bakery-200' 
                  : 'text-slate-500 hover:bg-bakery-50 hover:text-bakery-600'}
              `}
            >
              <span className={`mr-4 ${activePage === item.id ? 'text-white' : 'text-slate-400 group-hover:text-bakery-500'}`}>
                {item.icon}
              </span>
              {item.label}
              {activePage === item.id && <Heart size={16} fill="currentColor" className="ml-auto text-white animate-pulse" />}
            </button>
          ))}
        </nav>

        {/* User Profile Card */}
        <div className="absolute bottom-6 left-4 right-4">
          <div className="bg-white border border-bakery-100 p-3 rounded-2xl shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-bakery-100 flex items-center justify-center text-bakery-600 font-bold border-2 border-white shadow-sm">
              AM
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-800">Aisha M.</p>
              <p className="text-xs text-bakery-500 font-semibold">Owner & Chef</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden h-20 bg-white/80 backdrop-blur-md border-b border-bakery-100 flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-bakery-500 rounded-full flex items-center justify-center text-white">
               <CakeSlice size={16} />
            </div>
            <span className="font-extrabold text-xl text-bakery-800">AISHA BAKERY</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2.5 rounded-xl text-bakery-600 bg-bakery-50 active:bg-bakery-100"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
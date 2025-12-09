import React from 'react';
import { Database, Server, Smartphone, Monitor, Cloud, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

const Blueprint: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800">System Blueprint</h1>
        <p className="text-slate-500 font-medium">Hybrid Low-Code Architecture for Aisha Bakery.</p>
      </div>

      {/* High Level Architecture Diagram Simulation */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl overflow-hidden relative border-4 border-slate-800">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Cpu size={250} />
        </div>
        
        <h3 className="text-xl font-bold mb-10 flex items-center gap-3">
          <Server className="text-bakery-400" /> 
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-bakery-400 to-white">Core Infrastructure</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
          {/* Frontend Layer */}
          <div className="space-y-4">
            <div className="border border-slate-700 bg-slate-800/80 p-5 rounded-2xl backdrop-blur-sm hover:border-bakery-500 transition-colors">
              <div className="flex items-center gap-2 text-bakery-300 font-bold mb-2">
                <Monitor size={18} /> Web Client
              </div>
              <p className="text-sm text-slate-400">React 18 SPA</p>
              <p className="text-sm text-slate-400">Tailwind CSS (Pink Theme)</p>
            </div>
            <div className="border border-slate-700 bg-slate-800/80 p-5 rounded-2xl backdrop-blur-sm hover:border-bakery-500 transition-colors">
              <div className="flex items-center gap-2 text-bakery-300 font-bold mb-2">
                <Smartphone size={18} /> Shop Floor
              </div>
              <p className="text-sm text-slate-400">Touch Interface</p>
              <p className="text-sm text-slate-400">Scanner Integration</p>
            </div>
            <div className="flex justify-center">
              <ArrowRight className="rotate-90 md:rotate-0 text-slate-600" />
            </div>
          </div>

          {/* Logic Layer */}
          <div className="border-2 border-dashed border-slate-700 rounded-3xl p-6 flex flex-col justify-center space-y-4 bg-slate-800/30">
            <div className="bg-gradient-to-r from-bakery-600 to-bakery-500 p-5 rounded-2xl text-center shadow-lg transform hover:scale-105 transition-transform">
              <p className="font-extrabold text-white">API Gateway / Logic</p>
              <p className="text-xs text-bakery-100 mt-1 font-semibold">Node.js / Python Services</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800 p-4 rounded-xl text-center border border-slate-600 hover:border-indigo-400 transition-colors">
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">AI Service</p>
                <p className="text-xs text-slate-400">Gemini 2.5 Flash</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-xl text-center border border-slate-600 hover:border-emerald-400 transition-colors">
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Costing Engine</p>
                <p className="text-xs text-slate-400">FIFO / Landed Cost</p>
              </div>
            </div>
          </div>

          {/* Data Layer */}
          <div className="flex flex-col justify-center items-start pl-4 md:border-l border-slate-700 space-y-8">
            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-slate-800 rounded-xl group-hover:bg-slate-700 transition-colors">
                <Database className="text-bakery-400" size={28} />
              </div>
              <div>
                <p className="font-bold text-white text-lg">Central Database</p>
                <p className="text-sm text-slate-400">PostgreSQL (Relational)</p>
                <p className="text-xs text-slate-500 mt-1 font-mono">Single Source of Truth</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-slate-800 rounded-xl group-hover:bg-slate-700 transition-colors">
                <Cloud className="text-sky-400" size={28} />
              </div>
              <div>
                <p className="font-bold text-white text-lg">Cloud Storage</p>
                <p className="text-sm text-slate-400">Docs / Backups</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-bakery-100 shadow-sm">
            <h3 className="font-extrabold text-xl mb-6 text-slate-800">Data Model Strategy</h3>
            <ul className="space-y-4">
                <li className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold shadow-sm">1</span>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed"><strong>Unified Ledger:</strong> All financial impacts (Purchase, Production, Sales) hit a single GL transaction table for real-time reporting.</p>
                </li>
                <li className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold shadow-sm">2</span>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed"><strong>Lot Inheritance:</strong> Finished goods inherit Lot IDs from raw materials for backward traceability.</p>
                </li>
            </ul>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-bakery-100 shadow-sm">
            <h3 className="font-extrabold text-xl mb-6 text-slate-800">Security & Compliance</h3>
            <ul className="space-y-4">
                <li className="flex items-start gap-4">
                    <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-500">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed"><strong>Role-Based Access (RBAC):</strong> Shop floor users restricted to specific terminal views to prevent errors.</p>
                </li>
                <li className="flex items-start gap-4">
                    <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-500">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed"><strong>Audit Trail:</strong> Immutable logs for all BoM changes and inventory adjustments for complete transparency.</p>
                </li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Blueprint;
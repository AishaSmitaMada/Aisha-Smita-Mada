import React from 'react';
import { MOCK_INGREDIENTS, MOCK_LOTS, ICON_MAP } from '../constants';
import { AlertCircle, ArrowRightLeft, ShieldCheck, History } from 'lucide-react';

const Inventory: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Pantry & Inventory</h1>
          <p className="text-slate-500 font-medium">Keep track of your ingredients and expiry dates.</p>
        </div>
        <button className="px-5 py-2.5 bg-slate-800 text-white rounded-xl text-sm font-bold hover:bg-slate-900 flex items-center gap-2 shadow-lg shadow-slate-200 transition-all hover:-translate-y-0.5">
          <ArrowRightLeft size={16} />
          Internal Move
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-bakery-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-bakery-50 border-b border-bakery-100">
              <tr>
                <th className="px-8 py-5 text-xs font-extrabold text-bakery-700 uppercase tracking-wider">Item Details</th>
                <th className="px-6 py-5 text-xs font-extrabold text-bakery-700 uppercase tracking-wider">Stock Level</th>
                <th className="px-6 py-5 text-xs font-extrabold text-bakery-700 uppercase tracking-wider">Valuation (FIFO)</th>
                <th className="px-6 py-5 text-xs font-extrabold text-bakery-700 uppercase tracking-wider">Lot Tracking</th>
                <th className="px-6 py-5 text-xs font-extrabold text-bakery-700 uppercase tracking-wider text-right">History</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bakery-50">
              {MOCK_INGREDIENTS.map(item => {
                const itemLots = MOCK_LOTS.filter(l => l.ingredientId === item.id);
                const isLowStock = item.currentStock < 100; // Simulated threshold

                return (
                  <tr key={item.id} className="hover:bg-bakery-50/40 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-bakery-50 text-bakery-500 rounded-2xl group-hover:bg-white group-hover:shadow-sm transition-all">
                          {ICON_MAP[item.id] || <div className="w-5 h-5 bg-slate-200 rounded-full" />}
                        </div>
                        <div>
                          <p className="font-extrabold text-slate-800 text-base">{item.name}</p>
                          <p className="text-xs text-slate-400 font-bold tracking-wide mt-0.5">{item.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold px-3 py-1 rounded-full border ${isLowStock ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-white text-slate-600 border-slate-100'}`}>
                          {item.currentStock} {item.unit}
                        </span>
                        {isLowStock && <AlertCircle size={16} className="text-amber-500 animate-bounce" />}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-bold text-slate-700">${item.standardCost.toFixed(2)} <span className="text-slate-400 text-xs font-normal">/ {item.unit}</span></p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide mt-1">Avg. Basis</p>
                    </td>
                    <td className="px-6 py-5">
                      {itemLots.length > 0 ? (
                        <div className="flex flex-col gap-1.5">
                          {itemLots.map(lot => {
                            const daysToExpiry = Math.ceil((new Date(lot.expiryDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
                            const isExpiring = daysToExpiry < 30;
                            return (
                              <div key={lot.id} className="flex items-center gap-2 text-xs font-semibold">
                                <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">{lot.id}</span>
                                <span className={`${isExpiring ? 'text-bakery-600' : 'text-emerald-600'}`}>
                                  {daysToExpiry}d left
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      ) : (
                         <span className="text-xs text-slate-400 italic font-medium">No active lots</span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="p-2 text-slate-300 hover:text-bakery-500 hover:bg-bakery-50 rounded-lg transition-all">
                        <History size={20} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
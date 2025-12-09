import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Legend 
} from 'recharts';
import { DollarSign, Activity, AlertTriangle, TrendingUp, Sparkles, Smile } from 'lucide-react';

const KPICard = ({ title, value, subtext, icon, trend }: any) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-bakery-100 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-bold text-slate-400 mb-1 uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-extrabold text-slate-800">{value}</h3>
      </div>
      <div className={`p-4 rounded-2xl ${trend === 'up' ? 'bg-teal-50 text-teal-500' : 'bg-bakery-50 text-bakery-500'}`}>
        {icon}
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm font-semibold">
      <span className={trend === 'up' ? 'text-teal-500' : 'text-bakery-500'}>
        {subtext}
      </span>
      <span className="text-slate-300 ml-2">vs last month</span>
    </div>
  </div>
);

const dataProduction = [
  { name: 'Mon', planned: 400, actual: 380 },
  { name: 'Tue', planned: 300, actual: 320 },
  { name: 'Wed', planned: 450, actual: 440 },
  { name: 'Thu', planned: 380, actual: 375 },
  { name: 'Fri', planned: 500, actual: 490 },
];

const dataCost = [
  { name: 'W1', material: 2400, labor: 1200 },
  { name: 'W2', material: 2200, labor: 1300 },
  { name: 'W3', material: 2600, labor: 1100 },
  { name: 'W4', material: 2300, labor: 1250 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-2">
            Hello, Aisha! <Smile className="text-bakery-500" />
          </h1>
          <p className="text-slate-500 font-medium mt-1">Here's what's baking in your kitchen today.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-5 py-2.5 bg-white border border-bakery-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-bakery-50 transition-colors shadow-sm">
             Export Report
           </button>
           <button className="px-5 py-2.5 bg-bakery-500 text-white rounded-xl text-sm font-bold hover:bg-bakery-600 shadow-md shadow-bakery-200 transition-all flex items-center gap-2">
             <Sparkles size={16} /> New Order
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Total Baked" 
          value="2,450" 
          subtext="+12.5%" 
          trend="up"
          icon={<PackageSearch className="w-7 h-7" />} 
        />
        <KPICard 
          title="Unit Cost" 
          value="$1.12" 
          subtext="-0.4%" 
          trend="up"
          icon={<DollarSign className="w-7 h-7" />} 
        />
        <KPICard 
          title="Efficiency" 
          value="94.2%" 
          subtext="+2.1%" 
          trend="up"
          icon={<Activity className="w-7 h-7" />} 
        />
        <KPICard 
          title="Low Stock" 
          value="3 Items" 
          subtext="Restock Soon!" 
          trend="down"
          icon={<AlertTriangle className="w-7 h-7" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Production Schedule Adherence */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-bakery-50">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-xl text-slate-800">Baking Output</h3>
            <span className="text-xs font-bold bg-bakery-50 text-bakery-600 px-3 py-1.5 rounded-full uppercase tracking-wider">This Week</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataProduction} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fff1f2" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13}} />
                <Tooltip 
                  cursor={{fill: '#fff1f2'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px'}}
                />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                <Bar dataKey="planned" name="Planned" fill="#fecdd3" radius={[8, 8, 8, 8]} />
                <Bar dataKey="actual" name="Actual" fill="#f43f5e" radius={[8, 8, 8, 8]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cost Analysis */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-bakery-50">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-xl text-slate-800">Cost Breakdown</h3>
            <span className="text-xs font-bold bg-bakery-50 text-bakery-600 px-3 py-1.5 rounded-full uppercase tracking-wider">October</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataCost}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fff1f2" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px'}}
                />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                <Line type="monotone" dataKey="material" stroke="#f43f5e" strokeWidth={4} dot={{r: 4, fill: '#f43f5e', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 7}} />
                <Line type="monotone" dataKey="labor" stroke="#cbd5e1" strokeWidth={4} dot={{r: 4, fill: '#cbd5e1', strokeWidth: 2, stroke: '#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* AI Insight Teaser */}
      <div className="bg-gradient-to-r from-bakery-500 to-bakery-400 rounded-3xl p-8 text-white shadow-xl shadow-bakery-200 flex items-center justify-between relative overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-extrabold text-xl">AI Prediction Ready!</h3>
          </div>
          <p className="text-bakery-50 font-medium text-lg max-w-xl leading-relaxed">
            Our magic crystal ball predicts a <span className="text-white font-black bg-white/20 px-1 rounded">15% surge</span> in croissant demand this weekend due to sunny weather!
          </p>
        </div>
        <button className="relative z-10 px-6 py-3 bg-white text-bakery-600 rounded-2xl font-extrabold text-sm hover:bg-bakery-50 transition-colors shadow-sm">
          See Full Forecast
        </button>
      </div>
    </div>
  );
};

// Quick fix for missing import in this file scope
import { PackageSearch } from 'lucide-react';

export default Dashboard;
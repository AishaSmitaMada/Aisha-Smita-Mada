import React, { useState } from 'react';
import { MOCK_RECIPES, MOCK_INGREDIENTS, MOCK_ORDERS, LABOR_RATE_PER_HOUR, OVERHEAD_RATE_PER_HOUR, ICON_MAP } from '../constants';
import { optimizeRecipeWithAI } from '../services/geminiService';
import { Recipe } from '../types';
import { Clock, Users, Sparkles, ChefHat, Calendar, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

const Production: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'recipes' | 'schedule'>('recipes');
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<any>(null);

  const calculateRecipeCost = (recipe: Recipe) => {
    let materialCost = 0;
    recipe.items.forEach(item => {
      const ing = MOCK_INGREDIENTS.find(i => i.id === item.ingredientId);
      if (ing) {
        materialCost += (ing.standardCost * item.quantity) * (1 + item.wastePercentage);
      }
    });
    const laborCost = recipe.baseLaborHours * LABOR_RATE_PER_HOUR;
    const overheadCost = recipe.baseLaborHours * OVERHEAD_RATE_PER_HOUR;
    const totalCost = materialCost + laborCost + overheadCost;
    
    return {
      material: materialCost,
      labor: laborCost,
      total: totalCost,
      unit: totalCost / recipe.yieldUnits
    };
  };

  const handleAiOptimize = async (recipe: Recipe) => {
    setAiLoading(true);
    setAiSuggestion(null);
    try {
      if (!process.env.API_KEY) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setAiSuggestion({
          analysis: "Butter constitutes 45% of material cost. Current premium butter price is peaking.",
          suggestion: "Consider a blend of 80% Premium Butter and 20% High-Grade Margarine for lamination layers 2 & 3. This maintains flavor profile while improving structural stability.",
          potentialSavings: "12.5%"
        });
      } else {
        const result = await optimizeRecipeWithAI(recipe, MOCK_INGREDIENTS);
        setAiSuggestion(result);
      }
    } catch (e) {
      console.error(e);
      setAiSuggestion({ error: "Could not connect to AI service." });
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Production Kitchen</h1>
          <p className="text-slate-500 font-medium">Manage your delicious recipes and baking schedule.</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl border border-bakery-100 shadow-sm">
          <button
            onClick={() => setActiveTab('recipes')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'recipes' ? 'bg-bakery-100 text-bakery-700 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Recipes & BoM
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'schedule' ? 'bg-bakery-100 text-bakery-700 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Schedule
          </button>
        </div>
      </div>

      {activeTab === 'recipes' && (
        <div className="space-y-4">
          {MOCK_RECIPES.map(recipe => {
            const costs = calculateRecipeCost(recipe);
            const isExpanded = expandedRecipe === recipe.id;

            return (
              <div key={recipe.id} className="bg-white rounded-3xl shadow-sm border border-bakery-50 overflow-hidden transition-all duration-300 hover:shadow-md">
                <div 
                  className="p-6 flex items-center justify-between cursor-pointer hover:bg-bakery-50/30 transition-colors"
                  onClick={() => setExpandedRecipe(isExpanded ? null : recipe.id)}
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${isExpanded ? 'bg-bakery-500 text-white' : 'bg-bakery-100 text-bakery-500'}`}>
                      <ChefHat size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{recipe.name}</h3>
                      <div className="flex items-center gap-4 text-sm font-medium text-slate-400 mt-1">
                        <span className="flex items-center gap-1.5"><Sparkles size={16} className="text-bakery-300" /> Ver {recipe.version}</span>
                        <span className="flex items-center gap-1.5"><Users size={16} className="text-bakery-300" /> Yield: {recipe.yieldUnits}</span>
                        <span className="flex items-center gap-1.5"><Clock size={16} className="text-bakery-300" /> {recipe.baseLaborHours} hrs</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Unit Cost</p>
                      <p className="text-2xl font-extrabold text-slate-800">${costs.unit.toFixed(2)}</p>
                    </div>
                    <div className={`p-2 rounded-full transition-transform ${isExpanded ? 'bg-bakery-100 rotate-180' : 'bg-slate-50'}`}>
                         <ChevronDown className={`w-5 h-5 ${isExpanded ? 'text-bakery-600' : 'text-slate-400'}`} />
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-6 pb-8 bg-bakery-50/20 border-t border-bakery-100 animate-in fade-in slide-in-from-top-2">
                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Ingredients List */}
                      <div className="lg:col-span-2">
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 pl-1">Ingredients (BoM)</h4>
                        <div className="bg-white rounded-2xl border border-bakery-100 overflow-hidden shadow-sm">
                          <table className="w-full text-sm text-left">
                            <thead className="bg-bakery-50 text-bakery-700 font-bold">
                              <tr>
                                <th className="px-6 py-4">Ingredient</th>
                                <th className="px-6 py-4">Quantity</th>
                                <th className="px-6 py-4">Est. Cost</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-bakery-50">
                              {recipe.items.map((item, idx) => {
                                const ing = MOCK_INGREDIENTS.find(i => i.id === item.ingredientId);
                                return (
                                  <tr key={idx} className="hover:bg-bakery-50/30">
                                    <td className="px-6 py-4 flex items-center gap-3 font-semibold text-slate-700">
                                      <div className="p-1.5 bg-bakery-100 rounded text-bakery-600">
                                         {ing && ICON_MAP[ing.id]}
                                      </div>
                                      {ing?.name || item.ingredientId}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-600">{item.quantity} {ing?.unit}</td>
                                    <td className="px-6 py-4 text-slate-500 font-mono">
                                      ${((ing?.standardCost || 0) * item.quantity).toFixed(2)}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* AI Optimization Panel */}
                      <div className="lg:col-span-1">
                        <div className="bg-gradient-to-br from-indigo-50 to-white rounded-3xl p-6 border border-indigo-100 h-full shadow-sm">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <h4 className="font-extrabold text-indigo-900 text-lg">AI Chef Assistant</h4>
                          </div>
                          
                          {!aiSuggestion ? (
                            <div className="space-y-6">
                              <p className="text-sm text-indigo-800/70 font-medium leading-relaxed">
                                Need to lower costs? I can analyze market prices and suggest smart ingredient swaps!
                              </p>
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleAiOptimize(recipe); }}
                                disabled={aiLoading}
                                className="w-full py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 disabled:opacity-50 flex justify-center items-center shadow-md shadow-indigo-200 transition-all active:scale-95"
                              >
                                {aiLoading ? (
                                  <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                ) : '✨ Optimize Recipe'}
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                              <div className="bg-white p-4 rounded-2xl border border-indigo-50 shadow-sm">
                                <p className="text-xs font-extrabold text-indigo-400 uppercase tracking-wider mb-1">Analysis</p>
                                <p className="text-sm text-slate-700 font-medium">{aiSuggestion.analysis}</p>
                              </div>
                              <div className="bg-white p-4 rounded-2xl border border-indigo-50 shadow-sm">
                                <p className="text-xs font-extrabold text-indigo-400 uppercase tracking-wider mb-1">Suggestion</p>
                                <p className="text-sm text-slate-700 font-medium">{aiSuggestion.suggestion}</p>
                              </div>
                              <div className="flex items-center justify-between text-white font-bold text-sm bg-indigo-500 p-3 rounded-xl shadow-lg shadow-indigo-200">
                                <span>Potential Savings</span>
                                <span>{aiSuggestion.potentialSavings}</span>
                              </div>
                              <button 
                                onClick={() => setAiSuggestion(null)}
                                className="text-xs text-indigo-400 font-bold hover:text-indigo-600 w-full text-center mt-2"
                              >
                                Try Another Recipe
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'schedule' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-240px)]">
          {['PLANNED', 'IN_PROGRESS', 'COMPLETED'].map(status => (
            <div key={status} className="bg-slate-50/80 rounded-3xl p-4 flex flex-col border border-bakery-50">
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4 px-3 flex justify-between items-center">
                {status.replace('_', ' ')}
                <span className="bg-white text-bakery-500 text-xs px-2 py-1 rounded-lg border border-bakery-100 shadow-sm min-w-[24px] text-center">
                  {MOCK_ORDERS.filter(o => o.status === status).length}
                </span>
              </h3>
              <div className="space-y-3 overflow-y-auto flex-1 pr-1 custom-scrollbar">
                {MOCK_ORDERS.filter(o => o.status === status).map(order => {
                  const recipe = MOCK_RECIPES.find(r => r.id === order.recipeId);
                  return (
                    <div key={order.id} className="bg-white p-5 rounded-2xl shadow-sm border border-bakery-50 group hover:shadow-md hover:border-bakery-200 transition-all cursor-move">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] font-bold bg-slate-100 text-slate-400 px-2 py-0.5 rounded-md">{order.id}</span>
                        {order.status === 'IN_PROGRESS' && (
                            <span className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bakery-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-bakery-500"></span>
                            </span>
                        )}
                      </div>
                      <h4 className="font-extrabold text-slate-800 text-lg leading-tight mb-2">{recipe?.name}</h4>
                      <div className="flex items-center justify-between text-sm font-medium">
                        <div className="flex items-center gap-1.5 text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
                          <PackageSearch size={14} />
                          <span>{order.quantityToProduce}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-bakery-600 bg-bakery-50 px-2 py-1 rounded-lg">
                          <Calendar size={14} />
                          <span>{order.dueDate.slice(5)}</span>
                        </div>
                      </div>
                      {order.assignedTo && (
                        <div className="mt-4 pt-3 border-t border-slate-50 flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold">
                            {order.assignedTo.charAt(0)}
                          </div>
                          <span className="text-xs font-bold text-slate-400">{order.assignedTo}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Fix for icon import
import { PackageSearch } from 'lucide-react';

export default Production;
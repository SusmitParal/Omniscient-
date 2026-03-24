
import React, { useState, useEffect } from 'react';
import { UnitCategory, Unit } from '../types';
import { UNIT_DATABASE } from '../constants';
import { ChevronRight, ArrowRightLeft, Search, Copy, Check, Info, Cpu, FlaskConical } from 'lucide-react';

const Converter: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<UnitCategory | null>(null);
  const [fromUnit, setFromUnit] = useState<Unit | null>(null);
  const [toUnit, setToUnit] = useState<Unit | null>(null);
  const [inputValue, setInputValue] = useState('1');
  const [outputValue, setOutputValue] = useState('0');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [showFormula, setShowFormula] = useState(true);

  const categories = Object.keys(UNIT_DATABASE) as UnitCategory[];
  
  const filteredCategories = categories.filter(cat => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    const catMatch = cat.toLowerCase().includes(query);
    const unitMatch = UNIT_DATABASE[cat].some(unit => 
      unit.name.toLowerCase().includes(query) || 
      unit.symbol.toLowerCase().includes(query)
    );
    return catMatch || unitMatch;
  }).sort((a, b) => a.localeCompare(b));

  useEffect(() => {
    if (selectedCat && fromUnit && toUnit) calculate();
  }, [inputValue, fromUnit, toUnit, selectedCat]);

  const selectCategory = (cat: UnitCategory) => {
    setSelectedCat(cat);
    setFromUnit(UNIT_DATABASE[cat][0]);
    setToUnit(UNIT_DATABASE[cat][1] || UNIT_DATABASE[cat][0]);
    setInputValue('1');
  };

  const calculate = () => {
    if (!selectedCat || !fromUnit || !toUnit) return;
    try {
      const val = parseFloat(inputValue);
      if (isNaN(val)) { setOutputValue('0'); return; }
      let res = 0;
      if (selectedCat === "Temperature") {
        const f = fromUnit.factor as string, t = toUnit.factor as string;
        let c = val;
        if (f === "F") c = (val - 32) * 5 / 9; else if (f === "K") c = val - 273.15; else if (f === "R") c = (val - 491.67) * 5 / 9;
        if (t === "C") res = c; else if (t === "F") res = (c * 9 / 5) + 32; else if (t === "K") res = c + 273.15; else if (t === "R") res = (c * 9 / 5) + 491.67;
      } else if (selectedCat === "Fuel Consumption") {
        const f = fromUnit.factor as string, t = toUnit.factor as string;
        let l = val;
        if (f === "KML") l = 100 / val; else if (f === "MPG_US") l = 235.215 / val; else if (f === "MPG_UK") l = 282.481 / val;
        if (t === "L100") res = l; else if (t === "KML") res = 100 / l; else if (t === "MPG_US") res = 235.215 / l; else if (t === "MPG_UK") res = 282.481 / l;
      } else {
        res = (val * (fromUnit.factor as number)) / (toUnit.factor as number);
      }
      setOutputValue(res.toLocaleString(undefined, { maximumFractionDigits: 10, useGrouping: false }));
    } catch (e) { setOutputValue('Error'); }
  };

  const handleKeypad = (k: string) => {
    if (k === 'CLR') setInputValue('0');
    else if (k === '.') { if (!inputValue.includes('.')) setInputValue(p => p + '.'); }
    else setInputValue(p => p === '0' ? k : p + k);
  };

  if (!selectedCat) {
    return (
      <div className="flex flex-col w-full max-w-2xl mx-auto px-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="mb-8 px-2">
          <h2 className="text-4xl font-black text-white tracking-tighter mb-1">UNIVERSE <span className="text-cyan-500">PRO</span></h2>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">Multi-Dimensional Metric Array</p>
        </div>

        <div className="sticky top-0 z-20 py-4 bg-slate-950/80 backdrop-blur-lg px-2">
          <div className="relative group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors">
              <Search className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              placeholder="Search by name or symbol (e.g. 'kg', 'm', 'psi')..."
              className="w-full bg-slate-900/40 border border-slate-800/80 rounded-[2rem] py-5 pl-14 pr-6 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all shadow-2xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-32 mt-6 px-2">
          {filteredCategories.map(cat => (
            <button
              key={cat}
              onClick={() => selectCategory(cat)}
              className="group flex items-center justify-between p-6 bg-slate-900/20 border border-slate-800/40 rounded-3xl hover:bg-slate-800/60 hover:border-cyan-500/40 transition-all active:scale-[0.98] shadow-lg"
            >
              <div className="flex flex-col items-start text-left">
                <div className="flex items-center gap-2 mb-1">
                  <FlaskConical className="w-3 h-3 text-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <span className="text-slate-200 font-black tracking-tight group-hover:text-white transition-colors uppercase text-sm">{cat}</span>
                </div>
                <span className="text-[9px] text-slate-600 group-hover:text-slate-400 uppercase font-bold tracking-[0.15em] transition-colors">
                  {UNIT_DATABASE[cat].length} Metrics Loaded
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-800 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-2 animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-8 px-2">
        <button onClick={() => setSelectedCat(null)} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-cyan-400 flex items-center gap-2 transition-all group">
          <ArrowRightLeft className="w-4 h-4 rotate-90 group-hover:-translate-y-0.5 transition-transform" />
          Systems Library
        </button>
        <div className="px-5 py-2 bg-cyan-500/5 text-cyan-500 rounded-2xl text-[10px] font-black border border-cyan-500/20 uppercase tracking-[0.2em]">
          {selectedCat}
        </div>
      </div>

      <div className="bg-slate-900/60 rounded-[3rem] border border-slate-800/80 p-8 sm:p-12 mb-8 backdrop-blur-3xl shadow-2xl space-y-10 ring-1 ring-slate-700/20 relative">
        <div className="space-y-5">
          <div className="flex justify-between items-center px-1">
            <label className="text-[10px] uppercase font-black tracking-[0.4em] text-slate-600">Source Metric</label>
            <span className="text-[10px] text-cyan-500 font-mono font-bold bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">{fromUnit?.symbol}</span>
          </div>
          <div className="flex flex-col gap-3">
            <select 
              className="bg-transparent text-slate-400 text-xs font-black uppercase tracking-[0.2em] focus:outline-none cursor-pointer hover:text-cyan-400 transition-colors"
              value={fromUnit?.name}
              onChange={(e) => setFromUnit(UNIT_DATABASE[selectedCat].find(u => u.name === e.target.value) || null)}
            >
              {UNIT_DATABASE[selectedCat].map(u => <option key={u.name} value={u.name} className="bg-slate-950">{u.name}</option>)}
            </select>
            <div className="text-5xl font-light mono text-white overflow-x-auto whitespace-nowrap scrollbar-hide py-3 border-b border-slate-800/50">
              {inputValue}
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
           <button 
             onClick={() => { const t = fromUnit; setFromUnit(toUnit); setToUnit(t); }}
             className="absolute p-4 bg-slate-950 rounded-full border border-slate-800 shadow-2xl hover:bg-slate-800 hover:border-cyan-500/50 transition-all active:scale-90 z-10"
           >
             <ArrowRightLeft className="w-6 h-6 text-cyan-500" />
           </button>
           <div className="w-full h-[1px] bg-slate-800/50"></div>
        </div>

        <div className="space-y-5 pt-4">
          <div className="flex justify-between items-center px-1">
            <label className="text-[10px] uppercase font-black tracking-[0.4em] text-slate-600">Target Output</label>
            <span className="text-[10px] text-cyan-500 font-mono font-bold bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">{toUnit?.symbol}</span>
          </div>
          <div className="flex flex-col gap-3">
            <select 
              className="bg-transparent text-slate-400 text-xs font-black uppercase tracking-[0.2em] focus:outline-none cursor-pointer hover:text-cyan-400 transition-colors"
              value={toUnit?.name}
              onChange={(e) => setToUnit(UNIT_DATABASE[selectedCat].find(u => u.name === e.target.value) || null)}
            >
              {UNIT_DATABASE[selectedCat].map(u => <option key={u.name} value={u.name} className="bg-slate-950">{u.name}</option>)}
            </select>
            <div className="flex items-center justify-between gap-6 pt-3">
               <div className="text-6xl font-black mono text-cyan-400 truncate drop-shadow-[0_0_30px_rgba(34,211,238,0.4)] tracking-tighter">
                {outputValue}
               </div>
               <button onClick={() => { navigator.clipboard.writeText(outputValue); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className={`p-3 rounded-2xl transition-all ${copied ? 'bg-emerald-500/20 text-emerald-500' : 'bg-slate-800/50 text-slate-600 hover:text-slate-300'}`}>
                 {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
               </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <button onClick={() => setShowFormula(!showFormula)} className="w-full flex items-center justify-between p-5 bg-slate-900/40 border border-slate-800 rounded-3xl hover:bg-slate-800/60 transition-all">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-cyan-500/10 rounded-xl"><Cpu className="w-4 h-4 text-cyan-500" /></div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Logic Core Inference</span>
          </div>
          <Info className={`w-4 h-4 transition-all ${showFormula ? 'text-cyan-500 rotate-180' : 'text-slate-700'}`} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3.5 pb-40 px-1">
        {['1','2','3','4','5','6','7','8','9','.', '0', 'CLR'].map(k => (
          <button 
            key={k} onClick={() => handleKeypad(k)}
            className={`flex items-center justify-center p-7 rounded-[2rem] font-black text-3xl transition-all active:scale-95 border border-slate-800/60 shadow-xl
              ${k === 'CLR' ? 'bg-rose-500/5 text-rose-500 hover:bg-rose-500/10' : 'bg-slate-800/10 text-slate-100 hover:bg-slate-800/30'}`}
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Converter;


import React, { useState, useEffect, useRef } from 'react';
import { create, all } from 'mathjs';
import { CalcSubMode, AngleMode } from '../types';
import { History, Sparkles } from 'lucide-react';
import { triggerHaptic } from '../App';

const math = create(all);

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [subMode, setSubMode] = useState<CalcSubMode>('SCIENTIFIC');
  const [angleMode, setAngleMode] = useState<AngleMode>('DEG');
  const [history, setHistory] = useState<string[]>([]);
  const [lastAns, setLastAns] = useState<string>('0');
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const [taxRate, setTaxRate] = useState<number>(10);
  const displayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (displayRef.current) displayRef.current.scrollLeft = displayRef.current.scrollWidth;
  }, [expression]);

  const handlePress = (key: string) => {
    triggerHaptic(8);
    if (key === 'C') { setExpression(''); setResult(null); }
    else if (key === 'DEL') setExpression(prev => prev.slice(0, -1));
    else if (key === '=') calculateResult();
    else if (key === 'Ans') setExpression(prev => prev + lastAns);
    else if (['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'log', 'ln', 'sqrt', 'abs'].includes(key)) setExpression(prev => prev + key + '(');
    else if (key === 'TAX+') applyTax(true);
    else if (key === 'TAX-') applyTax(false);
    else if (key === 'GT') { setExpression(grandTotal.toString()); setResult(null); }
    else setExpression(prev => prev + key);
  };

  const applyTax = (isAdd: boolean) => {
    try {
      const current = parseFloat(expression || result || '0');
      if (isNaN(current)) return;
      const taxAmount = current * (taxRate / 100);
      const newTotal = isAdd ? current + taxAmount : current - taxAmount;
      const resStr = newTotal.toLocaleString(undefined, { maximumFractionDigits: 4, useGrouping: false });
      setResult(resStr);
      setExpression(resStr);
    } catch (e) { setResult('Error'); }
  };

  const calculateResult = () => {
    if (!expression) return;
    try {
      let expr = expression.replace(/×/g, '*').replace(/÷/g, '/');
      if (angleMode === 'DEG') {
        expr = expr.replace(/sin\(([^)]+)\)/g, 'sin(($1) deg)');
        expr = expr.replace(/cos\(([^)]+)\)/g, 'cos(($1) deg)');
        expr = expr.replace(/tan\(([^)]+)\)/g, 'tan(($1) deg)');
      }
      const evalRes = math.evaluate(expr);
      const formatted = math.format(evalRes, { precision: 14 });
      const resultStr = formatted.toString();
      setResult(resultStr);
      setLastAns(resultStr);
      setHistory(prev => [expression + ' = ' + resultStr, ...prev].slice(0, 10));
      if (!isNaN(parseFloat(resultStr))) setGrandTotal(prev => prev + parseFloat(resultStr));
    } catch (err) { setResult('Error'); }
  };

  const getButtonClass = (btn: string) => {
    const base = `flex items-center justify-center rounded-[1.2rem] font-bold transition-all active:scale-[0.8] border shadow-sm relative overflow-hidden text-lg sm:text-xl w-full h-full`;
    if (['C', 'DEL'].includes(btn)) return `${base} bg-rose-500/10 text-rose-500 border-rose-500/20`;
    if (btn === '=') return `${base} bg-cyan-500 text-slate-950 border-cyan-400 shadow-cyan-500/30`;
    if (['+', '-', '*', '/', '×', '÷'].includes(btn)) return `${base} bg-slate-900/80 text-cyan-400 border-slate-800`;
    if (['TAX+', 'TAX-', 'GT'].includes(btn)) return `${base} bg-slate-800/40 text-emerald-400 border-slate-700/50 text-xs font-black`;
    if (isNaN(Number(btn)) && btn !== '.') return `${base} bg-slate-900/40 text-slate-500 border-slate-800/50 text-xs uppercase font-black`;
    return `${base} bg-slate-800/20 text-slate-100 border-slate-800/80 hover:bg-slate-800/40`;
  };

  const getSpanClass = (key: string) => {
    // Scientific Spans
    if (subMode === 'SCIENTIFIC' && key === '0') return 'col-span-2';
    
    // Commercial Spans
    if (subMode === 'COMMERCIAL' && key === '=') return 'col-span-4';
    
    return '';
  };

  return (
    <div className="h-full flex flex-col pb-24 px-4 pt-2 animate-in fade-in duration-500">
      <div className="flex-none flex items-center justify-between mb-2">
         <div className="flex gap-1.5 p-1 bg-slate-900/50 rounded-xl border border-slate-800">
            <button onClick={() => { triggerHaptic(5); setSubMode(subMode === 'SCIENTIFIC' ? 'COMMERCIAL' : 'SCIENTIFIC'); }} className={`px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${subMode === 'SCIENTIFIC' ? 'bg-slate-800 text-white' : 'text-slate-600'}`}>Scientific</button>
            <button onClick={() => { triggerHaptic(5); setSubMode(subMode === 'COMMERCIAL' ? 'SCIENTIFIC' : 'COMMERCIAL'); }} className={`px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${subMode === 'COMMERCIAL' ? 'bg-slate-800 text-white' : 'text-slate-600'}`}>Business</button>
         </div>
         {subMode === 'SCIENTIFIC' && (
           <button onClick={() => { triggerHaptic(5); setAngleMode(angleMode === 'DEG' ? 'RAD' : 'DEG'); }} className="px-4 py-2 bg-cyan-500/5 border border-cyan-500/20 text-cyan-500 text-[8px] font-black rounded-xl uppercase tracking-widest">{angleMode}</button>
         )}
      </div>

      <div className="flex-none h-[25%] min-h-[140px] bg-slate-900/40 rounded-[2rem] border border-slate-800/60 p-6 mb-4 flex flex-col justify-end items-end shadow-2xl backdrop-blur-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-[0.03]"><Sparkles className="w-24 h-24 text-cyan-500" /></div>
        <div className="w-full text-right z-10 flex flex-col h-full justify-between">
          <div className="text-slate-600 text-[9px] font-black uppercase tracking-[0.2em] flex items-center justify-end gap-2 border-b border-slate-800/50 pb-2">
             <History className="w-3 h-3" />
             <span className="truncate max-w-[150px]">{history[0]?.split('=')[0] || 'Ready'}</span>
          </div>
          <div className="flex flex-col justify-end">
            <div ref={displayRef} className="text-slate-400 text-lg font-medium mono whitespace-nowrap overflow-x-auto scrollbar-hide mb-1 opacity-80">
                {expression || '0'}
            </div>
            <div className="text-white text-5xl sm:text-6xl font-black mono truncate tracking-tighter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] leading-none">
                {result || '0'}
            </div>
          </div>
        </div>
      </div>

      <div className={`flex-1 grid gap-2.5 ${subMode === 'SCIENTIFIC' ? 'grid-cols-5 grid-rows-6' : 'grid-cols-4 grid-rows-6'}`}>
        {(subMode === 'SCIENTIFIC' 
          ? ['sin','cos','tan','log','ln','asin','acos','atan','abs','sqrt','7','8','9','/','DEL','4','5','6','*','C','1','2','3','-','Ans','0','.','=','+']
          : ['TAX+','TAX-','GT','/','7','8','9','*','4','5','6','-','1','2','3','+','C','0','.','DEL','=']
        ).map((key) => (
          <button key={key} onClick={() => handlePress(key)} className={`${getButtonClass(key)} ${getSpanClass(key)}`}>
            {key === '*' ? '×' : key === '/' ? '÷' : key}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;

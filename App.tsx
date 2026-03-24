
import React, { useState, useEffect } from 'react';
import { AppMode } from './types';
import Calculator from './components/Calculator';
import Converter from './components/Converter';
import { Calculator as CalcIcon, Repeat, Zap, ShieldCheck, WifiOff, BatteryFull, BatteryLow, Cpu, Info } from 'lucide-react';

// Global haptic feedback utility
export const triggerHaptic = (intensity: number = 10) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(intensity);
  }
};

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('CALCULATOR');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [showSystemInfo, setShowSystemInfo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2000);
    
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        setBatteryLevel(Math.round(battery.level * 100));
        battery.addEventListener('levelchange', () => setBatteryLevel(Math.round(battery.level * 100)));
      });
    }

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center p-8 text-center z-[100] overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent"></div>
        </div>
        <div className="relative mb-10 scale-125">
          <div className="absolute inset-0 bg-cyan-500 blur-[80px] opacity-30 animate-pulse"></div>
          <Zap className="w-20 h-20 text-cyan-400 relative z-10 animate-pulse" />
        </div>
        <h1 className="text-4xl font-black text-white tracking-tighter mb-2">OMNISENSE <span className="text-cyan-500">PRO</span></h1>
        <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mb-12">
          <Cpu className="w-3 h-3" />
          <span>ATHER-X CORE Initializing...</span>
        </div>
        <div className="w-56 h-[2px] bg-slate-900 rounded-full overflow-hidden">
          <div className="h-full bg-cyan-500 animate-[boot_2s_ease-in-out_forwards]"></div>
        </div>
        <style>{`@keyframes boot { 0% { width: 0% } 100% { width: 100% } }`}</style>
      </div>
    );
  }

  return (
    <div className="h-full bg-slate-950 flex flex-col overflow-hidden relative selection:bg-cyan-500/30 safe-pt">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-[-10%] w-[120%] h-[40%] bg-cyan-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-[-10%] w-[120%] h-[40%] bg-indigo-900/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Mini System Bar */}
      <header className="flex-none px-6 py-4 flex items-center justify-between border-b border-slate-900/50 bg-slate-950/20 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Zap className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h2 className="text-sm font-black text-white tracking-tight leading-none uppercase">OmniSense</h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button onClick={() => { triggerHaptic(5); setShowSystemInfo(!showSystemInfo); }} className="p-2 text-slate-500 hover:text-white transition-colors">
              <Info className="w-4 h-4" />
           </button>
           <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-900/50 rounded-full border border-slate-800">
             {batteryLevel !== null && (
                <div className="flex items-center gap-1.5">
                  {batteryLevel > 20 ? <BatteryFull className="w-3 h-3 text-emerald-500" /> : <BatteryLow className="w-3 h-3 text-rose-500" />}
                  <span className="text-[9px] font-black text-slate-300">{batteryLevel}%</span>
                </div>
             )}
             <div className="w-[1px] h-3 bg-slate-800 mx-1"></div>
             {isOffline ? <WifiOff className="w-3 h-3 text-amber-500" /> : <ShieldCheck className="w-3 h-3 text-cyan-500" />}
           </div>
        </div>
      </header>

      {/* Main Content Area - Full Height & No Scroll by default */}
      <main className="flex-1 overflow-hidden relative z-0">
        {mode === 'CALCULATOR' ? (
           <Calculator />
        ) : (
           <div className="h-full overflow-y-auto pb-32 pt-4 px-4 scrollbar-hide">
             <Converter />
           </div>
        )}
      </main>

      {/* Native Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-3xl border-t border-slate-900/80 px-6 pb-8 pt-4 flex items-center justify-around z-50 safe-pb shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <button 
          onClick={() => { triggerHaptic(15); setMode('CALCULATOR'); }}
          className={`flex flex-col items-center gap-1.5 transition-all duration-300 active:scale-95 ${mode === 'CALCULATOR' ? 'text-cyan-400 scale-110' : 'text-slate-600'}`}
        >
          <CalcIcon className="w-6 h-6" />
          <span className="text-[8px] font-black uppercase tracking-widest">Compute</span>
        </button>
        <button 
          onClick={() => { triggerHaptic(15); setMode('CONVERTER'); }}
          className={`flex flex-col items-center gap-1.5 transition-all duration-300 active:scale-95 ${mode === 'CONVERTER' ? 'text-cyan-400 scale-110' : 'text-slate-600'}`}
        >
          <Repeat className="w-6 h-6" />
          <span className="text-[8px] font-black uppercase tracking-widest">Metrics</span>
        </button>
      </nav>

      {/* System Overlay */}
      {showSystemInfo && (
        <div className="fixed inset-0 z-[60] bg-slate-950/90 backdrop-blur-xl p-10 flex flex-col items-center justify-center animate-in fade-in duration-300">
           <Zap className="w-16 h-16 text-cyan-500 mb-6" />
           <h4 className="text-xl font-black text-white mb-2">OmniSense</h4>
           <p className="text-slate-500 text-center text-xs mb-10 max-w-xs leading-relaxed uppercase font-bold tracking-widest">Enterprise grade toolset designed for precision computing and metric synchronization.</p>
           <button onClick={() => setShowSystemInfo(false)} className="px-8 py-3 bg-cyan-500 text-slate-950 font-black rounded-2xl uppercase text-[10px] tracking-widest">Acknowledge</button>
        </div>
      )}
    </div>
  );
};

export default App;

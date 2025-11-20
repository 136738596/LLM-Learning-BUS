import React, { useState } from 'react';
import Roadmap from './components/Roadmap';
import TopicPanel from './components/TopicPanel';
import ChatAssistant from './components/ChatAssistant';
import { RoadmapNode } from './types';

const App: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleNodeClick = (node: RoadmapNode) => {
    setSelectedNode(node);
    setIsPanelOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#0f172a] text-slate-200 relative overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-6 z-10 flex justify-between items-center pointer-events-none">
        <div className="glass-panel px-6 py-3 rounded-full pointer-events-auto border border-white/5 shadow-xl">
           <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400">
             LLM 算法工程师之路
           </h1>
           <p className="text-[10px] text-slate-400 uppercase tracking-widest">Systematic Path: CV to LLM</p>
        </div>
        
        <div className="glass-panel px-4 py-2 rounded-lg text-xs text-slate-400 hidden md:block pointer-events-auto backdrop-blur-md">
           点击节点获取 AI 定制详解 (结合您的 CV/YOLO 背景)
        </div>
      </header>

      {/* Main Stage */}
      <main className="w-full h-screen relative z-0 flex items-center justify-center">
        <Roadmap onNodeClick={handleNodeClick} />
      </main>

      {/* Overlays */}
      <TopicPanel 
        node={selectedNode} 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
      />
      
      <ChatAssistant currentTopic={selectedNode?.title || ''} />

    </div>
  );
};

export default App;
import React, { useEffect, useState } from 'react';
import { RoadmapNode, NodeType } from '../types';
import { NODE_COLORS } from '../constants';
import { generateTopicExplanation } from '../services/gemini';

// Simple Markdown Renderer
const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <div className="prose prose-invert prose-sm max-w-none space-y-4">
      {content.split('```').map((part, index) => {
        if (index % 2 === 1) {
          return (
            <pre key={index} className="bg-[#0b1120] p-4 rounded-lg overflow-x-auto border border-slate-800 text-xs font-mono text-emerald-400 shadow-inner">
              <code>{part.replace(/^typescript|python|bash\n/, '')}</code>
            </pre>
          );
        }
        return <div key={index} className="whitespace-pre-wrap text-slate-300 leading-relaxed">{part}</div>;
      })}
    </div>
  );
};

interface TopicPanelProps {
  node: RoadmapNode | null;
  isOpen: boolean;
  onClose: () => void;
}

const TopicPanel: React.FC<TopicPanelProps> = ({ node, isOpen, onClose }) => {
  const [explanation, setExplanation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (node && isOpen) {
      setLoading(true);
      setExplanation('');
      
      generateTopicExplanation(node.title, node.cvAnalogy || '')
        .then(text => {
          setExplanation(text);
          setLoading(false);
        })
        .catch(() => {
          setExplanation("AI 解释加载失败。");
          setLoading(false);
        });
    }
  }, [node, isOpen]);

  if (!isOpen || !node) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-[700px] bg-[#111827]/95 backdrop-blur-2xl border-l border-slate-800 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 overflow-hidden flex flex-col font-sans">
      {/* Header */}
      <div className="p-8 border-b border-slate-800 flex justify-between items-start bg-gradient-to-b from-slate-900/50 to-transparent">
        <div>
          <div className="flex items-center gap-2 mb-3">
             <span 
                className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px_currentColor]" 
                style={{ backgroundColor: NODE_COLORS[node.type], color: NODE_COLORS[node.type] }}
             />
             <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">{node.type}</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">{node.title}</h2>
          <div className="flex items-start gap-2 text-slate-400 text-sm bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
            <span className="mt-1 min-w-[4px] h-4 bg-blue-500 rounded-full block"></span>
            <p className="italic">"{node.cvAnalogy}"</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        
        {/* Description */}
        <div className="mb-8">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">核心概念</h3>
            <p className="text-lg text-slate-200 leading-relaxed font-light">{node.description}</p>
        </div>

        {/* Resources & Projects Grid */}
        {(node.paperDetails || node.resources || node.projectIdea) && (
            <div className="grid grid-cols-1 gap-6 mb-10">
                {/* Papers */}
                {node.paperDetails && (
                    <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800">
                        <h4 className="flex items-center gap-2 text-indigo-400 font-semibold mb-3">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                            经典论文 (必读)
                        </h4>
                        <ul className="space-y-2">
                            {node.paperDetails.map((paper, idx) => (
                                <li key={idx} className="text-sm text-slate-300 hover:text-indigo-300 transition-colors cursor-default flex items-start gap-2">
                                    <span className="text-slate-600 mt-1">•</span>
                                    {paper}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Project Idea */}
                {node.projectIdea && (
                    <div className="bg-emerald-900/10 rounded-xl p-5 border border-emerald-900/30">
                        <h4 className="flex items-center gap-2 text-emerald-400 font-semibold mb-3">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                            实践项目建议
                        </h4>
                        <p className="text-sm text-slate-300 leading-relaxed">
                            {node.projectIdea}
                        </p>
                    </div>
                )}

                {/* Resources */}
                {node.resources && (
                    <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800">
                        <h4 className="flex items-center gap-2 text-amber-400 font-semibold mb-3">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                            推荐资源 / 代码库
                        </h4>
                        <ul className="space-y-1">
                            {node.resources.map((res, idx) => (
                                <li key={idx} className="text-sm text-slate-400">
                                    <span className="text-slate-600 mr-2">#</span>{res}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        )}

        <div className="border-t border-slate-800 pt-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                   <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">AI 导师深度解析</h3>
                    <p className="text-xs text-slate-500">Powered by Gemini 2.5 • CV/YOLO 背景定制</p>
                </div>
            </div>
            
            {loading ? (
                <div className="space-y-4 animate-pulse">
                    <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-800 rounded w-full"></div>
                    <div className="h-4 bg-slate-800 rounded w-5/6"></div>
                    <div className="h-32 bg-slate-800 rounded w-full mt-4 opacity-50"></div>
                </div>
            ) : (
                <MarkdownRenderer content={explanation} />
            )}
        </div>
      </div>
    </div>
  );
};

export default TopicPanel;
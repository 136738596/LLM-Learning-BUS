import React, { useMemo, useRef, useEffect, useState } from 'react';
import { ROADMAP_DATA, NODE_COLORS } from '../constants';
import { RoadmapNode } from '../types';
import * as d3 from 'd3';

interface RoadmapProps {
  onNodeClick: (node: RoadmapNode) => void;
}

const Roadmap: React.FC<RoadmapProps> = ({ onNodeClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const { nodes, links } = useMemo(() => {
    const root = d3.hierarchy(ROADMAP_DATA);
    
    // Horizontal Tree Layout
    // Increase vertical spacing (dx) and horizontal spacing (dy)
    const treeLayout = d3.tree<RoadmapNode>()
      .size([dimensions.height - 150, dimensions.width - 300])
      .separation((a, b) => (a.parent === b.parent ? 1.5 : 2)); // More space between nodes

    treeLayout(root);
    
    return {
      nodes: root.descendants(),
      links: root.links()
    };
  }, [dimensions]);

  return (
    <div className="w-full h-full overflow-hidden bg-[#0f172a] cursor-move">
      <svg 
        ref={svgRef}
        width={dimensions.width} 
        height={dimensions.height} 
        className="select-none"
        viewBox={`-100 0 ${dimensions.width} ${dimensions.height}`}
      >
        <g transform="translate(80, 50)">
          {/* Links */}
          {links.map((link, i) => {
            // Horizontal Bezier Curve
            // source is on the left, target is on the right
            const sourceY = link.source.x; // d3.tree swaps x and y for horizontal usually, but here we map manually
            const sourceX = link.source.y;
            const targetY = link.target.x;
            const targetX = link.target.y;

            const d = d3.linkHorizontal()
                .x((d: any) => d.y)
                .y((d: any) => d.x)
                (link as any);

            return (
              <path
                key={`link-${i}`}
                d={d || ''}
                fill="none"
                stroke="#334155"
                strokeWidth="2"
                opacity="0.6"
                className="transition-all duration-500"
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node, i) => {
             // Swap x and y for horizontal layout
             const x = node.y;
             const y = node.x;
             
             const isRoot = !node.parent;
             const color = NODE_COLORS[node.data.type];
             
             return (
               <g 
                key={`node-${i}`} 
                transform={`translate(${x},${y})`}
                onClick={(e) => {
                  e.stopPropagation();
                  onNodeClick(node.data);
                }}
                className="cursor-pointer group"
               >
                 {/* Node Glow */}
                 <circle 
                    r={isRoot ? 40 : 25} 
                    className="fill-transparent transition-all duration-300 group-hover:fill-white/5" 
                 />
                 
                 {/* Main Circle */}
                 <circle
                   r={isRoot ? 12 : 8}
                   fill="#1e293b"
                   stroke={color}
                   strokeWidth={isRoot ? 4 : 2}
                   className="transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                 />
                 
                 {/* Label Container */}
                 <foreignObject 
                    x={isRoot ? -100 : 15} 
                    y={isRoot ? -45 : -15} 
                    width={isRoot ? 200 : 220} 
                    height={60}
                    style={{ overflow: 'visible' }}
                 >
                    <div className={`
                        flex flex-col justify-center
                        ${isRoot ? 'items-center text-center' : 'items-start text-left'}
                    `}>
                        <span className={`
                            px-3 py-1 rounded-md backdrop-blur-md border border-slate-700/50 shadow-xl
                            text-sm font-medium transition-all duration-200
                            ${'bg-slate-900/90 text-slate-200 group-hover:text-white group-hover:border-slate-500 group-hover:bg-slate-800'}
                        `}>
                            {node.data.title}
                        </span>
                        {/* Tiny analogy preview below node */}
                        {!isRoot && (
                          <span className="text-[10px] text-slate-500 mt-1 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-[200px] truncate">
                            {node.data.cvAnalogy?.substring(0, 30)}...
                          </span>
                        )}
                    </div>
                 </foreignObject>
               </g>
             );
          })}
        </g>
      </svg>
    </div>
  );
};

export default Roadmap;
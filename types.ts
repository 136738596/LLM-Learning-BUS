export enum NodeType {
  FOUNDATION = 'FOUNDATION',
  ARCHITECTURE = 'ARCHITECTURE',
  TRAINING = 'TRAINING',
  ALIGNMENT = 'ALIGNMENT',
  OPTIMIZATION = 'OPTIMIZATION',
  DEPLOYMENT = 'DEPLOYMENT'
}

export interface RoadmapNode {
  id: string;
  title: string;
  type: NodeType;
  description: string;
  cvAnalogy?: string; // Analogy for a CV/YOLO engineer
  children?: RoadmapNode[];
  
  // New fields for curated content
  paperDetails?: string[]; // List of key papers
  projectIdea?: string; // Specific project proposal
  resources?: string[]; // Courses/Blogs
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  isCode?: boolean;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
}
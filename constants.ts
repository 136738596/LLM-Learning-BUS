import { RoadmapNode, NodeType } from './types';

export const ROADMAP_DATA: RoadmapNode = {
  id: 'root',
  title: 'LLM 算法工程师进阶之路',
  type: NodeType.FOUNDATION,
  description: '从深度学习/CV 背景向大语言模型架构师转型的系统性路径。',
  cvAnalogy: '类似于从传统的图像处理转向基于深度学习的计算机视觉（AlexNet时刻）。',
  children: [
    {
      id: 'phase1',
      title: '第一阶段：NLP 与 Transformer 基础',
      type: NodeType.FOUNDATION,
      description: '掌握处理序列数据的核心范式，理解"注意力"如何取代循环神经网络。',
      cvAnalogy: '图像由像素组成矩阵，文本由Token组成序列。RNN像滑动窗口，Transformer像全图的Non-local Attention。',
      children: [
        {
          id: 'tokenization',
          title: 'Tokenization (分词)',
          type: NodeType.FOUNDATION,
          description: 'BPE (Byte-Pair Encoding), WordPiece, SentencePiece 原理。',
          cvAnalogy: '类似于图像预处理中的 Resize 和 Normalization，将原始数据转为模型可读的 Input ID。',
          resources: ['Hugging Face Tokenizers 文档', 'Google SentencePiece GitHub'],
        },
        {
          id: 'attention',
          title: 'Attention & Mechanism',
          type: NodeType.ARCHITECTURE,
          description: 'Self-Attention, Multi-Head Attention, Cross-Attention, Positional Encoding。',
          cvAnalogy: '类似于 CV 中的 SE-Block (通道注意力) 或 Non-local Network，但在 NLP 中是全连接的全局交互。',
          paperDetails: ['Attention Is All You Need (Vaswani et al., 2017)'],
        },
        {
          id: 'transformer_arch',
          title: 'Transformer 架构详解',
          type: NodeType.ARCHITECTURE,
          description: 'Encoder (BERT-style), Decoder (GPT-style), Encoder-Decoder (T5-style) 的区别与 LayerNorm 位置 (Pre-Norm vs Post-Norm)。',
          cvAnalogy: '类似于 ResNet 中的 Residual Block 结构设计。Encoder 像特征提取器，Decoder 像生成器。',
          projectIdea: '从零用 PyTorch 实现一个 mini-Transformer 并训练它完成简单的序列反转任务。'
        }
      ]
    },
    {
      id: 'phase2',
      title: '第二阶段：主流 LLM 演进',
      type: NodeType.ARCHITECTURE,
      description: '理解从 BERT 到 LLaMA 的架构变迁，以及 Scaling Laws。',
      cvAnalogy: '从 VGG -> ResNet -> EfficientNet -> YOLO 的演进路线。',
      children: [
        {
          id: 'bert_series',
          title: 'Encoder (BERT/RoBERTa)',
          type: NodeType.ARCHITECTURE,
          description: 'Masked Language Modeling (MLM), Next Sentence Prediction (NSP)。',
          cvAnalogy: '类似于 CV 中的 Backbone 预训练 (ImageNet Pre-training)，用于提取强特征。',
          paperDetails: ['BERT: Pre-training of Deep Bidirectional Transformers (Devlin et al., 2018)']
        },
        {
          id: 'gpt_series',
          title: 'Decoder (GPT-1/2/3)',
          type: NodeType.ARCHITECTURE,
          description: 'Causal Language Modeling (Next Token Prediction), In-context Learning。',
          cvAnalogy: '类似于生成对抗网络 (GAN) 或 自回归模型，专注于生成。',
          paperDetails: ['Language Models are Few-Shot Learners (GPT-3 paper)']
        },
        {
          id: 'llama_modern',
          title: '现代 LLM (LLaMA/Mistral)',
          type: NodeType.ARCHITECTURE,
          description: 'RoPE (旋转位置编码), SwiGLU (激活函数), RMSNorm, GQA (分组查询注意力)。',
          cvAnalogy: 'YOLOv3/v4 中的各种 "Bag of Freebies" 技巧 (如 Mish 激活, CSPNet 结构)。',
          paperDetails: ['LLaMA: Open and Efficient Foundation Language Models', 'Mistral 7B'],
          projectIdea: '阅读 LLaMA 源码 (Facebook Research)，对比标准 Transformer 的代码差异。'
        }
      ]
    },
    {
      id: 'phase3',
      title: '第三阶段：预训练与系统工程',
      type: NodeType.TRAINING,
      description: '如何训练千亿参数模型？数据管线与分布式训练基础设施。',
      cvAnalogy: '在 ImageNet 上训练超大 ResNet，需要多机多卡。',
      children: [
        {
          id: 'data_pipeline',
          title: '数据工程',
          type: NodeType.TRAINING,
          description: '数据清洗、去重 (MinHash/SimHash)、质量过滤、混合配比。',
          cvAnalogy: 'CV 中的 Data Augmentation (Mixup, Mosaic) 和数据集清洗。',
          resources: ['RefinedWeb Dataset Paper', 'WanJuan (万卷) Dataset']
        },
        {
          id: 'distributed_training',
          title: '分布式训练框架',
          type: NodeType.TRAINING,
          description: 'Data Parallel (DDP/FSDP), Tensor Parallel (Megatron), Pipeline Parallel, ZeRO (DeepSpeed)。',
          cvAnalogy: 'YOLO训练时的多卡同步 BatchNorm，但 LLM 需要切分模型本身因为显存放不下。',
          resources: ['Megatron-LM 代码库', 'DeepSpeed 教程']
        }
      ]
    },
    {
      id: 'phase4',
      title: '第四阶段：微调与对齐 (SFT & RLHF)',
      type: NodeType.ALIGNMENT,
      description: '让模型听从指令，符合人类价值观。',
      cvAnalogy: '从 ImageNet 预训练权重迁移到 COCO 数据集进行 Object Detection 微调。',
      children: [
        {
          id: 'sft',
          title: '指令微调 (SFT)',
          type: NodeType.ALIGNMENT,
          description: 'Instruction Tuning, Prompt Engineering, Chat 模板构建。',
          cvAnalogy: '在特定数据集上 Fine-tune YOLO，调整最后一层输出头。',
          paperDetails: ['Finetuned Language Models Are Zero-Shot Learners (FLAN)'],
          projectIdea: '使用 Alpaca 或这 Firefly 数据集，对 LLaMA-2-7b 进行 SFT，构建一个垂直领域问答助手。'
        },
        {
          id: 'peft',
          title: '参数高效微调 (PEFT)',
          type: NodeType.OPTIMIZATION,
          description: 'LoRA (Low-Rank Adaptation), QLoRA, P-Tuning, Adapter。',
          cvAnalogy: '类似于只训练模型的最后几层或特定的 BatchNorm 层，冻结 Backbone。',
          paperDetails: ['LoRA: Low-Rank Adaptation of Large Language Models'],
          projectIdea: '使用 Hugging Face PEFT 库实现 LoRA 微调，对比全量微调的显存占用和效果。'
        },
        {
          id: 'rlhf',
          title: 'RLHF & DPO',
          type: NodeType.ALIGNMENT,
          description: 'Reward Modeling, PPO (Proximal Policy Optimization), DPO (Direct Preference Optimization)。',
          cvAnalogy: '类似于使用自定义的 Loss Function (如 IoU Loss, Focal Loss) 强行纠正模型的困难样本行为。',
          paperDetails: ['Training language models to follow instructions with human feedback (InstructGPT)', 'Direct Preference Optimization (DPO)']
        }
      ]
    },
    {
      id: 'phase5',
      title: '第五阶段：推理优化与压缩',
      type: NodeType.OPTIMIZATION,
      description: '模型压缩、量化、加速。这是你结合 YOLO 剪枝经验的绝佳切入点。',
      cvAnalogy: 'YOLO-Nano, MobileNet, 模型剪枝 (Pruning) 与 Int8 量化。',
      children: [
        {
          id: 'quantization',
          title: '模型量化 (Quantization)',
          type: NodeType.OPTIMIZATION,
          description: 'Post-Training Quantization (PTQ), GPTQ, AWQ, 4-bit/8-bit 推理。',
          cvAnalogy: 'TensorRT INT8 加速，权重精度压缩。',
          resources: ['AutoGPTQ', 'BitsAndBytes']
        },
        {
          id: 'pruning_sparsity',
          title: '剪枝与稀疏化',
          type: NodeType.OPTIMIZATION,
          description: '结构化剪枝 (Structured Pruning), SparseGPT, MoE (混合专家模型)。',
          cvAnalogy: '你本科论文研究的 "Network Pruning"，移除冗余的神经元或通道。LLM 中更关注 Attention Head 的剪枝。',
          paperDetails: ['SparseGPT: Massive Language Models Can Be Accurately Pruned in One-Shot'],
          projectIdea: '复现 SparseGPT 算法，尝试对 OPT 或 LLaMA 模型进行不同稀疏度的剪枝实验。'
        },
        {
          id: 'inference_acc',
          title: '推理加速系统',
          type: NodeType.OPTIMIZATION,
          description: 'FlashAttention, PagedAttention (vLLM), Continuous Batching。',
          cvAnalogy: '类似于 CUDA Kernel 优化，提升 GPU 利用率。',
          resources: ['vLLM GitHub', 'FlashAttention Paper']
        }
      ]
    },
    {
      id: 'phase6',
      title: '第六阶段：前沿应用与 RAG',
      type: NodeType.DEPLOYMENT,
      description: 'LangChain, Agents, Vector Database。',
      cvAnalogy: '将 YOLO 集成到自动驾驶系统或监控系统中，配合传统 CV 算法。',
      children: [
        {
          id: 'rag',
          title: 'RAG (检索增强生成)',
          type: NodeType.DEPLOYMENT,
          description: 'Vector Database (Milvus, FAISS), Embedding 模型, Rerank 策略。',
          cvAnalogy: '类似于图像检索 (Image Retrieval) 配合分类网络。',
          projectIdea: '构建一个基于本地知识库 (PDF文档) 的问答系统，使用 LangChain + FAISS + LLaMA。'
        },
        {
          id: 'agents',
          title: 'Agents (智能体)',
          type: NodeType.DEPLOYMENT,
          description: 'ReAct 框架, Tool Use (Function Calling), AutoGPT。',
          cvAnalogy: '类似于机器人控制系统，视觉感知后执行物理动作。',
          paperDetails: ['ReAct: Synergizing Reasoning and Acting in Language Models']
        }
      ]
    }
  ]
};

export const NODE_COLORS = {
  [NodeType.FOUNDATION]: '#94a3b8', // slate-400
  [NodeType.ARCHITECTURE]: '#38bdf8', // sky-400
  [NodeType.TRAINING]: '#fbbf24', // amber-400
  [NodeType.ALIGNMENT]: '#f472b6', // pink-400
  [NodeType.OPTIMIZATION]: '#4ade80', // green-400
  [NodeType.DEPLOYMENT]: '#818cf8', // indigo-400
};
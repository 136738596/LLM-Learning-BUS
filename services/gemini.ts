import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateTopicExplanation = async (
  topic: string, 
  cvAnalogy: string, 
  userBackground: string = "具备深度学习基础的计算机视觉(CV)工程师，熟悉YOLOv3与模型剪枝(Pruning)"
): Promise<string> => {
  if (!process.env.API_KEY) {
    return "Error: API_KEY not found in environment variables.";
  }

  const modelId = 'gemini-2.5-flash';
  const prompt = `
    你是一位世界级的 LLM 算法专家导师。
    你的学生是一位 ${userBackground}。
    
    请详细讲解主题: "${topic}"。
    
    核心要求:
    1. **语言**: 请使用专业、准确的中文。
    2. **类比**: 必须使用计算机视觉 (CV)、YOLO、CNN、ResNet 或 模型剪枝 (Pruning) 相关的概念进行深度类比，帮助学生迁移知识。
    3. **深度**: 解释为什么这对 LLM 至关重要。
    4. **代码**: 如果适用，提供简短的 Python/PyTorch 代码片段（例如 Attention 实现，LoRA 配置等）。
    5. **论文**: 推荐 1-2 篇该领域必读的经典论文。
    
    特定上下文类比线索: ${cvAnalogy}
    
    请使用 Markdown 格式输出。
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    return response.text || "No explanation generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "无法从 Gemini 获取解释，请检查 API Key。";
  }
};

export const generateChatResponse = async (
  history: { role: string; text: string }[], 
  currentMessage: string,
  currentTopic: string
): Promise<string> => {
  if (!process.env.API_KEY) {
    return "Error: API_KEY not found.";
  }

  const modelId = 'gemini-2.5-flash';
  
  const context = `
    当前学习主题: ${currentTopic}。
    用户背景: 计算机视觉(CV)转 LLM 的算法工程师，发表过 YOLOv3 剪枝论文。
    请用中文回答，保持专业性，多用 CV 领域的类比。
  `;
  
  const prompt = `
    ${context}
    用户问题: ${currentMessage}
    
    请简洁、技术性地回答。如果涉及到代码实现，请提供。
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    return response.text || "No response.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Error interacting with Gemini.";
  }
};

import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI (you'll need to add your API key later)
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY || '');

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  async generateResponse(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error('Failed to generate response from Gemini');
    }
  }

  async analyzeCustomerData(customerData: any): Promise<string> {
    const prompt = `
      Analyze the following customer data and provide insights:
      ${JSON.stringify(customerData, null, 2)}
      
      Please provide:
      1. Key metrics summary
      2. Health score assessment
      3. Recommended actions
      4. Potential risks or opportunities
    `;
    
    return this.generateResponse(prompt);
  }

  async summarizeSlackConversation(conversation: string): Promise<string> {
    const prompt = `
      Summarize the following Slack conversation and extract key points:
      ${conversation}
      
      Please provide:
      1. Main discussion topics
      2. Key decisions made
      3. Action items
      4. Important mentions or concerns
    `;
    
    return this.generateResponse(prompt);
  }
}

export const geminiService = new GeminiService();

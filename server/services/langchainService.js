import { ChatGroq } from '@langchain/groq';
import { PromptTemplate } from '@langchain/core/prompts';
import prisma from '../utils/db.js';
import dotenv from 'dotenv';

dotenv.config();

// Llama 3.x models were removed from many free Groq keys.
// Use a currently available free-tier chat model (override with GROQ_MODEL).
const groqModel =  'openai/gpt-oss-20b';

let model;
try {
  model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: groqModel,
    temperature: 0.7,
  });
} catch (e) {
  console.error('Failed to initialize Groq, check API key.', e.message);
}

export const generateEmail = async ({
  topic, tone, audience, additionalInstructions = '', 
  userId
}) => {
  // 1. Fetch User Nature (Profile)
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const userNature = user?.profileSummary || "A professional writing style, tone is adaptable based on instructions.";

  const promptTemplate = PromptTemplate.fromTemplate(
    `You are an expert professional copywriter. Write an email based on the following details.
    
    USER WRITING STYLE (Emulate this nature): {userNature}
    
    Topic: {topic}
    Tone: {tone}
    Audience: {audience}
    Additional Instructions: {additionalInstructions}

    Do not include any pleasantries before or after the email like "Here is your email:". Only output the subject line and the email body.`
  );

  const chain = promptTemplate.pipe(model);

  const response = await chain.invoke({
    topic,
    tone,
    audience,
    additionalInstructions,
    userNature
  });

  return response.content;
};

export const improveEmail = async ({ originalEmail, instructions = '' }) => {
  const promptTemplate = PromptTemplate.fromTemplate(
    `You are an expert professional copywriter. Please review and improve the following email draft. Make it sound more professional, fix any grammatical errors, and ensure it flows well.
    
    Original Email:
    {originalEmail}

    Specific Instructions: {instructions}

    Do not include any pleasantries before or after the email like "Here is the improved email:". Only output the subject line and the improved email body.`
  );

  const chain = promptTemplate.pipe(model);

  const response = await chain.invoke({
    originalEmail,
    instructions,
  });

  return response.content;
};

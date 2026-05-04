import prisma from "../utils/db.js";
import { ChatGroq } from "@langchain/groq";

export const analyzeUserNature = async (userId) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return "User not found.";
    
    const recentEmails = await prisma.email.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5
    });
    
    if (recentEmails.length < 1) {
      return "No emails found to analyze. Start generating some!";
    }
    
    const emailTexts = recentEmails.map(e => e.content).join("\n---\n");
    
    const model = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: "llama-3.1-8b-instant",
    });

    const response = await model.invoke([
      ["system", "You are an expert writing style analyzer. Based on the user's previously generated emails, summarize their 'writing nature' in 1-2 concise, professional sentences. Focus on tone, structure, and persona. If there's only one email, do your best guess."],
      ["user", `Emails for Analysis:\n${emailTexts}`]
    ]);
    
    await prisma.user.update({
      where: { id: userId },
      data: { profileSummary: response.content }
    });
    
    return response.content;
  } catch (error) {
    console.error("User nature analysis failed:", error);
    throw error;
  }
};

"use server";

import { summarizeChat, type SummarizeChatInput } from "@/ai/flows/summarize-chat";
import { z } from "zod";

const actionSchema = z.object({
  messages: z.array(z.string()),
});

export async function getSummary(input: SummarizeChatInput) {
  const parsedInput = actionSchema.safeParse(input);
  if (!parsedInput.success) {
    throw new Error("Invalid input for summarization.");
  }

  try {
    const result = await summarizeChat(parsedInput.data);
    return result;
  } catch (error) {
    console.error("Error summarizing chat:", error);
    throw new Error("Failed to generate summary.");
  }
}

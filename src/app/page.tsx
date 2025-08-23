"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Message } from "@/lib/types";
import { getSummary } from "./actions";
import { ChatLayout } from "@/components/chat/chat-layout";

export default function Home() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      author: "GitChat Bot",
      message:
        "Welcome to GitChat! I can help you understand this repository. Ask me anything or ask me to summarize the conversation.",
      type: "bot",
    },
  ]);
  const [isSummarizing, startSummaryTransition] = useTransition();
  const messageEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string) => {
    const newUserMessage: Message = {
      id: Date.now(),
      author: "You",
      message: text,
      type: "user",
    };

    // Simulate a bot reply for demonstration
    const botReply: Message = {
      id: Date.now() + 1,
      author: "GitChat Bot",
      message: `Thanks for your message! As a demo, I'm just echoing your thoughts. In a real app, I'd connect to GitHub APIs to answer questions about this repo.`,
      type: "bot",
    };

    setMessages((prev) => [...prev, newUserMessage, botReply]);
  };

  const handleSummarize = () => {
    startSummaryTransition(async () => {
      const recentMessages = messages
        .filter((m) => m.type !== "summary") // Don't summarize previous summaries
        .slice(-10)
        .map((m) => `${m.author}: ${m.message}`);

      if (recentMessages.length < 2) {
        toast({
          title: "Not enough messages",
          description: "Please have a longer conversation before summarizing.",
        });
        return;
      }

      try {
        const result = await getSummary({ messages: recentMessages });
        const summaryMessage: Message = {
          id: Date.now(),
          author: "Summary",
          message: result.summary,
          type: "summary",
        };
        setMessages((prev) => [...prev, summaryMessage]);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to generate summary. Please try again later.",
          variant: "destructive",
        });
        console.error(error);
      }
    });
  };

  return (
    <ChatLayout
      messages={messages}
      isSummarizing={isSummarizing}
      onSendMessage={handleSendMessage}
      onSummarize={handleSummarize}
      messageEndRef={messageEndRef}
    />
  );
}

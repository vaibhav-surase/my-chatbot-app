"use client";

import type { RefObject } from "react";
import { Bot, Github, Loader2 } from "lucide-react";
import type { Message } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ChatInput } from "./chat-input";
import { ChatMessage } from "./chat-message";

type ChatLayoutProps = {
  messages: Message[];
  isSummarizing: boolean;
  onSendMessage: (message: string) => void;
  onSummarize: () => void;
  messageEndRef: RefObject<HTMLDivElement>;
};

export function ChatLayout({
  messages,
  isSummarizing,
  onSendMessage,
  onSummarize,
  messageEndRef,
}: ChatLayoutProps) {
  return (
    <main className="flex flex-col h-full w-full items-center justify-center bg-background p-4 md:p-8">
      <Card className="w-full max-w-4xl h-full flex flex-col shadow-2xl rounded-xl">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <Github className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold font-headline">GitChat</CardTitle>
                <p className="text-sm text-muted-foreground">
                  github.com/firebase/genkit
                </p>
              </div>
            </div>
            <Button
              onClick={onSummarize}
              disabled={isSummarizing}
              variant="outline"
              className="hidden sm:flex"
            >
              {isSummarizing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Bot className="mr-2 h-4 w-4" />
              )}
              Summarize
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full">
            <div className="p-4 sm:p-6">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              <div ref={messageEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <Separator />
        <CardFooter className="p-4">
          <ChatInput onSendMessage={onSendMessage} isLoading={isSummarizing} />
        </CardFooter>
      </Card>
    </main>
  );
}

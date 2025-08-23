import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Message } from "@/lib/types";
import { Bot, User, BrainCircuit } from "lucide-react";

export function ChatMessage({ message: msg }: { message: Message }) {
  const isUser = msg.type === "user";
  const isSummary = msg.type === "summary";

  return (
    <div
      className={cn(
        "flex items-start gap-3 my-4 animate-in fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback
            className={cn(
              isSummary ? "bg-accent text-accent-foreground" : "bg-secondary"
            )}
          >
            {isSummary ? (
              <BrainCircuit size={18} />
            ) : (
              <Bot size={18} />
            )}
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[75%] rounded-lg p-3 text-sm shadow-md",
          isUser
            ? "bg-primary text-primary-foreground"
            : isSummary
            ? "bg-accent/20 border border-accent/50 text-foreground"
            : "bg-card border"
        )}
      >
        {!isUser && <p className="font-bold mb-1">{msg.author}</p>}
        <p className="whitespace-pre-wrap">{msg.message}</p>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-secondary">
            <User size={18} />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

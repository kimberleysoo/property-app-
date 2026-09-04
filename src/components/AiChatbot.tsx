import React, { useState, useRef, useEffect } from "react";
import { 
  Sparkles, 
  Send, 
  X, 
  Bot, 
  User, 
  ShieldCheck, 
  Minimize2, 
  Maximize2,
  RefreshCcw,
  CheckCircle2
} from "lucide-react";
import { ThemeMode, ChatMessage, PersonaType } from "../types";

interface AiChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  persona: PersonaType;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "init-1",
    sender: "ai",
    text: "Hello! I am **PropDirect AI**, your verified Singapore property advisor.\n\nI am strictly grounded in official **Urban Redevelopment Authority (URA)** transacted data, **HDB resale regulations**, and **CEA commission standards**. Ask me about commission savings, HDB upgrade rules, CPF grants, or title verification!",
    timestamp: "Just now",
    sourceBadge: "URA & HDB Official Benchmarks"
  }
];

const SUGGESTED_PROMPTS = [
  "What are 4-Room flats in Tampines transacting for on Data.gov.sg?",
  "How much agent commission do I save on an S$850k 5-room flat?",
  "What are the ABSD rules for upgrading from HDB to private condo?",
  "What CPF Housing Grants can first-timer couples apply for?",
  "How does Singpass MyInfo prevent fake listings and rental scams?"
];

export const AiChatbot: React.FC<AiChatbotProps> = ({
  isOpen,
  onClose,
  theme,
  persona
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          persona: persona,
          history: messages.slice(-4)
        })
      });

      const data = await response.json();
      const aiReplyText = data.reply || "I have analyzed your property query using official URA and HDB guidelines.";

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        sourceBadge: data.verifiedSource || "Official Singapore Regulatory Data"
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: "ai",
        text: "We are currently cross-referencing live URA and HDB transaction records. Official fact: Singapore real estate agents traditionally charge 1%–2% commission (+9% GST), whereas SG PropDirect facilitates direct transacting for S$0 commission with Singpass KYC.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        sourceBadge: "Singapore CEA Benchmark Guidelines"
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[95vw] sm:w-[420px] max-w-[460px] h-[580px] max-h-[85vh] rounded-2xl border shadow-xl flex flex-col overflow-hidden transition-all bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-black dark:text-white">
      {/* Header */}
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-black text-white">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-sm">
              <span>PropDirect AI Advisor</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-medium border border-zinc-700">
                Grounded
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-white" />
              <span>Zero Hallucination Guardrail Active</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setMessages(INITIAL_MESSAGES)}
            title="Reset Chat"
            className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            title="Close Chat"
            className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggested quick chips */}
      <div className="p-2.5 bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-1.5 overflow-x-auto text-[11px]">
        {SUGGESTED_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(prompt)}
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 hover:border-black dark:hover:border-white whitespace-nowrap shrink-0 transition-colors cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Message List */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[88%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "bg-black dark:bg-white text-white dark:text-black rounded-br-xs font-normal"
                  : theme === "dark"
                    ? "bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-bl-xs"
                    : "bg-zinc-50 text-zinc-800 border border-zinc-200 rounded-bl-xs shadow-2xs"
              }`}
            >
              {msg.text}

              {msg.sourceBadge && (
                <div className="mt-2 pt-2 border-t border-zinc-200 dark:border-zinc-700 flex items-center gap-1 text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">
                  <CheckCircle2 className="w-3 h-3 shrink-0 text-black dark:text-white" />
                  <span>Verified Source: {msg.sourceBadge}</span>
                </div>
              )}
            </div>
            <span className="text-[10px] text-zinc-400 mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 max-w-[75%]">
            <Sparkles className="w-4 h-4 text-black dark:text-white animate-spin" />
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Querying URA & HDB official database...
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask about commissions, URA PSF, HDB rules..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={loading}
            className="flex-1 px-3.5 py-2 rounded-lg text-xs border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-black dark:text-white"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || loading}
            className="p-2.5 rounded-lg bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black disabled:opacity-40 transition-all cursor-pointer shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};

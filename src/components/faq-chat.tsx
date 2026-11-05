"use client";

import { useEffect, useRef, useState } from "react";
import type { PublicFaqNode } from "@/lib/faq";

type FaqOption = {
  label: string;
  answer: string;
  next?: string;
  action?: "quote" | "contact" | "end";
};

type FaqNode = {
  prompt: string;
  options: FaqOption[];
};

type ChatMessage = {
  id: number;
  text: string;
  from: "bot" | "user" | "thinking";
};

const demoFaqTree: Record<string, FaqNode> = {
  main: {
    prompt: "What would you like to know about?",
    options: [
      { label: "Cleaning services", answer: "I can help you explore the six services listed by the company.", next: "services" },
      { label: "Scheduling & booking", answer: "I can explain how an estimate request works and what happens next.", next: "booking" },
      { label: "Service area", answer: "The team can confirm service coverage when you share your ZIP code.", next: "area" },
      { label: "Preparing for a clean", answer: "Let’s go over a few common preparation questions.", next: "preparation" },
      { label: "Request an estimate", answer: "Share a few details using the estimate request form. The team will follow up; a request is not an appointment.", action: "quote" },
    ],
  },
  services: {
    prompt: "Which service would you like to learn about?",
    options: [
      { label: "Car Detailing", answer: "Share what you need for this service. The team can discuss the requested scope and availability.", next: "booking" },
      { label: "Carpet Cleaning", answer: "Share what you need for this service. The team can discuss the requested scope and availability.", next: "booking" },
      { label: "Upholstery Cleaning", answer: "Share what you need for this service. The team can discuss the requested scope and availability.", next: "booking" },
      { label: "Move-in / Move-out Cleaning", answer: "Share what you need for this service. The team can discuss the requested scope and availability.", next: "booking" },
      { label: "Residential Deep Cleaning", answer: "Share what you need for this service. The team can discuss the requested scope and availability.", next: "booking" },
      { label: "Post-Construction Cleaning", answer: "Share what you need for this service. The team can discuss the requested scope and availability.", next: "booking" },
    ],
  },
  booking: {
    prompt: "What would you like to know about requesting a clean?",
    options: [
      { label: "Does a request confirm a booking?", answer: "No. A request is not a confirmed appointment. The team must confirm service details and availability.", next: "booking" },
      { label: "Can I request a certain date?", answer: "You can share a preferred date with the team, but availability must be confirmed directly.", next: "booking" },
      { label: "What happens after I submit?", answer: "Staff can review your request and follow up to discuss details and availability. This is not a confirmed appointment.", next: "area" },
    ],
  },
  area: {
    prompt: "How can I check whether service is available where I live?",
    options: [
      { label: "Which cities do you serve?", answer: "We serve Aurora and Denver, Colorado, and may serve more areas. Please share your ZIP code so we can confirm whether your location is within our service area.", next: "area" },
      { label: "Can I check by ZIP code?", answer: "Please share your ZIP code in an estimate request so the team can confirm whether your location is within our service area.", next: "booking" },
      { label: "Is the map available?", answer: "The map will be added after the service area is confirmed.", next: "area" },
    ],
  },
  preparation: {
    prompt: "What would you like to know before a cleaning?",
    options: [
      { label: "Should I tidy up first?", answer: "A quick pickup may help make surfaces easier to reach. Confirm preparation recommendations with the business.", next: "preparation" },
      { label: "Are supplies provided?", answer: "Crown brings its own cleaning supplies. Contact the team to discuss any product sensitivities or preferences.", next: "care" },
      { label: "What about pets?", answer: "Tell the business about pets and any instructions before a visit. Its safety and access procedures need confirmation.", next: "care" },
      { label: "Share special instructions", answer: "Use the message field to share relevant cleaning details. Do not include access codes or sensitive information.", next: "booking" },
    ],
  },
  care: {
    prompt: "What would you like to confirm about the team or your home?",
    options: [
      { label: "Are products provided?", answer: "Crown brings its own cleaning supplies. Mention any product sensitivities or preferences when you contact the team.", next: "preparation" },
      { label: "Can I request fragrance-free products?", answer: "Share product preferences or sensitivities with the team and confirm what can be accommodated.", next: "preparation" },
      { label: "How are belongings protected?", answer: "Ask the business about its home-care procedures and how to flag fragile items before a visit.", next: "care" },
    ],
  },
};

const THINKING_DELAY_MS = 3000;

export default function FaqChat({
  publishedNodes,
}: {
  publishedNodes: PublicFaqNode[] | null;
}) {
  const faqTree: Record<string, FaqNode> = publishedNodes
    ? Object.fromEntries(
        publishedNodes.map((node) => [
          node.id,
          {
            prompt: node.prompt,
            options: node.options.map((option) => ({
              label: option.label,
              answer: option.answer,
              ...(option.next_node_id ? { next: option.next_node_id } : {}),
              ...(option.action ? { action: option.action } : {}),
            })),
          },
        ]),
      )
    : demoFaqTree;
  const rootNode =
    publishedNodes?.find((node) => node.is_root)?.id ?? "main";
  const [isOpen, setIsOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [activeNode, setActiveNode] = useState(rootNode);
  const nextMessageId = useRef(0);
  const thinkingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firstOption = useRef<HTMLButtonElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const chatLog = useRef<HTMLDivElement>(null);

  const node = faqTree[activeNode] ?? faqTree[rootNode];

  function appendMessage(text: string, from: ChatMessage["from"]) {
    const id = nextMessageId.current++;
    setMessages((current) => [...current, { id, text, from }]);
  }

  function openChat() {
    setIsOpen(true);
    if (messages.length === 0) {
      appendMessage(faqTree[rootNode].prompt, "bot");
    }
  }

  function closeChat() {
    setIsOpen(false);
    launcher.current?.focus();
  }

  function selectOption(option: FaqOption) {
    if (isThinking) return;

    appendMessage(option.label, "user");
    setIsThinking(true);
    appendMessage("Thinking", "thinking");

    thinkingTimer.current = setTimeout(() => {
      setMessages((current) => current.filter((message) => message.from !== "thinking"));
      appendMessage(option.answer, "bot");

      if (option.action === "quote") {
        setActiveNode(rootNode);
        document.querySelector("#quote")?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (option.action === "contact") {
        setActiveNode(rootNode);
        window.location.assign("/contact");
      } else if (
        option.next &&
        faqTree[option.next]
      ) {
        setActiveNode(option.next);
        appendMessage(faqTree[option.next].prompt, "bot");
      } else {
        setActiveNode(rootNode);
      }

      setIsThinking(false);
    }, THINKING_DELAY_MS);
  }

  useEffect(() => {
    if (isOpen && !isThinking) firstOption.current?.focus();
  }, [isOpen, isThinking, activeNode]);

  useEffect(() => {
    if (chatLog.current) chatLog.current.scrollTop = chatLog.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) closeChat();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(
    () => () => {
      if (thinkingTimer.current) clearTimeout(thinkingTimer.current);
    },
    [],
  );

  return (
    <>
      <button
        className="chat-launcher"
        ref={launcher}
        type="button"
        aria-label="Open frequently asked questions"
        aria-expanded={isOpen}
        aria-controls="faq-chat"
        onClick={() => (isOpen ? closeChat() : openChat())}
      >
        <svg className="chat-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5 8 8 0 0 1-3.4-.8L4 20l1.8-4.1A7.5 7.5 0 1 1 20 11.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M8.5 11.5h.01m3.49 0h.01m3.49 0h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
        <span>Questions?</span>
      </button>

      <section className={`faq-chat${isOpen ? " is-open" : ""}`} id="faq-chat" aria-label="Frequently asked questions" aria-hidden={!isOpen} inert={!isOpen}>
        <div className="chat-header">
          <div className="chat-avatar" aria-hidden="true">✳</div>
          <div><strong>Crown Cleaning assistant</strong><small>Choose a question to get started</small></div>
          <button className="chat-close" type="button" aria-label="Close FAQ" onClick={closeChat}>×</button>
        </div>
        <div className="chat-messages" ref={chatLog} aria-live="polite" aria-relevant="additions">
          {messages.map((message) => (
            <div
              className={`${message.from === "user" ? "user-message" : "bot-message"}${message.from === "thinking" ? " thinking-message" : ""}`}
              key={message.id}
              role={message.from === "thinking" ? "status" : undefined}
            >
              {message.from === "thinking" ? (
                <><span className="thinking-label">Thinking</span><span className="thinking-dots" aria-hidden="true"><i /><i /><i /></span></>
              ) : message.text}
            </div>
          ))}
        </div>
        <div className="chat-options">
          {node.options.map((option, index) => (
            <button
              className="chat-option"
              disabled={isThinking}
              key={option.label}
              ref={index === 0 ? firstOption : undefined}
              type="button"
              onClick={() => selectOption(option)}
            >
              {option.label}
            </button>
          ))}
          {activeNode !== rootNode && (
            <button
              className="chat-option chat-option-back"
              disabled={isThinking}
              type="button"
              onClick={() => {
                appendMessage("Main questions", "user");
                appendMessage(faqTree[rootNode].prompt, "bot");
                setActiveNode(rootNode);
              }}
            >
              ← Main questions
            </button>
          )}
        </div>
        <div className="chat-footer">Guided FAQ demo · Responses are predefined, not AI-generated</div>
      </section>
    </>
  );
}

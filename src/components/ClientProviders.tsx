"use client";
import AutoRefreshBar from "@/components/AutoRefreshBar";
import ChatBot from "@/components/ChatBot";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AutoRefreshBar />
      {children}
      <ChatBot />
    </>
  );
}

"use client";

import Image from "next/image";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ResponseStream } from "./response-stream";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

export default function Agent({ userName }: AgentProps) {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [lastMessage, setLastMessage] = useState<string>("Lorem");

  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="Vapi"
              width={65}
              height={54}
              className="object-cover"
            />

            {isSpeaking && <span className="animate-speak" />}
          </div>

          <h3>AI Interviewer</h3>
        </div>

        <div className="card-border">
          <div className="card-content">
            <div className="avatar">
              <Avatar className="size-[122px] bg-light-100">
                <AvatarFallback className="bg-light-100 text-light-800 font-medium">
                  CN
                </AvatarFallback>
              </Avatar>

              {!isSpeaking && <span className="animate-speak" />}
            </div>

            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length >= 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <ResponseStream
              textStream={lastMessage}
              mode="typewriter"
              className="text-sm"
              fadeDuration={1200}
            />
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button className="relative btn-call">
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />

            <span>
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : "..."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect">End Call</button>
        )}
      </div>
    </>
  );
}

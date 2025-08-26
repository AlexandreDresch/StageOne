"use client";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import {
  MessageCircleCode,
  MessageCircleMore,
  MessageCirclePlus,
} from "lucide-react";

export default function InterviewCard({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) {
  const feedback = null as Feedback | null;
  const normalizedType = /mix/gi.test(type)
    ? "Mixed"
    : /tech/gi.test(type)
    ? "Technical"
    : "Behavioral";
  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  return (
    <div className="card-border w-[360px] max-sm:full min-h-96">
      <div className="card-interview">
        <div>
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
            <p className="badge-text">{normalizedType}</p>
          </div>

          <div
            className={`aspect-square rounded-lg flex items-center justify-center ${
              normalizedType === "Technical"
                ? "bg-gradient-to-br from-pink-500 to-purple-600"
                : normalizedType === "Mixed"
                ? "bg-gradient-to-br from-blue-500 to-green-500"
                : "bg-gradient-to-br from-purple-500 to-pink-500"
            }`}
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {normalizedType === "Technical" ? (
                <MessageCircleCode className="size-12 text-white" />
              ) : normalizedType === "Mixed" ? (
                <MessageCirclePlus className="size-12 text-white" />
              ) : (
                <MessageCircleMore className="size-12 text-white" />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

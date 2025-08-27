"use client";

import dayjs from "dayjs";
import { motion } from "framer-motion";
import {
  Calendar,
  MessageCircleCode,
  MessageCircleMore,
  MessageCirclePlus,
  Star,
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import TechIcons from "./tech-icons";

export default function InterviewCard({
  interviewId,
  userId,
  role,
  type,
  createdAt,
  techIcons,
}: InterviewCardProps & { techIcons: { tech: string; url?: string }[] }) {
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
          <div
            className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg 
                bg-light-600/30 backdrop-blur-md shadow-sm"
          >
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
              className="flex items-center justify-center"
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

          <h3 className="mt-5 capitalize">{role} Interview</h3>

          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <Calendar className="size-5 text-light-400" />
              <p className="text-sm text-light-400">{formattedDate}</p>
            </div>

            <div className="flex flex-row gap-2">
              <Star className="size-5 text-yellow-400" />
              <p className="text-sm text-light-400">
                {feedback?.totalScore || "---"} / 100
              </p>
            </div>
          </div>

          <p className="line-clamp-2 mt-5">
            {feedback?.finalAssessment ||
              "You have not taken this interview yet."}
          </p>
        </div>

        <div className="flex flex-row justify-between">
          <TechIcons techIcons={techIcons} />

          <Button className="btn-primary">
            <Link
              href={
                feedback
                  ? `/${userId}/interviews/${interviewId}/feedback`
                  : `/${userId}/interviews/${interviewId}`
              }
            >
              {feedback ? "View Feedback" : "Take Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

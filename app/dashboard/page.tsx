import InterviewCard from "@/components/interview-card";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import { getTechLogos } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Dashboard() {
  const interviewsWithTech = await Promise.all(
    dummyInterviews.map(async (i) => ({
      ...i,
      techIcons: await getTechLogos(i.techstack),
    }))
  );

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice on real interview questions and get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start Practicing</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="Dashboard Illustration"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {interviewsWithTech.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}

          {interviewsWithTech.length === 0 && (
            <p className="text-slate-100/50">
              You have no interviews.{" "}
              <Link href="/interview" className="text-primary-100 underline">
                Start practicing now!
              </Link>
            </p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>

        <div className="interviews-section">
          <p className="text-slate-100/50">
            No interviews available. Please check back later.
          </p>
        </div>
      </section>
    </>
  );
}

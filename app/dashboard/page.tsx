 
import InterviewCard from "@/components/interview-card";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";
import { getTechLogos } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Dashboard() {
  const user = await getCurrentUser();

  const [userInterviews = [], latestInterviews = []] = await Promise.all([
    getInterviewsByUserId(user?.id ?? ""),
    getLatestInterviews({ userId: user?.id ?? "" }),
  ]);

  const addTechIcons = async (
    interviews: typeof userInterviews | null | undefined
  ) =>
    Promise.all(
      (interviews ?? []).map(async (i) => ({
        ...i,
        techIcons: await getTechLogos(i.techstack),
      }))
    );

  const [userInterviewsWithTech, latestInterviewsWithTech] = await Promise.all([
    addTechIcons(userInterviews),
    addTechIcons(latestInterviews),
  ]);

  const hasPastInterviews = (userInterviews ?? []).length > 0;
  const hasUpcomingInterviews = (latestInterviews ?? []).length > 0;

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
          {hasPastInterviews ? (
            userInterviewsWithTech?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
                techIcons={interview.techIcons}
              />
            ))
          ) : (
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
          {hasUpcomingInterviews ? (
            latestInterviewsWithTech?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
                techIcons={interview.techIcons}
              />
            ))
          ) : (
            <p className="text-slate-100/50">
              No interviews available. Please check back later.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

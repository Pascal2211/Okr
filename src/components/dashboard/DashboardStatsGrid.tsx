import { Target } from "lucide-react";
import { StatCard } from "./StatCard";
import { useRouter } from "next/navigation";
import { PersonalRecentActivityCard } from "./PersonalRecentActivityCard";

interface DashboardStatsGridProps {
  stats: {
    activeObjectives: number;
    completedObjectives: number;
    keyResults: number;
    teamMembers: number;
  };
  teamInfo: any | null;
  isTeamView: boolean;
}

export const DashboardStatsGrid = ({
  stats,
  teamInfo,
  isTeamView,
}: DashboardStatsGridProps) => {
  const router = useRouter();

  const navigateToObjectives = (status?: string) => {
    const state = {
      openTeamTab: isTeamView,
      teamId: teamInfo?.id,
      filter: status,
    };
    router.push("/team");
  };

  return (
    <div
      className={`grid gap-6 ${
        isTeamView ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-1 lg:grid-cols-4"
      }`}
    >
      <StatCard
        title="Active Objectives"
        value={stats.activeObjectives}
        icon={Target}
        description="Objectives in progress"
        isTeam={isTeamView}
        onClick={() => navigateToObjectives("active")}
      />

      <StatCard
        title="Completed Objectives"
        value={stats.completedObjectives}
        icon={Target}
        description="Successfully finished"
        isTeam={isTeamView}
        onClick={() => navigateToObjectives("completed")}
        iconBgColor="bg-green-100"
        iconColor="text-green-700"
      />

      {isTeamView ? (
        <>
          <StatCard
            title="Key Results"
            value={stats.keyResults}
            icon={Target}
            description="Total key results"
          />
          <StatCard
            title="Team Members"
            value={stats.teamMembers}
            icon={Target}
            description="Active team members"
          />
        </>
      ) : (
        <PersonalRecentActivityCard />
      )}
    </div>
  );
};
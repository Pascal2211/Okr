"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardStatsGrid } from "./DashboardStatsGrid";
import { TeamStatusCard } from "./TeamStatusCard";
import { RecentActivityCard } from "./RecentActivityCard";
import { PersonalObjectivesList } from "../objectives/PersonalObjectivesList";
import { TeamObjectivesList } from "../objectives/TeamObjectivesList";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { ObjectiveProgressChart } from "./ObjectiveProgressChart";

export function DashboardContent() {
  const { stats, teamStats, teamInfo, objectives, teamObjectives } = useDashboardStats();

  // Map teamStats to the expected stats format
  const mappedTeamStats = {
    activeObjectives: teamStats.activeTeamObjectives,
    completedObjectives: teamStats.completedTeamObjectives,
    keyResults: 0, // Team stats don't include keyResults count
    teamMembers: teamStats.teamMembers,
  };

  return (
    <div className="w-full max-w-screen-2xl ml-4 mr-2 py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your OKRs</p>
      </div>
      
      <Tabs defaultValue="personal">
        <TabsList>
          <TabsTrigger value="personal">Personal Objectives</TabsTrigger>
          <TabsTrigger value="team">Team Objectives</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 mt-4">
          <DashboardStatsGrid 
            stats={stats} 
            teamInfo={null} 
            isTeamView={false} 
          />
          <ObjectiveProgressChart objectives={objectives} />
          <h1 className="text-2xl font-bold">Objectives</h1>
          <PersonalObjectivesList />
        </TabsContent>

        <TabsContent value="team" className="space-y-4 mt-4">
          <DashboardStatsGrid 
            stats={mappedTeamStats} 
            teamInfo={teamInfo} 
            isTeamView={true} 
          />
          <ObjectiveProgressChart objectives={teamObjectives} />
          <div className="grid gap-6 grid-cols-2">
            <TeamStatusCard 
              activeObjectives={teamStats.activeTeamObjectives} 
              completedObjectives={teamStats.completedTeamObjectives} 
            />
            <RecentActivityCard />
          </div>
          <h1 className="text-2xl font-bold">Team Objectives</h1>
          {teamInfo?.id && <TeamObjectivesList teamId={teamInfo.id} />}
        </TabsContent>
      </Tabs>
    </div>
  );
}
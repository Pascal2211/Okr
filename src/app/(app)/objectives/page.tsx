// FILE: src/app/objectives/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { ObjectivesHeader } from "@/components/objectives/ObjectivesHeader";
import { ObjectiveCreator } from "@/components/objectives/ObjectiveCreator";
import { useObjectives } from "@/hooks/useObjectives";
import { useTeams } from "@/hooks/useTeams";
import { useAuth } from "@/hooks/use-auth";
import { ObjectiveProvider } from "@/contexts/ObjectiveContext";
import { PersonalObjectivesList } from "@/components/objectives/PersonalObjectivesList";
import { TeamObjectivesList } from "@/components/objectives/TeamObjectivesList";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ValuesObjectiveCard } from "@/components/objectives/ValuesObjectiveCard";
import Link from "next/link";
import { StandardObjectiveCard } from "@/components/objectives/StandardObjectiveCard";
import { KeyResultsObjectiveCard } from "@/components/objectives/KeyResultsObjectiveCard";
import { Objective } from "@/types/objectives";

const ObjectivesPage = () => {
  const {
    isLoading: objectivesLoading,
    objectives,
    selectedTeam,
    setSelectedTeam,
    fetchObjectives,
  } = useObjectives();

  const {
    teams,
    isLoading: teamsLoading,
  } = useTeams();

  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>("personal");
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const lastFetchedTeamRef = useRef<string | null>(null);

  // Debug logging
  useEffect(() => {
    console.log("ObjectivesPage state:", {
      teams: teams.length,
      selectedTeam,
      activeTab,
      user: user?.uid,
      teamsLoading
    });
  }, [teams, selectedTeam, activeTab, user, teamsLoading]);

  // Auto-select first team when teams are loaded and user is on team tab
  useEffect(() => {
    if (teams.length > 0 && activeTab === "teams") {
      console.log("Auto-selecting team. Available teams:", teams);
      
      if (!selectedTeam) {
        const firstTeam = teams[0];
        console.log("Setting selected team to:", firstTeam.id);
        setSelectedTeam(firstTeam.id);
        lastFetchedTeamRef.current = firstTeam.id;
        fetchObjectives(firstTeam.id);
      } else if (lastFetchedTeamRef.current !== selectedTeam) {
        console.log("Team already selected but not fetched yet:", selectedTeam);
        lastFetchedTeamRef.current = selectedTeam;
        fetchObjectives(selectedTeam);
      } else {
        console.log("Team already selected and fetched:", selectedTeam);
      }
    }
  }, [teams, activeTab, setSelectedTeam, fetchObjectives]);

  useEffect(() => {
    const handleInitialLoad = async () => {
      try {
        const openTeamTab = searchParams.get("openTeamTab");
        const teamId = searchParams.get("teamId");
        const filter = searchParams.get("filter");

        if (filter) setStatusFilter(filter);

        if (openTeamTab) {
          setActiveTab("teams");
          if (teamId) {
            setSelectedTeam(teamId);
            await fetchObjectives(teamId);
          } else if (teams.length > 0) {
            setSelectedTeam(teams[0].id);
            await fetchObjectives(teams[0].id);
          } else {
            await fetchObjectives(null);
          }
        } else {
          await fetchObjectives(null);
        }

        setInitialFetchDone(true);
      } catch (error) {
        console.error("Error in handleInitialLoad:", error);
        setInitialFetchDone(true);
      }
    };

    if (!initialFetchDone && user && teams.length > 0) {
      handleInitialLoad();
    }
  }, [teams, searchParams, fetchObjectives, setSelectedTeam, initialFetchDone, user]);

  const handleTabChange = async (value: string) => {
    console.log("Tab changed to:", value);
    setActiveTab(value);
    
    if (value === "personal") {
      lastFetchedTeamRef.current = null;
      await fetchObjectives(null);
    } else if (value === "teams") {
      // Wait for teams to load if they're still loading
      if (teamsLoading) {
        console.log("Teams still loading, waiting...");
        return;
      }
      
      if (teams.length > 0) {
        const selected = selectedTeam || teams[0].id;
        console.log("Setting team for tab change:", selected);
        setSelectedTeam(selected);
        
        // Only fetch if we haven't already fetched for this team
        if (lastFetchedTeamRef.current !== selected) {
          lastFetchedTeamRef.current = selected;
          await fetchObjectives(selected);
        } else {
          console.log("Already fetched objectives for team:", selected);
        }
      } else {
        console.log("No teams available for user");
        lastFetchedTeamRef.current = null;
        await fetchObjectives(null);
      }
    }
  };

  // const getFilteredObjectives = () => {
  //   let filtered = objectives;

  //   if (activeTab === "personal" && user) {
  //     filtered = filtered.filter(
  //       (obj) => obj.personalObjective === true && obj.user_id === user.uid
  //     );
  //   } else if (activeTab === "teams") {
  //     filtered = filtered.filter((obj) => obj.personalObjective === false);
  //   }

  //   if (statusFilter) {
  //     if (statusFilter === "active") {
  //       filtered = filtered.filter((obj) => obj.status !== "completed");
  //     } else if (statusFilter === "completed") {
  //       filtered = filtered.filter((obj) => obj.status === "completed");
  //     }
  //   }

  //   return filtered;
  // };

  const isLoading = objectivesLoading || teamsLoading;

  // const renderObjectiveByType = (objective: Objective) => {
  //   switch(objective.type) {
  //     case "standard":
  //       console.log("Rendering StandardObjectiveCard");
  //       return <StandardObjectiveCard objective={objective} />;
  //     case "key_results":
  //       console.log("Rendering KeyResultsObjectiveCard");
  //       return <KeyResultsObjectiveCard objective={objective} />;
  //     // ...
  //   }
  // };

  return (
    <ObjectiveProvider activeTab={activeTab} selectedTeam={selectedTeam}>
      <div className="max-w-screen-2xl mx-auto w-full px-6 space-y-6 min-h-screen">
        <div className="flex justify-between items-center">
          <ObjectivesHeader />
        </div>

        {isLoading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-6">
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <TabsList className="grid w-full md:w-auto grid-cols-2 md:inline-flex">
                  <TabsTrigger value="personal">Personal Objectives</TabsTrigger>
                  <TabsTrigger value="teams">Team Objectives</TabsTrigger>
                </TabsList>

                <ObjectiveCreator />
              </div>

              <TabsContent value="personal">
                <PersonalObjectivesList />
              </TabsContent>

              <TabsContent value="teams">
                {selectedTeam && <TeamObjectivesList teamId={selectedTeam} />}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </ObjectiveProvider>
  );
};

export default ObjectivesPage;

// Company Values List Page (exported at the bottom)

export function CompanyValuesPage() {
  const { objectives, fetchObjectives, isLoading } = useObjectives();
  useEffect(() => { fetchObjectives(null); }, [fetchObjectives]);
  const valuesObjectives = objectives.filter(obj => obj.type === "values");
  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (valuesObjectives.length === 0) return <div className="p-8 text-center">No company values found.</div>;
  // Meta info from the first values objective
  const meta = valuesObjectives[0];
  return (
    <div className="w-full max-w-4xl mx-auto py-10">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">{meta.title || "Company Values"}</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-lg text-muted-foreground">
          {meta.description}
        </CardContent>
      </Card>
      <div className="space-y-6">
        {valuesObjectives.map((obj) => (
          <Link key={obj.id} href={`/objectives/${obj.id}`} className="block">
            <ValuesObjectiveCard objective={obj} />
          </Link>
        ))}
      </div>
    </div>
  );
}

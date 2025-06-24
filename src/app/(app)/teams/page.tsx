"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useTeam } from "@/contexts/teamContext";
import { CreateTeamForm } from "@/components/team/CreateTeamForm";
import { JoinTeamForm } from "@/components/team/JoinTeamForm";
import { TeamDetailCard } from "@/components/team/TeamDetailCard";
import { TeamProvider } from "@/contexts/teamContext";
import TitleInvitationCodeCard from "@/components/team/TitleInvitationCodeCard";

const TeamContent = () => {
  const { currentTeam, isLoading } = useTeam();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4">
      <div className="flex flex-col w-full mt-10 min-h-screen">
        {/* Main Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Team Management</h1>
            <p className="text-muted-foreground">Manage your team and members</p>
          </div>
          {currentTeam && (
            <Card className="bg-blue-50 border-blue-100 w-full">
              <CardContent className="pt-6">
                <TitleInvitationCodeCard
                  teamName={currentTeam.name}
                  invitationCode={currentTeam.code}
                />
              </CardContent>
            </Card>
          )}
          {currentTeam ? (
            <div className="grid gap-6 md:grid-cols-2">
              <TeamDetailCard />
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Create a Team</CardTitle>
                  <CardDescription>
                    Start a new team for your company or project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CreateTeamForm />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Join a Team</CardTitle>
                  <CardDescription>
                    Enter a team code to join an existing team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <JoinTeamForm />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
        {/* Bottom Section: Team Members & Activity Log */}

      </div>
    </div>
  );
};

const Team = () => {
  return (
    <TeamProvider>
      <TeamContent />
    </TeamProvider>
  );
};

export default Team;
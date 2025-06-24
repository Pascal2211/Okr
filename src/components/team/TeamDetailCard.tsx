"use client"
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Copy, Loader2, Target, User, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTeam } from "@/contexts/teamContext";
import { useToast } from "@/hooks/use-toast";

export const TeamDetailCard = () => {
  const { currentTeam, teamMembers, teamOwner, isActionLoading, copyTeamCode, leaveTeam } = useTeam();
  const router = useRouter();
  const { toast } = useToast();

  if (!currentTeam) return null;

  const navigateToTeamObjectives = () => {
    router.push(`/objectives?openTeamTab=true&teamId=${currentTeam.id}`);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMMM dd, yyyy");
  };

  const handleCopyCode = () => {
    copyTeamCode();
    toast({
      title: "Code copied!",
      description: `The team code ${currentTeam.code} has been copied to clipboard.`,
    });
  };

  return (
    <Card className="col-span-2 bg-white shadow-xl rounded-2xl border border-gray-100">
      <CardHeader className="bg-white rounded-t-2xl border-b border-gray-100 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <CardTitle className="text-2xl font-bold text-gray-900">{currentTeam.name}</CardTitle>
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg border border-gray-200">
            <span className="font-medium text-gray-700">Invitation Code:</span>
            <code className="font-mono text-base text-blue-700 bg-blue-50 px-2 py-0.5 rounded">{currentTeam.code}</code>
            <Button size="icon" variant="ghost" className="h-7 w-7 text-blue-700 hover:bg-blue-100" onClick={handleCopyCode}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-8 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-gray-700">
              <Calendar className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Created on:</span>
              <span className="ml-1">{formatDate(currentTeam.created_at)}</span>
            </div>
            {teamOwner && (
              <div className="flex items-center gap-3 text-gray-700">
                <User className="h-5 w-5 text-blue-500" />
                <span className="font-medium">Created by:</span>
                <span className="ml-1">{teamOwner.full_name}</span>
              </div>
            )}
            <div className="flex flex-wrap gap-3 mt-4">
              <Button variant="outline" onClick={handleCopyCode} className="flex items-center gap-2">
                <Copy className="h-4 w-4" /> Copy Invitation Code
              </Button>
              <Button onClick={navigateToTeamObjectives} className="flex items-center gap-2 bg-black text-white hover:bg-gray-900">
                <Target className="h-4 w-4" /> Team Objectives
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900">Team Members <span className="text-gray-500">({teamMembers.length})</span></h3>
            <div className="bg-gray-50 rounded-lg p-4 max-h-[200px] overflow-y-auto border border-gray-200">
              {teamMembers.length > 0 ? (
                <ul className="space-y-2">
                  {teamMembers
                    .filter((member) => member && member.full_name)
                    .map((member) => (
                      <li key={member.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 transition">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                          {member.full_name?.charAt(0).toUpperCase() || "?"}
                        </div>
                        <span className="text-gray-800">{member.full_name}</span>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-center py-4">No team members found.</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-100 pt-6 flex justify-end bg-white rounded-b-2xl">
        <Button 
          variant="destructive" 
          onClick={leaveTeam}
          disabled={isActionLoading}
          className="px-6 py-2 text-base font-semibold"
        >
          {isActionLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <XCircle className="mr-2 h-4 w-4" />
              Leave Team
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Copy } from "lucide-react";
import { useTeam } from "@/contexts/teamContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export const CreateTeamForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const { createTeam, isActionLoading, currentTeam, copyTeamCode } = useTeam();
  const { toast } = useToast();

  const handleCreateTeam = async () => {
    if (!teamName.trim()) return;
    
    setIsCreating(true);
    try {
      await createTeam(teamName);
      setTeamName("");
    } catch (error) {
      console.error("Error creating team:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleCopyCode = () => {
    if (currentTeam?.code) {
      copyTeamCode();
      toast({
        title: "Code copied!",
        description: "The team code has been copied to clipboard.",
      });
    }
  };

  if (!showForm) {
    return (
      <Button onClick={() => setShowForm(true)}>
        Create a Team
      </Button>
    );
  }

  if (currentTeam) {
    return (
      <Card className="bg-green-50 border-green-100">
        <CardHeader>
          <CardTitle className="text-green-700">Team Created Successfully!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-700 mb-2">
            Your team has been created. Share this invitation code with your team members:
          </p>
          <div className="bg-white p-3 rounded-md border border-green-200 flex justify-between items-center">
            <code className="font-mono text-lg font-medium">{currentTeam.code}</code>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleCopyCode}
              className="ml-2 text-green-700 hover:bg-green-100"
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setShowForm(false)}
          className="bg-green-600 hover:bg-green-700">
            Done
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="teamName">Team Name</Label>
        <Input
          id="teamName"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Engineering Team"
        />
      </div>
      <div className="flex space-x-2">
        <Button 
          onClick={handleCreateTeam} 
          disabled={isCreating || isActionLoading || !teamName.trim()}
        >
          {isCreating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : "Create Team"}
        </Button>
        <Button 
          variant="outline" 
          onClick={() => setShowForm(false)}
          disabled={isCreating}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

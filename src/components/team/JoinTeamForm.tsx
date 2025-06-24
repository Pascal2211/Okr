"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, UserPlus } from "lucide-react";
import { useTeam } from "@/contexts/teamContext";

export const JoinTeamForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [teamCode, setTeamCode] = useState("");
  const [isInvalidCode, setIsInvalidCode] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const { joinTeam, isActionLoading } = useTeam();

  const handleJoinTeam = async () => {
    if (!teamCode.trim()) {
      setIsInvalidCode(true);
      return;
    }
    
    setIsInvalidCode(false);
    setIsJoining(true);
    try {
      await joinTeam(teamCode);
      setTeamCode("");
      setShowForm(false);
    } catch (error) {
      setIsInvalidCode(true);
    } finally {
      setIsJoining(false);
    }
  };

  if (!showForm) {
    return (
      <Button onClick={() => setShowForm(true)}>
        <UserPlus className="mr-2 h-4 w-4" />
        Join a Team
      </Button>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="teamCode">Team Invitation Code</Label>
        <Input
          id="teamCode"
          value={teamCode}
          onChange={(e) => {
            setTeamCode(e.target.value);
            setIsInvalidCode(false);
          }}
          placeholder="Enter invitation code (e.g. XYZ123)"
          className={isInvalidCode ? "border-destructive" : ""}
        />
        {isInvalidCode && (
          <p className="text-destructive text-sm mt-1">
            Invalid team code. Please check and try again.
          </p>
        )}
      </div>
      <div className="flex space-x-2">
        <Button 
          onClick={handleJoinTeam} 
          disabled={isJoining || isActionLoading}
        >
          {isJoining ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Joining...
            </>
          ) : "Join Team"}
        </Button>
        <Button 
          variant="outline" 
          onClick={() => setShowForm(false)}
          disabled={isJoining}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

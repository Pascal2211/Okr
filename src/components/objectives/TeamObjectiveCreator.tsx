"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/integrations/firebase/firebase";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

interface User {
  firstName: string;
  lastName: string;
}

interface TeamObjectiveCreatorProps {
  teamId: string;
}

export function TeamObjectiveCreator({ teamId }: TeamObjectiveCreatorProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const user = auth.currentUser;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data() as User;

      const objectiveData = {
        title,
        description,
        type: "team",
        status: "not_started",
        personalObjective: false,
        owner: `${userData.firstName} ${userData.lastName}`,
        user_id: user.uid,
        team_id: teamId,
        key_results: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, "objectives"), objectiveData);
      setOpen(false);
      setTitle("");
      setDescription("");
      router.push(`/objectives/${docRef.id}`);
    } catch (error) {
      console.error("Error creating team objective:", error);
      alert("Failed to create team objective");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Team Objective
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Team Objective</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Team Objective"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
} 
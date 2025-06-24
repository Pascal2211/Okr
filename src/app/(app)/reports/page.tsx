"use client";

import { useState, useEffect } from "react";
import { useObjectives } from "@/hooks/useObjectives";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Loader2,
  BarChart3,
  User,
  Users,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { auth } from "@/integrations/firebase/firebase";

const ReportsPage = () => {
  const {
    isLoading,
    objectives,
    fetchObjectives,
    selectedTeam,
    setSelectedTeam,
  } = useObjectives();
  const [reportType, setReportType] = useState<"personal" | "company">("personal");
  const [timeFrame, setTimeFrame] = useState<"daily" | "weekly" | "monthly">("monthly");

  const user = auth.currentUser;

  useEffect(() => {
    const load = async () => {
      await fetchObjectives(null);
    };
    load();
  }, [fetchObjectives]);

  const isPersonal = reportType === "personal";

  const filteredObjectives = objectives.filter((obj) =>
    isPersonal
      ? obj.personalObjective === true && obj.user_id === user?.uid
      : obj.personalObjective === false && obj.team_id === selectedTeam
  );

  const completedObjectives = filteredObjectives.filter(
    (obj) => obj.status === "completed"
  );
  const activeObjectives = filteredObjectives.filter(
    (obj) => obj.status !== "completed"
  );

  const getCompletionData = () => {
    return timeFrame === "monthly"
      ? [
          { name: "Jan", completed: 5 },
          { name: "Feb", completed: 8 },
          { name: "Mar", completed: 6 },
          { name: "Apr", completed: 10 },
          { name: "May", completed: 3 },
        ]
      : timeFrame === "weekly"
      ? [
          { name: "Week 1", completed: 2 },
          { name: "Week 2", completed: 4 },
          { name: "Week 3", completed: 3 },
          { name: "Week 4", completed: 5 },
        ]
      : [
          { name: "Mon", completed: 1 },
          { name: "Tue", completed: 2 },
          { name: "Wed", completed: 1 },
          { name: "Thu", completed: 3 },
          { name: "Fri", completed: 0 },
          { name: "Sat", completed: 1 },
          { name: "Sun", completed: 2 },
        ];
  };

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-6 py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">Track your OKRs and progress</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setReportType("personal");
                  setSelectedTeam(null);
                  fetchObjectives(null);
                }}
                className={`px-4 py-2 rounded-md flex items-center text-sm ${
                  reportType === "personal"
                    ? "bg-primary text-white"
                    : "bg-muted"
                }`}
              >
                <User className="w-4 h-4 mr-2" /> Personal
              </button>
              <button
                onClick={() => setReportType("company")}
                className={`px-4 py-2 rounded-md flex items-center text-sm ${
                  reportType === "company"
                    ? "bg-primary text-white"
                    : "bg-muted"
                }`}
              >
                <Users className="w-4 h-4 mr-2" /> Team
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Objectives</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {activeObjectives.length}
                </div>
                <p className="text-muted-foreground text-sm">
                  Currently in progress
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Completed Objectives</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {completedObjectives.length}
                </div>
                <p className="text-muted-foreground text-sm">
                  Successfully finished
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {filteredObjectives.length > 0
                    ? `${Math.round(
                        (completedObjectives.length /
                          filteredObjectives.length) *
                          100
                      )}%`
                    : "0%"}
                </div>
                <Progress
                  value={
                    filteredObjectives.length > 0
                      ? (completedObjectives.length /
                          filteredObjectives.length) *
                        100
                      : 0
                  }
                  className="h-2 mt-2"
                />
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Objectives Completed
              </CardTitle>
              <div className="flex space-x-2 mt-3">
                {["daily", "weekly", "monthly"].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeFrame(tf as unknown as "daily" | "weekly" | "monthly")}
                    className={`px-3 py-1 text-xs rounded-md ${
                      timeFrame === tf ? "bg-primary text-white" : "bg-muted"
                    }`}
                  >
                    {tf.charAt(0).toUpperCase() + tf.slice(1)}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getCompletionData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill="#0D3B46" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default ReportsPage;
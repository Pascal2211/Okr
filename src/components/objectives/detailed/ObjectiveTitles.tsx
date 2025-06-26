"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/integrations/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Objective } from "@/types/objectives";

// interface KeyResultCardProps {
//   keyResult: unknown;
// }

// const KeyResultCard = ({ keyResult }: KeyResultCardProps) => {
//   return (
//     <Card className="w-full px-4 py-4">
//       <CardHeader>
//         <CardTitle className="text-lg font-semibold">{keyResult.keyResult}</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-2 text-sm text-muted-foreground">
//         <p><span className="font-medium">Explanation:</span> {keyResult.explanation}</p>
//         <div className="flex justify-between">
//           <p><strong>Baseline:</strong> {keyResult.baseline}</p>
//           <p><strong>Current:</strong> {keyResult.current}</p>
//           <p><strong>Target:</strong> {keyResult.target}</p>
//         </div>
//         <p><strong>Owner:</strong> {keyResult.owner}</p>
//         <p><strong>Comment:</strong> {keyResult.comment}</p>
//       </CardContent>
//     </Card>
//   );
// };

export default function ObjectiveTitles() {
  const { id } = useParams();
  const [objective, setObjective] = useState<Objective | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchObjective = async () => {
      const ref = doc(db, "objectives", id as string);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setObjective({ id: snapshot.id, ...snapshot.data() } as Objective);
      }
      setLoading(false);
    };

    fetchObjective();
  }, [id]);

  // const handleEdit = async (updates: Partial<any>) => {
  //   if (!id) return;
  //   const ref = doc(db, "objectives", id as string);
  //   await updateDoc(ref, {
  //     ...updates,
  //     updated_at: new Date().toISOString(),
  //   });
  // };

  if (loading || !objective) {
    return <div className="p-8 text-white">Loading...</div>;
  }

  return (
    <div className="w-full max-w-screen-2xl ml-4 mr-2 py-6 space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold">Detailed Objective</h1>
        <p className="text-muted-foreground">Your choosen objective in detail</p>
      </div>

      {/* Type buttons */}
      <Card className="w-full">
  <CardHeader>
    <CardTitle className="text-3xl font-bold text-black">{objective.title}</CardTitle>
  </CardHeader>
</Card>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Objectives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-muted-foreground text-sm">Currently in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed Objectives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">6</div>
            <p className="text-muted-foreground text-sm">Successfully finished</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">66%</div>
            <Progress value={66} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Bar chart card */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Objectives Completed
          </CardTitle>

          {/* Timeframe buttons */}
          <div className="flex space-x-2 mt-3">
            {["Daily", "Weekly", "Monthly"].map((label) => (
              <button
                key={label}
                className="px-3 py-1 text-xs rounded-md bg-muted"
              >
                {label}
              </button>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          <div className="h-80 w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
            Chart Placeholder
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

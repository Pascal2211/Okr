"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Objective } from '@/types/objectives';
import { calculateObjectiveProgress } from '@/lib/progress';

interface ObjectiveProgressChartProps {
  objectives: Objective[];
}

export const ObjectiveProgressChart = ({ objectives }: ObjectiveProgressChartProps) => {
  const activeObjectives = objectives.filter(obj => obj.status !== 'completed');

  const chartData = activeObjectives.map(obj => ({
    name: obj.title.length > 30 ? `${obj.title.substring(0, 30)}...` : obj.title,
    progress: calculateObjectiveProgress(obj),
  }));

  if (activeObjectives.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Objective Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            No active objectives to display.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress per Objective</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis type="number" domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
            <YAxis type="category" dataKey="name" width={150} />
            <Tooltip formatter={(value: number) => [`${value.toFixed(0)}%`, "Progress"]} />
            <Legend />
            <Bar dataKey="progress" fill="#8884d8" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}; 
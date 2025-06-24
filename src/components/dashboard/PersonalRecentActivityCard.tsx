import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePersonalObjectiveActivity } from "@/hooks/usePersonalObjectiveActivity";

export const PersonalRecentActivityCard = ({ fullWidth = false }: { fullWidth?: boolean }) => {

    const personalRecentActivities = usePersonalObjectiveActivity();

  return (
    <Card className={fullWidth ? "w-full" : "col-span-2"}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {personalRecentActivities.map((activity, index) => (
            <div key={index}>
                <p>{`You ${activity.type} "${activity.title}" at ${activity.timestamp}`}</p>
            </div>
        ))}
      </CardContent>
    </Card>
  );
};
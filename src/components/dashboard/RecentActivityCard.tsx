import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";



import { usePersonalObjectiveActivity } from "@/hooks/usePersonalObjectiveActivity";

export const RecentActivityCard = () => {
  const activities = usePersonalObjectiveActivity();

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <p className="text-muted-foreground text-center">
            No recent activity. Start by creating an objective!
          </p>
        ) : (
          <ul className="space-y-2 text-sm">
            {activities.map((activity, i) => (
              <li key={i}>
                <strong>{activity.type}</strong> — <em>{activity.title}</em> at {activity.timestamp}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
import { Objective } from "@/types/objectives";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface ValuesObjectiveCardProps {
  objective: Objective;
}

export const ValuesObjectiveCard = ({ objective }: ValuesObjectiveCardProps) => {
  const router = useRouter();
  const isCompleted = objective.status === "completed";
  const firstValue = objective.values && objective.values.length > 0 ? objective.values[0] : null;

  return (
    <Card
      onClick={() => router.push(`/objectives/${objective.id}`)}
      className={`w-full h-full min-w-[520px] mb-6 cursor-pointer ${isCompleted ? 'bg-[#F2FCE2] border-green-200' : ''}`}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="line-clamp-2 text-black">{objective.title}</CardTitle>
        {isCompleted && <div className="rounded-full bg-green-100 p-1"><Check className="h-4 w-4 text-green-700" /></div>}
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-base font-semibold text-[#0D3B46]">
          {firstValue ? firstValue.value : "No value"}
        </p>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {firstValue ? firstValue.explanation : "No explanation"}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* Optionally add owner, created date, etc. here if desired */}
      </CardFooter>
    </Card>
  );
};

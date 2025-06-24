
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { ExternalLink } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description: string;
  isTeam?: boolean;
  onClick?: () => void;
  iconColor?: string;
  iconBgColor?: string;
}

export const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  isTeam, 
  onClick,
  iconColor,
  iconBgColor
}: StatCardProps) => {
  return (
    <Card 
      className={`${onClick ? 'cursor-pointer transition-transform hover:scale-[1.02]' : ''}`}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {isTeam !== undefined && (
            <Badge variant="secondary" className={`ml-2 ${isTeam ? 'bg-[#0EA5E9] text-white' : 'bg-[#8B5CF6] text-white'}`}>
              {isTeam ? "Company" : "Personal"}
            </Badge>
          )}
        </div>
        {iconBgColor ? (
          <div className={`rounded-full ${iconBgColor} p-1`}>
            <Icon className={`h-3 w-3 ${iconColor}`} />
          </div>
        ) : (
          <Icon className="h-4 w-4 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center">
          {description}
          {onClick && <ExternalLink className="h-3 w-3 ml-1" />}
        </p>
      </CardContent>
    </Card>
  );
};

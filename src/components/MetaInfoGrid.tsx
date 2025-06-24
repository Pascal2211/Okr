import { Card, CardContent } from "@/components/ui/card";
import { User, Calendar, Target, TrendingUp } from "lucide-react";

interface MetaInfoGridProps {
  owner: string;
  createdAt: string;
  type: string;
  statLabel: string;
  statValue: string | number;
}

export default function MetaInfoGrid({
  owner,
  createdAt,
  type,
  statLabel,
  statValue,
}: MetaInfoGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Owner</p>
              <p className="font-semibold text-gray-900">{owner}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Created</p>
              <p className="font-semibold text-gray-900">{createdAt}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Target className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Type</p>
              <p className="font-semibold text-gray-900 capitalize">{type}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-orange-500" />
            <div>
              <p className="text-sm text-gray-500">{statLabel}</p>
              <p className="font-semibold text-gray-900">{statValue}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
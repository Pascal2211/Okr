
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Team } from "@/types/objectives";

interface TeamSelectorProps {
  teams?: Team[]; // Gjør denne valgfri
  selectedTeam: string | null;
  setSelectedTeam: (teamId: string | null) => void;
}

export const TeamSelector = ({ teams = [], selectedTeam, setSelectedTeam }: TeamSelectorProps) => {
  // Nå er teams alltid en array, selv om det ikke sendes inn
  if (teams.length === 0) return null;

  return (
    <select
      value={selectedTeam || ""}
      onChange={(e) => setSelectedTeam(e.target.value)}
    >
      {teams.map((team) => (
        <option key={team.id} value={team.id}>
          {team.name}
        </option>
      ))}
    </select>
  );
};

// interface TeamSelectorProps {
//   teams: Team[];
//   selectedTeam: string | null;
//   setSelectedTeam: React.Dispatch<React.SetStateAction<string | null>>;
// }

// export const TeamSelector = ({ teams, selectedTeam, setSelectedTeam }: TeamSelectorProps) => {
//   if (teams.length === 0) return null;
  
//   return (
//     <div className="space-y-2">
//       <Label htmlFor="team">Team (Optional)</Label>
//       <Select 
//         value={selectedTeam || "personal"}
//         onValueChange={(value) => setSelectedTeam(value === "personal" ? null : value)}
//       >
//         <SelectTrigger id="team">
//           <SelectValue placeholder="Select team" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="personal">Personal Objective</SelectItem>
//           {teams.map((team) => (
//             <SelectItem key={team.id} value={team.id}>
//               {team.name}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//     </div>
//   );
// };

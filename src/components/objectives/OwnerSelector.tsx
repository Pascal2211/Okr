
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OwnerSelectorProps {
  formData: {
    owner: string;
    [key: string]: string;
  };
  setFormData: (formData: any) => void;
  currentUserFullName: string;
  teamMembers: {id: string, full_name: string}[];
}

export const OwnerSelector = ({ 
  formData, 
  setFormData, 
  currentUserFullName, 
  teamMembers 
}: OwnerSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="owner">Assign to</Label>
      <Select 
        value={formData.owner}
        onValueChange={(value) => setFormData({...formData, owner: value})}
      >
        <SelectTrigger id="owner">
          <SelectValue placeholder="Select owner" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={currentUserFullName || "Me"}>
            {currentUserFullName || "Me"} (You)
          </SelectItem>
          {teamMembers
            .filter(member => member.full_name !== currentUserFullName)
            .map((member) => (
              <SelectItem key={member.id} value={member.full_name}>
                {member.full_name}
              </SelectItem>
            ))
          }
        </SelectContent>
      </Select>
    </div>
  );
};

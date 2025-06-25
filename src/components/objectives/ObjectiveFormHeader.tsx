
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ObjectiveFormHeaderProps {
  formData: {
    title: string;
    description: string;
    [key: string]: string;
  };
  setFormData: (formData: unknown) => void;
}

export const ObjectiveFormHeader = ({ formData, setFormData }: ObjectiveFormHeaderProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows={3}
        />
      </div>
    </>
  );
};

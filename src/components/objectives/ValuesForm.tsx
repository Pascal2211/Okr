
import { Value } from "@/types/objectives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

interface ValuesFormProps {
  values: Value[];
  setValues: React.Dispatch<React.SetStateAction<Value[]>>;
}

export const ValuesForm = ({ values, setValues }: ValuesFormProps) => {
  const addValue = () => {
    const newValue: Value = {
      id: crypto.randomUUID(),
      value: "",
      explanation: ""
    };
    setValues([...values, newValue]);
  };
  
  const updateValue = (id: string, field: keyof Value, value: string) => {
    setValues(values.map(v => 
      v.id === id ? { ...v, [field]: value } : v
    ));
  };
  
  const removeValue = (id: string) => {
    setValues(values.filter(v => v.id !== id));
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label>Company Values</Label>
        <Button type="button" size="sm" onClick={addValue}>
          <Plus className="mr-1 h-4 w-4" /> Add Value
        </Button>
      </div>
      
      {values.length === 0 ? (
        <div className="border border-dashed border-gray-300 rounded p-4 text-center text-muted-foreground">
          No values added yet. Click the button above to add one.
        </div>
      ) : (
        <div className="space-y-4">
          {values.map((value, index) => (
            <div key={value.id} className="border rounded p-4 space-y-4 relative">
              <Button 
                type="button" 
                variant="destructive" 
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => removeValue(value.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              
              <div className="font-semibold">Value #{index + 1}</div>
              
              <div className="space-y-2">
                <Label>Value</Label>
                <Input
                  value={value.value}
                  onChange={(e) => updateValue(value.id, 'value', e.target.value)}
                  placeholder="Enter company value"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Explanation</Label>
                <Textarea
                  value={value.explanation}
                  onChange={(e) => updateValue(value.id, 'explanation', e.target.value)}
                  placeholder="Explain what this value means"
                  required
                  rows={2}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

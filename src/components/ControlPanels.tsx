import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {Play, Pause} from "lucide-react";

interface ControlPanelProps {
  isRecognizing: boolean;
  onToggle: () => void;
}

export default function ControlPanel({
  isRecognizing,
  onToggle,
}: ControlPanelProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Switch
            id="recognition-mode"
            checked={isRecognizing}
            onCheckedChange={onToggle}
          />
          <Label htmlFor="recognition-mode">Recognition Mode</Label>
        </div>
        <Button
          variant={isRecognizing ? "destructive" : "default"}
          onClick={onToggle}
          className="w-48">
          {isRecognizing ? (
            <>
              <Pause className="mr-2 h-4 w-4" /> Stop Recognition
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" /> Start Recognition
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

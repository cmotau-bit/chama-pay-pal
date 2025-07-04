
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const ContributionSettings = () => {
  const [settings, setSettings] = useState({
    monthlyGoal: 20000,
    reminderDay: "25",
    autoReminders: true,
    reminderFrequency: "weekly"
  });

  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your contribution settings have been updated.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Contribution Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="monthlyGoal">Monthly Goal (KES)</Label>
          <Input
            id="monthlyGoal"
            type="number"
            value={settings.monthlyGoal}
            onChange={(e) => setSettings({...settings, monthlyGoal: parseInt(e.target.value) || 0})}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reminderDay">Reminder Day of Month</Label>
          <Select 
            value={settings.reminderDay} 
            onValueChange={(value) => setSettings({...settings, reminderDay: value})}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({length: 28}, (_, i) => i + 1).map(day => (
                <SelectItem key={day} value={day.toString()}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="reminderFreq">Reminder Frequency</Label>
          <Select 
            value={settings.reminderFrequency} 
            onValueChange={(value) => setSettings({...settings, reminderFrequency: value})}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="autoReminders">Auto Reminders</Label>
          <Switch
            id="autoReminders"
            checked={settings.autoReminders}
            onCheckedChange={(checked) => setSettings({...settings, autoReminders: checked})}
          />
        </div>

        <Button 
          onClick={handleSaveSettings}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          Save Settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default ContributionSettings;


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, Clock, TrendingUp, Plus, Bell, FileText } from "lucide-react";
import MemberList from "@/components/MemberList";
import AddMemberDialog from "@/components/AddMemberDialog";
import ContributionSettings from "@/components/ContributionSettings";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [members, setMembers] = useState([
    { id: 1, name: "Mary Wanjiku", phone: "+254712345678", contribution: 5000, status: "paid" as const, lastPayment: "2024-07-01" },
    { id: 2, name: "John Kamau", phone: "+254723456789", contribution: 3000, status: "pending" as const, lastPayment: "2024-06-15" },
    { id: 3, name: "Grace Njeri", phone: "+254734567890", contribution: 5000, status: "paid" as const, lastPayment: "2024-07-02" },
    { id: 4, name: "Peter Mwangi", phone: "+254745678901", contribution: 0, status: "overdue" as const, lastPayment: "2024-05-20" },
  ]);

  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [contributionGoal] = useState(20000);
  const { toast } = useToast();

  const totalContributions = members.reduce((sum, member) => sum + member.contribution, 0);
  const progressPercentage = (totalContributions / contributionGoal) * 100;
  const paidMembers = members.filter(m => m.status === "paid").length;
  const pendingMembers = members.filter(m => m.status === "pending").length;
  const overdueMembers = members.filter(m => m.status === "overdue").length;

  const handleAddMember = (memberData: any) => {
    const newMember = {
      id: members.length + 1,
      ...memberData,
      contribution: 0,
      status: "pending" as const,
      lastPayment: new Date().toISOString().split('T')[0]
    };
    setMembers([...members, newMember]);
    toast({
      title: "Member Added",
      description: `${memberData.name} has been added to the chama.`,
    });
  };

  const handleSendReminders = () => {
    const unpaidMembers = members.filter(m => m.status !== "paid");
    toast({
      title: "Reminders Sent",
      description: `WhatsApp reminders sent to ${unpaidMembers.length} members.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Chama Payment Bot</h1>
              <p className="text-sm text-gray-600">Automated payment reminders & tracking</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                onClick={handleSendReminders}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Bell className="w-4 h-4 mr-2" />
                Send Reminders
              </Button>
              <Button 
                onClick={() => setIsAddMemberOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Contributions</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">KES {totalContributions.toLocaleString()}</div>
              <p className="text-xs text-gray-500">
                {progressPercentage.toFixed(1)}% of goal reached
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Members</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">{members.length}</div>
              <p className="text-xs text-gray-500">
                {paidMembers} paid this month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Payments</CardTitle>
              <Clock className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-700">{pendingMembers}</div>
              <p className="text-xs text-gray-500">
                {overdueMembers} overdue
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Monthly Goal</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">KES {contributionGoal.toLocaleString()}</div>
              <p className="text-xs text-gray-500">
                KES {(contributionGoal - totalContributions).toLocaleString()} remaining
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <CardHeader>
            <CardTitle className="text-white">Monthly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Progress value={progressPercentage} className="h-3 bg-green-200" />
              <div className="flex justify-between text-sm">
                <span>KES {totalContributions.toLocaleString()} collected</span>
                <span>Goal: KES {contributionGoal.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Members List */}
          <div className="lg:col-span-2">
            <MemberList members={members} setMembers={setMembers} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ContributionSettings />
            
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Bell className="w-4 h-4 mr-2" />
                  Schedule Reminders
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Subscription Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900">Premium Features</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-700 mb-4">
                  Unlock advanced features for just KES 100/month
                </p>
                <ul className="text-xs text-blue-600 space-y-1 mb-4">
                  <li>• SMS Reminders</li>
                  <li>• PDF Reports</li>
                  <li>• Advanced Analytics</li>
                  <li>• Custom Notifications</li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AddMemberDialog 
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        onAddMember={handleAddMember}
      />
    </div>
  );
};

export default Index;


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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Professional Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Chama Payment Bot
                </h1>
                <p className="text-sm text-slate-600">Automated payment reminders & tracking system</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                onClick={handleSendReminders}
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                <Bell className="w-4 h-4 mr-2" />
                Send Reminders
              </Button>
              <Button 
                onClick={() => setIsAddMemberOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white shadow-sm border-slate-200 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Total Contributions</CardTitle>
                <div className="p-2 bg-green-50 rounded-lg">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">
                  KES {totalContributions.toLocaleString()}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {progressPercentage.toFixed(1)}% of monthly goal
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-slate-200 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Active Members</CardTitle>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">
                  {members.length}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {paidMembers} paid this month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-slate-200 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Pending Payments</CardTitle>
                <div className="p-2 bg-amber-50 rounded-lg">
                  <Clock className="h-4 w-4 text-amber-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">
                  {pendingMembers}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {overdueMembers} overdue
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-slate-200 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Monthly Goal</CardTitle>
                <div className="p-2 bg-purple-50 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">
                  KES {contributionGoal.toLocaleString()}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  KES {(contributionGoal - totalContributions).toLocaleString()} remaining
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-8">
          <Card className="bg-white shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-900 text-lg font-semibold">Monthly Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={progressPercentage} className="h-3" />
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">KES {totalContributions.toLocaleString()} collected</span>
                  <span className="text-slate-600">Goal: KES {contributionGoal.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Members Section */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Members</h2>
              <p className="text-sm text-slate-600">Manage member contributions and payment status</p>
            </div>
            <MemberList members={members} setMembers={setMembers} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Settings */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Settings</h3>
              <ContributionSettings />
            </div>
            
            {/* Quick Actions */}
            <Card className="bg-white shadow-sm border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-900 text-base font-semibold">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button className="w-full justify-start bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200" variant="outline">
                  <Bell className="w-4 h-4 mr-2" />
                  Schedule Reminders
                </Button>
                <Button className="w-full justify-start bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200" variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Upgrade Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-blue-900 text-base font-semibold">
                  Premium Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-700 mb-4">
                  Unlock advanced features for just KES 100/month
                </p>
                <ul className="text-xs text-blue-600 space-y-2 mb-4">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                    SMS Reminders
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                    PDF Reports
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                    Advanced Analytics
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                    Custom Notifications
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <AddMemberDialog 
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        onAddMember={handleAddMember}
      />
    </div>
  );
};

export default Index;

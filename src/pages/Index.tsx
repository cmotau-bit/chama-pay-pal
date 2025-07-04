
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Chama Payment Bot
              </h1>
              <p className="text-sm text-slate-600 mt-1">Automated payment reminders & tracking</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                onClick={handleSendReminders}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg"
              >
                <Bell className="w-4 h-4 mr-2" />
                Send Reminders
              </Button>
              <Button 
                onClick={() => setIsAddMemberOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg"
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
          <Card className="bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Contributions</CardTitle>
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                KES {totalContributions.toLocaleString()}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {progressPercentage.toFixed(1)}% of goal reached
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Members</CardTitle>
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                <Users className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {members.length}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {paidMembers} paid this month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Pending Payments</CardTitle>
              <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
                <Clock className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                {pendingMembers}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {overdueMembers} overdue
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Monthly Goal</CardTitle>
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                KES {contributionGoal.toLocaleString()}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                KES {(contributionGoal - totalContributions).toLocaleString()} remaining
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-white text-xl">Monthly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={progressPercentage} className="h-4 bg-white/20" />
              <div className="flex justify-between text-sm font-medium">
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
            <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-700 border-0" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button className="w-full justify-start bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-700 border-0" variant="outline">
                  <Bell className="w-4 h-4 mr-2" />
                  Schedule Reminders
                </Button>
                <Button className="w-full justify-start bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-700 border-0" variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Subscription Card */}
            <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Premium Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-4">
                  Unlock advanced features for just KES 100/month
                </p>
                <ul className="text-xs text-slate-500 space-y-2 mb-4">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                    SMS Reminders
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                    PDF Reports
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></div>
                    Advanced Analytics
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-2"></div>
                    Custom Notifications
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg border-0">
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

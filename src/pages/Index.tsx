
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50">
      {/* Professional Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-blue-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Chama Payment Bot
                </h1>
                <p className="text-sm text-slate-600">Automated payment reminders & tracking system</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                onClick={handleSendReminders}
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200"
              >
                <Bell className="w-4 h-4 mr-2" />
                Send Reminders
              </Button>
              <Button 
                onClick={() => setIsAddMemberOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
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
          <h2 className="text-xl font-bold text-slate-800 mb-6">Performance Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-semibold text-slate-700">Total Contributions</CardTitle>
                <div className="p-2.5 bg-gradient-to-r from-emerald-400 to-green-500 rounded-xl shadow-md">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  KES {totalContributions.toLocaleString()}
                </div>
                <p className="text-xs text-slate-500 mt-2 font-medium">
                  {progressPercentage.toFixed(1)}% of monthly goal
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-semibold text-slate-700">Active Members</CardTitle>
                <div className="p-2.5 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl shadow-md">
                  <Users className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {members.length}
                </div>
                <p className="text-xs text-slate-500 mt-2 font-medium">
                  {paidMembers} paid this month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-semibold text-slate-700">Pending Payments</CardTitle>
                <div className="p-2.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl shadow-md">
                  <Clock className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  {pendingMembers}
                </div>
                <p className="text-xs text-slate-500 mt-2 font-medium">
                  {overdueMembers} overdue
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-semibold text-slate-700">Monthly Goal</CardTitle>
                <div className="p-2.5 bg-gradient-to-r from-purple-400 to-violet-500 rounded-xl shadow-md">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                  KES {contributionGoal.toLocaleString()}
                </div>
                <p className="text-xs text-slate-500 mt-2 font-medium">
                  KES {(contributionGoal - totalContributions).toLocaleString()} remaining
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-8">
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-slate-800 text-xl font-bold">Monthly Progress Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={progressPercentage} className="h-4 bg-slate-200" />
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-700">KES {totalContributions.toLocaleString()} collected</span>
                  <span className="text-slate-700">Goal: KES {contributionGoal.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Members Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-800">Member Management</h2>
              <p className="text-sm text-slate-600 mt-1">Track contributions and payment status</p>
            </div>
            <MemberList members={members} setMembers={setMembers} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Settings */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Configuration</h3>
              <ContributionSettings />
            </div>
            
            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-slate-800 text-lg font-bold">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-gradient-to-r from-slate-50 to-blue-50 hover:from-blue-50 hover:to-cyan-50 text-slate-700 border border-blue-200 hover:border-blue-300 transition-all duration-200" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button className="w-full justify-start bg-gradient-to-r from-slate-50 to-blue-50 hover:from-blue-50 hover:to-cyan-50 text-slate-700 border border-blue-200 hover:border-blue-300 transition-all duration-200" variant="outline">
                  <Bell className="w-4 h-4 mr-2" />
                  Schedule Reminders
                </Button>
                <Button className="w-full justify-start bg-gradient-to-r from-slate-50 to-blue-50 hover:from-blue-50 hover:to-cyan-50 text-slate-700 border border-blue-200 hover:border-blue-300 transition-all duration-200" variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Upgrade Card */}
            <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 border-0 shadow-xl text-white">
              <CardHeader>
                <CardTitle className="text-white text-lg font-bold">
                  Premium Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-100 mb-4 font-medium">
                  Unlock advanced features for just KES 100/month
                </p>
                <ul className="text-xs text-blue-100 space-y-2 mb-4">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    SMS Reminders
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    PDF Reports
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    Advanced Analytics
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    Custom Notifications
                  </li>
                </ul>
                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 shadow-lg font-semibold transition-all duration-200">
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

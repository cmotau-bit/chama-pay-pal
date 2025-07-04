
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Phone, MessageSquare, Edit, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Member {
  id: number;
  name: string;
  phone: string;
  contribution: number;
  status: "paid" | "pending" | "overdue";
  lastPayment: string;
}

interface MemberListProps {
  members: Member[];
  setMembers: (members: Member[]) => void;
}

const MemberList = ({ members, setMembers }: MemberListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.includes(searchTerm)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "pending":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "overdue":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSendMessage = (member: Member) => {
    toast({
      title: "Message Sent",
      description: `WhatsApp reminder sent to ${member.name}`,
    });
  };

  const handleCall = (member: Member) => {
    window.open(`tel:${member.phone}`, '_blank');
  };

  const updatePaymentStatus = (memberId: number, newStatus: Member['status'], amount?: number) => {
    setMembers(members.map(member => 
      member.id === memberId 
        ? { 
            ...member, 
            status: newStatus,
            contribution: amount !== undefined ? amount : member.contribution,
            lastPayment: new Date().toISOString().split('T')[0]
          }
        : member
    ));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Members ({members.length})</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredMembers.map((member) => (
            <div key={member.id} className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-green-100 text-green-700 font-semibold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.phone}</p>
                    <p className="text-xs text-gray-500">Last payment: {member.lastPayment}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold text-lg text-green-700">
                      KES {member.contribution.toLocaleString()}
                    </p>
                    <Badge className={getStatusColor(member.status)}>
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCall(member)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSendMessage(member)}
                      className="text-green-600 hover:text-green-700"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {member.status !== "paid" && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Amount (KES)"
                      className="w-32"
                      id={`amount-${member.id}`}
                    />
                    <Button
                      size="sm"
                      onClick={() => {
                        const amountInput = document.getElementById(`amount-${member.id}`) as HTMLInputElement;
                        const amount = parseInt(amountInput.value) || 0;
                        updatePaymentStatus(member.id, "paid", amount);
                        amountInput.value = "";
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Mark as Paid
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updatePaymentStatus(member.id, "pending")}
                    >
                      Mark Pending
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {filteredMembers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No members found matching your search.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberList;

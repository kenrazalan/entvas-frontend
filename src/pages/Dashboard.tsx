import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
          <p className="text-[hsl(var(--muted-foreground))]">Welcome back! Here's what's happening with your projects today.</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <div className="flex items-center text-xs text-green-500">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>+20.1% from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
              <Users className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2,350</div>
              <div className="flex items-center text-xs text-green-500">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>+180.1% from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <div className="flex items-center text-xs text-green-500">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>+19% from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Activity className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <div className="flex items-center text-xs text-red-500">
                <ArrowDownRight className="h-4 w-4 mr-1" />
                <span>-12% from last hour</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">User #{i}</p>
                      <p className="text-sm text-[hsl(var(--muted-foreground))]">
                        Completed action #{i}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      {new Date().toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Website Traffic</p>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">Last 30 days</p>
                  </div>
                  <div className="text-sm font-medium">+12.5%</div>
                </div>
                <div className="h-2 w-full bg-[hsl(var(--secondary))] rounded-full overflow-hidden">
                  <div className="h-full w-[75%] bg-[hsl(var(--primary))] rounded-full"></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Conversion Rate</p>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">Last 30 days</p>
                  </div>
                  <div className="text-sm font-medium">+8.2%</div>
                </div>
                <div className="h-2 w-full bg-[hsl(var(--secondary))] rounded-full overflow-hidden">
                  <div className="h-full w-[45%] bg-[hsl(var(--primary))] rounded-full"></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">User Engagement</p>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">Last 30 days</p>
                  </div>
                  <div className="text-sm font-medium">+15.3%</div>
                </div>
                <div className="h-2 w-full bg-[hsl(var(--secondary))] rounded-full overflow-hidden">
                  <div className="h-full w-[60%] bg-[hsl(var(--primary))] rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
} 
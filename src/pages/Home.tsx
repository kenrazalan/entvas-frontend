import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-4xl font-bold mb-6">Welcome to Our Dashboard</h1>
      <p className="text-xl text-[hsl(var(--muted-foreground))] mb-8 text-center max-w-2xl">
        This is a simple dashboard application with login functionality. Try it out by clicking the login button.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Access your dashboard with your credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Use the login page to access your personalized dashboard with all your data and analytics.</p>
          </CardContent>
          <CardFooter>
            <Link to="/login" className="w-full">
              <Button className="w-full">Go to Login</Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>View your data and analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <p>The dashboard provides an overview of your data, analytics, and recent activity.</p>
          </CardContent>
          <CardFooter>
            <Link to="/dashboard" className="w-full">
              <Button className="w-full">Go to Dashboard</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 
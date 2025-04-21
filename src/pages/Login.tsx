import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/UI/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/UI/card";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import { LogIn, Mail, Lock } from "lucide-react";
import { authService } from '@/services/auth.service';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('manager@example.com');
  const [password, setPassword] = useState('Password123!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login({ email, password });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))] p-4">
      <div className="w-full max-w-[90%] sm:max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">Welcome Back</h1>
          <p className="text-sm sm:text-base text-[hsl(var(--muted-foreground))]">Sign in to your account to continue</p>
        </div>
        
        <Card className="card-hover">
          <CardHeader className="space-y-2">
            <CardTitle className="text-xl sm:text-2xl">Login</CardTitle>
            <CardDescription className="text-sm">Enter your credentials to access the dashboard.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email" className="flex items-center gap-2 text-sm">
                    <Mail size={16} />
                    <span>Email</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-10 sm:h-11"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password" className="flex items-center gap-2 text-sm">
                    <Lock size={16} />
                    <span>Password</span>
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-10 sm:h-11"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              {error && (
                <div className="text-red-500 text-xs sm:text-sm text-center">{error}</div>
              )}
              <Button type="submit" className="w-full h-10 sm:h-11 gap-2" disabled={loading}>
                {loading ? 'Signing in...' : (
                  <>
                    <LogIn size={18} />
                    <span>Login</span>
                  </>
                )}
              </Button>
              <div className="text-center text-xs sm:text-sm text-[hsl(var(--muted-foreground))]">
                Don't have an account?{" "}
                <Link to="/signup" className="text-[hsl(var(--primary))] hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
} 
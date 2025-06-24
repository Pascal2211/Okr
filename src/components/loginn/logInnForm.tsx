"use client"
import { useState } from "react"
import { loginWithEmailAndPassword } from "@/integrations/firebase/auth"
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link"; 
import { useRouter } from "next/navigation";

export default function LogInnForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        setError("");

        if(!email || !password){
            setError("Please fill in both email and password");
            return;
        }

        try{
            setLoading(true);
            await loginWithEmailAndPassword(email, password);
            router.push("/dashboard");
        }catch(error){
            setError("Inncorrect email or password. Please try again")
            console.log({error})
        } finally {
            setLoading(false)
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center p-4 animate-in">
        <Card className="w-full max-w-md p-8 glass">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight">
                Log inn
              </h1>
              <p className="text-muted-foreground">
                Log inn to start tracking your teams OKRs
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="Email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              {error && <p className="text-sm text-red-500 text-center">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary-muted"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging inn
                  </>
                ) : (
                  "Log inn"
                )}
              </Button>
            </form>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                You dont have an account?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </div>
    )
}

"use client";

import { useState } from "react";
import { registerUser } from "@/lib/Firebase/register";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { Loader2 } from "lucide-react";
import { validatePassword } from "@/lib/utils";
import Link from "next/link"; 

interface Props {
  onSuccess: (fullName: string) => void;
}

export default function RegisterForm({ onSuccess }: Props) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    const errorMessage = validatePassword(password);
    e.preventDefault();
    setError("");

    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      setError("Du må fylle ut feltene");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passordene stemmer ikke overens");
      return;
    }

    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passordene stemmer ikke overens");
      return;
    }

    try {
      setLoading(true);
      const { fullName } = await registerUser({
        firstname,
        lastname,
        email,
        password,
      });
      onSuccess(fullName);
    } catch (error) {
      setError(`Noe gikk galt. Prøv igjen. ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-in">
      <Card className="w-full max-w-md p-8 glass">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Create an account
            </h1>
            <p className="text-muted-foreground">
              Sign up to start tracking your teams OKRs
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Firstname</Label>
              <Input
                id="firstlName"
                type="text"
                placeholder="John"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Lastname</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
                minLength={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword"> Confirm Password</Label>
              <Input
                id="confirmassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full"
                minLength={6}
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
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/loginn" className="text-primary hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

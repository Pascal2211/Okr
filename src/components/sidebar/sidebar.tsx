"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Target,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { auth, db } from "@/integrations/firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "sonner";
import { doc, getDoc } from "firebase/firestore";

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { state, toggleSidebar } = useSidebar();
  const [userName, setUserName] = useState<string | null>(null);

  const isCollapsed = state === "collapsed";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserName(data.firstName + data.lastName);
        } else {
          setUserName(user.displayName || user.email || "User");
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("You have been signed out.");
      router.push("/login");
    } catch {
      toast.error("An error occurred while signing out.");
    }
  };

  const navItems = [
    { title: "Dashboard", path: "/dashboard", icon: Home },
    { title: "Objectives", path: "/objectives", icon: Target },
    { title: "Team", path: "/teams", icon: Users },
    { title: "Reports", path: "/reports", icon: BarChart3 },
    { title: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <aside
      className={`bg-[#0A1C22] text-white transition-all duration-300 h-screen overflow-hidden ${
        isCollapsed ? "w-16" : "w-60"
      }`}
    >
      <SidebarHeader className="px-6 py-4 flex items-center">
        {!isCollapsed && (
          <div className="flex-1">
            <h2 className="text-xl font-bold">OKR Tracker</h2>
            {userName && (
              <p className="text-sm text-white/60">
                Hi, {userName.toLowerCase()}
              </p>
            )}
          </div>
        )}
        <SidebarTrigger onClick={toggleSidebar} />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-white/70 px-6">
              Menu
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`$ {
                        isActive
                          ? "bg-[#1A2C33] text-white font-semibold border-l-4 border-r-4 border-[#0A1C22]"
                          : "hover:bg-white/10"
                      } ${isCollapsed ? "justify-center" : "px-3 py-2"}`}
                    >
                      <Link href={item.path} className="flex items-center gap-2">
                        <item.icon className="w-4 h-4" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/10 px-4 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleSignOut}
              className="hover:bg-white/10 w-full"
            >
              <LogOut className="w-4 h-4" />
              {!isCollapsed && <span>Sign out</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </aside>
  );
}

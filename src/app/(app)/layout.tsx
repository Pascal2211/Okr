import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/sidebar";
import { SidebarToggleFloating } from "@/components/sidebar/sidebareToggleFloating";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0A1C22] text-white `}
      >
        <SidebarProvider defaultOpen={false}>
          <div className="flex min-h-screen">
            <AppSidebar />

            <SidebarToggleFloating />

            <main className="flex-1 h-screen w-screen overflow-y-visible">
  <div className="w-full h-full max-w-none px-6">{children}</div>
</main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}



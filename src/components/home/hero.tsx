"use client"

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-6">
            <div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-white">Align Your </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5DC1E6] to-[#76D7FC]">
                  Team.
                </span>
              </h1>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5DC1E6] to-[#76D7FC]">
                  Achieve Results.
                </span>
              </h1>
              <p className="text-xl text-gray-300 md:pr-12 leading-relaxed">
                Streamline your goals and track performance with our intuitive OKR dashboard. Help your team stay aligned and deliver exceptional results.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="../dashboard">
                <Button 
                  className="h-14 px-8 bg-[#5DC1E6] hover:bg-[#4BA2C3] text-black font-semibold text-lg rounded-lg group flex items-center"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <Link href="/register">
                <Button 
                  variant="outline"
                  className="h-14 px-8 border-2 border-[#5DC1E6] text-[#5DC1E6] hover:bg-[#5DC1E6]/10 text-lg rounded-lg"
                >
                  Create Account
                </Button>
              </Link>

              <Link href="/loginn">
                <Button 
                  variant="outline"
                  className="h-14 px-8 border-2 border-[#5DC1E6] text-[#5DC1E6] hover:bg-[#5DC1E6]/10 text-lg rounded-lg"
                >
                  Log inn
                </Button>
              </Link>
            </div>
            
            <div className="pt-6 border-t border-white/10">
              <p className="text-white/60 flex items-center">
                <span className="mr-2">✓</span> No credit card required
                <span className="mx-4">•</span>
                <span className="mr-2">✓</span> Free 14-day trial
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10 bg-[#152F38]/80 backdrop-blur-sm rounded-xl overflow-hidden border border-[#5DC1E6]/30 shadow-xl shadow-[#5DC1E6]/10">
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-[#5DC1E6] to-[#76D7FC]"></div>
              <div className="p-2">
               
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#5DC1E6]/30 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#5DC1E6]/20 rounded-full filter blur-3xl"></div>
          </div>
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[#0A1C22] opacity-60 z-0"></div>
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#5DC1E6]/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#5DC1E6]/5 rounded-full filter blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;
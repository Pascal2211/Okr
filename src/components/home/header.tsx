"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="w-full px-4 py-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#5DC1E6] to-[#76D7FC]">
              OKR DASH
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            <a
              href="#features"
              className="text-gray-300 hover:text-[#5DC1E6] transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-300 hover:text-[#5DC1E6] transition-colors"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-gray-300 hover:text-[#5DC1E6] transition-colors"
            >
              Success Stories
            </a>

            <div className="flex items-center space-x-4">
              <Link href="/loginn">
                <Button
                  variant="outline"
                  className="border-[#5DC1E6] text-[#5DC1E6] hover:bg-[#5DC1E6]/10"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/src/app/">
                <Button className="bg-[#5DC1E6] hover:bg-[#4BA2C3] text-black">
                  Sign Up
                </Button>
              </Link>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 bg-[#0F2830]/90 backdrop-blur-sm rounded-lg p-4 absolute left-4 right-4 z-50 border border-[#5DC1E6]/20">
            <nav className="flex flex-col space-y-4">
              <a
                href="#features"
                className="text-gray-300 hover:text-[#5DC1E6] transition-colors py-2 px-4 rounded-md hover:bg-white/5"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-300 hover:text-[#5DC1E6] transition-colors py-2 px-4 rounded-md hover:bg-white/5"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#testimonials"
                className="text-gray-300 hover:text-[#5DC1E6] transition-colors py-2 px-4 rounded-md hover:bg-white/5"
                onClick={() => setMobileMenuOpen(false)}
              >
                Success Stories
              </a>
              <div className="flex flex-col space-y-2 pt-2 border-t border-white/10">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full border-[#5DC1E6] text-[#5DC1E6] hover:bg-[#5DC1E6]/10"
                  >
                    Log In
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-[#5DC1E6] hover:bg-[#4BA2C3] text-black">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

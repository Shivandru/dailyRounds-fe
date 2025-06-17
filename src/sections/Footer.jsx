import { CheckSquare } from "lucide-react";
import React from "react";
import BrandLogo from "../components/BrandLogo";

const Footer = () => {
  return (
    <footer className="backdrop-blur-md bg-white/5 border-t border-white/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <BrandLogo />
          <div className="text-white/60 text-sm">
            © 2025 TodoVibe. Stay organized, stay vibrant.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

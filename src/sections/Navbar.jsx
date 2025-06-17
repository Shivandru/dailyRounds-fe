import { useNavigate } from "react-router-dom";
import BrandLogo from "../components/BrandLogo";
const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <BrandLogo />
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

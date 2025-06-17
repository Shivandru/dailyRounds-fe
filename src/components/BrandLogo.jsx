import { CheckSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
const BrandLogo = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center space-x-3 mb-4 md:mb-0 cursor-pointer"
      onClick={() => navigate("/")}
    >
      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
        <CheckSquare className="w-5 h-5 text-white" />
      </div>
      <span className="text-white font-semibold text-lg">TodoVibe</span>
    </div>
  );
};

export default BrandLogo;

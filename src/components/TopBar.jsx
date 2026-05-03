import { Globe, ChevronDown } from "lucide-react";

function TopBar() {
  return (
    <div className="bg-black text-white py-2.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs sm:text-sm font-medium">
        <div className="hidden sm:block opacity-0 pointer-events-none">
          {/* Spacer for centering */}
          Language
        </div>
        
        <div className="flex-1 text-center">
          <p>
            Optik Plus Langkawi — Premium Eyewear & Lens Specialist. 
            <a href="/promo" className="ml-2 underline underline-offset-4 hover:text-brand transition-colors">Shop Now</a>
          </p>
        </div>

        <div className="flex items-center gap-2 cursor-pointer hover:text-brand transition-colors">
          <Globe size={14} />
          <span>English</span>
          <ChevronDown size={14} />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
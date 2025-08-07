import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import StreamVibeLogo from "~/assets/logos/stream-vibe-logo.svg";

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export const MobileHeader = ({ onMenuClick }: MobileHeaderProps) => {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-[#198486] px-4 text-white md:hidden">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 text-white hover:bg-white/10"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
        <img
          src={StreamVibeLogo}
          alt="StreamVibe Logo"
          className="h-8 w-auto"
        />
      </div>
    </header>
  );
};

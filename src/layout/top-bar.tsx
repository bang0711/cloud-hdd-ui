import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search, Menu } from "lucide-react";

type Props = {
  onMenuClick?: () => void;
};

function TopBar({ onMenuClick }: Props) {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Button variant="ghost" size="icon" className="mr-2 md:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>

        <div className="ml-auto flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="w-[200px] pl-8" />
          </div>

          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          <Avatar>
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}

export default TopBar;

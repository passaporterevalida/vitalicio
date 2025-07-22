
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export function LogoutButton() {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleSignOut}
            variant="ghost"
            size="sm"
            className="
              w-9 h-9 p-0
              text-gray-500 hover:text-gray-700
              hover:bg-gray-100
              rounded-lg
              transition-colors duration-200
            "
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">Sair</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

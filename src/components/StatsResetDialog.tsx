
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface StatsResetDialogProps {
  onReset: () => void;
}

export function StatsResetDialog({ onReset }: StatsResetDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reiniciar Jornada
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reiniciar Jornada</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação irá zerar completamente seu progresso no aplicativo, incluindo XP, missões, estatísticas e conquistas. <br /><br />
            <strong>Será resetado:</strong>
            <ul className="list-disc list-inside mt-2 text-sm">
              <li>XP e nível</li>
              <li>Progresso e tentativas de todas as missões</li>
              <li>Estatísticas de desempenho</li>
              <li>Conquistas desbloqueadas</li>
              <li>Streak de estudos</li>
            </ul>
            <br />
            <span className="text-red-600 font-semibold">Esta ação não pode ser desfeita.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onReset}
            className="bg-red-600 hover:bg-red-700"
          >
            Confirmar Reset
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

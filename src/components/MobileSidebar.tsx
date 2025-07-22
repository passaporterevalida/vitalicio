
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, BarChart3, User, Trophy, Flag, HelpCircle, LogOut, X, Stethoscope } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({
  isOpen,
  onClose
}: Props) {
  const location = useLocation();
  const {
    signOut
  } = useAuth();
  const navigation = [{
    name: 'Início',
    href: '/app',
    icon: Home,
    emoji: '📊'
  }, {
    name: 'Provas',
    href: '/questions',
    icon: FileText,
    emoji: '📚'
  }, {
    name: 'Missões',
    href: '/missions',
    icon: Flag,
    emoji: '🎯'
  }, {
    name: 'Simulados',
    href: '/simulados',
    icon: BarChart3,
    emoji: '📝'
  }, {
    name: 'Estatísticas',
    href: '/stats',
    icon: BarChart3,
    emoji: '📈'
  }, {
    name: 'Ranking',
    href: '/ranking',
    icon: Trophy,
    emoji: '👥'
  }, {
    name: 'Perfil',
    href: '/profile',
    icon: User,
    emoji: '⚙️'
  }];

  const menuActions = [{
    name: 'Ajuda',
    icon: HelpCircle,
    emoji: '❓',
    action: () => window.open('mailto:suporte@revalidaquest.com', '_blank')
  }, {
    name: 'Sair',
    icon: LogOut,
    emoji: '🚪',
    action: () => signOut()
  }];
  return <>
      {/* Overlay - Enhanced for better touch interaction */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-[9998] transition-opacity duration-300 backdrop-blur-sm" onClick={onClose} style={{
      touchAction: 'none'
    }} />}

      {/* Side Menu - Improved responsiveness */}
      <div className={`
        fixed inset-y-0 right-0 z-[9999]
        w-[min(85vw,320px)] sm:w-[min(70vw,300px)]
        bg-white dark:bg-gray-900
        shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        overflow-y-auto
        flex flex-col
        h-screen
        safe-area-inset
      `}>
        {/* Header - Responsive spacing */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 dark:border-gray-800 flex-shrink-0 bg-white dark:bg-gray-900">
          <Link to="/" onClick={onClose} className="flex items-center gap-2 sm:gap-3 group transition-all duration-300 hover:scale-105 min-w-0 py-0 px-[5px] mx-0 my-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
              <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight group-hover:animate-pulse">
                RevalidaQuest
              </span>
              <span className="text-xs text-gray-500 -mt-1 whitespace-nowrap">
                Sua jornada médica
              </span>
            </div>
          </Link>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors touch-target" aria-label="Fechar menu">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation Menu - Improved touch targets */}
        <div className="flex-1 py-3 sm:py-4 overflow-y-auto">
          <nav className="px-3 sm:px-4 space-y-1">
            {navigation.map(item => {
            const isActive = location.pathname === item.href;
            return <Link key={item.name} to={item.href} onClick={onClose} className={`
                    flex items-center gap-3 px-3 py-3 sm:py-2.5 rounded-lg text-base font-medium 
                    transition-all duration-200 group touch-target
                    ${isActive ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white'}
                  `}>
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1">{item.name}</span>
                </Link>;
          })}
          </nav>
        </div>

        {/* Action Items - Enhanced touch targets */}
        <div className="p-3 sm:p-4 border-t border-gray-100 dark:border-gray-800 flex-shrink-0 bg-gradient-to-r from-gray-50/80 to-blue-50/30 dark:from-gray-800/80 dark:to-gray-700/30">
          <nav className="space-y-1">
            {menuActions.map(item => <button key={item.name} onClick={() => {
            item.action();
            onClose();
          }} className="
                  w-full flex items-center gap-3 px-3 py-3 sm:py-2.5 rounded-lg text-base font-medium 
                  text-gray-600 dark:text-gray-400 
                  hover:bg-gray-100 hover:text-gray-900
                  dark:hover:bg-gray-800 dark:hover:text-white
                  transition-all duration-200 touch-target
                ">
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="flex-1 text-left">{item.name}</span>
              </button>)}
          </nav>
        </div>

        {/* Footer - Responsive spacing */}
        <div className="p-3 sm:p-4 border-t border-gray-100 dark:border-gray-800 flex-shrink-0">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p className="font-medium">© 2024 RevalidaQuest</p>
            <p className="text-xs mt-1">Versão 2.0.1</p>
          </div>
        </div>
      </div>
    </>;
}

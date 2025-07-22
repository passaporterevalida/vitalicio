import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, FileText, BarChart3, User, Trophy, Flag, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserProgressBar } from './UserProgressBar';
import { MobileHamburgerMenu } from './MobileHamburgerMenu';
import { MobileProgressDrawer } from './MobileProgressDrawer';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const navigation = [{
    name: 'Início',
    href: '/app',
    icon: Home
  }, {
    name: 'Provas',
    href: '/questions',
    icon: FileText
  }, {
    name: 'Missões',
    href: '/missions',
    icon: Flag
  }, {
    name: 'Simulados',
    href: '/simulados',
    icon: Stethoscope
  }, {
    name: 'Estatísticas',
    href: '/stats',
    icon: BarChart3
  }, {
    name: 'Ranking',
    href: '/ranking',
    icon: Trophy
  }, {
    name: 'Perfil',
    href: '/profile',
    icon: User
  }];

  const closeSheet = () => setIsOpen(false);

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md shadow-xl border-b-2 border-blue-100 fixed top-0 left-0 right-0 z-[9999] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 lg:h-18">
            {/* Logo - Responsive and always visible */}
            <div className="flex items-center flex-shrink-0 min-w-0">
              <Link to="/" className="flex items-center gap-2 sm:gap-3 py-2 group transition-all duration-300 hover:scale-105 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 xl:w-12 xl:h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3 mx-[3px] px-0 my-0 py-0 rounded-lg">
                  <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white mx-0 my-0 py-0 px-0" />
                </div>
                {/* Responsive logo text */}
                <div className="flex flex-col min-w-0">
                  <span className="sm:text-base lg:text-lg xl:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight group-hover:animate-pulse whitespace-nowrap text-lg">
                    RevalidaQuest
                  </span>
                  <span className="text-xs text-gray-500 -mt-0.5 whitespace-nowrap hidden xs:block">
                    Sua jornada médica
                  </span>
                </div>
              </Link>
            </div>

            {/* Tablet Navigation - Simplified and compact (md to xl) */}
            <div className="hidden md:flex lg:hidden items-center justify-center flex-1 max-w-lg mx-2">
              <div className="flex items-center bg-gray-50/90 backdrop-blur-sm rounded-xl px-0.5 py-0.5 border-2 border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                {navigation.map(item => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link 
                      key={item.name} 
                      to={item.href} 
                      className={`flex items-center justify-center p-1.5 rounded-lg transition-all duration-300 group ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105 z-10' 
                          : 'text-gray-700 hover:bg-white/90 hover:text-blue-600 hover:shadow-md hover:scale-[1.02]'
                      }`}
                      title={item.name}
                    >
                      <item.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'animate-pulse' : 'group-hover:animate-bounce'}`} />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Desktop Navigation - Full with text (xl+) */}
            <div className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-4">
              <div className="flex items-center bg-gray-50/90 backdrop-blur-sm rounded-2xl px-1 py-1 border-2 border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                {navigation.map(item => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link 
                      key={item.name} 
                      to={item.href} 
                      className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap group ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105 z-10' 
                          : 'text-gray-700 hover:bg-white/90 hover:text-blue-600 hover:shadow-md hover:scale-[1.02]'
                      }`}
                    >
                      <item.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'animate-pulse' : 'group-hover:animate-bounce'}`} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* User Progress - Responsive visibility */}
            <div className="hidden md:flex items-center flex-shrink-0">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl px-2 py-1.5 shadow-lg border border-gray-200">
                <UserProgressBar />
              </div>
            </div>

            {/* Mobile Menu Button - Only for mobile (below md) */}
            <div className="md:hidden flex items-center">
              <MobileHamburgerMenu />
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Progress Drawer - Fixed for all mobile pages */}
      <MobileProgressDrawer />
    </>
  );
}

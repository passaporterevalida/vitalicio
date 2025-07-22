
import { useRanking } from '@/hooks/useRanking';
import { Navbar } from '@/components/Navbar';
import { Trophy, TrendingUp, Crown, Medal, Star, User, ChevronRight, Zap, Award } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState, useEffect } from 'react';
import { GamifiedHeaderAlert } from '@/components/GamifiedHeaderAlert';
import { PodiumCard, PodiumCardSkeleton } from '@/components/PodiumCard';
import { useAuth } from '@/hooks/useAuth';
import { RankingUtils } from '@/utils/rankingUtils';
import { RankingIcons } from '@/components/RankingIcons';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ProgressBar';

// Componente de background animado
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-8 h-8 sm:w-16 sm:h-16 lg:w-24 lg:h-24 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
    <div className="absolute top-1/4 -left-2 sm:-left-4 w-6 h-6 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
    <div className="absolute bottom-1/4 right-1/4 w-4 h-4 sm:w-8 sm:h-8 lg:w-12 lg:h-12 bg-blue-300 rounded-full opacity-20 animate-ping"></div>
    <div className="absolute top-1/3 right-1/3 w-3 h-3 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-blue-600 rounded-full opacity-20 animate-bounce delay-1000"></div>
  </div>
);

// Componente de header da página
const RankingHeader = () => (
  <div className="flex flex-col items-center justify-center min-h-[30vh] text-center">
    <h1 className="font-bold text-4xl sm:text-5xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent drop-shadow-lg mb-4 select-none leading-[1.15] pb-2">
      Ranking Geral
    </h1>
    <GamifiedHeaderAlert icon={<span className='text-xl'>🏆</span>}>
      Suba no ranking respondendo questões e complete desafios para ganhar XP!
    </GamifiedHeaderAlert>
  </div>
);



// Componente de pódio
const RankingPodium = ({ podium, loading }: any) => (
  <div className="relative mb-12 mt-8">
    {/* Background do pódio */}
    <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent rounded-3xl -z-10"></div>
    
    {/* Container principal */}
    <div className="flex flex-col sm:flex-row justify-center items-center sm:items-end gap-4 sm:gap-6 md:gap-8 px-4 mx-auto max-w-md sm:max-w-none">
      {/* 2º lugar - esquerda no desktop, meio no mobile */}
      <div className="order-2 sm:order-1 flex justify-center transform sm:translate-y-8 w-full sm:w-auto">
        {loading ? (
          <PodiumCardSkeleton position={2} />
        ) : podium[1] ? (
          <PodiumCard
            position={2}
            name={podium[1].display_name}
            avatarUrl={podium[1].avatar_url}
            level={RankingUtils.getLevelTitle(podium[1].level)}
            score={podium[1].total_xp}
            accuracy={RankingUtils.getAccuracy(podium[1])}
          />
        ) : null}
      </div>
      
      {/* 1º lugar - central no desktop, topo no mobile */}
      <div className="order-1 sm:order-2 flex justify-center transform sm:-translate-y-4 relative z-10 w-full sm:w-auto">
        {loading ? (
          <PodiumCardSkeleton position={1} />
        ) : podium[0] ? (
          <PodiumCard
            position={1}
            name={podium[0].display_name}
            avatarUrl={podium[0].avatar_url}
            level={RankingUtils.getLevelTitle(podium[0].level)}
            score={podium[0].total_xp}
            accuracy={RankingUtils.getAccuracy(podium[0])}
          />
        ) : null}
      </div>
      
      {/* 3º lugar - direita no desktop, baixo no mobile */}
      <div className="order-3 sm:order-3 flex justify-center transform sm:translate-y-8 w-full sm:w-auto">
        {loading ? (
          <PodiumCardSkeleton position={3} />
        ) : podium[2] ? (
          <PodiumCard
            position={3}
            name={podium[2].display_name}
            avatarUrl={podium[2].avatar_url}
            level={RankingUtils.getLevelTitle(podium[2].level)}
            score={podium[2].total_xp}
            accuracy={RankingUtils.getAccuracy(podium[2])}
          />
        ) : null}
      </div>
    </div>
    
    {/* Linha de base do pódio */}
    <div className="hidden sm:block mt-8 mx-auto w-4/5 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full opacity-50"></div>
  </div>
);

// Componente de status de atualização
const UpdateStatus = () => (
  <div className="flex items-center justify-center gap-3 text-sm text-blue-700 mb-6 bg-blue-50/50 rounded-full px-6 py-3 border border-blue-200/50">
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      <TrendingUp className="w-4 h-4" />
      <span className="font-medium">Atualizado em tempo real</span>
    </div>
  </div>
);

// Componente de mensagem motivacional
const MotivationalMessage = ({ message }: { message: string }) => (
  <div className="my-6 p-4 rounded-xl bg-gradient-to-r from-green-100 to-blue-100 text-green-900 font-semibold text-center shadow-lg border border-green-200">
    {message}
  </div>
);

// Componente de card de usuário para mobile
const MobileUserCard = ({ userItem, isLoggedUser, isTop3, movement, setSelectedUser, setOpenProfile }: any) => {
  const { XpIcon, ArrowUp, ArrowDown, PodiumIcon, LevelBadgeIcon } = RankingIcons;
  
  return (
    <div
      key={userItem.id}
      className={`relative rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 transition-all duration-300 ring-0 ring-offset-0 hover:scale-105 hover:shadow-xl hover:ring-2 hover:ring-yellow-300 active:scale-98 cursor-pointer`}
      style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 60%, #7c3aed 100%)',
        borderRadius: '20px',
        boxShadow: '0 6px 32px 0 rgba(30, 64, 175, 0.10)',
      }}
    >
      {/* Posição */}
      <div className="flex flex-col items-center w-8">
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full font-extrabold text-base shadow-sm border-2
            ${userItem.position === 1 ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 text-yellow-900 border-yellow-400' :
              userItem.position === 2 ? 'bg-gradient-to-br from-gray-200 to-gray-400 text-gray-800 border-gray-400' :
              userItem.position === 3 ? 'bg-gradient-to-br from-orange-200 to-orange-400 text-orange-900 border-orange-400' :
              'bg-blue-900 text-white border-blue-700'}
          `}
          style={{ letterSpacing: 1 }}
          title={isTop3 ? `${userItem.position}º lugar` : undefined}
        >
          {isTop3 ? `${userItem.position}º` : userItem.position}
        </div>
      </div>

      {/* Avatar */}
      <div 
        className="relative w-12 h-12 rounded-full p-1"
        style={{
          background: RankingUtils.getAvatarBorderStyle(userItem, isTop3),
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
        onClick={() => { setSelectedUser(userItem); setOpenProfile(true); }}
      >
        <Avatar className="w-full h-full bg-white flex items-center justify-center">
          {userItem.avatar_url ? (
            <AvatarImage src={userItem.avatar_url} className="object-cover w-full h-full rounded-full" />
          ) : (
            <AvatarFallback className="text-gray-500 font-semibold text-lg" style={{ fontFamily: 'Poppins, Inter, sans-serif', letterSpacing: 1 }}>
              {userItem.display_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        {/* Nome e badges */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-white px-2 py-0.5 rounded-lg border-2 border-blue-300 shadow-sm bg-white/10" style={{ fontFamily: 'Inter, Montserrat, Poppins, sans-serif' }}>
            {userItem.display_name}
          </span>
          
          {/* Badge de título */}
          {userItem.position === 1 && (
            <span className="ml-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#e7c873] to-[#bfa14a] text-white text-xs font-semibold shadow-sm border-none" style={{ fontFamily: 'Inter, Montserrat, Poppins, sans-serif' }}>
              Mestre do Mês
            </span>
          )}
          
          {/* Indicador 'Você' */}
          {isLoggedUser && (
            <span className="ml-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-300" style={{ fontFamily: 'Inter, Montserrat, Poppins, sans-serif' }}>
              Você
            </span>
          )}
        </div>

        {/* XP e Nível */}
        <div className="flex items-center gap-4 text-base text-gray-100 mt-1" style={{ fontFamily: 'Inter, Montserrat, Poppins, sans-serif' }}>
          <span className="flex items-center gap-1">
            <XpIcon />
            <span className="font-bold">{userItem.total_xp} XP</span>
          </span>
          
          <span className="flex items-center gap-1 border-l border-gray-700 pl-3">
            <span className="font-bold">Nível:</span>
            <span className="rounded-full bg-gradient-to-r from-yellow-600 to-yellow-400 text-white px-2 py-0.5 text-xs font-bold border-none shadow-sm">
              {userItem.level}
            </span>
            
            {/* Movimentação */}
            {(movement.type === 'up' || movement.type === 'down') && (
              <span className="ml-2 flex items-center gap-1 border-l border-gray-700 pl-3">
                {movement.type === 'up' && <ArrowUp />}
                {movement.type === 'down' && <span className="text-red-400"><ArrowDown /></span>}
                <span>{movement.type === 'up' ? '+' : '-'}{movement.value}</span>
              </span>
            )}
          </span>
        </div>
      </div>

      {/* CTA */}
      <ChevronRight className="w-5 h-5 text-white/60 absolute right-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition" />
    </div>
  );
};

// Componente de tabela para desktop
const DesktopRankingTable = ({ podium, others, user, setSelectedUser, setOpenProfile, isFirstPage, usersToShow }: any) => {
  const { ArrowUp, ArrowDown, PodiumIcon } = RankingIcons;
  // Função para renderizar badges/conquistas rápidas (máx 2)
  const renderBadges = (userItem: any) => {
    if (!userItem.achievements || userItem.achievements.length === 0) return null;
    return (
      <div className="flex gap-1 ml-2">
        {userItem.achievements.filter((a: any) => a.unlocked).slice(0,2).map((a: any) => (
          <Badge key={a.id} variant="default" title={a.title} className="px-2 py-0.5 text-xs">
            <span className="mr-1">{a.icon}</span>{a.title}
          </Badge>
        ))}
      </div>
    );
  };
  // Função para barra de progresso de XP
  const renderXPBar = (userItem: any) => {
    if (userItem.xpToNextLevel && userItem.level !== undefined) {
      return (
        <ProgressBar level={userItem.level} xp={userItem.total_xp} xpToNextLevel={userItem.xpToNextLevel} className="w-48 mx-auto" />
      );
    }
    return null;
  };
  return (
    <div className={`hidden sm:flex w-full justify-start items-center${isFirstPage ? ' px-8 min-h-[70vh]' : ''}`}>
      <div className="w-full max-w-6xl">
        <table className="min-w-full rounded-2xl shadow-2xl text-xs sm:text-sm md:text-base border-separate border-spacing-y-2" style={{ background: 'linear-gradient(135deg, #f8fafc 60%, #e0e7ef 100%)' }}>
          <thead>
            <tr className="bg-gradient-to-r from-blue-200 via-purple-200 to-yellow-100 text-blue-900 text-left shadow-xl border-b-4 border-blue-300/40">
              <th className="px-4 py-5 font-extrabold text-lg text-center tracking-wider drop-shadow-md select-none transition-all duration-300 group-hover:scale-105">
                <span className="inline-flex items-center gap-1"><Trophy className="w-5 h-5 text-yellow-500 mr-1" />Ranking</span>
              </th>
              <th className="px-4 py-5 font-extrabold text-lg tracking-wider drop-shadow-md select-none transition-all duration-300 group-hover:scale-105">
                <span className="inline-flex items-center gap-1"><Star className="w-5 h-5 text-purple-500 mr-1" />Nome</span>
              </th>
              <th className="px-4 py-5 font-extrabold text-lg text-center tracking-wider drop-shadow-md select-none transition-all duration-300 group-hover:scale-105">
                <span className="inline-flex items-center gap-1"><Crown className="w-5 h-5 text-yellow-400 mr-1" />Nível</span>
              </th>
              <th className="px-4 py-5 font-extrabold text-lg text-center tracking-wider drop-shadow-md select-none transition-all duration-300 group-hover:scale-105">
                <span className="inline-flex items-center gap-1"><Zap className="w-5 h-5 text-orange-400 mr-1" />XP</span>
              </th>
              <th className="px-4 py-5 font-extrabold text-lg text-center tracking-wider drop-shadow-md select-none transition-all duration-300 group-hover:scale-105">
                <span className="inline-flex items-center gap-1"><TrendingUp className="w-5 h-5 text-green-500 mr-1" />Progresso</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {usersToShow.map((userItem: any, idx: number) => {
              const isLoggedUser = userItem.id === user?.id;
              const isTop3 = isFirstPage && userItem.position <= 3;
              const movement = RankingUtils.simulateMovement(idx);
              return (
                <tr key={userItem.id}
                  className={`transition-all duration-200 ${isLoggedUser ? 'bg-gradient-to-r from-blue-100 via-purple-100 to-yellow-50 ring-2 ring-blue-500 scale-[1.015] shadow-xl' : idx % 2 === 0 ? 'bg-white/80' : 'bg-blue-50/40'} ${isTop3 ? 'font-bold' : ''} hover:scale-[1.01] hover:shadow-2xl rounded-xl group`}
                  style={{ borderRadius: 16 }}
                  onClick={() => setSelectedUser && setOpenProfile && setSelectedUser(userItem) && setOpenProfile(true)}
                >
                  <td className="px-4 py-4 text-lg text-center">
                    {isTop3 ? (
                      <span
                        className={`inline-flex items-center justify-center w-10 h-10 font-extrabold text-xl rounded-full shadow-md border-4 select-none
                          ${userItem.position === 1 ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 text-yellow-900 border-yellow-400' :
                            userItem.position === 2 ? 'bg-gradient-to-br from-gray-200 to-gray-400 text-gray-800 border-gray-400' :
                            'bg-gradient-to-br from-orange-200 to-orange-400 text-orange-900 border-orange-400'}
                        `}
                        style={{ letterSpacing: 1 }}
                        title={`${userItem.position}º lugar`}
                      >
                        {userItem.position}º
                      </span>
                    ) : userItem.position}
                  </td>
                  <td className="px-6 py-4 min-w-[200px] flex items-center gap-2">
                    <div className="relative w-9 h-9 rounded-full p-0.5 bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 shadow-sm">
                      <Avatar className="w-full h-full bg-white">
                        {userItem.avatar_url ? (
                          <AvatarImage src={userItem.avatar_url} className="object-cover w-full h-full rounded-full" />
                        ) : (
                          <AvatarFallback className="text-blue-700 font-bold text-base">
                            {userItem.display_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    </div>
                    <span className="font-bold text-blue-900 px-3 py-1 rounded-full bg-white/80 shadow-sm text-base group-hover:bg-blue-50 transition-colors duration-200" style={{ textShadow: '0 1px 4px #fff' }}>
                      {userItem.display_name}
                    </span>
                    {isLoggedUser && (
                      <Badge variant="outline" className="ml-2 border-blue-400 text-blue-700 animate-pulse">Você</Badge>
                    )}
                    {renderBadges(userItem)}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="rounded-full bg-gradient-to-r from-blue-200 to-purple-200 text-blue-900 px-2 py-0.5 text-xs font-bold border border-blue-300 shadow-sm">
                      {userItem.level}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-bold text-center">
                    <span className="flex items-center gap-2 text-lg font-extrabold rounded-full bg-white/80 shadow px-4 py-1 text-yellow-700 justify-center">
                      <span className="text-xl">⚡</span>
                      {userItem.total_xp}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {movement.type === 'up' && <span className="text-green-600 font-bold animate-bounce-up">↑ +{movement.value}</span>}
                    {movement.type === 'down' && <span className="text-red-600 font-bold animate-bounce-down">↓ -{movement.value}</span>}
                    {movement.type === 'same' && <span className="text-gray-400 font-bold">●</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Componente de paginação
const RankingPagination = ({ currentPage, totalPages, onPageChange }: any) => (
  <div className="flex justify-center items-center gap-4 mt-8 mb-4">
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-base font-medium transition disabled:opacity-50 disabled:cursor-not-allowed bg-white shadow-sm hover:bg-blue-50`}
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage <= 1}
    >
      <span className="text-xl">&#60;</span>
      <span>Anterior</span>
    </button>
    
    <span className="text-base font-semibold text-gray-700 select-none">
      Página {currentPage} de {totalPages}
    </span>
    
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-base font-medium transition disabled:opacity-50 disabled:cursor-not-allowed bg-white shadow-sm hover:bg-blue-50`}
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage >= totalPages}
    >
      <span>Próxima</span>
      <span className="text-xl">&#62;</span>
    </button>
  </div>
);

export default function Ranking() {
  const {
    allTimeRanking,
    loading,
    filters,
    updateFilters,
    allTimeCurrentPage,
    setAllTimeCurrentPage,
    allTimeTotalPages,
    refreshRankings,
  } = useRanking();
  
  const { user } = useAuth();
  
  // Estados organizados
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [userMovement, setUserMovement] = useState<'up' | 'down' | 'same' | null>(null);

  // Lógica para exibir pódio apenas na primeira página
  const isFirstPage = allTimeCurrentPage === 1;
  const podium = isFirstPage ? allTimeRanking.slice(0, 3) : [];
  const others = isFirstPage
    ? allTimeRanking.slice(3, 10)
    : allTimeRanking; // ou o slice correto para a página atual, se houver paginação real
  const usersToShow = isFirstPage ? [...podium, ...others] : allTimeRanking;

  const loggedUserInRanking = allTimeRanking.find(u => u.id === user?.id);
  const loggedUserInTop10 = usersToShow.some(u => u.id === user?.id);
  const showLoggedUserSeparately = user && loggedUserInRanking && !loggedUserInTop10;

  // Mensagem motivacional
  const motivationalMessage = RankingUtils.generateMotivationalMessage(loggedUserInRanking, allTimeRanking);

  // Efeitos organizados
  useEffect(() => {
    if (!user || !loggedUserInRanking) return;
    
    const storageKey = `ranking_position_${user.id}`;
    const prevPosition = Number(localStorage.getItem(storageKey));
    
    if (prevPosition) {
      if (loggedUserInRanking.position < prevPosition) setUserMovement('up');
      else if (loggedUserInRanking.position > prevPosition) setUserMovement('down');
      else setUserMovement('same');
    }
    
    localStorage.setItem(storageKey, String(loggedUserInRanking.position));
  }, [user, loggedUserInRanking?.position]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof refreshRankings === 'function') refreshRankings();
    }, 30000);
    return () => clearInterval(interval);
  }, [refreshRankings]);

  // Handlers organizados
  const handlePageChange = (newPage: number) => {
    setAllTimeCurrentPage(newPage);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-blue-700">Carregando ranking...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      <AnimatedBackground />
      
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 pt-20 pb-8 relative z-10">
        <RankingHeader />
        {/* Exibe o pódio apenas na primeira página */}
        {isFirstPage && (
          <RankingPodium podium={podium} loading={loading} />
        )}
        <UpdateStatus />
        {/*
          Da página 2 em diante, a tabela deve aparecer logo após 'Atualizado em tempo real',
          sem mensagem motivacional ou outros elementos intermediários.
        */}
        {isFirstPage ? (
          <>
            {motivationalMessage && (
              <MotivationalMessage message={motivationalMessage} />
            )}
            {/* Mobile Layout */}
            <div className="block sm:hidden">
              <div className="flex flex-col gap-3">
                {usersToShow.map((userItem: any, idx: number) => {
                  const isLoggedUser = userItem.id === user?.id;
                  const isTop3 = isFirstPage && userItem.position <= 3;
                  const movement = RankingUtils.simulateMovement(idx);
                  return (
                    <MobileUserCard
                      key={userItem.id}
                      userItem={userItem}
                      isLoggedUser={isLoggedUser}
                      isTop3={isTop3}
                      movement={movement}
                      setSelectedUser={setSelectedUser}
                      setOpenProfile={setOpenProfile}
                    />
                  );
                })}
                {/* Usuário logado fora do top 10 */}
                {showLoggedUserSeparately && loggedUserInRanking && (
                  <div className="relative rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 ring-2 ring-blue-500 font-bold mt-2"
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 60%, #7c3aed 100%)',
                      borderRadius: '20px',
                      boxShadow: '0 4px 24px 0 rgba(30, 64, 175, 0.08)',
                    }}
                  >
                    <div className="flex flex-col items-center w-8">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full font-extrabold text-base shadow-sm border-2 bg-blue-900 text-white border-blue-700" style={{ letterSpacing: 1 }}>
                        {loggedUserInRanking.position}
                      </div>
                    </div>
                    <Avatar className="w-12 h-12 border-4 border-blue-200 bg-white">
                      {loggedUserInRanking.avatar_url ? (
                        <AvatarImage src={loggedUserInRanking.avatar_url} />
                      ) : (
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-gray-500 font-semibold">
                          {loggedUserInRanking.display_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <div className="font-bold text-blue-700 truncate text-base px-2 py-0.5 rounded-lg border-2 border-blue-300 shadow-sm bg-white/30">
                        Você ({loggedUserInRanking.display_name})
                      </div>
                      <div className="flex items-center gap-4 text-sm mt-1">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="font-bold">{loggedUserInRanking.total_xp} XP</span>
                        </span>
                        <span className="flex items-center gap-1 border-l border-gray-200 pl-3">
                          <span className="font-bold">Nível:</span>
                          <span className="inline-flex items-center gap-1">
                            <span className="rounded-full bg-gradient-to-r from-blue-200 to-purple-200 text-blue-900 px-2 py-0.5 text-xs font-bold border border-blue-300">
                              {loggedUserInRanking.level}
                            </span>
                            <RankingIcons.LevelBadgeIcon level={loggedUserInRanking.level} />
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Desktop Layout */}
            <DesktopRankingTable 
              podium={podium} 
              others={others} 
              user={user} 
              setSelectedUser={setSelectedUser} 
              setOpenProfile={setOpenProfile} 
              isFirstPage={isFirstPage}
              usersToShow={usersToShow}
            />
          </>
        ) : (
          // Da página 2 em diante, mostra só a tabela imediatamente após o status
          <>
            {/* Mobile Layout */}
            <div className="block sm:hidden">
              <div className="flex flex-col gap-3">
                {usersToShow.map((userItem: any, idx: number) => {
                  const isLoggedUser = userItem.id === user?.id;
                  const isTop3 = false;
                  const movement = RankingUtils.simulateMovement(idx);
                  return (
                    <MobileUserCard
                      key={userItem.id}
                      userItem={userItem}
                      isLoggedUser={isLoggedUser}
                      isTop3={isTop3}
                      movement={movement}
                      setSelectedUser={setSelectedUser}
                      setOpenProfile={setOpenProfile}
                    />
                  );
                })}
              </div>
            </div>
            {/* Desktop Layout */}
            <DesktopRankingTable 
              podium={[]}
              others={usersToShow}
              user={user}
              setSelectedUser={setSelectedUser}
              setOpenProfile={setOpenProfile}
              isFirstPage={false}
              usersToShow={usersToShow}
            />
          </>
        )}
        {/* Paginação */}
        <RankingPagination 
          currentPage={allTimeCurrentPage}
          totalPages={allTimeTotalPages}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
}

import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { useSubscription } from '@/hooks/useSubscription';
import { useGamification } from '@/hooks/useGamification';
import { SubscriptionBadge } from '@/components/SubscriptionBadge';
import { PrivacySettings } from '@/components/PrivacySettings';
import { DetailedStats } from '@/components/DetailedStats';
import { SubscriptionManagementModal } from '@/components/SubscriptionManagementModal';
import { useState } from 'react';
import { User, Calendar, Crown, Settings, ExternalLink } from 'lucide-react';
import { ProfileEditModal } from '@/components/ProfileEditModal';

export default function Profile() {
  const { user } = useAuth();
  const { userProgress, getAccuracy } = useGamification();

  // Header: Avatar, Nome, Badge Plano, Editar Perfil, Gerenciar Assinatura
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 sm:pt-28 pb-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <Card className="p-0 border-0 shadow-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl">
            <CardContent className="flex flex-col items-center gap-4 pt-8 pb-6 px-6">
              <div className="relative">
                <Avatar className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl">
                  <AvatarImage src="/emblem.png" />
                  <AvatarFallback className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    {user?.email?.charAt(0).toUpperCase() || 'P'}
                  </AvatarFallback>
                </Avatar>
                {/* Badge de nível */}
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold text-base rounded-full border-4 border-white shadow-lg w-10 h-10 flex items-center justify-center">
                  {userProgress.level}
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  {user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'Passaporte Revalida'}
                </h2>
                {/* <SubscriptionBadge /> */}
              </div>
              {/* Informações da Conta dentro do header */}
              <div className="flex flex-col items-center gap-2 mt-2 text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium">Email:</span>
                  <span className="font-mono">{user?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">Cadastro:</span>
                  <span>{user?.created_at ? new Date(user.created_at).toLocaleDateString('pt-BR') : 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-green-600" />
                  <span className="font-medium">Plano:</span>
                  <span className="text-green-600 font-semibold">Vitalício</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                  <p className="text-sm text-green-600 font-medium">
                    ✅ Vitalício - Passaporte Revalida
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resumo do Usuário */}
          {/* (REMOVIDO: cards de Taxa de Sucesso, XP Total, Nível) */}

          {/* Informações da Conta */}
          {/* (REMOVIDO: card de informações da conta) */}

          {/* Assinatura */}
          {/* (REMOVIDO: card de assinatura) */}

          {/* Estatísticas Detalhadas */}
          <DetailedStats />

          {/* Privacidade/Configurações */}
          <PrivacySettings />
        </div>
      </div>

    </div>
  );
}

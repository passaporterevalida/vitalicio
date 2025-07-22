
import { useState } from 'react';
import { useGamification } from '@/hooks/useGamification';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BadgesGrid } from '@/components/BadgesGrid';
import { User, Trophy, Target, Calendar, Star, Crown, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface UserData {
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
}

export function UserProfile() {
  const { userProgress, getAccuracy, getProgressPercentage } = useGamification();
  const [userData, setUserData] = useState<UserData>({
    name: 'Aventureiro',
    email: 'aventureiro@revalida.com',
    joinDate: '2024-01-15'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(userData);
  const [uploading, setUploading] = useState(false);

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
  };

  // Função para upload de avatar
  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userData.email.replace(/[^a-zA-Z0-9]/g, '')}_${Date.now()}.${fileExt}`;
      const { data, error } = await supabase.storage.from('avatars').upload(fileName, file, { upsert: true });
      if (error) throw error;
      const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(fileName);
      const avatarUrl = publicUrlData.publicUrl;
      setUserData(prev => ({ ...prev, avatar: avatarUrl }));
      setEditData(prev => ({ ...prev, avatar: avatarUrl }));
      // Aqui você pode salvar a URL no banco de dados do usuário, se necessário
    } catch (err) {
      alert('Erro ao fazer upload do avatar');
    } finally {
      setUploading(false);
    }
  }

  const getRankTitle = (level: number) => {
    if (level >= 20) return 'Mestre Cirurgião';
    if (level >= 15) return 'Especialista';
    if (level >= 10) return 'Residente Sênior';
    if (level >= 5) return 'Interno Avançado';
    return 'Estudante';
  };

  const getRankIcon = (level: number) => {
    if (level >= 20) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (level >= 15) return <Star className="w-5 h-5 text-purple-500" />;
    if (level >= 10) return <Trophy className="w-5 h-5 text-blue-500" />;
    if (level >= 5) return <Target className="w-5 h-5 text-green-500" />;
    return <User className="w-5 h-5 text-gray-500" />;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Avatar and Basic Info */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <div className="relative">
          <Avatar className="w-24 h-24 border-4 border-gradient-to-r from-blue-500 to-purple-600">
            <AvatarImage src={userData.avatar} />
            <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              {userData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 border-2 border-white shadow-lg">
            <span className="text-white font-bold text-sm">{userProgress.level}</span>
          </div>
          {/* Botão de upload de avatar */}
          <label className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 cursor-pointer bg-blue-600 text-white px-3 py-1 rounded-lg text-xs shadow hover:bg-blue-700 transition">
            {uploading ? 'Enviando...' : 'Trocar Avatar'}
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} disabled={uploading} />
          </label>
        </div>
        
        <div className="text-center md:text-left flex-1">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            {getRankIcon(userProgress.level)}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {userData.name}
            </h1>
          </div>
          <Badge variant="secondary" className="mb-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-200">
            {getRankTitle(userProgress.level)}
          </Badge>
          <p className="text-muted-foreground flex items-center gap-2 justify-center md:justify-start">
            <Calendar className="w-4 h-4" />
            Jornada iniciada em {new Date(userData.joinDate).toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold mb-1">{userProgress.level}</div>
            <div className="text-sm opacity-90">Nível Atual</div>
            <Progress value={getProgressPercentage()} className="mt-2 bg-white/20" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold mb-1">{getAccuracy()}%</div>
            <div className="text-sm opacity-90">Taxa de Sucesso</div>
            <div className="text-xs mt-1 opacity-80">
              {userProgress.correctAnswers}/{userProgress.totalQuestions}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold mb-1">
              {userProgress.achievements.filter(a => a.unlocked).length}
            </div>
            <div className="text-sm opacity-90">Conquistas</div>
            <div className="text-xs mt-1 opacity-80">
              de {userProgress.achievements.length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold mb-1">{userProgress.xp}</div>
            <div className="text-sm opacity-90">XP Total</div>
            <div className="text-xs mt-1 opacity-80">
              +{userProgress.xpToNextLevel - userProgress.xp} para próximo nível
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Badges Section */}
        {/* Remover <BadgesGrid achievements={userProgress.achievements} /> */}

        {/* Profile Information and Progress Details in a row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Information */}
          <Card className="border border-blue-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <User className="w-5 h-5 text-blue-600" />
                Informações do Perfil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <>
                  <div>
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      value={editData.name}
                      onChange={(e) => setEditData({...editData, name: e.target.value})}
                      className="border-blue-200 dark:border-gray-600 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({...editData, email: e.target.value})}
                      className="border-blue-200 dark:border-gray-600 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave} className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Salvar
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1 border-blue-200 dark:border-gray-600">
                      Cancelar
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Label>Nome</Label>
                    <p className="font-medium text-gray-900 dark:text-white">{userData.name}</p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p className="font-medium text-gray-900 dark:text-white">{userData.email}</p>
                  </div>
                  <Button onClick={() => setIsEditing(true)} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Editar Perfil
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Progress Details */}
          <Card className="border border-blue-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Zap className="w-5 h-5 text-blue-500" />
                Progresso Detalhado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">Experiência para Próximo Nível</span>
                    <span className="text-sm text-muted-foreground">
                      {userProgress.xp} / {userProgress.xpToNextLevel} XP
                    </span>
                  </div>
                  <Progress value={getProgressPercentage()} className="h-3" />
                </div>
                
                <div className="grid grid-cols-1 gap-4 text-center">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-700">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{userProgress.totalQuestions}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Questões Respondidas</div>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-700">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{userProgress.correctAnswers}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Acertos</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

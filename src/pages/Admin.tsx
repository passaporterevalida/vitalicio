import { useState } from 'react';
import { useAuthorizedEmails } from '@/hooks/useAuthorizedEmails';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BulkEmailImport } from '@/components/BulkEmailImport';
import { 
  Plus, 
  Trash2, 
  Mail, 
  Shield, 
  Users, 
  Activity, 
  Calendar,
  Globe,
  CheckCircle,
  XCircle,
  Upload
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Admin() {
  const { user } = useAuth();
  const {
    authorizedEmails,
    accessAttempts,
    loading,
    loadAuthorizedEmails,
    loadAccessAttempts,
    addAuthorizedEmail,
    removeAuthorizedEmail,
  } = useAuthorizedEmails();

  const [newEmail, setNewEmail] = useState('');
  const [newDomain, setNewDomain] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [isAddingEmail, setIsAddingEmail] = useState(false);
  const [isAddingDomain, setIsAddingDomain] = useState(false);

  // Verificar se o usuário é admin (você pode personalizar esta lógica)
  const isAdmin = user?.email === 'admin@revalidaquest.com' || 
                  user?.email?.includes('admin') ||
                  user?.email?.includes('gabriel');

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Acesso Negado
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Você não tem permissão para acessar esta página.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAddEmail = async () => {
    if (!newEmail.trim()) return;
    
    try {
      setIsAddingEmail(true);
      await addAuthorizedEmail(newEmail.trim(), null, newNotes.trim() || null);
      setNewEmail('');
      setNewNotes('');
    } catch (error) {
      console.error('Erro ao adicionar e-mail:', error);
    } finally {
      setIsAddingEmail(false);
    }
  };

  const handleAddDomain = async () => {
    if (!newDomain.trim()) return;
    
    try {
      setIsAddingDomain(true);
      await addAuthorizedEmail('', newDomain.trim(), newNotes.trim() || null);
      setNewDomain('');
      setNewNotes('');
    } catch (error) {
      console.error('Erro ao adicionar domínio:', error);
    } finally {
      setIsAddingDomain(false);
    }
  };

  const handleRemoveEmail = async (email: string) => {
    if (confirm(`Tem certeza que deseja remover o e-mail "${email}"?`)) {
      try {
        await removeAuthorizedEmail(email);
      } catch (error) {
        console.error('Erro ao remover e-mail:', error);
      }
    }
  };

  const stats = {
    totalEmails: authorizedEmails.filter(e => e.email).length,
    totalDomains: authorizedEmails.filter(e => e.domain).length,
    totalAttempts: accessAttempts.length,
    authorizedAttempts: accessAttempts.filter(a => a.was_authorized).length,
    deniedAttempts: accessAttempts.filter(a => !a.was_authorized).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Painel de Administração
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie e-mails autorizados e monitore tentativas de acesso
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">E-mails Autorizados</p>
                  <p className="text-2xl font-bold">{stats.totalEmails}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Domínios Autorizados</p>
                  <p className="text-2xl font-bold">{stats.totalDomains}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Acessos Autorizados</p>
                  <p className="text-2xl font-bold">{stats.authorizedAttempts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <XCircle className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Acessos Negados</p>
                  <p className="text-2xl font-bold">{stats.deniedAttempts}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="emails" className="space-y-4">
          <TabsList>
            <TabsTrigger value="emails">E-mails Autorizados</TabsTrigger>
            <TabsTrigger value="bulk">Importação em Lote</TabsTrigger>
            <TabsTrigger value="attempts">Tentativas de Acesso</TabsTrigger>
          </TabsList>

          <TabsContent value="emails" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Adicionar E-mail Autorizado</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-email">E-mail</Label>
                    <Input
                      id="new-email"
                      type="email"
                      placeholder="usuario@exemplo.com"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-domain">Domínio (opcional)</Label>
                    <Input
                      id="new-domain"
                      type="text"
                      placeholder="exemplo.com"
                      value={newDomain}
                      onChange={(e) => setNewDomain(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-notes">Observações</Label>
                  <Textarea
                    id="new-notes"
                    placeholder="Observações sobre este e-mail/domínio..."
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button 
                    onClick={handleAddEmail} 
                    disabled={!newEmail.trim() || isAddingEmail}
                  >
                    {isAddingEmail ? 'Adicionando...' : 'Adicionar E-mail'}
                  </Button>
                  <Button 
                    onClick={handleAddDomain} 
                    disabled={!newDomain.trim() || isAddingDomain}
                    variant="outline"
                  >
                    {isAddingDomain ? 'Adicionando...' : 'Adicionar Domínio'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Lista de E-mails Autorizados</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Carregando...</p>
                  </div>
                ) : authorizedEmails.length === 0 ? (
                  <Alert>
                    <AlertDescription>
                      Nenhum e-mail autorizado encontrado. Adicione o primeiro e-mail acima.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-2">
                    {authorizedEmails.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          {item.email ? (
                            <Mail className="w-4 h-4 text-blue-500" />
                          ) : (
                            <Globe className="w-4 h-4 text-green-500" />
                          )}
                          <div>
                            <p className="font-medium">
                              {item.email || `@${item.domain}`}
                            </p>
                            {item.notes && (
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {item.notes}
                              </p>
                            )}
                            <p className="text-xs text-gray-500">
                              Adicionado em {format(new Date(item.added_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={item.is_active ? "default" : "secondary"}>
                            {item.is_active ? "Ativo" : "Inativo"}
                          </Badge>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRemoveEmail(item.email || item.domain || '')}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bulk" className="space-y-4">
            <BulkEmailImport />
          </TabsContent>

          <TabsContent value="attempts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Tentativas de Acesso</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-600">
                    Últimas 100 tentativas de acesso
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={loadAccessAttempts}
                    disabled={loading}
                  >
                    Atualizar
                  </Button>
                </div>

                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Carregando...</p>
                  </div>
                ) : accessAttempts.length === 0 ? (
                  <Alert>
                    <AlertDescription>
                      Nenhuma tentativa de acesso registrada.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {accessAttempts.map((attempt) => (
                      <div
                        key={attempt.id}
                        className={`p-3 rounded-lg border ${
                          attempt.was_authorized
                            ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                            : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {attempt.was_authorized ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-500" />
                            )}
                            <div>
                              <p className="font-medium">{attempt.email}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {attempt.ip_address} • {attempt.user_agent?.substring(0, 50)}...
                              </p>
                              <p className="text-xs text-gray-500">
                                {format(new Date(attempt.attempted_at), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR })}
                              </p>
                            </div>
                          </div>
                          <Badge variant={attempt.was_authorized ? "default" : "destructive"}>
                            {attempt.was_authorized ? "Autorizado" : "Negado"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 
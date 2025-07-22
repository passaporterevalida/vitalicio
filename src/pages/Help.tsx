import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ArrowLeft, ChevronDown, ChevronUp, ArrowUp, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Help() {
  const [openSections, setOpenSections] = useState<string[]>(['about']);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sections = [
    {
      id: 'about',
      title: '🎯 Sobre o Revalida Quest',
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3 text-lg">O que é o Revalida Quest?</h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
              O Revalida Quest é uma plataforma completa de preparação para o exame Revalida, com mais de 
              1.500 questões oficiais dos anos de 2011 a 2025, sistema de simulados, gamificação e 
              acompanhamento detalhado do seu progresso.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 text-lg">Como funciona o sistema de gamificação?</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3 text-base">Nossa plataforma possui um sistema completo de:</p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-base">
              <li><strong>XP (Experiência):</strong> Ganhe pontos respondendo questões</li>
              <li><strong>Níveis:</strong> Evolua conforme acumula XP</li>
              <li><strong>Badges:</strong> Conquiste medalhas por marcos específicos</li>
              <li><strong>Missões:</strong> Complete desafios diários e semanais</li>
              <li><strong>Ranking:</strong> Compare seu desempenho com outros usuários</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'plans',
      title: '📋 Planos e Pagamentos',
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3 text-lg">Quais são os planos disponíveis?</h4>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-base">
              <li><strong>Gratuito:</strong> 10 questões por dia + 1 simulado por mês</li>
              <li><strong>Basic (R$ 29,90/mês):</strong> Acesso ampliado às funcionalidades</li>
              <li><strong>Premium (R$ 79,90/mês):</strong> Acesso completo a todas as funcionalidades</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-lg">Como funciona a cobrança?</h4>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-base">
              <li>As assinaturas são cobradas mensalmente de forma automática</li>
              <li>O pagamento é processado de forma segura pelo Stripe</li>
              <li>Você receberá um email de confirmação a cada cobrança</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-lg">Posso cancelar minha assinatura?</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3 text-base">Sim! Você pode cancelar a qualquer momento de forma simples e transparente:</p>
            <ol className="list-decimal pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-base">
              <li>Acesse o <strong>Portal do Cliente</strong> no seu perfil</li>
              <li>Clique em "Gerenciar Assinatura"</li>
              <li>Selecione "Cancelar Assinatura"</li>
              <li>Confirme o cancelamento no portal seguro do Stripe</li>
              <li>Seu acesso continuará ativo até o final do período pago</li>
            </ol>
            
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">O que acontece após o cancelamento:</h5>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• <strong>Acesso mantido:</strong> Seus benefícios continuam até o final do período pago</li>
                <li>• <strong>Sem cobranças:</strong> Não haverá mais cobranças automáticas</li>
                <li>• <strong>Reativação fácil:</strong> Pode reativar a qualquer momento</li>
                <li>• <strong>Processo seguro:</strong> Cancelamento processado pelo Stripe</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-lg">Vocês oferecem reembolso?</h4>
            <p className="text-gray-700 dark:text-gray-300 text-base">
              Oferecemos reembolso total se solicitado em até <strong>7 dias</strong> após a cobrança. 
              Após esse período, não oferecemos reembolsos proporcionais.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'platform',
      title: '📚 Usando a Plataforma',
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3 text-lg">Quantas questões vocês têm?</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Temos mais de <strong>1.500 questões oficiais</strong> do Revalida dos anos de 2011 a 2025, 
              organizadas por área e tema.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-lg">Como funcionam os simulados?</h4>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-base">
              <li>Simulados cronometrados que replicam o formato real do Revalida</li>
              <li>Relatório detalhado de desempenho após cada simulado</li>
              <li>Análise por área de conhecimento</li>
              <li>Histórico de todos os simulados realizados</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-lg">Posso revisar questões que errei?</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-2">Sim! Você pode:</p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-base">
              <li>Acessar o histórico de questões respondidas</li>
              <li>Filtrar por questões erradas ou acertadas</li>
              <li>Revisar explicações detalhadas</li>
              <li>Marcar questões para revisão posterior</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-lg">Como acompanho meu progresso?</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-2">Oferecemos várias formas de acompanhar sua evolução:</p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-base">
              <li>Dashboard com estatísticas gerais</li>
              <li>Gráficos de desempenho por área</li>
              <li>Histórico de XP e níveis conquistados</li>
              <li>Relatórios de simulados</li>
              <li>Ranking de desempenho</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'technical',
      title: '🔧 Problemas Técnicos',
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3 text-lg">Não consigo fazer login</h4>
            <ol className="list-decimal pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-base">
              <li>Verifique se está usando o email e senha corretos</li>
              <li>Tente redefinir sua senha</li>
              <li>Limpe o cache do navegador</li>
              <li>Se persistir, entre em contato conosco</li>
            </ol>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-lg">A plataforma está lenta</h4>
            <ol className="list-decimal pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-base">
              <li>Verifique sua conexão com a internet</li>
              <li>Tente atualizar a página (F5)</li>
              <li>Teste em outro navegador</li>
              <li>Se o problema persistir, pode ser manutenção temporária</li>
            </ol>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-lg">Questões não estão carregando</h4>
            <ol className="list-decimal pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-base">
              <li>Atualize a página</li>
              <li>Verifique se atingiu o limite diário do seu plano</li>
              <li>Tente acessar de outro dispositivo</li>
              <li>Entre em contato se o problema continuar</li>
            </ol>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-lg">Não recebo emails da plataforma</h4>
            <ol className="list-decimal pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-base">
              <li>Verifique sua caixa de spam</li>
              <li>Adicione nosso email à lista de contatos seguros</li>
              <li>Confirme se o email cadastrado está correto</li>
              <li>Entre em contato para verificarmos o envio</li>
            </ol>
          </div>
        </div>
      )
    },
    {
      id: 'payment',
      title: '💳 Problemas de Pagamento',
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3 text-lg">Meu cartão foi recusado</h4>
            <ol className="list-decimal pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-base">
              <li>Verifique se os dados estão corretos</li>
              <li>Confirme se há limite disponível</li>
              <li>Tente outro cartão</li>
              <li>Entre em contato com seu banco</li>
              <li>Se persistir, entre em contato conosco</li>
            </ol>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-lg">Paguei mas ainda estou no plano gratuito</h4>
            <ol className="list-decimal pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-base">
              <li>Aguarde até 5 minutos para processamento</li>
              <li>Faça logout e login novamente</li>
              <li>Verifique seu email para confirmação de pagamento</li>
              <li>Se não resolver, entre em contato imediatamente</li>
            </ol>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-lg">Como altero meu método de pagamento?</h4>
            <ol className="list-decimal pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-base">
              <li>Acesse o <strong>Portal do Cliente</strong> no seu perfil</li>
              <li>Clique em "Gerenciar Pagamento"</li>
              <li>Adicione ou altere o cartão cadastrado</li>
              <li>Salve as alterações</li>
            </ol>
          </div>
        </div>
      )
    },
    {
      id: 'devices',
      title: '📱 Dispositivos e Compatibilidade',
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3 text-lg">Posso usar no celular?</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-2">Sim! Nossa plataforma é totalmente responsiva e funciona perfeitamente em:</p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-base">
              <li>Celulares (iOS e Android)</li>
              <li>Tablets</li>
              <li>Computadores (Windows, Mac, Linux)</li>
              <li>Qualquer navegador moderno</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-lg">Preciso instalar algum aplicativo?</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Não! O Revalida Quest funciona 100% no navegador. Não é necessário baixar nenhum aplicativo.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-lg">Posso usar offline?</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Atualmente não oferecemos modo offline. É necessária conexão com a internet para acessar as 
              questões e sincronizar seu progresso.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'account',
      title: '👥 Conta e Perfil',
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3 text-lg">Como altero meus dados?</h4>
            <ol className="list-decimal pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-base">
              <li>Acesse seu <strong>Perfil</strong> no menu</li>
              <li>Clique em "Editar Dados"</li>
              <li>Altere as informações desejadas</li>
              <li>Salve as alterações</li>
            </ol>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-lg">Posso compartilhar minha conta?</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Não. Cada conta é individual e não deve ser compartilhada. O compartilhamento de contas 
              viola nossos Termos de Uso.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-lg">Como excluo minha conta?</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Entre em contato conosco pelo email <strong>suporte@revalidaquest.com</strong> solicitando a exclusão. 
              Confirmaremos sua identidade e processaremos a solicitação conforme a LGPD.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'support',
      title: '📞 Suporte',
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3 text-lg">Como entro em contato?</h4>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-base">
              <li><strong>Email:</strong> suporte@revalidaquest.com</li>
              <li><strong>Tempo de resposta:</strong> Até 24 horas em dias úteis</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-lg">Em que horário vocês atendem?</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Nosso suporte por email funciona 24/7. Respondemos todas as mensagens em até 24 horas 
              durante dias úteis.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-lg">Que informações devo incluir ao pedir ajuda?</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-2">Para agilizar o atendimento, inclua sempre:</p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-base">
              <li>Seu email cadastrado na plataforma</li>
              <li>Descrição detalhada do problema</li>
              <li>Prints de tela se possível</li>
              <li>Navegador e dispositivo utilizados</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'privacy',
      title: '🔒 Privacidade e Segurança',
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3 text-lg">Meus dados estão seguros?</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-2">Sim! Utilizamos as melhores práticas de segurança:</p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-base">
              <li>Criptografia de dados</li>
              <li>Servidores seguros (Supabase)</li>
              <li>Processamento de pagamento seguro (Stripe)</li>
              <li>Conformidade com a LGPD</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-lg">Vocês vendem meus dados?</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Jamais! Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros 
              para fins comerciais.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/4 -left-4 w-16 h-16 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-blue-600 rounded-full opacity-20 animate-bounce delay-1000"></div>
      </div>

      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 sm:pt-28 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Header with Back Button */}
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Início
            </Link>
            
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
                  <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Central de Ajuda
                  </span>
                </h1>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-blue-200/50 dark:border-blue-700/50 mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Navegação Rápida</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      const element = document.getElementById(section.id);
                      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="text-left p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-sm text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700 hover:border-blue-300 dark:hover:border-blue-600"
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Help Sections */}
          <div className="space-y-6">
            {sections.map((section) => (
              <Card key={section.id} id={section.id} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-blue-200/50 dark:border-blue-700/50 scroll-mt-24">
                <Collapsible
                  open={openSections.includes(section.id)}
                  onOpenChange={() => toggleSection(section.id)}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors rounded-t-lg pb-4">
                      <CardTitle className="flex items-center justify-between">
                        <span className="text-xl">{section.title}</span>
                        {openSections.includes(section.id) ? (
                          <ChevronUp className="w-5 h-5 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 flex-shrink-0" />
                        )}
                      </CardTitle>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-0 pb-6">
                      {section.content}
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>

          {/* Contact Section */}
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-green-200/50 dark:border-green-700/50 mt-12">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Não encontrou sua dúvida?</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
                Entre em contato conosco: <a href="mailto:suporte@revalidaquest.com" className="text-blue-600 hover:text-blue-800 underline font-semibold">suporte@revalidaquest.com</a>
              </p>
              <p className="text-blue-600 dark:text-blue-400 font-medium text-lg">
                Estamos aqui para ajudar você a conquistar sua aprovação no Revalida! 🚀
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 rounded-full w-12 h-12 p-0 shadow-lg bg-blue-600 hover:bg-blue-700 z-50"
          size="sm"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}


import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowUp, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export default function Terms() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sections = [
    { id: 'acceptance', title: '1. Aceitação dos Termos' },
    { id: 'description', title: '2. Descrição do Serviço' },
    { id: 'plans', title: '3. Planos e Pagamentos' },
    { id: 'usage', title: '4. Uso Aceitável' },
    { id: 'intellectual', title: '5. Propriedade Intelectual' },
    { id: 'privacy', title: '6. Privacidade e Dados' },
    { id: 'availability', title: '7. Disponibilidade do Serviço' },
    { id: 'modifications', title: '8. Modificações dos Termos' },
    { id: 'cancellation', title: '9. Cancelamento e Suspensão' },
    { id: 'liability', title: '10. Limitação de Responsabilidade' },
    { id: 'support', title: '11. Suporte' },
    { id: 'law', title: '12. Lei Aplicável' },
    { id: 'contact', title: '13. Contato' }
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
      
      <div className="relative z-10 container mx-auto px-4 pt-24 sm:pt-28 pb-8">
        <div className="max-w-3xl mx-auto">
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
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
                  <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Termos de Uso
                  </span>
                </h1>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                <strong>Última atualização:</strong> 26 de junho de 2025
              </p>
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

          {/* Terms Content */}
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-blue-200/50 dark:border-blue-700/50">
            <CardContent className="p-6 sm:p-8 lg:p-10">
              <div className="prose prose-blue max-w-none">
                
                <section id="acceptance" className="mb-12 scroll-mt-24">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">1. Aceitação dos Termos</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    Ao acessar e utilizar a plataforma Revalida Quest, você concorda com estes Termos de Uso. Se você não concorda com qualquer parte destes termos, não deve utilizar nossos serviços.
                  </p>
                </section>

                <section id="description" className="mb-12 scroll-mt-24">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">2. Descrição do Serviço</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-4">
                    O Revalida Quest é uma plataforma digital de preparação para o exame Revalida, oferecendo:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-lg">
                    <li>Banco de questões oficiais do Revalida (2011-2025)</li>
                    <li>Sistema de simulados</li>
                    <li>Sistema de gamificação e ranking</li>
                    <li>Estatísticas de desempenho</li>
                    <li>Planos de assinatura com diferentes níveis de acesso</li>
                  </ul>
                </section>

                <section id="plans" className="mb-12 scroll-mt-24">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">3. Planos e Pagamentos</h2>
                  
                  <h3 className="text-xl font-medium mb-3 text-gray-900 dark:text-white">3.1 Planos Disponíveis</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-lg mb-6">
                    <li><strong>Gratuito:</strong> 10 questões por dia, 1 simulado por mês</li>
                    <li><strong>Basic (R$ 29,90/mês):</strong> Acesso ampliado às funcionalidades</li>
                    <li><strong>Premium (R$ 79,90/mês):</strong> Acesso completo a todas as funcionalidades</li>
                  </ul>

                  <h3 className="text-xl font-medium mb-3 text-gray-900 dark:text-white">3.2 Cobrança e Renovação</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-lg mb-6">
                    <li>As assinaturas são cobradas mensalmente de forma recorrente</li>
                    <li>O valor será debitado automaticamente na data de renovação</li>
                    <li>Você pode cancelar sua assinatura a qualquer momento através do portal do cliente</li>
                  </ul>

                  <h3 className="text-xl font-medium mb-3 text-gray-900 dark:text-white">3.3 Política de Reembolso</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-lg">
                    <li>Reembolsos podem ser solicitados em até 7 dias após a cobrança</li>
                    <li>Não oferecemos reembolsos proporcionais para cancelamentos após o período de 7 dias</li>
                  </ul>
                </section>

                <section id="usage" className="mb-12 scroll-mt-24">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">4. Uso Aceitável</h2>
                  
                  <h3 className="text-xl font-medium mb-3 text-gray-900 dark:text-white">4.1 Você Pode:</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-lg mb-6">
                    <li>Utilizar o conteúdo para sua preparação pessoal para o Revalida</li>
                    <li>Compartilhar seu progresso nas redes sociais</li>
                    <li>Acessar o conteúdo de acordo com os limites do seu plano</li>
                  </ul>

                  <h3 className="text-xl font-medium mb-3 text-gray-900 dark:text-white">4.2 Você NÃO Pode:</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-lg">
                    <li>Compartilhar sua conta com terceiros</li>
                    <li>Reproduzir, distribuir ou comercializar o conteúdo da plataforma</li>
                    <li>Usar ferramentas automatizadas (bots) para acessar o serviço</li>
                    <li>Tentar contornar as limitações do seu plano</li>
                    <li>Usar o serviço para qualquer atividade ilegal</li>
                  </ul>
                </section>

                {/* Continue with remaining sections following the same pattern */}
                <section id="intellectual" className="mb-12 scroll-mt-24">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">5. Propriedade Intelectual</h2>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-lg">
                    <li>O conteúdo das questões oficiais pertence aos órgãos responsáveis pelo Revalida</li>
                    <li>O sistema, interface e funcionalidades da plataforma são de propriedade do Revalida Quest</li>
                    <li>Você mantém os direitos sobre os dados que cria na plataforma (estatísticas, progresso)</li>
                  </ul>
                </section>

                <section id="privacy" className="mb-12 scroll-mt-24">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">6. Privacidade e Dados</h2>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-lg">
                    <li>Coletamos e processamos seus dados conforme nossa <Link to="/privacidade" className="text-blue-600 hover:text-blue-800 underline">Política de Privacidade</Link></li>
                    <li>Seus dados de desempenho são utilizados para melhorar sua experiência na plataforma</li>
                    <li>Não vendemos ou compartilhamos seus dados pessoais com terceiros sem consentimento</li>
                  </ul>
                </section>

                <section id="availability" className="mb-12 scroll-mt-24">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">7. Disponibilidade do Serviço</h2>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-lg">
                    <li>Nos esforçamos para manter o serviço disponível 24/7</li>
                    <li>Podem ocorrer interrupções para manutenção ou atualizações</li>
                    <li>Não nos responsabilizamos por perdas decorrentes de indisponibilidade temporária</li>
                  </ul>
                </section>

                <section id="modifications" className="mb-12 scroll-mt-24">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">8. Modificações dos Termos</h2>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-lg">
                    <li>Podemos atualizar estes termos a qualquer momento</li>
                    <li>Mudanças significativas serão comunicadas por email</li>
                    <li>O uso continuado após as mudanças constitui aceitação dos novos termos</li>
                  </ul>
                </section>

                <section id="cancellation" className="mb-12 scroll-mt-24">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">9. Cancelamento e Suspensão</h2>
                  
                  <h3 className="text-xl font-medium mb-3 text-gray-900 dark:text-white">9.1 Por Sua Parte:</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-lg mb-6">
                    <li>Você pode cancelar sua conta a qualquer momento</li>
                    <li>O acesso permanece ativo até o final do período pago</li>
                  </ul>

                  <h3 className="text-xl font-medium mb-3 text-gray-900 dark:text-white">9.2 Por Nossa Parte:</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-lg">
                    <li>Podemos suspender contas que violem estes termos</li>
                    <li>Em casos graves, podemos encerrar contas sem reembolso</li>
                  </ul>
                </section>

                <section id="liability" className="mb-12 scroll-mt-24">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">10. Limitação de Responsabilidade</h2>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-lg">
                    <li>O Revalida Quest é uma ferramenta de apoio aos estudos</li>
                    <li>Não garantimos aprovação no exame Revalida</li>
                    <li>Nossa responsabilidade é limitada ao valor pago pelos serviços</li>
                    <li>Não nos responsabilizamos por danos indiretos ou lucros cessantes</li>
                  </ul>
                </section>

                <section id="support" className="mb-12 scroll-mt-24">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">11. Suporte</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-3">Para dúvidas ou problemas:</p>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-lg">
                    <li>Email: <a href="mailto:suporte@revalidaquest.com" className="text-blue-600 hover:text-blue-800 underline">suporte@revalidaquest.com</a></li>
                    <li>Página de ajuda: <Link to="/ajuda" className="text-blue-600 hover:text-blue-800 underline">/ajuda</Link></li>
                  </ul>
                </section>

                <section id="law" className="mb-12 scroll-mt-24">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">12. Lei Aplicável</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida no foro da comarca onde está localizada nossa sede.
                  </p>
                </section>

                <section id="contact" className="mb-12 scroll-mt-24">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">13. Contato</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    <strong>Revalida Quest</strong><br />
                    Email: <a href="mailto:contato@revalidaquest.com" className="text-blue-600 hover:text-blue-800 underline">contato@revalidaquest.com</a>
                  </p>
                </section>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-12">
                  <p className="text-center text-gray-600 dark:text-gray-400 italic text-lg">
                    Ao utilizar o Revalida Quest, você declara ter lido, compreendido e concordado com estes Termos de Uso.
                  </p>
                </div>

              </div>
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

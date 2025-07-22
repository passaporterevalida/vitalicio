export function PricingHeader() {
  return (
    <div className="text-center mb-12">
      <div className="flex flex-col items-center justify-center gap-4 mb-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          Escolha seu{' '}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-3xl lg:text-5xl">
            plano ideal
          </span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comece grátis e evolua conforme suas necessidades. Todos os planos incluem acesso às questões oficiais e sistema gamificado.
        </p>
      </div>
    </div>
  );
}
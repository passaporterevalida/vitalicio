import { PricingPlansGrid } from "@/components/pricing/PricingPlansGrid";
export function PricingSection() {
  return <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Escolha seu{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-3xl lg:text-5xl">
              plano ideal
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comece grátis e evolua conforme suas necessidades. Todos os planos incluem
            acesso às questões oficiais e sistema gamificado.
          </p>
        </div>

        {/* Pricing Grid */}
        <PricingPlansGrid subscribed={false} subscription_tier={null} loading={false} />
      </div>
    </section>;
}
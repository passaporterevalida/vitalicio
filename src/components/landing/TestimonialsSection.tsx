import { Star, Quote } from "lucide-react";
export function TestimonialsSection() {
  const testimonials = [{
    name: "Dr. Maria Silva",
    role: "Médica aprovada em 2024",
    content: "O RevalidaQuest foi fundamental na minha aprovação. O sistema gamificado me manteve motivada todos os dias, e as análises com IA me ajudaram a focar nas áreas que eu mais precisava melhorar.",
    rating: 5,
    avatar: "MS"
  }, {
    name: "Dr. Carlos Santos",
    role: "Médico aprovado em 2023",
    content: "Fantástica plataforma! As questões são exatamente como as da prova real. O ranking me motivou a estudar mais, e consegui melhorar minha performance semana após semana.",
    rating: 5,
    avatar: "CS"
  }, {
    name: "Dra. Ana Costa",
    role: "Médica aprovada em 2024",
    content: "Recomendo muito! A organização por áreas médicas e os simulados personalizados fizeram toda a diferença. Passei na primeira tentativa graças ao RevalidaQuest.",
    rating: 5,
    avatar: "AC"
  }];
  return <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            O que dizem nossos{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-3xl lg:text-5xl">
              médicos
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mais de 11.200 médicos já confiaram no RevalidaQuest para sua preparação.
            Veja alguns depoimentos reais de quem foi aprovado.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-blue-100 relative">
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-blue-300 mb-4" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />)}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
}
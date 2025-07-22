import { useState } from "react";
import { BookOpen, Search, Filter, Sparkles, Target } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface GamifiedQuestionsHeaderProps {
  anoSelecionado: number;
  setAnoSelecionado: (ano: number) => void;
  totalQuestoes: number;
  tipoProva?: string;
  setTipoProva?: (tipo: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedArea: string;
  setSelectedArea: (area: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (difficulty: string) => void;
}
const AREAS = ["Todos", "Clínica Médica", "Cirurgia", "Pediatria", "Ginecologia e Obstetrícia", "Medicina Preventiva", "Psiquiatria", "Cardiologia", "Neurologia", "Dermatologia", "Oftalmologia", "Ortopedia", "Radiologia"];
const DIFFICULTIES = ["Todas", "Fácil", "Médio", "Difícil"];
export function GamifiedQuestionsHeader({
  anoSelecionado,
  setAnoSelecionado,
  totalQuestoes,
  tipoProva,
  setTipoProva,
  searchTerm,
  setSearchTerm,
  selectedArea,
  setSelectedArea,
  selectedDifficulty,
  setSelectedDifficulty
}: GamifiedQuestionsHeaderProps) {
  const [showFilters, setShowFilters] = useState(false);
  return <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 border-2 border-blue-100 dark:border-gray-700 rounded-3xl p-4 sm:p-6 lg:p-8 mb-2 sm:mb-4 shadow-2xl">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 right-1/4 w-4 h-4 sm:w-6 sm:h-6 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-4 left-1/4 w-3 h-3 sm:w-4 sm:h-4 bg-purple-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 right-8 w-3 h-3 sm:w-5 sm:h-5 bg-yellow-400 rounded-full opacity-20 animate-ping"></div>
        <Sparkles className="absolute top-6 left-8 w-4 h-4 sm:w-5 sm:h-5 text-blue-300 opacity-30 animate-pulse" />
      </div>

      <div className="relative z-10">
        {/* Title and Stats Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4 sm:mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              {/* Ícone removido daqui */}
              {/* <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg animate-pulse">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div> */}
              {/* <h1 ...>Banco de Questões Oficiais</h1> */}
            </div>
            {/* Stats Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-200 dark:border-gray-600 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 shadow-md">
              <span className='p-2 sm:p-2.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg animate-pulse'>
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </span>
              {/* <Target className="w-4 h-4 text-blue-600" /> */}
              <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                {totalQuestoes > 0 ? `${totalQuestoes} questões encontradas` : "Nenhuma questão encontrada"}
              </span>
            </div>
          </div>
          
          {/* Year and Type Selectors */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <Select onValueChange={value => setAnoSelecionado(parseInt(value))} defaultValue={anoSelecionado.toString()}>
              <SelectTrigger className="w-full sm:w-[180px] bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-blue-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-gray-500 transition-colors shadow-lg">
                <SelectValue placeholder="Selecione o Ano" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-gray-600 shadow-xl">
                <SelectItem value="2011">Revalida 2011</SelectItem>
                <SelectItem value="2012">Revalida 2012</SelectItem>
                <SelectItem value="2013">Revalida 2013</SelectItem>
                <SelectItem value="2014">Revalida 2014</SelectItem>
                <SelectItem value="2015">Revalida 2015</SelectItem>
                <SelectItem value="2016">Revalida 2016</SelectItem>
                <SelectItem value="2017">Revalida 2017</SelectItem>
                <SelectItem value="2020">Revalida 2020</SelectItem>
                <SelectItem value="2021">Revalida 2021</SelectItem>
                <SelectItem value="2022">Revalida 2022</SelectItem>
                <SelectItem value="2023">Revalida 2023</SelectItem>
                <SelectItem value="2024">Revalida 2024</SelectItem>
                <SelectItem value="2025">Revalida 2025</SelectItem>
              </SelectContent>
            </Select>
            
            {[2013, 2014, 2015, 2016, 2017, 2022, 2023].includes(anoSelecionado) && tipoProva && setTipoProva && <Select onValueChange={setTipoProva} defaultValue={tipoProva}>
                  <SelectTrigger className="w-full sm:w-[180px] bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-blue-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-gray-500 transition-colors shadow-lg">
                    <SelectValue placeholder="Selecione a Prova" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-gray-600 shadow-xl">
                    {[2013, 2014, 2015].includes(anoSelecionado) ? <>
                        <SelectItem value="Cinza">Prova Cinza</SelectItem>
                        <SelectItem value="Vermelha">Prova Vermelha</SelectItem>
                      </> : <>
                        <SelectItem value="Prova 1">Prova 1</SelectItem>
                        <SelectItem value="Prova 2">Prova 2</SelectItem>
                      </>}
                  </SelectContent>
                </Select>}
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 sm:w-5 sm:h-5" />
            <Input placeholder="Buscar questões por palavra-chave..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 sm:pl-12 pr-4 h-12 sm:h-14 text-base bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-blue-200 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-500 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl" />
          </div>

          {/* Filter Toggle */}
          <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3">
            <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 ${showFilters ? 'from-blue-500 to-purple-600 text-white' : 'from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-700/90 text-gray-700 dark:text-gray-300 border-2 border-blue-200 dark:border-gray-600'}`}>
              <Filter className={`w-4 h-4 sm:w-5 sm:h-5 ${showFilters ? 'animate-spin' : ''}`} />
              <span className="font-medium text-sm sm:text-base">Filtros Avançados</span>
              {showFilters && <Sparkles className="w-4 h-4 animate-pulse" />}
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && <div className="animate-fade-in grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border-2 border-blue-100 dark:border-gray-700 shadow-inner">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Área do Conhecimento
                </label>
                <Select value={selectedArea} onValueChange={setSelectedArea}>
                  <SelectTrigger className="h-12 bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-gray-500 transition-colors shadow-md">
                    <SelectValue placeholder="Selecione uma área" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-gray-600 shadow-xl max-h-60">
                    {AREAS.map(area => <SelectItem key={area} value={area} className="hover:bg-blue-50 dark:hover:bg-gray-700">
                        {area}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Nível de Dificuldade
                </label>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="h-12 bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-gray-500 transition-colors shadow-md">
                    <SelectValue placeholder="Selecione a dificuldade" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-gray-600 shadow-xl">
                    {DIFFICULTIES.map(difficulty => <SelectItem key={difficulty} value={difficulty} className="hover:bg-blue-50 dark:hover:bg-gray-700">
                        {difficulty}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>}
        </div>
      </div>
    </div>;
}
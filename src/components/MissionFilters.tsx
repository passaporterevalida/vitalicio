
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Star, Clock, Target, Flame } from 'lucide-react';

interface MissionFiltersProps {
  onFilterChange: (filters: any) => void;
}

export function MissionFilters({ onFilterChange }: MissionFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('xp');

  const difficulties = [
    { value: 'all', label: 'Todas as Dificuldades', icon: Target },
    { value: 'easy', label: 'Fácil', icon: Star, color: 'text-green-600' },
    { value: 'medium', label: 'Médio', icon: Star, color: 'text-yellow-600' },
    { value: 'hard', label: 'Difícil', icon: Star, color: 'text-red-600' }
  ];

  const areas = [
    { value: 'all', label: 'Todas as Áreas' },
    { value: 'Clínica Médica', label: 'Clínica Médica' },
    { value: 'Cirurgia', label: 'Cirurgia' },
    { value: 'Pediatria', label: 'Pediatria' },
    { value: 'Ginecologia e Obstetrícia', label: 'Ginecologia' },
    { value: 'Medicina Preventiva', label: 'Preventiva' },
    { value: 'Mista', label: 'Mista' }
  ];

  const sortOptions = [
    { value: 'xp', label: 'Maior XP', icon: Star },
    { value: 'difficulty', label: 'Dificuldade', icon: Target },
    { value: 'progress', label: 'Progresso', icon: Clock },
    { value: 'trending', label: 'Em Alta', icon: Flame }
  ];

  const handleFilterChange = () => {
    onFilterChange({
      searchTerm,
      difficulty: selectedDifficulty,
      area: selectedArea,
      sortBy
    });
  };

  return (
    <Card className="mb-6 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <Filter className="w-5 h-5" />
          Filtros e Busca
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar missões..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                handleFilterChange();
              }}
              className="pl-10 border-blue-200 focus:border-blue-400"
            />
          </div>

          {/* Difficulty Filter */}
          <Select value={selectedDifficulty} onValueChange={(value) => {
            setSelectedDifficulty(value);
            handleFilterChange();
          }}>
            <SelectTrigger className="border-blue-200 focus:border-blue-400">
              <SelectValue placeholder="Dificuldade" />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map((diff) => (
                <SelectItem key={diff.value} value={diff.value}>
                  <div className="flex items-center gap-2">
                    <diff.icon className={`w-4 h-4 ${diff.color || 'text-gray-600'}`} />
                    {diff.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Area Filter */}
          <Select value={selectedArea} onValueChange={(value) => {
            setSelectedArea(value);
            handleFilterChange();
          }}>
            <SelectTrigger className="border-blue-200 focus:border-blue-400">
              <SelectValue placeholder="Área Médica" />
            </SelectTrigger>
            <SelectContent>
              {areas.map((area) => (
                <SelectItem key={area.value} value={area.value}>
                  {area.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort Options */}
          <Select value={sortBy} onValueChange={(value) => {
            setSortBy(value);
            handleFilterChange();
          }}>
            <SelectTrigger className="border-blue-200 focus:border-blue-400">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-2">
                    <option.icon className="w-4 h-4 text-blue-600" />
                    {option.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Quick Filter Badges */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="outline" className="cursor-pointer hover:bg-blue-100 border-blue-300">
            <Flame className="w-3 h-3 mr-1" />
            Em Alta
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-green-100 border-green-300">
            <Star className="w-3 h-3 mr-1" />
            Recomendadas
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-purple-100 border-purple-300">
            <Clock className="w-3 h-3 mr-1" />
            Rápidas (&lt; 15 min)
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}


import { useState, useEffect, useMemo } from 'react';
import { QUESTOES_REVALIDA_2025_1 } from '@/data/questoesRevalida2025_1';
import { QUESTOES_REVALIDA_2024_1 } from '@/data/questoesRevalida2024_1';
import { QUESTOES_REVALIDA_2023_1 } from '@/data/questoesRevalida2023_1';
import { QUESTOES_REVALIDA_2023_2 } from '@/data/questoesRevalida2023_2';
import { QUESTOES_REVALIDA_2022_1 } from '@/data/questoesRevalida2022_1';
import { QUESTOES_REVALIDA_2022_2 } from '@/data/questoesRevalida2022_2';
import { QUESTOES_REVALIDA_2021 } from '@/data/questoesRevalida2021';
import { QUESTOES_REVALIDA_2020 } from '@/data/questoesRevalida2020';
import { type Question } from '@/types/question';

// Consolidar todas as questões
const todasQuestoes: Question[] = [
  ...QUESTOES_REVALIDA_2025_1,
  ...QUESTOES_REVALIDA_2024_1,
  ...QUESTOES_REVALIDA_2023_1,
  ...QUESTOES_REVALIDA_2023_2,
  ...QUESTOES_REVALIDA_2022_1,
  ...QUESTOES_REVALIDA_2022_2,
  ...QUESTOES_REVALIDA_2021,
  ...QUESTOES_REVALIDA_2020
];

export function useQuestions() {
  const [anoSelecionado, setAnoSelecionado] = useState<string>('todos');
  const [areaSelecionada, setAreaSelecionada] = useState<string>('todas');
  const [dificuldadeSelecionada, setDificuldadeSelecionada] = useState<string>('todas');

  // Filtrar questões baseado nos filtros selecionados
  const questoesAnoSelecionado = useMemo(() => {
    let questoesFiltradas = [...todasQuestoes];

    // Filtro por ano
    if (anoSelecionado !== 'todos') {
      questoesFiltradas = questoesFiltradas.filter(q => q.year === parseInt(anoSelecionado));
    }

    // Filtro por área
    if (areaSelecionada !== 'todas') {
      questoesFiltradas = questoesFiltradas.filter(q => q.area === areaSelecionada);
    }

    // Filtro por dificuldade (if property exists)
    if (dificuldadeSelecionada !== 'todas') {
      questoesFiltradas = questoesFiltradas.filter(q => (q as any).dificuldade === dificuldadeSelecionada);
    }

    return questoesFiltradas;
  }, [anoSelecionado, areaSelecionada, dificuldadeSelecionada]);

  // Areas disponíveis baseadas nas questões filtradas
  const areasDisponiveis = useMemo(() => {
    const areas = new Set<string>();
    questoesAnoSelecionado.forEach(q => {
      if (q.area) areas.add(q.area);
    });
    return Array.from(areas).sort();
  }, [questoesAnoSelecionado]);

  // Anos disponíveis
  const anosDisponiveis = useMemo(() => {
    const anos = new Set<number>();
    todasQuestoes.forEach(q => {
      if (q.year) anos.add(q.year);
    });
    return Array.from(anos).sort((a, b) => b - a);
  }, []);

  return {
    questoesAnoSelecionado,
    anoSelecionado,
    setAnoSelecionado,
    areaSelecionada,
    setAreaSelecionada,
    dificuldadeSelecionada,
    setDificuldadeSelecionada,
    anosDisponiveis,
    areasDisponiveis,
    todasQuestoes
  };
}

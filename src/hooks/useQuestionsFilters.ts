
import { useState, useMemo } from "react";
import { type Question } from "@/components/QuestionCard";
import { getQuestionsByYearAndType } from "@/utils/questionSelector";

interface UseQuestionsFiltersParams {
  ano: number;
  tipo: string | null;
  searchTerm: string;
  area: string;
  difficulty: string;
  page: number;
}

export function useQuestionsFilters({
  ano,
  tipo,
  searchTerm,
  area,
  difficulty,
  page
}: UseQuestionsFiltersParams) {
  const questionsPerPage = 10;

  // Get questions for the selected year and type
  const questoesAnoSelecionado = useMemo(() => {
    return getQuestionsByYearAndType(ano, tipo);
  }, [ano, tipo]);

  const filteredQuestions = useMemo(() => {
    let filtered = [...questoesAnoSelecionado];

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (q) =>
          q.enunciado.toLowerCase().includes(term) ||
          q.options.some((opt) => opt.text.toLowerCase().includes(term)) ||
          q.area.toLowerCase().includes(term) ||
          (q.referencia && q.referencia.toLowerCase().includes(term))
      );
    }

    // Filter by area
    if (area !== "Todos") {
      filtered = filtered.filter((q) => q.area === area);
    }

    // Filter by difficulty (mock implementation based on question characteristics)
    if (difficulty !== "Todas") {
      filtered = filtered.filter((q) => {
        const textLength = q.enunciado.length;
        const hasImage = !!q.image;
        
        // Simple heuristic for difficulty
        if (difficulty === "Fácil") {
          return textLength < 300 && !hasImage;
        } else if (difficulty === "Médio") {
          return textLength >= 300 && textLength < 600;
        } else if (difficulty === "Difícil") {
          return textLength >= 600 || hasImage;
        }
        return true;
      });
    }

    return filtered;
  }, [questoesAnoSelecionado, searchTerm, area, difficulty]);

  const totalQuestions = filteredQuestions.length;
  const startIndex = (page - 1) * questionsPerPage;
  const paginatedQuestions = filteredQuestions.slice(startIndex, startIndex + questionsPerPage);

  return {
    filteredQuestions: paginatedQuestions,
    totalQuestions,
    questionsPerPage,
  };
}

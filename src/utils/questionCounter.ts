
import { QUESTOES_REVALIDA_2011 } from "@/data/questoesRevalida2011";
import { QUESTOES_REVALIDA_2012 } from "@/data/questoesRevalida2012";
import { QUESTOES_REVALIDA_2013 } from "@/data/questoesRevalida2013";
import { QUESTOES_REVALIDA_2013_VERMELHA } from "@/data/questoesRevalida2013Vermelha";
import { QUESTOES_REVALIDA_2014 } from "@/data/questoesRevalida2014";
import { QUESTOES_REVALIDA_2014_VERMELHA } from "@/data/questoesRevalida2014Vermelha";
import { QUESTOES_REVALIDA_2015 } from "@/data/questoesRevalida2015";
import { QUESTOES_REVALIDA_2015_VERMELHA } from "@/data/questoesRevalida2015Vermelha";
import { QUESTOES_REVALIDA_2016_PROVA1 } from "@/data/questoesRevalida2016Prova1";
import { QUESTOES_REVALIDA_2016_PROVA2 } from "@/data/questoesRevalida2016Prova2";
import { QUESTOES_REVALIDA_2017_PROVA1 } from "@/data/questoesRevalida2017Prova1";
import { QUESTOES_REVALIDA_2017_PROVA2 } from "@/data/questoesRevalida2017Prova2";
import { QUESTOES_REVALIDA_2020 } from "@/data/questoesRevalida2020";
import { QUESTOES_REVALIDA_2021 } from "@/data/questoesRevalida2021";
import { QUESTOES_REVALIDA_2022_1 } from "@/data/questoesRevalida2022_1";
import { QUESTOES_REVALIDA_2022_2 } from "@/data/questoesRevalida2022_2";
import { QUESTOES_REVALIDA_2023_1 } from "@/data/questoesRevalida2023_1";
import { QUESTOES_REVALIDA_2023_2 } from "@/data/questoesRevalida2023_2";
import { QUESTOES_REVALIDA_2024_1 } from "@/data/questoesRevalida2024_1";
import { QUESTOES_REVALIDA_2025_1 } from "@/data/questoesRevalida2025_1";

export function getTotalQuestionsInSystem(): number {
  const allQuestions = [
    ...QUESTOES_REVALIDA_2011,
    ...QUESTOES_REVALIDA_2012,
    ...QUESTOES_REVALIDA_2013,
    ...QUESTOES_REVALIDA_2013_VERMELHA,
    ...QUESTOES_REVALIDA_2014,
    ...QUESTOES_REVALIDA_2014_VERMELHA,
    ...QUESTOES_REVALIDA_2015,
    ...QUESTOES_REVALIDA_2015_VERMELHA,
    ...QUESTOES_REVALIDA_2016_PROVA1,
    ...QUESTOES_REVALIDA_2016_PROVA2,
    ...QUESTOES_REVALIDA_2017_PROVA1,
    ...QUESTOES_REVALIDA_2017_PROVA2,
    ...QUESTOES_REVALIDA_2020,
    ...QUESTOES_REVALIDA_2021,
    ...QUESTOES_REVALIDA_2022_1,
    ...QUESTOES_REVALIDA_2022_2,
    ...QUESTOES_REVALIDA_2023_1,
    ...QUESTOES_REVALIDA_2023_2,
    ...QUESTOES_REVALIDA_2024_1,
    ...QUESTOES_REVALIDA_2025_1,
  ];

  // Remove duplicates by ID in case there are any
  const uniqueQuestions = Array.from(
    new Map(allQuestions.map(q => [q.id, q])).values()
  );

  return uniqueQuestions.length;
}

export function getQuestionsCompletionStats(totalAnswered: number) {
  const totalInSystem = getTotalQuestionsInSystem();
  const completionPercentage = Math.round((totalAnswered / totalInSystem) * 100);
  
  return {
    totalInSystem,
    completionPercentage,
    remaining: totalInSystem - totalAnswered
  };
}

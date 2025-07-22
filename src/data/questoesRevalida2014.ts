
import { type Question } from "@/components/QuestionCard";
import { QUESTOES_REVALIDA_2014_1_14 } from "./questoesRevalida2014_1_14";
import { QUESTOES_REVALIDA_2014_15_28 } from "./questoesRevalida2014_15_28";
import { QUESTOES_REVALIDA_2014_29_42 } from "./questoesRevalida2014_29_42";
import { QUESTOES_REVALIDA_2014_43_57 } from "./questoesRevalida2014_43_57";
import { QUESTOES_REVALIDA_2014_58_63 } from "./questoesRevalida2014_58_63";
import { QUESTOES_REVALIDA_2014_64_79 } from "./questoesRevalida2014_64_79";
import { QUESTOES_REVALIDA_2014_80_95 } from "./questoesRevalida2014_80_95";
import { QUESTOES_REVALIDA_2014_96_110 } from "./questoesRevalida2014_96_110";

// Crie os próximos blocos similares conforme as próximas questões forem transcritas
export const QUESTOES_REVALIDA_2014: Question[] = [
  ...QUESTOES_REVALIDA_2014_1_14,
  ...QUESTOES_REVALIDA_2014_15_28,
  ...QUESTOES_REVALIDA_2014_29_42,
  ...QUESTOES_REVALIDA_2014_43_57,
  ...QUESTOES_REVALIDA_2014_58_63,
  ...QUESTOES_REVALIDA_2014_64_79,
  ...QUESTOES_REVALIDA_2014_80_95,
  ...QUESTOES_REVALIDA_2014_96_110,
  // ...import e adiciona depois os próximos blocos
];

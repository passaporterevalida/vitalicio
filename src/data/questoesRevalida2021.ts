
import { type Question } from "@/components/QuestionCard";
import { QUESTOES_REVALIDA_2021_1_36 } from "./questoesRevalida2021_1_36";
import { QUESTOES_REVALIDA_2021_37_73 } from "./questoesRevalida2021_37_73";
import { QUESTOES_REVALIDA_2021_74_100 } from "./questoesRevalida2021_74_100";

// TODO: Todas as questões de 2021 foram adicionadas.
export const QUESTOES_REVALIDA_2021: Question[] = [
  ...QUESTOES_REVALIDA_2021_1_36,
  ...QUESTOES_REVALIDA_2021_37_73,
  ...QUESTOES_REVALIDA_2021_74_100,
];

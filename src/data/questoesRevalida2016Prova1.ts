
import { type Question } from "@/components/QuestionCard";
import { QUESTOES_REVALIDA_2016_1_25 } from "./questoesRevalida2016_1_25";
import { QUESTOES_REVALIDA_2016_26_60 } from "./questoesRevalida2016_26_60";
import { QUESTOES_REVALIDA_2016_61_98 } from "./questoesRevalida2016_61_98";
import { QUESTOES_REVALIDA_2016_99_100 } from "./questoesRevalida2016_99_100";

export const QUESTOES_REVALIDA_2016_PROVA1: Question[] = [
  ...QUESTOES_REVALIDA_2016_1_25,
  ...QUESTOES_REVALIDA_2016_26_60,
  ...QUESTOES_REVALIDA_2016_61_98,
  ...QUESTOES_REVALIDA_2016_99_100,
];

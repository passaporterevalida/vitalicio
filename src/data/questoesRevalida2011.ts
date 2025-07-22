export type Option = {
  id: string;
  text: string;
  feedbackCorreta?: string;
  feedbackErrada?: string;
};
export type Question = {
  id: number;
  year: number;
  area: string;
  enunciado: string;
  options: Option[];
  correct: string;
  referencia?: string;
};

import { QUESTOES_REVALIDA_2011_1_10 } from "./questoesRevalida2011_1_10";
import { QUESTOES_REVALIDA_2011_11_20 } from "./questoesRevalida2011_11_20";
import { QUESTOES_REVALIDA_2011_21_30 } from "./questoesRevalida2011_21_30";
import { QUESTOES_REVALIDA_2011_31_40 } from "./questoesRevalida2011_31_40";
import { QUESTOES_REVALIDA_2011_41_50 } from "./questoesRevalida2011_41_50";
import { QUESTOES_REVALIDA_2011_51_60 } from "./questoesRevalida2011_51_60";
import { QUESTOES_REVALIDA_2011_61_70 } from "./questoesRevalida2011_61_70";
import { QUESTOES_REVALIDA_2011_71_80 } from "./questoesRevalida2011_71_80";
import { QUESTOES_REVALIDA_2011_81_90 } from "./questoesRevalida2011_81_90";
import { QUESTOES_REVALIDA_2011_91_100 } from "./questoesRevalida2011_91_100";
import { QUESTOES_REVALIDA_2011_101_110 } from "./questoesRevalida2011_101_110";

// Concatenar todas as páginas para exportação principal
export const QUESTOES_REVALIDA_2011: Question[] = [
  ...QUESTOES_REVALIDA_2011_1_10,
  ...QUESTOES_REVALIDA_2011_11_20,
  ...QUESTOES_REVALIDA_2011_21_30,
  ...QUESTOES_REVALIDA_2011_31_40,
  ...QUESTOES_REVALIDA_2011_41_50,
  ...QUESTOES_REVALIDA_2011_51_60,
  ...QUESTOES_REVALIDA_2011_61_70,
  ...QUESTOES_REVALIDA_2011_71_80,
  ...QUESTOES_REVALIDA_2011_81_90,
  ...QUESTOES_REVALIDA_2011_91_100,
  ...QUESTOES_REVALIDA_2011_101_110,
];

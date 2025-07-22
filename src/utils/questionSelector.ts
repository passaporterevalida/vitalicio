
import { type Question } from "@/components/QuestionCard";
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

export function getQuestionsByYearAndType(anoSelecionado: number, tipoProva: string | null): Question[] {
  if (anoSelecionado === 2011) {
    return QUESTOES_REVALIDA_2011;
  }
  if (anoSelecionado === 2012) {
    return QUESTOES_REVALIDA_2012;
  }
  if (anoSelecionado === 2013) {
    return tipoProva === "Cinza"
      ? QUESTOES_REVALIDA_2013
      : QUESTOES_REVALIDA_2013_VERMELHA;
  }
  if (anoSelecionado === 2014) {
    return tipoProva === "Cinza"
      ? QUESTOES_REVALIDA_2014
      : QUESTOES_REVALIDA_2014_VERMELHA;
  }
  if (anoSelecionado === 2015) {
    return tipoProva === "Cinza"
      ? QUESTOES_REVALIDA_2015
      : QUESTOES_REVALIDA_2015_VERMELHA;
  }
  if (anoSelecionado === 2016) {
    return tipoProva === "Prova 2"
      ? QUESTOES_REVALIDA_2016_PROVA2
      : QUESTOES_REVALIDA_2016_PROVA1;
  }
  if (anoSelecionado === 2017) {
    return tipoProva === "Prova 2"
      ? QUESTOES_REVALIDA_2017_PROVA2
      : QUESTOES_REVALIDA_2017_PROVA1;
  }
  if (anoSelecionado === 2020) {
    return QUESTOES_REVALIDA_2020;
  }
  if (anoSelecionado === 2021) {
    return QUESTOES_REVALIDA_2021;
  }
  if (anoSelecionado === 2022) {
    return tipoProva === "Prova 2"
      ? QUESTOES_REVALIDA_2022_2
      : QUESTOES_REVALIDA_2022_1;
  }
  if (anoSelecionado === 2023) {
    return tipoProva === "Prova 2"
      ? QUESTOES_REVALIDA_2023_2
      : QUESTOES_REVALIDA_2023_1;
  }
  if (anoSelecionado === 2024) {
    return QUESTOES_REVALIDA_2024_1;
  }
  if (anoSelecionado === 2025) {
    return QUESTOES_REVALIDA_2025_1;
  }
  return [];
}

export function getDefaultTipoProva(ano: number): string {
  if ([2013, 2014, 2015].includes(ano)) {
    return "Cinza";
  } else if ([2016, 2017, 2022, 2023, 2024, 2025].includes(ano)) {
    return "Prova 1";
  }
  return "";
}


import { useState, useMemo } from "react";
import { type Question } from "@/types/question";
import { useLimitChecker } from "./useLimitChecker";

export interface MissaoConfig {
  quantidade: number;
  areas: string[];
  tempoMinutos: number;
}

export function useMissao(questoes: Question[], config?: MissaoConfig) {
  const { checkMissaoLimit, incrementMissaoUsage } = useLimitChecker();
  
  const questoesSelecionadas = useMemo(() => {
    let questoesFiltradas = [...questoes];
    
    if (!config) {
      const questoesEmbaralhadas = [...questoesFiltradas].sort(() => Math.random() - 0.5);
      const questoesSorteadas = questoesEmbaralhadas.slice(0, 10);
      return questoesSorteadas;
    }
    
    if (config.areas && config.areas.length > 0) {
      questoesFiltradas = questoesFiltradas.filter(q => 
        config.areas.includes(q.area)
      );
      
      if (questoesFiltradas.length === 0) {
        questoesFiltradas = [...questoes];
      }
    }
    
    const quantidadeSolicitada = config.quantidade || 10;
    console.log('Quantidade solicitada:', quantidadeSolicitada);
    
    const questoesEmbaralhadas = [...questoesFiltradas].sort(() => Math.random() - 0.5);
    const quantidadeFinal = Math.min(quantidadeSolicitada, questoesEmbaralhadas.length);
    const questoesSorteadas = questoesEmbaralhadas.slice(0, quantidadeFinal);
    
    console.log('Questões finais selecionadas:', questoesSorteadas.length);
    console.log('=== FIM DEBUG ===');
    
    return questoesSorteadas;
  }, [questoes, config?.quantidade, config?.areas, config?.tempoMinutos]);

  const [respostas, setRespostas] = useState<{[id: number]: string}>({});
  const [index, setIndex] = useState(0);
  const [missaoIniciada, setMissaoIniciada] = useState(false);

  function respostaAtual() {
    const questaoAtual = questoesSelecionadas[index];
    const resposta = questaoAtual ? respostas[questaoAtual.id] : undefined;
    return resposta;
  }
  
  function responder(resp: string) {
    if (questoesSelecionadas[index]) {
      const questaoId = questoesSelecionadas[index].id;
      console.log('Respondendo questão ID:', questaoId, 'com resposta:', resp);
      setRespostas(r => ({ ...r, [questaoId]: resp }));
    }
  }
  
  function proxima() {
    const novoIndex = index + 1;
    console.log('Navegando para próxima questão. Índice atual:', index, 'Novo índice:', novoIndex);
    setIndex(novoIndex);
  }

  const iniciarMissao = async (): Promise<boolean> => {
    if (missaoIniciada) {
      return true;
    }

    const podeIniciar = await checkMissaoLimit();
    
    if (!podeIniciar) {
      return false;
    }

    await incrementMissaoUsage();
    setMissaoIniciada(true);
    
    return true;
  };
  
  return {
    questoesSelecionadas,
    respostas,
    index,
    total: questoesSelecionadas.length,
    atual: questoesSelecionadas[index],
    respostaAtual,
    responder,
    proxima,
    terminou: index >= questoesSelecionadas.length,
    config: config || { quantidade: 10, areas: [], tempoMinutos: 120 },
    iniciarMissao,
    missaoIniciada
  };
}

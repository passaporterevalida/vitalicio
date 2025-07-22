
import type { Question } from "./questoesRevalida2011";

// QUESTÕES 61 A 70 - REVALIDA 2012
export const QUESTOES_REVALIDA_2012_61_70: Question[] = [
  // Questão 61
  {
    id: 61,
    year: 2012,
    area: "Clínica Médica / Neurologia",
    enunciado: `Um homem de 75 anos de idade é trazido pela filha com história de comportamento anormal há sete dias. Havia chegado da fazenda, onde administra suas propriedades; dormiu e acordou desorientado. Passou a perambular pela casa sem reconhecer pessoas, dirigindo-se à porta da rua para sair. Apresentou evacuações e diurese sem ir ao banheiro e dificuldade para despir-se, necessitando ser higienizado pela filha. Morando no andar superior da casa, passou a apresentar algum grau de dificuldade ao descer as escadas, tendo de ser ajudado. Come com lentidão, necessitando que o alimento lhe seja dado. É hipertenso e toma medicações há 13 anos. Teve retenção urinária há 10 dias, por hipertrofia prostática, necessitando de sondagem de alívio. Não refere febre.
Ao exame físico: paciente vigil, porém desatento, sem alterações aparentes de humor, responde com lentidão às perguntas, hesita ao deambular e sentar. Temperatura = 37,5ºC, pulso radial = 110 bpm, pressão arterial = 140 x 80 mmHg. Exame neurológico: hesitação aos movimentos e tremores finos, ausentes em repouso e desencadeados pelo movimento. Sem rigidez. Marcha hesitante. Reflexos osteotendíneos sem alterações. Demais aspectos do exame físico inalterados.

O diagnóstico mais compatível com o quadro é`,
    options: [
      {
        id: "A",
        text: "demência vascular.",
        feedbackErrada: "O quadro não evolui de forma tão aguda, nem apresenta rebaixamento de consciência."
      },
      {
        id: "B",
        text: "doença de Alzheimer.",
        feedbackErrada: "A instalação não é súbita e não cursa com rebaixamento do nível de consciência."
      },
      {
        id: "C",
        text: "doença de Parkinson.",
        feedbackErrada: "Apesar de tremor, o quadro clínico e agudo descarta esta hipótese."
      },
      {
        id: "D",
        text: "estado confusional agudo.",
        feedbackCorreta: "Correto. O estado confusional agudo (delirium) caracteriza-se por alteração do nível de consciência e comportamento agudo/flutuante."
      },
      {
        id: "E",
        text: "demência por déficit de Vit B12.",
        feedbackErrada: "A deficiência de B12 não justificaria quadro tão agudo e com rebaixamento do nível de consciência."
      }
    ],
    correct: "D",
    referencia: "Ministério da Saúde – Protocolo Clínico Delirium no Idoso."
  },
  // Questão 62
  {
    id: 62,
    year: 2012,
    area: "Pediatria / Nefrologia",
    enunciado: `Um pai vai à consulta na Unidade Básica Saúde (UBS) queixando-se de que, há uma semana, seu filho de 4 anos de idade iniciou quadro súbito de edema periorbitário bilateral e matutino. Refere ter procurado outra unidade de saúde duas semanas antes, quando foi feito o diagnóstico de faringoamigdalite e prescrita penicilina G benzatina. O pai relata que, nos últimos três dias, houve aumento do edema periorbitário e início de quadro de distensão abdominal, associado a dois episódios de vômitos, além de oligúria com escurecimento da urina. O pediatra aferiu e encontrou PA = 110 x 80 mmHg.

No caso clínico descrito, o dado laboratorial que, isoladamente, é considerado o mais fidedigno para confirmar o diagnóstico é`,
    options: [
      {
        id: "A",
        text: "elevação de ureia e creatinina séricas.",
        feedbackErrada: "Elevação é esperada em outros quadros renais, não é específica para síndrome nefrítica."
      },
      {
        id: "B",
        text: "titulação do anti-estreptolisina O elevada.",
        feedbackErrada: "É marcador indireto; não confirma síndrome nefrítica por si só."
      },
      {
        id: "C",
        text: "dosagem do complemento sérico C3 baixo.",
        feedbackCorreta: "Correto. A diminuição do C3 é típica de glomerulonefrite pós-estreptocócica."
      },
      {
        id: "D",
        text: "proteinúria de 24 horas acima de 50 mg/kg/dia.",
        feedbackErrada: "A proteinúria pode aparecer em síndrome nefrítica ou nefrótica – não é isoladamente confirmatória."
      },
      {
        id: "E",
        text: "urinálise evidenciando hematúria, leucocitúria e proteinúria.",
        feedbackErrada: "Esses achados apontam para lesão glomerular, mas não são específicos/confirmatórios da etiologia pós-estreptocócica."
      }
    ],
    correct: "C",
    referencia: "Nelson Treatise of Pediatrics; braspen.org.br"
  },
  // Questão 63
  {
    id: 63,
    year: 2012,
    area: "Ginecologia / Atendimento à Mulher",
    enunciado: `Uma mulher de 27 anos de idade é atendida em Unidade de Pronto Atendimento e relata ter sido estuprada por homem desconhecido 1 hora antes.

Qual a conduta mais adequada nessa situação?`,
    options: [
      {
        id: "A",
        text: "Acolher a paciente, prestar atendimento médico e psicológico e, em seguida, encaminhá-la à Delegacia de Polícia para registro/obtenção do boletim de ocorrência.",
        feedbackErrada: "O atendimento completo (inclusive profilaxias) pode ser iniciado antes da ida à delegacia."
      },
      {
        id: "B",
        text: "Encaminhar a paciente à Delegacia de Polícia para registro de boletim de ocorrência e, após, retornar à Unidade se houver lesões físicas a serem reparadas.",
        feedbackErrada: "Deve-se iniciar atendimento médico e medidas protetivas logo de início, sem necessidade de aguardar a ida à delegacia."
      },
      {
        id: "C",
        text: "Prestar atendimento com apoio de equipe multidisciplinar, com reparação das lesões, medidas de profilaxia de doenças sexualmente transmissíveis e gestação, acompanhamento psicológico e comunicação do fato, pelo médico, à autoridade policial.",
        feedbackCorreta: "Correto. A prioridade é atendimento médico, medidas de profilaxia e encaminhamentos adequados."
      },
      {
        id: "D",
        text: "Encaminhar a paciente à Delegacia de Polícia mais próxima para registro de boletim de ocorrência e solicitar que, após ter feito isso, volte à Unidade para atendimento médico com exame ginecológico e medidas de profilaxia e reabilitação física e emocional.",
        feedbackErrada: "Medidas médicas e protetivas devem ser imediatas, antes mesmo do registro policial."
      },
      {
        id: "E",
        text: "Acolher a paciente e prestar atendimento com apoio de equipe multidisciplinar, com reparação das lesões, medidas de profilaxia de doenças sexualmente transmissíveis e gestação, acompanhamento psicológico e orientação quanto ao registro de boletim de ocorrência.",
        feedbackErrada: "Somente o médico tem a obrigação legal de comunicar o fato à autoridade policial, não apenas orientar a paciente."
      }
    ],
    correct: "C",
    referencia: "Ministério da Saúde – Atenção às Pessoas em Situação de Violência Sexual."
  },
  // Questão 64
  {
    id: 64,
    year: 2012,
    area: "Clínica Médica / Reumatologia",
    enunciado: `Uma mulher de 37 anos de idade vem à consulta com queixa de febre (temperatura axilar = 38ºC), náuseas, vômitos, mialgia, dor nos braços, pernas e nas articulações dos pés e mãos há cerca de dez dias. Refere já ter tido esse quadro há cerca de um mês, tendo obtido melhora com o uso de analgésicos e anti-inflamatórios. Atualmente, refere piora do quadro clínico.
Ao exame físico, evidencia-se que a paciente se encontra em regular estado geral, descorada, anictérica, com dificuldade à deambulação – tem sinais clínicos de polineurite, artralgia e artrite de pequenas e médias articulações. Apresenta nódulos cutâneos de vários tamanhos e estádios evolutivos diferentes, róseo-eritemato-edematosos, violáceos, acastanhados, isolados e confluentes, manchas acastanhadas, pústulas, vesículas hemorrágicas e nódulos necrótico-ulcerativos, em especial nas coxas e pernas. Apresenta, ainda, cicatrizes de lesões anteriores e hepato-esplenomegalia dolorosa.

Qual o diagnóstico mais provável nesse caso?`,
    options: [
      {
        id: "A",
        text: "Farmacodermia.",
        feedbackErrada: "Não há história de uso de medicamentos responsável por quadro cutâneo tão grave e multiforme."
      },
      {
        id: "B",
        text: "Lúpus eritematoso sistêmico.",
        feedbackErrada: "Não há manifestação cutânea polimorfa típica nem lesões necrótico-ulcerativas de lúpus."
      },
      {
        id: "C",
        text: "Leishmaniose tegumentar americana.",
        feedbackErrada: "Não é compatível com polimorfismo cutâneo, poliartralgia e polineurite do quadro descrito."
      },
      {
        id: "D",
        text: "Eritema nodoso do doente reumático.",
        feedbackErrada: "Forma de apresentação normalmente diferente, sem presença de poliartralgia e sinais neurológicos."
      },
      {
        id: "E",
        text: "Reação por imunocomplexos da hanseníase.",
        feedbackCorreta: "Correto. Quadro típico da reação hansênica tipo 2 (Eritema Nodoso Hansênico) – resposta imune exacerbada, polimorfismo cutâneo, poliartralgia, polineurite."
      }
    ],
    correct: "E",
    referencia: "Ministério da Saúde – Guia Prático de Controle da Hanseníase."
  },
  // Questão 65
  {
    id: 65,
    year: 2012,
    area: "Proctologia",
    enunciado: `Uma paciente, 45 anos de idade, quatro partos normais, apresenta constipação intestinal crônica, com grande esforço evacuatório, às vezes com discreto sangramento, visível após a higienização com papel. Há três dias apresenta aumento de nódulos perianais, sangramento em maior quantidade do que o habitual (quase com vaso), com sensação, acompanhada de dor, ao evacuar. Ao exame, apresenta exteriorização de mamilos hemorroidários, edema importante em todos, além de extrusão do cátodo e pequena ulceração em um deles.

Ao ser preenchida a ficha de referência para um serviço de Proctologia para essa paciente, qual dos seguintes CID devem ser registrados?`,
    options: [
      {
        id: "A",
        text: "I84.1 - Hemorroidas internas com outras complicações.",
        feedbackErrada: "O quadro é de hemorroidas externas trombosadas."
      },
      {
        id: "B",
        text: "I84.2 - Hemorroidas internas sem complicações.",
        feedbackErrada: "O quadro é de hemorroidas externas trombosadas."
      },
      {
        id: "C",
        text: "I84.6 - Plicomas hemorroidários residuais.",
        feedbackErrada: "Não é compatível com quadro agudo de trombose."
      },
      {
        id: "D",
        text: "I84.7 - Hemorroidas trombosadas não especificadas.",
        feedbackCorreta: "Correto. O quadro é de hemorroidas trombosadas externas."
      },
      {
        id: "E",
        text: "I84.8 - Hemorroidas não especificadas com outras complicações.",
        feedbackErrada: "Deve-se especificar a presença de trombose na CID."
      }
    ],
    correct: "D",
    referencia: "CID-10; Ministério da Saúde."
  },
  // Questão 66
  {
    id: 66,
    year: 2012,
    area: "Clínica Médica / Reumatologia",
    enunciado: `Uma mulher branca de 22 anos vem à consulta ambulatorial com queixa de inchaço há uma semana, inicialmente nos pés, com piora progressiva. Atualmente, percebe até o rosto inchado. Há cerca de um mês refere astenia, náuseas, falta de apetite e mal-estar, bem como dores nos punhos e articulações interfalangeanas proximais. Ao exame, encontra-se em regular estado geral, hipocorada (++/4+), hidratada, temperatura axilar = 37,7°C. Murmúrio vesicular presente e simétrico, sem ruídos adventícios; ritmo cardíaco regular em 2 tempos, sem sopros, PA = 160 x 110 mmHg, FC = 120 bpm. Abdome flácido, sem visceromegalias. Exame de MMII ++/4+. Trouxe exame de sangue realizado no pronto socorro há três dias, de acordo com o quadro a seguir:
[hemograma e dados laboratoriais – consultar imagem]

Considerando a principal hipótese diagnóstica, a conduta no caso será solicitar`,
    options: [
      {
        id: "A",
        text: "sumário de urina, avaliação de função renal e pesquisa de autoanticorpos específicos (anti-Sm e anti-DNA nativo). Iniciar enalapril 10 mg/dia para controle da pressão arterial.",
        feedbackErrada: "O início de imunossupressão é mais importante e específico para nefrite lúpica."
      },
      {
        id: "B",
        text: "avaliação oftalmológica para investigação de uveíte, sumário de urina, proteinúria e VSH. Iniciar dieta hipossódica, com acompanhamento semanal da função renal.",
        feedbackErrada: "O tratamento específico para nefrite lúpica é imunossupressor."
      },
      {
        id: "C",
        text: "ecocardiograma bidimensional, radiografia de tórax e avaliação de função renal. Iniciar dieta e exercício físico, com retorno em um mês para reavaliar a pressão arterial.",
        feedbackErrada: "Conduta inadequada, não aborda principais sintomas e riscos da doença de base."
      },
      {
        id: "D",
        text: "radiografia das mãos e punhos e auto-anticorpos com anticorpos antipéptidos citrulinados (anti-CCP) e fator reumatóide. Iniciar anti-inflamatórios não hormonais.",
        feedbackErrada: "Não aborda nefrite autoimune, principal diagnóstico."
      },
      {
        id: "E",
        text: "radiografia de tórax, cultura de orofaringe e anticorpo antinuclear. Iniciar anti-inflamatório não esteroide para controle da febre e artrite.",
        feedbackCorreta: "Correto. Solicitar investigação de anticorpos antinuclear e infecciosos. Imunossupressão é inicial para nefrite lúpica."
      }
    ],
    correct: "E",
    referencia: "Ministério da Saúde – Protocolo Clínico do Lúpus Eritematoso Sistêmico."
  },
  // Questão 67
  {
    id: 67,
    year: 2012,
    area: "Pediatria / Nutrologia",
    enunciado: `Um lactente do sexo masculino, com 3 meses de vida, amamentado exclusivamente ao seio, é atendido no setor de Pediatria de uma Unidade de Emergência com história de diarreia há três dias, caracterizada por cerca de dez dejeções por dia, perda de peso (400 g) e dois episódios de vômitos.
Exame físico: criança irritada, com olhos encovados, lágrimas ausentes, boca e língua secas; sinal da prega cutânea desaparece lentamente. Bebe com avidez os líquidos oferecidos. Temperatura = 37,5ºC. Peso = 5 600 g.

Qual a conduta mais adequada conforme o Programa de Controle de Doenças Diarreicas da OPAS/OMS?`,
    options: [
      {
        id: "A",
        text: "Manter o estado de hidratação com uso frequente, no domicílio, de soro de reidratação oral; manter o aleitamento materno.",
        feedbackErrada: "Existe desidratação moderada: requer observação e reidratação oral vigiada."
      },
      {
        id: "B",
        text: "Após 2 horas de instituída a terapia com soro de reidratação oral, perceber-se boa hidratação e recuperação do peso, manter a criança internada em jejum até completar as 4 horas preconizadas para observação.",
        feedbackErrada: "O jejum é contraindicado em crianças pequenas, mesmo durante hidratação."
      },
      {
        id: "C",
        text: "Manter a criança em observação, prescrever soro de reidratação oral, 50 a 100 ml/kg, fracionado durante 4 horas; suspender a alimentação durante o período de observação.",
        feedbackErrada: "Não se deve suspender alimentação nem aleitamento materno nesta faixa etária."
      },
      {
        id: "D",
        text: "Iniciar o tratamento com infusão lenta de soro de reidratação oral por sonda nasogástrica, 30 ml/kg/hora; suspender a alimentação.",
        feedbackErrada: "Sonda nasogástrica é exceção, e não deve suspender alimentação oral/alimento."
      },
      {
        id: "E",
        text: "Após 2 horas de instituída a terapia com soro de reidratação oral, se o peso da criança for restabelecido e o sinal da prega desaparecer muito lentamente, iniciar hidratação venosa; manter o aleitamento materno.",
        feedbackCorreta: "Correto. Hidratação oral inicial monitorada, passando para venosa se a hidratação oral for insuficiente."
      }
    ],
    correct: "E",
    referencia: "Ministério da Saúde – Controle das Doenças Diarreicas."
  },
  // Questão 68
  {
    id: 68,
    year: 2012,
    area: "Clínica Médica / Infectologia",
    enunciado: `Um homem de 39 anos de idade é trazido à Unidade de Pronto Atendimento por familiares, com história de febre há quatro dias, que cedeu nas últimas doze horas, bem como cefaleia, astenia e vômitos. Refere sangramento gengival ao escovar os dentes. Entre os exames solicitados, o resultado do hematócrito é 47% (valor de referência: 47 ± 7%) e a prova do laço é positiva.

Frente a esse quadro, a conduta mais adequada é`,
    options: [
      {
        id: "A",
        text: "proceder à hidratação oral vigorosa, pois há fortes indícios de dengue com complicação.",
        feedbackCorreta: "Correto. Dengue com sinais de alarme deve receber hidratação vigorosa e vigiada."
      },
      {
        id: "B",
        text: "pesquisar sinais de alerta como dor abdominal intensa e contínua, hipotensão postural, hipotensão arterial, pressão diferencial < 20 mmHg (PA convergente), hepatomegalia dolorosa, extremidades frias, cianose, pulso rápido e fino e, se presente algum, instalar hidratação com solução de reidratação oral copiosa supervisionada.",
        feedbackErrada: "Na presença de sinais de alarme, a hidratação deve ser vigiada e intravenosa, se necessário."
      },
      {
        id: "C",
        text: "indicar tratamento ambulatorial com hidratação oral, antitérmicos e analgésicos, se necessários, orientar sobre sinais de alerta para retorno, a fim de repetir exames laboratoriais.",
        feedbackErrada: "O caso demanda hidratação vigorosa vigiada devido ao risco de complicações."
      },
      {
        id: "D",
        text: "manter o paciente em leito de observação, iniciar hidratação oral supervisionada e repetir exames laboratoriais após quatro horas de hidratação.",
        feedbackErrada: "Não há tempo para aguardar evolução sem intervenção mais ativa."
      },
      {
        id: "E",
        text: "notificar à Vigilância Epidemiológica e indicar tratamento ambulatorial com hidratação oral, antitérmicos e analgésicos, pois se trata de caso grave de febre hemorrágica da dengue.",
        feedbackErrada: "Caso grave não se trata de forma ambulatorial, é necessário hospitalização."
      }
    ],
    correct: "A",
    referencia: "Ministério da Saúde – Dengue: Diagnóstico e Manejo Clínico."
  },
  // Questão 69
  {
    id: 69,
    year: 2012,
    area: "Ginecologia/IST",
    enunciado: `Uma mulher solteira, de 20 anos de idade, procurou atendimento médico em um Centro de Atenção Especializada por apresentar, há três semanas, o que chamou de “ferida” na região genital externa. Ao exame, observa-se lesão ulcerada, não dolorosa, com bordos endurecidos, fundo liso e brilhante, medindo 0,8 cm de diâmetro, localizada em pequeno lábio direito. Foram solicitados exames que evidenciaram VDRL = 1:32, FTA-Abs (+), Elisa - HIV = (–), HBsAg = (–).

Diante desse quadro, qual o medicamento mais adequado?`,
    options: [
      {
        id: "A",
        text: "Ceftriaxona.",
        feedbackErrada: "Não é a droga de escolha para sífilis primária."
      },
      {
        id: "B",
        text: "Norfloxacina.",
        feedbackErrada: "Não é indicado neste quadro. Quadro típico para sífilis, tratar com penicilina."
      },
      {
        id: "C",
        text: "Ciprofloxacina.",
        feedbackErrada: "Não é antibiótico de eleição para essa IST."
      },
      {
        id: "D",
        text: "Penicilina benzatina.",
        feedbackCorreta: "Correto. Penicilina é a droga de escolha para sífilis primária."
      },
      {
        id: "E",
        text: "Sulfametoxazol/Trimetoprim.",
        feedbackErrada: "Não é tratamento de primeira linha para ISTs ulceradas."
      }
    ],
    correct: "D",
    referencia: "Ministério da Saúde – Protocolo de ISTs."
  },
  // Questão 70
  {
    id: 70,
    year: 2012,
    area: "Clínica Médica / Gastroenterologia",
    enunciado: `Um homem de 39 anos de idade vem, há três anos, em tratamento ambulatorial para doença do refluxo gastroesofágico (DRGE), em uso contínuo de inibidores de bomba de prótons (IBP). Sempre que tenta fazer desmame dos IBP, volta a apresentar graves sintomas da DRGE. Esofagogastroduodenoscopia com biópsia realizada há dois anos evidenciou esofagite, pequena hérnia de hiato (< 3 cm) e estômago normal. O paciente interrompeu o uso de IBP há quatro meses e, devido ao quadro de pirose e dor retroesternal, foi submetido a nova endoscopia digestiva, que revelou processo inflamatório grave e úlceras no terço distal do esôfago. O estômago apresenta-se normal e o teste da urease é positivo. Não foi visualizada hérnia hiatal. Devido ao intenso processo inflamatório, não foi realizada biópsia. O paciente, que não apresenta outras queixas ou co-morbidades, é etilista social, tabagista (média de 1,5 maços/dia há 22 anos) e apresenta obesidade leve. Não há outras alterações ao exame físico.

O que deve ser feito para encaminhar corretamente o caso acima descrito?`,
    options: [
      {
        id: "A",
        text: "Reiniciar o tratamento com IBP, utilizando o dobro da dose. Após seis semanas de tratamento, repetir endoscopia com biópsia.",
        feedbackCorreta: "Correto. A conduta é reiniciar IBP em dose alta e reavaliar após resposta inicial para biopsiar, caso persistam lesões."
      },
      {
        id: "B",
        text: "Manter o tratamento com IBP na dose habitual e encaminhar, de imediato, o paciente para ambulatório especializado de Cirurgia Laparoscópica.",
        feedbackErrada: "Não é necessário cirurgia de imediato sem tentativa de novo tratamento intensivo."
      },
      {
        id: "C",
        text: "Solicitar imediatamente nova endoscopia, já que a biópsia é indispensável, e encaminhar o paciente para ambulatório especializado de Cirurgia Laparoscópica.",
        feedbackErrada: "A tentativa de tratamento intensivo com IBP é necessária antes de reavaliar biopsia ou cirurgia."
      },
      {
        id: "D",
        text: "Reiniciar o tratamento com IBP, utilizando o dobro da dose, associado ao tratamento do H.Pylori. Em seguida, tratamento de manutenção com IBP por tempo indefinido.",
        feedbackErrada: "O tratamento para H. pylori não tem indicação clara neste contexto."
      },
      {
        id: "E",
        text: "Reiniciar tratamento com IBP, utilizando o dobro da dose por seis semanas. Após esse período, tratamento de manutenção com IBP por tempo indefinido.",
        feedbackErrada: "A manutenção sem reavaliação do quadro não está indicada sem nova endoscopia/biopsia."
      }
    ],
    correct: "A",
    referencia: "Ministério da Saúde – Protocolo Clínico de DRGE."
  }
];

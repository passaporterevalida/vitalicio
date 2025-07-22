
import { Question } from "./questoesRevalida2011";

export const QUESTOES_REVALIDA_2011_61_70: Question[] = [
  {
    id: 61,
    year: 2011,
    area: "Clínica - Transplante / Doação de órgãos",
    enunciado: `O plantonista da Unidade de Terapia Intensiva aciona a equipe de notificação e captação de órgãos do seu hospital relatando que foi realizado e confirmado o diagnóstico de morte encefálica em um jovem de 20 anos, vítima de traumatismo crânio-encefálico. Quanto ao prosseguimento do processo de doação de órgãos pode-se afirmar que`,
    options: [
      {
        id: "A",
        text: "se houver manifestação favorável da família quanto à doação, o diagnóstico de morte encefálica deve ser comunicado à Central de Notificação, Captação e Distribuição de Órgãos.",
        feedbackCorreta: "A notificação é obrigatória após o diagnóstico, independentemente da aceitação familiar.",
        feedbackErrada: "A família da vítima não é condicionante para a comunicação obrigatória à Central."
      },
      {
        id: "B",
        text: "se o potencial doador apresentar estabilidade hemodinâmica e ausência de infecção sistêmica ou tumor maligno, o diagnóstico de morte encefálica deve ser comunicado à Central de Notificação, Captação e Distribuição de Órgãos.",
        feedbackErrada: "O diagnóstico de morte encefálica deve ser comunicado à Central independentemente desses critérios."
      },
      {
        id: "C",
        text: "deve ser dada sequência aos procedimentos para a retirada de órgãos, tendo por base o consentimento presumido , uma vez que não há manifestação conhecida do potencial doador, de oposição à doação.",
        feedbackErrada: "No Brasil, o consentimento é explícito, não presumido."
      },
      {
        id: "D",
        text: "a morte encefálica é de notificação compulsória e a continuidade dos procedimentos para a retirada de órgãos para transplante depende do consentimento da família do potencial doador.",
        feedbackCorreta: "A lei brasileira exige notificação compulsória e autorização familiar para doação.",
        feedbackErrada: ""
      },
      {
        id: "E",
        text: "uma vez esclarecida a família sobre o diagnóstico de morte encefálica e com a certeza de sua compreensão deve ser dada sequência aos procedimentos para a retirada de órgãos, tendo por base o consentimento informado.",
        feedbackErrada: "O consentimento informado é necessário, mas a notificação da morte encefálica é compulsória independentemente disso."
      },
    ],
    correct: "D",
    referencia: "Lei nº 9.434/97 e Res. CFM nº 2.173/17."
  },
  {
    id: 62,
    year: 2011,
    area: "Clínica Médica - Nefrologia",
    enunciado: `Mulher, com 57 anos de idade, sem acompanhamento médico regular, é atendida em ambulatório de clínica médica de hospital secundário por queixa de edema de membros inferiores e face e de urina espumosa há três meses. A paciente não refere doenças anteriores e desconhece seus antecedentes familiares. [...] Exames laboratoriais: Glicemia de jejum = 283 mg/dL; Creatinina = 1,8 mg/dL, Ureia = 60 mg/dL. Colesterol total = 312 mg/dL, LDL = 230 mg/dL, HDL = 40 mg/dL, VLDL = 42 mg/dL, triglicérides = 210 mg/dL. Albumina sérica = 1,8 g/dL. Exame sumário de urina: proteinúria (++++)/4, glicosúria (++/4), em outras alterações. Proteinúria na urina de 24h= 5,5g. Dosagem de eletrólitos e hemograma normais.

Qual a principal etiologia para o quadro apresentado por essa paciente?`,
    options: [
      {
        id: "A",
        text: "Hipertensão arterial sistêmica.",
        feedbackErrada: "A HAS pode causar quadro renal, mas os achados favorecem DM."
      },
      {
        id: "B",
        text: "Diabetes mellitus.",
        feedbackCorreta: "Proteinúria maciça, glicosúria e DM indicam nefropatia diabética.",
        feedbackErrada: ""
      },
      {
        id: "C",
        text: "Dislipidemia.",
        feedbackErrada: "A dislipidemia pode estar presente secundariamente ao quadro renal."
      },
      {
        id: "D",
        text: "Glomerulopatia por lesões mínimas.",
        feedbackErrada: "É mais comum em crianças e raramente associada a glicosúria ou DM."
      },
      {
        id: "E",
        text: "Lupus eritematoso sistêmico.",
        feedbackErrada: "O lupus não cursa com glicosúria tão importante."
      },
    ],
    correct: "B",
    referencia: "CID-10: N08/N18; diretrizes SBN, nefropatia diabética."
  },
  {
    id: 63,
    year: 2011,
    area: "Clínica Médica - Angiologia",
    enunciado: `Paciente do sexo masculino, com 59 anos de idade, tabagista há mais de 10 anos, hipertenso e dislipidêmico, procura a Unidade Básica de Saúde relatando o aparecimento, há um mês, de lesão ulcerada em dorso de pé esquerdo, após pequeno trauma abrasivo com sandália mal-adaptada. A lesão é seca, dolorosa, com fundo sujo e pálido. Há um discreto halo de eritema ao seu redor. Evolui há uma semana com piora do aspecto e do tamanho da lesão, com dor de repouso, edema de pé e tornozelo. Os pulsos arteriais não são perceptíveis (palpáveis) abaixo dos joelhos, bilateralmente.

Qual a hipótese diagnóstica e conduta para esse paciente?`,
    options: [
      {
        id: "A",
        text: "Doença aterosclerótica obliterante periférica(DAOP) com isquemia crítica; referenciar para revascularização de urgência.",
        feedbackCorreta: "Isquemia crítica periférica, necrose seca, sem pulsos: precisa de abordagem cirúrgica.",
        feedbackErrada: ""
      },
      {
        id: "B",
        text: "Trombose venosa profunda; referenciar para consulta em ambulatório de especialidades e prescrição de anticoagulantes.",
        feedbackErrada: "Sinais e evolução não compatíveis com trombose venosa isolada."
      },
      {
        id: "C",
        text: "Úlcera varicosa infectada; referenciar para internação hospitalar de urgência para antibioticoterapia e desbridamento.",
        feedbackErrada: "Não há contexto de insuficiência venosa crônica; lesão seca e pulsos abolidos indicam DAOP."
      },
      {
        id: "D",
        text: "Trombose venosa profunda; referenciar para internamento hospitalar de urgência para trombólise.",
        feedbackErrada: "Não há sinais clássicos de trombose venosa profunda aguda."
      },
      {
        id: "E",
        text: "Microangiopatia diabética; referenciar para ambulatório especializado.",
        feedbackErrada: "Apesar do DM, quadro clínico e sinais vasculares majoram isquemia arterial por DAOP."
      },
    ],
    correct: "A",
    referencia: "Diretrizes Sociedade Brasileira de Angiologia e Cirurgia Vascular."
  },
  {
    id: 64,
    year: 2011,
    area: "Clínica Médica - Gastroenterologia",
    enunciado: `Paciente do sexo feminino, com 34 anos de idade, sem antecedentes patológicos pregressos significativos, procurou a Unidade Básica de Saúde com história de pirose e regurgitação há mais ou menos seis meses, e piora do quadro no último mês. Relata ganho ponderal de 10 kg nos últimos três meses (IMC 36,8 kg/m²). Faz uso irregular de antiácido por conta própria. Trazia consigo um resultado de endoscopia digestiva alta: “erosões lineares de até 5 mm, não confluentes, localizadas em esôfago distal”.

Baseado no diagnóstico acima, você prescreve um inibidor de bomba de prótons durante oito semanas e orienta a paciente a`,
    options: [
      {
        id: "A",
        text: "perder peso e evitar deitar-se imediatamente após as refeições.",
        feedbackCorreta: "Condutas recomendadas para refluxo gastroesofágico.",
        feedbackErrada: ""
      },
      {
        id: "B",
        text: "evitar ingestão de café e praticar esportes.",
        feedbackErrada: "Evitar esforço pós-refeição é importante, mas restringir toda prática esportiva não."
      },
      {
        id: "C",
        text: "suspender carne vermelha da alimentação e ingestão de bebidas gaseificadas.",
        feedbackErrada: "Redução de carne vermelha não é conduta obrigatória neste quadro."
      },
      {
        id: "D",
        text: "dormir com cabeceira da cama elevada e abolir fibras na dieta.",
        feedbackErrada: "Cabeceira elevada: correto. Abolir fibras: incorreto."
      },
      {
        id: "E",
        text: "aumentar a ingesta de proteínas e reduzir a ingesta de carboidratos.",
        feedbackErrada: "Não há necessidade absoluta de ajuste de macronutrientes."
      },
    ],
    correct: "A",
    referencia: "Diretriz Brasileira de Esofagite de Refluxo."
  },
  {
    id: 65,
    year: 2011,
    area: "Clínica Cirúrgica - Urologia",
    enunciado: `Paciente do sexo masculino, com 58 anos de idade, casado, pedreiro, tabagista há 15 anos, procura a UBS queixando-se de um “caroço na virilha esquerda” há cinco meses. [...] Ao exame da região inguinal esquerda verifica-se a presença de tumoração mole, bem delimitada, retrátil, dolorosa à palpação profunda e que aumenta de tamanho quando se realiza a manobra de Valsalva.

Diante dessa situação, a hipótese diagnóstica e conduta são, respectivamente`,
    options: [
      {
        id: "A",
        text: "hérnia inguino-escrotal esquerda, encarcerada; solicitar ultrassom escrotal e encaminhar o paciente para o Pronto-Socorro para avaliação de urgência pelo cirurgião.",
        feedbackCorreta: "Quadro clássico de hérnia encarcerada; urgência cirúrgica.",
        feedbackErrada: ""
      },
      {
        id: "B",
        text: "linfadenomegalia a esclarecer, suspeita de neoplasia; solicitar biópsia excisional e encaminhar o paciente para o ambulatório de especialidades para avaliação do cirurgião.",
        feedbackErrada: "Manobra de Valsalva positiva favorece hérnia sobre linfonodomegalia."
      },
      {
        id: "C",
        text: "hérnia inguinal direta esquerda, não complicada; encaminhar o paciente para o ambulatório de especialidades para avaliação do cirurgião geral.",
        feedbackErrada: "Hérnia encarcerada é um caso agudo."
      },
      {
        id: "D",
        text: "hérnia inguinal indireta esquerda; solicitar tomografia de abdome e pelve e encaminhar o paciente para avaliação ambulatorial especializada com cirurgião.",
        feedbackErrada: "Quadro agudo não demanda exames sofisticados, mas sim avaliação cirúrgica rápida."
      },
      {
        id: "E",
        text: "massa inguinal a esclarecer, provável neoplasia; solicitar biópsia por punção guiada por ultrassom; referenciar o paciente para avaliação ambulatorial com cirurgião.",
        feedbackErrada: "Situação clínica favorece hérnia."
      },
    ],
    correct: "A",
    referencia: "Rotinas de Pronto Atendimento Cirúrgico."
  },
  {
    id: 66,
    year: 2011,
    area: "Saúde Coletiva - Epidemiologia",
    enunciado: `Uma nova Unidade de Saúde da Família será implantada em um município. A territorialização deverá ser realizada visando obter como primeiro produto`,
    options: [
      {
        id: "A",
        text: "a determinação dos coeficientes de morbi-mortalidade.",
        feedbackErrada: "Os coeficientes podem ser úteis, mas o primeiro produto é o mapa de micro-áreas."
      },
      {
        id: "B",
        text: "a obtenção de dados de vigilância comparativos com outras áreas do mesmo município.",
        feedbackErrada: "Importante para contextos de avaliação, mas não é foco inicial da territorialização."
      },
      {
        id: "C",
        text: "a identificação de reivindicações de movimentos sociais e grupos organizados.",
        feedbackErrada: "Isso é passo posterior no planejamento."
      },
      {
        id: "D",
        text: "a definição de micro-áreas de risco e grupos prioritários.",
        feedbackCorreta: "O mapeamento e definição das micro-áreas é base inicial da SF.",
        feedbackErrada: ""
      },
      {
        id: "E",
        text: "a determinação dos índices de mortalidade infantil e materna.",
        feedbackErrada: "Índices são monitorados, mas vêm após mapeamento inicial."
      },
    ],
    correct: "D",
    referencia: "Manual de Territorialização/Ministério da Saúde."
  },
  {
    id: 67,
    year: 2011,
    area: "Clínica Médica - Infectologia",
    enunciado: `Paciente do sexo masculino, com 26 anos, procura amb de Clínica Médica com queixas, há uma semana, de mal estar, febre de baixa intensidade não aferida, inapetência, vômitos ocasionais e aversão à fumaça de cigarro, evoluindo com colúria e acolia fecal há três dias. Relata que costuma alimentar-se em bares com baixo nível de higiene. [...] Exames: aminotransferases muito elevadas (>1000 UI/L) e marcadores sorológicos virais. O perfil sorológico compatível com o diagnóstico de hepatite A é`,
    options: [
      {
        id: "A",
        text: "anti-HAV IgG reativo e IgM não reativo; anti-HBc IgM e IgG reativos; HBsAg reativo.",
        feedbackErrada: "Esse padrão sugere hepatite B aguda ou crônica, não A."
      },
      {
        id: "B",
        text: "anti-HAV IgG e IgM reativos; anti-HBc IgG e IgM não reativos; HBsAg não reativo.",
        feedbackCorreta: "IgM e IgG anti-HAV positivos é padrão agudo de hepatite A.",
        feedbackErrada: ""
      },
      {
        id: "C",
        text: "anti-HAV IgG e IgM não reativos; anti-HBc IgG reativo e IgM não reativo; HBsAg não reativo.",
        feedbackErrada: "Seria padrão de resposta vacinal ou hepatite B passada."
      },
      {
        id: "D",
        text: "anti-HAV IgG não reativo e IgM reativo; anti-HBc IgM e IgG não reativos; HBsAg não reativo.",
        feedbackErrada: "IgG anti-HAV costuma se tornar reativo junto do IgM na fase aguda."
      },
      {
        id: "E",
        text: "anti-HAV IgG e IgM reativos; anti-HBc IgM não reativo e IgG reativo; HBsAg reativo.",
        feedbackErrada: "Perfil que sugere coinfecção com hepatite B, não apenas A."
      },
    ],
    correct: "B",
    referencia: "Ministério da Saúde – Protocolo de Hepatites Virais."
  },
  {
    id: 68,
    year: 2011,
    area: "Pediatria - Endocrinologia",
    enunciado: `Uma criança do sexo feminino, com quatro anos de idade, é atendida no Pronto Atendimento com queixa de poliúria, polidipsia e emagrecimento nos últimos dois meses. A mãe decidiu retornar ao serviço porque nos últimos dois dias, a criança começou a apresentar sonolência, acompanhada de febre (dois picos de 38,6 °C), vômitos, fadiga, sinais de desidratação e taquipneia. [...] A decisão de encaminhamento imediato foi determinada`,
    options: [
      {
        id: "A",
        text: "pela preocupação com a hipotensão, achado bastante comum nas crianças que desenvolvem cetoacidose diabética.",
        feedbackCorreta: "Hipotensão é alteração de risco em cetoacidose diabética e indica gravidade.",
        feedbackErrada: ""
      },
      {
        id: "B",
        text: "para reposição volêmica e controle da glicemia. A hipotensão, na criança com cetoacidose diabética, é evento raro e tardio.",
        feedbackErrada: "Hipotensão é comum e grave em cetoacidose em crianças."
      },
      {
        id: "C",
        text: "pela alta mortalidade, característica da doença, cuja principal causa de morte está relacionada à hipotensão.",
        feedbackErrada: "A mortalidade é relevante, mas hipotensão é o marcador clínico determinante."
      },
      {
        id: "D",
        text: "pela hipertermia da criança, que requer imediata investigação diagnóstica.",
        feedbackErrada: "Febre chama atenção, mas não é o fator principal de gravidade aguda."
      },
      {
        id: "E",
        text: "porque, em crianças lactentes e pré-escolares, além de adolescentes grávidas, a cetoacidose ocorre com níveis de glicemia sempre muito elevados.",
        feedbackErrada: "Não é regra absoluta; hipotensão é marcador agudo mais importante."
      },
    ],
    correct: "A",
    referencia: "Sociedade Brasileira de Diabetes – Cetoacidose diabética."
  },
  {
    id: 69,
    year: 2011,
    area: "Pediatria",
    enunciado: `Uma criança, com dois anos de idade, sexo masculino, é atendida no serviço de Pronto Atendimento. A mãe relata que a criança vem apresentando sintomas de obstrução nasal e secreção hialina há seis dias, evoluindo com febre (dois picos de 38,8 °C) nos últimos dois dias, irritabilidade, dificuldade de aceitação da alimentação. Ao exame físico mostra abaulamento da membrana timpânica esquerda.

Qual a principal hipótese diagnóstica e a conduta terapêutica?`,
    options: [
      {
        id: "A",
        text: "Trata-se de otite média aguda. O uso de antibioticoterapia está indicado, pois o quadro clínico é compatível com otite média, cuja principal etiologia, nessa idade, é bacteriana. Além disso, a presença de abaulamento da membrana timpânica sugere a etiologia bacteriana.",
        feedbackCorreta: "Otite bacteriana: abaulamento timpânico e febre - antibiótico indicado.",
        feedbackErrada: ""
      },
      {
        id: "B",
        text: "Trata-se de otite média aguda. O uso de antibioticoterapia está indicado, pois, apesar do abaulamento da membrana timpânica ser visto nas otites de etiologia viral e na de etiologia bacteriana, a antibioticoterapia reduz o tempo de doença.",
        feedbackErrada: "Viral dificilmente causa abaulamento significativo e quadro arrastado com febre alta."
      },
      {
        id: "C",
        text: "Trata-se de otite média aguda. O uso de medicação sintomática está indicado, pois o quadro clínico é compatível com otite viral, sendo o abaulamento da membrana timpânica um forte elemento de diferenciação a favor da etiologia viral.",
        feedbackErrada: "Abaulamento timpânico considera-se típico de otite bacteriana."
      },
      {
        id: "D",
        text: "Trata-se de otite serosa. É indicado, portanto, o uso de antibioticoterapia nas faixas etárias, já que a presença de abaulamento da membrana timpânica sugere o diagnóstico de otite serosa.",
        feedbackErrada: "Otite serosa não costuma apresentar febre ou abaulamento importante."
      },
      {
        id: "E",
        text: "Trata-se de otite serosa. É indicado, portanto, o uso de sintomáticos, pois o abaulamento da membrana timpânica, topodiagnóstico da otite serosa, deverá regredir com essa medida.",
        feedbackErrada: "Caso fosse serosa, não haveria febre importante ou irritabilidade aguda."
      },
    ],
    correct: "A",
    referencia: "Rotinas de Urgência Pediátrica."
  },
  {
    id: 70,
    year: 2011,
    area: "Clínica Médica - Gastroenterologia",
    enunciado: `Homem, com 45 anos de idade, com dor epigástrica diária, começou o uso de inibidor de bomba de próton (IBP) com alguma melhora. Realizou endoscopia digestiva alta que revelou gastrite nodosa de antro e corpo, e úlcera duodenal em fase de cicatrização. Biópsias e teste rápido de urease negativo para Helicobacter pylori.

Quanto ao tratamento para Helicobacter pylori nesse paciente, conclui-se que`,
    options: [
      {
        id: "A",
        text: "não há necessidade de tratamento, pois o agente etiológico não é o Helicobacter pylori.",
        feedbackCorreta: "Ausência de H. pylori descartada por biópsia e teste de urease negativo.",
        feedbackErrada: ""
      },
      {
        id: "B",
        text: "não há necessidade de tratamento, pois a cicatrização da úlcera ocorre após a erradicação da bactéria.",
        feedbackErrada: "A cicatrização da úlcera ocorre devido ao IBP, não à erradicação da bactéria (que não foi identificada)."
      },
      {
        id: "C",
        text: "o tratamento está indicado e o uso de IBP interfere no teste de urease.",
        feedbackErrada: "Embora IBP possa interferir nos testes, diante de biópsias negativas não há indicação de tratamento."
      },
      {
        id: "D",
        text: "há necessidade de tratamento profilático contra reinfecção, mesmo havendo cura.",
        feedbackErrada: "Não há indicação de tratamento profilático sem infecção ativa."
      },
      {
        id: "E",
        text: "há necessidade de tratamento especial para Helicobacter pylori resistentes aos antibióticos.",
        feedbackErrada: "Não há evidência de resistência (ou mesmo de infecção)."
      },
    ],
    correct: "A",
    referencia: "Diretriz BR de 2022 - H. pylori"
  },
];

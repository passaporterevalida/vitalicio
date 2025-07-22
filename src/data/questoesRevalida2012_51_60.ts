
import type { Question } from "./questoesRevalida2011";

export const QUESTOES_REVALIDA_2012_51_60: Question[] = [
  {
    id: 51,
    year: 2012,
    area: "Pediatria",
    enunciado: `Uma equipe de Saúde da Família está em visita domiciliar e avalia uma criança de oito meses. O menino está corado, com peso e estatura adequados para a idade, fixa e acompanha objetos em seu campo visual, balbucia e, colocado de bruços, levanta a cabeça momentaneamente. Ainda não passa da posição lateral para a linha média, nem rola da posição supina para a prona. Levantado pelos braços, permanece passivo e não ajuda com o corpo. A mãe expressa preocupação porque o irmão mais velho, com a mesma idade, já sentava sem apoio.

A conduta correta no caso é`,
    options: [
      {
        id: "A",
        text: "antecipar a consulta seguinte.",
        feedbackErrada: "O desenvolvimento relatado está dentro da faixa de normalidade, não há urgência."
      },
      {
        id: "B",
        text: "referir a criança para serviço de maior complexidade.",
        feedbackErrada: "Não há indicações claras de atraso grave que exijam referência."
      },
      {
        id: "C",
        text: "agendar visitas mais frequentes pelo Agente Comunitário de Saúde.",
        feedbackErrada: "Não há fatores de risco que indiquem necessidade de visitas adicionais."
      },
      {
        id: "D",
        text: "orientar a família a estimular a criança e a não deixá-la sempre em posição supina quando desperta.",
        feedbackCorreta: "Correto. Estímulo em diferentes posições é importante para o desenvolvimento motor nesta idade."
      },
      {
        id: "E",
        text: "tranquilizar a família e orientar para as diferenças normais de crescimento e desenvolvimento entre crianças, dentro da faixa de normalidade.",
        feedbackErrada: "Apesar de se tratar de variação normal, a orientação sobre o estímulo é a mais adequada."
      },
    ],
    correct: "D",
    referencia: "Ministério da Saúde – Caderneta de Saúde da Criança."
  },
  {
    id: 52,
    year: 2012,
    area: "Clínica Médica / Psiquiatria",
    enunciado: `Uma mulher de 47 anos de idade encontra-se em tratamento de longa data para transtorno do humor. Comparece ao ambulatório com queixa de astenia, sonolência, alteração na fala, intolerância ao frio, constipação intestinal e déficit de memória. Ao exame, nota-se frequência cardíaca = 55 bpm, pele seca e descamativa, reflexos tendinosos diminuídos bilateralmente.

O quadro clínico apresentado está relacionado a efeito adverso do tratamento com`,
    options: [
      {
        id: "A",
        text: "lítio.",
        feedbackCorreta: "Correto. Lítio pode causar hipotireoidismo, justificando tais sintomas."
      },
      {
        id: "B",
        text: "fluoxetina.",
        feedbackErrada: "Os antidepressivos inibidores seletivos de recaptação de serotonina não apresentam esse perfil de efeitos colaterais."
      },
      {
        id: "C",
        text: "paroxetina.",
        feedbackErrada: "Paroxetina não causa esse quadro clínico típico de hipotireoidismo."
      },
      {
        id: "D",
        text: "amitriptilina.",
        feedbackErrada: "Os tricíclicos podem causar sedação e constipação, mas não sintomas de hipotireoidismo."
      },
      {
        id: "E",
        text: "inibidores da mono-amino-oxidase.",
        feedbackErrada: "Este grupo também não está relacionado a efeitos colaterais tireoidianos desse tipo."
      },
    ],
    correct: "A",
    referencia: "Goldman-Cecil Medicine; Ministério da Saúde."
  },
  {
    id: 53,
    year: 2012,
    area: "Ginecologia",
    enunciado: `Uma mulher de 40 anos, multípara, com menstruações regulares, comparece a uma consulta para realizar exame de prevenção do câncer de colo uterino. No exame especular, o médico observou um colo cilíndrico, sem corrimento vaginal. Ele colheu material para a colpocitologia oncótica, e o resultado do exame mostrou lesão intraepitelial de alto grau.

Qual a conduta mais adequada nesse caso?`,
    options: [
      {
        id: "A",
        text: "Solicitar à paciente que faça nova colpocitologia e ultrassonografia pélvica.",
        feedbackErrada: "Nova colpocitologia não é indicada perante lesão de alto grau; é necessário confirmar e tratar."
      },
      {
        id: "B",
        text: "Encaminhar a paciente para colposcopia e solicitar realização de biópsia.",
        feedbackCorreta: "Correto. Diante de lesão intraepitelial de alto grau o procedimento é colposcopia e biópsia."
      },
      {
        id: "C",
        text: "Realizar o teste do iodo no colo uterino para confirmar o diagnóstico da paciente.",
        feedbackErrada: "Teste do iodo não substitui a biópsia nem a colposcopia."
      },
      {
        id: "D",
        text: "Solicitar à paciente que faça nova colpocitologia e ressonância nuclear magnética.",
        feedbackErrada: "Ressonância não tem indicação na investigação de lesão intraepitelial."
      },
      {
        id: "E",
        text: "Repetir imediatamente a colpocitologia e encaminhar a paciente para colposcopia se o exame continuar alterado.",
        feedbackErrada: "A indicação é colposcopia e biópsia após um resultado sugestivo de lesão de alto grau, sem necessidade de repetir antes o exame citológico."
      },
    ],
    correct: "B",
    referencia: "INCA – Diretrizes para a Detecção Precoce do Câncer do Colo do Útero."
  },
  {
    id: 54,
    year: 2012,
    area: "Pediatria / Nutrologia",
    enunciado: `Um lactente de um ano de idade apresenta inapetência, apatia, palidez cutâneo-mucosa acentuada, lesões cutâneas hipocrômicas e hipocrômicas com descamação em membros, faces de lua cheia, hepatomegalia, edema em membros e despigmentação de cabelos. A temperatura axilar é de 35,7°C. Foi identificado pelo agente comunitário de saúde em seu domicílio, onde mora com a mãe e mais cinco irmãos, e encaminhado para avaliação na Unidade Básica de Saúde (UBS). Peso = 7 kg e comprimento = 65 cm.

Com essas informações, o diagnóstico nutricional e a conduta médica mais adequados são, respectivamente`,
    options: [
      {
        id: "A",
        text: "desnutrição proteica grave e encaminhamento para internação hospitalar.",
        feedbackCorreta: "Correto. Quadro clássico de kwashiorkor (desnutrição proteica grave), demandando internação."
      },
      {
        id: "B",
        text: "desnutrição proteico-calórica grave e encaminhamento para internação hospitalar.",
        feedbackErrada: "Desnutrição proteico-calórica indica marasmo, mas o caso clínico é de kwashiorkor."
      },
      {
        id: "C",
        text: "desnutrição proteica grave e monitoramento de peso na Unidade Básica de Saúde.",
        feedbackErrada: "Monitoramento ambulatorial não é conduta para esse grau de gravidade."
      },
      {
        id: "D",
        text: "desnutrição proteico-calórica moderada e encaminhamento para internação hospitalar.",
        feedbackErrada: "O quadro descrito corresponde a desnutrição grave, não moderada."
      },
      {
        id: "E",
        text: "desnutrição calórica moderada e monitoramento do peso na Unidade Básica de Saúde.",
        feedbackErrada: "Não corresponde ao diagnóstico adequado do quadro clínico, além de conduta insuficiente."
      },
    ],
    correct: "A",
    referencia: "Nelson Treatise of Pediatrics; Ministério da Saúde – Desnutrição Proteica."
  },
  {
    id: 55,
    year: 2012,
    area: "Clínica Médica / Emergências",
    enunciado: `Paciente do sexo feminino, 23 anos de idade, em tratamento clínico para transtorno depressivo, deu entrada na Emergência devido à tentativa de suicídio com fogo, após banhar-se com álcool. Queixa-se de “sensação de sufocamento” e de dor nas áreas queimadas. Ao exame, apresenta-se extremamente ansiosa, pouco cooperativa, gemente, com queimaduras de segundo e terceiro graus na face, tronco (anterior e posterior) e membro superior esquerdo, incluindo palma da mão. Taquipneica – 36 irpm, taquicárdica – 130 bpm, PA = 100 x 60 mmHg. Observa-se também queimaduras de cílios e vibrissas nasais. Na ausculta pulmonar, ouve-se discreta sibilância. Demais aspectos do exame físico não acrescentam outros agravantes ao caso.

A medida mais urgente a ser adotada com essa paciente é`,
    options: [
      {
        id: "A",
        text: "a hidratação associada à prescrição de antibioticoterapia profilática.",
        feedbackErrada: "A hidratação é importante, mas há risco imediato de insuficiência respiratória por queimadura de vias aéreas superiores."
      },
      {
        id: "B",
        text: "a instalação de acesso venoso central.",
        feedbackErrada: "O acesso venoso é importante para volume e drogas, mas não é a prioridade imediata sem estabilizar via aérea."
      },
      {
        id: "C",
        text: "o resfriamento da paciente com água corrente e lençóis molhados.",
        feedbackErrada: "Não corresponde à medida mais urgente em queimaduras graves de vias aéreas."
      },
      {
        id: "D",
        text: "a intubação orotraqueal para garantir permeabilidade das vias aéreas.",
        feedbackCorreta: "Correto. Queimaduras com sinais de via aérea (vibrissas chamuscadas, sibilância, sufocação) têm risco de rápida obstrução respiratória."
      },
      {
        id: "E",
        text: "a monitorização de pressão arterial pulmonar para orientar reposição volêmica.",
        feedbackErrada: "Pode ser relevante tardiamente; a urgência é manejo das vias aéreas."
      },
    ],
    correct: "D",
    referencia: "American Burn Association; ATLS."
  },
  {
    id: 56,
    year: 2012,
    area: "Infectologia",
    enunciado: `Uma mulher de 29 anos iniciou tratamento para tuberculose pulmonar cavitária há duas semanas, com o esquema Rifampicina + Hidrazida + Pirazinamida + Etambutol. Durante a consulta para avaliação dos exames solicitados, o médico observa que o teste confirmatório para detecção do HIV é positivo.

Nesse contexto, além do aconselhamento da paciente e testagem de parceiros, a conduta mais adequada para a paciente é`,
    options: [
      {
        id: "A",
        text: "manutenção do tratamento para tuberculose e encaminhamento para serviço de referência, mantendo o acompanhamento à paciente.",
        feedbackCorreta: "Correto. O tratamento deve ser mantido e o encaminhamento para referência HIV."
      },
      {
        id: "B",
        text: "suspensão do tratamento para tuberculose e encaminhamento para serviço de referência, mantendo o acompanhamento à paciente.",
        feedbackErrada: "O tratamento de tuberculose nunca deve ser suspenso por causa do diagnóstico de HIV."
      },
      {
        id: "C",
        text: "suspensão temporária do esquema terapêutico para a tuberculose, início de terapia antirretroviral; retomada do tratamento para tuberculose após 30 dias.",
        feedbackErrada: "O esquema de TB deve ser mantido, não suspenso por causa do HIV."
      },
      {
        id: "D",
        text: "alteração do tratamento, com prolongamento de duração para 9 meses: Rifampicina + Hidrazida + Pirazinamida + Etambutol por 2 meses e Rifampicina + Hidrazida por 7 meses.",
        feedbackErrada: "O esquema padrão de 6 meses ainda é recomendado; extensão para 9 meses só em casos específicos."
      },
      {
        id: "E",
        text: "substituição do esquema terapêutico da tuberculose para Estreptomicina + Etambutol + Linezolida + Pirazinamida + Terizidona por 2 meses e Etambutol + Linezolida + Terizidona por 4 meses.",
        feedbackErrada: "Não é necessário alterar o esquema inicial padrão apenas pela presença do HIV."
      },
    ],
    correct: "A",
    referencia: "Ministério da Saúde – Manual de Tuberculose; CDC."
  },
  {
    id: 57,
    year: 2012,
    area: "Pediatria / Infectologia",
    enunciado: `Um lactente de 4 meses de idade é levado à Unidade Básica de Saúde apresentando tumoração em axila direita. A criança está em aleitamento materno exclusivo e sua situação vacinal é adequada. Ao exame: peso = 5,5 kg, temperatura axilar = 37,1°C, choro, lesão tumoral de aproximadamente 3 cm, com ponto de flutuação central em axila direita.

A conduta mais adequada no momento para esse lactente é`,
    options: [
      {
        id: "A",
        text: "prescrever estreptomicina durante dois meses e notificar o caso.",
        feedbackErrada: "Estreptomicina não faz parte do tratamento para abscesso axilar pós-BCG."
      },
      {
        id: "B",
        text: "prescrever pirazinamida durante dois meses; drenar, se persistir a flutuação; notificar o caso.",
        feedbackErrada: "A droga de eleição em abscesso pós-BCG é isoniazida; drenagem apenas se necessário."
      },
      {
        id: "C",
        text: "prescrever etambutol durante dois meses; não há necessidade de drenagem; notificar o caso.",
        feedbackErrada: "Etambutol não é indicado para essa condição."
      },
      {
        id: "D",
        text: "prescrever isoniazida; puncionar, se necessário, sem realizar drenagem cirúrgica; notificar o caso.",
        feedbackCorreta: "Correto. Isoniazida é o tratamento mais indicado para linfadenite axilar pós-BCG com flutuação."
      },
      {
        id: "E",
        text: "prescrever rifampicina; fazer compressas mornas e incisão para facilitar a drenagem; notificar o caso.",
        feedbackErrada: "Rifampicina e incisão não são recomendados. A abordagem clínica é preferível."
      },
    ],
    correct: "D",
    referencia: "Ministério da Saúde – Manual do Programa Nacional de Imunizações (PNI)."
  },
  {
    id: 58,
    year: 2012,
    area: "Ginecologia / Adolescência",
    enunciado: `Uma estudante de 14 anos, sem vida sexual ativa, veio à consulta ginecológica na Unidade de Saúde pois não estava conseguindo realizar as suas tarefas escolares devido à intensa irritabilidade, insônia, mastalgia e ansiedade antes do período menstrual, sintomas que melhoraram com o início da perda sanguínea.

Qual a indicação mais adequada para melhora dos sintomas dessa paciente?`,
    options: [
      {
        id: "A",
        text: "Diurético e antidepressivo.",
        feedbackErrada: "Não é a abordagem inicial para a síndrome pré-menstrual, especialmente em adolescentes."
      },
      {
        id: "B",
        text: "Benzodiazepínico e gestrinona.",
        feedbackErrada: "Não são drogas de primeira linha nem indicadas para adolescentes com estes sintomas."
      },
      {
        id: "C",
        text: "Psicoterapia e bromocriptina.",
        feedbackErrada: "Bromocriptina não é droga indicada para síndrome pré-menstrual."
      },
      {
        id: "D",
        text: "Dieta balanceada e estrogênioterapia.",
        feedbackErrada: "Estrogênios não são recomendados para adolescentes e dieta não resolve isoladamente."
      },
      {
        id: "E",
        text: "Atividade física e inibidores das prostaglandinas.",
        feedbackCorreta: "Correto. Mudanças de hábitos de vida (atividade física) e, quando necessário, uso de anti-inflamatórios são orientados."
      },
    ],
    correct: "E",
    referencia: "Ministério da Saúde – Saúde do Adolescente; Febrasgo."
  },
  {
    id: 59,
    year: 2012,
    area: "Gastroenterologia",
    enunciado: `Um paciente de 51 anos de idade, do sexo masculino, procura ambulatório de atenção secundária com queixa de pirose intermitente, frequentemente deflagrada por ingestão de alimentos gordurosos e álcool, por prática de exercícios físicos e por deitar-se após alimentação. Relata ainda eventuais episódios de regurgitação. Nega vômitos, náuseas, disfagia ou odinofagia. Não faz uso de medicamentos em sua rotina diária. Além de sobrepeso, nada foi encontrado de anormal no exame físico.

A abordagem mais custo-efetiva e benéfica para esse paciente é`,
    options: [
      {
        id: "A",
        text: "proceder estudo manométrico de esôfago.",
        feedbackErrada: "Não é exame inicial para doença do refluxo gastroesofágico."
      },
      {
        id: "B",
        text: "solicitar endoscopia digestiva alta com biópsia.",
        feedbackErrada: "Endoscopia não é indicada inicialmente sem sinais de alarme."
      },
      {
        id: "C",
        text: "prescrever inibidores de bomba de prótons por via oral.",
        feedbackCorreta: "Correto. Teste terapêutico com IBP é indicado como primeira abordagem nos casos típicos."
      },
      {
        id: "D",
        text: "administrar antiácidos por via oral nos intervalos das refeições.",
        feedbackErrada: "Antiácidos não são o tratamento de escolha por menor eficácia e conveniência."
      },
      {
        id: "E",
        text: "realizar teste não invasivo para detecção de Helicobacter Pylori.",
        feedbackErrada: "Não há indicação sem sintomas de dispepsia propriamente dita."
      },
    ],
    correct: "C",
    referencia: "Ministério da Saúde – Protocolo Clínico de DRGE; Goldman-Cecil."
  },
  {
    id: 60,
    year: 2012,
    area: "Pediatria / Neonatologia",
    enunciado: `Uma mãe de lactente do sexo masculino, de cor parda, com 45 dias de vida, em aleitamento materno exclusivo, relata que o filho começou a ficar “amarelo” (sic) com cerca de três semanas de vida e que, agora, ela está muito assustada, pois a criança “está mais amarela, a urina está escura e as fezes estão esbranquiçadas” (sic). Ao exame físico, o fígado é palpável a 3 cm do rebordo costal direito. Exame solicitado por outro médico mostra bilirrubina direta muito aumentada: 21 mg/dL (valor de referência: inferior a 12 mg/dL).

O quadro clínico descrito é fortemente sugestivo de`,
    options: [
      {
        id: "A",
        text: "doença de Gilbert.",
        feedbackErrada: "Doença de Gilbert cursa com hiperbilirrubinemia indireta e é rara nesta faixa etária."
      },
      {
        id: "B",
        text: "anemia hemolítica.",
        feedbackErrada: "Geraria anemia e icterícia indireta, não colestase."
      },
      {
        id: "C",
        text: "atresia de vias biliares.",
        feedbackCorreta: "Correto. Fezes esbranquiçadas, colúria e aumento de bilirrubina direta são clássicos de atresia biliar."
      },
      {
        id: "D",
        text: "cisto congênito de colédoco.",
        feedbackErrada: "Pode causar colestase, mas é muito menos frequente e sintomas podem diferir."
      },
      {
        id: "E",
        text: "hepatite neonatal provavelmente por citomegalovírus.",
        feedbackErrada: "CMV é uma possibilidade em icterícia neonatal tardia, porém o quadro típico é de atresia biliar."
      },
    ],
    correct: "C",
    referencia: "Ministério da Saúde – Atenção à Saúde do Recém-Nascido."
  },
];

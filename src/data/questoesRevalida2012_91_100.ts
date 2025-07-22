
import { Question } from "./questoesRevalida2011";

export const QUESTOES_REVALIDA_2012_91_100: Question[] = [
  {
    id: 91,
    year: 2012,
    area: "Clínica Médica/Cardiologia",
    enunciado: `Uma mulher de 57 anos de idade, apresenta-se com PA = 150 x 100 mmHg, circunferência abdominal de 100 cm, glicemia = 115 mg/dL (valor de referência < 99 mg/dL), triglicerídes = 200 mg/dL (valor de referência < 150 mg/dL), HDL = 35 mg/dL (valor desejável > 60 mg/dL).\n\nNa terapia medicamentosa hipotensora, a droga que potencialmente apresenta efeitos metabólicos antagônicos às medidas para redução de peso e de controle glicêmico é`,
    options: [
      { id: "A", text: "captopril.", feedbackErrada: "IECAs são considerados metabolicamente neutros ou até benéficos." },
      { id: "B", text: "clonidina.", feedbackErrada: "Agonistas alfa-2 centrais têm menor impacto metabólico adverso." },
      { id: "C", text: "losartana.", feedbackErrada: "BRAs são considerados metabolicamente neutros ou até benéficos." },
      { id: "D", text: "amlodipina.", feedbackErrada: "Bloqueadores de canal de cálcio são metabolicamente neutros." },
      { id: "E", text: "propranolol.", feedbackCorreta: "Correto. Betabloqueadores não seletivos como o propranolol podem piorar o perfil lipídico e o controle glicêmico." }
    ],
    correct: "E",
    referencia: "Diretriz Brasileira de Hipertensão Arterial"
  },
  {
    id: 92,
    year: 2012,
    area: "Pediatria/Cardiologia",
    enunciado: `Um recém-nascido do sexo feminino, com 2 dias de vida, nascido a termo, com 2 300 g, apresenta sopro sistólico e cianose de extremidades ao choro.\n\nQual a medida propedêutica que afasta a maior parte das doenças cardíacas cianóticas?`,
    options: [
      { id: "A", text: "Teste de hiperventilação.", feedbackErrada: "Não é o teste padrão para diferenciar cianose de origem cardíaca e pulmonar." },
      { id: "B", text: "Teste da hipoventilação.", feedbackErrada: "Não é um procedimento diagnóstico para esta finalidade." },
      { id: "C", text: "Gasometria venosa.", feedbackErrada: "A gasometria arterial é necessária para avaliar a oxigenação de forma precisa." },
      { id: "D", text: "Oximetria de pulso.", feedbackErrada: "A oximetria confirma a hipoxemia, mas não diferencia a causa." },
      { id: "E", text: "Teste da hiperoxia.", feedbackCorreta: "Correto. O teste da hiperoxia (oferta de O2 a 100%) é fundamental para diferenciar a cianose de origem cardíaca da pulmonar." }
    ],
    correct: "E",
    referencia: "Manual de Neonatologia SBP"
  },
  {
    id: 93,
    year: 2012,
    area: "Pediatria/Neurologia",
    enunciado: `Uma criança de 4 anos de idade é trazida à Unidade de Saúde da Família (USF) pela mãe que refere que, há cerca de 12 horas, seu filho subitamente passou a apresentar febre e "fraqueza nas pernas". Ao exame físico, a médica percebe diminuição importante da força e tônus muscular nos membros inferiores da criança, conclui que se trata de um quadro de paralisia flácida aguda, suspeita de poliomielite e preenche a ficha de notificação compulsória.\n\nQue outra característica clínica além das mencionadas é típica da poliomielite?`,
    options: [
      { id: "A", text: "Paralisia do terceiro par de nervos cranianos.", feedbackErrada: "O acometimento de nervos cranianos é incomum." },
      { id: "B", text: "Fotossensibilidade, cefaleia e convulsões.", feedbackErrada: "Convulsões não são um achado típico da poliomielite." },
      { id: "C", text: "Acometimento simétrico dos membros inferiores.", feedbackErrada: "A paralisia na poliomielite é classicamente assimétrica." },
      { id: "D", text: "Perda da sensibilidade tátil nos membros inferiores.", feedbackErrada: "A sensibilidade geralmente é preservada." },
      { id: "E", text: "Flacidez e ausência de reflexos profundos nos membros inferiores.", feedbackCorreta: "Correto. A poliomielite causa uma paralisia flácida aguda com arreflexia ou hiporreflexia." }
    ],
    correct: "E",
    referencia: "Ministério da Saúde - Guia de Vigilância Epidemiológica - Poliomielite"
  },
  {
    id: 94,
    year: 2012,
    area: "Ginecologia/Obstetrícia",
    enunciado: `Uma paciente de 38 anos de idade, obesa, multípara, descobriu-se grávida aos 4 meses. Como era uma gravidez não desejada, demorou para iniciar seu pré-natal. Em sua primeira consulta pré-natal, apresentava idade gestacional pela última menstruação de 26 semanas, com fundo de útero medindo 27 centímetros. O médico, além dos exames da rotina pré-natal normal, solicitou o teste oral de tolerância à glicose com sobrecarga de 75 g de dextrose. Os seguintes resultados foram encontrados: glicemia de jejum: 100 mg/dL; 1 hora pós-sobrecarga: 190 mg/dL; 2 horas pós-sobrecarga: 143 mg/dL. Durante o resto do pré-natal, e a despeito das orientações médicas, a paciente não aderiu a uma dieta equilibrada, ainda que o doppler da artéria umbilical não tenha apresentado alterações significativas.\n\nConsiderando esses resultados, a que risco o feto dessa paciente está sujeito?`,
    options: [
      { id: "A", text: "Macrossomia.", feedbackCorreta: "Correto. O diabetes gestacional não controlado leva à hiperglicemia fetal e hiperinsulinismo, resultando em crescimento fetal excessivo (macrossomia)." },
      { id: "B", text: "Espinha bífida.", feedbackErrada: "Malformações do tubo neural estão associadas ao diabetes pré-gestacional descontrolado, não ao diabetes gestacional." },
      { id: "C", text: "Agenesia renal.", feedbackErrada: "Não é uma complicação fetal típica do diabetes gestacional." },
      { id: "D", text: "Malformação do tubo neural.", feedbackErrada: "Malformações do tubo neural estão associadas ao diabetes pré-gestacional descontrolado, não ao diabetes gestacional." },
      { id: "E", text: "Restrição de crescimento intrauterino.", feedbackErrada: "A restrição de crescimento é mais comum em casos de diabetes com vasculopatia, enquanto a macrossomia é a complicação mais frequente." }
    ],
    correct: "A",
    referencia: "Ministério da Saúde - Protocolo de Diabetes Gestacional"
  },
  {
    id: 95,
    year: 2012,
    area: "Clínica Cirúrgica",
    enunciado: `Um homem de 35 anos de idade, tabagista (60 maços/ano) encontra-se hospitalizado, no sétimo dia pós-operatório de rafia de úlcera gástrica. Há dois dias apresenta febre vespertina e dor em hipocôndrio D, referida na região subescapular. Ao exame, apresenta-se com estado geral regular, temperatura axilar = 38,6°C, pulso = 116 bpm, frequência respiratória = 28 irpm, PA = 112 x 67 mmHg. O abdome é discretamente distendido, doloroso à palpação, notadamente no hipocôndrio D, onde observa-se defesa voluntária e percussão também dolorosa; ruídos hidroaéreos presentes. A puno e percussão lombar é dolorosa à direita. A expansibilidade pulmonar está diminuída no hemitórax direito e o murmúrio vesicular um pouco diminuído na base do pulmão D. O leucograma mostra 16 200 leucócitos/mm³ (valor de referência: 5 800 a 10 600/mm³) com 17% de bastões. A proteína C Reativa é de 4,5 mg/dL (valor de referência < 0,3 a 0,5 mg/dL).\n\nA principal hipótese diagnóstica é`,
    options: [
      { id: "A", text: "pancreatite aguda.", feedbackErrada: "Embora possível, o quadro clínico com dor localizada e sinais em hemitórax direito é mais sugestivo de outra condição." },
      { id: "B", text: "abscesso subfrênico.", feedbackCorreta: "Correto. O quadro de febre, dor em hipocôndrio direito, leucocitose com desvio e sinais em base pulmonar direita, em pós-operatório de cirurgia abdominal alta, é clássico de abscesso subfrênico." },
      { id: "C", text: "pneumotórax espontâneo.", feedbackErrada: "Não explicaria os achados abdominais e febre." },
      { id: "D", text: "pneumonia de base pulmonar D.", feedbackErrada: "Poderia explicar os achados pulmonares e febre, mas os sinais abdominais são muito proeminentes, apontando para uma causa primária no abdome." },
      { id: "E", text: "deiscência de rafia gástrica com pneumoperitônio.", feedbackErrada: "Causaria um quadro de peritonite difusa, e não uma dor tão localizada." }
    ],
    correct: "B",
    referencia: "Schwartz - Princípios de Cirurgia"
  },
  {
    id: 96,
    year: 2012,
    area: "Ginecologia/Obstetrícia",
    enunciado: `Uma paciente de 27 anos de idade é encaminhada ao Ambulatório de Ginecologia com história de parto vaginal há sete meses, complicado com hemorragia intensa devido a descolamento prematuro de placenta. Após o parto, suspeitou-se de restos placentários e realizou-se curetagem uterina. A paciente recebeu três unidades de concentrado de hemácias devido ao sangramento intenso. A paciente relata que não menstruou desde o parto e que não amamentou seu filho, referindo não ter produzido leite materno. Não refere uso de medicamentos, relata 3 anormalidades atuais. Traz teste de fração beta do hormônio gonadotrófico coriônico (beta-HCG) não reagente.\n\nDiante desse quadro clínico, qual a melhor hipótese diagnóstica e as complicações prováveis secundárias ao diagnóstico?`,
    options: [
      { id: "A", text: "Síndrome de Sheehan; hipotireoidismo e insuficiência adrenal.", feedbackCorreta: "Correto. A história de hemorragia pós-parto grave, seguida de agalactia e amenorreia secundária, é a apresentação clássica da Síndrome de Sheehan (necrose hipofisária), que cursa com pan-hipopituitarismo." },
      { id: "B", text: "Necrose hipofisária posterior; hipertireoidismo e insuficiência adrenal.", feedbackErrada: "A necrose afeta principalmente a adeno-hipófise (anterior). A neuro-hipófise (posterior) é mais resistente à isquemia." },
      { id: "C", text: "Síndrome de Asherman; hipertireoidismo e elevação de gonadotrofinas.", feedbackErrada: "A Síndrome de Asherman (sinéquias uterinas) explica a amenorreia, mas não a agalactia e os sinais sistêmicos. As gonadotrofinas estariam normais ou baixas." },
      { id: "D", text: "Aderências intrauterinas; hipotireoidismo e redução de gonadotrofinas.", feedbackErrada: "Aderências intrauterinas não causam hipotireoidismo." },
      { id: "E", text: "Necrose hipofisária anterior; hipotireoidismo e elevação de gonadotrofinas.", feedbackErrada: "Na necrose hipofisária, as gonadotrofinas estariam reduzidas, não elevadas." }
    ],
    correct: "A",
    referencia: "Williams - Tratado de Endocrinologia"
  },
  {
    id: 97,
    year: 2012,
    area: "Saúde Coletiva",
    enunciado: `Uma equipe da Unidade de Saúde da Família (USF) identificou como problema o grande número de gestações em adolescentes na sua comunidade. Foi decidido, então, elaborar um Plano de Ações para o enfrentamento do problema, centrado na busca ativa de pessoas em situação de risco. Buscou-se parceria com as escolas da área, com as denominações religiosas locais e com a organização não governamental que ali atua, fomentando atividades esportivas e educação musical entre adolescentes e adultos jovens. Também foi proposta a articulação de aumento da variedade de métodos contraceptivos ofertados na farmácia da USF.\n\nNessa situação, para elaboração do Plano de Ações, deve-se observar que`,
    options: [
      { id: "A", text: "a definição da situação-objetivo não é indicada, pois a equipe a comprometeria, mas frustraria os usuários em caso de não atingimento de metas.", feedbackErrada: "Definir metas claras (situação-objetivo) é um passo fundamental de qualquer planejamento." },
      { id: "B", text: "as parcerias precisam ser previstas naqueles casos em que o custeio e (ou) financiamento das ações depende das entidades e dos indivíduos parceiros.", feedbackErrada: "As parcerias são importantes para articular ações e potencializar resultados, independentemente de haver repasse financeiro." },
      { id: "C", text: "indicar responsáveis por cada atividade não é adequado, pela natureza transdisciplinar da Estratégia de Saúde da Família, já que toda a equipe deve ser solidariamente responsável.", feedbackErrada: "A definição de responsáveis é essencial para a organização e para que as tarefas sejam executadas, mesmo que a responsabilidade final seja da equipe." },
      { id: "D", text: "o período de execução previsto é um cronograma tentativo que pode ser atualizado e adaptado durante a execução de cada ação, conforme o cumprimento de cada atividade e (ou) atraso.", feedbackCorreta: "Correto. O planejamento em saúde é um processo flexível e contínuo. O cronograma é uma ferramenta de gestão que deve ser adaptada à realidade." },
      { id: "E", text: "o princípio da boa-fé dispensa a previsão de meios de verificação para checagem do cumprimento ou não de ações e atividades, pois parte-se de presunção de que toda a equipe está genuinamente comprometida com as ações programadas.", feedbackErrada: "O monitoramento e a avaliação, com meios de verificação claros, são indispensáveis para acompanhar o progresso e o sucesso do plano." }
    ],
    correct: "D",
    referencia: "Ministério da Saúde - Cadernos de Atenção Básica - Planejamento"
  },
  {
    id: 98,
    year: 2012,
    area: "Pediatria/Cirurgia Pediátrica",
    enunciado: `Um lactente de 1 ano de idade é levado ao ambulatório com história de ausência de um dos testículos. A mãe refere ausência de vômitos, dor abdominal ou febre. Ao exame físico: criança em bom estado geral, chorosa, ativa. O exame da região inguino-escrotal revela ausência de epiderme e dor locais, com testículo esquerdo tópico e sem alterações, e hemiescroto direito vazio. Não foi possível palpar o testículo direito.\n\nDiante desse quadro, a conduta mais adequada é`,
    options: [
      { id: "A", text: "indicar correção cirúrgica ou terapia com gonadotrofina coriônica humana (HCG) antes do segundo ano de vida.", feedbackCorreta: "Correto. A criptorquidia deve ser corrigida idealmente entre 6 e 18 meses para minimizar os riscos de infertilidade e malignização." },
      { id: "B", text: "observar até completar 4 anos de idade. Se persistir o quadro, indicar cirurgia.", feedbackErrada: "Esperar até os 4 anos aumenta os riscos de complicações a longo prazo." },
      { id: "C", text: "iniciar terapia com HCG após 5 anos, se persistir o quadro.", feedbackErrada: "A conduta deve ser muito mais precoce, e o tratamento hormonal tem indicações específicas." },
      { id: "D", text: "indicar cirurgia se, no início da puberdade, ainda não tenha ocorrido sua descida espontânea.", feedbackErrada: "A espera até a puberdade aumenta drasticamente os riscos de infertilidade e câncer testicular." },
      { id: "E", text: "aguardar até a puberdade, quando ocorrerá sua descida espontânea para a bolsa escrotal, pela ação dos hormônios masculinos.", feedbackErrada: "A descida espontânea após o primeiro ano de vida é muito improvável." }
    ],
    correct: "A",
    referencia: "Sociedade Brasileira de Pediatria - Tratado de Pediatria"
  },
  {
    id: 99,
    year: 2012,
    area: "Ginecologia/Obstetrícia",
    enunciado: `Uma paciente de 23 anos de idade é internada na maternidade com rotura prematura de membranas na 29.ª semana de gestação. Encontra-se assintomática, afebril, normotensa, frequência cardíaca = 76 bpm, ainda referindo perda de líquido amniótico claro, sem grumos e sem odor desagradável. Leucograma com 9 500 leucócitos/mm³ (valor de referência: 3 600 a 10 600/mm³). A Proteína C Reativa < 0,5 mg/dL (valor de referência < 0,3 a 0,5 mg/dL). A ultrassonografia obstétrica mostrou feto com 29 semanas de gestação, com frequência cardíaca fetal de 140 bpm, maior bolsão de líquido amniótico de 6 centímetros.\n\nQual das condutas abaixo é adequada para essa paciente?`,
    options: [
      { id: "A", text: "Tocólise com nifedipina com duração até a 34.ª semana de gestação.", feedbackErrada: "A tocólise na vigência de rotura de membranas é controversa e geralmente não é recomendada." },
      { id: "B", text: "Corticoterapia com betametasona repetida semanalmente até a 34.ª semana de gestação.", feedbackErrada: "A corticoterapia para maturação pulmonar é indicada, mas em ciclo único, não em doses semanais repetidas." },
      { id: "C", text: "Sulfato de magnésio para a neuroproteção fetal, administrado no momento da internação da paciente e repetido na 34.ª semana de gestação.", feedbackErrada: "O sulfato de magnésio é indicado para neuroproteção em idade gestacional < 32 semanas." },
      { id: "D", text: "Antibioticoterapia profilática para postergação da gestação com duração até a 34.ª semana de gestação.", feedbackCorreta: "Correto. Em rotura de membranas pré-termo (<34 sem), a antibioticoterapia está indicada para prolongar a latência e reduzir morbidade infecciosa materna e neonatal." },
      { id: "E", text: "Rastreio para estreptococo beta-hemolítica, feito no momento da internação e repetido na 34.ª semana de gestação.", feedbackErrada: "A profilaxia para GBS é indicada no trabalho de parto, não de forma contínua durante a internação." }
    ],
    correct: "D",
    referencia: "FEBRASGO - Protocolo de Rotura Prematura de Membranas"
  },
  {
    id: 100,
    year: 2012,
    area: "Clínica Médica/Pneumologia",
    enunciado: `Um paciente do sexo masculino, 55 anos de idade, tabagista 60 maços/ano, com tosse crônica há mais de 10 anos, relata que há cerca de três meses observou a presença de sangue na secreção eliminada com a tosse. Refere ainda perda de cerca de 15% do peso habitual nesse mesmo período, anorexia, adinamia e sudorese noturna. A radiografia de tórax realizada por ocasião da consulta é mostrada abaixo.\n\n(Imagem de raio-x de tórax mostrando massa em lobo superior direito)\n\nQual a hipótese diagnóstica mais provável nesse caso?`,
    options: [
      { id: "A", text: "Aspergilose pulmonar.", feedbackErrada: "Embora possa causar hemoptise e imagem pulmonar, o perfil epidemiológico e os sintomas constitucionais tornam o carcinoma mais provável." },
      { id: "B", text: "Carcinoma pulmonar.", feedbackCorreta: "Correto. Idade, tabagismo pesado, hemoptise, perda de peso e massa pulmonar na radiografia formam o quadro clássico de câncer de pulmão." },
      { id: "C", text: "Tuberculose cavitária.", feedbackErrada: "É um diagnóstico diferencial importante, mas a história de tabagismo pesado aponta fortemente para neoplasia." },
      { id: "D", text: "Bronquiectasia com infecção.", feedbackErrada: "Não explica a perda de peso acentuada e a massa localizada na radiografia." },
      { id: "E", text: "Doença pulmonar obstrutiva crônica.", feedbackErrada: "O DPOC é esperado, mas não explica a hemoptise, a perda ponderal e, principalmente, a massa pulmonar." }
    ],
    correct: "B",
    referencia: "Ministério da Saúde - Protocolo de Câncer de Pulmão"
  }
];

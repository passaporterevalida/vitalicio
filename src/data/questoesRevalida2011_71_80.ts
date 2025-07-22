
import { Question } from "./questoesRevalida2011";

export const QUESTOES_REVALIDA_2011_71_80: Question[] = [
  {
    id: 71,
    year: 2011,
    area: "Pediatria",
    enunciado: `Criança em idade pré-escolar foi atendida na Unidade Básica de Saúde, por diversas vezes, com quadro diarreico semelhante: diarreia importante e evacuações explosivas logo após a ingestão de alimentos. No atendimento atual a criança encontra-se desidratada, apresenta assadura perianal e distensão abdominal. Os exames laboratoriais evidenciaram a presença de substâncias redutoras nas fezes e pH fecal menor do que 5,5.

Qual a suspeita diagnóstica principal?`,
    options: [
      {
        id: "A",
        text: "Diarreia infecciosa persistente.",
        feedbackErrada: "Diarreias infecciosas costumam ter causa viral ou bacteriana e não apresentam pH fecal tão baixo, nem sempre cursam com substâncias redutoras nas fezes, sendo mais comuns em quadros agudos."
      },
      {
        id: "B",
        text: "Diarreia aguda recorrente.",
        feedbackErrada: "A diarreia aguda recorrente sugere episódios infecciosos, geralmente não relacionados diretamente à ingestão de alimentos."
      },
      {
        id: "C",
        text: "Parasitoses intestinais.",
        feedbackErrada: "Parasitoses não costumam ter quadro de evacuações explosivas após a ingestão alimentar, assaduras e pH fecal ácido."
      },
      {
        id: "D",
        text: "Intolerância à lactose.",
        feedbackCorreta: "Quadro compatível pela presença de diarreia osmótica após ingestão de alimentos (especialmente lácteos), pH fecal ácido e presença de substâncias redutoras nas fezes."
      },
      {
        id: "E",
        text: "Doença inflamatória pélvica.",
        feedbackErrada: "Quadro não compatível com a faixa etária ou história clínica apresentada."
      }
    ],
    correct: "D"
  },
  {
    id: 72,
    year: 2011,
    area: "Pediatria",
    enunciado: `Criança, com seis anos de idade, é atendida em Serviço de Urgência. A mãe informa que a criança apresenta “chiado no peito, tosse e falta de ar”. Ao exame, você constata Frequência cardíaca = 125 bpm; Frequência respiratória = 50 irpm, sibilos expiratórios, tiragem intercostal e batimento das asas do nariz. Qual deve ser a conduta clínica para iniciar o tratamento da criança?`,
    options: [
      {
        id: "A",
        text: "Salbutamol 5 mg/1, 1 gt/2kg e brometo de Ipratrópio 0,25 mg/ml, 20 a 40 gotas; hidrocortisona 4 mg/2kg.",
        feedbackCorreta: "É a recomendação inicial para crise asmática moderada; o uso combinado de beta-2 agonista inalatório, anticolinérgico e corticoide sistêmico está indicado."
      },
      {
        id: "B",
        text: "Fenoterol 5 mg/1, 1 gt/3kg; hidrocortisona 4 mg/2kg.",
        feedbackErrada: "Fenoterol não é primeira escolha nesta faixa etária e o anticolinérgico potencializa o efeito do beta-2 agonista."
      },
      {
        id: "C",
        text: "Salbutamol 5mg/ml, 1gt/kg e brometo de Ipratrópio 0,25 mg/ml, 10 gotas; metilprednisolona 1 mg/kg.",
        feedbackErrada: "A dose do corticoide está fora da faixa recomendada, e hidrocortisona é preferível para administração inicial, pois é mais usada em emergência pediátrica."
      },
      {
        id: "D",
        text: "Fenoterol 5 mg/1, 10 gt/kg; hidrocortisona 4 mg/kg.",
        feedbackErrada: "Dose de beta-2 agonista está excessiva para a faixa etária."
      },
      {
        id: "E",
        text: "Salbutamol 5 mg/1, 1 gt/3kg e brometo de Ipratrópio 0,25 mg/ml, 20 a 40 gotas; metilprednisolona 2 mg/kg.",
        feedbackErrada: "Embora as doses dos broncodilatadores estejam corretas, a dose do corticoide está acima da usual inicial."
      }
    ],
    correct: "A"
  },
  {
    id: 73,
    year: 2011,
    area: "Pediatria",
    enunciado: `Menina, com seis anos de idade, foi levada pela mãe à consulta em Unidade Básica de Saúde por apresentar, há uma semana, intensa adinamia, quadro febril intermitente (temperatura = 38°C) e dor articular, localizada inicialmente no joelho esquerdo, acompanhada de calor e rubor discreto e que, há dois dias, acomete o tornozelo direito. A mãe informa que, há cerca de seis semanas, a criança apresentou quadro de infecção de vias aéreas superiores (faringite), que regrediu com o uso de amoxicilina durante cinco dias. Ao exame físico a criança encontrava-se afebril, eupneica, hidratada, com intensa adinamia, hipocorada (+/4), Frequência cardíaca=128 bpm, Pressão arterial=100 x 60 mmHg. A ausculta cardíaca e a ausculta pulmonar foram normais. Foi observada hiperemia, calor e dor no tornozelo direito, com limitação de movimentos e a presença de áreas eritematosas com eritemas esbranquiçados no tronco e na região proximal de membros superiores e inferiores.

Os exames laboratoriais revelaram: hemoglobina=10 g/dL, hematócrito=34%, leucócitos=14000/mm3, velocidade de hemossedimentação = 26mm/h, proteína C reativa=2,0 ng/ml (valor de referência: <0,1 mg/mL); glicose, ureia e creatinina normais. O eletrocardiograma mostra um prolongamento do intervalo P-R (0,20 s).

Com base no quadro clínico descrito e nos exames complementares realizados, qual o provável diagnóstico dessa criança?`,
    options: [
      {
        id: "A",
        text: "Artrite idiopática juvenil.",
        feedbackErrada: "Não há indícios clínicos ou laboratoriais suficientes para diagnóstico de artrite idiopática juvenil; intervalos PR geralmente não são alterados nesta condição."
      },
      {
        id: "B",
        text: "Lupus eritematoso sistêmico.",
        feedbackErrada: "Lúpus tem manifestações sistêmicas e laboratoriais distintas e não costuma cursar com intervalo PR prolongado em crianças."
      },
      {
        id: "C",
        text: "Febre reumática.",
        feedbackCorreta: "Atende aos critérios de Jones: artrite migratória, envolvimento cardíaco (PR prolongado), antecedente de faringite estreptocócica e eritema marginado."
      },
      {
        id: "D",
        text: "Síndrome de Reiter.",
        feedbackErrada: "É rara em crianças e geralmente envolve uretrite, conjuntivite, e artrite; não é o quadro típico aqui."
      },
      {
        id: "E",
        text: "Espondiloartrites.",
        feedbackErrada: "Não apresenta as manifestações clínicas/laboratoriais características relatadas."
      }
    ],
    correct: "C"
  },
  {
    id: 74,
    year: 2011,
    area: "Pediatria/Nefrologia",
    enunciado: `Paciente do sexo feminino, com 14 anos de idade, recebe atendimento médico por apresentar quadro de hematúria macroscópica acompanhada de mialgia discreta, adinamia, discreta hipertermia (temperatura axilar=37.8°C). A mãe informa que a paciente apresentou infecção de vias aéreas superiores há cerca de um mês, que regrediu após tratamento com amoxicilina durante dez dias. Por ocasião dessa primeira consulta a paciente apresentava hipertensão arterial (Pressão arterial = 150x110 mmHg), fundo de olho é normal e não há outras alterações do exame físico. A paciente é hospitalizada pois os primeiros exames laboratoriais já mostram creatinina sérica elevada (8,4 mg/dL) e ela evolui rapidamente com oligúria, edema e agravamento da função renal. A hematúria macroscópica regride, mas persiste hematúria microscópica, com presença de cilindros hemáticos e a paciente passa a apresentar também proteinúria (3g/24 h). A investigação clínico-laboratorial não evidencia presença de vasculite ou doença sistêmica. A dosagem de complemento sérico (C3, CH50) é normal; anticorpos antinucleares ausentes, pesquisa de fator anti-nuclear negativa. A paciente foi submetida à biópsia renal - fragmento com 30 glomérulos, com proliferação das células epiteliais da cápsula de Bowman e infiltração por macrófagos e linfócitos, configurando a presença de crescentes epiteliais em 70% dos glomérulos, alguns com aspecto fibrocelular. 
A imunofluorescência da biópsia renal, reproduzida abaixo, evidencia deposição linear de IgG - não há depósitos mesangiais; imunofluorescência negativa para IgM, IgA e C3.

Com base na história clínica, evolução e na biópsia renal e imunofluorescência, pergunta-se qual o mecanismo responsável pelo dano glomerular?`,
    options: [
      {
        id: "A",
        text: "Reação antígeno-anticorpo in situ ao longo da membrana basal glomerular.",
        feedbackCorreta: "A deposição linear de IgG na membrana basal glomerular é típica de nefropatia por anticorpo anti-MBG (doença de Goodpasture), cuja fisiopatologia é mediada por reação antígeno-anticorpo in situ."
      },
      {
        id: "B",
        text: "Deposição de complexos imunes circulantes ao longo da membrana basal glomerular.",
        feedbackErrada: "Depósitos granulares (não lineares) são observados em doenças por complexo imune, como púrpura de Henoch-Schönlein e glomerulonefrite pós-infecciosa."
      },
      {
        id: "C",
        text: "Alterações da imunidade celular, notadamente de macrófagos e linfócitos T auxiliares.",
        feedbackErrada: "Embora existam esses infiltrados, o achado histopatológico e imunofluorescência apontam o mecanismo humoral (anticorpo anti-MBG)."
      },
      {
        id: "D",
        text: "Deposição de anticorpo antiantígeno citoplasmático de neutrófilos.",
        feedbackErrada: "Não há evidências histológicas/imunológicas de vasculite associada a anticorpos anti-citoplasma de neutrófilos (ANCA)."
      },
      {
        id: "E",
        text: "Deposição de anticorpos antiantígenos estreptocócicos ao longo da membrana basal glomerular.",
        feedbackErrada: "Apesar do antecedente de infecção, a biópsia não evidencia depósitos típicos de glomerulonefrite pós-estreptocócica."
      }
    ],
    correct: "A",
    referencia: "Nefropatia por anticorpo anti-membrana basal glomerular (doença de Goodpasture)."
  },
  {
    id: 75,
    year: 2011,
    area: "Ginecologia",
    enunciado: `Paciente do sexo feminino, com 20 anos de idade, vai à Unidade Básica de Saúde queixando-se de corrimento genital presente há um mês, de coloração esbranquiçada, em quantidade abundante, com odor fétido, que piora após o coito. Não relata outros sintomas associados. A paciente iniciou a atividade sexual há um ano e, nesse período, teve três parceiros sexuais. Atualmente tem apenas um parceiro e, nas relações sexuais, faz uso ocasional de preservativo. Ao exame especular vaginal foi observado corrimento vaginal esbranquiçado e abundante, fétido, e ausência de anomalias nas paredes vaginais e do colo uterino. O teste de aminas foi positivo e o pH=5,5. Qual o diagnóstico principal e o tratamento adequado para esta paciente?`,
    options: [
      {
        id: "A",
        text: "Tricomoníase. Tratar com metronidazol, por via oral, durante sete dias, e o parceiro com metronidazol em dose única.",
        feedbackErrada: "Tricomoníase geralmente cursa com prurido e corrimento esverdeado e bolhoso, pH geralmente > 5,5; não corresponde ao quadro típico."
      },
      {
        id: "B",
        text: "Candidíase vulvovaginal. Tratar a paciente com fluconazol, por via oral, em dose única.",
        feedbackErrada: "Candidíase típica tem corrimento grumoso, sem odor fétido e pH normal."
      },
      {
        id: "C",
        text: "Vaginose bacteriana. Tratar a paciente com metronidazol, por via oral, durante sete dias.",
        feedbackCorreta: "Vaginose bacteriana cursa com corrimento homogêneo, esbranquiçado/fétido, pH elevado e teste das aminas positivo; tratamento com metronidazol por 7 dias é o mais indicado."
      },
      {
        id: "D",
        text: "Gonorreia. Tratar a paciente e o parceiro com azitromicina em dose única.",
        feedbackErrada: "Corrimento da gonorreia é purulento/amarelo, não fétido, geralmente associado a outras manifestações."
      },
      {
        id: "E",
        text: "Infecção por clamídia. Tratar a paciente com doxiciclina por 14 dias e o parceiro, com azitromicina em dose única.",
        feedbackErrada: "Clamídia cursa com corrimento mucopurulento e não tem associação com o teste de aminas positivo, pH elevado e ausência de sintomas descritos."
      }
    ],
    correct: "C"
  },
  {
    id: 76,
    year: 2011,
    area: "Ortopedia/Trauma",
    enunciado: `Homem, com 29 anos de idade, vítima de queda de moto com explosão do baço, apresenta lesão hepática sangrante e fratura fechada de ossos da perna esquerda, há 5 horas. O procedimento transcorreu sem intercorrências. O paciente se queixa de dor em todo membro inferior operado, mais acentuadamente em terço distal de perna e pé. Apresenta parestesia no membro esquerdo, com importante e tensa edema na perna. O tempo de perfusão na perna operada é de mais de três segundos. O membro não se encontrava roxo e os fixadores não apresentam problemas aparentes. Os pulsos femorais e poplíteos são presentes e normais bilateralmente, bem como os tibiais à direita. À esquerda, nota-se uma diminuição acentuada dos pulsos tibial posterior e pedioso. Diante dessa situação, o diagnóstico e a conduta apropriada são, respectivamente:`,
    options: [
      {
        id: "A",
        text: "Trombose venosa profunda; heparinização.",
        feedbackErrada: "Trombose venosa profunda não justifica tempo de enchimento capilar aumentado, dor intensa, edema tenso e parestesia; além disso, não costuma ocorrer minutos ou poucas horas após o trauma."
      },
      {
        id: "B",
        text: "Oclusão arterial aguda; tromboembolectomia de urgência.",
        feedbackErrada: "Oclusão arterial teria sinais de isquemia mais intensos: palidez, frialdade, ausência total de pulsos, e não é compatível com edema tenso descrito."
      },
      {
        id: "C",
        text: "Desalinhamento do sítio de fratura; reintegração cirúrgica.",
        feedbackErrada: "O desalinhamento do sítio de fratura não explicaria necessariamente o quadro de dor desproporcional ou perda de pulsos distais."
      },
      {
        id: "D",
        text: "Síndrome compartimental; fasciotomia de urgência.",
        feedbackCorreta: "Síndrome compartimental pós-fratura: dor desproporcional, edema tenso, tempo de enchimento capilar prolongado e perda de pulsos periféricos distais – conduta: fasciotomia de urgência."
      },
      {
        id: "E",
        text: "Trombose arterial aguda; trombólise.",
        feedbackErrada: "Quadro não sugere trombose arterial; edema tenso e parestesia são mais típicos de síndrome compartimental."
      }
    ],
    correct: "D"
  },
  {
    id: 77,
    year: 2011,
    area: "Obstetrícia",
    enunciado: `Paciente, com 27 anos de idade, segunda gestação (um parto normal anterior), com idade gestacional de 38 semanas, confirmada por ultrassonografia fetal de 10 semanas, apresenta dinâmica uterina positiva e forte cefaleia. Refere uso de metildopa - 750mg/dia em três tomadas. Foi admitida com esse quadro em emergência de um hospital, queixando-se também de visão turva e de grande mal estar. A anamnese e exame físico indicam paciente inquieta, poliqueixosa, referindo medo de morrer. Pressão arterial = 190x120mmHg, colo uterino fino e dilatado para 8 cm, apresentação cefálica, dorso à esquerda, contrações uterinas presentes - três em 10 minutos, de 45 segundos . 

Com base no quadro acima, qual o diagnóstico correto e a conduta a ser adotada?`,
    options: [
      {
        id: "A",
        text: "Pré-eclâmpsia grave. Paciente com indicação de parto cesáreo após normalização pressórica com nifedipina ou hidralazina.",
        feedbackErrada: "Na presença de parto em curso, acompanhamento expectante ou vaginal é preferencial."
      },
      {
        id: "B",
        text: "Eclâmpsia eminente. Indicação de sulfato de magnésio e hidralazina para correção dos níveis pressóricos e resolução do parto por via alta.",
        feedbackCorreta: "Sinais de gravidade (cefaleia, visão turva, inquietação), parto evoluído, PA muito elevada – manejo: sulfato de magnésio e hidralazina, finalizar por via alta (cesárea)."
      },
      {
        id: "C",
        text: "Pré-eclâmpsia grave. Indicação de sulfato de magnésio e nifedipina para correção dos níveis pressóricos e resolução por parto abdominal.",
        feedbackErrada: "Embora também descreva uso de sulfato de magnésio, a indicação de cesárea só é imprescindível na iminência de eclâmpsia."
      },
      {
        id: "D",
        text: "Crise hipertensiva na gestação e pré-eclâmpsia. Indicação de cesárea pela necessidade de remoção da placenta e introdução de nifedipina para correção dos níveis pressóricos.",
        feedbackErrada: "Não existem relatos claros de descolamento placentário. Indicação de parto é por evolução e sinais de gravidade."
      },
      {
        id: "E",
        text: "Eminência de eclâmpsia. Indicação de sulfato de magnésio e hidralazina para correção dos níveis pressóricos e resolução por parto vaginal.",
        feedbackErrada: "Conduta correta seria finalizar parto por via alta (cesárea), não vaginal."
      }
    ],
    correct: "B"
  },
  {
    id: 78,
    year: 2011,
    area: "Obstetrícia/Adolescência",
    enunciado: `Primigesta, com 16 anos de idade, procura a Unidade Básica de Saúde para sua primeira consulta pré-natal, na trigésima sexta semana de gestação. A paciente disse não ter iniciado o pré-natal antes, pois demorou a aceitar a gestação, e não quer ter um parto vaginal. Relata que mora com os pais e está morando com o pai da criança, que tem 25 anos e é saudável. O exame físico não revela anomalias e o exame obstétrico mostra altura uterina de 34 cm, batimentos cardiofetais com frequência de 140 bpm e o toque vaginal evidenciou colo grosso, posterior e impérvio. Qual a conduta a seguir?`,
    options: [
      {
        id: "A",
        text: "Solicitar a presença dos pais para realizar a consulta, por se tratar de menor de idade.",
        feedbackErrada: "Adolescente gestante tem direito a atendimento mesmo sem presença dos pais."
      },
      {
        id: "B",
        text: "Pedir os exames de rotina pré-natal, encaminhar para acompanhamento psico-social, prescrever sulfato ferroso e solicitar a presença do pai da criança na próxima consulta.",
        feedbackCorreta: "Conduta correta: iniciar pré-natal, exames de rotina, acompanhamento psicossocial e orientação sobre pré-natal; não há necessidade da presença de pais ou do pai da criança obrigatoriamente."
      },
      {
        id: "C",
        text: "Encaminhar a paciente para avaliação diretamente na maternidade, devido ao início tardio do pré-natal.",
        feedbackErrada: "Pré-natal de início tardio pode ser feito na atenção primária com acompanhamento adequado."
      },
      {
        id: "D",
        text: "Encaminhar a paciente para a maternidade, pois as características da gestação na adolescência indicam que a via de parto deverá ser cesárea.",
        feedbackErrada: "Não há indicação obrigatória de cesárea apenas por ser adolescente."
      },
      {
        id: "E",
        text: "Solicitar os exames de rotina pré-natal, encaminhar para acompanhamento psico-social, prescrever sulfato ferroso e solicitar retorno antecipado ao pré-natal.",
        feedbackErrada: "A alternativa correta é B, retorno deve ser conforme avaliado durante acompanhamento."
      }
    ],
    correct: "B"
  },
  {
    id: 79,
    year: 2011,
    area: "Clínica Médica/Reumatologia",
    enunciado: `Mulher, com 20 anos de idade, branca, é recebida no pronto-socorro com queixa de edema há uma semana. Inicialmente, o edema era nos membros inferiores, porém, agora, nota a face edemaciada. Relata, ainda, diminuição do volume urinário, astenia, hiporexia, mal-estar e febre baixa. Quanto aos antecedentes patológicos, artralgia de interfalangeanas proximais há cerca de oito meses. Na ocasião, fez uso de prednisona com desaparecimento do quadro. Não usa nenhuma medicação no momento. O exame clínico demonstra estado geral regular, hipocorada (+/4), edema de membros inferiores (++/4) e de face. Ausculta pulmonar com murmúrio vesicular presente e simétrico, sem ruídos adventícios. Ausculta cardíaca com ritmo cardíaco regular, em 2 tempos, sem sopros, Pressão arterial = 160 x 110 mmHg, Frequência cardíaca = 120 bpm. Abdome flácido, sem visceromegalias.

Exames no pronto-socorro:
Hemoglobina = 8,0 g/L, Hematócrito 24,0 %, Leucócitos totais = 2.400 /mm³ (Segmentados= 84%, Bastões= 2%, Linfócitos = 8%, Eosinófilos = 2%, Monócitos = 2%), Plaquetas = 100.000 /mm³ (Valor de Referência = 150.000 - 300.000 /mm³). Ureia = 140 mg/dL (Valor de Referência: 15-40 mg/dL), Creatinina = 2,0 mg/dL (Valor de Referência: 0,6-1,2 mg/dL), Potássio = 5,5 mEq/L (Valor de Referência: 3,5-5,0 mEq/L).

Qual a hipótese diagnóstica para o caso?`,
    options: [
      {
        id: "A",
        text: "Endocardite infecciosa.",
        feedbackErrada: "Quadro clínico e exames laboratoriais não são consistentes com infecção bacteriana aguda."
      },
      {
        id: "B",
        text: "Dengue.",
        feedbackErrada: "Não há alterações hematológicas/laboratoriais típicas de dengue, como hemoconcentração e trombocitopenia isolada."
      },
      {
        id: "C",
        text: "Pielonefrite.",
        feedbackErrada: "Faltam sintomas infecciosos urinários claros (disúria, polaciúria, dor lombar)."
      },
      {
        id: "D",
        text: "Insuficiência renal crônica.",
        feedbackErrada: "Sem antecedentes de doença renal crônica ou sintomas arrastados; quadro evolutivo agudo."
      },
      {
        id: "E",
        text: "Lúpus Eritematoso Sistêmico.",
        feedbackCorreta: "Sintomas sistêmicos, hematológicas, artralgia crônica, insuficiência renal, proteína e glóbulos vermelhos na urina sugerem LES."
      }
    ],
    correct: "E"
  },
  {
    id: 80,
    year: 2011,
    area: "Obstetrícia/Partograma",
    enunciado: `Paciente, com 25 anos de idade, secundigesta, com parto cesáreo anterior (G2P1C1), pré-natal sem intercorrências, foi internada em trabalho de parto e apresenta evolução de acordo com partograma, apresentado abaixo. Na décima hora de evolução, apresenta atividade uterina regular de 5 contrações/45 segundos/10 minutos/fortes e batimentos cardiofetais de 150 bpm.

Analisando o partograma, qual é o diagnóstico e a conduta para o caso?`,
    options: [
      {
        id: "A",
        text: "Parada secundária da descida e fórceps.",
        feedbackErrada: "Fórceps está reservado aos casos em que a apresentação já se encontra no canal de parto (estação +2 ou +3), o que não é detalhado neste caso."
      },
      {
        id: "B",
        text: "Parada secundária da dilatação e ocitocina.",
        feedbackErrada: "A parada secundária da dilatação corresponderia à falha de progressão cervical, e a conduta seria uso de ocitocina, não fórceps nem cesárea."
      },
      {
        id: "C",
        text: "Parada secundária da dilatação e fórceps.",
        feedbackErrada: "Fórceps não está indicado se o problema for de dilatação cervical, e não de descida da apresentação."
      },
      {
        id: "D",
        text: "Parada secundária da descida e cesárea.",
        feedbackCorreta: "O diagnóstico é de parada secundária da descida; conduta: cesárea, sobretudo com antecedente de parto cesáreo anterior."
      },
      {
        id: "E",
        text: "Período expulsivo prolongado e cesárea.",
        feedbackErrada: "Não há elementos suficientes no caso para diagnóstico de período expulsivo prolongado."
      }
    ],
    correct: "D"
  }
];

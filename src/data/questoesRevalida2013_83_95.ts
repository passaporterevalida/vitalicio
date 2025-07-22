
import { Question } from "./questoesRevalida2011";

// Questões 83 a 95 do Revalida 2013 (transcrição oficial das imagens)
export const QUESTOES_REVALIDA_2013_83_95: Question[] = [
  {
    id: 83,
    year: 2013,
    area: "Cirurgia Geral",
    enunciado: `Homem com 35 anos de idade, no 3.º dia pós-operatório de apendicectomia, encontra-se internado em enfermaria coletiva de pequeno hospital secundário. O achado cirúrgico foi de uma apendicite aguda em fase gangrenosa. Foi iniciada a antibioticoterapia com administração de gentamicina e metronidazol e a alimentação via oral com boa aceitação, após a eliminação de flatos e fezes. Não apresentou febre. Ao exame, a ferida cirúrgica encontra-se hiperemiada, discretamente abaulada e com saída de material purulento.\n\nA conduta para esse caso, além do esclarecimento ao paciente, é:`,
    options: [
      { id: "A", text: "manter a antibioticoterapia e curativos diários." },
      { id: "B", text: "trocar antibioticoterapia, aplicar calor local e curativos diários." },
      { id: "C", text: "manter a antibioticoterapia, retirar os pontos cirúrgicos para drenagem da secreção e curativos diários." },
      { id: "D", text: "trocar antibioticoterapia, indicar a realização de exame de imagem pelo risco de infecção intracavitária." },
      { id: "E", text: "manter antibioticoterapia, indicar a exploração cirúrgica da ferida operatória pelo risco de infecção intracavitária." },
    ],
    correct: "C"
  },
  {
    id: 84,
    year: 2013,
    area: "Saúde Pública / Epidemiologia",
    enunciado: `A tuberculose (TB) é um problema de Saúde Pública no Brasil. A identificação precoce de pessoas com TB é imprescindível para a quebra da cadeia de transmissão da doença. No Brasil, em 2008, a TB foi a quarta causa de morte por doenças infecciosas e a primeira causa de morte em pacientes com Aids.\n\nCom o aumento do número de casos de pacientes com Aids na população prisional, eleva-se a quantidade de pacientes com TB. Neste cenário, o indicador que expressa o número de casos novos da doença nesta população no período de 1 ano é:`,
    options: [
      { id: "A", text: "letalidade." },
      { id: "B", text: "incidência." },
      { id: "C", text: "morbidade." },
      { id: "D", text: "prevalência." },
      { id: "E", text: "mortalidade." },
    ],
    correct: "B"
  },
  {
    id: 85,
    year: 2013,
    area: "Pediatria / Nefrologia",
    enunciado: `Menina com 1 ano de idade, em bom estado geral, é levada à consulta médica. Tem história de infecção urinária (ITU) de repetição e investigação radiológica demonstrando refluxo vesico-ureteral grau II.\n\nConsiderando as evidências mais recentes quanto à eficácia e segurança da profilaxia com antibióticos para crianças com infecção urinária, escolha a conduta mais adequada para esta criança.`,
    options: [
      { id: "A", text: "A profilaxia está indicada pela eficácia na prevenção de novos episódios, apesar dos efeitos colaterais dos antibióticos em longo prazo." },
      { id: "B", text: "A profilaxia não está indicada, pois não diminui a incidência de novos episódios e pode selecionar a flora para recorrências de ITU." },
      { id: "C", text: "A quimioprofilaxia tem indicação precisa neste caso de refluxo vesico-ureteral e é segura, desde que administrada em baixas doses." },
      { id: "D", text: "A quimioprofilaxia é discutível neste caso por tratar-se de uma menina, apesar de sua segurança ter sido demonstrada em estudos." },
      { id: "E", text: "A profilaxia deve ser indicada neste caso e nos demais casos de refluxo vesico-ureteral até sua resolução ou correção cirúrgica." },
    ],
    correct: "B"
  },
  {
    id: 86,
    year: 2013,
    area: "Ginecologia / Obstetrícia",
    enunciado: `Secundigesta, com 18 semanas de idade gestacional, comparece à segunda consulta de pré-natal em Unidade Básica de Saúde. Traz resultado de exame de urocultura com mais de 100 mil unidades formadoras de colônias bacterianas por ml. Nega queixas urinárias e febre. Ao exame físico: bom estado geral, corada, hidratada, eupneica, pressão arterial = 120 x 80 mmHg. Exame obstétrico: altura uterina de 17 cm, batimentos cardíacos fetais presentes, rítmicos, 136 batimentos por minutos.\n\nA conduta indicada é:`,
    options: [
      { id: "A", text: "iniciar tratamento profilático com cefalosporina diariamente até o parto." },
      { id: "B", text: "iniciar antibioticoterapia e repetir urocultura sete dias após o término do tratamento." },
      { id: "C", text: "repetição da urocultura em duas semanas, pois o resultado sugere contaminação da amostra." },
      { id: "D", text: "solicitar ultrassonografia das vias urinárias e realizar uroculturas bimensais para monitoramento do quadro." },
      { id: "E", text: "solicitar sedimento urinário para confirmar infecção urinária e, se mostrar a presença de nitritos, iniciar tratamento." },
    ],
    correct: "B"
  },
  {
    id: 87,
    year: 2013,
    area: "Saúde Coletiva / Gestão em Saúde",
    enunciado: `Em uma reunião de planejamento com os gerentes das Unidades de Atenção Básica de um município de médio porte, são avaliados os motivos das falhas nos fluxos dos usuários em relação aos serviços de Urgência e Emergência locais. Para que essa discussão seja produtiva, o gestor local esclareceu, para os participantes da reunião, conceitos importantes sobre Redes de Atenção no Sistema Único de Saúde.\n\nEntre os conceitos apresentados pelo gestor sobre o tema, quais estão previstos nas normas do SUS?`,
    options: [
      { id: "A", text: "Os pontos de atenção a Urgência e Emergência nas Redes de Atenção à Saúde são as estruturas hospitalares terciárias, que possuem instrumental tecnológico apropriado para estas condições, sendo que estes pontos devem estar interligados com os demais níveis através de um transporte sanitário adequado." },
      { id: "B", text: "As Redes de Atenção à Saúde caracterizam-se pela formação de relações verticais entre os pontos de atenção, tendo como porta de entrada a Atenção Primária à Saúde, pois este nível é o responsável pela triagem inicial dos pacientes e o encaminhamento primário para os pontos de cuidado mais apropriados para cada caso." },
      { id: "C", text: "Os pontos de atenção a Urgência e Emergência devem estar no centro das Redes de Atenção à Saúde, pois nesses locais são realizados cuidados essenciais à saúde das pessoas, assim como a efetiva comunicação e coordenação do cuidado dentro da Rede por meio do apoio de sistema técnico, logístico e de gestão entre os níveis." },
      { id: "D", text: "As Redes de Atenção à Saúde são definidas como um modelo linear de cuidado dentro do sistema de saúde. Elas orientam gestores e usuários sobre a porta de entrada e o escalonamento entre os diversos níveis de densidade tecnológica no sistema, com os seus objetivos de prestação de serviços singulares." },
      { id: "E", text: "Nas Redes de Atenção à Saúde, todos os pontos de atenção são igualmente importantes para que se cumpram os objetivos do cuidado integral, que deve ser realizado por meio de relações horizontais entre os diversos níveis de atenção, que diferenciam-se apenas pelas distintas densidades tecnológicas que os caracterizam." },
    ],
    correct: "E"
  },
  {
    id: 88,
    year: 2013,
    area: "Ginecologia / Obstetrícia",
    enunciado: `Primigesta, com 39 semanas de gestação, encontra-se em trabalho de parto há seis horas. Nas últimas três horas, manteve a dilatação cervical de 6 cm, sem que houvesse modificações no colo uterino, que se encontra medioapagado e centrado em 50%. Quando a paciente foi internada, apresentava três contrações moderadas em 10 minutos. Nas últimas duas horas, tem apresentado dinâmica uterina de duas contrações fracas em 10 minutos. A descida do polo cefálico vem se processando de forma progressiva e agora observa-se que o polo cefálico está no plano zero de De Lee.\n\nCom base no quadro clínico, o diagnóstico e a conduta são:`,
    options: [
      { id: "A", text: "fase ativa prolongada, distócia funcional; deambulação e, se necessário, ocitocina." },
      { id: "B", text: "fase de latência prolongada; administrar ocitocina e realizar amniotomia." },
      { id: "C", text: "período pélvico prolongado; realizar amniotomia e administrar ocitocina." },
      { id: "D", text: "desproporção céfalo-pélvica relativa; indicar operação cesariana." },
      { id: "E", text: "parada secundária de descida; indicar operação cesariana." },
    ],
    correct: "A"
  },
  {
    id: 89,
    year: 2013,
    area: "Cirurgia / Traumatologia",
    enunciado: `Homem com 28 anos de idade chega ao Serviço de Urgência de um hospital de atenção secundária cerca de 30 minutos após colisão automobilística. Está confuso, queixando-se de muita falta de ar e dor no hemitórax direito. Apresenta uma fratura fechada na tíbia direita, sem sangramento ativo. Ao exame físico mostra-se descorado (++/++++), frequência cardíaca = 128 bpm, pressão arterial = 90 x 60 mmHg, e frequência respiratória = 40 irpm. A ausculta pulmonar revela murmúrio vesicular ausente à direita. A percussão mostra macicez do hemitórax direito. O oxímetro de pulso mostra saturação de oxigênio de 92% (ar ambiente). O paciente apresenta várias escoriações pelo corpo.\n\nA conduta mais adequada para este paciente, após aferição da permeabilidade de vias aéreas, estabilização da coluna cervical e oxigenoterapia suplementar, é a realização de:`,
    options: [
      { id: "A", text: "punção pericárdica no espaço subxifóide." },
      { id: "B", text: "drenagem pleural no 2.º espaço intercostal na linha hemiclavicular." },
      { id: "C", text: "radiografia simples de tórax no leito para diagnóstico definitivo e posterior conduta." },
      { id: "D", text: "punção torácica com cateter de grosso calibre no 2.º espaço intercostal na linha hemiclavicular." },
      { id: "E", text: "drenagem pleural no 5.º espaço intercostal na linha axilar anterior, com preparo de material para autotransfusão." },
    ],
    correct: "E"
  },
  {
    id: 90,
    year: 2013,
    area: "Pediatria / Infectologia",
    enunciado: `Recém-nascido com 36 semanas de idade gestacional, parto cesariano, Apgar 8 e 8, peso de nascimento = 2.100 g, evolui com sintomas precoces e graves nas primeiras 24 horas de vida: icterícia, hepatoesplenomegalia, elevação das enzimas hepáticas, anemia, trombocitopenia e hemorragias, associados ao achado de microcefalia com calcificações cerebrais periventriculares, microftalmia, coriorretinite e surdez.\n\nA principal hipótese diagnóstica para esta infecção congênita e o tratamento de escolha são, respectivamente:`,
    options: [
      { id: "A", text: "herpes simples e aciclovir." },
      { id: "B", text: "citomegalovírus e ganciclovir." },
      { id: "C", text: "rubéola e tratamento de suporte." },
      { id: "D", text: "sífilis congênita e penicilina cristalina." },
      { id: "E", text: "toxoplasmose e pirimetamina/sulfadiazina." },
    ],
    correct: "B"
  },
  {
    id: 91,
    year: 2013,
    area: "Psiquiatria / Clínica Médica",
    enunciado: `Paciente com 17 anos de idade, primípara, encontra-se no 7.º dia de pós-parto e permanece internada no alojamento conjunto, acompanhando seu recém-nascido, em tratamento de sepse neonatal. Nesse período, a paciente começa a apresentar quadro de insônia, delírios de grandeza, alternados com manifestações paranoides. Diz que ouve vozes e vê sombras que querem pegá-la e trocar seu bebê. Durante o dia, apresenta agitação psicomotora ininterrupta. Ela não apresenta nenhum sintoma associado a infanticídio ou abalos negativos em relação à sua maternidade, mas diz que prefere morrer a ser “pega pelas sombras”. A família nega qualquer quadro anterior semelhante.\n\nBaseado na sintomatologia apresentada, o diagnóstico é:`,
    options: [
      { id: "A", text: "disforia pós-parto." },
      { id: "B", text: "psicose pós-parto." },
      { id: "C", text: "depressão pós-parto." },
      { id: "D", text: "transtorno de ansiedade." },
      { id: "E", text: "transtorno bipolar (psicose maníaco-depressiva)." },
    ],
    correct: "B"
  },
  {
    id: 92,
    year: 2013,
    area: "Saúde Coletiva / Pneumologia",
    enunciado: `A Unidade Básica de Saúde de uma pequena cidade é responsável pela atenção a um asilo municipal. Em uma das visitas ao asilo, o médico atende um homem de 78 anos de idade com quadro de tosse produtiva há aproximadamente um mês. O paciente dorme em um quarto com outros três idosos, e, na instituição, vivem ao todo 15 idosos. Já fez uso de antialérgicos e azitromicina, 500 mg por 5 dias, sem melhora. Após coleta de escarro, é feito diagnóstico de tuberculose pulmonar e iniciado tratamento.\n\nQual a conduta a ser adotada em relação aos contatantes?`,
    options: [
      { id: "A", text: "Os três idosos que dividem o quarto com o paciente índice devem ser tratados para tuberculose." },
      { id: "B", text: "Todos os contatos devem coletar duas amostras de escarro para exame de BAAR." },
      { id: "C", text: "Somente os sintomáticos respiratórios devem ser investigados para tuberculose." },
      { id: "D", text: "Contatos assintomáticos devem realizar prova tuberculínica." },
      { id: "E", text: "Todos os contatos devem realizar raio-X de tórax." },
    ],
    correct: "D"
  },
  {
    id: 93,
    year: 2013,
    area: "Ginecologia / Obstetrícia",
    enunciado: `Primigesta com 30 anos de idade, 38 semanas de gestação e pré-natal sem intercorrências, é admitida na Maternidade em trabalho de parto. Ao exame físico na admissão, pressão arterial = 100 x 60 mmHg, altura uterina = 35 cm, dinâmica uterina - 2 contrações em 10 minutos, frequência cardíaca fetal = 140 bpm. Ao toque vaginal, colo fino, 3 cm de dilatação, apresentação cefálica, bolsa íntegra.\n\nAnalisando a evolução do trabalho de parto, conforme o partograma mostrado na imagem, a hipótese diagnóstica e a conduta correta, após 10 horas de observação, são, respectivamente:`,
    options: [
      { id: "A", text: "fase ativa prolongada; administrar ocitocina." },
      { id: "B", text: "parada secundária da descida; realizar cesariana." },
      { id: "C", text: "parada secundária da dilatação; realizar cesariana." },
      { id: "D", text: "parada secundária da dilatação; administrar ocitocina." },
      { id: "E", text: "parada secundária da descida; realizar analgesia (bloqueio combinado)." },
    ],
    correct: "A"
  },
  {
    id: 94,
    year: 2013,
    area: "Clínica Médica / Nefrologia",
    enunciado: `Homem com 27 anos de idade, sem antecedentes patológicos, é admitido no Hospital com quadro de dor e edema em membros inferiores. O paciente informa ter corrido uma maratona sob tempo chuvoso há cinco dias. O paciente relata também redução do volume urinário e urina de coloração escura. No dia anterior à hospitalização, apresentou náuseas, vômitos e tremores de extremidades. O exame físico não mostra outras alterações além da dor à compressão de estruturas musculares e da PA = 150 x 90 mmHg. Os exames iniciais mostram os seguintes resultados: Creatinina sérica= 4,2 mg/dL, Ureia sérica=150mg/dL, TGO/AST= 750 U/L, TGP/ALT= 520 U/L, Creatinoquinase sérica= 9.800 U/L, Na⁺sérico= 141 mEq/L, K⁺sérico= 4,6 mEq/L, Hemograma sem alterações, Urina tipo I (EAS): hemoglobina+++; eritrócitos: 6-8/campo; leucócitos: 1-2/campo. O raio-X de tórax e a ultrassonografia de abdome foram normais.\n\nCom base nos dados apresentados, o diagnóstico e a conduta inicial a ser tomada são, respectivamente:`,
    options: [
      { id: "A", text: "leptospirose; hemodiálise." },
      { id: "B", text: "polimiosite; glicocorticóides." },
      { id: "C", text: "rabdomiólise; hidratação endovenosa." },
      { id: "D", text: "desidratação; hidratação endovenosa." },
      { id: "E", text: "síndrome hepatorrenal; albumina associada à terlipressina." },
    ],
    correct: "C"
  },
  {
    id: 95,
    year: 2013,
    area: "Clínica Médica / Neurologia",
    enunciado: `Homem com 20 anos de idade, vítima de colisão motociclística em via pública, foi levado ao hospital pela equipe de suporte básico de vida, que relatou inconsciência durante todo o atendimento. Apresenta abertura ocular à dor, emite palavras inapropriadas e postura de decorticação ao estímulo doloroso, com anisocoria (pupila D > E). Os sinais vitais são: frequência cardíaca = 68 bpm, pressão arterial = 160 x 100 mmHg, frequência respiratória = 20 irpm e saturação de oxigênio de 98%. A tomografia computadorizada de crânio mostrou hematoma subdural com desvio importante da linha média.\n\nAs condutas tomadas para minimizar o dano cerebral, além da manutenção de vias aéreas, ventilação e controle da volemia, devem ser:`,
    options: [
      { id: "A", text: "craniotomia imediata para drenagem do hematoma e instalação de monitorização de pressão intracraniana." },
      { id: "B", text: "fixação de parâmetros ventilatórios para manter a pCO2 entre 25 e 30 mmHg, manitol endovenoso em bolus e craniotomia após redução da pressão intracraniana para drenagem do hematoma." },
      { id: "C", text: "fixação de parâmetros ventilatórios para manter a pCO2 entre 25 e 30 mmHg, furosemida por via endovenosa em bolus, craniotomia imediata para drenagem do hematoma e instalação de monitorização de pressão intracraniana." },
      { id: "D", text: "fixação de parâmetros ventilatórios para manter a pCO2 entre 25 e 30 mmHg, manitol endovenoso em infusão lenta, craniotomia imediata para drenagem do hematoma e instalação de monitorização de pressão intracraniana." },
      { id: "E", text: "fixação de parâmetros ventilatórios para manter a pCO2 entre 25 e 30 mmHg, manitol endovenoso em bolus, craniotomia imediata para drenagem do hematoma e instalação de monitorização de pressão intracraniana." },
    ],
    correct: "E"
  },
];

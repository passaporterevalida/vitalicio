
import { Question } from "./questoesRevalida2011";

export const QUESTOES_REVALIDA_2012_11_20: Question[] = [
  {
    id: 11,
    year: 2012,
    area: "Clínica Médica/Psiquiatria",
    enunciado: `Uma mulher de 24 anos de idade procura a Unidade de Saúde da Família (USF) com queixas de cansaço e dores no corpo, sentimentos de tristeza e inadequação. Relata que, desde a infância, sente-se “diferente” dos outros, “sempre no mundo da lua”. Na escola, tinha dificuldades de atenção, não conseguia terminar as tarefas, perdia seus pertences e interrompia os professores. Na adolescência, teve problemas de relacionamento com as amigas por ser “explosiva” e falar o que pensa. Já adulta, foi demitida de dois empregos por não conseguir cumprir prazos. Há 1 ano, procurou um psiquiatra, que lhe prescreveu um antidepressivo, sem melhora do quadro. Apresenta exame físico normal.\n\nQual a hipótese diagnóstica para esse caso?`,
    options: [
      { id: "A", text: "Transtorno do déficit de atenção com hiperatividade.", feedbackCorreta: "Correto. O histórico de desatenção, impulsividade e hiperatividade desde a infância, com prejuízos em múltiplas áreas da vida (escolar, social, profissional), é característico do TDAH." },
      { id: "B", text: "Transtorno bipolar.", feedbackErrada: "Incorreto. O Transtorno Bipolar cursa com episódios distintos de mania/hipomania e depressão, o que não é o foco do relato." },
      { id: "C", text: "Transtorno de personalidade borderline.", feedbackErrada: "Incorreto. O Transtorno de Personalidade Borderline envolve instabilidade afetiva, de autoimagem e relacionamentos, mas o núcleo do problema descrito é a desatenção crônica." },
      { id: "D", text: "Distimia.", feedbackErrada: "Incorreto. Distimia é um transtorno depressivo persistente, mas não explica os sintomas de hiperatividade e desatenção desde a infância." },
      { id: "E", text: "Fobia social.", feedbackErrada: "Incorreto. Fobia social é um transtorno de ansiedade relacionado a situações sociais, não aos sintomas nucleares descritos." }
    ],
    correct: "A",
    referencia: "Manual Diagnóstico e Estatístico de Transtornos Mentais (DSM-V)."
  },
  {
    id: 12,
    year: 2012,
    area: "Clínica Médica",
    enunciado: `Um homem de 40 anos de idade é atendido na Unidade Básica de Saúde (UBS) com quadro de anorexia, perda de peso e adinamia, associados a tosse e discreta falta de ar, iniciado há 30 dias. Ao exame físico foi constatado: paciente emagrecido, IMC 16 kg/m², PA = 110 x 70 mmHg, FC = 88 bpm, FR = 20 irpm, sopro cavitário no ápice pulmonar esquerdo.

Que exames são indicados para a elucidação diagnóstica nesse caso?`,
    options: [
      { id: "A", text: "Hemograma completo, anti-HIV 1 e 2 e radiografia de tórax.", feedbackErrada: "Incorreto. O anti-HIV é importante no contexto, mas não diagnostica a tuberculose. O hemograma é inespecífico." },
      { id: "B", text: "Pesquisa de BAAR no escarro e radiografia de tórax.", feedbackErrada: "Incorreto. A pesquisa de BAAR (baciloscopia) pode ter falsos negativos, por isso a cultura é importante para aumentar a sensibilidade diagnóstica." },
      { id: "C", text: "Pesquisa de BAAR no escarro, cultura do escarro pelo método Ogawa-Kudoh e radiografia de tórax.", feedbackCorreta: "Correto. A pesquisa de BAAR e a cultura são essenciais para o diagnóstico, sendo a cultura mais sensível. A radiografia de tórax é fundamental para avaliar a extensão da doença. Esta combinação é o padrão-ouro." },
      { id: "D", text: "Baciloscopia do escarro, radiografia de tórax e técnica molecular de reação em cadeia mediada pela polimerase.", feedbackErrada: "Incorreto. Testes moleculares são úteis e rápidos, mas a cultura ainda é necessária para teste de sensibilidade aos fármacos." },
      { id: "E", text: "Cultura do escarro pelo método Löwestein-Jensen e técnica molecular e reação em cadeia mediada pela polimerase.", feedbackErrada: "Incorreto. Testes moleculares são úteis e rápidos, mas a cultura ainda é necessária para teste de sensibilidade aos fármacos." }
    ],
    correct: "C",
    referencia: "Ministério da Saúde – Guia de Vigilância Epidemiológica da Tuberculose"
  },
  {
    id: 13,
    year: 2012,
    area: "Pediatria/Dermatologia",
    enunciado: `Uma criança de 8 anos de idade é levada pela mãe à Unidade Básica de Saúde (UBS). A mãe relata que, há 2 semanas, surgiu uma lesão avermelhada e descamativa no couro cabeludo do seu filho, que foi aumentando progressivamente de tamanho. Ao exame, a médica observa uma placa alopécica, bem delimitada, com cerca de 5 cm de diâmetro, com presença de cabelos curtos e quebradiços, além de descamação acinzentada. A criança não apresenta outras queixas.\n\nQual o tratamento de escolha para essa condição?`,
    options: [
      { id: "A", text: "Cetoconazol tópico.", feedbackErrada: "Incorreto. O tratamento tópico isolado é ineficaz, pois não atinge o folículo piloso adequadamente." },
      { id: "B", text: "Griseofulvina oral.", feedbackCorreta: "Correto. Tinea capitis, uma infecção fúngica do couro cabeludo, requer tratamento sistêmico (oral). A Griseofulvina é o tratamento de escolha clássico para crianças." },
      { id: "C", text: "Nistatina oral.", feedbackErrada: "Incorreto. Nistatina não é eficaz contra os dermatófitos que causam a tinea capitis." },
      { id: "D", text: "Amoxicilina oral.", feedbackErrada: "Incorreto. Amoxicilina é um antibiótico e não tem ação contra fungos." },
      { id: "E", text: "Corticosteroide tópico.", feedbackErrada: "Incorreto. O tratamento tópico isolado com corticosteroide é ineficaz e pode piorar o quadro fúngico." }
    ],
    correct: "B",
    referencia: "Sociedade Brasileira de Pediatria – Guia de Dermatologia Pediátrica."
  },
  {
    id: 14,
    year: 2012,
    area: "Saúde Coletiva / DST/AIDS",
    enunciado: `Uma mulher de 23 anos de idade, casada, do lar e nuligesta, iniciou atividade sexual há 3 anos, após casamento. No momento, essa mulher está em tratamento para condilomatose vulvar em uma Unidade Básica de Saúde (UBS) e apresenta boa evolução. Ela não mantém relações extraconjugais, seu marido é saudável e não tem histórico de doença sexualmente transmissível (DST) e/ou uso de drogas injetáveis. Após aconselhamento, realizou sorologia para HIV e o resultado foi positivo. Diante disso, foi solicitada pesquisa sorológica para HIV em nova amostra sanguínea. A paciente retorna hoje à UBS para conhecer o resultado. Ambas as amostras foram processadas no mesmo laboratório e seus resultados são apresentados nas figuras a seguir.

Nessa situação, que conduta deve ser adotada para a paciente?`,
    options: [
      { id: "A", text: "Solicitar contagem de linfócitos T-CD4+.", feedbackErrada: "Incorreto. CD4 e Carga Viral são exames de estadiamento e acompanhamento, realizados após a confirmação do diagnóstico." },
      { id: "B", text: "Solicitar contagem de linfócitos T-CD4+ e a quantificação da Carga Viral do HIV.", feedbackErrada: "Incorreto. CD4 e Carga Viral são exames de estadiamento e acompanhamento, realizados após a confirmação do diagnóstico." },
      { id: "C", text: "Encaminhar a paciente para o Serviço de Assistência Especializada em DST/AIDS.", feedbackErrada: "Incorreto. O encaminhamento ao SAE ocorre após a confirmação diagnóstica." },
      { id: "D", text: "Solicitar análise sorológica para HIV, em uma nova amostra sanguínea, pela técnica de Western Blot.", feedbackErrada: "Incorreto. O Western Blot era considerado o teste confirmatório final, mas a Imunofluorescência era um passo intermediário comum no fluxograma da época." },
      { id: "E", text: "Solicitar análise sorológica para HIV, em uma nova amostra sanguínea, pela técnica de Imunofluorescência indireta.", feedbackCorreta: "Correto. De acordo com o fluxograma do MS da época, um teste de triagem positivo deveria ser seguido por um segundo teste, como a Imunofluorescência Indireta, para confirmação diagnóstica antes de outros procedimentos." }
    ],
    correct: "E",
    referencia: "Ministério da Saúde – Protocolo Clínico para Diagnóstico da Infecção pelo HIV"
  },
  {
    id: 15,
    year: 2012,
    area: "Clínica Médica / Cirurgia",
    enunciado: `Uma mulher de 60 anos de idade é admitida na Emergência de um Pronto-Socorro de referência com quadro de dor em fossa ilíaca esquerda há trinta horas, associada a febre, três episódios de evacuação diarréica, náuseas e dois episódios de vômitos ocorridos há seis horas. Ao exame físico, foi palpada massa de limites imprecisos em fossa ilíaca esquerda. O diagnóstico sugerido pela tomografia abdominal e pélvica foi diverticulite aguda.

Qual a conduta inicial para essa paciente?`,
    options: [
      { id: "A", text: "Antibióticos endovenosos, suspensão da dieta oral e analgesia com dipirona.", feedbackCorreta: "Correto. O tratamento inicial para diverticulite aguda não complicada é clínico, com repouso intestinal (jejum), hidratação, antibioticoterapia endovenosa e analgesia." },
      { id: "B", text: "Dieta constipante, administração de antieméticos endovenosos e analgesia com morfina.", feedbackErrada: "Incorreto. Dieta constipante não é indicada. Morfina deve ser usada com cautela pois pode aumentar a pressão intraluminal." },
      { id: "C", text: "Hidratação endovenosa, analgesia e encaminhamento para cirurgia de urgência.", feedbackErrada: "Incorreto. O tratamento cirúrgico de urgência é reservado para casos complicados (perfuração, obstrução, abscesso não drenável)." },
      { id: "D", text: "Antibióticos por via oral, dieta rica em fibras e analgesia com morfina.", feedbackErrada: "Incorreto. Antibióticos orais e dieta rica em fibras são para casos muito leves ou após a fase aguda." },
      { id: "E", text: "Drenagem percutânea de emergência.", feedbackErrada: "Incorreto. A drenagem percutânea é para abscessos diverticulares, o que não foi confirmado." }
    ],
    correct: "A",
    referencia: "Ministério da Saúde – Protocolo Clínico de Cirurgia Digestiva"
  },
  {
    id: 16,
    year: 2012,
    area: "Saúde Coletiva",
    enunciado: `Uma Unidade Básica de Saúde (UBS) desenvolve um programa de controle da hipertensão arterial e do diabetes, que inclui grupos de educação em saúde e atividades físicas. A equipe percebe que a adesão dos usuários ao programa é baixa e decide realizar uma pesquisa para identificar os motivos. Os resultados mostram que muitos usuários desconhecem os benefícios das atividades e têm dificuldades de acesso à UBS. Com base nesses dados, a equipe planeja ações para melhorar a divulgação e facilitar o acesso dos usuários.\n\nEssa iniciativa da equipe de saúde corresponde a qual campo da Promoção da Saúde?`,
    options: [
      { id: "A", text: "Políticas públicas saudáveis.", feedbackErrada: "Incorreto. Políticas públicas saudáveis envolvem ações legislativas ou governamentais mais amplas, não uma iniciativa de uma única UBS." },
      { id: "B", text: "Criação de ambientes favoráveis.", feedbackErrada: "Incorreto. Criação de ambientes favoráveis seria, por exemplo, construir uma ciclovia ou uma academia ao ar livre." },
      { id: "C", text: "Reforço da ação comunitária.", feedbackErrada: "Incorreto. Reforço da ação comunitária implicaria em capacitar a própria comunidade para liderar as ações." },
      { id: "D", text: "Desenvolvimento de habilidades pessoais.", feedbackErrada: "Incorreto. Desenvolvimento de habilidades pessoais seria o objetivo final do programa (ex: ensinar as pessoas a cozinhar de forma saudável), não a ação da equipe de reorganizar o serviço." },
      { id: "E", text: "Reorientação dos serviços de saúde.", feedbackCorreta: "Correto. Ao identificar um problema (baixa adesão) e planejar ações para melhorar o acesso e a divulgação, a equipe está reorientando o serviço de saúde para melhor atender às necessidades da comunidade." }
    ],
    correct: "E",
    referencia: "Carta de Ottawa – Promoção da Saúde."
  },
  {
    id: 17,
    year: 2012,
    area: "Ginecologia/Obstetrícia",
    enunciado: `Uma mulher de 30 anos de idade, com queixa de dismenorreia progressiva e infertilidade, procura assistência médica. Ao exame físico, observa-se dor à palpação dos ligamentos uterossacros e espessamento dos mesmos.

Qual a hipótese diagnóstica mais provável para esse caso?`,
    options: [
      { id: "A", text: "Doença inflamatória pélvica.", feedbackErrada: "Incorreto. A DIP pode causar dor e infertilidade, mas a dismenorreia progressiva e o espessamento dos ligamentos são menos característicos." },
      { id: "B", text: "Mioma uterino.", feedbackErrada: "Incorreto. Miomas podem causar sangramento anormal, mas não costumam causar a dor e os achados no exame físico descritos." },
      { id: "C", text: "Câncer de ovário.", feedbackErrada: "Incorreto. Câncer de ovário geralmente se apresenta de forma mais insidiosa ou com massa pélvica em estágios avançados." },
      { id: "D", text: "Pólipo endometrial.", feedbackErrada: "Incorreto. Pólipos podem causar sangramento anormal, mas não costumam causar a dor e os achados no exame físico descritos." },
      { id: "E", text: "Endometriose.", feedbackCorreta: "Correto. Dismenorreia progressiva, infertilidade e dor à palpação de ligamentos uterossacros (espessados) formam a tríade clássica de sintomas e sinais da endometriose." }
    ],
    correct: "E",
    referencia: "Federação Brasileira das Associações de Ginecologia e Obstetrícia (FEBRASGO)."
  },
  {
    id: 18,
    year: 2012,
    area: "Cirurgia/Gastroenterologia",
    enunciado: `Um homem de 50 anos de idade procura atendimento médico com queixa de disfagia progressiva para sólidos e líquidos, associada à regurgitação de alimentos não digeridos. O paciente relata que os sintomas têm piorado gradualmente ao longo dos últimos meses.

Qual a hipótese diagnóstica mais provável para esse caso?`,
    options: [
      { id: "A", text: "Hérnia de hiato por deslizamento.", feedbackErrada: "Incorreto. Hérnia de hiato e esofagite de refluxo geralmente causam pirose (azia) e a disfagia, quando presente, é mais para sólidos." },
      { id: "B", text: "Acalasia.", feedbackCorreta: "Correto. Disfagia progressiva para sólidos e líquidos, associada à regurgitação de alimentos não digeridos, é a apresentação clássica da acalasia." },
      { id: "C", text: "Divertículo de Zenker.", feedbackErrada: "Incorreto. O divertículo de Zenker causa disfagia alta e regurgitação, mas a progressão lenta e a disfagia para líquidos são mais típicas da acalasia." },
      { id: "D", text: "Câncer de esôfago.", feedbackErrada: "Incorreto. O câncer de esôfago classicamente cursa com disfagia progressiva, primeiro para sólidos e depois para líquidos, além de emagrecimento acentuado." },
      { id: "E", text: "Esofagite de refluxo.", feedbackErrada: "Incorreto. Hérnia de hiato e esofagite de refluxo geralmente causam pirose (azia) e a disfagia, quando presente, é mais para sólidos." }
    ],
    correct: "B",
    referencia: "Tratado de Cirurgia – Sabiston."
  },
  {
    id: 19,
    year: 2012,
    area: "Clínica Médica/Nefrologia",
    enunciado: `Um paciente de 65 anos de idade, com histórico de hipertensão arterial e diabetes mellitus tipo 2, é internado devido a um quadro de desidratação e infecção urinária. Durante a internação, o paciente apresenta elevação dos níveis de creatinina sérica e diminuição do volume urinário. O exame de urina revela a presença de cilindros hialinos e ausência de proteinúria significativa.

Qual a causa mais provável para a insuficiência renal aguda nesse paciente?`,
    options: [
      { id: "A", text: "Insuficiência renal aguda pré-renal.", feedbackCorreta: "Correto. O paciente tem múltiplos fatores de risco para hipovolemia (desidratação, infecção) e o exame de urina com cilindros hialinos é característico de uma causa pré-renal da IRA." },
      { id: "B", text: "Nefrite intersticial aguda.", feedbackErrada: "Incorreto. A nefrite intersticial aguda teria achados urinários diferentes, como cilindros leucocitários." },
      { id: "C", text: "Necrose tubular aguda.", feedbackErrada: "Incorreto. A necrose tubular aguda teria achados como cilindros granulosos/epiteliais." },
      { id: "D", text: "Síndrome hepatorrenal.", feedbackErrada: "Incorreto. Síndrome hepatorrenal ocorre em pacientes com doença hepática grave, o que não foi mencionado." },
      { id: "E", text: "Glomerulonefrite rapidamente progressiva.", feedbackErrada: "Incorreto. Glomerulonefrite rapidamente progressiva teria hematúria dismórfica e proteinúria significativas." }
    ],
    correct: "A",
    referencia: "Sociedade Brasileira de Nefrologia – Diretrizes Clínicas."
  },
  {
    id: 20,
    year: 2012,
    area: "Clínica Médica / Cirurgia",
    enunciado: `Um homem de 27 anos de idade, pedreiro, sofreu queda de um andaime e deu entrada na Emergência de um hospital terciário em franca insuficiência respiratória. As vias aéreas encontravam-se pérvias e, à ausculta, foi constatada a abolição do murmúrio vesicular à direita e macicez à percussão. Foi realizada drenagem do hemotórax direito com saída de 1500 mL de sangue. No decurso do atendimento, observou-se que o débito do dreno era de 300 mL/h.

Além da reposição volêmica, a conduta mais adequada para esse paciente, nesse momento, é`,
    options: [
      { id: "A", text: "intubação orotraqueal e ventilação com pressão positiva.", feedbackErrada: "Incorreto. A intubação pode ser necessária para o suporte ventilatório, mas não trata a causa base do choque, que é a hemorragia ativa." },
      { id: "B", text: "radiografia de tórax em PA e Perfil.", feedbackErrada: "Incorreto. A radiografia é um exame importante, mas não deve atrasar a conduta cirúrgica num paciente instável com sangramento ativo." },
      { id: "C", text: "drenagem torácica com aspiração contínua.", feedbackErrada: "Incorreto. A drenagem já foi realizada. A conduta agora é cirúrgica para parar o sangramento." },
      { id: "D", text: "toracostomia secundária.", feedbackErrada: "Incorreto. A drenagem já foi realizada. A conduta agora é cirúrgica para parar o sangramento." },
      { id: "E", text: "toracostomia de urgência.", feedbackCorreta: "Correto. Hemotórax maciço (débito inicial > 1500ml) ou sangramento contínuo (débito > 200 ml/h) são indicações absolutas de toracotomia de urgência para controle da hemorragia." }
    ],
    correct: "E",
    referencia: "Ministério da Saúde – Protocolo de Trauma Torácico"
  }
];

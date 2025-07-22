import { Question } from "./questoesRevalida2011";

export const QUESTOES_REVALIDA_2012_101_110: Question[] = [
  {
    id: 101,
    year: 2012,
    area: "Pediatria",
    enunciado: `Um lactente de 2 meses de idade é levado ao Pronto-Socorro com história de febre, recusa alimentar e hipoatividade. Exame físico: hipotônico-hiporresponsivo. A mãe refere que a criança recebeu, na véspera, as vacinas DPT (difteria, pertussis e tétano), OPV (pólio oral) e rotavírus.\n\nNessa situação, que conduta deve ser adotada em relação ao esquema vacinal?`,
    options: [
      { id: "A", text: "Suspender a vacina contra rotavírus.", feedbackErrada: "A reação não é típica da vacina de rotavírus." },
      { id: "B", text: "Substituir OPV pela IPV (pólio injetável).", feedbackErrada: "A reação não é típica da vacina oral contra pólio (VOP)." },
      { id: "C", text: "Substituir a vacina DPT pela DPT acelular.", feedbackCorreta: "Correto. O episódio hipotônico-hiporresponsivo é um evento adverso associado principalmente ao componente pertussis de células inteiras (P) da vacina DTP. A conduta é substituir as doses subsequentes pela vacina acelular (DTPa)." },
      { id: "D", text: "Manter o esquema vacinal normal, sem alterações.", feedbackErrada: "Não se deve manter o esquema normal diante de um evento adverso significativo." },
      { id: "E", text: "Substituir a vacina DPT pela DPT acelular e a OPV pela IPV (pólio injetável).", feedbackErrada: "A principal indicação é a troca da DPT pela DPTa. A troca da VOP pela VIP não é mandatória neste cenário." }
    ],
    correct: "C",
    referencia: "Manual de Normas e Procedimentos para Vacinação - PNI/MS"
  },
  {
    id: 102,
    year: 2012,
    area: "Clínica Médica/Cardiologia",
    enunciado: `Um homem de 48 anos, hipertenso, obeso, chega à Emergência com queixa de episódios de dor torácica precordial, sem irradiação, iniciada nos últimos dois dias, com piora há 24 horas. A dor dura 5 a 15 minutos, sendo precidida por esforços intensos, como subir escadas, e é aliviada pelo repouso. O paciente informa não sentir a dor no momento do anamnese. Usa captopril e hipoglicemiante oral de forma regular. Nega antecedentes de doença coronariana e um eletrocardiograma foi considerado normal pela seu cardiologista na última consulta, há 6 meses. Ao exame, mostra-se ansioso, mas em bom estado geral, pulso = 85 bpm, regular, cheio, PA = 140 x 80 mmHg, pulsos periféricos palpáveis e simétricos, extremidades bem perfundidas. As auscultas pulmonar e cardíaca estão dentro da normalidade. O seu eletrocardiograma à admissão mostra os seguintes achados.\n\n(Imagem de ECG com infradesnivelamento do segmento ST em V4-V6)\n\nQual a abordagem mais adequada ao paciente?`,
    options: [
      { id: "A", text: "Realizar tratamentos anti-isquêmico e antitrombótico administrados de modo imediato e simultâneo.", feedbackCorreta: "Correto. O quadro é de Síndrome Coronariana Aguda sem supradesnivelamento do segmento ST (angina instável ou IAM sem supra de ST). A conduta inicial é a dupla antiagregação plaquetária, anticoagulação e terapia anti-isquêmica." },
      { id: "B", text: "Observar em Unidade Coronariana e administrar medicamentos sintomáticos até realização de cateterismo cardíaco.", feedbackErrada: "Aguardar o cateterismo sem iniciar terapia antitrombótica aumenta o risco de eventos isquêmicos." },
      { id: "C", text: "Observar na Emergência por 12 horas e encaminhar ao cardiologista para teste ergométrico se persistir assintomático.", feedbackErrada: "Teste ergométrico é contraindicado na fase aguda de uma SCA." },
      { id: "D", text: "Realizar tratamento anti-isquêmico imediato, seguido de terapia antitrombótica em caso de alterações do segmento ST no ECG nas próximas 12 horas.", feedbackErrada: "A terapia antitrombótica não deve ser adiada, ela é parte crucial do tratamento inicial." },
      { id: "E", text: "Realizar tratamento antitrombótico imediato, seguido de terapia anti-isquêmica em caso de elevação de troponina sérica e/ou CK-MB nas próximas 12 horas.", feedbackErrada: "A terapia anti-isquêmica deve ser iniciada imediatamente, junto com a antitrombótica, sem aguardar marcadores de necrose." }
    ],
    correct: "A",
    referencia: "Diretriz da Sociedade Brasileira de Cardiologia sobre Angina Instável e Infarto Agudo do Miocárdio sem Supradesnível do Segmento ST"
  },
  {
    id: 103,
    year: 2012,
    area: "Saúde Coletiva",
    enunciado: `A Unidade de Saúde da Família (USF) funciona como campo de prática de estudantes de graduação, pois para lá são encaminhados alunos de Medicina e de Enfermagem. Uma estudante ficou surpresa com a quantidade de formulários a serem preenchidos pela equipe e afirmou duvidar que 'tanto papel' servisse para tomar decisões na prática. Ela ainda defendeu que deveria ser investido menos tempo com formulários, liberando os profissionais para o efetivo atendimento aos usuários.\n\nUma atitude adequada da equipe nesse caso é`,
    options: [
      { id: "A", text: "explicar que, caso a Ficha A para Cadastramento das Famílias não fosse preenchida, não se teria ideia da evolução do quadro de hipertensos e diabéticos, mas apenas os portadores de tuberculose e hanseníase, que têm Fichas B de Acompanhamento específicas.", feedbackCorreta: "Correto. Embora a Ficha B seja para o acompanhamento específico, a Ficha A (Cadastro da Família) é a base de todo o sistema de informação, permitindo identificar os indivíduos a serem acompanhados." },
      { id: "B", text: "ponderar que a Ficha C para Acompanhamento de Crianças torna obrigatório o preenchimento do Cartão-Sombra para melhor monitorar o crescimento e desenvolvimento infantil e o suplemento do calendário vacinal, quando ocorre extravio do Cartão da Criança.", feedbackErrada: "A Ficha C do SIAB era destinada ao acompanhamento de gestantes e puérperas." },
      { id: "C", text: "demonstrar que a Ficha D para Registro de Atividades, Procedimentos e Notificações informa a Secretaria de Saúde detalhes sobre a população da área de abrangência da USF, mas que eventuais usuários atendidos que residam em outras áreas não são tabulados.", feedbackErrada: "A Ficha D registra as atividades realizadas, não os detalhes da população (que estão na Ficha A)." },
      { id: "D", text: "argumentar que procedimentos coletivos como reuniões, atividades educativas, bochechos fluorados e visitas domiciliares só precisam ser registrados por seus totais mensais na Ficha D para Registro de Atividades, Procedimentos e Notificações, e não individualmente.", feedbackErrada: "A Ficha D requer o registro detalhado de atividades e procedimentos, tanto individuais quanto coletivos." },
      { id: "E", text: "considerar que as notificações a serem registradas na Ficha D para Registro de Atividades, Procedimentos e Notificações são apenas àquelas referentes a agravos de notificação compulsória, que são menos prevalentes.", feedbackErrada: "A Ficha D serve para registrar diversas notificações, não apenas as de agravos de notificação compulsória." }
    ],
    correct: "D",
    referencia: "Ministério da Saúde - Manual do Sistema de Informação da Atenção Básica (SIAB)"
  },
  {
    id: 104,
    year: 2012,
    area: "Ginecologia/Obstetrícia",
    enunciado: `Uma paciente de 24 anos, primigesta, com idade gestacional de 41 semanas e 6 dias, é internada para avaliação. Ao exame pélvico, observou-se colo uterino de consistência amolecida, posterior, apagado 30%, orifício externo fechado, apresentação alta e móvel. Foi submetida à cardiotocografia, cuja imagem é reproduzida abaixo.\n\n(Imagem de cardiotocografia com padrão não tranquilizador)\n\nQual a conduta que deve ser proposta para essa paciente?`,
    options: [
      { id: "A", text: "Cesariana devido ao padrão não tranquilizador da cardiotocografia.", feedbackCorreta: "Correto. A cardiotocografia com padrão não tranquilizador (desacelerações tardias), associada a uma gestação pós-termo com colo desfavorável, indica sofrimento fetal, sendo a cesariana de urgência a conduta mais segura." },
      { id: "B", text: "Amolecimento cervical com misoprostol.", feedbackErrada: "A indução com misoprostol é inadequada na presença de sofrimento fetal." },
      { id: "C", text: "Indução eletiva do parto com ocitocina.", feedbackErrada: "A indução com ocitocina com colo desfavorável e sofrimento fetal é contraindicada." },
      { id: "D", text: "Descolamento da bolsa amniótica.", feedbackErrada: "Procedimentos para indução do parto não são indicados diante de um padrão cardiotocográfico não tranquilizador." },
      { id: "E", text: "Dilatação cervical com aminotomia.", feedbackErrada: "Procedimentos para indução do parto não são indicados diante de um padrão cardiotocográfico não tranquilizador." }
    ],
    correct: "B",
    referencia: "FEBRASGO - Protocolos de Obstetrícia"
  },
  {
    id: 105,
    year: 2012,
    area: "Clínica Médica/Infectologia",
    enunciado: `Um homem de 45 anos de idade, previamente hígido, comparece à unidade básica de saúde queixando-se de dor, edema e vermelhidão (eritema) surgidos há dois dias, inicialmente no pé e estendendo-se rapidamente para toda a extensão da perna, com aumento de intensidade da dor. Relata também febre alta, calafrios e náuseas, e adinamia e mal-estar. Ao exame físico: paciente obeso, com membro inferior direito apresentando edema desde o pé até próximo ao joelho, hiperemia brilhante, pele com aspecto de casca de laranja, calor intenso, hiperalgesia e linfangite. Foi internado para iniciar antibioticoterapia parenteral.\n\nQual o antimicrobiano de escolha para ser prescrito para esse paciente?`,
    options: [
      { id: "A", text: "Gentamicina.", feedbackErrada: "A gentamicina não tem boa cobertura para os agentes mais comuns (Streptococcus, Staphylococcus)." },
      { id: "B", text: "Penicilina.", feedbackCorreta: "Correto. O quadro clínico é clássico de erisipela, uma infecção cujo principal agente é o Streptococcus pyogenes. A penicilina é o antibiótico de primeira escolha para o tratamento." },
      { id: "C", text: "Oxacilina.", feedbackErrada: "A oxacilina é uma opção se houver suspeita de Staphylococcus aureus, mas a penicilina é a escolha para o agente mais provável, o Streptococcus." },
      { id: "D", text: "Vancomicina.", feedbackErrada: "A vancomicina é reservada para casos de suspeita de MRSA ou alergia grave a penicilinas." },
      { id: "E", text: "Ticarcilina.", feedbackErrada: "A ticarcilina tem espectro muito amplo e não é indicada como primeira linha." }
    ],
    correct: "C",
    referencia: "Harrison's Principles of Internal Medicine"
  },
  {
    id: 106,
    year: 2012,
    area: "Clínica Médica/Gastroenterologia",
    enunciado: `Um homem de 40 anos de idade apresentou úlcera duodenal com biópsia positiva para Helicobacter pylori. Fez tratamento durante 7 dias com omeprazol, amoxicilina e claritromicina, em dose padrão. Endoscopia de controle repetida após oito semanas de tratamento revela persistência de H. pylori na biópsia.\n\nQual a conduta mais adequada para o tratamento desse paciente?`,
    options: [
      { id: "A", text: "Omeprazol, amoxicilina e furazolidona por 10 dias.", feedbackErrada: "A furazolidona é uma opção, mas o esquema com levofloxacina é mais estabelecido como segunda linha." },
      { id: "B", text: "Omeprazol, levofloxacina e amoxicilina por 10 dias.", feedbackCorreta: "Correto. Após falha do esquema tríplice padrão com claritromicina, a principal causa é a resistência a este antibiótico. A terapia de resgate com um esquema à base de levofloxacina é uma das principais recomendações." },
      { id: "C", text: "Pantoprazol, amoxicilina e claritromicina por 14 dias.", feedbackErrada: "Repetir o mesmo esquema, mesmo que por mais tempo, tem baixa taxa de erradicação devido à provável resistência à claritromicina." },
      { id: "D", text: "Pantoprazol, sais de bismuto, furazolidona e claritromicina por 10 dias.", feedbackErrada: "Manter a claritromicina em um esquema de segunda linha é inadequado." },
      { id: "E", text: "Pantoprazol, sais de bismuto, levofloxacina e claritromicina por 14 dias.", feedbackErrada: "Manter a claritromicina em um esquema de segunda linha é inadequado." }
    ],
    correct: "B",
    referencia: "Consenso Brasileiro sobre Helicobacter pylori"
  },
  {
    id: 107,
    year: 2012,
    area: "Pediatria/Infectologia",
    enunciado: `Um recém-nascido de 20 dias de vida é encaminhado para consulta com história de icterícia e baixo peso. A genitora não fez pré-natal. O RN nasceu prematuro e pequeno para a idade gestacional. Ao exame: ictérico, peso < p3, microcefalia e hepatoesplenomegalia. Exames: plaquetopenia, TGP/TGO elevadas, BT=18 com BD=8. Sorologia para CMV: IgM e IgG positivos.\n\nQual das assertivas abaixo mais contribui com a elucidação diagnóstica da infecção congênita pelo CMV?`,
    options: [
      { id: "A", text: "A pesquisa do CMV na urina e/ou saliva será útil para o diagnóstico da infecção congênita apenas após 2 meses.", feedbackErrada: "A pesquisa viral na urina/saliva é o principal método diagnóstico e deve ser feito nas primeiras 3 semanas de vida." },
      { id: "B", text: "Caso a confirmação diagnóstica não ocorra até a terceira semana de vida, não será possível ser estabelecida.", feedbackCorreta: "Correto. A detecção do CMV na urina ou saliva deve ser realizada nas primeiras 3 semanas de vida para diferenciar a infecção congênita da perinatal ou pós-natal." },
      { id: "C", text: "A sorologia IgM e IgG para CVM tem papel limitado no diagnóstico da infecção congênita, devido à baixa especificidade.", feedbackErrada: "A sorologia é útil, mas a detecção viral direta na urina/saliva é o padrão-ouro." },
      { id: "D", text: "A microcefalia, o crescimento intrauterino restrito e a prematuridade são altamente específicos para o diagnóstico de infecção por CMV.", feedbackErrada: "Esses achados são clássicos da síndrome de TORCH e não são específicos para CMV." },
      { id: "E", text: "Uma tomografia computadorizada revelando calcificações difusas pelo córtex sugeriria fortemente o diagnóstico de infecção por CMV em detrimento das outras infecções congênitas.", feedbackErrada: "As calcificações periventriculares são a alteração de imagem mais característica do CMV congênito." }
    ],
    correct: "C",
    referencia: "Sociedade Brasileira de Pediatria - Tratado de Pediatria"
  },
  {
    id: 108,
    year: 2012,
    area: "Saúde Coletiva",
    enunciado: `A Lei n.º 8.080, de 19 de setembro de 1990 dispõe sobre as condições para a promoção, proteção e recuperação da saúde e a organização e o funcionamento dos serviços correspondentes. No Capítulo III, prevê as Comissões Intersetoriais, criadas com a finalidade de`,
    options: [
      { id: "A", text: "articulação de políticas e programas de saúde, cuja execução envolva áreas não compreendidas no Sistema Único de Saúde (SUS).", feedbackCorreta: "Correto. Conforme o Art. 12 da Lei 8.080/90, as comissões intersetoriais têm a finalidade de articular políticas e programas de interesse para a saúde, cuja execução envolva áreas não compreendidas no âmbito do SUS." },
      { id: "B", text: "negociação e pactuação entre gestores quanto a aspectos operacionais, financeiros e administrativos da gestão compartilhada do SUS.", feedbackErrada: "Essa é a função das Comissões Intergestores (Bipartite e Tripartite)." },
      { id: "C", text: "representação dos entes estaduais e municipais incumbidos para tratar de matérias referentes à saúde.", feedbackErrada: "Essa é a função das Comissões Intergestores." },
      { id: "D", text: "desenvolvimento permanente de ações conjuntas entre municípios e os serviços que lhes correspondam.", feedbackErrada: "Isso é operacionalizado por meio de instâncias como as Comissões Intergestores Regionais (CIR)." },
      { id: "E", text: "integração de recursos técnicos e práticas voltadas para a cobertura total das ações de saúde.", feedbackErrada: "Este é um objetivo geral do SUS, não a função específica das Comissões Intersetoriais." }
    ],
    correct: "A",
    referencia: "Lei nº 8.080 de 19 de setembro de 1990."
  },
  {
    id: 109,
    year: 2012,
    area: "Clínica Cirúrgica/Gastroenterologia",
    enunciado: `Um homem de 50 anos com colecistite aguda (Murphy +, febre, leucocitose) é submetido a colecistectomia laparoscópica, sem colangiografia. No segundo dia de pós-operatório, evolui com icterícia e elevação de bilirrubinas, mas sem febre ou sinais de peritonismo.\n\nO diagnóstico mais provável é`,
    options: [
      { id: "A", text: "colangite bacteriana aguda.", feedbackErrada: "A colangite cursa tipicamente com febre e calafrios (Tríade de Charcot), ausentes no caso." },
      { id: "B", text: "coledocolitíase.", feedbackCorreta: "Correto. A coledocolitíase residual (cálculo retido no colédoco) é a causa mais comum de icterícia obstrutiva no pós-operatório de colecistectomia, especialmente quando não foi realizada colangiografia." },
      { id: "C", text: "fístula de coto de ducto cístico.", feedbackErrada: "A fístula do coto cístico geralmente leva a um bilioma ou peritonite biliar, não a icterícia isolada." },
      { id: "D", text: "ligadura inadvertida do ducto hepático direito.", feedbackErrada: "A lesão iatrogênica da via biliar é uma complicação grave, mas menos frequente que a coledocolitíase residual." },
      { id: "E", text: "lesão iatrogênica do ducto comum.", feedbackErrada: "A lesão iatrogênica da via biliar é uma complicação grave, mas menos frequente que a coledocolitíase residual." }
    ],
    correct: "B",
    referencia: "Sabiston Textbook of Surgery"
  },
  {
    id: 110,
    year: 2012,
    area: "Ginecologia/Obstetrícia",
    enunciado: `Primigesta de 25 anos de idade procura a Maternidade pelo início do trabalho de parto às 13 horas e sua evolução está registrada no partograma abaixo.\n\n(Imagem de um partograma mostrando parada de progressão da dilatação e da descida, com surgimento de desacelerações tardias - DIP II)\n\nQual o diagnóstico desse caso e a conduta obstétrica mais apropriada?`,
    options: [
      { id: "A", text: "Parto pélvico prolongado; fórcipe para distocia de rotação.", feedbackErrada: "Não há dados para afirmar que a apresentação é pélvica. Fórcipe é arriscado com sofrimento fetal." },
      { id: "B", text: "Parada de dilatação no período expulsivo; fórcipe para abreviar o período expulsivo.", feedbackErrada: "A paciente não está no período expulsivo (dilatação não está completa)." },
      { id: "C", text: "Parada secundária da descida; operação cesariana por desproporção cefalopélvica.", feedbackCorreta: "Correto. O partograma evidencia uma parada de progressão do parto (distocia), e o surgimento de desacelerações tardias (DIP II) indica sofrimento fetal. A associação de distocia com sofrimento fetal é uma indicação clássica de cesariana." },
      { id: "D", text: "Fase ativa prolongada; administração de ocitocina para aumentar as metrossístoles.", feedbackErrada: "A ocitocina é contraindicada na presença de sofrimento fetal (DIP II)." },
      { id: "E", text: "Parada secundária da dilatação; orientação para a paciente ficar em decúbito lateral esquerdo para coordenar as metrossístoles.", feedbackErrada: "Medidas conservadoras são insuficientes diante de um quadro de distocia estabelecida com sofrimento fetal agudo." }
    ],
    correct: "A",
    referencia: "Zugaib Obstetrícia"
  }
];

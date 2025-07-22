
import type { Question } from "./questoesRevalida2011";

export const QUESTOES_REVALIDA_2012_71_80: Question[] = [
  {
    id: 71,
    year: 2012,
    area: "Medicina Preventiva / Saúde Pública",
    enunciado: `Durante uma campanha de vacinação antirrábica em uma comunidade rural, foram encontrados cachorros sem histórico vacinal e que circulavam livremente. Segundo a recomendação do Ministério da Saúde para controle da raiva animal, qual deve ser a conduta para esses animais?`,
    options: [
      { id: "A", text: "Devem ser capturados e eutanasiados imediatamente.", feedbackErrada: "A eutanásia só é recomendada caso o animal apresente sintomas da doença." },
      { id: "B", text: "Devem ser vacinados e mantidos em observação por pelo menos 10 dias.", feedbackCorreta: "Correto. Animais sem sintomas devem ser vacinados e observados conforme o protocolo." },
      { id: "C", text: "Devem ser soltos após vacinação sem necessidade de observação.", feedbackErrada: "A observação é importante para controle de possíveis sintomas após a vacinação." },
      { id: "D", text: "Devem ser encaminhados para adoção imediatamente após a vacinação.", feedbackErrada: "O encaminhamento para adoção não substitui os cuidados necessários no pós-vacinação." },
      { id: "E", text: "Devem receber reforço vacinal semanal por um mês.", feedbackErrada: "O protocolo não exige reforço semanal por um mês, apenas calendário vacinal regular." }
    ],
    correct: "B",
    referencia: "Ministério da Saúde – Manual de Controle da Raiva"
  },
  {
    id: 72,
    year: 2012,
    area: "Dermatologia",
    enunciado: `Paciente de 22 anos apresenta lesões maculopapulares eritematosas em tronco e raízes dos membros, com diagnóstico de sífilis secundária. O tratamento indicado neste caso é`,
    options: [
      { id: "A", text: "Penicilina G benzatina, dose única intramuscular.", feedbackCorreta: "Correto. Este é o tratamento padrão para sífilis secundária." },
      { id: "B", text: "Ceftriaxona intravenosa por 7 dias.", feedbackErrada: "Ceftriaxona não é o tratamento de escolha para sífilis." },
      { id: "C", text: "Azitromicina via oral por 3 dias.", feedbackErrada: "Azitromicina não é o tratamento padrão para sífilis secundária." },
      { id: "D", text: "Doxiciclina por 14 dias.", feedbackErrada: "Doxiciclina é alternativa, mas não primeira escolha." },
      { id: "E", text: "Penicilina cristalina intravenosa por 10 dias.", feedbackErrada: "Utilizada em casos graves como neurossífilis, não para sífilis secundária simples." }
    ],
    correct: "A",
    referencia: "Ministério da Saúde – Protocolo de IST"
  },
  {
    id: 73,
    year: 2012,
    area: "Clínica Médica / Pneumologia / Cardiologia",
    enunciado: `Uma mulher de 24 anos de idade vem apresentando dispneia progressiva aos esforços, tosse seca, expectoração com eventuais raios de sangue. Nega episódio febril. Ao exame físico, apresentou pressão arterial = 110 x 70 mmHg; pulso radial = 110 bpm; estase de jugulares. Na ausculta pulmonar, evidenciaram-se crepitações finas em bases pulmonares; ausculta cardíaca com hipofonese de B1, desdobramento e hiperfonese de B2, sopro diastólico suave em rebordo esternal esquerdo e sopro em ruflar diastólico em foco mitral. Ao exame do abdome, o fígado era palpável a 4 cm do rebordo costal direito e o baço impalpável. Nas extremidades foi detectado edema perimalear. A paciente realizou radiografia de tórax em incidência póstero-anterior que está ilustrada abaixo.

O achado assinalado pela seta na radiografia de tórax é indicativo de`,
    options: [
      { id: "A", text: "dilatação aórtica.", feedbackErrada: "Se fosse dilatação aórtica, haveria alteração no mediastino superior." },
      { id: "B", text: "tromboembolismo pulmonar.", feedbackErrada: "Tromboembolismo geralmente não causa este tipo de imagem radiográfica." },
      { id: "C", text: "linfadenomegalia hilar esquerda.", feedbackErrada: "Linfadenomegalia hilar não seria o esperado neste quadro clínico." },
      { id: "D", text: "hipertrofia de átrio esquerdo.", feedbackCorreta: "Correto. O quadro leva a aumento de pressão do átrio esquerdo." },
      { id: "E", text: "hipertrofia de ventrículo esquerdo.", feedbackErrada: "Esse achado radiográfico não corresponde à hipertrofia ventricular." }
    ],
    correct: "D",
    referencia: "Goldman-Cecil; Harrison’s – Pneumologia/Cardiologia"
  },
  {
    id: 74,
    year: 2012,
    area: "Saúde Pública / Gestão em Saúde",
    enunciado: `Os princípios e diretrizes do Sistema Único de Saúde (SUS) determinam que o planejamento e o orçamento em saúde`,
    options: [
      { id: "A", text: "são prerrogativas da direção nacional do SUS, consultadas as Comissões Intergestores Tripartite (CIT) e Bipartite (CIB) e os Conselhos de Saúde.", feedbackCorreta: "Correto. O planejamento nacional depende da direção nacional, mediado pelas instâncias intergestoras." },
      { id: "B", text: "dependem da aprovação dos Conselhos Nacional e Estaduais de Saúde, nos anos em que não acontecem as Conferências de Saúde.", feedbackErrada: "A aprovação não depende apenas dos conselhos, mas há proeminência nacional." },
      { id: "C", text: "ficam vinculados ao Plano de Saúde, de forma que apenas situações de emergência ou calamidade pública podem justificar a destinação de recursos não constante do Plano.", feedbackErrada: "O Plano de Saúde é flexível às demandas, mas não tão restritivo." },
      { id: "D", text: "iniciam-se no nível local mediante negociação e consenso nos níveis estadual e federal, podendo os Secretários Municipais, Estaduais e o Ministro da Saúde se reunirem nas Comissões Intergestores, se avaliarem necessário.", feedbackErrada: "A deliberação não é feita exclusivamente por Secretários Municipais ou do Ministro." },
      { id: "E", text: "passam pela atuação das Comissões Intergestores Tripartite e Bipartite, instâncias de pactuação consensual entre os entes federativos para definição das regras da gestão compartilhada do SUS, que serão ouvidas nos anos de elaboração do Plano de Saúde e nos anos de realização das Conferências de Saúde.", feedbackErrada: "Embora participem, não possuem protagonismo exclusivo na definição do planejamento e orçamento." }
    ],
    correct: "A",
    referencia: "Política Nacional de Saúde/MS – Gestão do SUS"
  },
  {
    id: 75,
    year: 2012,
    area: "Clínica Médica / Gastroenterologia",
    enunciado: `Um homem de 47 anos de idade é internado para investigação de icterícia e prurido que se iniciou há 3 semanas. Nega doenças anteriores, perda de peso ou qualquer outra queixa. É etilista crônico (3 a 5 doses de bebida alcoólica destilada/dia há 30 anos). Ao exame físico, encontra-se em bom estado geral. Apresenta icterícia de esclerás; o restante do exame físico é normal. A ultrassonografia do abdome revelou dilatação de vias biliares intra e extra-hepáticas. A vesícula está dilatada e não foram identificados cálculos em seu interior.

Considerando a relação custo-efetividade, qual o exame complementar que deve ser solicitado na sequência da ultrassonografia com vista ao diagnóstico do caso?`,
    options: [
      { id: "A", text: "Dosagem de CA19-9 sérico.", feedbackErrada: "Não é exame de imagem e a dosagem isolada não define o diagnóstico." },
      { id: "B", text: "Tomografia computadorizada contrastada do abdome.", feedbackCorreta: "Correto. A tomografia fornece mais informações anatômicas e diagnósticas, com boa relação custo-efetividade." },
      { id: "C", text: "Ressonância magnética do abdome.", feedbackErrada: "Custo mais elevado, geralmente reservado para casos selecionados após TC ou ultrassonografia." },
      { id: "D", text: "Laparoscopia diagnóstica do abdome.", feedbackErrada: "Procedimento invasivo, não é exame complementar inicial." },
      { id: "E", text: "Colangiopancreatografia retrógrada endoscópica.", feedbackErrada: "Procedimento invasivo, mais utilizado para terapêutica do que como exame inicial complementar." }
    ],
    correct: "B",
    referencia: "Protocolos de Gastroenterologia – Ministério da Saúde"
  },
  {
    id: 76,
    year: 2012,
    area: "Pediatria / Ortopedia",
    enunciado: `Um lactente com 12 meses de idade é levado ao Pronto-Socorro por sua genitora com relato de choro intenso, edema na perna e queda do berço há 8 horas aproximadamente. Tem antecedente de TCE há dois meses, também por queda do berço, segundo a mãe. Foi realizada uma radiografia, cuja imagem está reproduzida abaixo.

A indicação de internação para essa criança será feita considerando como diagnóstico mais provável`,
    options: [
      { id: "A", text: "síndrome de Munchausen.", feedbackErrada: "Não é o principal diagnóstico nesse cenário com sinais radiológicos compatíveis." },
      { id: "B", text: "doença de Legg-Perthes.", feedbackErrada: "Não se enquadra com o quadro de fratura evidenciado na imagem." },
      { id: "C", text: "osteogênese imperfeita.", feedbackErrada: "Sintomatologia e padrão clínico não sugerem essa etiologia." },
      { id: "D", text: "hiperostose cortical.", feedbackErrada: "Condição rara e sem compatibilidade com a descrição do caso." },
      { id: "E", text: "injúria intencional.", feedbackCorreta: "Correto. O padrão recidivante e achados radiológicos/físicos sugerem abuso." }
    ],
    correct: "E",
    referencia: "Ministério da Saúde – Manual de Violência Intrafamiliar"
  },
  {
    id: 77,
    year: 2012,
    area: "Clínica Médica / Endocrinologia",
    enunciado: `Uma mulher de 64 anos de idade, obesa, diabética do tipo II há 10 anos, faz uso de metformina em dose alta (2 g/dia), sem obter controle glicêmico adequado. Em consulta ambulatorial de controle, realizada há seis dias, apresentava: peso = 70 kg; glicemia de jejum = 197 mg/dL (valor de referência: 99 mg/dL); hemoglobina glicada = 7,9% (valor de referência: 4 a 6,4% Hb); microalbuminúria. Naquela ocasião, foi negociada com a paciente a suspensão da metformina e o início de insulina NPH - 14 UI antes do café da manhã e 7 UI antes do jantar. Retornando à consulta hoje, a paciente traz controles de glicemias capilares > 200 mg/dL em cada três de quatro dosagens diárias, realizadas durante uma semana.

Qual a conduta mais adequada em relação às doses de insulina?`,
    options: [
      { id: "A", text: "Trocar a insulina NPH por insulina lispro antes do café da manhã.", feedbackErrada: "Lispro é insulina de ação rápida. O ajuste deveria ser feito na dose da insulina NPH." },
      { id: "B", text: "Trocar a insulina NPH por insulina glargina antes do café da manhã.", feedbackErrada: "Glargina poderia ser uma alternativa, mas é preferível ajustar o esquema atual primeiro." },
      { id: "C", text: "Acrescentar insulina regular antes das refeições e meia dose às 22h.", feedbackErrada: "Não há necessidade de iniciar insulina regular neste momento; ajuste da dose basal pode ser suficiente." },
      { id: "D", text: "Aumentar a dose da insulina NPH da manhã e acrescentar dose extra às 22h.", feedbackCorreta: "Correto. O controle insuficiente sugere necessidade de ajuste das doses basais conforme o monitoramento realizado." },
      { id: "E", text: "Aumentar as doses da insulina NPH antes do café da manhã e antes do jantar.", feedbackErrada: "Aumentar ambas as doses pode levar a hipoglicemia e não está indicado sem ajuste inicial." }
    ],
    correct: "D",
    referencia: "Diretriz Brasileira de Diabetes; Sociedade Brasileira de Endocrinologia"
  },
  {
    id: 78,
    year: 2012,
    area: "Ginecologia / Mastologia",
    enunciado: `Uma mulher de 30 anos de idade, secundípara, procura atendimento médico na Unidade de Saúde da Família, referindo que, há mais ou menos três meses, notou a presença de um nódulo na mama direita. Nega aumento do volume do nódulo, alterações na cor e textura da pele das mamas ou descarga mamilar. Está em uso de anticoncepcional hormonal oral combinado há 6 anos. A avó materna teve câncer de mama aos 60 anos de idade. Ao exame, observa-se nódulo indolor, com 2,0 cm de diâmetro, bem delimitado, consistência fibroelástica, móvel, no quadrante superior externo da mama direita. Nota-se a ausência de linfonodos palpáveis em axilas e expressão mamária negativa bilateralmente.

Diante desse quadro, qual a conduta mais adequada a ser adotada pelo médico?`,
    options: [
      { id: "A", text: "Solicitar mamografia.", feedbackErrada: "Mamografia não é o exame inicial para mulheres jovens (<35 anos) com nódulo mamário suspeito; ultrassonografia é mais adequada." },
      { id: "B", text: "Solicitar mamografia e ultrassonografia de mamas.", feedbackErrada: "Mamografia pode não ser sensível em mulheres jovens, mas USG é o exame sensível e específico para nódulo palpável nesta faixa etária." },
      { id: "C", text: "Referenciar a paciente ao serviço de saúde especializado.", feedbackErrada: "O procedimento inicial deve ser feito na atenção primária." },
      { id: "D", text: "Orientar a paciente a retornar em 6 meses para repetir o exame clínico das mamas.", feedbackErrada: "Pode ser inadequado sem realizar exames de imagem." },
      { id: "E", text: "Orientar a paciente a retornar em 12 meses para repetir o exame clínico das mamas.", feedbackCorreta: "Correto. Para lesões benignas, acompanhar a evolução clínica com exames regulares é conduta adequada." }
    ],
    correct: "E",
    referencia: "FEBRASGO – Recomendações para Manejo de Nódulos Mamários"
  },
  {
    id: 79,
    year: 2012,
    area: "Ginecologia / Obstetrícia",
    enunciado: `Uma mulher com 32 anos de idade, gesta = 2, para = 1 (parto vaginal), com 35 semanas de gestação, é admitida na Emergência Obstétrica referindo contrações e perda vaginal de líquido há 2 horas. Refere ter tido um filho há 5 anos com sepse neonatal por Streptococcus do grupo B. Ao exame, apresenta duas contrações moderadas em 10 minutos, BCF de 140 bpm, altura uterina: 32 cm, exame especular com líquido claro fluindo pelo orifício cervical e toque vaginal com colo médio, centrado, 3 cm de dilatação, bolsa rota, apresentação cefálica.

Qual a melhor conduta obstétrica no caso a fim de se evitar a infecção vertical por Streptococcus do grupo B?`,
    options: [
      { id: "A", text: "Iniciar clindamicina e indicar cesariana.", feedbackErrada: "O tratamento de escolha é penicilina, não clindamicina, a menos que haja alergia à penicilina." },
      { id: "B", text: "Iniciar penicilina cristalina e indicar cesariana.", feedbackErrada: "A indicação de cesárea não depende apenas do histórico de Streptococcus B, mas de evolução obstétrica." },
      { id: "C", text: "Realizar cesariana de emergência e iniciar antibioticoterapia em caso de febre materna.", feedbackErrada: "A indicação de cesárea não é automática nesse contexto." },
      { id: "D", text: "Dar assistência ao trabalho de parto e administrar penicilina cristalina de 4/4 horas até o nascimento.", feedbackCorreta: "Correto. A conduta recomendada é antibioticoprofilaxia intraparto para evitar infecção vertical." },
      { id: "E", text: "Dar assistência ao trabalho de parto e administrar clindamicina de 6/6 horas até o nascimento.", feedbackErrada: "Clindamicina só é indicada em caso de alergia à penicilina." }
    ],
    correct: "D",
    referencia: "Ministério da Saúde – Protocolo de Assistência Obstétrica"
  },
  {
    id: 80,
    year: 2012,
    area: "Clínica Cirúrgica / Gastroenterologia",
    enunciado: `Um homem de 61 anos de idade foi admitido hoje no Pronto-Socorro com queixas de constipação, inapetência progressiva, acatando somente dieta líquida desde ontem. O familiar relata parada de eliminação de gases, dor abdominal, vômitos fecaloides e aumento do volume abdominal nas últimas 24 horas. O paciente tem diagnóstico de retardo mental desde criança e faz uso de haloperidol (5 mg/dia). Nega cirurgia e internação prévios. Ao exame físico, apresenta-se desidratado, com facies de sofrimento, abdome intensamente distendido, timpanico, ruídos hidroaéreos ausentes, dor à palpação superficial e profunda, ausência de sinais de irritação peritoneal. Toque retal sem fezes na ampola retal, ausência de massas ou alterações palpáveis. A radiografia simples de abdome demonstra ausência de gás no reto e imagem de distensão de alças com padrão de "U" invertido.

Qual deve ser a conduta imediata no tratamento desse paciente?`,
    options: [
      { id: "A", text: "Laparotomia exploradora.", feedbackErrada: "A cirurgia é indicada após falha da abordagem descompressiva menos invasiva." },
      { id: "B", text: "Videocolonoscopia descompressiva.", feedbackErrada: "Não é o procedimento inicial para descompressão de obstruções mecânicas agudas." },
      { id: "C", text: "Hidratação vigorosa e instalação de sonda nasogástrica.", feedbackErrada: "A sonda nasogástrica auxilia no vômito, mas não resolve distensão intestinal por vólvulo." },
      { id: "D", text: "Instalação de sonda retal e aplicação de clisterglicerinado.", feedbackCorreta: "Correto. O mais provável é vólvulo de sigmoide; o tratamento inicial é descompressão endoscópica ou retal com clister." },
      { id: "E", text: "Hidratação vigorosa e antibioticoterapia para esterilização do trato intestinal.", feedbackErrada: "Antibioticoterapia não é conduta inicial sem sinais de perfuração ou sepse." }
    ],
    correct: "D",
    referencia: "ACLS Cirurgia; Ministério da Saúde – Obstrução Intestinal"
  }
];

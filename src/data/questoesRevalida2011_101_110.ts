
import { Question } from "./questoesRevalida2011";

export const QUESTOES_REVALIDA_2011_101_110: Question[] = [
  {
    id: 101,
    year: 2011,
    area: "Pediatria",
    enunciado: `Criança do sexo masculino, com quatro anos de idade, é atendida na Unidade Básica de Saúde com história de febre há três dias, cansaço, tosse seca frequente, às vezes seguida de vômitos, astenia, anorexia e dor abdominal. Há dez dias apresentou "resfriado febril" com duração de cinco dias, tendo usado Ampicilina por dois dias. No momento o estado geral é regular, apresenta dispneia leve, palidez e hipoatividade. A ausculta pulmonar revela diminuição do murmúrio vesicular em terço inferior de hemitórax dorsal direito. Peso e estatura adequados para a idade. Não informa doenças anteriores. Tem mais dois irmãos saudáveis. Está em uso de salbutamol, de 6/6 horas, há três dias.
A conduta apropriada para a criança é`,
    options: [
      { id: "A", text: "apenas sintomático e manter o salbutamol." },
      { id: "B", text: "internação e uso de penicilina endovenosa." },
      { id: "C", text: "ampicilina via oral, em doses e intervalos adequados." },
      { id: "D", text: "amoxicilina, via oral, em doses e intervalos adequados." },
      { id: "E", text: "investigar imunodeficiência." }
    ],
    correct: "B",
    referencia: "Ministério da Saúde. Manual de Normas e Procedimentos para Vacinação."
  },
  {
    id: 102,
    year: 2011,
    area: "Clínica Médica",
    enunciado: `Em relação à osteoporose, é correto afirmar que`,
    options: [
      { id: "A", text: "são considerados fatores de risco de osteoporose não modificáveis: idade, pequena estrutura corporal, origem étnica, história familiar de osteoporose." },
      { id: "B", text: "são considerados fatores de risco de osteoporose modificáveis: tabagismo, consumo excessivo de álcool, terapia de reposição hormonal estrogênica." },
      { id: "C", text: "nas mulheres com antecedentes familiares de osteoporose, a avaliação diagnóstica da densidade mineral óssea deve ser recomendada a partir de 40 anos." },
      { id: "D", text: "o uso de reposição de cálcio e vitamina D aliada ao uso de bifosfonatos deve ser considerado apenas nos casos de ocorrência de fraturas prévias." },
      { id: "E", text: "os efeitos de depleção óssea, induzidos pelo uso prolongado de corticóides, no hipotireoidismo e na doença renal crônica podem ser evitados pela ingesta complementar de cálcio." }
    ],
    correct: "A",
    referencia: "Sociedade Brasileira de Reumatologia. Diretrizes para Diagnóstico e Tratamento da Osteoporose em Adultos, 2012."
  },
  {
    id: 103,
    year: 2011,
    area: "Cirurgia/Endocrinologia",
    enunciado: `Paciente, com 55 anos de idade, procurou consultório médico referindo o aparecimento de nódulo na região cervical à direita. O exame físico constatou que o paciente apresentava nódulo tireoideano à direita, de aproximadamente 6 cm. A ultrassonografia revelou nódulo isoecogênico, de 6 cm, no lobo inferior de tireoide. O estudo citológico, realizado em material colhido por punção aspirativa de agulha fina, foi sugestivo de carcinoma papilífero. O paciente foi então submetido a tireoidectomia, sem registro de intercorrências no ato operatório. No pós-operatório imediato o paciente passou a apresentar rouquidão e a laringoscopia realizada revelou paralisia de prega vocal à direita.
Mediante o quadro clínico e considerando a anatomia cirúrgica, qual a causa prevalente de rouquidão nesses casos?`,
    options: [
      { id: "A", text: "Lesão do ramo tireoideo do gânglio simpático cervical durante o ato cirúrgico." },
      { id: "B", text: "Lesão da alça cervical do nervo parassimpático cervical durante o ato cirúrgico." },
      { id: "C", text: "Lesão do ramo inferior do nervo laríngeo superior durante o ato cirúrgico." },
      { id: "D", text: "Lesão do nervo laríngeo superior durante o ato cirúrgico." },
      { id: "E", text: "Lesão do nervo laríngeo recorrente durante o ato cirúrgico." }
    ],
    correct: "E",
    referencia: "Harrison. Medicina Interna, 18ª ed."
  },
  {
    id: 104,
    year: 2011,
    area: "Ginecologia/Obstetrícia",
    enunciado: `Gestante, primigesta, 18 anos de idade, com dezessete semanas de gestação, traz cartão de vacinação para a consulta de pré-natal, mostrando esquema vacinal completo para tétano aos 10 anos de idade.
Em relação à recomendação do esquema vacinal da dupla adulto (difteria e tétano), durante a gravidez, qual a conduta correta para essa gestante?`,
    options: [
      { id: "A", text: "Repetir esquema vacinal completo, composto por três doses." },
      { id: "B", text: "Repetir esquema vacinal modificado, composto por duas doses." },
      { id: "C", text: "Aplicar dose de reforço, pois o esquema vacinal completo foi realizado há mais de cinco anos." },
      { id: "D", text: "Não aplicar dose de reforço, já que o esquema vacinal completo foi realizado há menos de dez anos." },
      { id: "E", text: "Não realizar vacinação, pois a vacina dupla adulto não faz parte dos cuidados da assistência pré-natal." }
    ],
    correct: "C",
    referencia: "Ministério da Saúde. Manual de Vacinação da Gestante."
  },
  {
    id: 105,
    year: 2011,
    area: "Ginecologia/Obstetrícia/Bioética",
    enunciado: `Para a resolução da questão a seguir, primeiro leia o caso clínico, depois analise as assertivas relacionadas a ele e, em seguida, marque a alternativa correta.

Caso:
Gestante, com 18 anos de idade, primigesta, gestação com 39 semanas e 6 dias, foi admitida no Setor de Emergência Obstétrica apresentando convulsões tônico-clônicas generalizadas. Ao exame físico: Pressão arterial=180 x 120mmHg, BCF=65 bpm; hipertonia uterina franca, toque vaginal: colo uterino fechado, grosso e posterior. Após administração endovenosa de sulfato de magnésio e controle da crise convulsiva, a paciente foi encaminhada ao Centro Obstétrico para resolução por via alta, com as hipóteses diagnósticas de eclâmpsia, descolamento prematuro de placenta e sofrimento fetal agudo. O parto cesáreo ocorreu de forma rápida, através de incisão mediana, após anestesia geral. Não havia acompanhantes da gestante na sala de parto. O recém-nascido nasceu com peso de 3.850g, medindo 50cm, pálido, hipotônico, não responsivo, sem choro. Foi imediatamente atendido pelo pediatra que identificou ausência de batimentos cardíacos e procedeu às manobras de ressuscitação neonatal, sem sucesso. Após o nascimento, confirmou-se o descolamento extenso da placenta, com grande quantidade de sangue e coágulos retroplacentários. Na evolução do parto operatório, não houve contração do útero, e após exaustivas manobras e medicamentos uterotônicos, não houve controle da hemorragia uterina profusa, que levou a equipe médica a realizar histerectomia puerperal. A hemorragia foi então controlada e a intervenção concluída sem outras intercorrências. Todo o suporte de vida necessário durante o trans e o pós-operatório foi disponibilizado. A parturiente foi encaminhada à Unidade de Terapia Intensiva (UTI), em estado grave, sob ventilação mecânica e apresentando quadro de coagulação intravascular disseminada. Após dez dias, obteve alta da UTI e foi encaminhada para a enfermaria obstétrica, ainda com estado geral comprometido e, pela primeira vez, consciente após o parto. Chegando à enfermaria, perguntou pelo recém-nascido.

Assertivas:
I. A melhor conduta neste caso, em relação ao óbito do recém-nascido, seria não informar a mãe neste momento, dizendo apenas que o recém-nato estaria em estado grave na UTI-neonatal.
II. A responsabilidade de assinar o atestado de óbito do recém-nato é do obstetra.
III. A equipe médica deveria ter consultado a família da parturiente antes da decisão de realizar a histerectomia puerperal, tendo em vista a idade da paciente, o fato de ser primigesta, além da morte do recém-nato.
IV. A julgar pelo relato do caso, existem evidências de imperícia e imprudência, mas não de negligência por parte da equipe médica.
V. Não houve, a julgar pelo relato do caso, evidências de negligência, imperícia ou imprudência por parte da equipe médica.

Estão de acordo com os preceitos éticos da assistência médica APENAS as afirmações:`,
    options: [
      { id: "A", text: "I e II." },
      { id: "B", text: "II e V." },
      { id: "C", text: "III e IV." },
      { id: "D", text: "I e V." },
      { id: "E", text: "III e V." }
    ],
    correct: "B",
    referencia: "Conselho Federal de Medicina. Código de Ética Médica."
  },
  {
    id: 106,
    year: 2011,
    area: "Saúde Coletiva/Epidemiologia",
    enunciado: `Considere que, em uma cidade de dois milhões de habitantes, houve 400 casos de gripe pelo vírus H1N1, no ano de 2009. Oito pessoas faleceram. O cálculo do coeficiente de letalidade das infecções pelo vírus H1N1 nessa cidade resulta em que valor?`,
    options: [
      { id: "A", text: "0,000004" },
      { id: "B", text: "0,0002" },
      { id: "C", text: "0,02" },
      { id: "D", text: "0,04" },
      { id: "E", text: "0,2" }
    ],
    correct: "C",
    referencia: "Medronho, R.A. Epidemiologia."
  },
  {
    id: 107,
    year: 2011,
    area: "Saúde Coletiva",
    enunciado: `Considere uma comunidade rural, onde um número aparentemente elevado de neonatos com má formação congênita é atribuído pelas mães agricultoras aos agrotóxicos utilizados na lavoura. Ao realizar um estudo de coorte retrospectivo dos nascimentos ocorridos na cidade nos últimos três anos, foi encontrado um risco relativo igual a 1,5, com um intervalo de confiança de 95%, entre 1,02 e 2,57. Qual a interpretação desse estudo?`,
    options: [
      { id: "A", text: "Mães agricultoras têm risco 50% maior de conceber filhos com má formação congênita em relação a mães não-agricultoras." },
      { id: "B", text: "Mães agricultoras têm risco 95% maior de conceber filhos com má formação congênita em relação a mães não-agricultoras." },
      { id: "C", text: "Mães agricultoras têm risco 102% maior de conceber filhos com má formação congênita em relação a mães não-agricultoras." },
      { id: "D", text: "Mães agricultoras têm risco 150% maior de conceber filhos com má formação congênita em relação a mães não-agricultoras." },
      { id: "E", text: "Mães agricultoras têm risco 257% maior de conceber filhos com má formação congênita em relação a mães não-agricultoras." }
    ],
    correct: "A",
    referencia: "Medronho, R.A. Epidemiologia."
  },
  {
    id: 108,
    year: 2011,
    area: "Pediatria/Clínica Médica",
    enunciado: `Criança, com 5 anos de idade, mora com os pais em bairro de periferia. Seu pai é fumante, há três meses apresenta tosse crônica, produtiva, sudorese noturna e febre diária e não procura cuidados médicos. Sua mãe é aparentemente saudável. Há três semanas, a criança iniciou tosse produtiva com escarro purulento, febre ao final da tarde e emagrecimento. O cartão de vacinas demonstra que ele foi vacinado com BCG ID no primeiro ano de vida. No atendimento é constatada temperatura oral de 37,5°C, taquipneia e redução de murmúrio vesicular em terço médio do hemitórax direito. O exame radiológico do tórax mostra condensação homogênea em ápice de pulmão direito. O PPD é de 10 mm.
Qual a conduta terapêutica para essa criança?`,
    options: [
      { id: "A", text: "quimioprofilaxia primária." },
      { id: "B", text: "quimioprofilaxia secundária e controle com exames a cada 2 meses." },
      { id: "C", text: "revacinar com BCG e controle com exames a cada 2 meses." },
      { id: "D", text: "esquema triplice (2HRZ) e duplo (4HR) e controle com exames a cada 2 meses." },
      { id: "E", text: "esquema quádruplo (2HRZE) e duplo (5HR) e controle com exames a cada 2 meses." }
    ],
    correct: "E",
    referencia: "SBPT. I Consenso Brasileiro em Tuberculose Pediátrica, 2010."
  },
  {
    id: 109,
    year: 2011,
    area: "Clínica Médica/Emergências",
    enunciado: `No atendimento de Pronto-Socorro é admitido um jovem de 19 anos, de origem indígena, que narra ter sido vítima de uma picada de cobra na mão direita, há aproximadamente 30 minutos, relatando dor local. Você constata edema e equimose local. Outros habitantes da aldeia onde reside o rapaz trouxeram a cobra sem vida ao hospital na esperança de que isso pudesse ajudar na identificação da espécie da cobra que o havia picado. À observação, nota-se que a cobra tem fosseta loreal e cauda lisa.
Considerando o quadro clínico, as características da cobra e a epidemiologia brasileira dos envenenamentos por animais peçonhentos, que tipo de soro antiodídico deverá ser administrado?`,
    options: [
      { id: "A", text: "Soro antiofídico." },
      { id: "B", text: "Soro anticrotálico." },
      { id: "C", text: "Soro antibotrópico." },
      { id: "D", text: "Soro antialiquético." },
      { id: "E", text: "Soro antielapídico." }
    ],
    correct: "C",
    referencia: "Fundação Oswaldo Cruz. Manual de Diagnóstico e Tratamento de Acidentes por Animais Peçonhentos."
  },
  {
    id: 110,
    year: 2011,
    area: "Saúde Coletiva/Epidemiologia",
    enunciado: `Foi realizado estudo epidemiológico, durante período de 10 anos, entre indivíduos usuários de uma determinada droga, alguns a usavam por via inalatória, outros, por via intravenosa. O objetivo do estudo foi o de averiguar se a via de administração da droga poderia estar relacionada com maior mortalidade em um dos grupos.

Os dados disponíveis do estudo são:
             Óbito   Não-óbito
Injetável    400      4600
Inalatória   80       1920

Qual o risco relativo de morte ao se usar a droga na forma injetável em relação à forma inalatória?`,
    options: [
      { id: "A", text: "1." },
      { id: "B", text: "2." },
      { id: "C", text: "3." },
      { id: "D", text: "4." },
      { id: "E", text: "5." }
    ],
    correct: "B",
    referencia: "Medronho, R.A. Epidemiologia."
  },
];

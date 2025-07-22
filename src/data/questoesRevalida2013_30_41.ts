
import { Question } from "./questoesRevalida2011";

// Questões 30 a 41 do Revalida 2013 (transcrição oficial das imagens enviadas)
export const QUESTOES_REVALIDA_2013_30_41: Question[] = [
  {
    id: 30,
    year: 2013,
    area: "Pediatria/Imunologia",
    enunciado: `Menina com 7 anos de idade foi levada para consulta em Unidade Básica de Saúde pela mãe. Apresenta queixa de ganho de peso excessivo nos últimos meses. Após a realização do exame físico, foram registrados os seguintes dados: Peso = 35 kg; Altura = 1,25 m; Pressão Arterial (membro superior direito) = 118x80 mmHg.

Após a análise das curvas de crescimento (peso, altura e índice de massa corporal – IMC) e da tabela de pressão arterial, é correto afirmar que os diagnósticos e a conduta inicial recomendada nessa situação são, respectivamente:`,
    options: [
      { id: "A", text: "obesidade grave e hipertensão; recomenda-se incentivar hábitos de vida saudáveis (atividade física regular e alimentação balanceada) e realizar tratamento farmacológico." },
      { id: "B", text: "sobrepeso e pressão arterial limítrofe; recomenda-se incentivar hábitos de vida saudáveis (atividade física regular, alimentação balanceada) e rastrear outras comorbidades." },
      { id: "C", text: "obesidade e hipertensão; recomenda-se seguir plano alimentar com dieta balanceada, atividade física regular e acompanhamento semanal com a equipe de saúde." },
      { id: "D", text: "sobrepeso e hipertensão; recomenda-se seguir plano alimentar com dieta balanceada, atividade física regular, bem como restrições de tempo na frente da televisão." },
      { id: "E", text: "obesidade e pressão arterial limítrofe; recomenda-se seguir plano alimentar com dieta balanceada, atividade física regular e rastrear outras comorbidades." }
    ],
    correct: "E"
  },
  {
    id: 31,
    year: 2013,
    area: "Ginecologia/Emergência",
    enunciado: `Mulher com 25 anos de idade deu entrada no Serviço de Emergência, prostrada, com vômitos. Ao exame físico observou-se hipotensão arterial, febre de 39ºC, defesa na fossa ilíaca direita, distensão e irritação peritoneal difusas. O exame ginecológico e o toque retal evidenciaram a presença de dor no fundo de saco posterior à mobilização do colo uterino. A punho percussão lombar era negativa, bilateralmente.

A melhor abordagem para o caso é:`,
    options: [
      { id: "A", text: "reposição volêmica; realização de hemograma; solicitação de tomografia computadorizada do abdome para excluir o diagnóstico de pelvi-peritonite." },
      { id: "B", text: "reposição volêmica; realização de hemograma; iniciar antibioticoterapia após coleta de sangue para hemocultura e indicar o tratamento cirúrgico." },
      { id: "C", text: "reposição volêmica; solicitação de exame de urina, de exames de rotina para abdome agudo; repetir a ultrassonografia e reavaliar periodicamente." },
      { id: "D", text: "solicitação de hemograma; realização de exame de urina e ultrassom para fazer o diagnóstico diferencial com ruptura de cisto ovariano." },
      { id: "E", text: "reposição volêmica; solicitação de radiografia do abdome inferior e reavaliar." },
    ],
    correct: "B"
  },
  {
    id: 32,
    year: 2013,
    area: "Pediatria/Alergia e Imunologia",
    enunciado: `Menino com 12 anos de idade comparece para consulta em Unidade Básica de Saúde acompanhado pela mãe. Tem história de asma brônquica. Há dois meses vem apresentando tosse noturna diária, incapacidade de jogar bola e crises de falta de ar pelo menos uma vez ao mês. No exame físico não apresenta alterações na ausculta pulmonar. Atualmente está sem medicação.

Qual o tratamento preconizado para esse paciente?`,
    options: [
      { id: "A", text: "Prescrever medicação de alívio, do tipo beta agonista de ação longa, e acompanhar o paciente semanalmente." },
      { id: "B", text: "Prescrever medicação de alívio, do tipo beta agonista de ação longa, e encaminhar para o pneumologista e fisioterapia." },
      { id: "C", text: "Orientar sobre cuidados ambientais e prescrever corticoide inalatório associado a beta agonista de ação longa por quatro semanas." },
      { id: "D", text: "Prescrever corticoide inalatório de uso contínuo e um beta agonista de ação curta, conforme necessidade de alívio dos sintomas." },
      { id: "E", text: "Prescrever corticoide inalatório associado a montelucaste diário por doze semanas e indicar fisioterapia respiratória." },
    ],
    correct: "D"
  },
  {
    id: 33,
    year: 2013,
    area: "Ginecologia/Pré-natal",
    enunciado: `Primigesta com 20 anos de idade, 18 semanas de gestação, assintomática, vem para mais uma consulta de pré-natal na Unidade Básica de Saúde trazendo resultado de sorologia para toxoplasmose = IgG reagente e IgM reagente. Desconhece história prévia de toxoplasmose.

A conduta imediata indicada nesta situação é:`,
    options: [
      { id: "A", text: "repetir sorologia para toxoplasmose no 3.º trimestre de gestação." },
      { id: "B", text: "realizar ultrassonografia obstétrica para avaliação fetal." },
      { id: "C", text: "solicitar exame de PCR no líquido amniótico." },
      { id: "D", text: "iniciar tratamento com espiramicina." },
      { id: "E", text: "solicitar teste de avidez da IgG." },
    ],
    correct: "E"
  },
  {
    id: 34,
    year: 2013,
    area: "Clínica Médica/Emergências",
    enunciado: `Mulher com 64 anos de idade, com antecedentes de hipertensão arterial há cerca de 20 anos e tabagista (30 maços-ano), em uso de enalapril - 20 mg de 12/12h, foi trazida à Emergência de um hospital terciário com quadro de dor lombar de forte intensidade e início súbito, sem irradiação, que foi acompanhada por síncope, sem pródromos, iniciada há duas horas. Na admissão hospitalar estava consciente, orientada, anictérica, com palidez cutâneo-mucosa. Temperatura axilar = 36 °C, pressão arterial = 70x45 mmHg, frequência cardíaca = 118 bpm, frequência respiratória = 18 irpm. Os exames do aparelho cardiovascular e pulmonar não demonstraram alterações. O abdome apresentava equimoses em ambos os flancos, e era levemente doloroso à palpação em mesogástrio e hipogástrio, com massa pulsátil em região do mesogástrio. Ruídos hidroaéreos presentes. Nos membros inferiores havia redução da temperatura discretamente e bilateralmente e redução da amplitude de todos os pulsos. Os exames laboratoriais iniciais revelaram: Leucócitos = 12.000/mm³ (segmentados = 74%, eosinófilos = 1%, linfócitos = 15%); Hemoglobina = 12,1 g/dL; Hematócrito = 36,3%; Plaquetas = 231.000/mm³; Glicemia = 84 mg/dL (VR = 80-100mg/dL); Ureia = 45 mg/dL. (VR = 20-35 mg/dL); Creatinina = 1,2 mg/dL (VR = 0,8-1,4 mg/dL); Amilase = 352 U/L (VR = 4-400 U/L); TGO = 26 U/L (VR < 35 U/L); TGP = 31 U/L (VR < 35 U/L).

Considerando a condição clínica atual da paciente, o exame a ser realizado para confirmação diagnóstica é:`,
    options: [
      { id: "A", text: "ultrassonografia abdominal." },
      { id: "B", text: "lavado peritoneal com solução salina." },
      { id: "C", text: "angiorressonância magnética do abdome." },
      { id: "D", text: "tomografia computadorizada do abdome." },
      { id: "E", text: "angiografia aórtica e de membros inferiores." }
    ],
    correct: "A"
  },
  {
    id: 35,
    year: 2013,
    area: "Cirurgia/Transplante",
    enunciado: `Rapaz com 15 anos de idade, portador de cirrose biliar primária, com classificação MELD igual a 32, encontra-se na fila de transplantes do Sistema Único de Saúde (SUS). Seu pai, com 40 anos de idade, saudável, deseja antecipar o transplante.

A orientação adequada para essa situação é:`,
    options: [
      { id: "A", text: "não há possibilidade de acelerar o transplante, pois o paciente é menor de idade e tem uma avaliação de menor gravidade clínica." },
      { id: "B", text: "o transplante somente poderá ser antecipado se houver um doador com morte cerebral comprovada e consentimento da família." },
      { id: "C", text: "o transplante poderá ser acelerado, pois o quadro clínico do paciente é grave e a doação intervivos pelo pai é consentida." },
      { id: "D", text: "em hipótese alguma o transplante poderá ser antecipado, pois, para a fila do SUS, os critérios são bem definidos e éticos." },
      { id: "E", text: "o transplante poderá ser antecipado somente com doador falecido HLA idêntico ou semi-idêntico." },
    ],
    correct: "C"
  },
  {
    id: 36,
    year: 2013,
    area: "Pediatria/Saúde Mental",
    enunciado: `Criança com 11 anos de idade, frequentando o quarto ano do ensino fundamental, é encaminhada ao pediatra pela escola por apresentar indisciplina e problemas de aprendizagem. A diretora solicita encaminhamento para o neurologista, psicólogo e oftalmologista. Na consulta em Unidade Básica de Saúde, a mãe conta que a classe da criança já teve três trocas de professora no ano corrente, e que em casa a criança é muito esperta e cuida do irmão de 5 anos, no horário em que ela está trabalhando. Levando em consideração a Reforma Psiquiátrica Brasileira, o Movimento de Luta Antimanicomial e a Política Nacional de Saúde Mental, a conduta adequada é:`,
    options: [
      { id: "A", text: "valorizar o prejuízo que a criança já tem em decorrência do atraso na escolarização, instituindo tratamento clínico para transtorno de hiperatividade e déficit de atenção com ritalina e psicoterapia no Centro de Atenção Psicossocial (CAPS)." },
      { id: "B", text: "prevenir a piora do quadro e a possibilidade de internação em hospital psiquiátrico por intermédio da pronta referência do caso ao psiquiatra, antes que ocorra recrudescimento e seja imperioso o tratamento manicomial." },
      { id: "C", text: "agendar os procedimentos ambulatoriais requisitados, em cumprimento ao princípio da intersetorialidade da Lei n.º 8.080/1990, com cobertura pelo benefício financeiro do Programa \"De Volta Para Casa\"." },
      { id: "D", text: "acionar o Conselho Tutelar mediante denúncia de bullying e assédio moral da escola contra a criança, pela repetência serial e tentativa de culpabilizar a vítima pelo próprio agravo sofrido." },
      { id: "E", text: "orientar a mãe a respeito da possibilidade de o comportamento da criança dever-se a situações sociais do entorno escolar e/ou doméstico, e viabilizar contato da Equipe de Saúde da Família com a escola." }
    ],
    correct: "E"
  },
  {
    id: 37,
    year: 2013,
    area: "Pediatria/Reumatologia",
    enunciado: `Menino com 12 anos de idade é trazido pelo pai ao Ambulatório de Pediatria. Na história apresenta febre e dor intensa nas articulações do joelho há uma semana, a qual passou a acometer cotovelos e punhos. Há três semanas apresentou infecção de garganta (sic) tratada com amoxicilina. Ao exame, apresenta temperatura axilar = 38,4 ºC; frequência cardíaca = 132 bpm; estado geral comprometido; dispneia leve que piora com o decúbito. A ausculta cardíaca mostra sopro holossistólico, de média intensidade, mais audível em ápice, irradiando-se para a axila; 3.ª bulha audível.

Diante do quadro de alta suspeita diagnóstica de febre reumática, qual a medicação a ser prescrita neste momento?`,
    options: [
      { id: "A", text: "Ibuprofeno." },
      { id: "B", text: "Diclofenaco." },
      { id: "C", text: "Naproxeno." },
      { id: "D", text: "Prednisona." },
      { id: "E", text: "Ácido Acetil Salicílico." }
    ],
    correct: "E"
  },
  {
    id: 38,
    year: 2013,
    area: "Ginecologia/Obstetrícia",
    enunciado: `Mulher com 35 anos de idade, G2 P1 (parto vaginal há 4 anos), 41 semanas e 2 dias de idade gestacional (corrigida por ultrassonografia realizada no primeiro trimestre), vem à Unidade Básica de Saúde para mais uma consulta de pré-natal. Refere dor nas costas e cansaço. Nega contrações, disúria, perda líquida ou sangramento vaginal. Relata boa movimentação fetal. Ao exame: pressão arterial = 100x60 mmHg, peso = 68 kg, altura uterina = 34 cm, batimentos cardiófetais = 140 bpm, ausência de dinâmica uterina. Toque vaginal = colo grosso, centrado, 2 cm de dilatação, apresentação cefálica.

A conduta indicada é:`,
    options: [
      { id: "A", text: "dar alta do pré-natal e orientar a paciente a procurar a Maternidade quando apresentar sintomas do trabalho de parto." },
      { id: "B", text: "encaminhar para a Maternidade para avaliação da vitalidade fetal e indução do parto." },
      { id: "C", text: "orientar controle da movimentação fetal e aguardar o trabalho de parto espontâneo." },
      { id: "D", text: "agendar nova consulta em 7 dias e orientar sinais e sintomas do trabalho de parto." },
      { id: "E", text: "solicitar ultrassonografia obstétrica e agendar nova consulta em 7 dias." }
    ],
    correct: "B"
  },
  {
    id: 39,
    year: 2013,
    area: "Clínica Médica/Infecções Respiratórias",
    enunciado: `Mulher com 68 anos de idade foi trazida à Emergência por apresentar quadro de febre de até 39ºC, mialgias, cefaleia, tosse seca, dispneia e piora do estado geral há três dias, com piora nas últimas seis horas. Ao exame encontra-se acordada, orientada, com frequência respiratória = 30 irpm, pressão arterial = 100x60 mmHg, frequência cardíaca = 115 bpm, oximetria digital = 86%, em ar ambiente. Sem outras alterações ao exame físico. A radiografia de tórax mostrou infiltrado intersticial bilateral. A paciente foi transferida para a Unidade de Terapia Intensiva, em quarto privativo, e foi iniciada reposição volêmica.

Qual a conduta inicial indicada para esta paciente?`,
    options: [
      { id: "A", text: "Iniciar oxigenioterapia, colher três amostras de hemocultura aeróbia e iniciar azitromicina." },
      { id: "B", text: "Colher secreção respiratória para PCR viral, prescrever oxigenoterapia e oseltamivir." },
      { id: "C", text: "Iniciar ventilação mecânica não invasiva, colher material para exame bacteriológico e iniciar oseltamivir." },
      { id: "D", text: "Iniciar ventilação mecânica invasiva com circuito fechado como medida de isolamento respiratório e prescrever azitromicina." },
      { id: "E", text: "Colher material para PCR para H1N1 e prescrever medidas de suporte, já que a paciente apresenta sintomas há mais de 48 horas." }
    ],
    correct: "B"
  },
  {
    id: 40,
    year: 2013,
    area: "Cirurgia/Geral",
    enunciado: `Homem de 22 anos de idade procura a Unidade Básica de Saúde de seu bairro com náuseas, vômitos e “caroço doloroso na virilha”. Informa que há três anos esse massa aparece quando faz esforço e desaparece ao deitar-se, mas desta vez vem se mantendo há dois dias. Ao exame físico: paciente em bom estado geral e aumento de volume na região inguinal e do escroto direito, com dor à palpação.

A conduta a ser adotada pelo médico da Unidade é:`,
    options: [
      { id: "A", text: "administração de relaxante muscular, colocando o paciente em posição de Trendelemburg, com tentativa de redução do volume." },
      { id: "B", text: "encaminhamento do paciente ao Serviço de Urgência do Hospital com o pedido de avaliação imediata do cirurgião." },
      { id: "C", text: "tentativa de redução manual do aumento de volume da região inguinoscrotal para a cavidade abdominal." },
      { id: "D", text: "transiluminação do escroto para tentar diferenciar hérnia inguinal de hidrocele comunicante." },
      { id: "E", text: "prescrição de antiemético e solicitação de ecografia da região inguinoscrotal." }
    ],
    correct: "B"
  },
  {
    id: 41,
    year: 2013,
    area: "Medicina do Trabalho",
    enunciado: `Maquinista de ferrovia, com 36 anos de idade, comparece à Unidade Básica de Saúde com história de lombalgia há seis meses, de início insidioso, com piora progressiva e, mais recentemente, irradiação para o membro inferior esquerdo. Ao exame, notam-se discreta claudicação, supradesnivelamento da escápula esquerda, contratura muscular subescapular e lombar ipsilateral, limitação da flexo-extensão da coluna, com retorno lento à ortostase após fáceis de dor. O sinal de Lasègue é positivo. Perguntado sobre suas atividades profissionais, informa que trabalha em ambiente muito quente (próximo à caldeira da locomotiva) e ruidoso, e que a sua tarefa mais frequente é alimentar a caldeira com movimentos repetidos, quando permanece com o tronco abaixado.

Sobre a responsabilidade de emissão de Comunicação de Acidente de Trabalho (CAT) neste caso, é correto afirmar que:`,
    options: [
      { id: "A", text: "o médico da Unidade Básica de Saúde deve emitir a CAT." },
      { id: "B", text: "o médico da Unidade Básica de Saúde deve elaborar relatório detalhado, que permita ao médico do trabalho da ferrovia emitir a CAT." },
      { id: "C", text: "o médico do trabalho da ferrovia já teria emitido a CAT, se houvesse indicação, portanto o médico da Unidade Básica de Saúde nada tem a acrescentar." },
      { id: "D", text: "a emissão da CAT pode ser assumida pelo médico da Unidade Básica de Saúde, desde que uma ressonância nuclear magnética comprove patologia discal lombar ocupacional." },
      { id: "E", text: "o perito médico previdenciário do Instituto Nacional do Seguro Social (INSS) é competente para emitir a CAT, e o médico da Unidade Básica de Saúde deve elaborar relatório para encaminhamento à Previdência Social." }
    ],
    correct: "A"
  }
];

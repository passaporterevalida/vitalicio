# Sistema de Missões Personalizadas

## Visão Geral

O sistema de missões personalizadas permite que os usuários criem suas próprias missões com filtros específicos, oferecendo uma experiência de estudo altamente personalizada para o Revalida.

## Funcionalidades

### 1. Quantidade de Questões
- **Configuração**: 1 a 50 questões
- **Padrão**: 10 questões
- **XP Estimado**: 10 XP por questão

### 2. Configuração de Tempo
- **Tempo Total**: 5 a 120 minutos
- **Tempo por Questão**: 1 a 10 minutos
- **Padrão**: 30 minutos total, 3 minutos por questão

### 3. Áreas Médicas (5 Grandes Áreas do Revalida)
- **Clínica Médica**
- **Pediatria**
- **Ginecologia e Obstetrícia**
- **Cirurgia**
- **Medicina Preventiva e Social**

### 4. Especialidades (Opcional)
- Cardiologia, Endocrinologia, Gastroenterologia
- Nefrologia, Pneumologia, Reumatologia
- Infectologia, Neurologia, Dermatologia
- Oftalmologia, Otorrinolaringologia, Urologia
- Ortopedia, Neurocirurgia, Cirurgia Cardiovascular
- Cirurgia Geral, Cirurgia Pediátrica, Cirurgia Plástica
- Oncologia, Hematologia, Psiquiatria
- Radiologia, Anestesiologia, Emergência
- UTI, Saúde Coletiva, Bioética
- Epidemiologia, Saúde Pública

## Como Usar

### 1. Acessar a Página de Missões Personalizadas
```typescript
// Navegar para /custom-missions
import CustomMissions from '@/pages/CustomMissions';
```

### 2. Configurar uma Missão
1. Clique em "Configurar Missão"
2. Defina a quantidade de questões
3. Configure o tempo total e por questão
4. Selecione as áreas médicas desejadas
5. Opcionalmente, selecione especialidades específicas
6. Revise o resumo da missão
7. Clique em "Iniciar Missão"

### 3. Executar a Missão
- A missão usa o mesmo modal de execução das missões padrão
- Timer regressivo baseado na configuração
- Feedback em tempo real
- Sistema de gamificação integrado

## Estrutura Técnica

### Tipos de Dados

```typescript
interface CustomMissionFilters {
  questionCount: number;
  totalTime: number; // em minutos
  timePerQuestion: number; // em minutos
  medicalAreas: string[]; // 5 grandes áreas do Revalida
  specialties: string[]; // especialidades específicas
}

interface CustomMission extends Mission {
  filters: CustomMissionFilters;
  isCustom: true;
}
```

### Componentes Principais

1. **CustomMissionCard**: Card principal com modal de configuração
2. **MissionExecution**: Execução da missão (compartilhado com missões padrão)
3. **useMissions**: Hook atualizado para suportar filtros personalizados

### Filtros de Questões

```typescript
const filterQuestionsByCustomMission = (questions: any[], mission: CustomMission) => {
  let filteredQuestions = questions;

  // Filtrar por áreas médicas
  if (mission.filters.medicalAreas.length > 0) {
    filteredQuestions = filteredQuestions.filter(q => 
      mission.filters.medicalAreas.some(area => 
        q.area.includes(area) || area.includes(q.area)
      )
    );
  }

  // Filtrar por especialidades
  if (mission.filters.specialties.length > 0) {
    filteredQuestions = filteredQuestions.filter(q => 
      mission.filters.specialties.some(specialty => 
        q.area.includes(specialty) || 
        (q.area.includes('/') && q.area.split('/').some(part => part.includes(specialty)))
      )
    );
  }

  return filteredQuestions;
};
```

## Integração com Sistema Existente

### Compatibilidade
- Usa o mesmo sistema de execução das missões padrão
- Integra com o sistema de gamificação
- Compatível com o sistema de progresso
- Usa as mesmas questões do banco de dados

### Diferenças das Missões Padrão
- Não são salvas permanentemente
- Geradas dinamicamente com base nos filtros
- ID único baseado em timestamp
- Não aparecem na lista de missões concluídas

## Exemplo de Uso

```typescript
import { CustomMissionCard } from '@/components/CustomMissionCard';

function MissionsPage() {
  const handleStartMission = (mission: CustomMission) => {
    // Iniciar execução da missão personalizada
    console.log('Missão personalizada iniciada:', mission);
  };

  return (
    <CustomMissionCard onStartMission={handleStartMission} />
  );
}
```

## Benefícios

1. **Personalização**: Usuários podem focar em áreas específicas
2. **Flexibilidade**: Configuração de tempo e quantidade adaptável
3. **Especialização**: Filtros por especialidades médicas
4. **Gamificação**: Integração completa com sistema de XP e badges
5. **Escalabilidade**: Fácil adição de novos filtros e áreas

## Próximos Passos

1. **Histórico de Missões**: Salvar missões personalizadas favoritas
2. **Templates**: Missões pré-configuradas populares
3. **Estatísticas**: Análise de performance por área/especialidade
4. **Compartilhamento**: Compartilhar configurações de missões
5. **IA**: Sugestões automáticas baseadas no histórico do usuário 
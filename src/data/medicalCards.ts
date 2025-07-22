
import { MedicalCard } from '@/types/gamification';

export const MEDICAL_CARDS: MedicalCard[] = [
  {
    id: 'card_clinica_1',
    title: 'Diagnóstico Diferencial',
    area: 'Clínica Médica',
    content: 'O diagnóstico diferencial é fundamental na prática médica...',
    tip: 'Sempre considere as hipóteses mais prováveis primeiro!',
    unlocked: false,
    rarity: 'comum'
  },
  {
    id: 'card_pediatria_1',
    title: 'Marcos do Desenvolvimento',
    area: 'Pediatria',
    content: 'Os marcos do desenvolvimento infantil são cruciais...',
    tip: 'Memorize os marcos por faixa etária!',
    unlocked: false,
    rarity: 'raro'
  }
];

/**
 * Utilitários para formatação e manipulação de tempo
 * Remove duplicação de código entre componentes de timer
 */

/**
 * Formata segundos em formato MM:SS
 * @param seconds - Tempo em segundos
 * @returns String formatada no formato MM:SS
 */
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Formata segundos em formato legível (ex: "2 min 30 seg")
 * @param seconds - Tempo em segundos
 * @returns String formatada de forma legível
 */
export function formatTimeReadable(seconds: number): string {
  if (seconds < 60) {
    return `${seconds} seg`;
  }
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (remainingSeconds === 0) {
    return `${minutes} min`;
  }
  
  return `${minutes} min ${remainingSeconds} seg`;
}

/**
 * Converte minutos para segundos
 * @param minutes - Tempo em minutos
 * @returns Tempo em segundos
 */
export function minutesToSeconds(minutes: number): number {
  return minutes * 60;
}

/**
 * Converte segundos para minutos
 * @param seconds - Tempo em segundos
 * @returns Tempo em minutos
 */
export function secondsToMinutes(seconds: number): number {
  return Math.floor(seconds / 60);
} 
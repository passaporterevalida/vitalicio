import { getXPForQuestion, getXPForMissionCompletion } from '../gamificationHelpers';

describe('getXPForQuestion', () => {
  it('deve retornar 10 para resposta correta', () => {
    expect(getXPForQuestion(true)).toBe(10);
  });
  it('deve retornar 0 para resposta errada', () => {
    expect(getXPForQuestion(false)).toBe(0);
  });
});

describe('getXPForMissionCompletion', () => {
  it('deve retornar 0 se score for menor que total', () => {
    expect(getXPForMissionCompletion(5, 10)).toBe(0);
    expect(getXPForMissionCompletion(9, 10)).toBe(0);
  });
  it('deve retornar o bônus correto se score for igual ao total', () => {
    expect(getXPForMissionCompletion(10, 10)).toBe(75);
    expect(getXPForMissionCompletion(4, 4)).toBe(75);
    expect(getXPForMissionCompletion(8, 8)).toBe(75);
  });
  it('deve calcular corretamente para outros valores de total', () => {
    expect(getXPForMissionCompletion(5, 5)).toBe(75);
    expect(getXPForMissionCompletion(20, 20)).toBe(75);
  });
}); 
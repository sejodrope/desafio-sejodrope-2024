import { RecintosZoo } from "./recintos-zoo.js";

describe('Recintos do Zoologico', () => {

    test('Deve rejeitar animal inválido', () => {
            const resultado = new RecintosZoo().analisaRecintos('UNICORNIO', 1);
            expect(resultado.erro).toBe("Animal inválido");
            expect(resultado.recintosViaveis).toBeFalsy();
        });

    test('Deve rejeitar quantidade inválida', () => {
            const resultado = new RecintosZoo().analisaRecintos('MACACO', 0);
            expect(resultado.erro).toBe("Quantidade inválida");
            expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Não deve encontrar recintos para 10 macacos', () => {
            const resultado = new RecintosZoo().analisaRecintos('MACACO', 10);
            expect(resultado.erro).toBe("Não há recinto viável");
            expect(resultado.recintosViaveis).toBeFalsy();
        });

    test('Deve encontrar recinto para 1 crocodilo', () => {
        const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 5 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Deve encontrar recintos para 2 macacos', () => {

        const resultado = new RecintosZoo().analisaRecintos('MACACO', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 5 total: 10)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 2 (espaço livre: 3 total: 5)');
        expect(resultado.recintosViaveis[2]).toBe('Recinto 3 (espaço livre: 2 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(3);
    });

});

describe('Testes adicionais para Recintos do Zoologico', () => {
    let zoo;
  
    beforeEach(() => {
      zoo = new RecintosZoo();
    });
  
    test('Deve rejeitar hipopótamo em recinto sem rio e savana', () => {
        const resultado = zoo.analisaRecintos('HIPOPOTAMO', 1);
        expect(resultado.recintosViaveis).toHaveLength(1);
        expect(resultado.recintosViaveis[0]).toBe('Recinto 3 (espaço livre: 0 total: 7)');
    });
    
    test('Deve aceitar hipopótamo em recinto com savana e rio', () => {
        const resultado = zoo.analisaRecintos('HIPOPOTAMO', 1);
        expect(resultado.recintosViaveis).toContain('Recinto 3 (espaço livre: 0 total: 7)');
    });

    test('Não deve permitir animal carnívoro com outras espécies', () => {
        const resultado = zoo.analisaRecintos('LEAO', 1);
        expect(resultado.recintosViaveis).not.toContain('Recinto 1 (espaço livre: 6 total: 10)');
        expect(resultado.recintosViaveis).toContain('Recinto 2 (espaço livre: 2 total: 5)');
        expect(resultado.recintosViaveis).toContain('Recinto 5 (espaço livre: 3 total: 9)');
    });
  
    test('Deve considerar espaço extra quando há mais de uma espécie', () => {
      const resultado = zoo.analisaRecintos('GAZELA', 1);
      expect(resultado.recintosViaveis).toContain('Recinto 1 (espaço livre: 4 total: 10)');
    });
  
    test('Não deve permitir um único macaco em recinto vazio', () => {
      const resultado = zoo.analisaRecintos('MACACO', 1);
      expect(resultado.recintosViaveis).not.toContain('Recinto 2 (espaço livre: 4 total: 5)');
      expect(resultado.recintosViaveis).not.toContain('Recinto 4 (espaço livre: 7 total: 8)');
    });
  
    test('Deve permitir dois macacos em recinto vazio', () => {
      const resultado = zoo.analisaRecintos('MACACO', 2);
      expect(resultado.recintosViaveis).toContain('Recinto 2 (espaço livre: 3 total: 5)');
    });
  
    test('Não deve permitir animal não carnívoro com carnívoro', () => {
      const resultado = zoo.analisaRecintos('GAZELA', 1);
      expect(resultado.recintosViaveis).not.toContain('Recinto 5 (espaço livre: 4 total: 9)');
    });
  });

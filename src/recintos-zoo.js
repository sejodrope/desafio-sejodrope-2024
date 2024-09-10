class RecintosZoo {
  constructor() {
    this.recintos = [
      { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
      { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
      { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
      { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
      { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
    ];

    this.animais = {
      LEAO: { tamanho: 3, bioma: ['savana'], carnivoro: true },
      LEOPARDO: { tamanho: 2, bioma: ['savana'], carnivoro: true },
      CROCODILO: { tamanho: 3, bioma: ['rio'], carnivoro: true },
      MACACO: { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
      GAZELA: { tamanho: 2, bioma: ['savana'], carnivoro: false },
      HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false }
    };
  }

  
  analisaRecintos(especie, quantidade) {
    if (!this.animais[especie]) {
      return { erro: "Animal inválido" };
    }
    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
      return { erro: "Quantidade inválida" };
    }

    const recintosViaveis = this.recintos
      .filter(recinto => this.recintoViavel(recinto, especie, quantidade))
      .map(recinto => {
        const espacoOcupado = this.calcularEspacoOcupado(recinto, especie, quantidade);
        const espacoLivre = recinto.tamanho - espacoOcupado;
        return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`;
      })
      .sort((a, b) => parseInt(a.split(' ')[1]) - parseInt(b.split(' ')[1]));

    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }

    return { recintosViaveis };
  }

  recintoViavel(recinto, especie, quantidade) {
    const animal = this.animais[especie];
    const espacoNecessario = animal.tamanho * quantidade;
    const espacoOcupado = this.calcularEspacoOcupado(recinto, especie, quantidade);

    // Verificação de espaço
    if (recinto.tamanho < espacoOcupado) return false;

    // Verificação de bioma para animais aquáticos
    if (animal.bioma.includes('rio') && !recinto.bioma.includes('rio')) return false;

    // Regra para animais carnívoros
    if (animal.carnivoro) {
      // Permite carnívoros em recintos vazios, independente do bioma
      if (recinto.animais.length === 0) return true;
      // Se o recinto não está vazio, só permite se for da mesma espécie
      if (recinto.animais[0].especie !== especie) return false;
      // Se for da mesma espécie, verifica se o bioma é adequado
      if (!animal.bioma.some(b => recinto.bioma.includes(b))) return false;
    } else {
      // Para animais não carnívoros, mantém a verificação de bioma
      if (!animal.bioma.some(b => recinto.bioma.includes(b))) return false;
      // Não permite animais não carnívoros com carnívoros
      if (recinto.animais.some(a => this.animais[a.especie].carnivoro)) return false;
    }

    // Regra para hipopótamos
    if (especie === 'HIPOPOTAMO' || recinto.animais.some(a => a.especie === 'HIPOPOTAMO')) {
      if (recinto.bioma !== 'savana e rio') return false;
    }

    // Regra para macacos
    if (especie === 'MACACO' && recinto.animais.length === 0 && quantidade === 1) return false;

    return true;
  }

  calcularEspacoOcupado(recinto, novaEspecie, novaQuantidade) {
    let espacoOcupado = recinto.animais.reduce((total, animal) =>
      total + this.animais[animal.especie].tamanho * animal.quantidade, 0);

    espacoOcupado += this.animais[novaEspecie].tamanho * novaQuantidade;

    if (recinto.animais.length > 0 && recinto.animais[0].especie !== novaEspecie) {
      espacoOcupado += 1;
    }

    return espacoOcupado;
  }
}

export { RecintosZoo as RecintosZoo };

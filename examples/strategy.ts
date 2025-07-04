/**
 * O Context define a interface de interesse do cliente..
 */
class Context {
  /**
   * O Context man tém uma referência a um dos objetos Strategy, sem conhecer
   * sua classe concreta. Deve operar com todas as classes de estratégias
   * por meio da interface Strategy.
   */
  private strategy: Strategy;

  /**
   * Em geral, o Context aceita uma Strategy via construtor, mas deve prover
   * também um setter para alterá-la em tempo de execução.
   */
  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  /**
   * O Context em geral aceita alterar o objeto Strategy no runtime.
   */
  public setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  /**
   * O Context delega o trabalho para o objeto Strategy em lugar de
   * implementar múltiplas versões do algoritmo por si mesmo.
   */
  public doSomeBusinessLogic(): void {
    // ...

    console.log('Context: Classificando dados usando uma estratégia');
    const result = this.strategy.doAlgorithm(['a', 'b', 'c', 'd', 'e']);
    console.log(result.join(','));

    // ...
  }
}

/**
 * A interface Strategy declara operações comuns a todas as 
 * versões suportadas de um algoritmo.
 *
 * O Context usa essa interface para chamar o algoritmo definido pelas
 * Concrete Strategies.
 */
interface Strategy {
  doAlgorithm(data: string[]): string[];
}

/**
 * As Concrete Strategies implementam o algoritmo seguindo a interface
 * Strategy, o que as tornam intercambiáveis no Context.
 */
class ConcreteStrategyA implements Strategy {
  public doAlgorithm(data: string[]): string[] {
    return data.sort();
  }
}

class ConcreteStrategyB implements Strategy {
  public doAlgorithm(data: string[]): string[] {
    return data.reverse();
  }
}

/**
 * O código cliente escolhe uma estratégia e a passa para o Context. 
 * O cliente deve saber a diferença entre as estratégias para tomar 
 * a decisão adequada.
 */
const context = new Context(new ConcreteStrategyA());
console.log('Client: Strategy usada é crescente.');
context.doSomeBusinessLogic();

console.log('');
console.log('Client: Strategy alterada para reversa.');
context.setStrategy(new ConcreteStrategyB());
context.doSomeBusinessLogic();

/**
 * 
 * Output.txt: Resultados da execução
 * Client: Strategy usada é crescente.
 * Context: Classificando dados usando uma estratégia
 * a,b,c,d,e
 * 
 * Client: Strategy alterada para reversa.
 * Context: Classificando dados usando uma estratégia
 * e,d,c,b,a
 */
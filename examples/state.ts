/**
 * O Context define a interface de interesse do cliente. Também mantém 
 * uma referência à instância da subclasse State, que representa o
 * estado atual do contexto.
 */
class Context {
  private state: State;

  constructor(state: State) {
    this.transitionTo(state);
  }

  /**
   * O Context permite alterar o objeto State em tempo de execução.
   */
  public transitionTo(state: State): void {
    console.log("Context: Transição para: " + <any>state.constructor.name);
    this.state = state;
    this.state.setContext(this);
  }

  /**
   * O Context delega parte do seu comportamento ao atual objeto State.
   */
  public request1(): void {
    this.state.handle1();
  }

  public request2(): void {
    this.state.handle2();
  }
}

/**
 * A classe abstrata State declara métodos que todos os Concrete State devem
 * implementar, e também provê uma referência inversa ao objeto Context, 
 * associado ao State. Esse backreference pode ser usada pelos State concretos
 * para transicionar o Context para outro State.
 */
abstract class State {
  protected context: Context;

  public setContext(context: Context) {
    this.context = context;
  }

  public abstract handle1(): void;

  public abstract handle2(): void;
}

/**
 * Concrete States implementam as ações associadas ao estado do Context.
 */
class ConcreteStateA extends State {
  public handle1(): void {
    console.log('ConcreteStateA lida com a requisição 1');
    console.log('ConcreteStateA quer alterar o estado do contexto.');
    this.context.transitionTo(new ConcreteStateB());
  }

  public handle2(): void {
    console.log('ConcreteStateA lida com a requisição 2.');
  }
}

class ConcreteStateB extends State {
  public handle1(): void {
    console.log('ConcreteStateB handles request1.');
  }

  public handle2(): void {
    console.log('ConcreteStateB lida com a requisição 1');
    console.log('ConcreteStateB quer alterar o estado do contexto.');
    this.context.transitionTo(new ConcreteStateA());
  }
}

/**
 * Código do cliente.
 */ 
const context = new Context(new ConcreteStateA());
context.request1();
context.request2();

/** 
 * Output.txt: Resultados da execução
 * 
 * Context: Transição para ConcreteStateA.
 * ConcreteStateA lida com requisição 1.
 * ConcreteStateA quer alterar o estado do contexto.
 * Context: Transição para ConcreteStateB.
 * ConcreteStateB lida com requisição 2.
 * ConcreteStateB quer alterar o estado do contexto.
 * Context: Transição para ConcreteStateA.
 */
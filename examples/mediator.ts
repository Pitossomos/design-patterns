/**
 * A interface Mediator declara um método usado pelos componentes para 
 * notificar o mediador sobre vários eventos. O Mediator pode reagir a
 * esses eventos ou ou passar a execução a outros componentes.
 */
interface Mediator {
  notify(sender: object, event: string): void;
}

/**
 * Mediators concretos implementam comportamentos cooperativos 
 * coordenando diversos componentes.
 */
class ConcreteMediator implements Mediator {
  private component1: Component1;

  private component2: Component2;

  constructor(c1: Component1, c2: Component2) {
    this.component1 = c1;
    this.component1.setMediator(this);
    this.component2 = c2;
    this.component2.setMediator(this);
  }

  public notify(sender: object, event: string): void {
    if (event === 'A') {
      console.log('Mediator reage a A e aciona as operações:');
      this.component2.doC();
    }

    if (event === 'D') {
      console.log('Mediator reage a D e aciona as operações:');
      this.component1.doB();
      this.component2.doC();
    }
  }
}

/**
 * O Component base fornece a funcionalidade básica para armazenar
 * a instância do Mediator dentro dos objetos Component.
 */
class BaseComponent {
  protected mediator: Mediator;

  constructor(mediator?: Mediator) {
    this.mediator = mediator!;
  }

  public setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }
}

/**
 * Components concretos implementam outras funcionalidades diversas. 
 * Eles não dependem de outros componentes nem de um mediador concreto.
 */
class Component1 extends BaseComponent {
  public doA(): void {
    console.log('Component 1 faz A.');
    this.mediator.notify(this, 'A');
  }

  public doB(): void {
    console.log('Component 1 faz B.');
    this.mediator.notify(this, 'B');
  }
}

class Component2 extends BaseComponent {
  public doC(): void {
    console.log('Component 2 faz C.');
    this.mediator.notify(this, 'C');
  }

  public doD(): void {
    console.log('Component 2 faz D.');
    this.mediator.notify(this, 'D');
  }
}

/**
 * Código do cliente.
 */
const c1 = new Component1();
const c2 = new Component2();
const mediator = new ConcreteMediator(c1, c2);

console.log('Cliente aciona a operação A.');
c1.doA();

console.log('');
console.log('Cliente aciona a operação D.');
c2.doD();


/* 
 * Output.txt: Resultados da execução
 * 
 * Cliente aciona a operação A.
 * Component 1 faz A.
 * Mediator reage a A e aciona as operações:
 * Component 2 faz C.
 * 
 * Cliente aciona a operação D.
 * Component 2 faz D.
 * Mediator reage a D e aciona as operações:
 * Component 1 faz B.
 * Component 2 faz C.
 */
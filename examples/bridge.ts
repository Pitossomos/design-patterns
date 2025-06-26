/**
 * A Abstraction define a parte de controle da hierarquia de duas classes.
 * Ela mantém uma referência para um objeto Implementation e delega
 * todo o trabalho real para esse objeto.
 */
class Abstraction {
  protected implementation: Implementation;

  constructor(implementation: Implementation) {
    this.implementation = implementation;
  }

  public operation(): string {
    const result = this.implementation.operationImplementation();
    return "Abstraction: Operação básica com :\\n" + result;
  }
}

/**
 * Podemos estender a Abstracion sem mudar a classe Implementation.
 */
class ExtendedAbstraction extends Abstraction {
  public operation(): string {
    const result = this.implementation.operationImplementation();
    return "ExtendedAbstraction: Operação estendida com:\\n" + result;
  }
}

/**
 * A Implementation define a interface para todas as classes de implementações.
 * A interface não precisa ser idêntica à interface Abstraction, podendo ser
 * completamente diferentes. Tipicamente, a interface Implementation provê
 * apenas operações primitivas, enquanto a Abstraction define operações de 
 * maior nivel baseados nessas primitivas.
 */
interface Implementation {
  operationImplementation(): string;
}

/**
 * Cada classe concreta de implementação corresponde a uma plataforma específica
 * e implementa a interfacec Implementation usando a API da sua plataforma.
 */
class ConcreteImplementationA implements Implementation {
  public operationImplementation(): string {
    return 'ConcreteImplementationA: O resultado da plataforma A é este.';
  }
}

class ConcreteImplementationB implements Implementation {
  public operationImplementation(): string {
    return 'ConcreteImplementationB: O resultado da plataforma B é este.';
  }
}

/**
 * Exceto pela fase de inicialização quando um objeto Abstraction é ligado a um 
 * objeto especifico de Implementação, o código do cliente depende apenas da
 * classe Abstraction. Assim, o código do cliente pode suportar qualquer 
 * combinação de abstração-implementação.
 */
function clientCode(abstraction: Abstraction) {
  // ..

  console.log(abstraction.operation());

  // ..
}

/**
 * O código do cliente deve ser capaz de operar com qualquer combinação 
 * pré-configurada de Abstraction-Implementation.
 */
let implementation = new ConcreteImplementationA();
let abstraction = new Abstraction(implementation);
clientCode(abstraction);

console.log('');

implementation = new ConcreteImplementationB();
abstraction = new ExtendedAbstraction(implementation);
clientCode(abstraction);
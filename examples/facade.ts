/**
 * A classe Facade provê uma interface simples para a lógica complexa de 
 * vários subsistemas. Ela delega as requisições do cliente para os objetos
 * apropriados dentro do subsistema. Também é responsável por gerir seu
 * ciclo de vida. Tudo isso protege o cliente contra a complexidade 
 * indesejadada dos subsistemas.
 */
class Facade {
  protected subsystem1: Subsystem1;

  protected subsystem2: Subsystem2;

  /**
   * Dependendo da necessidade da aplicação, a Facade pode ser provida 
   * com os subsistemas ou criá-los por conta própria.
   */
  constructor(subsystem1?: Subsystem1, subsystem2?: Subsystem2) {
    this.subsystem1 = subsystem1 || new Subsystem1();
    this.subsystem2 = subsystem2 || new Subsystem2();
  }

  /**
   * Os métodos da Facade são atalhos convenientes para as funcionalidade 
   * sofisticadas dos subsistemas. No entanto, os clientes só têm acesso
   * a uma fração das capacidades de um subsistema.
   */
  public operation(): string {
    let result = "Facade inicializando subsistemas:\\n";
    result += this.subsystem1.operation1();
    result += this.subsystem2.operation1();
    result += "Facade ordenando subsistemas para performar a ação:\\n";
    result += this.subsystem1.operationN();
    result += this.subsystem2.operationZ();

    return result;
  }
}

/**
 * Os subsistemas podem aceitar requisições da Facade ou diretamente do cliente.
 * Em todo caso. para o Subsystem, a Facade é apenas outro cliente, e não uma
 * parte do Subsystem.
 */
class Subsystem1 {
  public operation1(): string {
    return "Subsystem1: Pronto!\\n";
  }

  // ...

  public operationN(): string {
    return "Subsystem1: Vai!\\n";
  }
}

/**
 * Algumas facades podem operar com múltiplos subsistemas ao mesmo tempo.
 */
class Subsystem2 {
  public operation1(): string {
    return "Subsystem21: Pronto!\\n";
  }

  // ...

  public operationZ(): string {
    return 'Subsystem2: Fogo!';
  }
}

/**
 * O código do cliente opera com subsistemas complexos através da interface
 * simples que a Facade provê. Quando a Facade gere o ciclo de vida do 
 * subsistema, o cliente pode nem mesmo conhecer a existência do subsistema.
 * Essa abordagem mantém a complexidade sob controle.
 */
function clientCode(facade: Facade) {
  // ...

  console.log(facade.operation());

  // ...
}

/**
 * O código cliente pode ter algum subsistema já criado. Nesse caso, pode 
 * fazer sentido inicializar a Facade com esses objetos ao invés de deixar
 * a Facade criar novas instâncias.
 */
const subsystem1 = new Subsystem1();
const subsystem2 = new Subsystem2();
const facade = new Facade(subsystem1, subsystem2);
clientCode(facade);
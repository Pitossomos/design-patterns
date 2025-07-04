/**
 * O Originator armazena um estado importante que pode ser alterado com o tempo.
 * Também define um método para salvar o estado em um Memento e outro para 
 * restaurá-lo.
 */
class Originator {
  /**
   * Por simplicidade, o estado do Originator é armazenado em uma variável
   * simples.
   */
  private state: string;

  constructor(state: string) {
    this.state = state;
    console.log("Originator: Meu estado inicial é: "+ state);
  }

  /**
   * A lógica de negócio do Originator pode afetar seu estado interno.
   * Portanto, o cliente deve realizar um backup do estado antes de
   * chamar métodos de lógica de negócio, por meio do método save().
   */
  public doSomething(): void {
    console.log("Originator: Estou fazendo algo importante.");
    this.state = this.generateRandomString(30);
    console.log("Originator: e meu estado mudou para: " + this.state);
  }

  private generateRandomString(length: number = 10): string {
    const charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    return Array
      .apply(null, { length })
      .map(() => charSet.charAt(Math.floor(Math.random() * charSet.length)))
      .join('');
  }

  /**
   * Salva o estado atual em um Memento
   */
  public save(): Memento {
    return new ConcreteMemento(this.state);
  }

  /**
   * Restaura um estado do Originator de um Memento
   */
  public restore(memento: Memento): void {
    this.state = memento.getState();
    console.log("Originator: Meu estado mudou para: " + this.state);
  }
}

/**
 * A interface Memento provê uma forma de recuperar os metadadados, tais como
 * data de criação ou nome. No entanto, ele não expõe o estado do Originator.
 */
interface Memento {
  getState(): string;

  getName(): string;

  getDate(): string;
}

/**
 * O ConcreteMemento contém a estrutura para armazenar o estado do Originator.
 */
class ConcreteMemento implements Memento {
  private state: string;

  private date: string;

  constructor(state: string) {
    this.state = state;
    this.date = new Date().toISOString().slice(0, 19).replace("T", " ");
  }

  /**
   * O Originator usa o método getState() para acessar o estado salvo.
   */
  public getState(): string {
    return this.state;
  }

  /**
   * Os demais métodos são usados pelo Caretaker para acessar os metadados.
   */
  public getName(): string {
    return "(" + this.date + " / " + this.state.substr(0, 9) + "...)";
  }

  public getDate(): string {
    return this.date;
  }
}

/**
 * O Caretaker não depende de classes concretas de Memento. Portanto, ela não
 * acessa o estado do Originator, armazenado no memento. Ao contrário, ela 
 * opera com todos os mementos via interface base Memento.
 */
class Caretaker {
  private mementos: Memento[] = [];

  private originator: Originator;

  constructor(originator: Originator) {
    this.originator = originator;
  }

  public backup(): void {
    console.log("\\nCaretaker: Salvando o estado do Originator...");
    this.mementos.push(this.originator.save());
  }

  public undo(): void {
    if (!this.mementos.length) {
      return;
    }

    const memento = this.mementos.pop();
    if (!memento) return;

    console.log("Caretaker: Restaurando o estado para: " + memento.getName());
    this.originator.restore(memento);
  }

  public showHistory(): void {
    console.log("Caretaker: Aqui está a lista de mementos:");
    for (const memento of this.mementos) {
      console.log(memento.getName());
    }
  }
}

/**
 * Código cliente.
 */
const originator = new Originator("Super-duper-super-puper-super.");
const caretaker = new Caretaker(originator);

caretaker.backup();
originator.doSomething();

caretaker.backup();
originator.doSomething();

caretaker.backup();
originator.doSomething();

console.log("");
caretaker.showHistory();

console.log("\\nClient: ROLLBACK!\\n");
caretaker.undo();

console.log("\\nClient: De novo!\\n");
caretaker.undo();


/*
 * Output.txt: Resultados da execução
 * Originator: Meu estado inicial é: ": Super-duper-super-puper-super.

 * Caretaker: Salvando o estado do Originator...
 * Originator: Estou fazendo algo importante.
 * Originator: e meu estado mudou para: qXqxgTcLSCeLYdcgElOghOFhPGfMxo
 * 
 * Caretaker: Salvando o estado do Originator...
 * Originator: Estou fazendo algo importante.
 * Originator: e meu estado mudou para: iaVCJVryJwWwbipieensfodeMSWvUY
 * 
 * Caretaker: Salvando o estado do Originator...
 * Originator: Estou fazendo algo importante.
 * Originator: e meu estado mudou para: oSUxsOCiZEnohBMQEjwnPWJLGnwGmy
 * 
 * Caretaker: Aqui está a lista de mementos:
 * 2019-02-17 15:14:05 / (Super-dup...)
 * 2019-02-17 15:14:05 / (qXqxgTcLS...)
 * 2019-02-17 15:14:05 / (iaVCJVryJ...)
 * 
 * Client: ROLLBACK!
 * 
 * Caretaker: Restaurando o estado para: 2019-02-17 15:14:05 / (iaVCJVryJ...)
 * Originator: Meu estado mudou para: iaVCJVryJwWwbipieensfodeMSWvUY
 * 
 * Client: De novo!
 * 
 * Caretaker: Restaurando o estado para: 2019-02-17 15:14:05 / (qXqxgTcLS...)
 * Originator: Meu estado mudou para: qXqxgTcLSCeLYdcgElOghOFhPGfMxo
 */
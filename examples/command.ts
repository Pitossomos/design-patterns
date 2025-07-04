/**
 * A interface Command define um método para executar um comando.
 */
interface Command {
  execute(): void;
}

/**
 * Alguns comandos podem implementar operações simples por conta própria.
 */
class SimpleCommand implements Command {
  private payload: string;

  constructor(payload: string) {
    this.payload = payload;
  }

  public execute(): void {
    console.log("SimpleCommand: Veja, posso fazer algo simples como imprimir:")
    console.log("    " + this.payload);
  }
}

/**
 * Alguns comandos podem delegar operações mais complexas a outros objetos,
 * chamados de "receivers."
 */
class ComplexCommand implements Command {
  private receiver: Receiver;

  /**
   * Dados de contexto, necessários para executar o comando.
   */
  private contextVar1: string;

  private contextVar2: string;

  /**
   * Comandos complexos podem aceitar um ou vários objetos Receiver junto com
   * qualquer dado de contexto via construtor.
   */
  constructor(receiver: Receiver, param1: string, param2: string) {
    this.receiver = receiver;
    this.contextVar1 = param1;
    this.contextVar2 = param2;
  }

  /**
   * Comandos podem delegar a execução a qualquer método do receiver.
   */
  public execute(): void {
    console.log('ComplexCommand: Coisas complexas são feitas pelo Receiver.');
    this.receiver.doSomething(this.contextVar1);
    this.receiver.doSomethingElse(this.contextVar2);
  }
}

/**
 * As classes Receiver contém lógicas de negócio importantes, e sabem quando
 * realizar todas as operações associadas a um pedido. Na verdade, qualquer
 * classe pode servir como um Receiver.
 */
class Receiver {
  public doSomething(param: string): void {
    console.log("Receiver: Executando: " + param);
  }

  public doSomethingElse(param: string): void {
    console.log("Receiver: Também executando:  " + param);
  }
}

/**
 * O Invoker está associado com um ou mais comandos. Ele envia uma requisição
 * do comando.
 */
class Invoker {
  private onStart: Command;

  private onFinish: Command;

  /**
   * Iniciando comandos.
   */
  public setOnStart(command: Command): void {
    this.onStart = command;
  }

  public setOnFinish(command: Command): void {
    this.onFinish = command;
  }

  /**
   * O Invoker não depende de nenhuma classe concreta de comando ou receiver.
   * Ele pode passar uma requisição para um Receiver indiretamente 
   * executando um comando.
   */
  public doSomethingImportant(): void {
    console.log('Invoker: Alguém precisa de algo antes de iniciar?');
    if (this.isCommand(this.onStart)) {
      this.onStart.execute();
    }

    console.log('Invoker: ...fazendo algo bem importante...');

    console.log('Invoker: Alguem quer algo agora que eu conclui o trabalho?');
    if (this.isCommand(this.onFinish)) {
      this.onFinish.execute();
    }
  }

  private isCommand(object): object is Command {
    return object.execute !== undefined;
  }
}

/**
 * O cliente pode parametrizar o invoker com qualquer comando.
 */
const invoker = new Invoker();
invoker.setOnStart(new SimpleCommand('Diga oi!'));
const receiver = new Receiver();
invoker.setOnFinish(new ComplexCommand(receiver, 'Mande e-mail.', 'Diga tchau!'));

invoker.doSomethingImportant();

/** Output - Mensagem de log esperada:
 * Invoker: Alguém precisa de algo antes de iniciar?
 * SimpleCommand: Veja, posso fazer algo simples como imprimir:
 *     Diga oi!
 * Invoker: ...fazendo algo bem importante...
 * Invoker: Alguem quer algo agora que eu conclui o trabalho?
 * ComplexCommand: ComplexCommand: Coisas complexas são feitas pelo Receiver.
 * Receiver: Executando: Mande e-mail.
 * Receiver: Também executando: Diga tchau!
 */
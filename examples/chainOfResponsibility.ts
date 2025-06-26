/**
 * A interface Handler declara um método para construir uma sequência de 
 * Handlers. Declara também um método para executar uma requisição.
 */
interface Handler<Request = string | null, Result = string | null> {
  setNext(handler: Handler<Request, Result>): Handler<Request, Result>;

  handle(request: Request): Result;
}

/**
 * A sequência pode ser implementada em de uma classe base AbstractHandler.
 */
abstract class AbstractHandler implements Handler
{
  private nextHandler: Handler;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    // Retorna um handler aqui permite associações convenientes no formato:
    // monkey.setNext(squirrel).setNext(dog);
    return handler;
  }

  public handle(request: string | null): string | null {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }

    return null;
  }
}

/**
 * Todos os Handlers concretos manipulam uma requisição ou a repassam para
 * para o próximo Handler na sequência.
 */
class MonkeyHandler extends AbstractHandler {
  public handle(request: string | null): string | null{
    if (request === 'Banana') {
      return "Macaco: Vou comer " + request;
    }
    return super.handle(request);

  }
}

class SquirrelHandler extends AbstractHandler {
  public handle(request: string | null): string | null{
    if (request === 'Noz') {
      return "Esquilo: Vou comer " + request;
    }
    return super.handle(request);
  }
}

class DogHandler extends AbstractHandler {
  public handle(request: string | null): string | null{
    if (request === 'Carne') {
      return "Cão: Vou comer " + request;
    }
    return super.handle(request);
  }
}

/**
 * O código do cliente em geral consegue operar com um único Handler.
 * Na maioria dos casos, ele não está ciente de que o Handler faz parte
 * de uma sequência. 
 */
function clientCode(handler: Handler) {
  const foods = ['Noz', 'Banana', 'Xícara de café'];

  for (const food of foods) {
    console.log("Cliente: Quem quer " + food);

    const result = handler.handle(food);
    if (result) {
      console.log("  " + result);
    } else {
      console.log("  " + food + " não foi consumida.");
    }
  }
}

/**
 * A outra parte do código do cliente constrói a verdadeira sequência.
 */
const monkey = new MonkeyHandler();
const squirrel = new SquirrelHandler();
const dog = new DogHandler();

monkey.setNext(squirrel).setNext(dog);

/**
 * The client should be able to send a request to any handler, not just the
 * first one in the chain.
 */
console.log("Sequência: Macaco > Esquilo > Cão\\n");
clientCode(monkey);
console.log('');

console.log('Subsequência: Esquilo > Cão\\n');
clientCode(squirrel);
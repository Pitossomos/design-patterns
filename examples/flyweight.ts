/**
 * O Flyweight é um padrão de design estrutural que permite economizar memória
 * compartilhando partes comuns do estado entre múltiplos objetos semelhantes.
 * Ele armazena a porção comum do estado (estado intrínseco) de várias entidades,
 * e aceita o restante do estado (estado extrínseco, único para cada entidade)
 * através de seus parâmetros de método.
 */
class Flyweight {
  private sharedState: any;

  constructor(sharedState: any) {
    this.sharedState = sharedState;
  }

  public operation(uniqueState): void {
    const s = JSON.stringify(this.sharedState);
    const u = JSON.stringify(uniqueState);
    console.log("Flyweight: Mostrando o estado armazenado: " + s);
    console.log("Flyweight: Mostrando os estados únicos: " + u);
  }
}

/**
 * A FlyweightFactory cria e gerencia os objetos Flyweight. Ela garante 
 * que os objetos Flyweight sejam criados e compartilados corretamente.
 * Quando o cliente requisita um Flyweight, a Factory retorna uma instância
 * existente ou cria uma nova, caso não exista nenhuma.
 */
class FlyweightFactory {
  private flyweights: {[key: string]: Flyweight} = <any>{};

  constructor(initialFlyweights: string[][]) {
    for (const state of initialFlyweights) {
      this.flyweights[this.getKey(state)] = new Flyweight(state);
    }
  }

  /**
   * Retorna uma chave única para o estado compartilhado. 
   */
  private getKey(state: string[]): string {
    return state.join('_');
  }

  /**
   * Retorna um Flyweight existente com seu estado ou cria um novo.
   */
  public getFlyweight(sharedState: string[]): Flyweight {
    const key = this.getKey(sharedState);

    if (!(key in this.flyweights)) {
      console.log('FlyweightFactory: Sem Flyweight existente, criando um novo.');
      this.flyweights[key] = new Flyweight(sharedState);
    } else {
      console.log('FlyweightFactory: Reutilizando um Flyweight existente.');
    }

    return this.flyweights[key];
  }

  public listFlyweights(): void {
    const count = Object.keys(this.flyweights).length;
    console.log("\\nFlyweightFactory: Flyweights existentes = " + count);
    for (const key in this.flyweights) {
      console.log(key);
    }
  }
}

/**
 * O código cliente, em geral, cria vários objetos Flyweight nos estágios
 * iniciais da aplicação e os reutiliza ao longo do tempo.
 */
const factory = new FlyweightFactory([
  ['Chevrolet', 'Camaro2018', 'rosa'],
  ['Mercedes Benz', 'C300', 'preto'],
  ['Mercedes Benz', 'C500', 'vermelho'],
  ['BMW', 'M5', 'vermelho'],
  ['BMW', 'X6', 'branco'],
  // ...
]);
factory.listFlyweights();

// ...

function addCarToPoliceDatabase(
  ff: FlyweightFactory, plates: string, owner: string,
  brand: string, model: string, color: string,
) {
  console.log('\nClient: Adding a car to database.');
  const flyweight = ff.getFlyweight([brand, model, color]);

  // O código cliente armazena ou calcula o estado extrínseco e o passa
  // para os métodos Flyweight.
  flyweight.operation([plates, owner]);
}

addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'M5', 'vermelho');

addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'X1', 'vermelho');

factory.listFlyweights();
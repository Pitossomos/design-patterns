/**
 * A interface Component declara o método 'accept' que tem como
 * argumento um objeto da interface Visitor.
 */
interface Component {
  accept(visitor: Visitor): void;
}

/**
 * Cada Component concreto deve implementar o método 'accept' de modo que
 * ele chame o método correspondente do Visitor.
 */
class ConcreteComponentA implements Component {
  /**
   * Veja que estamos chamando o método do Visitor que o faz visitar o 
   * componente concreto da classe ConcreteComponentA. 
   * Dessa forma, estamos informando para o Visitor a classe concreta do
   * componente e o objeto a ser visitado, que é passado como parâmetro.
   */
  public accept(visitor: Visitor): void {
  visitor.visitConcreteComponentA(this);
  }

  /**
   * Components concreto podem ter métodos especiais que não existem na classe
   * ou interface básica. O Visitor poderá usar esses métodos, pois ele tem
   * ciência da classe concreta do componente.
   */
  public exclusiveMethodOfConcreteComponentA(): string {
  return 'A';
  }
}

class ConcreteComponentB implements Component {
  /**
   * O mesmo de antes: visitConcreteComponentB => ConcreteComponentB
   */
  public accept(visitor: Visitor): void {
  visitor.visitConcreteComponentB(this);
  }

  public specialMethodOfConcreteComponentB(): string {
  return 'B';
  }
}

/**
 * A interface Visitor declara um conjunto de métodos de visita que
 * corresponde às classes concretas de componentes. As assinaturas dos
 * métodos de visita correspondem às classes concretas e permite que
 * o Visitor indetifique a classe exata do componente.
 */
interface Visitor {
  visitConcreteComponentA(element: ConcreteComponentA): void;

  visitConcreteComponentB(element: ConcreteComponentB): void;
}

/**
 * Visitors concretos implementam várias evrsões do mesmo algoritmo,
 * que pode ser usado com todas as classes concretas de componentes.
 *
 * Vemos o maior benefício do padrão Visitor quando usamos estruturas
 * complexas, como uma árvore Composite. Nesses casos, pode ser útil
 * armazenar algum estado intermediário do algoritmo ao executar os
 * métodos de visita entre vários objetos da estrutura. 
 */
class ConcreteVisitor1 implements Visitor {
  public visitConcreteComponentA(element: ConcreteComponentA): void {
  console.log(
    element.exclusiveMethodOfConcreteComponentA() 
    + " + ConcreteVisitor1"
  );
  }

  public visitConcreteComponentB(element: ConcreteComponentB): void {
  console.log(
    element.specialMethodOfConcreteComponentB()
    + " + ConcreteVisitor1"
  );
  }
}

class ConcreteVisitor2 implements Visitor {
  public visitConcreteComponentA(element: ConcreteComponentA): void {
  console.log(
    element.exclusiveMethodOfConcreteComponentA()
    + " + ConcreteVisitor2");
  }

  public visitConcreteComponentB(element: ConcreteComponentB): void {
  console.log(
    element.specialMethodOfConcreteComponentB()
    + " + ConcreteVisitor2"
  );
  }
}

/**
 * O código do cliente pode rodar operações do Visitor sobre qualquer
 * conjunto de elementos sem saber suas classes concretas.
 * O método component.accept dirige a chamada para as operações
 * apropriadas dos objetos Visitor.
 */
function clientCode(components: Component[], visitor: Visitor) {
  // ...
  for (const component of components) {
  component.accept(visitor);
  }
  // ...
}

const components = [
  new ConcreteComponentA(),
  new ConcreteComponentB(),
];

console.log('O código cliente opera com todos os Visitor via interface base:');
const visitor1 = new ConcreteVisitor1();
clientCode(components, visitor1);
console.log('');

console.log('Isso permite que o mesmo cliente opeer com diferentes Visitors');
const visitor2 = new ConcreteVisitor2();
clientCode(components, visitor2);

/**
 * 
 * Output.txt: Resultados da execução
 * O código cliente opera com todos os Visitor via interface base:
 * A + ConcreteVisitor1
 * B + ConcreteVisitor1
 * 
 * Isso permite que o mesmo cliente opeer com diferentes Visitors:
 * A + ConcreteVisitor2
 * B + ConcreteVisitor2
 */
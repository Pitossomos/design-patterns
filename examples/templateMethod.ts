/**
 * A AbstractClass define um método modelo que contém o núcleo de algum 
 * algoritmo, composto por chamadas para operações, geralmente,
 * primitivas e abstratas
 *
 * As subclasses concretas devem implementar essas operações, mas
 * manter o método modelo intacto.
 */
abstract class AbstractClass {
  /**
   * Método modelo que define o núcleo do algoritmo.
   */
  public templateMethod(): void {
    this.baseOperation1();
    this.requiredOperations1();
    this.baseOperation2();
    this.hook1();
    this.requiredOperation2();
    this.baseOperation3();
    this.hook2();
  }

  /**
   * Implementação base das operações.
   */
  protected baseOperation1(): void {
    console.log('AbstractClass: Fazendo o trabalho principal');
  }

  protected baseOperation2(): void {
    console.log('AbstractClass: As subclasses sobrescrevem as operações');
  }

  protected baseOperation3(): void {
    console.log('AbstractClass: Estou fazendo o trabalho sujo assim mesmo');
  }

  /**
   * As operações abstratas devem ser deixadas para as subclasses.
   */
  protected abstract requiredOperations1(): void;

  protected abstract requiredOperation2(): void;

  /**
   * Esses são os "hooks." As subclasses podem ou não sobrescrevê-los,
   * pois os hooks já tem implementação padrão (mas vazia).
   * Hooks proveem pontos de extensão adicionais em alguns pontos cruciais
   * do algoritmo.
   */
  protected hook1(): void { }

  protected hook2(): void { }
}

/**
 * Classes concretas devem implementar todas as operações abstratas da
 * classe base. 
 * Elas também podem sobrescrever operações que já possuem uma 
 * implementação padrão.
 */
class ConcreteClass1 extends AbstractClass {
  protected requiredOperations1(): void {
    console.log('ConcreteClass1: Implementou Operation1');
  }

  protected requiredOperation2(): void {
    console.log('ConcreteClass1: Implementou Operation2');
  }
}

/**
 * Em geral, classes concretas sobrescrevem apenas parte das operações 
 * da classe base.
 */
class ConcreteClass2 extends AbstractClass {
  protected requiredOperations1(): void {
    console.log('ConcreteClass2: Implementou Operation1');
  }

  protected requiredOperation2(): void {
    console.log('ConcreteClass2: Implementou Operation2');
  }

  protected hook1(): void {
    console.log('ConcreteClass2: Sobrescreveu Hook1');
  }
}

/**
 * O código cliente chama o método modelo para executar o algoritmo,
 * sem saber a classe concreta do objeto que irá operar, desde que
 * utilize os objetos pela interface da classe base.
 */
function clientCode(abstractClass: AbstractClass) {
  // ...
  abstractClass.templateMethod();
  // ...
}

console.log('O mesmo código cliente pode operar com diferentes subclasses:');
clientCode(new ConcreteClass1());
console.log('');

console.log('O mesmo código cliente pode operar com diferentes subclasses:');
clientCode(new ConcreteClass2());

/*  Output.txt: Resultados da execução
 * O mesmo código cliente pode operar com diferentes subclasses:
 * AbstractClass: Fazendo o trabalho principal
 * ConcreteClass1 says: Implementou Operation1
 * AbstractClass: As subclasses sobrescrevem as operações
 * ConcreteClass1 says: Implementou Operation2
 * AbstractClass says: Estou fazendo o trabalho sujo assim mesmo
 * 
 * O mesmo código cliente pode operar com diferentes subclasses:
 * AbstractClass says: Fazendo o trabalho principal
 * ConcreteClass2 says: Implementou Operation1
 * AbstractClass: As subclasses sobrescrevem as operações
 * ConcreteClass2 says: Sobrescreveu Hook1
 * ConcreteClass2 says: Implementou Operation2
 * AbstractClass says: Estou fazendo o trabalho sujo assim mesmo
 * */

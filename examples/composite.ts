/**
 * A classe base Component declara operações comuns para os objetos de uma 
 * composição, sejam simples ou complexos.
 */
abstract class Component {
  protected parent!: Component | null;

  /**
   * Opcionalmente, o Component pode declarar uma interface de setter e getter
   * para o componente pai em uma estrutura de árvore, bem como prover uma
   * implementação padrão para esses métodos
   */
  public setParent(parent: Component | null) {
    this.parent = parent;
  }

  public getParent(): Component | null {
    return this.parent;
  }

  /**
   * Em alguns casos, pode ser benéfico definir operações de gestão dos filhos
   * diretamente na classe base Component. Desa forma, não precisamos expor
   * classes concretas de componentes para o código cliente, mesmo durante a
   * montagem da árvore de objetos. Por outro lado, esses métodos serão vazios 
   * para os componentes Leaf, nas pontas da árvore.
   */
  public add(component: Component): void { }

  public remove(component: Component): void { }

  /**
   * Podemos prover um método que mostra ao cliente se um componente pode
   * ou não comportar filhos.
   */
  public isComposite(): boolean {
    return false;
  }

  /**
   * O Component base pode implementar algum comportamento padrão ou deixá-lo
   * para as classes concretas (declarando o método como "abstract").
   */
  public abstract operation(): string;
}

/**
 * A classe Leaf representa um objeto na ponta de uma composição, ou seja, have
 * que não pode ter nenhum filho.
 *
 * Em geral, o objeto Leaf é que faz o trabalho real, enquanto o objeto Composite
 * apenas delega chamada para seus sub-componentes. 
 */
class Leaf extends Component {
  public operation(): string {
    return 'Leaf';
  }
}

/**
 * A classe Composite representa o objeto complexo que pode ter filhos. 
 * Em geral, o Composite delega o trabalho a seus filhos e agrega o resultado.
 */
class Composite extends Component {
  protected children: Component[] = [];

  /**
   * Um objeto Composite pode adicionar ou remover outros componentes (simples
   * ou complexos) de sua lista de filhos.
   */
  public add(component: Component): void {
    this.children.push(component);
    component.setParent(this);
  }

  public remove(component: Component): void {
    const componentIndex = this.children.indexOf(component);
    this.children.splice(componentIndex, 1);

    component.setParent(null);
  }

  public isComposite(): boolean {
    return true;
  }

  /**
   * O Composite executa sua lógica primária de um modo específico, 
   * percorrendo resursivamente por seus filhos, coletando e agregando os
   * resultados. Como os filhos passam as chamadas para seus próprios filhos
   * e assim por diante, toda a árvore é percorrida como resultado.
   */
  public operation(): string {
    const results:string[] = [];
    for (const child of this.children) {
      results.push(child.operation());
    }

    return "Galho("+results.join('+');
  }
}

/**
 * o código cliente opera com todos os componentes via interface base.
 */
function clientCode(component: Component) {
  // ...

  console.log(`RESULT: ${component.operation()}`);

  // ...
}

/**
 * Assim, o código cliente pode operar com componentes Leaf simples...
 */
const simple = new Leaf();
console.log('Cliente: Tenho um componente simples:');
clientCode(simple);
console.log('');

/**
 * ...bem como objectos complexos Composite.
 */
const tree = new Composite();
const branch1 = new Composite();
branch1.add(new Leaf());
branch1.add(new Leaf());
const branch2 = new Composite();
branch2.add(new Leaf());
tree.add(branch1);
tree.add(branch2);
console.log('Cliente: Tenho uma árvore complexa:');
clientCode(tree);
console.log('');

/**
 * Graças às operações de gestão dos filhos do Component base, o código cliente
 * pode operar com qualquer componente, simples ou complexo, independente de sua
 * classe concreta.
 */
function clientCode2(component1: Component, component2: Component) {
  // ...

  if (component1.isComposite()) {
    component1.add(component2);
  }
  console.log("RESULTADO: " + component1.operation());

  // ...
}

console.log('Cliente: Não preciso saber as classes mesmo ao gerir a árvore:');
clientCode2(tree, simple);
CODE_EXAMPLES = {
  "Abstract Factory": `
/**
 * A interface Abstract Factory declara um conjunto de métodos que retornam
 * diferentes produtos abstratos. Esses produtos são chamados de família e
 * são relacionados entre si por um tema ou conceito de alto nível.
 * 
 * Produtos de uma família em geral conseguem colaborar entre sim.
 * Uma afmília pode ter variantes, sendo os produtos de uma variante 
 * incompatíveis com os produtos de outra variante.
 */
interface AbstractFactory {
  createProductA(): AbstractProductA;

  createProductB(): AbstractProductB;
}

/**
 * Factories concretas produzem uma família de produtos de uma única variante.
 * A Factory garante que os produtos resultantes são compatíveis.
 * Note que as assinaturas dos métodos da factory concreta retornam produtos
 * abstratos, mas dentro do método o produto concreto é instanciado.
 */
class ConcreteFactory1 implements AbstractFactory {
  public createProductA(): AbstractProductA {
    return new ConcreteProductA1();
  }

  public createProductB(): AbstractProductB {
    return new ConcreteProductB1();
  }
}

/**
 * Cada Factory concreta tem uma variante de produto correspondente.
 */
class ConcreteFactory2 implements AbstractFactory {
  public createProductA(): AbstractProductA {
    return new ConcreteProductA2();
  }

  public createProductB(): AbstractProductB {
    return new ConcreteProductB2();
  }
}

/**
 * Cada produto de uma família deve ter uma interface base.
 * Todas as variantes do produto devem implementar essa interface
 */
interface AbstractProductA {
  usefulFunctionA(): string;
}

/**
 * Os produtos concretos são criados pelas factories concretas correspondentes.
 */
class ConcreteProductA1 implements AbstractProductA {
  public usefulFunctionA(): string {
    return 'The result of the product A1.';
  }
}

class ConcreteProductA2 implements AbstractProductA {
  public usefulFunctionA(): string {
    return 'The result of the product A2.';
  }
}

/**
 * Esta é a interface base de outro produto. 
 * Todos os produtos podem interagir entre si, mas interação adequada 
 * só é possível entre produtos da mesma variante concreta.
 */
interface AbstractProductB {
  /**
   * O ProductB pode ter seu próprio comportamento...
   */
  usefulFunctionB(): string;

  /**
   * ...mas também pode colaborar com o ProductA.
   *
   * A Abstract Factory torna certo que os produtos criados 
   * são de uma mesma variante, e portanto, compatíveis.
   */
  anotherUsefulFunctionB(collaborator: AbstractProductA): string;
}

/**
 * Cada Product concreto é criado usando sua própria Factory concreta.
 */
class ConcreteProductB1 implements AbstractProductB {

  public usefulFunctionB(): string {
    return 'O resultado do produto B1.';
  }

  /**
   * A variante ProductB1, só consegue operar corretamente com a variante
   * do ProductA1. Mesmo assim, ela aceita qualquer instância de AbstractProductA
   * como argumento.
   */
  public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.usefulFunctionA();
    return "O resultado de B1 colaborando com " + result;
  }
}

class ConcreteProductB2 implements AbstractProductB {

  public usefulFunctionB(): string {
    return 'O resultado do produto B2.';
  }

  /**
   * A variante ProductB2 só consegue operar corretamente com a variante
   * do ProductA2. Mesmo assim, ela aceita qualquer instância de AbstractProductA
   * como argumento.
   */
  public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.usefulFunctionA();
    return "O resultado de B2 colaborando com " + result ;
  }
}

/**
 * O código do cliente opera com factories e products somente pelos tipos abstratos:
 * AbstractFactory e AbstractProduct. Isso permite passar qualquer subclasse de 
 * factory ou product para o código cliente sem quebrá-lo.
 */
function clientCode(factory: AbstractFactory) {
  const productA = factory.createProductA();
  const productB = factory.createProductB();

  console.log(productB.usefulFunctionB());
  console.log(productB.anotherUsefulFunctionB(productA));
}

/**
 * O código do cliente pode operar com qualquer factory concreta.
 */
console.log('Client: Testando o código do cliente com a primeira factory...');
clientCode(new ConcreteFactory1());

console.log('');

console.log('Client: Testando o código do cliente com a segunda factor...');
clientCode(new ConcreteFactory2());
`,
  "Factory Method": `
/**
 * A classe Creator declara o método factoryMethod que deve retornar um 
 * objeto da classe Product.
 * As subclasses em geral vão fornecer a implementação desse método.
 */

abstract class Creator {
  /**
   * A classe Creator pode ou não fornecer uma implementação do método.
   */
  public abstract factoryMethod(): Product;

  /**
   * A responsabilidade principal da classe não é criar produtos.
   * Em geral, ela contém uma lógica central do negócio baseada no objeto
   * criado pelo método factoryMethod (Product).
   * As subclasses podem indiretamente mudar essa lógica sobrescrevendo 
   * o factoryMethod e retornando um tipo diferente de objeto.
   */
  public someOperation(): string {
    // Chama o método para criar o objeto Product.
    const product = this.factoryMethod();
    // Depois, usa o objeto criado Product.
    return "Creator: O mesmo código funcionou com " + product.operation();
  }
}

/**
 * Subclasses concretas sobrescrevem o factoryMethod alterado o objeto retornado.
 */
class ConcreteCreator1 extends Creator {
  /**
   * A assinatura do médoto ainda usa o tipo abstrato, 
   * mesmo que um objeto concreto seja retornado.
   * Assim, a classe Creator fica independente das classes de objetos concretos.
   */
  public factoryMethod(): Product {
    return new ConcreteProduct1();
  }
}

class ConcreteCreator2 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct2();
  }
}

/**
 * A interface Product declara as operações que todos os objetos concretos implementarão.
 */
interface Product {
  operation(): string;
}

/**
 * Objetos concretos definem várias implementações concretas da interface Product.
 */
class ConcreteProduct1 implements Product {
  public operation(): string {
    return '{Resultado do ConcreteProduct1}';
  }
}

class ConcreteProduct2 implements Product {
  public operation(): string {
    return '{Resultado do ConcreteProduct2}';
  }
}

/**
 * O código cliente usa uma instancia de um Creator concreto, 
 * sempre referenciando a classe abstrata.
 * Dessa forma, sempre é possível alterar entre as subclasses.
 */
function clientCode(creator: Creator) {
  // ...
  console.log('Cliente: Eu não conheço a classe concreta, mesmo assim funciono.');
  console.log(creator.someOperation());
  // ...
}

/**
 * A aplicação define um tipo de Creator dependendo da configuração ou do ambiente.
 */
console.log('App: Iniciado com ConcreteCreator1.');
clientCode(new ConcreteCreator1());
console.log('');

console.log('App: Iniciado com ConcreteCreator2.');
clientCode(new ConcreteCreator2());
`,
  "Builder": `
/**
 * A interface Builder define os métodos para criar as diferentes
 * partes da classe Produto
 */
interface Builder {
  producePartA(): void;
  producePartB(): void;
  producePartC(): void;
}

/**
 * O Builder concreto segue a interface Builder e implementa os métodos
 * das etapas de construção.  
 * Podem haver variações dos builders, com implementações distintas.
 */
class ConcreteBuilder1 implements Builder {
  private product: Product1;

  /**
   * A nova instancia do Builder deve conter um objeto vazio, 
   * a ser montado posteriormente.
   */
  constructor() {
    this.reset();
  }

  public reset(): void {
    this.product = new Product1();
  }

  /**
   * Todas as etapas da produção devem funcionar com a mesma instância do produto.
   */
  public producePartA(): void {
    this.product.parts.push('PartA1');
  }

  public producePartB(): void {
    this.product.parts.push('PartB1');
  }

  public producePartC(): void {
    this.product.parts.push('PartC1');
  }

  /**
   * Builders concreto devem ter um método para retornar resultados. 
   * Afinal, vários builders podem criar produtos diferentes que 
   * não seguem a mesma interface.
   * Assim, esses métodos não podem ser declarados na interface base Builder.
   *
   * Em geral, após retornar o resultado final ao cliente, espera-se que uma
   * instância do Builder esteja pronta para produzir um novo produto.
   * Sendo assim, é usual indicar um método reset() ao final do getProduct()
   * Este não é um comportamento obrigatório, e o reset() pode ser 
   * definido e acionado diretamente pelo cliente.
   */
  public getProduct(): Product1 {
    const result = this.product;
    this.reset();
    return result;
  }
}

/**
 * Deve-se usar o padrão Builder apenas para produtos complexos, 
 * que requerem configuração extensiva.
 *
 * Ao contrário a outros padrões criacionais, diferentes builders concretos podem
 * produzir produtos não relacionados. Ou seja, variações dos Builders 
 * podem não seguir a mesma interface.
 */
class Product1 {
  public parts: string[] = [];

  public listParts(): void {
    console.log("Product parts: " + this.parts.join(', ') + "\\n");
  }
}

/**
 * O Director é responsável apenas por executar as etapas de produção
 * em uma sequência particular.
 * É útil mas opcional, pois o cliente pode controlar o Builder diretamente.
 */
class Director {
  private builder: Builder;

  /**
   * O Director funciona com qualquer instância de Builder que o cliente passe.
   * Assim, o código do cliente pode alterar o tipo final do novo produto.
   */
  public setBuilder(builder: Builder): void {
    this.builder = builder;
  }

  /**
   * O Director pode construir variações dos produtos usando 
   * os mesmos métodos de etapas.
   */
  public buildMinimalViableProduct(): void {
    this.builder.producePartA();
  }

  public buildFullFeaturedProduct(): void {
    this.builder.producePartA();
    this.builder.producePartB();
    this.builder.producePartC();
  }
}

/**
 * O código do cliente cria um Builder, passa para o Director e inicia a construção.
 * O resultado final é retornado do objeto Builder.
 */
function clientCode(director: Director) {
  const builder = new ConcreteBuilder1();
  director.setBuilder(builder);

  console.log('Standard basic product:');
  director.buildMinimalViableProduct();
  builder.getProduct().listParts();

  console.log('Standard full featured product:');
  director.buildFullFeaturedProduct();
  builder.getProduct().listParts();

  // Remember, the Builder pattern can be used without a Director class.
  console.log('Custom product:');
  builder.producePartA();
  builder.producePartC();
  builder.getProduct().listParts();
}

const director = new Director();
clientCode(director);
`,
  "Prototype": `
/**
 * Uma classe com habilidade de clonagem. 
 */
class Prototype {
  public primitive: any;
  public component: object;
  public circularReference: ComponentWithBackReference;

  public clone(): this {
    const clone = Object.create(this);

    clone.component = Object.create(this.component);

    // Clonar um objeto com objetos aninhados e referência circular requer 
    // tratamento especial. Nesse caso, depois da clonagem, o objeto aninhado
    // deve apontar para o objeto clonado e não para o objeto original.
    // Operadores spread podem ser úteis nesse caso.
    
    clone.circularReference = {
      ...this.circularReference,
      prototype: { ...this },
    };

    return clone;
  }
}

class ComponentWithBackReference {
  public prototype;

  constructor(prototype: Prototype) {
    this.prototype = prototype;
  }
}

/**
 * Código cliente.
 */
function clientCode() {
  const p1 = new Prototype();
  p1.primitive = 245;
  p1.component = new Date();
  p1.circularReference = new ComponentWithBackReference(p1);

  const p2 = p1.clone();
  if (p1.primitive === p2.primitive) {
    console.log('Campos de valores primitivos foram carregados para o clone. Yay!');
  } else {
    console.log('Campos de valores primitivos não foram copiados. Booo!');
  }
  if (p1.component === p2.component) {
    console.log('O componente simples não foi clonado. Booo!');
  } else {
    console.log('O componente simples foi clonado! Yay!');
  }

  if (p1.circularReference === p2.circularReference) {
    console.log('O componente com referência circular não foi clonado. Booo!');
  } else {
    console.log('O componente com referência circular foi clonado. :)');
  }

  if (p1.circularReference.prototype === p2.circularReference.prototype) {
    console.log('O objeto com referência circular não está ligado ao original. Booo!');
  } else {
    console.log('O objeto com referência circular está ligado ao objeto original :)');
  }
}

clientCode();
`,
  "Singleton": `
/**
 * A classe Singleton define um getter estático para acessar sua instância única.
 */
class Singleton {
  static #instance: Singleton;

  /**
   * O construtor sempre será privado, evitando a criação de instâncias pelo cliente.
   */
  private constructor() { }

  /**
   * O getter estático controla o acesso à instãncia do Singleton.
   * 
   * Isso permite que estender a classe Singleton mantendo apenas uma
   * instância de cada subclasse.
   */
  public static get instance(): Singleton {
    if (!Singleton.#instance) {
      Singleton.#instance = new Singleton();
    }

    return Singleton.#instance;
  }

  /**
   * Por fim, qualquer singleton pode definir lógica de negócio, 
   * a ser executada na instância específica
   */
  public someBusinessLogic() {
    // ...
  }
}

/**
 * Código cliente.
 */
function clientCode() {
  const s1 = Singleton.instance;
  const s2 = Singleton.instance;

  if (s1 === s2) {
    console.log(
      'Singleton funciona, ambas variáveis contém a mesma instância.'
    );
  } else {
    console.log('Singleton falhou, variáveis com instâncias distintas.');
  }
}

clientCode();
`,
  "Adapter": `
/**
 * O Target define uma interface específica do domínio usada pelo código do cliente.
 */
class Target {
  public request(): string {
    return 'Target: O comportamento padrão do alvo.';
  }
}

/**
 * O Adaptee é a classe a ser adaptada. Ele contém um comportamento útil, 
 * mas sua interface é incompatível com o código do cliente. 
 * O Adaptee precisa de ser adaptado antes de ser usado pelo código do cliente.
 */
class Adaptee {
  public specificRequest(): string {
    return '.eetpadA eht fo roivaheb laicepS';
  }
}

/**
 * O Adapter torna a interface do Adaptee compatível com a interface do Target.
 */
class Adapter extends Target {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
    super();
    this.adaptee = adaptee;
  }

  public request(): string {
    const result = this.adaptee.specificRequest().split('').reverse().join('');
    return "Adapter: (TRADUZIDO) " + result;
  }
}

/**
 * O código do cliente suporta todas as classes que seguem a interface Target.
 */
function clientCode(target: Target) {
  console.log(target.request());
}

console.log('Client: Eu posso trabalhar bem com objetos Target.');
const target = new Target();
clientCode(target);

console.log('');

const adaptee = new Adaptee();
console.log('Client: O Adaptee tem uma interface estranha que eu não entendo:');
console.log('Adaptee: ' + adaptee.specificRequest());

console.log('');

console.log('Client: Mas posso operá-la via Adapter:');
const adapter = new Adapter(adaptee);
clientCode(adapter);
`, 
  "Bridge": `
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
 `,
  "Composite": `
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

  console.log("RESULT: " + component.operation());

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
`,
  "Decorator": `
/**
 * A interface base Component define operações que podem ser alteradas por
 * Decorators.
 */
interface Component {
    operation(): string;
}

/**
 * As classes concretas de Components implementam os padrões das operações. 
 * Podem haver várias variações dessas classes.
 */
class ConcreteComponent implements Component {
    public operation(): string {
        return 'ConcreteComponent';
    }
}

/**
 * A classe base Decorator segue a mesma interface Component dos demais.
 * Seu propósito principal é definir a interface que envolverá todos os 
 * Decorators concretos. O Decorator padrão pode incluir o campo para 
 * armazenar o Component envolvido e os meios para inicializá-lo.
 */
class Decorator implements Component {
    protected component: Component;

    constructor(component: Component) {
        this.component = component;
    }

    /**
     * O Decorator delega todo o trabalho para o componente envolvido.
     */
    public operation(): string {
        return this.component.operation();
    }
}

/**
 * Os Decorators concretos chamam o objeto envolvido alteram seu resultado.
 */
class ConcreteDecoratorA extends Decorator {
    /**
     * Decorators concretos podem chamar a implementação herdada da operação,
     * ao invés de chamar o objeto envolvido diretamente. Essa abordagem
     * simplifica a extensão da classe Decorator.
     */
    public operation(): string {
        return "ConcreteDecoratorA("+super.operation();
    }
}

/**
 * Decorators concretos podem executar seu comportamento antes ou depois da
 * chamada do objeto envolvido.
 */
class ConcreteDecoratorB extends Decorator {
    public operation(): string {
        return "ConcreteDecoratorB("+super.operation();
    }
}

/**
 * O código cliente opera com todos os objetos usando a interface Component.
 * Assim, ele se torna independente da classe concreta do objeto.
 */
function clientCode(component: Component) {
    // ...

    console.log("RESULT: "+component.operation());

    // ...
}

/**
 * O código cliente pode operar com componentes simples...
 */
const simple = new ConcreteComponent();
console.log('Cliente: Tenho um componente simples:');
clientCode(simple);
console.log('');

/**
 * ...e com componentes decorados.
 *
 * Veja que Decorators podem envolver componentes ou mesmo outros decorators.
 */
const decorator1 = new ConcreteDecoratorA(simple);
const decorator2 = new ConcreteDecoratorB(decorator1);
console.log('Cliente: Agora eu tenho um componente decorado.');
clientCode(decorator2);
`,
  "Facade": `
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
`,
  "Flyweight": `
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
`,
  "Proxy": `
/**
 * A interface Subject declara operações comuns para o RealSubject e o Proxy.
 * Enquanto o cliente trabalha com o RealSubject usando essa interface,
 * você poderá passar um proxy no lugar de um sujeito real.
 */
interface Subject {
  request(): void;
}

/**
 * O RealSubject contém a lógica central do negócio e, usualmente, 
 * realiza algum trabelho útil, que pode ser lento ou sensível, p.ex.,
 * corrigir dados de entrada. Um Proxy pode resolver esses problemas
 * sem mudanças no código do RealSubject.
 */
class RealSubject implements Subject {
  public request(): void {
    console.log('RealSubject: Manipulando a requisição.');
  }
}

/**
 * A classe Proxy implementa a mesma interface do RealSubject.
 */
class Proxy implements Subject {
  private realSubject: RealSubject;

  /**
   * A Proxy mantém a referência a um objeto do tipo RealSubject.
   * Ela pode ser passada pelo cliente ou carregada por lazy loading.
   */
  constructor(realSubject: RealSubject) {
    this.realSubject = realSubject;
  }

  /**
   * As aplicações mais comuns do padrão Proxy envolvem: lazy loading, cache,
   * controle de acesso, logs, etc. Um Proxy pode realizar uma dessas tarefas
   * e, dependendo do resultado, passar a execução para o mesmo método de seu
   * RealSubject associado.
   */
  public request(): void {
    if (this.checkAccess()) {
      this.realSubject.request();
      this.logAccess();
    }
  }

  private checkAccess(): boolean {
    // Algumas verificações são feitas.
    console.log('Proxy: Verificando acesso antes do disparo da requisição.');

    return true;
  }

  private logAccess(): void {
    console.log('Proxy: Preparando os logs do acesso.');
  }
}

/**
 * Espera-se que código do cliente opere com todos os objetos (tanto RealSubject
 * quanto Proxy) via interface Subject. Na vida real, no entanto, os clientes 
 * operam quase sempre com os RealSubjects diretamente. Nesse caso, para 
 * implementar o padrão mais facilmente, você pode estender o Proxy a partir 
 * da classe RealSubject.
 */
function clientCode(subject: Subject) {
  // ...

  subject.request();

  // ...
}

console.log('Cliente: Executando o código cliente com um RealSubject:');
const realSubject = new RealSubject();
clientCode(realSubject);

console.log('');

console.log('Cliente: Executando o mesmo código cliente com uma Proxy:');
const proxy = new Proxy(realSubject);
clientCode(proxy);
`,
  "Chain of Responsibility": `
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
`,
  "Command": `
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
`,
  "Iterator": `
/**
 * Padrão Iterator
 * 
 * Intenção: Permitir percorrer os elementos de uma coleção sem expor sua
 * representação interior (lista, stack, árvore, etc.)
 *
 */

interface MyIterator<T> {
  // Retorna o elemento atual
  current(): T;

  // Retorna o elemento atual e move o iterador para o próximo elemento.
  next(): T;

  // Retorna a key do elemento atual
  key(): number;

  // Verifica se a posição autal é válida
  valid(): boolean;

  // Volta o iterador à primeira posição da coleção.
  rewind(): void;
}

interface Aggregator {
  // Recupera um Iterator externo.
  getIterator(): MyIterator<string>;
}

/**
 * Iterators concretos: implementam vários algoritmos de percurso.
 * Essas classes armazenam a posição atual do percurso a todo momento.
 */

class AlphabeticalOrderIterator implements MyIterator<string> {
  private collection: WordsCollection;

  /**
   * Armazena a posição atual no percurso. Um iterator pode ter vários outros
   * campos para armazenar o estado da iteração, especialmente quando o 
   * Iterator opera apenas com um tipo particular de coleção.
   */
  private position: number = 0;

  /**
   * Essa variável indica a direção do percurso.
   */
  private reverse: boolean = false;

  constructor(collection: WordsCollection, reverse: boolean = false) {
    this.collection = collection;
    this.reverse = reverse;

    if (reverse) {
      this.position = collection.getCount() - 1;
    }
  }

  public rewind() {
    this.position = this.reverse ?
      this.collection.getCount() - 1 :
      0;
  }

  public current(): string {
    return this.collection.getItems()[this.position];
  }

  public key(): number {
    return this.position;
  }

  public next(): string {
    const item = this.collection.getItems()[this.position];
    this.position += this.reverse ? -1 : 1;
    return item;
  }

  public valid(): boolean {
    if (this.reverse) {
      return this.position >= 0;
    }

    return this.position < this.collection.getCount();
  }
}

/**
 * Coleções concretas oferecem um ou mais métodos para recuperar 
 * novas instâncias de Iterator, compatíveis com a classe.
 */
class WordsCollection implements Aggregator {
  private items: string[] = [];

  public getItems(): string[] {
    return this.items;
  }

  public getCount(): number {
    return this.items.length;
  }

  public addItem(item: string): void {
    this.items.push(item);
  }

  public getIterator(): MyIterator<string> {
    return new AlphabeticalOrderIterator(this);
  }

  public getReverseIterator(): MyIterator<string> {
    return new AlphabeticalOrderIterator(this, true);
  }
}

/**
 * O código cliente pode ou não conhecer o Iterator concreto ou a 
 * classe de coleção, dependendo do nível de vinculação desejado 
 * para o projeto. 
 */
const collection = new WordsCollection();
collection.addItem('Primeiro');
collection.addItem('Segundo');
collection.addItem('Terceiro');

const iterator = collection.getIterator();

console.log('Percurso direto:');
while (iterator.valid()) {
  console.log(iterator.next());
}

console.log('');
console.log('Percurso reverso:');
const reverseIterator = collection.getReverseIterator();
while (reverseIterator.valid()) {
  console.log(reverseIterator.next());
}

/*
 * Output.txt: Resultados da execução
 *
 * Percurso direto:
 * Primeiro
 * Segundo
 * Terceiro

 * Percurso reverso:
 * Terceiro
 * Segundo
 * Primeiro
 */
  `,
  "Mediator": `
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
  `,
  
}
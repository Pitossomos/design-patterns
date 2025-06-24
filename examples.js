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
}
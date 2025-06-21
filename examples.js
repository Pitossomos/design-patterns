CODE_EXAMPLES = {
    "Abstract Factory": `
/**
 * A interface Abstract Factory declara um conjunto de métodos que retornam
 * diferentes produtos abstratos. Esses produtos são chamados de família e
 * são relacionados entre si por um tema ou conceito de alto nível.
 * 
 * Produtos de uma família em geral conseguem colaborar entre sim.
 * Uma afmília pode ter variantes, sendo os produtos de uma variante incompatíveisable 
 * com os produtos de outra variante.
 */
interface AbstractFactory {
    createProductA(): AbstractProductA;

    createProductB(): AbstractProductB;
}

/**
 * Factories concretas produzem uma família de produtos que pertence a uma única variante
 * A factory garante que os produtos resultantes são compatíveis. Note que as assinaturas 
 * dos métodos da factory concreta retornam produtos abstratos, mas dentro do método o produto
 * concreto é instanciado.
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
 * Here's the the base interface of another product. All products can interact
 * with each other, but proper interaction is possible only between products of
 * the same concrete variant.
 */
interface AbstractProductB {
    /**
     * Product B is able to do its own thing...
     */
    usefulFunctionB(): string;

    /**
     * ...but it also can collaborate with the ProductA.
     *
     * The Abstract Factory makes sure that all products it creates are of the
     * same variant and thus, compatible.
     */
    anotherUsefulFunctionB(collaborator: AbstractProductA): string;
}

/**
 * These Concrete Products are created by corresponding Concrete Factories.
 */
class ConcreteProductB1 implements AbstractProductB {

    public usefulFunctionB(): string {
        return 'The result of the product B1.';
    }

    /**
     * The variant, Product B1, is only able to work correctly with the variant,
     * Product A1. Nevertheless, it accepts any instance of AbstractProductA as
     * an argument.
     */
    public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
        const result = collaborator.usefulFunctionA();
        return "The result of the B1 collaborating with the " + result;
    }
}

class ConcreteProductB2 implements AbstractProductB {

    public usefulFunctionB(): string {
        return 'The result of the product B2.';
    }

    /**
     * The variant, Product B2, is only able to work correctly with the variant,
     * Product A2. Nevertheless, it accepts any instance of AbstractProductA as
     * an argument.
     */
    public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
        const result = collaborator.usefulFunctionA();
        return "The result of the B2 collaborating with the " + result ;
    }
}

/**
 * The client code works with factories and products only through abstract
 * types: AbstractFactory and AbstractProduct. This lets you pass any factory or
 * product subclass to the client code without breaking it.
 */
function clientCode(factory: AbstractFactory) {
    const productA = factory.createProductA();
    const productB = factory.createProductB();

    console.log(productB.usefulFunctionB());
    console.log(productB.anotherUsefulFunctionB(productA));
}

/**
 * The client code can work with any concrete factory class.
 */
console.log('Client: Testing client code with the first factory type...');
clientCode(new ConcreteFactory1());

console.log('');

console.log('Client: Testing the same client code with the second factory type...');
clientCode(new ConcreteFactory2());
`,
    "Factory Method": `
/**
 * A classe Creator declara o método factoryMethod que deve retornar um objeto da classe Product 
 * As subclasses em geral vão fornecer a implementação desse método.
 */

abstract class Creator {
    /**
     * A classe Creator pode ou não fornecer uma implementação do método.
     */
    public abstract factoryMethod(): Product;

    /**
     * A responsabilidade principal da classe não é criar produtos.
     * Em geral, ela contém uma lógica central do negócio baseada no objeto criado pelo método factoryMethod (Product).
     * As subclasses podem indiretamente mudar essa lógica sobrescrevendo o factoryMethod e retornando um tipo diferente de objeto.
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
     * A assinatura do médoto ainda usa o tipo abstrato, mesmo que um objeto seja retornado
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
 * A interface Product declara as operações que todos os objetos concretos vão implementar.
 */
interface Product {
    operation(): string;
}

/**
 * Objetos concretos definem várias implementações concretas da interface Product.
 */
class ConcreteProduct1 implements Product {
    public operation(): string {
        return '{Result of the ConcreteProduct1}';
    }
}

class ConcreteProduct2 implements Product {
    public operation(): string {
        return '{Result of the ConcreteProduct2}';
    }
}

/**
 * O código cliente usa uma instancia de um Creator concreto, sempre referenciando a classe abstrata.
 * Dessa forma, sempre é possível alterar entre as subclasses.
 */
function clientCode(creator: Creator) {
    // ...
    console.log('Client: Eu não conheço a classe concreta, mesmo assim funciono.');
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
 * A interface Builder define os métodos para criar as diferentes partes da classe Produto
 */
interface Builder {
    producePartA(): void;
    producePartB(): void;
    producePartC(): void;
}

/**
 * O Builder concreto segue a interface Builder e implementa os métodos das etapas de construção.  
 * Podem haver variações dos builders, com implementações distintas.
 */
class ConcreteBuilder1 implements Builder {
    private product: Product1;

    /**
     * A nova instancia do Builder deve conetr um objeto vazio, a ser montado posteriormente.
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
     * Afinal, vários builders podem criar produtos diferentes que não seguem a mesma interface.
     * Assim, esses métodos não podem ser declarados na interface base Builder.
     *
     * Em geral, após retornar o resultado final ao cliente, espera-se que uma
     * instância do Builder esteja pronta para produzir um novo produto.
     * Sendo assim, é usual indicar um método reset() ao final do getProduct()
     * Este não é um comportamento obrigatório, e o reset() pode ser definido e acionado
     * diretamente pelo cliente.
     */
    public getProduct(): Product1 {
        const result = this.product;
        this.reset();
        return result;
    }
}

/**
 * Deve-se usar o padrão Builder apenas para produtos complexos, que requerem configuração extensiva.
 *
 * Contrário a outros padrões criacionais, diferentes builders concretos podem
 * produzir produtos não relacionados. Ou seja, variações dos Builders 
 * podem não seguir a mesma interface.
 */
class Product1 {
    public parts: string[] = [];

    public listParts(): void {
        console.log("Product parts: " + this.parts.join(', ') + "\n");
    }
}

/**
 * O Director é responsável apenas por executar as etapas de produção em uma sequência particular.
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
     * O Director pode construir variações dos produtos usando os mesmos métodos de etapas.
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
        console.log('O componente com referência circular foi clonado. Yay!');
    }

    if (p1.circularReference.prototype === p2.circularReference.prototype) {
        console.log('O componente com referência circular não está ligado ao objeto original. Booo!');
    } else {
        console.log('O componente com referência circular está ligado ao objeto original.. Yay!');
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
}
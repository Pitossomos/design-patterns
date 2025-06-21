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
}
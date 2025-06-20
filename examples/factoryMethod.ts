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
        return "Creator: O mesmo código funcionou com ${product.operation()}";
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
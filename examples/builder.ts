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
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
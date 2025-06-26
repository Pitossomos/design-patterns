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
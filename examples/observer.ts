/**
 * A interface Subject declara um conjunto de métodos para gerir os subscribers
 */
interface Subject {
  // Acompla um observer ao subject.
  attach(observer: Observer): void;

  // Remove um observer de um subject.
  detach(observer: Observer): void;

  // Notifica todos os observers sobre um evento.
  notify(): void;
}

/**
 * O Subject detém uma informação importante (estado) e notifica os observers
 * quando esse estado muda.
 */
class ConcreteSubject implements Subject {
  /**
   * Por simplicidade, o estado do Subject, essencial para os observers,
   * é armazeadFor the nessa variável como number.
   */
  public state: number;

  /**
   * Lista de subscribers. Na vida real, pode ser armazenada de forma
   * mais compreensiva, categorizando por eventos, tipos, etc.
   */
  private observers: Observer[] = [];

  /**
   * Métodos de gerenciamento de subscrições.
   */
  public attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return console.log('Subject: Observader já foi acomplado.');
    }

    console.log('Subject: Acoplou um observer.');
    this.observers.push(observer);
  }

  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log('Subject: Observer inexistente.');
    }

    this.observers.splice(observerIndex, 1);
    console.log('Subject: Removeu um observer.');
  }

  /**
   * Aciona uma atualização em cada subscriber.
   */
  public notify(): void {
    console.log('Subject: Notificando observers...');
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  /**
   * Em geral, a lógica de subscrição é apenas uma fração do que um Subject
   * pode fazer. Além disso, ele pode conter lógicas importantes de negócio
   * que acionam notificações sempre que algo importante ocorre.
   */
  public someBusinessLogic(): void {
    console.log('\\nFazendo algo importante.');
    this.state = Math.floor(Math.random() * (10 + 1));

    console.log("Subject: Meu estado mudou para: " + this.state);
    this.notify();
  }
}

/**
 * A interface Observer declara o método update, usado pelos subjects.
 */
interface Observer {
  // Recebe atualizações do subject.
  update(subject: Subject): void;
}

/**
 * Concrete Observers reagem quando às atualizações dos Subjects aos
 * quais estão acoplados.
 */
class ConcreteObserverA implements Observer {
  public update(subject: Subject): void {
    if (subject instanceof ConcreteSubject && subject.state < 3) {
      console.log('ConcreteObserverA: Reagiu ao evento.');
    }
  }
}

class ConcreteObserverB implements Observer {
  public update(subject: Subject): void {
    if (subject instanceof ConcreteSubject && (subject.state === 0 || subject.state >= 2)) {
      console.log('ConcreteObserverB: Reagiu ao evento.');
    }
  }
}

/**
 * Código do cliente.
 */

const subject = new ConcreteSubject();

const observer1 = new ConcreteObserverA();
subject.attach(observer1);

const observer2 = new ConcreteObserverB();
subject.attach(observer2);

subject.someBusinessLogic();
subject.someBusinessLogic();

subject.detach(observer2);

subject.someBusinessLogic();

/*
 * 
 * Output.txt: Resultados da execução
 * Subject: Acoplou um observer.
 * Subject: Acoplou um observer.
 * 
 * Subject: Fazendo algo importante.
 * Subject: Meu estado mudou para: 6
 * Subject: Notificando observers...
 * ConcreteObserverB: Reagiu ao evento.
 * 
 * Subject: Fazendo algo importante.
 * Subject: Meu estado mudou para: 1
 * Subject: Notificando observers...
 * ConcreteObserverA: Reagiu ao evento.
 * Subject: Removeu um observer.
 * 
 * Subject: Fazendo algo importante.
 * Subject: Meu estado mudou para: 5
 * Subject: Notificando observers...
 */
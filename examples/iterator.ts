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
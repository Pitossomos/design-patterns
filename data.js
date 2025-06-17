const DESIGN_PATTERNS = [
  {
    name: "Padrões Criacionais",
    description: "Padrões que tratam da criação de objetos de forma controlada e flexível.",
    patterns: [
      {
        name: "Abstract Factory",
        description: "Uma interface para criar famílias de objetos relacionados sem especificar suas classes concretas.",
        icon: "fa-th-large",
      },
      {
        name: "Builder",
        description: "Separa a construção de um objeto complexo da sua representação, permitindo a criação passo a passo.",
        icon: "fa-tools",
      },
      {
        name: "Simple Factory",
        description: "Centraliza a criação de objetos em uma única função ou classe, sem herança.",
        icon: "fa-cube",
      },
      {
        name: "Factory Method",
        description: "Define uma interface para criar um objeto, mas permite que subclasses decidam qual classe instanciar.",
        icon: "fa-industry",
      },
      {
        name: "Prototype",
        description: "Uma abstração que permite a criação de objetos através de protótipos existentes",
        icon: "fa-copy",
      },
      {
        name: "Singleton",
        description: "A abstração que representa a classe como um objeto único",
        icon: "fa-sun",
      },
    ],
  },
  {
    name: "Padrões Estruturais",
    description: "Padrões que tratam da composição de classes e objetos para formar estruturas maiores.",
    patterns: [
      {
        name: "Adapter",
        description: "Uma abstração que permite a conversão de objetos não compatíveis em tipos esperados",
        icon: "fa-wrench",
      },
      {
        name: "Bridge",
        description: "Uma abstração que separa abstrações e implementações em classes distintas",
        icon: "fa-road",
      },
      {
        name: "Composite",
        description: "Uma abstração que representa objetos compostos por outros objetos",
        icon: "fa-folder",
      },
      {
        name: "Decorator",
        description: "Uma abstração que permite a adição de comportamentos adicionais a objetos existentes",
        icon: "fa-award",
      },
      {
        name: "Facade",
        description: "Uma abstração que oferece uma interface simplificada para complexas sistemas",
        icon: "fa-building",
      },
      {
        name: "Flyweight",
        description: "Uma abstração que reduz o uso de memória ao compartilhar objetos semelhantes",
        icon: "fa-cloud",
      },
      {
        name: "Proxy",
        description: "Uma abstração que permite a representação de objetos ausentes ou distantes por meio de um proxy",
        icon: "fa-forward",
      },
    ],
  },
  {
    name: "Padrões Comportamentais",
    description: "Padrões que tratam da interação e responsabilidade entre objetos.",
    patterns: [
      {
        name: "Chain of Responsibility",
        description: "Uma abstração que define uma cadeia de responsabilidades para lidar com requisições",
        icon: "fa-link",
      },
      {
        name: "Command",
        description: "Uma abstração que permite a definição de comandos que podem ser executados como objetos",
        icon: "fa-play",
      },
      {
        name: "Iterator",
        description: "Uma abstração que permite a iteração sobre conjuntos de dados iteráveis",
        icon: "fa-clock",
      },
      {
        name: "Mediator",
        description: "Uma abstração que permite a comunicação entre objetos através de um mediador",
        icon: "fa-user",
      },
      {
        name: "Memento",
        description: "Uma abstração que permite salvar e restaurar o estado de objetos",
        icon: "fa-save",
      },
      {
        name: "Observer",
        description: "Uma abstração que permite a notificação de mudanças em objetos",
        icon: "fa-eye",
      },
      {
        name: "Strategy",
        description: "Uma abstração que permite a escolha de algoritmos em execução",
        icon: "fa-chess-board",
      },
      {
        name: "State",
        description: "Uma abstração que permite a representação do estado de objetos em diferentes situações",
        icon: "fa-chart-bar",
      },
      {
        name: "Template Method",
        description: "Uma abstração que define um método comum para suas subclasses",
        icon: "fa-clone",
      },
      {
        name: "Visitor",
        description: "Uma abstração que permite a iteração sobre conjuntos de dados iteráveis",
        icon: "fa-plane",
      }
    ]
  }
];
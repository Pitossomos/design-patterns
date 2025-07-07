const nodes = [
  { id: "Página Principal", group: 1, connections: 3 },
  { id: "Ideias de Projeto", group: 2, connections: 2 },
  { id: "D3.js", group: 3, connections: 2 },
  { id: "CSS", group: 3, connections: 1 },
  { id: "JavaScript", group: 3, connections: 2 },
  { id: "Obsidian", group: 2, connections: 1 },
  { id: "Visualização de Dados", group: 3, connections: 2 },
];

// --- 1. DADOS ---
// Em um projeto real, você geraria isso dinamicamente,
// lendo seus arquivos e encontrando os links.

const links = [
  { source: "Página Principal", target: "Ideias de Projeto" },
  { source: "Página Principal", target: "Visualização de Dados" },
  { source: "Página Principal", target: "Obsidian" },
  { source: "Ideias de Projeto", target: "D3.js" },
  { source: "Visualização de Dados", target: "D3.js" },
  { source: "Visualização de Dados", target: "JavaScript" },
  { source: "D3.js", target: "JavaScript" },
  { source: "D3.js", target: "CSS" },
];

// --- 2. CONFIGURAÇÃO DO SVG E DIMENSÕES ---
const width = window.innerWidth;
const height = window.innerHeight;

const svg = d3.select("#graph-container")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", [-width / 2, -height / 2, width, height]);

// --- 3. SIMULAÇÃO DE FORÇA ---
// Aqui é onde a mágica do D3 acontece.
const simulation = d3.forceSimulation(nodes)
  // Força de Link: Puxa os nós conectados como uma mola.
  .force("link", d3.forceLink(links).id(d => d.id).distance(90))
  // Força de Carga: Faz os nós se repelirem. O valor negativo indica repulsão.
  .force("charge", d3.forceManyBody().strength(-200))
  // Força de Centro: Puxa todos os nós em direção ao centro do SVG.
  .force("center", d3.forceCenter(0, 0));

// --- 4. CRIAÇÃO DOS ELEMENTOS SVG ---

// Cria os elementos <line> para cada link
const link = svg.append("g")
  .attr("class", "links")
  .selectAll("line")
  .data(links)
  .join("line")
  .attr("class", "link");

// Cria um grupo <g> para cada nó, que conterá o círculo e o texto
const node = svg.append("g")
  .attr("class", "nodes")
  .selectAll("g")
  .data(nodes)
  .join("g");
  
// Adiciona os círculos aos grupos de nós
const circles = node.append("circle")
  .attr("class", "node")
  .attr("r", d => 5 + d.connections * 2) // Raio baseado no número de conexões
  .attr("fill", d => d.group === 1 ? "#ff6347" : (d.group === 2 ? "#4682b4" : "#3cb371"))
  .call(drag(simulation)); // Habilita o arraste

// Adiciona os rótulos de texto aos grupos de nós
const labels = node.append("text")
  .text(d => d.id)
  .attr("class", "label");

// --- 5. FUNÇÃO TICK - ATUALIZA AS POSIÇÕES ---
// A cada "passo" da simulação, esta função é chamada para atualizar
// as coordenadas (x, y) de todos os elementos.
simulation.on("tick", () => {
  link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

  node
    .attr("transform", d => `translate(${d.x},${d.y})`);
});

// --- 6. FUNCIONALIDADE DE ARRASTAR (DRAG) ---
function drag(simulation) {
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  return d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
}
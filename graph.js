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

const color = d3.scaleOrdinal(d3.schemeCategory10);

const svg = d3.select("#graph-container")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", [-width / 2, -height / 2, width, height]);

// --- 3. SIMULAÇÃO DE FORÇA ---
// Aqui é onde a mágica do D3 acontece.
const simulation = d3.forceSimulation(nodes)
  .force("charge", d3.forceManyBody().strength(-400))
  .force("link", d3.forceLink(links).id(d => d.id))
  .force("x", d3.forceX())
  .force("y", d3.forceY())
  
// --- 4. CRIAÇÃO DOS ELEMENTOS SVG ---
// Cria os elementos <line> para cada link
const link = svg.append("g")
  .attr("stroke", "#999")
  .attr("stroke-opacity", 0.6)
  .selectAll("line")
  .data(links)
  .join("line")

// Cria um grupo <g> para cada nó, que conterá o círculo e o texto
const node = svg.append("g")
  .attr("stroke", "#fff")
  .attr("stroke-width", 1.5)
  .selectAll("circle")
  .data(nodes)
  .join("circle")
  .attr("r", 8)
  .attr("fill", d => color(d.group));

node.append("title")
  .text(d => d.id);

node.call(d3.drag()
  .on("start", dragStarted)
  .on("drag", dragged)
  .on("end", dragEnded)
);

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
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
});

// --- 6. FUNCIONALIDADE DE ARRASTAR (DRAG) ---
function dragStarted(event, d) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  d.fx = event.x;
  d.fy = event.y;
}

function dragged(event, d) {
  d.fx = event.x;
  d.fy = event.y;
}

function dragEnded(event, d) {
  if (!event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}
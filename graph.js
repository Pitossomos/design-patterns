// --- 1. NODES & LINKS

const nodes = [];
const links = [];

DESIGN_PATTERNS.forEach((group, groupIndex) => {
  nodes.push({
    id: group.name,
    group: 1,
  });

  group.patterns.forEach((pattern) => {
    nodes.push({
      id: pattern.name,
      group: groupIndex + 2,
    });
    links.push({
      source: group.name,
      target: pattern.name,
    });
  });
});

// --- 2. CONFIGURAÇÃO DO SVG E DIMENSÕES ---
var width = window.innerWidth;
var height = window.innerHeight;

const color = d3.scaleOrdinal(d3.schemeCategory10);

const svg = d3
  .select("#graph-container")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", [-width / 2, -height / 2, width, height]);

window.addEventListener("resize", () => {
  console.log("Redimensionando o SVG");
  width = window.innerWidth;
  height = window.innerHeight;
  svg
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height]);
});

// --- 3. SIMULAÇÃO DE FORÇA ---
// Aqui é onde a mágica do D3 acontece.
const simulation = d3
  .forceSimulation(nodes)
  .force("charge", d3.forceManyBody().strength(-500))
  .force(
    "link",
    d3
      .forceLink(links)
      .strength(0.3)
      .id((d) => d.id)
  )
  .force("x", d3.forceX().strength(0.02))
  .force("y", d3.forceY().strength(0.05));

// --- 4. CRIAÇÃO DOS ELEMENTOS SVG ---
// Cria os elementos <line> para cada link
const link = svg
  .append("g")
  .attr("stroke", "#999")
  .attr("stroke-opacity", 0.6)
  .selectAll("line")
  .data(links)
  .join("line");

// Cria um grupo <g> para cada nó, que conterá o círculo e o texto
const node = svg
  .append("g")
  .attr("stroke", "#fff")
  .attr("stroke-width", 1.5)
  .selectAll("circle")
  .data(nodes)
  .join("g");

const circle = node
  .append("circle")
  .attr("cx", (d) => d.x)
  .attr("cy", (d) => d.y)
  .attr("r", 8)
  .attr("fill", (d) => color(d.group));

circle.append("title").text((d) => d.id);

const text = node
  .append("text")
  .text((d) => d.id)
  .attr("x", 12)
  .attr("y", 3)
  .attr("pointer-events", "none")
  .attr("stroke", "#999")
  .attr("font-size", "1em")
  .attr("stroke-width", 0.5);

circle.call(
  d3.drag().on("start", dragStarted).on("drag", dragged).on("end", dragEnded)
);

// --- 5. FUNÇÃO TICK - ATUALIZA AS POSIÇÕES ---
// A cada "passo" da simulação, esta função é chamada para atualizar
// as coordenadas (x, y) de todos os elementos.
simulation.on("tick", () => {
  nodes.forEach((d) => {
    d.x = Math.max(-width / 2 + 10, Math.min(width / 2 - 10, d.x));
    d.y = Math.max(-height / 2 + 10, Math.min(height / 2 - 10, d.y));
  });

  link
    .attr("x1", (d) => d.source.x)
    .attr("y1", (d) => d.source.y)
    .attr("x2", (d) => d.target.x)
    .attr("y2", (d) => d.target.y);

  circle.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

  text.attr("x", (d) => d.x + 12).attr("y", (d) => d.y + 3);
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

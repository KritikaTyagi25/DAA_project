async function runDFS() {
  const nodeCount = parseInt(document.getElementById("nodeCount").value);
  const edgesText = document.getElementById("edgesInput").value.trim();
  const startNode = parseInt(document.getElementById("startNode").value);

  const edges = edgesText.split('\n').map(line => {
    const [u, v] = line.trim().split(' ').map(Number);
    return { u, v };
  });

  const adj = Array.from({ length: nodeCount }, () => []);
  for (const { u, v } of edges) {
    adj[u].push(v);
    adj[v].push(u); // undirected
  }

  drawGraph(nodeCount, edges);
  await sleep(500);

  const visited = Array(nodeCount).fill(false);
  const dfsOrder = [];

  async function dfs(u) {
    visited[u] = true;
    dfsOrder.push(u);
    highlightNode(u, "#4CAF50"); // visited color
    logStep(`Visited node ${u}`);
    await sleep(800);

    for (const v of adj[u]) {
      if (!visited[v]) {
        logStep(`Exploring edge ${u} → ${v}`);
        highlightEdge(u, v, "#FFA500"); // highlight edge
        await sleep(800);
        await dfs(v);
      }
    }

    logStep(`Backtracking from node ${u}`);
    await sleep(500);
  }

  await dfs(startNode);

  document.getElementById("output").innerHTML =
    `<h3>DFS Order:</h3><p>${dfsOrder.join(" → ")}</p>`;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function logStep(text) {
  const output = document.getElementById("output");
  output.innerHTML = `<p>${text}</p>` + output.innerHTML;
}

// Assuming drawGraph stores node/edge SVG elements in a map
const nodeMap = {}, edgeMap = {};

function drawGraph(n, edges) {
  const svg = document.getElementById("graphCanvas");
  svg.innerHTML = '';
  nodeMap.clear?.(); edgeMap.clear?.();

  const radius = 20;
  const centerX = 300;
  const centerY = 200;
  const angleStep = (2 * Math.PI) / n;

  const positions = [];

  for (let i = 0; i < n; i++) {
    const angle = i * angleStep;
    const x = centerX + 150 * Math.cos(angle);
    const y = centerY + 150 * Math.sin(angle);
    positions.push({ x, y });
  }

  // Edges
  edges.forEach(({ u, v }) => {
    const key = `${Math.min(u,v)}-${Math.max(u,v)}`;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", positions[u].x);
    line.setAttribute("y1", positions[u].y);
    line.setAttribute("x2", positions[v].x);
    line.setAttribute("y2", positions[v].y);
    line.setAttribute("stroke", "#aaa");
    line.setAttribute("stroke-width", "2");
    svg.appendChild(line);
    edgeMap[key] = line;
  });

  // Nodes
  for (let i = 0; i < n; i++) {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", positions[i].x);
    circle.setAttribute("cy", positions[i].y);
    circle.setAttribute("r", radius);
    circle.setAttribute("fill", "#1976D2");
    circle.setAttribute("stroke", "#fff");
    svg.appendChild(circle);
    nodeMap[i] = circle;

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", positions[i].x);
    text.setAttribute("y", positions[i].y + 5);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", "#fff");
    text.setAttribute("font-size", "14");
    text.textContent = i;
    svg.appendChild(text);
  }
}

function highlightNode(i, color) {
  if (nodeMap[i]) {
    nodeMap[i].setAttribute("fill", color);
  }
}

function highlightEdge(u, v, color) {
  const key = `${Math.min(u,v)}-${Math.max(u,v)}`;
  if (edgeMap[key]) {
    edgeMap[key].setAttribute("stroke", color);
  }
}

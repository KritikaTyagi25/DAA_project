function runPrim() {
  const nodeCount = parseInt(document.getElementById("nodeCount").value);
  const edgesText = document.getElementById("edgesInput").value.trim();
  const edges = edgesText.split('\n').map(line => {
    const [u, v, w] = line.trim().split(' ').map(Number);
    return { u, v, w };
  });

  const adj = Array.from({ length: nodeCount }, () => []);
  for (const { u, v, w } of edges) {
    adj[u].push({ node: v, weight: w });
    adj[v].push({ node: u, weight: w }); // Undirected graph
  }

  const visited = Array(nodeCount).fill(false);
  const minEdge = Array(nodeCount).fill(Infinity);
  const parent = Array(nodeCount).fill(-1);
  minEdge[0] = 0;

  for (let i = 0; i < nodeCount; i++) {
    let u = -1;
    for (let j = 0; j < nodeCount; j++) {
      if (!visited[j] && (u === -1 || minEdge[j] < minEdge[u])) {
        u = j;
      }
    }

    visited[u] = true;

    for (const { node: v, weight: w } of adj[u]) {
      if (!visited[v] && w < minEdge[v]) {
        minEdge[v] = w;
        parent[v] = u;
      }
    }
  }

  const outputDiv = document.getElementById("output");
  let html = `<h3>Minimum Spanning Tree (MST):</h3>`;
  let totalCost = 0;
  for (let i = 1; i < nodeCount; i++) {
    html += `<p>${parent[i]} - ${i} (weight ${minEdge[i]})</p>`;
    totalCost += minEdge[i];
  }
  html += `<h4>Total Cost: ${totalCost}</h4>`;
  outputDiv.innerHTML = html;
}

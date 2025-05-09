function runDijkstra() {
  const nodeCount = parseInt(document.getElementById("nodeCount").value);
  const edgesText = document.getElementById("edgesInput").value.trim();
  const startNode = parseInt(document.getElementById("startNode").value);

  const adj = Array.from({ length: nodeCount }, () => []);
  const edges = edgesText.split('\n');

  for (let line of edges) {
    const [u, v, w] = line.trim().split(' ').map(Number);
    adj[u].push({ node: v, weight: w });
    adj[v].push({ node: u, weight: w }); // For undirected graph
  }

  const dist = Array(nodeCount).fill(Infinity);
  const visited = Array(nodeCount).fill(false);
  dist[startNode] = 0;

  for (let i = 0; i < nodeCount; i++) {
    let u = -1;

    for (let j = 0; j < nodeCount; j++) {
      if (!visited[j] && (u === -1 || dist[j] < dist[u])) u = j;
    }

    if (dist[u] === Infinity) break;

    visited[u] = true;

    for (let edge of adj[u]) {
      const v = edge.node;
      const w = edge.weight;
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
      }
    }
  }

  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = `<h3>Shortest distances from node ${startNode}:</h3>` +
    dist.map((d, i) => `<p>To ${i}: ${d === Infinity ? "∞" : d}</p>`).join('');
}

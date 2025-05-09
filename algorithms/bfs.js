function runBFS() {
  const nodeCount = parseInt(document.getElementById("nodeCount").value);
  const edgesText = document.getElementById("edgesInput").value.trim();
  const edges = edgesText.split('\n').map(line => {
    const [u, v] = line.trim().split(' ').map(Number);
    return { u, v };
  });

  const adj = Array.from({ length: nodeCount }, () => []);
  for (const { u, v } of edges) {
    adj[u].push(v);
    adj[v].push(u); // Assuming undirected graph
  }

  const visited = Array(nodeCount).fill(false);
  const queue = [];
  const bfsOrder = [];

  const startNode = parseInt(document.getElementById("startNode").value);
  queue.push(startNode);
  visited[startNode] = true;

  while (queue.length > 0) {
    const node = queue.shift();
    bfsOrder.push(node);

    for (const neighbor of adj[node]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);
      }
    }
  }

  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = `<h3>BFS Traversal Order:</h3><p>${bfsOrder.join(' -> ')}</p>`;
}

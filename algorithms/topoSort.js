function runToposort() {
  const nodeCount = parseInt(document.getElementById("nodeCount").value);
  const edgesText = document.getElementById("edgesInput").value.trim();
  const edges = edgesText.split('\n').map(line => {
    const [u, v] = line.trim().split(' ').map(Number);
    return { u, v };
  });

  const adj = Array.from({ length: nodeCount }, () => []);
  const inDegree = Array(nodeCount).fill(0);

  // Build adjacency list and in-degree array
  for (const { u, v } of edges) {
    adj[u].push(v);
    inDegree[v]++;
  }

  const queue = [];
  for (let i = 0; i < nodeCount; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  const topOrder = [];
  while (queue.length > 0) {
    const u = queue.shift();
    topOrder.push(u);

    for (const v of adj[u]) {
      inDegree[v]--;
      if (inDegree[v] === 0) {
        queue.push(v);
      }
    }
  }

  const outputDiv = document.getElementById("output");
  if (topOrder.length === nodeCount) {
    outputDiv.innerHTML = `<h3>Topological Sort Order:</h3><p>${topOrder.join(' -> ')}</p>`;
  } else {
    outputDiv.innerHTML = `<h3>Cycle detected! Topological Sort is not possible.</h3>`;
  }
}

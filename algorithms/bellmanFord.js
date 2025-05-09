function runBellmanFord() {
  const nodeCount = parseInt(document.getElementById("nodeCount").value);
  const edgesText = document.getElementById("edgesInput").value.trim();
  const startNode = parseInt(document.getElementById("startNode").value);

  const edges = edgesText.split('\n').map(line => {
    const [u, v, w] = line.trim().split(' ').map(Number);
    return { u, v, w };
  });

  const dist = Array(nodeCount).fill(Infinity);
  dist[startNode] = 0;

  for (let i = 0; i < nodeCount - 1; i++) {
    for (let { u, v, w } of edges) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
      }
    }
  }

  // Check for negative-weight cycles
  let hasNegativeCycle = false;
  for (let { u, v, w } of edges) {
    if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
      hasNegativeCycle = true;
      break;
    }
  }

  const outputDiv = document.getElementById("output");

  if (hasNegativeCycle) {
    outputDiv.innerHTML = `<h3 style="color:red;">Negative weight cycle detected!</h3>`;
  } else {
    outputDiv.innerHTML = `<h3>Shortest distances from node ${startNode}:</h3>` +
      dist.map((d, i) => `<p>To ${i}: ${d === Infinity ? "∞" : d}</p>`).join('');
  }
}

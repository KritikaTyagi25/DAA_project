function runKruskal() {
  const nodeCount = parseInt(document.getElementById("nodeCount").value);
  const edgesText = document.getElementById("edgesInput").value.trim();
  const edges = edgesText.split('\n').map(line => {
    const [u, v, w] = line.trim().split(' ').map(Number);
    return { u, v, w };
  });

  edges.sort((a, b) => a.w - b.w);

  const parent = Array.from({ length: nodeCount }, (_, i) => i);

  function find(u) {
    if (parent[u] !== u) parent[u] = find(parent[u]);
    return parent[u];
  }

  function union(u, v) {
    const rootU = find(u);
    const rootV = find(v);
    if (rootU !== rootV) {
      parent[rootV] = rootU;
      return true;
    }
    return false;
  }

  const mst = [];
  let totalCost = 0;

  for (let edge of edges) {
    if (union(edge.u, edge.v)) {
      mst.push(edge);
      totalCost += edge.w;
    }
  }

  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = `<h3>Minimum Spanning Tree (MST):</h3>` +
    mst.map(e => `<p>${e.u} - ${e.v} (weight ${e.w})</p>`).join('') +
    `<h4>Total Cost: ${totalCost}</h4>`;
}

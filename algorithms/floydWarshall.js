function runFloydWarshall() {
  const nodeCount = parseInt(document.getElementById("nodeCount").value);
  const edgesText = document.getElementById("edgesInput").value.trim();

  const dist = Array.from({ length: nodeCount }, () =>
    Array(nodeCount).fill(Infinity)
  );

  for (let i = 0; i < nodeCount; i++) {
    dist[i][i] = 0;
  }

  const edges = edgesText.split('\n');
  for (let line of edges) {
    const [u, v, w] = line.trim().split(' ').map(Number);
    dist[u][v] = w;
    // If undirected graph, include:
    // dist[v][u] = w;
  }

  for (let k = 0; k < nodeCount; k++) {
    for (let i = 0; i < nodeCount; i++) {
      for (let j = 0; j < nodeCount; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }

  const outputDiv = document.getElementById("output");
  let html = `<h3>All-Pairs Shortest Paths:</h3><table border="1"><tr><th></th>`;
  for (let j = 0; j < nodeCount; j++) html += `<th>${j}</th>`;
  html += `</tr>`;

  for (let i = 0; i < nodeCount; i++) {
    html += `<tr><th>${i}</th>`;
    for (let j = 0; j < nodeCount; j++) {
      html += `<td>${dist[i][j] === Infinity ? "∞" : dist[i][j]}</td>`;
    }
    html += `</tr>`;
  }
  html += `</table>`;
  outputDiv.innerHTML = html;
}

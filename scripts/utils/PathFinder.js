export default class PathFinder {
  constructor(grid, cols, rows) {
    this.grid = grid;
    this.cols = cols;
    this.rows = rows;
    this.graph = this.buildGraph();
  }

  buildGraph() {
    const graph = {};
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const node = `${x},${y}`;
        graph[node] = this.getNeighbors(x, y);
      }
    }
    return graph;
  }

  getNeighbors(x, y) {
    const neighbors = [];
    const cell = this.grid[y][x];

    if (!cell.walls.top && y > 0) neighbors.push(`${x},${y - 1}`);
    if (!cell.walls.right && x < this.cols - 1) neighbors.push(`${x + 1},${y}`);
    if (!cell.walls.bottom && y < this.rows - 1) neighbors.push(`${x},${y + 1}`);
    if (!cell.walls.left && x > 0) neighbors.push(`${x - 1},${y}`);

    return neighbors;
  }

  findDistinctPaths(startX, startY, endX, endY, numPaths = 3) {
    const paths = [];
    let currentGraph = JSON.parse(JSON.stringify(this.graph));

    for (let i = 0; i < numPaths; i++) {
      const path = this.findPathBFS(startX, startY, endX, endY, currentGraph);
      if (!path) break;

      paths.push(this.parsePath(path));
      currentGraph = this.removePathFromGraph(currentGraph, path);
    }

    return paths;
  }

  // ✅ BFS para camino más corto
  findPathBFS(startX, startY, endX, endY, graph) {
    const start = `${startX},${startY}`;
    const end = `${endX},${endY}`;
    const queue = [[start]];
    const visited = new Set([start]);

    while (queue.length > 0) {
      const path = queue.shift();
      const lastNode = path[path.length - 1];

      if (lastNode === end) {
        return path;
      }

      const neighbors = graph[lastNode] || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([...path, neighbor]);
        }
      }
    }

    return null;
  }

  removePathFromGraph(graph, path) {
    const newGraph = JSON.parse(JSON.stringify(graph));
    const nodesToRemove = path.slice(1, -1); // evitar quitar inicio y fin

    nodesToRemove.forEach((node) => {
      delete newGraph[node];
      for (const key in newGraph) {
        newGraph[key] = newGraph[key].filter((n) => n !== node);
      }
    });

    return newGraph;
  }

  parsePath(path) {
    return path.map((node) => {
      const [x, y] = node.split(",").map(Number);
      return { x, y };
    });
  }
}

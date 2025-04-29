/**
 * Clase para encontrar caminos en el laberinto
 */
export default class PathFinder {
  /**
   * Crea un nuevo buscador de caminos
   * @param {Array} grid - Matriz del laberinto
   * @param {number} cols - Número de columnas
   * @param {number} rows - Número de filas
   */
  constructor(grid, cols, rows) {
    this.grid = grid
    this.cols = cols
    this.rows = rows
    this.graph = this.buildGraph()
  }

  /**
   * Construye un grafo a partir de la matriz del laberinto
   * @returns {Object} - Grafo con nodos y conexiones
   */
  buildGraph() {
    const graph = {}
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const node = `${x},${y}`
        graph[node] = this.getNeighbors(x, y)
      }
    }
    return graph
  }

  /**
   * Obtiene los vecinos accesibles de una celda
   * @param {number} x - Coordenada X
   * @param {number} y - Coordenada Y
   * @returns {Array} - Lista de vecinos accesibles
   */
  getNeighbors(x, y) {
    const neighbors = []
    const cell = this.grid[y][x]

    if (!cell.walls.top && y > 0) neighbors.push(`${x},${y - 1}`)
    if (!cell.walls.right && x < this.cols - 1) neighbors.push(`${x + 1},${y}`)
    if (!cell.walls.bottom && y < this.rows - 1) neighbors.push(`${x},${y + 1}`)
    if (!cell.walls.left && x > 0) neighbors.push(`${x - 1},${y}`)

    return neighbors
  }

  /**
   * Encuentra múltiples caminos distintos entre dos puntos
   * @param {number} startX - Coordenada X inicial
   * @param {number} startY - Coordenada Y inicial
   * @param {number} endX - Coordenada X final
   * @param {number} endY - Coordenada Y final
   * @param {number} numPaths - Número de caminos a encontrar
   * @returns {Array} - Lista de caminos encontrados
   */
  findDistinctPaths(startX, startY, endX, endY, numPaths = 3) {
    const paths = []
    let currentGraph = JSON.parse(JSON.stringify(this.graph))

    for (let i = 0; i < numPaths; i++) {
      const path = this.findPath(startX, startY, endX, endY, currentGraph)
      if (!path) break

      paths.push(this.parsePath(path))
      currentGraph = this.removePathFromGraph(currentGraph, path)
    }

    return paths
  }

  /**
   * Encuentra un camino entre dos puntos usando DFS
   * @param {number} startX - Coordenada X inicial
   * @param {number} startY - Coordenada Y inicial
   * @param {number} endX - Coordenada X final
   * @param {number} endY - Coordenada Y final
   * @param {Object} graph - Grafo a utilizar
   * @returns {Array|null} - Camino encontrado o null si no hay camino
   */
  findPath(startX, startY, endX, endY, graph) {
    const start = `${startX},${startY}`
    const end = `${endX},${endY}`
    const stack = [{ path: [start], visited: new Set([start]) }]

    while (stack.length > 0) {
      const current = stack.pop()
      const lastNode = current.path[current.path.length - 1]

      if (lastNode === end) {
        return current.path
      }

      const neighbors = graph[lastNode] || []
      for (const neighbor of neighbors) {
        if (!current.visited.has(neighbor)) {
          const newVisited = new Set(current.visited)
          newVisited.add(neighbor)

          stack.push({
            path: [...current.path, neighbor],
            visited: newVisited,
          })
        }
      }
    }
    return null
  }

  /**
   * Elimina un camino del grafo para encontrar caminos alternativos
   * @param {Object} graph - Grafo original
   * @param {Array} path - Camino a eliminar
   * @returns {Object} - Nuevo grafo sin el camino
   */
  removePathFromGraph(graph, path) {
    const newGraph = JSON.parse(JSON.stringify(graph))
    const nodesToRemove = path.slice(1, -1)

    nodesToRemove.forEach((node) => {
      delete newGraph[node]
      for (const key in newGraph) {
        newGraph[key] = newGraph[key].filter((n) => n !== node)
      }
    })

    return newGraph
  }

  /**
   * Convierte un camino de strings a coordenadas
   * @param {Array} path - Camino en formato string
   * @returns {Array} - Camino en formato de coordenadas
   */
  parsePath(path) {
    return path.map((node) => {
      const [x, y] = node.split(",").map(Number)
      return { x, y }
    })
  }
}

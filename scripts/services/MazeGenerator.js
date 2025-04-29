import Cell from "../models/Cell.js"

/**
 * Servicio para generar laberintos
 */
export default class MazeGenerator {
  /**
   * Crea un nuevo generador de laberintos
   * @param {number} cols - Número de columnas
   * @param {number} rows - Número de filas
   */
  constructor(cols, rows) {
    this.cols = cols
    this.rows = rows
    this.grid = []
    this.stack = []
    this.current = null
    this.isGenerating = false
  }

  /**
   * Inicializa la matriz del laberinto
   */
  initGrid(entry) {
    this.grid = [];
    for (let y = 0; y < this.rows; y++) {
      const row = [];
      for (let x = 0; x < this.cols; x++) {
        row.push(new Cell(x, y));
      }
      this.grid.push(row);
    }

    this.stack = [];
    this.current = this.grid[entry.y][entry.x]; // Usamos la entrada para iniciar
    this.current.visited = true;
    this.stack.push(this.current);
    this.isGenerating = true;

    // Eliminar obstáculos alrededor de la entrada para crear múltiples rutas
    this.openEntrancePaths(entry);
  }

  // Método para eliminar obstáculos alrededor de la entrada
  openEntrancePaths(entry) {
    const { x, y } = entry;

    // Abrir las celdas alrededor de la entrada para crear caminos
    if (x < this.cols - 1) {
      this.grid[y][x].walls.right = false;
      this.grid[y][x + 1].walls.left = false;
    }
    if (y > 0) {
      this.grid[y][x].walls.top = false;
      this.grid[y - 1][x].walls.bottom = false;
    }
    if (y < this.rows - 1) {
      this.grid[y][x].walls.bottom = false;
      this.grid[y + 1][x].walls.top = false;
    }
    if (x > 0) {
      this.grid[y][x].walls.left = false;
      this.grid[y][x - 1].walls.right = false;
    }
  }

  /**
   * Genera un paso del algoritmo de creación del laberinto
   * @returns {boolean} - True si el laberinto está completo
   */
  generateStep() {
    if (this.stack.length === 0) {
      this.isGenerating = false
      this.finalizeMaze()
      return true // Laberinto completo
    }

    const neighbors = this.getUnvisitedNeighbors(this.current)

    if (neighbors.length > 0) {
      // Priorizar vecinos no visitados
      const unvisited = neighbors.filter((n) => !n.visited)
      const candidates = unvisited.length > 0 ? unvisited : neighbors

      const next = candidates[Math.floor(Math.random() * candidates.length)]
      this.removeWall(this.current, next)

      if (!next.visited) {
        next.visited = true
        this.stack.push(next)
      }

      this.current = next
    } else {
      this.current = this.stack.pop()
    }

    return false // Laberinto en progreso
  }

  /**
   * Genera el laberinto completo de una vez
   */
  generateFullMaze(entry) {
    this.initGrid(entry)

    while (this.isGenerating) {
      this.generateStep()
    }

    return this.grid
  }

  /**
   * Finaliza el laberinto añadiendo detalles adicionales
   */
  finalizeMaze() {
    // Eliminar algunas paredes aleatorias para crear más caminos
    this.removeRandomWalls(Math.floor((this.cols * this.rows) / 10))

    // Asegurar que haya caminos desde el inicio
    this.openExtraStartPaths()
  }

  /**
   * Obtiene los vecinos no visitados de una celda
   * @param {Cell} cell - Celda actual
   * @returns {Array} - Lista de vecinos no visitados
   */
  getUnvisitedNeighbors(cell) {
    const neighbors = []
    const { x, y } = cell

    const isExit = (neighbor) => neighbor.x === this.cols - 1 && neighbor.y === this.rows - 1
    const isNearStart = (neighbor) =>
      (neighbor.x === 0 && neighbor.y === 1) || // Celda inferior al inicio
      (neighbor.x === 1 && neighbor.y === 0) // Celda derecha al inicio

    // Top
    if (y > 0) {
      const neighbor = this.grid[y - 1][x]
      if (!neighbor.visited || isExit(neighbor) || isNearStart(neighbor)) {
        neighbors.push(neighbor)
      }
    }
    // Right
    if (x < this.cols - 1) {
      const neighbor = this.grid[y][x + 1]
      if (!neighbor.visited || isExit(neighbor) || isNearStart(neighbor)) {
        neighbors.push(neighbor)
      }
    }
    // Bottom
    if (y < this.rows - 1) {
      const neighbor = this.grid[y + 1][x]
      if (!neighbor.visited || isExit(neighbor) || isNearStart(neighbor)) {
        neighbors.push(neighbor)
      }
    }
    // Left
    if (x > 0) {
      const neighbor = this.grid[y][x - 1]
      if (!neighbor.visited || isExit(neighbor) || isNearStart(neighbor)) {
        neighbors.push(neighbor)
      }
    }

    return neighbors
  }

  /**
   * Elimina la pared entre dos celdas
   * @param {Cell} a - Primera celda
   * @param {Cell} b - Segunda celda
   */
  removeWall(a, b) {
    const dx = b.x - a.x
    const dy = b.y - a.y

    if (dx === 1) {
      a.walls.right = false
      b.walls.left = false
    }
    if (dx === -1) {
      a.walls.left = false
      b.walls.right = false
    }
    if (dy === 1) {
      a.walls.bottom = false
      b.walls.top = false
    }
    if (dy === -1) {
      a.walls.top = false
      b.walls.bottom = false
    }
  }

  /**
   * Abre caminos adicionales desde la celda de inicio
   */
  openExtraStartPaths() {
    // Abrir pared derecha del inicio si está bloqueada
    if (this.grid[0][0].walls.right) {
      this.grid[0][0].walls.right = false
      this.grid[0][1].walls.left = false
    }

    // Abrir pared inferior del inicio si está bloqueada
    if (this.grid[0][0].walls.bottom) {
      this.grid[0][0].walls.bottom = false
      this.grid[1][0].walls.top = false
    }
  }

  /**
   * Elimina paredes aleatorias para crear más caminos
   * @param {number} numWalls - Número de paredes a eliminar
   */
  removeRandomWalls(numWalls) {
    // Lista de todas las paredes internas posibles
    const potentialWalls = []

    // Recorrer todas las celdas excepto la última fila y columna
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const cell = this.grid[y][x]

        // Pared derecha (excepto última columna)
        if (x < this.cols - 1 && cell.walls.right) {
          potentialWalls.push({
            cellA: cell,
            cellB: this.grid[y][x + 1],
            wallType: "horizontal",
          })
        }

        // Pared inferior (excepto última fila)
        if (y < this.rows - 1 && cell.walls.bottom) {
          potentialWalls.push({
            cellA: cell,
            cellB: this.grid[y + 1][x],
            wallType: "vertical",
          })
        }
      }
    }

    // Mezclar las paredes aleatoriamente
    for (let i = potentialWalls.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[potentialWalls[i], potentialWalls[j]] = [potentialWalls[j], potentialWalls[i]]
    }

    // Eliminar hasta el número solicitado de paredes
    const wallsToRemove = potentialWalls.slice(0, numWalls)
    wallsToRemove.forEach((wall) => {
      if (wall.wallType === "horizontal") {
        wall.cellA.walls.right = false
        wall.cellB.walls.left = false
      } else {
        wall.cellA.walls.bottom = false
        wall.cellB.walls.top = false
      }
    })
  }
}

import MazeGenerator from "../services/MazeGenerator.js"

/**
 * Controlador para el laberinto
 */
export default class MazeController {
  /**
   * Crea un nuevo controlador de laberinto
   * @param {number} cols - Número de columnas
   * @param {number} rows - Número de filas
   * @param {number} cellSize - Tamaño de celda en píxeles
   * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
   */
  constructor(cols, rows, cellSize, ctx) {
    this.cols = cols
    this.rows = rows
    this.cellSize = cellSize
    this.ctx = ctx
    this.mazeGenerator = new MazeGenerator(cols, rows)
    this.grid = []
    this.paths = []
    this.entry = { x: 0, y: Math.floor(rows / 2) };
  }

  /**
   * Genera un nuevo laberinto
   */
  generateNewMaze() {
    this.grid = this.mazeGenerator.generateFullMaze(this.entry)
    this.paths = []
    return this.grid
  }

  /**
   * Dibuja el laberinto en el canvas
   */
  drawMaze() {
    this.ctx.clearRect(0, 0, this.cols * this.cellSize, this.rows * this.cellSize)

    // Dibujar laberinto
    for (const row of this.grid) {
      for (const cell of row) {
        cell.draw(this.ctx, this.cellSize)
      }
    }

    // Dibujar rutas si existen
    this.drawPaths()

    // Dibujar entrada y salida
    this.ctx.fillStyle = "green"
    this.ctx.fillRect(1, Math.floor(this.rows / 2) * this.cellSize + 1, this.cellSize - 2, this.cellSize - 2)

    this.ctx.fillStyle = "red"
    this.ctx.fillRect(
      (this.cols - 1) * this.cellSize + 1,
      (this.rows - 1) * this.cellSize + 1,
      this.cellSize - 2,
      this.cellSize - 2,
    )
  }

  /**
   * Dibuja las rutas encontradas
   */
  drawPaths() {
    const colors = ["green", "blue"] // Verde, Azul, Naranja

    
    this.paths.forEach((path, index) => {
      if (index < colors.length) {
        this.ctx.beginPath()
        this.ctx.moveTo(path[0].x * this.cellSize + this.cellSize / 2, path[0].y * this.cellSize + this.cellSize / 2)

        for (const point of path) {
          this.ctx.lineTo(point.x * this.cellSize + this.cellSize / 2, point.y * this.cellSize + this.cellSize / 2)
        }

        this.ctx.strokeStyle = colors[index]
        this.ctx.lineWidth = 3
        this.ctx.stroke()
      }
    })
  }

  /**
   * Establece las rutas a mostrar
   * @param {Array} paths - Rutas a mostrar
   */
  setPaths(paths) {
    this.paths = paths
  }

  /**
   * Limpia las rutas
   */
  clearPaths() {
    this.paths = []
  }
}

/**
 * Representa al jugador en el laberinto
 */
export default class Player {
    /**
     * Crea un nuevo jugador
     * @param {number} startX - Posición inicial X
     * @param {number} startY - Posición inicial Y
     */
    constructor(startX = 0, startY = 0) {
      this.x = startX
      this.y = startY
      this.path = [{ x: startX, y: startY }] // Historial de movimientos
      this.moveCount = 0
    }
  
    /**
     * Dibuja al jugador y su ruta en el canvas
     * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
     * @param {number} cellSize - Tamaño de la celda en píxeles
     */
    draw(ctx, cellSize) {
      // Dibujar ruta punteada
      ctx.strokeStyle = "blue"
      ctx.setLineDash([5, 5]) // Línea punteada
      ctx.lineWidth = 2
      ctx.beginPath()
  
      if (this.path.length > 0) {
        ctx.moveTo(this.path[0].x * cellSize + cellSize / 2, this.path[0].y * cellSize + cellSize / 2)
        for (const pos of this.path) {
          ctx.lineTo(pos.x * cellSize + cellSize / 2, pos.y * cellSize + cellSize / 2)
        }
      }
  
      ctx.stroke()
      ctx.setLineDash([]) // Volver a línea sólida
  
      // Dibujar al jugador
      ctx.fillStyle = "blue"
      ctx.beginPath()
      ctx.arc(this.x * cellSize + cellSize / 2, this.y * cellSize + cellSize / 2, 10, 0, Math.PI * 2)
      ctx.fill()
    }
  
    /**
     * Mueve al jugador en la dirección especificada
     * @param {number} dx - Cambio en X
     * @param {number} dy - Cambio en Y
     * @param {Array} grid - Matriz del laberinto
     * @param {number} cols - Número de columnas
     * @param {number} rows - Número de filas
     * @returns {boolean} - True si el movimiento fue válido
     */
    move(dx, dy, grid, cols, rows) {
      const newX = this.x + dx
      const newY = this.y + dy
  
      if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
        const currentCell = grid[this.y][this.x]
        const nextCell = grid[newY][newX]
  
        if (
          (dx === 1 && !currentCell.walls.right) ||
          (dx === -1 && !currentCell.walls.left) ||
          (dy === 1 && !currentCell.walls.bottom) ||
          (dy === -1 && !currentCell.walls.top)
        ) {
          this.x = newX
          this.y = newY
          this.path.push({ x: this.x, y: this.y }) // Guardar posición
          this.moveCount++
          return true
        }
      }
  
      return false
    }
  
    /**
     * Reinicia el jugador a la posición inicial
     */
    reset(startX = 0, startY = 0) {
      this.x = startX
      this.y = startY
      this.path = [{ x: startX, y: startY }]
      this.moveCount = 0
    }
  }
  
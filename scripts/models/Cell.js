/**
 * Representa una celda en el laberinto
 */
export default class Cell {
    /**
     * Crea una nueva celda
     * @param {number} x - Coordenada X de la celda
     * @param {number} y - Coordenada Y de la celda
     */
    constructor(x, y) {
      this.x = x
      this.y = y
      this.visited = false
      this.walls = { top: true, right: true, bottom: true, left: true }
    }
  
    /**
     * Dibuja la celda en el contexto del canvas
     * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
     * @param {number} cellSize - Tamaño de la celda en píxeles
     */
    draw(ctx, cellSize) {
      const x = this.x * cellSize
      const y = this.y * cellSize
      ctx.strokeStyle = "black"
      ctx.lineWidth = 2
  
      if (this.walls.top) {
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + cellSize, y)
        ctx.stroke()
      }
  
      if (this.walls.right) {
        ctx.beginPath()
        ctx.moveTo(x + cellSize, y)
        ctx.lineTo(x + cellSize, y + cellSize)
        ctx.stroke()
      }
  
      if (this.walls.bottom) {
        ctx.beginPath()
        ctx.moveTo(x, y + cellSize)
        ctx.lineTo(x + cellSize, y + cellSize)
        ctx.stroke()
      }
  
      if (this.walls.left) {
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x, y + cellSize)
        ctx.stroke()
      }
    }
  }
  
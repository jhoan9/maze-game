import Player from "../models/Player.js"
import AudioService from "../services/AudioService.js"

/**
 * Controlador para el jugador
 */
export default class PlayerController {
  /**
   * Crea un nuevo controlador de jugador
   * @param {number} cellSize - Tamaño de celda en píxeles
   * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
   * @param {Array} grid - Matriz del laberinto
   * @param {number} cols - Número de columnas
   * @param {number} rows - Número de filas
   */
  constructor(cellSize, ctx, grid, cols, rows) {
    this.cellSize = cellSize
    this.ctx = ctx
    this.grid = grid
    this.cols = cols
    this.rows = rows
    this.player = new Player()
    this.audioService = new AudioService()
    this.startTime = null
    this.elapsedTime = 0
    this.isPlaying = false

    // Inicializar controles
    this.initControls()
  }

  /**
   * Inicializa los controles del jugador
   */
  initControls() {
    // Controles de teclado
    document.addEventListener("keydown", (event) => {
      if (!this.isPlaying) return

      let moved = false

      switch (event.key) {
        case "ArrowUp":
          moved = this.movePlayer(0, -1)
          break
        case "ArrowRight":
          moved = this.movePlayer(1, 0)
          break
        case "ArrowDown":
          moved = this.movePlayer(0, 1)
          break
        case "ArrowLeft":
          moved = this.movePlayer(-1, 0)
          break
      }

      if (moved) {
        this.audioService.playMoveSound()
        this.checkVictory()
      } else if (event.key.startsWith("Arrow")) {
        this.audioService.playWallSound()
      }
    })

    // Controles táctiles
    document.getElementById("upBtn").addEventListener("click", () => {
      if (this.isPlaying && this.movePlayer(0, -1)) {
        this.audioService.playMoveSound()
        this.checkVictory()
      } else {
        this.audioService.playWallSound()
      }
    })

    document.getElementById("rightBtn").addEventListener("click", () => {
      if (this.isPlaying && this.movePlayer(1, 0)) {
        this.audioService.playMoveSound()
        this.checkVictory()
      } else {
        this.audioService.playWallSound()
      }
    })

    document.getElementById("downBtn").addEventListener("click", () => {
      if (this.isPlaying && this.movePlayer(0, 1)) {
        this.audioService.playMoveSound()
        this.checkVictory()
      } else {
        this.audioService.playWallSound()
      }
    })

    document.getElementById("leftBtn").addEventListener("click", () => {
      if (this.isPlaying && this.movePlayer(-1, 0)) {
        this.audioService.playMoveSound()
        this.checkVictory()
      } else {
        this.audioService.playWallSound()
      }
    })
  }

  /**
   * Mueve al jugador en la dirección especificada
   * @param {number} dx - Cambio en X
   * @param {number} dy - Cambio en Y
   * @returns {boolean} - True si el movimiento fue válido
   */
  movePlayer(dx, dy) {
    return this.player.move(dx, dy, this.grid, this.cols, this.rows)
  }

  /**
   * Dibuja al jugador
   */
  drawPlayer() {
    this.player.draw(this.ctx, this.cellSize)
  }

  /**
   * Reinicia al jugador
   */
  resetPlayer() {
    this.player.reset()
    this.startTime = Date.now()
    this.isPlaying = true
  }

  /**
   * Actualiza la referencia a la matriz del laberinto
   * @param {Array} grid - Nueva matriz del laberinto
   */
  updateGrid(grid) {
    this.grid = grid
  }

  /**
   * Verifica si el jugador ha llegado a la meta
   * @returns {boolean} - True si el jugador ha ganado
   */
  checkVictory() {
    if (this.player.x === this.cols - 1 && this.player.y === this.rows - 1) {
      this.isPlaying = false
      this.elapsedTime = Date.now() - this.startTime
      this.audioService.playVictorySound()
      return true
    }
    return false
  }

  /**
   * Obtiene el tiempo transcurrido formateado
   * @returns {string} - Tiempo formateado (mm:ss)
   */
  getFormattedTime() {
    const totalSeconds = Math.floor(this.elapsedTime / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  /**
   * Obtiene el número de movimientos
   * @returns {number} - Número de movimientos
   */
  getMoveCount() {
    return this.player.moveCount
  }

  /**
   * Calcula la puntuación basada en tiempo y movimientos
   * @returns {number} - Puntuación
   */
  calculateScore() {
    const timeScore = Math.max(0, 10000 - this.elapsedTime)
    const moveScore = Math.max(0, 1000 - this.player.moveCount * 10)
    return Math.floor((timeScore + moveScore) / 100)
  }
}

import Player from "../models/Player.js"

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
    // Inicializar jugador en la entrada del laberinto (normalmente en la posición 0, mitad de la altura)
    const startY = Math.floor(rows / 2)
    this.player = new Player(0, startY)
    this.startTime = null
    this.elapsedTime = 0
    this.isPlaying = false
    this.hasWon = false // Nueva propiedad para evitar múltiples detecciones de victoria

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
        this.checkVictory()
      }
    })

    // Controles táctiles mejorados
    const touchControls = {
      upBtn: document.getElementById("upBtn"),
      rightBtn: document.getElementById("rightBtn"),
      downBtn: document.getElementById("downBtn"),
      leftBtn: document.getElementById("leftBtn"),
    }

    // Función para manejar eventos táctiles
    const handleTouchControl = (direction) => {
      if (!this.isPlaying) return

      let dx = 0,
        dy = 0

      switch (direction) {
        case "up":
          dy = -1
          break
        case "right":
          dx = 1
          break
        case "down":
          dy = 1
          break
        case "left":
          dx = -1
          break
      }

      if (this.movePlayer(dx, dy)) {
        this.checkVictory()
      }
    }

    // Añadir eventos touch y click a cada botón
    Object.entries(touchControls).forEach(([key, btn]) => {
      if (!btn) return // Verificar que el botón existe

      const direction = key.replace("Btn", "")

      // Evento click (para navegadores de escritorio)
      btn.addEventListener("click", (e) => {
        handleTouchControl(direction)
      })

      // Evento touchstart (para dispositivos táctiles)
      btn.addEventListener("touchstart", (e) => {
        e.preventDefault() // Prevenir comportamiento por defecto
        handleTouchControl(direction)
      })
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
    // Reiniciar jugador en la entrada del laberinto (normalmente en la posición 0, mitad de la altura)
    const startY = Math.floor(this.rows / 2)
    this.player.reset(0, startY)
    this.startTime = Date.now()
    this.isPlaying = true
    this.hasWon = false // Reiniciar estado de victoria
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
    // Si ya ganó, no verificar de nuevo
    if (this.hasWon) return false

    // Verificar si el jugador está en la meta (esquina inferior derecha)
    if (this.player.x === this.cols - 1 && this.player.y === this.rows - 1) {
      console.log("¡Victoria! Jugador llegó a la meta:", this.player.x, this.player.y)
      this.isPlaying = false
      this.hasWon = true
      this.elapsedTime = Date.now() - this.startTime
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

  /**
   * Obtiene la posición actual del jugador
   * @returns {Object} - Coordenadas {x, y} del jugador
   */
  getPlayerPosition() {
    return {
      x: this.player.x,
      y: this.player.y,
    }
  }
}

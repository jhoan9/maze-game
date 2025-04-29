/**
 * Controlador para la interfaz de usuario
 */
export default class UIController {
  /**
   * Crea un nuevo controlador de UI
   * @param {Function} onNewMaze - Callback para crear nuevo laberinto
   * @param {Function} onShowPaths - Callback para mostrar rutas
   * @param {Function} onHidePaths - Callback para ocultar rutas
   * @param {Function} onPlayAgain - Callback para jugar de nuevo
   */
  constructor(onNewMaze, onShowPaths, onHidePaths, onPlayAgain) {
    this.routesPanel = document.getElementById("routesPanel")
    this.victoryModal = document.getElementById("victoryModal")

    // Verificar que los elementos existen
    if (!this.victoryModal) {
      console.error("Error: No se encontró el elemento #victoryModal")
    }

    // Botones
    this.newMazeBtn = document.getElementById("newMaze")
    this.showPathsBtn = document.getElementById("showPaths")
    this.closeRoutesBtn = document.getElementById("closeRoutes")
    this.closeVictoryBtn = document.getElementById("closeVictory")
    this.playAgainBtn = document.getElementById("playAgain")

    // Elementos de estadísticas
    this.finalScoreEl = document.getElementById("finalScore")
    this.finalTimeEl = document.getElementById("finalTime")
    this.finalMovesEl = document.getElementById("finalMoves")

    // Elementos de rutas
    this.routeLengthEls = [
      document.getElementById("route1-length"),
      document.getElementById("route2-length"),
      document.getElementById("route3-length"),
    ]

    this.routeTimeEls = [
      document.getElementById("route1-time"),
      document.getElementById("route2-time"),
      document.getElementById("route3-time"),
    ]

    // Callbacks
    this.onNewMaze = onNewMaze
    this.onShowPaths = onShowPaths
    this.onHidePaths = onHidePaths
    this.onPlayAgain = onPlayAgain

    // Inicializar eventos
    this.initEvents()
  }

  /**
   * Inicializa los eventos de la UI
   */
  initEvents() {
    this.newMazeBtn.addEventListener("click", () => {
      // Ocultar panel de rutas y reiniciar información
      this.hideRoutesPanel()
      this.resetRoutesInfo()

      // Llamar al callback para generar nuevo laberinto
      this.onNewMaze()
    })

    this.showPathsBtn.addEventListener("click", () => {
      this.showRoutesPanel()
      this.onShowPaths()
    })

    this.closeRoutesBtn.addEventListener("click", () => {
      this.hideRoutesPanel()
      this.onHidePaths()
    })

    if (this.closeVictoryBtn) {
      this.closeVictoryBtn.addEventListener("click", () => {
        this.hideVictoryModal()
      })
    }

    if (this.playAgainBtn) {
      this.playAgainBtn.addEventListener("click", () => {
        this.hideVictoryModal()
        this.onPlayAgain()
      })
    }
  }

  /**
   * Muestra el panel de rutas
   */
  showRoutesPanel() {
    this.routesPanel.classList.remove("hidden")
  }

  /**
   * Oculta el panel de rutas
   */
  hideRoutesPanel() {
    this.routesPanel.classList.add("hidden")
  }

  /**
   * Reinicia la información de las rutas
   */
  resetRoutesInfo() {
    // Reiniciar valores de longitud
    this.routeLengthEls.forEach((el) => {
      if (el) el.textContent = "0"
    })

    // Reiniciar valores de tiempo estimado
    this.routeTimeEls.forEach((el) => {
      if (el) el.textContent = "0"
    })
  }

  /**
   * Muestra el modal de victoria
   * @param {Object} stats - Estadísticas del juego
   */
  showVictoryModal(stats) {
    console.log("Mostrando modal de victoria con stats:", stats)

    if (!this.victoryModal) {
      console.error("Error: No se puede mostrar el modal de victoria porque no se encontró el elemento")
      return
    }

    // Actualizar estadísticas
    if (this.finalScoreEl) this.finalScoreEl.textContent = stats.score
    if (this.finalTimeEl) this.finalTimeEl.textContent = stats.time
    if (this.finalMovesEl) this.finalMovesEl.textContent = stats.moves

    // Mostrar modal usando diferentes métodos para asegurar que funcione
    this.victoryModal.classList.remove("hidden")
    this.victoryModal.style.display = "flex"

    console.log("Estado del modal después de intentar mostrarlo:", {
      classList: this.victoryModal.classList,
      display: this.victoryModal.style.display,
      computedDisplay: window.getComputedStyle(this.victoryModal).display,
    })
  }

  /**
   * Oculta el modal de victoria
   */
  hideVictoryModal() {
    if (!this.victoryModal) return

    this.victoryModal.classList.add("hidden")
    this.victoryModal.style.display = "none"
  }

  /**
   * Actualiza la información de las rutas
   * @param {Array} paths - Rutas encontradas
   */
  updateRoutesInfo(paths) {
    paths.forEach((path, index) => {
      if (index < this.routeLengthEls.length && this.routeLengthEls[index]) {
        this.routeLengthEls[index].textContent = path.length
        if (this.routeTimeEls[index]) {
          this.routeTimeEls[index].textContent = Math.round(path.length * 0.5)
        }
      }
    })
  }
}

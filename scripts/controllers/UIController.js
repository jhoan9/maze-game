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
  
      this.closeVictoryBtn.addEventListener("click", () => {
        this.hideVictoryModal()
      })
  
      this.playAgainBtn.addEventListener("click", () => {
        this.hideVictoryModal()
        this.onPlayAgain()
      })
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
     * Muestra el modal de victoria
     * @param {Object} stats - Estadísticas del juego
     */
    showVictoryModal(stats) {
      this.finalScoreEl.textContent = stats.score
      this.finalTimeEl.textContent = stats.time
      this.finalMovesEl.textContent = stats.moves
      this.victoryModal.classList.remove("hidden")
    }
  
    /**
     * Oculta el modal de victoria
     */
    hideVictoryModal() {
      this.victoryModal.classList.add("hidden")
    }
  
    /**
     * Actualiza la información de las rutas
     * @param {Array} paths - Rutas encontradas
     */
    updateRoutesInfo(paths) {
      paths.forEach((path, index) => {
        if (index < this.routeLengthEls.length) {
          this.routeLengthEls[index].textContent = path.length
          this.routeTimeEls[index].textContent = Math.round(path.length * 0.5)
        }
      })
    }
  }
  
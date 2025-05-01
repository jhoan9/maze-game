import MazeController from "./controllers/MazeController.js"
import PlayerController from "./controllers/PlayerController.js"
import UIController from "./controllers/UIController.js"
import PathFinder from "./utils/PathFinder.js"

// Configuración del juego
const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")
const cols = 10
const rows = 10
const cellSize = 30

// Configurar tamaño del canvas
canvas.width = cols * cellSize
canvas.height = rows * cellSize

// Inicializar controladores
const mazeController = new MazeController(cols, rows, cellSize, ctx)
let grid = mazeController.generateNewMaze()

const playerController = new PlayerController(cellSize, ctx, grid, cols, rows)
playerController.resetPlayer()

// Controlador de UI
const uiController = new UIController(
  // Callback para nuevo laberinto
  () => {
    grid = mazeController.generateNewMaze()
    playerController.updateGrid(grid)
    playerController.resetPlayer()

    // Limpiar las rutas visualizadas en el laberinto
    mazeController.clearPaths()
  },

  // Callback para mostrar rutas
  () => {
    const pathFinder = new PathFinder(grid, cols, rows)
    // Usar la posición actual del jugador como punto de inicio
    const playerPos = playerController.getPlayerPosition()
    const paths = pathFinder.findDistinctPaths(playerPos.x, playerPos.y, cols - 1, rows - 1, 2)
    mazeController.setPaths(paths)
    uiController.updateRoutesInfo(paths)
  },

  // Callback para ocultar rutas
  () => {
    mazeController.clearPaths()
  },

  // Callback para jugar de nuevo
  () => {
    grid = mazeController.generateNewMaze()
    playerController.updateGrid(grid)
    playerController.resetPlayer()

    // Limpiar las rutas visualizadas en el laberinto
    mazeController.clearPaths()

    // Reiniciar información de rutas
    uiController.resetRoutesInfo()
  },
)

// Función para dibujar el juego
function drawGame() {
  mazeController.drawMaze()
  playerController.drawPlayer()

  // Verificar victoria en cada frame
  if (playerController.isPlaying) {
    const hasWon = playerController.checkVictory()
    if (hasWon) {
      console.log("Victoria detectada en main.js")
      const stats = {
        score: playerController.calculateScore(),
        time: playerController.getFormattedTime(),
        moves: playerController.getMoveCount(),
      }

      // Usar setTimeout para asegurar que el modal se muestre después de que se complete el frame actual
      setTimeout(() => {
        uiController.showVictoryModal(stats)
      }, 100)
    }
  }

  requestAnimationFrame(drawGame)
}

// Iniciar bucle de dibujo
drawGame()

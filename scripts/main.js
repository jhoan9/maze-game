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

// Función para dibujar el juego
function drawGame() {
  mazeController.drawMaze()
  playerController.drawPlayer()
  requestAnimationFrame(drawGame)
}

// Iniciar bucle de dibujo
drawGame()

// Controlador de UI
const uiController = new UIController(
  // Callback para nuevo laberinto
  () => {
    grid = mazeController.generateNewMaze()
    playerController.updateGrid(grid)
    playerController.resetPlayer()
  },

  // Callback para mostrar rutas
  () => {
    const pathFinder = new PathFinder(grid, cols, rows)
    const paths = pathFinder.findDistinctPaths(0, 0, cols - 1, rows - 1)
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
  },
)

// Verificar victoria
setInterval(() => {
  if (playerController.checkVictory()) {
    const stats = {
      score: playerController.calculateScore(),
      time: playerController.getFormattedTime(),
      moves: playerController.getMoveCount(),
    }
    uiController.showVictoryModal(stats)
  }
}, 100)

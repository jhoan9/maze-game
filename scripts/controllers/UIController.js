/**
 * Controlador para la interfaz de usuario
 */
export default class UIController {
  /**
   * Crea un nuevo controlador de UI
   */
  constructor(onNewMaze, onShowPaths, onHidePaths, onPlayAgain) {
    this.routesPanel = document.getElementById("routesPanel");
    this.victoryModal = document.getElementById("victoryModal");

    // Botones
    this.newMazeBtn = document.getElementById("newMaze");
    this.showPathsBtn = document.getElementById("showPaths");
    this.closeRoutesBtn = document.getElementById("closeRoutes");
    this.closeVictoryBtn = document.getElementById("closeVictory");
    this.playAgainBtn = document.getElementById("playAgain");

    // Estadísticas victoria
    this.finalScoreEl = document.getElementById("finalScore");
    this.finalTimeEl = document.getElementById("finalTime");
    this.finalMovesEl = document.getElementById("finalMoves");

    // Rutas: longitud y tiempo
    this.routeLengthEls = [
      document.getElementById("route1-length"),
      document.getElementById("route2-length")
    ];
    this.routeTimeEls = [
      document.getElementById("route1-time"),
      document.getElementById("route2-time")
    ];

    // Callbacks
    this.onNewMaze = onNewMaze;
    this.onShowPaths = onShowPaths;
    this.onHidePaths = onHidePaths;
    this.onPlayAgain = onPlayAgain;

    this.initEvents();
  }

  initEvents() {
    this.newMazeBtn.addEventListener("click", () => {
      this.hideRoutesPanel();
      this.clearRoutes();
      this.onNewMaze();
    });

    this.showPathsBtn.addEventListener("click", () => {
      this.showRoutesPanel();
      this.onShowPaths();
    });

    this.closeRoutesBtn.addEventListener("click", () => {
      this.hideRoutesPanel();
      this.onHidePaths();
    });

    if (this.playAgainBtn) {
      this.playAgainBtn.addEventListener("click", () => {
        this.hideVictoryModal();
        this.onPlayAgain();
      });
    }
  }

  showRoutesPanel() {
    this.routesPanel.classList.remove("hidden");
  }

  hideRoutesPanel() {
    this.routesPanel.classList.add("hidden");
  }

  clearRoutes() {
    this.routeLengthEls.forEach(el => el.textContent = "0");
    this.routeTimeEls.forEach(el => el.textContent = "0");
    // limpiar canvases
    [1,2].forEach(i => {
      const canvas = document.querySelector(`#route${i}-visual canvas`);
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    });
  }

  showVictoryModal(stats) {
    if (!this.victoryModal) return;
    this.finalScoreEl.textContent = stats.score;
    this.finalTimeEl.textContent = stats.time;
    this.finalMovesEl.textContent = stats.moves;
    this.victoryModal.classList.remove("hidden");
    this.victoryModal.style.display = "flex";
  }

  hideVictoryModal() {
    if (!this.victoryModal) return;
    this.victoryModal.classList.add("hidden");
    this.victoryModal.style.display = "none";
  }

  /**
   * Actualiza y dibuja las dos mejores rutas.
   * La ruta más corta siempre se pintará en verde (primera)
   */
  updateRoutesInfo(paths) {
    if (!paths || paths.length === 0) return;

    // Ordenar rutas por longitud ascendente
    const sorted = [...paths].sort((a,b) => a.length - b.length).slice(0, 2);

    sorted.forEach((path, idx) => {
      // textos
      this.routeLengthEls[idx].textContent = path.length;
      this.routeTimeEls[idx].textContent = Math.round(path.length * 0.5);

      // clase de línea verde en el panel
      const lineEl = document.querySelector(`.routes-header .route-line:nth-child(${idx+1}) p`);
      lineEl.classList.toggle('route-green', idx===0);
      lineEl.classList.toggle('route-blue', idx===1);

      // dibujar en canvas
      const canvas = document.querySelector(`#route${idx+1}-visual canvas`);
      if (canvas) this.drawPath(canvas, path, idx===0 ? '#28a745' : '#007bff');
    });
  }

  /**
   * Dibuja la ruta en un canvas dado
   */
  drawPath(canvas, path, color) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    // normalizar coordenadas al canvas
    const maxX = Math.max(...path.map(p=>p.x));
    const maxY = Math.max(...path.map(p=>p.y));
    path.forEach((pt, i) => {
      const x = (pt.x / maxX) * canvas.width;
      const y = (pt.y / maxY) * canvas.height;
      if (i===0) ctx.moveTo(x,y);
      else ctx.lineTo(x,y);
    });
    ctx.stroke();
  }
}

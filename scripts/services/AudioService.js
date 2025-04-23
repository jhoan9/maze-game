/**
 * Servicio para gestionar los efectos de sonido
 */
export default class AudioService {
    constructor() {
      this.moveSound = document.getElementById("moveSound")
      this.wallSound = document.getElementById("wallSound")
      this.victorySound = document.getElementById("victorySound")
      this.isMuted = false
    }
  
    /**
     * Reproduce el sonido de movimiento
     */
    playMoveSound() {
      if (!this.isMuted) {
        this.moveSound.currentTime = 0
        this.moveSound.play().catch((e) => console.log("Error reproduciendo sonido:", e))
      }
    }
  
    /**
     * Reproduce el sonido de colisión con pared
     */
    playWallSound() {
      if (!this.isMuted) {
        this.wallSound.currentTime = 0
        this.wallSound.play().catch((e) => console.log("Error reproduciendo sonido:", e))
      }
    }
  
    /**
     * Reproduce el sonido de victoria
     */
    playVictorySound() {
      if (!this.isMuted) {
        this.victorySound.currentTime = 0
        this.victorySound.play().catch((e) => console.log("Error reproduciendo sonido:", e))
      }
    }
  
    /**
     * Activa o desactiva el sonido
     * @param {boolean} muted - Estado de silencio
     */
    setMuted(muted) {
      this.isMuted = muted
    }
  
    /**
     * Alterna el estado de silencio
     * @returns {boolean} - Nuevo estado de silencio
     */
    toggleMute() {
      this.isMuted = !this.isMuted
      return this.isMuted
    }
  }
  
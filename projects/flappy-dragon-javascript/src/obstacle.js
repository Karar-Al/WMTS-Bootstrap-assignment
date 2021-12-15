class Obstacle extends GameObject {
  constructor({ position, image, ctx, canvas }, level = 0) {
    super({ position, image, ctx, canvas })

    this.level = level

    // HARD = 2
    // MEDIUM = 4
    // NORMAL = 5
    // EASY = 10

    this.velocity = Math.max(this.level / 2 /* Ju mindre nummer, desto snabbare blir det senare. */, 1)

    this.gap = randomIntFromInterval(64 * 1.5, 64 * 8.5)
    this.size = Math.max(128, 256 - (this.level * 64))

    this.halfSize = this.size / 2
  }

  update() {
    if (this.level > 9) {
      // Todo: Make it move the Y axis slightly.
    }

    this.position.x -= this.velocity
  }

  render() {
    this.ctx.save()
    // Top halvan.
    for (let y = 0; y < (this.gap - this.halfSize); y++) {
      if (this.imageSrc && this.pattern) {
        this.ctx.fillStyle = this.pattern
        this.ctx.fillStyle.setTransform(new DOMMatrix(`translate(${this.position.x}px, ${0}px)`))
      } else {
        this.ctx.fillStyle = 'gray'
      }
      this.ctx.fillRect(this.position.x, y, 48, 1)
    }

    // Botten halvan.
    for (let y = this.gap + this.halfSize; y < this.canvas.height - 1; y++) {
      if (this.imageSrc && this.pattern) {
        this.ctx.fillStyle = this.pattern
        this.ctx.fillStyle.setTransform(new DOMMatrix(`translate(${this.position.x}px, ${0}px)`))
      } else {
        this.ctx.fillStyle = 'green'
      }
      this.ctx.fillRect(this.position.x, y, 48, 1)
    }

    this.ctx.restore()
  }
}

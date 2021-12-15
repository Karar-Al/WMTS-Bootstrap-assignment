class Player extends GameObject {
  constructor({ position, image, ctx }) {
    super({ position, image, ctx, canvas })
  }

  flap() {
    this.velocity = -4
  }

  render() {
    if (this.imageSrc) {
      this.ctx.drawImage(this.image, this.position.x, this.position.y, this.image.height, this.image.width)
    } else {
      super.render()
    }
  }

  update() {
    if (this.velocity < 4.0) {
      this.velocity += 0.2;
    }

    this.position.y += this.velocity;
    if (this.position.y < 0.0) {
      this.position.y = 0.0;
    }
  }
}
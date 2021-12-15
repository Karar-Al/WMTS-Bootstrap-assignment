class TextObject extends GameObject {
  constructor({ position, ctx, canvas }, {font, text}) {
    super({ position, ctx, canvas })

    this.font = font
    this.text = text
  }

  // No need to update, keep it empty.
  update () {}

  render () {
    this.ctx.font = this.font
    this.ctx.textAlign = 'center'
    this.ctx.fillText(this.text, this.position.x, this.position.y)
  }
}
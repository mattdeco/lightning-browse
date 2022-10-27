import { Lightning, Router } from '@lightningjs/sdk'

export class Tile extends Lightning.Component {
  static _template() {
    return {
      w: 500,
      h: 750,
      Container: {
        Image: {
          src: this.bindProp('image'),
          w: 500,
          h: 750,
        },
        Focus: {
          alpha: 0,
          rect: true,
          color: 0x00000000,
          w: 500,
          h: 750,
          shader: { type: Lightning.shaders.Outline, stroke: 2, color: 0xffefefef },
        },
      },
    }
  }

  _focus() {
    this.patch({
      Container: {
        Focus: {
          alpha: 1,
        },
      },
    })
  }

  _unfocus() {
    this.patch({
      Container: {
        Focus: {
          alpha: 0,
        },
      },
    })
  }

  _handleEnter() {
    Router.navigate(`details/${this.movie_id}`)
  }

  static get width() {
    return 500
  }

  static get height() {
    return 750
  }
}

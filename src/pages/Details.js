import { Lightning, Router } from '@lightningjs/sdk'
import { API_CONFIG, getMovie } from '../lib/api'

export class Details extends Lightning.Component {
  static _template() {
    return {
      Container: {
        rect: true,
        w: 1920,
        h: 1080,
        color: 0xff000000,
        Background: {
          alpha: 0.01,
          src: '',
          w: 1920,
          h: 1080,
        },
        Gradient: {
          rect: true,
          w: 1920,
          h: 1080,
          colorTop: 0x00000000,
          colorBottom: 0x85000000,
        },
        Content: {
          w: 1920,
          h: 1080,
          y: -64,
          flex: {
            direction: 'column',
            justifyContent: 'flex-end',
            paddingLeft: 64,
          },
          Shadow: {
            color: 0x75000000,
            texture: Lightning.Tools.getShadowRect(342, 513, 40, 40, 40),
            Image: {
              alpha: 0.01,
              src: '',
              w: 342,
              h: 513,
              y: -32,
            },
          },

          Title: {
            w: 1440,
            text: {
              fontSize: 72,
              fontWeight: 'bold',
              text: '',
            },
          },
          Metadata: {
            y: -12,
            text: {
              fontSize: 30,
              text: '',
            },
          },
          Description: {
            w: 1440,
            text: {
              fontSize: 28,
              lineHeight: 42,
              text: '',
            },
          },
        },
      },
    }
  }

  set params(params) {
    this.movieId = params.movieId
  }

  _enable() {
    this.tag('Background').on('txLoaded', () => {
      this.tag('Background').setSmooth('alpha', 1, { duration: 1.5 })
    })

    this.tag('Image').on('txLoaded', () => {
      this.tag('Image').setSmooth('alpha', 1, { duration: 0.5 })
    })

    this.renderData()
  }

  _disable() {
    this.tag('Background').patch({ src: null, alpha: 0.01 })
    this.tag('Title').patch({
      text: {
        text: '',
      },
    })

    this.tag('Description').patch({
      text: {
        text: '',
      },
    })

    this.tag('Image').patch({
      src: null,
      alpha: 0.01,
    })

    this.tag('Metadata').patch({
      text: {
        text: '',
      },
    })
  }

  _handleBack() {
    Router.navigate('$')
  }

  pageTransition() {
    return 'crossFade'
  }

  async renderData() {
    const data = await getMovie(this.movieId)
    console.log(data)

    this.tag('Background').patch({
      src: `${API_CONFIG.images.secure_base_url}${API_CONFIG.images.backdrop_sizes[3]}${data.backdrop_path}`,
    })

    this.tag('Title').patch({
      text: {
        text: data.title,
      },
    })

    this.tag('Metadata').patch({
      text: {
        text: new Date(data.release_date).toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      },
    })

    this.tag('Description').patch({
      text: {
        text: data.overview,
      },
    })

    this.tag('Image').patch({
      src: `${API_CONFIG.images.secure_base_url}${API_CONFIG.images.poster_sizes[5]}${data.poster_path}`,
    })
  }
}

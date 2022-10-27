import { Lightning } from '@lightningjs/sdk'
import { Grid } from '@lightningjs/ui'
import { Tile } from '../components/Tile'
import { API_CONFIG, getUpcoming } from '../lib/api'

export class Home extends Lightning.Component {
  static _template() {
    return {
      Container: {
        rect: true,
        w: 1920,
        h: 1080,
        color: 0xff000000,
        flex: {
          alignItems: 'center',
        },
        Results: {
          alpha: 0,
          w: 1920,
          h: 750,
          type: Grid,
          rows: 1,
          spacing: 45,
          itemType: Tile,
        },
      },
    }
  }

  _init() {
    this.renderData()
  }

  _getFocused() {
    return this.tag('Results')
  }

  _handleRight() {
    this.tag('Results')
  }

  pageTransition() {
    return 'crossFade'
  }

  async renderData(page = 1) {
    const data = await getUpcoming(page)

    const upcoming = data.results.map((movie, index) => {
      return {
        index: index,
        movie_id: movie.id,
        title: movie.title,
        release_date: movie.release_date,
        overview: movie.overview,
        image: `${API_CONFIG.images.secure_base_url}${API_CONFIG.images.poster_sizes[4]}${movie.poster_path}`,
      }
    })

    this.tag('Results').add(upcoming)
    this.tag('Results').scroll = 0.5
    this.tag('Results').setIndex(Math.round(upcoming.length / 2))

    this.tag('Results')
      .animation({
        duration: 0.5,
        actions: [{ p: 'alpha', v: { 0: 0, 0.5: 0.5, 1: 1 } }],
      })
      .start()
  }
}

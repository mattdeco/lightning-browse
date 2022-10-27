import { Details } from '../pages/Details'
import { Home } from '../pages/Home'

export default {
  root: '$',
  routes: [
    {
      path: '$',
      component: Home,
    },
    {
      path: 'details/:movieId',
      component: Details,
    },
  ],
}

import { RouterStore } from 'mobx-router'
import AppState from './AppState'

const store = {
  app: new AppState(),
  router: new RouterStore(),
}

export default store

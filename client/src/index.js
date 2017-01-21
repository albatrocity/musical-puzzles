import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { MobxRouter, startRouter } from 'mobx-router'
import './index.css'
import './App.css'
import routes from './config/routes'
import routerStore from './routerStore'

startRouter(routes, routerStore)

ReactDOM.render(
  <Provider store={routerStore}>
    <MobxRouter />
  </Provider>,
  document.getElementById('root'),
)

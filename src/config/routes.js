import { Route } from 'mobx-router'
import React from 'react'

// components
import Home from '../components/Home'
import Puzzle from '../components/Puzzle'

const routes = {
  home: new Route({
    path: '/',
    component: <Home />,
  }),
  puzzle: new Route({
    path: '/puzzles/:id',
    component: <Puzzle />,
    onEnter: (route, params) => {
      console.log(`entering puzzle with params`, params)
    },
  }),
}
export default routes

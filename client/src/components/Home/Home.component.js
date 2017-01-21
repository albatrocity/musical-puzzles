import React from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'mobx-router'
import routes from '../../config/routes'
import routerStore from '../../routerStore'

function Home() {
  return (
    <div>
      <h1>HI!!!</h1>
      <Link view={routes.puzzle} params={{ id: 1 }} store={routerStore}>Do it</Link>
    </div>
  )
}

export default inject('store')(observer(Home))

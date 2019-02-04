import React from 'react'
import { inject, observer } from 'mobx-react'
import Link from 'next/link'

export default inject('store')(
  observer(() => (
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/app">
        <a>App</a>
      </Link>
      <style jsx>
        {`
          a {
            margin: 15px 5px;
            padding: 5px;
          }
        `}
      </style>
    </nav>
  )),
)

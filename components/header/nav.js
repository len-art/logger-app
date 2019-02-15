import React from 'react'
import { inject, observer } from 'mobx-react'
import Link from 'next/link'

export default inject('store')(
  observer(() => (
    <nav>
      <Link href="/">
        <a>LOGGER</a>
      </Link>
      <style jsx>
        {`
          nav {
            display: flex;
          }
          a {
            text-decoration: none;
            color: #fafafa;
            margin: 0;
            padding: 0;
            font-size: 1.4em;
            font-weight: bold;
          }
        `}
      </style>
    </nav>
  )),
)

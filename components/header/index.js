import React from 'react'

import User from './user'
import Nav from './nav'

export default () => (
  <header>
    <div className="wrapper">
      <Nav />
      <User />
    </div>
    <style jsx>
      {`
        header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 50px;
        }
        .wrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          padding: 10px;
          height: 100%;
        }
      `}
    </style>
  </header>
)

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
          z-index: 400;
        }
        .wrapper {
          display: flex;
          flex-wrap: wrap;
          padding: 10px;
          justify-content: space-between;
          height: 100%;
        }
      `}
    </style>
  </header>
)

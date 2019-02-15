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
          z-index: 400;
          background-color: #fafafa;
          box-shadow: 1px 2px 5px -1px rgba(50, 50, 50, 0.8);
        }
        .wrapper {
          display: flex;
          flex-wrap: wrap;
          padding: 20px;
          justify-content: space-between;
          height: 100%;
        }
      `}
    </style>
  </header>
)

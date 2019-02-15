import React from 'react'

export default ({ children }) => (
  <div className="paper">
    {children}
    <style jsx>
      {`
        .paper {
          background-color: #fff;
          padding: 10px;
          border-radius: 5px;
          box-shadow: 1px 2px 5px -1px rgba(50, 50, 50, 0.8);
        }
      `}
    </style>
  </div>
)

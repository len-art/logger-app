import React from 'react'

export default ({ onClick, Icon, text }) => (
  <button onClick={onClick} className="iconButton">
    {Icon ? <Icon /> : text}
    <style jsx>
      {`
        .iconButton {
          width: 32px;
          height: 32px;
          border: none;
          background: none;
          cursor: pointer;
          opacity: 0.6;
        }

        .iconButton:focus {
          outline: none;
        }
      `}
    </style>
  </button>
)

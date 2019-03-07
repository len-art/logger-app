import React from 'react'

export default ({
  onClick, Icon, text, buttonStyles,
}) => (
  <button onClick={onClick} className="iconButton">
    {Icon ? <Icon className="icon" /> : text}
    <style jsx>
      {`
        .iconButton {
          width: 32px;
          height: 32px;
          border: none;
          background: none;
          cursor: pointer;
          opacity: 0.6;
          ${buttonStyles || ''}
        }
        .iconButton:focus {
          outline: none;
        }

        .icon {
          width: 100%;
          height: 100%;
        }
      `}
    </style>
  </button>
)
